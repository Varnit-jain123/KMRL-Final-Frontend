import React, { useState, useEffect, useRef } from 'react';
import { X, Search, Pin, MoreVertical, Send, Paperclip, Smile, MessageCircle, Check, CheckCheck, FileText } from 'lucide-react';

// Types
interface Employee {
  id: string;
  name: string;
  email: string;
  initials: string;
  isOnline: boolean;
  lastSeen?: Date;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'document';
  documentName?: string;
}

interface Chat {
  employeeId: string;
  messages: Message[];
  isPinned: boolean;
  unreadCount: number;
}

// Mock Data
const mockEmployees: Employee[] = [
  { id: '1', name: 'Rajesh Singh', email: 'rajesh@kmrl.kerala.gov.in', initials: 'RS', isOnline: true },
  { id: '2', name: 'Priya Verma', email: 'priya@kmrl.kerala.gov.in', initials: 'PV', isOnline: true },
  { id: '3', name: 'Arun Kumar', email: 'arun.kumar@kmrl.com', initials: 'AK', isOnline: false, lastSeen: new Date(Date.now() - 3600000) },
  { id: '4', name: 'Lakshmi Nambiar', email: 'lakshmi.nambiar@kmrl.com', initials: 'LN', isOnline: false, lastSeen: new Date(Date.now() - 7200000) },
  { id: '5', name: 'Anjali Krishnan', email: 'anjali.krishnan@kmrl.com', initials: 'AK', isOnline: true },
];

const initialChats: Chat[] = [
  {
    employeeId: '1',
    isPinned: true,
    unreadCount: 2,
    messages: [
      { id: 'm1', senderId: '1', receiverId: 'me', content: 'Hey! Did you review the Q4 report?', timestamp: new Date(Date.now() - 3600000), status: 'read', type: 'text' },
      { id: 'm2', senderId: 'me', receiverId: '1', content: 'Yes, I just finished it. Looks great!', timestamp: new Date(Date.now() - 3000000), status: 'read', type: 'text' },
      { id: 'm3', senderId: '1', receiverId: 'me', content: 'Awesome! Can you share the final document?', timestamp: new Date(Date.now() - 600000), status: 'delivered', type: 'text' },
    ],
  },
  {
    employeeId: '2',
    isPinned: false,
    unreadCount: 0,
    messages: [
      { id: 'm4', senderId: 'me', receiverId: '2', content: 'Hi Priya, meeting at 3 PM today?', timestamp: new Date(Date.now() - 7200000), status: 'read', type: 'text' },
      { id: 'm5', senderId: '2', receiverId: 'me', content: 'Yes, confirmed! See you then.', timestamp: new Date(Date.now() - 7000000), status: 'read', type: 'text' },
    ],
  },
];

// Main Component
const WorkChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [employees] = useState<Employee[]>(mockEmployees);
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🔥', '✨', '💯'];

  const totalUnreadCount = chats.reduce((sum, chat) => sum + chat.unreadCount, 0);
  const filteredEmployees = employees.filter(emp => emp.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const activeEmployee = employees.find(e => e.id === activeChat);
  const activeMessages = chats.find(c => c.employeeId === activeChat)?.messages || [];
  const activeFullChat = chats.find(c => c.employeeId === activeChat);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages]);

  useEffect(() => {
    if (activeChat) {
      setChats(prev => prev.map(chat => chat.employeeId === activeChat ? { ...chat, unreadCount: 0 } : chat));
    }
  }, [activeChat]);

  const sendMessage = (content: string, type: 'text' | 'document' = 'text', documentName?: string) => {
    if (!activeChat) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: 'me',
      receiverId: activeChat,
      content,
      timestamp: new Date(),
      status: 'sent',
      type,
      documentName,
    };

    setChats(prev => prev.map(chat =>
      chat.employeeId === activeChat ? { ...chat, messages: [...chat.messages, newMessage] } : chat
    ));

    setTimeout(() => {
      setChats(prev => prev.map(chat =>
        chat.employeeId === activeChat ? {
          ...chat,
          messages: chat.messages.map(msg => msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg)
        } : chat
      ));
    }, 1000);
  };

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      sendMessage(`Shared document: ${file.name}`, 'document', file.name);
      e.target.value = '';
    }
  };

  const togglePin = (employeeId: string) => {
    setChats(prev => prev.map(chat => chat.employeeId === employeeId ? { ...chat, isPinned: !chat.isPinned } : chat));
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatLastSeen = (date?: Date) => {
    if (!date) return 'Offline';
    const diff = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return 'Offline';
  };

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const chatA = chats.find(c => c.employeeId === a.id);
    const chatB = chats.find(c => c.employeeId === b.id);
    if (chatA?.isPinned && !chatB?.isPinned) return -1;
    if (!chatA?.isPinned && chatB?.isPinned) return 1;
    return 0;
  });

  return (
    <>
      {/* Chat Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-50"
        >
          <MessageCircle className="w-6 h-6" />
          {totalUnreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {totalUnreadCount > 9 ? '9+' : totalUnreadCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-5xl bg-white shadow-2xl z-50 flex flex-col" style={{ animation: 'slideIn 0.3s ease-out' }}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <h2 className="text-xl font-semibold text-gray-800">Work Chat</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Employee List */}
              <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
                <div className="p-4 bg-white border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">Messages</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search employees..."
                      className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {sortedEmployees.map((employee) => {
                    const chat = chats.find(c => c.employeeId === employee.id);
                    const isActive = activeChat === employee.id;

                    return (
                      <div
                        key={employee.id}
                        onClick={() => setActiveChat(employee.id)}
                        className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 transition-colors ${isActive ? 'bg-blue-50 border-l-4 border-blue-600' : ''}`}
                      >
                        <div className="relative">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${employee.isOnline ? 'bg-blue-600' : 'bg-gray-400'}`}>
                            {employee.initials}
                          </div>
                          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${employee.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 truncate">{employee.name}</h3>
                            {chat?.isPinned && <Pin className="w-4 h-4 text-blue-600 fill-blue-600" />}
                          </div>
                          <p className="text-sm text-gray-500 truncate">
                            {employee.isOnline ? 'Online' : formatLastSeen(employee.lastSeen)}
                          </p>
                        </div>

                        {chat && chat.unreadCount > 0 && (
                          <div className="bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {chat.unreadCount}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chat Window */}
              <div className="flex-1 flex flex-col bg-white">
                {!activeEmployee ? (
                  <div className="flex-1 flex items-center justify-center bg-white">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-4xl">💬</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a conversation</h3>
                      <p className="text-gray-500">Choose an employee from the list to start chatting</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Chat Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                            {activeEmployee.initials}
                          </div>
                          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${activeEmployee.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{activeEmployee.name}</h3>
                          <p className="text-sm text-gray-500">{activeEmployee.isOnline ? 'Online' : 'Offline'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => activeChat && togglePin(activeChat)}
                          className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${activeFullChat?.isPinned ? 'text-blue-600' : 'text-gray-600'}`}
                        >
                          <Pin className={`w-5 h-5 ${activeFullChat?.isPinned ? 'fill-current' : ''}`} />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                      {activeMessages.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          No messages yet. Start the conversation!
                        </div>
                      ) : (
                        <>
                          {activeMessages.map((msg) => {
                            const isOwn = msg.senderId === 'me';
                            return (
                              <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
                                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isOwn ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm'}`}>
                                  {msg.type === 'document' ? (
                                    <div className="flex items-center gap-2 mb-1">
                                      <FileText className="w-5 h-5" />
                                      <span className="text-sm font-medium">{msg.documentName}</span>
                                    </div>
                                  ) : (
                                    <p className="text-sm break-words">{msg.content}</p>
                                  )}
                                  <div className={`flex items-center gap-1 mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                                    <span className={`text-xs ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>{formatTime(msg.timestamp)}</span>
                                    {isOwn && (msg.status === 'read' ? <CheckCheck className="w-4 h-4 text-blue-300" /> : msg.status === 'delivered' ? <CheckCheck className="w-4 h-4 text-gray-300" /> : <Check className="w-4 h-4 text-gray-300" />)}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          <div ref={messagesEndRef} />
                        </>
                      )}
                    </div>

                    {/* Input */}
                    <div className="border-t border-gray-200 p-4 bg-white">
                      {showEmoji && (
                        <div className="flex gap-2 mb-3 p-2 bg-gray-50 rounded-lg">
                          {emojis.map((emoji, idx) => (
                            <button key={idx} onClick={() => { setMessage(prev => prev + emoji); setShowEmoji(false); }} className="text-2xl hover:scale-125 transition-transform">
                              {emoji}
                            </button>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <button onClick={() => setShowEmoji(!showEmoji)} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                          <Smile className="w-5 h-5" />
                        </button>
                        <label className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                          <Paperclip className="w-5 h-5" />
                          <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.doc,.docx,.txt,.xls,.xlsx" />
                        </label>
                        <input
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                          placeholder="Type a message..."
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button onClick={handleSend} disabled={!message.trim()} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
};

export default WorkChat;