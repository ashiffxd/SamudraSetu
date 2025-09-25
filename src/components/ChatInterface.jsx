import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Bot, User, Sparkles, Zap } from 'lucide-react';

const sampleQueries = [
  "Show me temperature near Chennai",
  "Plot salinity vs depth",
  "Where is oxygen low?",
  "Temperature trend last 7 days",
  "Show float locations on map"
];

export const ChatInterface = ({ onQuery }) => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hello! I'm your ocean data assistant. Ask me about temperature, salinity, oxygen levels, or float locations. Try one of the sample queries below!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const parseQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('temperature') && lowerQuery.includes('trend')) {
      return 'temperature-trend';
    } else if (lowerQuery.includes('temperature')) {
      return 'temperature';
    } else if (lowerQuery.includes('salinity')) {
      return 'salinity';
    } else if (lowerQuery.includes('oxygen')) {
      return 'oxygen';
    } else if (lowerQuery.includes('map') || lowerQuery.includes('location')) {
      return 'locations';
    } else if (lowerQuery.includes('depth')) {
      return 'depth-profile';
    } else {
      return 'general';
    }
  };

  const generateBotResponse = (queryType, originalQuery) => {
    const responses = {
      'temperature': "Here's the temperature data you requested. The visualization shows current temperature readings from our ARGO floats.",
      'temperature-trend': "I've generated a temperature trend analysis for the last 7 days showing how temperature varies over time.",
      'salinity': "Displaying salinity measurements from our ocean monitoring network. You can see how salinity varies with depth and location.",
      'oxygen': "Here are the oxygen concentration levels. Lower oxygen zones are highlighted in red on the visualization.",
      'locations': "Showing all active ARGO float positions on the map. Each point represents real-time ocean monitoring data.",
      'depth-profile': "Generated a depth profile showing how ocean parameters change with depth.",
      'general': `I understand you're asking about: "${originalQuery}". Let me show you relevant ocean data visualizations.`
    };
    
    return responses[queryType] || responses.general;
  };

  const handleSend = async (query) => {
    const messageText = query || input;
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Process query
    const queryType = parseQuery(messageText);
    onQuery(messageText, queryType);

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(queryType, messageText),
        sender: 'bot',
        timestamp: new Date(),
        queryType
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 bg-gradient-to-r from-slate-800 via-blue-800 to-teal-700 text-white">
        <div className="flex items-center gap-2">
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
          </div>
          <h2 className="text-lg font-bold bg-gradient-to-r from-blue-200 to-teal-200 bg-clip-text text-transparent">
            AI Ocean Assistant
          </h2>
          <div className="ml-0 flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-blue-200">Online</span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-md ${
              message.sender === 'user'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border'
            }`}>
              <div className="flex items-start gap-2">
                {message.sender === 'bot' && (
                  <div className="w-6 h-6 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                )}
                {message.sender === 'user' && (
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-3 h-3 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 px-4 py-3 rounded-2xl shadow-md border">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full flex items-center justify-center">
                  <Bot className="w-3 h-3 text-white" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex flex-wrap gap-2 mb-4">
          {sampleQueries.map((query, index) => (
            <button
              key={index}
              onClick={() => handleSend(query)}
              className="px-3 py-2 text-xs bg-gradient-to-r from-blue-50 to-teal-50 text-blue-700 rounded-full hover:from-blue-100 hover:to-teal-100 transition-all duration-300 border border-blue-200 hover:border-blue-300 transform hover:scale-105 font-medium"
            >
              <Zap className="w-3 h-3 inline mr-1" />
              {query}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about ocean data..."
            className="flex-1 p-3 border-2 border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white"
            rows={1}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Send className="w-5 h-5 transform hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};