import { NextResponse } from 'next/server';

// Simple in-memory rate limiter (per IP). For production use a persistent store (Redis, DB).
const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT = 6; // max requests per window
const ipMap: Map<string, { count: number; first: number }> = new Map();

function isSafeMessage(text: string) {
  const lower = text.toLowerCase();
  const blocked = ['api_key', 'apikey', 'secret', 'password', 'AIza', 'sk-'];
  for (const b of blocked) if (lower.includes(b.toLowerCase())) return false;
  return true;
}

function extractGeminiAnswer(data: any): string {
  if (!data) return 'No response from LLM.';
  // Common Google generative shapes
  if (typeof data === 'string') return data;
  if (data?.candidates && data.candidates[0]) {
    // candidate may be a string or an object with content
    const c = data.candidates[0];
    if (typeof c === 'string') return c;
    if (c?.content) return typeof c.content === 'string' ? c.content : JSON.stringify(c.content);
  }
  if (data?.output && Array.isArray(data.output) && data.output[0]?.content) {
    return JSON.stringify(data.output[0].content);
  }
  if (data?.answer) return data.answer;
  // fallback: stringify a compact representation
  try { return JSON.stringify(data).slice(0, 2000); } catch { return String(data); }
}

export async function POST(req: Request) {
  try {
    const ip = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'local');

    // rate limiting
    const now = Date.now();
    const entry = ipMap.get(ip) || { count: 0, first: now };
    if (now - entry.first > RATE_WINDOW_MS) {
      entry.count = 0;
      entry.first = now;
    }
    entry.count += 1;
    ipMap.set(ip, entry);
    if (entry.count > RATE_LIMIT) {
      return NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 });
    }

    const body = await req.json();
    const message = String(body.message || '');
    if (!message) return NextResponse.json({ error: 'No message provided' }, { status: 400 });

    // basic prompt safety
    if (!isSafeMessage(message)) {
      return NextResponse.json({ error: 'Message rejected for safety reasons.' }, { status: 400 });
    }

    // Use the official Google Generative AI SDK when available.
    // The SDK will handle transport and proper endpoints for the configured key.
    const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.GEMINI_KEY || '';
    const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

    if (GEMINI_KEY) {
      // Try dynamic import of the official SDK. If it's not installed, fall back to fetch attempts.
      try {
        let GoogleGenerativeAI: any = null;
        try {
          const mod = await import('@google/generative-ai');
          GoogleGenerativeAI = (mod as any).GoogleGenerativeAI || (mod as any).default || (mod as any);
        } catch (impErr) {
          // SDK not installed or import failed — we'll fallback to fetch-based calls below
          GoogleGenerativeAI = null;
        }

        if (GoogleGenerativeAI) {
          try {
            const genAI = new GoogleGenerativeAI(GEMINI_KEY as string);
            const system = 'You are a helpful assistant trained on a developer portfolio. Keep answers concise and refer to projects/skills when relevant.';
            const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
            // SDK expects a `contents` shape where each content has `parts` with `text` fields
            const sdkBody = {
              contents: [
                { parts: [{ text: system }, { text: message }] }
              ]
            };

            const result = await model.generateContent(sdkBody as any);
            // Normalize result to a string answer. Try a few common SDK response shapes.
            let answerText = '';
            try {
              const maybeResp: any = result;
              // typical shape: maybeResp.output[0].content -> array of content objects which have parts
              if (maybeResp?.output && Array.isArray(maybeResp.output) && maybeResp.output[0]?.content) {
                try {
                  const parts = maybeResp.output[0].content.flatMap((c: any) => c.parts || []);
                  if (parts.length) answerText = parts.map((p: any) => p?.text || '').join('\n').trim();
                } catch (_) { /* ignore */ }
              }
              // candidate shape
              if (!answerText && maybeResp?.candidates && maybeResp.candidates[0]) {
                const c = maybeResp.candidates[0];
                if (typeof c === 'string') answerText = c;
                else if (c?.content) answerText = typeof c.content === 'string' ? c.content : JSON.stringify(c.content);
              }
              // response.text() shape
              if (!answerText && (maybeResp as any).response) {
                try {
                  const r: any = await (maybeResp as any).response;
                  if (r && typeof r.text === 'function') answerText = await r.text();
                } catch (_) { /* ignore */ }
              }
            } catch (e) {
              console.error('Error extracting SDK response', e, result);
            }
            if (!answerText) {
              try { answerText = JSON.stringify(result).slice(0, 2000); } catch { answerText = String(result); }
            }
            return NextResponse.json({ answer: answerText }, { status: 200 });
          } catch (sdkErr) {
            console.error('Gemini SDK call failed', sdkErr);
            // fall through to fetch-based fallback
          }
        }

        // SDK not available or failed — fallback to fetch approach (requires GEMINI_API_URL to be set)
        const GEMINI_URL = process.env.GEMINI_API_URL || process.env.GEMINI_BASE_URL || '';
        if (!GEMINI_URL) {
          return NextResponse.json({ error: 'No Gemini SDK available and GEMINI_API_URL not provided.' }, { status: 502 });
        }

        // Minimal fetch-based attempt (single endpoint, try two body shapes)
        try {
          const controller = new AbortController();
          const id = setTimeout(() => controller.abort(), 15000);
          try {
            const bodies = [ { input: message, prompt: message, model: GEMINI_MODEL }, { instances: [{ input: message }] } ];
            for (const b of bodies) {
              try {
                const resp = await fetch(GEMINI_URL, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GEMINI_KEY}` },
                  body: JSON.stringify(b),
                  signal: controller.signal,
                });
                const text = await resp.text();
                if (!resp.ok) {
                  continue;
                }
                let data: any;
                try { data = JSON.parse(text); } catch { data = text; }
                const answer = extractGeminiAnswer(data);
                return NextResponse.json({ answer }, { status: 200 });
              } catch (inner) {
                const ie: any = inner;
                if (ie?.code === 'ENOTFOUND' || String(ie).includes('getaddrinfo')) {
                  console.error('DNS error in fallback fetch', ie);
                  return NextResponse.json({ error: 'Network/DNS lookup failed for GEMINI_API_URL', details: String(ie) }, { status: 502 });
                }
                continue;
              }
            }
            clearTimeout(id);
          } finally { clearTimeout(id); }
        } catch (fetchErr) {
          console.error('Fallback fetch to GEMINI_API_URL failed', fetchErr);
          return NextResponse.json({ error: 'Fallback fetch failed', details: String(fetchErr) }, { status: 502 });
        }

        return NextResponse.json({ error: 'All Gemini attempts failed' }, { status: 502 });
      } catch (err) {
        console.error('Gemini overall error', err);
        return NextResponse.json({ error: 'Gemini error', details: String(err) }, { status: 502 });
      }
    }

    return NextResponse.json({
      error: 'No LLM provider configured. Set OPENAI_API_KEY or GEMINI_API_URL & GEMINI_API_KEY in environment.',
    }, { status: 501 });
  } catch (err) {
    return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 500 });
  }
}
