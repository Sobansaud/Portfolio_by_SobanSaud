"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { BsThreeDots, BsChatDots, BsSendFill } from "react-icons/bs";

interface ChatMessage {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const predefinedQuestions = [
  "What services do you offer?",
  "Tell me about your experience",
  "What are your development skills?",
  "How can I contact you?",
];

const systemContext = `
You are Muhammad Soban Saud's professional chatbot assistant. 
Answer briefly (1–2 sentences) in first person ("I", "me"), focusing on his portfolio, work, and experience. 
Keep tone friendly, professional, and confident.

**About Muhammad Soban Saud:**  
- Full Stack Developer | UI/UX Designer | Agentic AI Developer  
- Expert in React, Next.js, TypeScript, Tailwind, Node.js, Python, MongoDB, Firebase, Vercel, and more.  
- Passionate about creating modern, fast, and scalable web applications.  

**Experience:**  
- Built multiple eCommerce and AI-integrated projects  
- Specializes in frontend and interactive user experiences  
- Skilled in API integration and backend systems  

**Contact Info:**  
📧 Email: sobansaud3@gmail.com  
🔗 LinkedIn: https://www.linkedin.com/in/muhammad-soban-saud-235a6b2ba/  
▶️ YouTube: https://www.youtube.com/@CodeVerseSoban  
🐦 Twitter/X: https://x.com/Sobansaud12345  

**If asked "Who is Muhammad Soban Saud?"**, reply:  
"I’m Muhammad Soban Saud — a Full Stack Developer and UI/UX Designer specializing in React, Next.js, and Agentic AI solutions. I love creating fast, smart, and beautiful apps." 

If asked about others, reply:  
"I’m sorry, I can only share details about Muhammad Soban Saud." 
`;

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "👋 Hi! I'm Soban’s virtual assistant. How can I help you learn about my work or services?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Small seeded knowledge base as a fast fallback if the Gemini-backed API is unreachable
  const LOCAL_KB: { keywords: string[]; answer: string }[] = [
    { keywords: ['name', 'who are you', 'who is'], answer: "I'm Muhammad Soban Saud — a Full-Stack Developer who builds responsive websites, APIs, and AI tools." },
    { keywords: ['skills', 'skill', 'technologies', 'tech'], answer: 'I work with Next.js, React, TypeScript, Tailwind CSS, Node.js, Python, and various AI tools.' },
    { keywords: ['projects', 'portfolio', 'work'], answer: 'See the Projects section — notable work includes CodeFusion.AI and Agentia AI.' },
    { keywords: ['contact', 'email', 'hire'], answer: 'Email me at sobansaud3@gmail.com or use the Contact section on the site.' },
    { keywords: ['youtube', 'video'], answer: 'My YouTube: https://www.youtube.com/@CodeVerseSoban' },
  ];

  function localAnswer(query: string) {
    const q = query.toLowerCase();
    for (const item of LOCAL_KB) {
      if (item.keywords.some((k) => q.includes(k))) return item.answer;
    }
    return null;
  }

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    // Scroll only the chat container area to avoid jumping the whole page
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Append user message optimistically and keep focus on the input
    setMessages((prev) => [...prev, { text: trimmed, isBot: false, timestamp: new Date() }]);
    setInputValue("");
    inputRef.current?.focus();
    setIsTyping(true);

    // ensure the chat scrolls to show the user's message without moving the page
    requestAnimationFrame(() => scrollToBottom('auto'));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, context: systemContext }),
      });

      if (!res.ok) {
        // try to parse body for a helpful message
        const errText = await res.text().catch(() => res.statusText || 'Unknown error');
        console.warn('API /api/chat returned', res.status, errText);
        throw new Error(errText || 'Bad response');
      }

      const data = await res.json().catch(() => ({}));
      const botReply = data?.response || data?.answer || data?.result || null;

      if (botReply) {
        setMessages((prev) => [...prev, { text: botReply, isBot: true, timestamp: new Date() }]);
      } else {
        // fallback: try local KB
        const fallback = localAnswer(trimmed) || "I'm happy to help — please ask another way or check the Projects/Contact sections.";
        setMessages((prev) => [...prev, { text: fallback, isBot: true, timestamp: new Date() }]);
      }
    } catch (err) {
      console.error('Chatbot send error:', err);
      const fallback = localAnswer(trimmed) || "⚠️ I couldn't reach the assistant — try again or check your connection.";
      setMessages((prev) => [...prev, { text: fallback, isBot: true, timestamp: new Date() }]);
    } finally {
      // small delay to ensure DOM updated before smooth scroll
      setTimeout(() => scrollToBottom('smooth'), 50);
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div className="fixed bottom-5 right-5 z-50" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 w-16 h-16 rounded-full shadow-xl flex items-center justify-center text-white relative overflow-hidden"
        >
          {isOpen ? (
            <IoClose size={28} />
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
              <BsChatDots size={26} />
            </motion.div>
          )}
        </button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-5 z-50 w-96 h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 text-white flex flex-col gap-1">
              <h3 className="font-bold text-lg">💬 Muhammad Soban Saud</h3>
              <p className="text-sm opacity-90">Your friendly portfolio assistant</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
              {messages.map((msg, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                  {msg.isBot && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mr-2">
                      <span className="text-white font-semibold text-sm">S</span>
                    </div>
                  )}
                  <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${msg.isBot ? "bg-white text-gray-800 border border-gray-200" : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">S</span>
                  </div>
                  <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm">
                    <BsThreeDots className="animate-bounce text-gray-600" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="p-2 border-t bg-gray-50 flex gap-2 overflow-x-auto">
              {predefinedQuestions.map((q, i) => (
                <button key={i} onClick={() => handleSendMessage(q)} className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 transition">
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t flex gap-2 bg-white"
            >
              <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ask about my work..." className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-black focus:outline-none focus:border-blue-500" />
              <button type="submit" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-2 rounded-full hover:shadow-lg transition">
                <BsSendFill size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
