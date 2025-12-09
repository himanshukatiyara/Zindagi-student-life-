import React, { useState, useRef, useEffect } from 'react';
import { getAIRentAdvice } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { BotIcon, SendIcon, XIcon, UserIcon } from './icons';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hello! I'm your Zindagi Rent Assistant. How can I help you find the perfect place to live or items to rent?",
      sender: 'ai',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponseText = await getAIRentAdvice(input);
      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        text: aiResponseText,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error('Gemini API error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform hover:scale-110"
        aria-label="Open Chatbot"
      >
        <BotIcon className="h-8 w-8" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-full max-w-sm h-[70vh] max-h-[600px] bg-gray-800 rounded-2xl shadow-2xl flex flex-col z-50 transition-all duration-300 ease-in-out border border-gray-700">
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center rounded-t-2xl">
        <h3 className="text-lg font-semibold">Zindagi AI Assistant</h3>
        <button onClick={() => setIsOpen(false)} className="hover:bg-gray-700 p-1 rounded-full">
          <XIcon className="h-6 w-6" />
        </button>
      </header>
      <div className="flex-grow p-4 overflow-y-auto bg-gray-800">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
               {msg.sender === 'ai' && <div className="flex-shrink-0 bg-blue-600 p-2 rounded-full text-white"><BotIcon className="w-5 h-5"/></div>}
              <div
                className={`max-w-xs md:max-w-sm p-3 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-700 text-gray-200 rounded-bl-none'
                }`}
              >
                <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
              </div>
              {msg.sender === 'user' && <div className="flex-shrink-0 bg-blue-600 p-2 rounded-full text-white"><UserIcon className="w-5 h-5"/></div>}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-end gap-2">
                <div className="flex-shrink-0 bg-blue-600 p-2 rounded-full text-white"><BotIcon className="w-5 h-5"/></div>
                <div className="max-w-xs p-3 rounded-2xl bg-gray-700">
                    <div className="flex items-center space-x-1">
                        <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>
      <div className="p-4 border-t border-gray-700 bg-gray-800 rounded-b-2xl">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask for flats, PGs, items..."
            className="w-full py-3 pl-4 pr-12 text-sm text-gray-200 bg-gray-700 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 disabled:bg-gray-500 transition-colors"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;