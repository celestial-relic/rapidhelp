import React, { useState } from 'react';
import { useRapidhelp } from '../../context/RapidhelpContext';
import { ChatThread, ChatMessage } from '../../types';
import {
  Send,
  Search,
  MessageSquare,
  ShieldCheck,
  Tag,
  CheckCircle2,
  XCircle,
  Phone,
  Sparkles,
  Paperclip,
  Check,
} from 'lucide-react';

export const MessagingCenter: React.FC = () => {
  const {
    chatThreads,
    activeChatThreadId,
    setActiveChatThreadId,
    sendMessage,
    currentView,
    acceptCounterOffer,
    declineCounterOffer,
    setSelectedBookingId,
  } = useRapidhelp();

  const [inputMessage, setInputMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Default to first thread if none active
  const activeThread =
    chatThreads.find((t) => t.id === activeChatThreadId) || chatThreads[0];

  const filteredThreads = chatThreads.filter((t) =>
    t.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.participantCategory && t.participantCategory.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeThread) return;
    sendMessage(activeThread.id, inputMessage.trim());
    setInputMessage('');
  };

  const handleQuickReply = (text: string) => {
    if (!activeThread) return;
    sendMessage(activeThread.id, text);
  };

  // Quick replies based on role
  const quickReplies =
    currentView === 'professional'
      ? [
          'I am on my way!',
          'Arriving in 10 minutes.',
          'Please keep the main switchboard accessible.',
          'Can you share a photo of the issue?',
        ]
      : [
          'What time will you arrive?',
          'I am sharing my exact flat number.',
          'Please call when you reach the gate.',
          'Offer accepted! See you soon.',
        ];

  return (
    <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col md:flex-row h-[750px]">
      {/* Left Pane: Conversations List */}
      <div className="w-full md:w-80 lg:w-96 border-r border-[#E2E8F0] flex flex-col bg-[#F5F7FA]">
        {/* Search threads */}
        <div className="p-4 border-b border-[#E2E8F0] bg-white">
          <div className="flex items-center space-x-2 px-3 py-2 bg-[#F5F7FA] rounded-2xl border border-[#E2E8F0] text-xs">
            <Search className="w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search conversations..."
              className="w-full bg-transparent text-xs text-[#0C1C34] focus:outline-none"
            />
          </div>
        </div>

        {/* Thread items */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#E2E8F0]/60">
          {filteredThreads.map((thread) => {
            const isSelected = activeThread?.id === thread.id;
            return (
              <button
                key={thread.id}
                onClick={() => setActiveChatThreadId(thread.id)}
                className={`w-full text-left p-4 flex items-start space-x-3 transition-colors ${
                  isSelected ? 'bg-white shadow-sm border-l-4 border-[#FF7518]' : 'hover:bg-white/60'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={thread.participantAvatar}
                    alt={thread.participantName}
                    className="w-12 h-12 rounded-2xl object-cover border border-[#E2E8F0]"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-bold text-[#0C1C34] truncate">
                      {thread.participantName}
                    </span>
                    <span className="text-[10px] text-[#64748B]">{thread.lastMessageTime}</span>
                  </div>

                  <div className="text-[11px] text-[#FF7518] font-semibold mb-1">
                    {thread.participantCategory || 'Service Partner'}
                  </div>

                  <p className="text-xs text-[#64748B] truncate leading-tight">
                    {thread.lastMessage}
                  </p>

                  {thread.bookingId && (
                    <span className="inline-block mt-1 font-mono text-[9px] font-bold text-slate-500 bg-slate-200/70 px-1.5 py-0.2 rounded">
                      #{thread.bookingId}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Pane: Active Chat Window */}
      {activeThread ? (
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="p-4 sm:px-6 border-b border-[#E2E8F0] flex items-center justify-between bg-white">
            <div className="flex items-center space-x-3">
              <img
                src={activeThread.participantAvatar}
                alt={activeThread.participantName}
                className="w-10 h-10 rounded-2xl object-cover border border-[#E2E8F0]"
              />
              <div>
                <h4 className="text-sm font-bold text-[#0C1C34] flex items-center gap-1.5">
                  <span>{activeThread.participantName}</span>
                  <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 text-[9px] font-bold rounded">
                    Verified
                  </span>
                </h4>
                <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online • Quick responder</span>
                </div>
              </div>
            </div>

            {/* Quick Context & Booking Link */}
            {activeThread.bookingId && (
              <button
                onClick={() => setSelectedBookingId(activeThread.bookingId || null)}
                className="px-3 py-1.5 rounded-xl bg-[#F5F7FA] hover:bg-[#FF7518]/10 text-xs font-bold text-[#0C1C34] hover:text-[#FF7518] border border-[#E2E8F0] transition-colors"
              >
                Track Booking #{activeThread.bookingId}
              </button>
            )}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#F5F7FA]/40">
            {activeThread.messages.map((msg) => {
              const isMe =
                (currentView === 'professional' && msg.senderRole === 'professional') ||
                (currentView !== 'professional' && msg.senderRole === 'customer');

              return (
                <div
                  key={msg.id}
                  className={`flex items-end space-x-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMe && (
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="w-7 h-7 rounded-xl object-cover shrink-0 mb-1"
                    />
                  )}

                  <div className={`max-w-md ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                    {/* Embedded Price Negotiation Card if isCounterOffer */}
                    {msg.isCounterOffer ? (
                      <div className="p-4 rounded-3xl bg-amber-50 border-2 border-amber-300 shadow-md space-y-2 mb-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-900 flex items-center gap-1">
                            <Tag className="w-4 h-4 text-[#FF7518]" />
                            Counteroffer: ₹{msg.counterOfferAmount}
                          </span>
                          <span className="text-[10px] text-amber-700 font-semibold">Price Negotiation</span>
                        </div>
                        <p className="text-amber-800">{msg.text}</p>

                        {/* Interactive Acceptance Chip */}
                        {msg.counterOfferStatus === 'pending' && !isMe && msg.bookingId && (
                          <div className="flex space-x-2 pt-2">
                            <button
                              onClick={() => acceptCounterOffer(msg.bookingId!)}
                              className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl font-bold flex items-center space-x-1 hover:bg-emerald-700 text-xs"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Accept ₹{msg.counterOfferAmount}</span>
                            </button>
                            <button
                              onClick={() => declineCounterOffer(msg.bookingId!)}
                              className="px-3 py-1.5 bg-white border border-rose-300 text-rose-600 rounded-xl font-bold text-xs hover:bg-rose-50"
                            >
                              Decline
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                          isMe
                            ? 'bg-[#0C1C34] text-white rounded-br-none'
                            : 'bg-white text-[#0C1C34] border border-[#E2E8F0] rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    )}

                    <span className="text-[10px] text-[#64748B] mt-1 px-1">{msg.timestamp}</span>
                  </div>

                  {isMe && (
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="w-7 h-7 rounded-xl object-cover shrink-0 mb-1"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Replies Carousel */}
          <div className="px-4 py-2 bg-white border-t border-[#E2E8F0] overflow-x-auto flex space-x-2 text-xs">
            {quickReplies.map((qr, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickReply(qr)}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-[#F5F7FA] hover:bg-[#FF7518]/10 hover:text-[#FF7518] text-[#0C1C34] border border-[#E2E8F0] transition-colors"
              >
                {qr}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSend}
            className="p-3 sm:p-4 bg-white border-t border-[#E2E8F0] flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message or negotiate pricing..."
              className="flex-1 px-4 py-2.5 rounded-2xl bg-[#F5F7FA] border border-[#E2E8F0] text-xs sm:text-sm text-[#0C1C34] focus:outline-none focus:border-[#FF7518]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-3 bg-[#FF7518] hover:bg-[#E8630A] disabled:opacity-50 text-white rounded-2xl shadow-md transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-center text-xs text-[#64748B]">
          Select a chat to begin messaging
        </div>
      )}
    </div>
  );
};
