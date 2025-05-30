'use client';

import React, { useState, FormEvent } from "react";
import { MdSend } from "react-icons/md";
import BackgroundAnimation from './BackgroundAnimation';

const Contact = () => {
  const [btnHover, setBtnHover] = useState(false);
  const [btnClick, setBtnClick] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBtnClick(true);
    setResult("Sending...");

    setTimeout(() => {
      setBtnClick(false);
    }, 500);

    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("access_key", "218de58b-9b19-41ec-b356-824d07903ff4");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("✅ Message Sent Successfully!");
        event.target.reset();
        setName('');
        setEmail('');
        setMsg('');
      } else {
        setResult("❌ Submission failed. Try again.");
      }
    } catch (error) {
      setResult("⚠️ Error sending message.");
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-black via-gray-900 to-black">
      <BackgroundAnimation />

      <div className="relative z-10 w-full max-w-2xl text-white text-center">
        {/* Heading with emoji and centered */}
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg tracking-wide flex justify-center items-center gap-2 sm:gap-3">
          <span>📬</span>
          <span>Get In Touch</span>
        </h3>

        {/* Paragraph more engaging and centered */}
        <p className="mb-10 text-sm sm:text-base md:text-lg text-white/75 leading-relaxed max-w-md mx-auto">
          Have a question, collaboration idea, or just want to say hello? <br />
          I’m here and excited to connect with you. Let’s make something awesome together!
        </p>

        <form onSubmit={submitHandler} className="space-y-6 text-left w-full">
          <div>
            <label className="block mb-2 font-semibold text-base sm:text-lg text-white">Name</label>
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-800 bg-opacity-90 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-base sm:text-lg text-white">Email</label>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-800 bg-opacity-90 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              placeholder="you@example.com"
            />
          </div>

          <textarea
            name="message"
            rows={5}
            required
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-gray-800 bg-opacity-90 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition resize-none"
            placeholder="Write your message here..."
          ></textarea>

          <div className="text-center">
            <button
              type="submit"
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              className="inline-flex items-center gap-2 sm:gap-3 justify-center bg-red-700 hover:bg-red-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-md transition-transform duration-300 uppercase shadow-lg shadow-red-700/50 transform hover:-translate-y-1 hover:scale-105"
            >
              <span>Send</span>
              <MdSend
                className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform ${
                  btnHover ? "scale-125 rotate-12" : ""
                } ${btnClick ? "translate-x-8 opacity-0" : ""}`}
              />
            </button>
          </div>
        </form>

        {result && (
          <p className="text-center mt-8 text-sm font-semibold text-green-400 drop-shadow-md animate-fadeIn">
            {result}
          </p>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default Contact;
