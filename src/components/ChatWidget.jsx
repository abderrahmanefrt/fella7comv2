import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, X, Send, ArrowLeft, ChevronDown, CreditCard, Shield, Lock, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useChat } from '../context/ChatContext';
import { OFFER_STATUS } from '../context/ChatContext';
import { useLanguage } from '../context/LanguageContext';
import './ChatWidget.css';

function formatTime(timestamp, language) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString(language === 'ar' ? 'ar-DZ' : 'fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(timestamp, language) {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return language === 'ar' ? 'اليوم' : "Aujourd'hui";
  if (date.toDateString() === yesterday.toDateString()) return language === 'ar' ? 'أمس' : 'Hier';
  return date.toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'fr-FR', { day: 'numeric', month: 'short' });
}

function formatPrice(num) {
  return Number(num).toLocaleString('fr-FR');
}

// Group messages by date
function groupMessagesByDate(messages, language) {
  const groups = [];
  let currentDate = '';
  messages.forEach(msg => {
    const dateStr = new Date(msg.timestamp).toDateString();
    if (dateStr !== currentDate) {
      currentDate = dateStr;
      groups.push({ type: 'date', date: formatDate(msg.timestamp, language), key: 'date_' + dateStr });
    }
    groups.push({ type: msg.type || 'message', ...msg, key: msg.id });
  });
  return groups;
}

// ═══════════════════════════════════════
// Payment Modal — full-screen payment form
// ═══════════════════════════════════════
function PaymentModal({ offer, onPay, onCancel }) {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  const [step, setStep] = useState('form'); // 'form' | 'processing' | 'success'

  const handleChange = (field, value) => {
    // Format card number with spaces
    if (field === 'cardNumber') {
      value = value.replace(/\D/g, '').slice(0, 16);
      value = value.replace(/(.{4})/g, '$1 ').trim();
    }
    // Format expiry
    if (field === 'expiry') {
      value = value.replace(/\D/g, '').slice(0, 4);
      if (value.length >= 3) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
    }
    // CVV
    if (field === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    }
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const isValid = form.cardNumber.replace(/\s/g, '').length === 16 &&
    form.cardName.trim().length > 2 &&
    form.expiry.length === 5 &&
    form.cvv.length === 3;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onPay();
      }, 1800);
    }, 2000);
  };

  return createPortal(
    <div className="payment-overlay" onClick={onCancel}>
      <div className="payment-modal payment-modal-fullscreen animate-slide-up" onClick={e => e.stopPropagation()}>

        {/* ─── FORM STEP ─── */}
        {step === 'form' && (
          <>
            <div className="payment-header">
              <div className="payment-header-top">
                <div className="payment-lock-icon">
                  <Lock size={22} />
                </div>
                <div>
                  <h4>{t('chat.securePayment')}</h4>
                  <span className="payment-secure-badge">
                    <Shield size={14} /> SSL 256-bit
                  </span>
                </div>
                <button className="payment-close" onClick={onCancel}>
                  <X size={22} />
                </button>
              </div>

              {/* Order summary */}
              <div className="payment-summary">
                <div className="payment-summary-product">
                  <span className="payment-product-emoji"></span>
                  <div className="payment-product-info">
                    <strong>{offer.product}</strong>
                    <span>{t('chat.quantity')}: {offer.quantity}</span>
                  </div>
                </div>

                <div className="payment-summary-divider"></div>

                {offer.unitPrice && (
                  <div className="payment-summary-row">
                    <span>{t('chat.unitPrice')}</span>
                    <span>{formatPrice(offer.unitPrice)} DA {offer.unitLabel || ''}</span>
                  </div>
                )}
                <div className="payment-summary-row">
                  <span>{t('chat.subtotal')} ({offer.quantity})</span>
                  <span>{formatPrice(offer.price)} DA</span>
                </div>
                {Number(offer.delivery) > 0 && (
                  <div className="payment-summary-row">
                    <span>{t('chat.delivery')}</span>
                    <span>{formatPrice(offer.delivery)} DA</span>
                  </div>
                )}
                <div className="payment-summary-total">
                  <span>{t('chat.totalToPay')}</span>
                  <strong>{formatPrice(offer.total)} DA</strong>
                </div>
              </div>
            </div>

            <form className="payment-form" onSubmit={handleSubmit}>
              <div className="payment-field">
                <label>{t('chat.cardNumber')}</label>
                <div className="payment-input-icon">
                  <CreditCard size={20} className="field-icon" />
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={form.cardNumber}
                    onChange={e => handleChange('cardNumber', e.target.value)}
                    autoFocus
                  />
                  <div className="card-brands">
                    <span className="card-brand visa">VISA</span>
                    <span className="card-brand mc">MC</span>
                  </div>
                </div>
              </div>

              <div className="payment-field">
                <label>{t('chat.cardName')}</label>
                <input
                  type="text"
                  placeholder="MOHAMMED SALIM"
                  value={form.cardName}
                  onChange={e => handleChange('cardName', e.target.value.toUpperCase())}
                />
              </div>

              <div className="payment-field-row">
                <div className="payment-field">
                  <label>{t('chat.expiration')}</label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    value={form.expiry}
                    onChange={e => handleChange('expiry', e.target.value)}
                  />
                </div>
                <div className="payment-field">
                  <label>CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={form.cvv}
                    onChange={e => handleChange('cvv', e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`payment-submit-btn ${isValid ? 'valid' : ''}`}
                disabled={!isValid}
              >
                <Lock size={18} />
                {t('chat.btnPay')} {formatPrice(offer.total)} DA
              </button>

              <p className="payment-disclaimer">
                {t('chat.secureDisclaimer')}
              </p>
            </form>
          </>
        )}

        {/* ─── PROCESSING STEP ─── */}
        {step === 'processing' && (
          <div className="payment-processing">
            <div className="payment-spinner"></div>
            <h4>{t('chat.processing')}</h4>
            <p>{t('chat.processingDesc')}</p>
          </div>
        )}

        {/* ─── SUCCESS STEP ─── */}
        {step === 'success' && (
          <div className="payment-success">
            <div className="payment-success-icon">
              <CheckCircle size={64} />
            </div>
            <h4>{t('chat.paymentSuccess')}</h4>
            <p>{t('chat.paymentSuccessDesc')}</p>
            <span className="payment-success-amount">{formatPrice(offer.total)} DA</span>
          </div>
        )}

      </div>
    </div>,
    document.body
  );
}

// ═══════════════════════════════════════
// Offer Card — displayed in chat messages
// ═══════════════════════════════════════
function OfferCard({ offer, isMe, conversationId }) {
  const { t } = useLanguage();
  const [showPayment, setShowPayment] = useState(false);
  const { payOffer } = useChat();

  const isPending = offer.status === OFFER_STATUS.PENDING;
  const isPaid = offer.status === OFFER_STATUS.PAID;

  const statusClass = isPaid ? 'paid' : 'pending';

  const handlePay = () => {
    payOffer(conversationId, offer.id);
    setShowPayment(false);
  };

  return (
    <>
      <div className={`offer-card offer-card-${statusClass}`}>
        <div className="offer-card-header">
          <div className="offer-card-icon"></div>
          <div className="offer-card-title">
            <strong>{t('chat.orderSummary')}</strong>
            {isPending && <span className="offer-badge pending">{t('chat.awaitingPayment')}</span>}
            {isPaid && <span className="offer-badge paid">{t('chat.paid')}</span>}
          </div>
        </div>

        <div className="offer-card-details">
          <div className="offer-detail-row">
            <span className="offer-label">{t('chat.product')}</span>
            <span className="offer-value">{offer.product}</span>
          </div>
          <div className="offer-detail-row">
            <span className="offer-label">{t('chat.quantity')}</span>
            <span className="offer-value">{offer.quantity}</span>
          </div>
          {offer.unitPrice && (
            <div className="offer-detail-row">
              <span className="offer-label">{t('chat.unitPrice')}</span>
              <span className="offer-value">{formatPrice(offer.unitPrice)} DA {offer.unitLabel || ''}</span>
            </div>
          )}
          <div className="offer-detail-row">
            <span className="offer-label">{t('chat.subtotal')}</span>
            <span className="offer-value">{formatPrice(offer.price)} DA</span>
          </div>
          {Number(offer.delivery) > 0 && (
            <div className="offer-detail-row">
              <span className="offer-label">{t('chat.delivery')}</span>
              <span className="offer-value">{formatPrice(offer.delivery)} DA</span>
            </div>
          )}
        </div>

        <div className="offer-card-total">
          <span>{t('chat.total')}</span>
          <strong>{formatPrice(offer.total)} DA</strong>
        </div>

        {/* Payment button — only for the buyer */}
        {isPending && !isMe && (
          <button
            className="offer-pay-btn"
            onClick={() => setShowPayment(true)}
          >
            <CreditCard size={16} />
            {t('chat.payNow')}
          </button>
        )}

        {isPending && isMe && (
          <div className="offer-waiting">
            <div className="waiting-dots"><span></span><span></span><span></span></div>
            {t('chat.awaitingPaymentDots')}
          </div>
        )}

        {isPaid && (
          <div className="offer-paid-badge">
            <CheckCircle size={16} />
            {t('chat.paymentConfirmed')}
          </div>
        )}
      </div>

      {showPayment && (
        <PaymentModal
          offer={offer}
          onPay={handlePay}
          onCancel={() => setShowPayment(false)}
        />
      )}
    </>
  );
}

// ═══════════════════════════════════════
// Conversation List View
// ═══════════════════════════════════════
function ConversationList({ onSelectConversation }) {
  const { userConversations } = useChat();
  const { t, language } = useLanguage();

  if (userConversations.length === 0) {
    return (
      <div className="chat-empty-state">
        <MessageCircle size={40} strokeWidth={1.2} />
        <p>{t('chat.noConversations')}</p>
        <span>{t('chat.noConversationsDesc')}</span>
      </div>
    );
  }

  return (
    <div className="chat-conv-list">
      {userConversations.map(conv => (
        <button
          key={conv.id}
          className={`chat-conv-item ${conv.unreadCount > 0 ? 'unread' : ''}`}
          onClick={() => onSelectConversation(conv.id)}
        >
          <div className="chat-conv-avatar">
            {conv.sellerAvatar ? (
              <img src={conv.sellerAvatar} alt="" />
            ) : (
              <div className="chat-avatar-placeholder">
                {(conv.sellerName || 'V')[0]}
              </div>
            )}
            {conv.unreadCount > 0 && (
              <span className="chat-conv-badge">{conv.unreadCount}</span>
            )}
          </div>
          <div className="chat-conv-info">
            <div className="chat-conv-top">
              <span className="chat-conv-name">{conv.sellerName}</span>
              <span className="chat-conv-time">{formatTime(conv.lastTimestamp, language)}</span>
            </div>
            <p className="chat-conv-preview">{conv.lastMessage}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════
// Message Thread View
// ═══════════════════════════════════════
function MessageThread({ conversationId, onBack }) {
  const { user } = useAuth();
  const { conversations, sendMessage, markAsRead } = useChat();
  const { t, language } = useLanguage();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const conv = conversations[conversationId];

  useEffect(() => {
    if (conversationId) {
      markAsRead(conversationId);
    }
  }, [conversationId, markAsRead]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conv?.messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [conversationId]);

  if (!conv) return null;

  const items = groupMessagesByDate(conv.messages, language);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(conversationId, input);
    setInput('');
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-thread">
      <div className="chat-thread-header">
        <button className="chat-back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
        </button>
        <div className="chat-thread-avatar">
          {conv.sellerAvatar ? (
            <img src={conv.sellerAvatar} alt="" />
          ) : (
            <div className="chat-avatar-placeholder">
              {(conv.sellerName || 'V')[0]}
            </div>
          )}
          <span className="chat-online-dot"></span>
        </div>
        <div className="chat-thread-info">
          <span className="chat-thread-name">{conv.sellerName}</span>
          <span className="chat-thread-status">{t('chat.online')}</span>
        </div>
      </div>

      <div className="chat-messages">
        {items.map(item => {
          if (item.type === 'date') {
            return (
              <div key={item.key} className="chat-date-separator">
                <span>{item.date}</span>
              </div>
            );
          }

          // System message
          if (item.type === 'system') {
            return (
              <div key={item.key} className="chat-system-msg">
                <span>{item.text}</span>
              </div>
            );
          }

          // Offer card
          if (item.type === 'offer') {
            const isMe = item.senderId === user?.id;
            return (
              <div key={item.key} className={`chat-bubble-wrapper ${isMe ? 'sent' : 'received'}`}>
                <OfferCard
                  offer={item.offer}
                  isMe={isMe}
                  conversationId={conversationId}
                />
              </div>
            );
          }

          // Regular message
          const isMe = item.senderId === user?.id;
          return (
            <div key={item.key} className={`chat-bubble-wrapper ${isMe ? 'sent' : 'received'}`}>
              <div className={`chat-bubble ${isMe ? 'chat-bubble-sent' : 'chat-bubble-received'}`}>
                <p>{item.text}</p>
                <span className="chat-bubble-time">{formatTime(item.timestamp, language)}</span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="chat-bubble-wrapper received">
            <div className="chat-bubble chat-bubble-received chat-typing">
              <div className="typing-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-bar">
        <input
          ref={inputRef}
          type="text"
          placeholder={t('chat.inputPlaceholder')}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className={`chat-send-btn ${input.trim() ? 'active' : ''}`}
          onClick={handleSend}
          disabled={!input.trim()}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// Main Chat Widget (floating)
// ═══════════════════════════════════════
export default function ChatWidget() {
  const { user } = useAuth();
  const { isChatOpen, setIsChatOpen, activeConversationId, setActiveConversationId, totalUnread } = useChat();
  const { t } = useLanguage();
  const [view, setView] = useState('list');

  useEffect(() => {
    if (activeConversationId && isChatOpen) {
      setView('thread');
    }
  }, [activeConversationId, isChatOpen]);

  if (!user) return null;

  const toggleChat = () => {
    if (isChatOpen) {
      setIsChatOpen(false);
      setView('list');
      setActiveConversationId(null);
    } else {
      setIsChatOpen(true);
      setView('list');
    }
  };

  const handleSelectConversation = (convId) => {
    setActiveConversationId(convId);
    setView('thread');
  };

  const handleBack = () => {
    setView('list');
    setActiveConversationId(null);
  };

  return (
    <>
      <button
        className={`chat-fab ${isChatOpen ? 'open' : ''}`}
        onClick={toggleChat}
        title={isChatOpen ? t('chat.dismissBtn') : t('chat.panelTitle')}
        id="chat-toggle-button"
      >
        {isChatOpen ? <ChevronDown size={24} /> : <MessageCircle size={24} />}
        {!isChatOpen && totalUnread > 0 && (
          <span className="chat-fab-badge">{totalUnread > 9 ? '9+' : totalUnread}</span>
        )}
      </button>

      {isChatOpen && (
        <div className="chat-panel animate-slide-up">
          <div className="chat-panel-header">
            <h3>💬 {t('chat.panelTitle')}</h3>
          </div>

          {view === 'list' ? (
            <ConversationList onSelectConversation={handleSelectConversation} />
          ) : (
            <MessageThread
              conversationId={activeConversationId}
              onBack={handleBack}
            />
          )}
        </div>
      )}
    </>
  );
}
