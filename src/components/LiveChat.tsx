'use client';

import { useEffect, useState } from 'react';
import { MessageSquare, RefreshCw } from 'lucide-react';

export function LiveChat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChat = async () => {
    try {
      const res = await fetch('/api/discord/chat');
      const data = await res.json();
      if (data.messages && Array.isArray(data.messages)) {
        setMessages(data.messages.reverse());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChat();
    const interval = setInterval(fetchChat, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[460px]">
      {/* Header */}
      <div className="bg-black/60 px-5 py-4 border-b border-red-900/40 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-red-500" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-black animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">〔💬〕dc-member-chat</h3>
            <p className="text-[11px] text-gray-400">Live Discord Feed</p>
          </div>
        </div>
        <button 
          onClick={fetchChat} 
          className="text-gray-400 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-950/40"
          title="Refresh Feed"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {loading && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 text-sm space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin text-red-600" />
            <span>Fetching live messages...</span>
          </div>
        )}
        
        {!loading && messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            No recent messages found.
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start space-x-3 group">
            <img 
              src={msg.author.avatar ? `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'} 
              alt={msg.author.username}
              className="w-9 h-9 rounded-full bg-gray-900 border border-red-950 object-cover flex-shrink-0 group-hover:border-red-600 transition-colors"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://cdn.discordapp.com/embed/avatars/0.png' }}
            />
            <div className="flex-1 min-w-0 bg-black/40 p-3 rounded-xl border border-white/5 group-hover:border-red-900/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-red-400 truncate">{msg.author.username}</span>
                <span className="text-[10px] text-gray-500">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-gray-200 text-sm mt-1 break-words leading-relaxed">{msg.content || '(Attachment/Embed)'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
