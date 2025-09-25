import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Bot, User } from 'lucide-react';

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
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Ocean Data Assistant</h2>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-start gap-2">
                {message.sender === 'bot' && (
                  <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                )}
                {message.sender === 'user' && (
                  <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                )}
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex flex-wrap gap-2 mb-3">
          {sampleQueries.map((query, index) => (
            <button
              key={index}
              onClick={() => handleSend(query)}
              className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
            >
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
            className="flex-1 p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={1}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};