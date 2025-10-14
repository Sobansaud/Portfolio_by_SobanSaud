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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { text, isBot: false, timestamp: new Date() }]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, context: systemContext }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { text: data.response || data.answer || "I'm happy to help!", isBot: true, timestamp: new Date() },
      ]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        {
          text: "⚠️ Sorry, I’m having trouble connecting right now. Try asking about my projects or skills!",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
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
