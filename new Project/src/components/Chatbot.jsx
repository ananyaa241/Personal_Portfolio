import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi there! I am your study assistant. Ask me anything related to your syllabus.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const searchQuery = encodeURIComponent(input);
            const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&utf8=&format=json&origin=*`);
            const data = await response.json();

            let reply = "Sorry, I couldn't find any relevant study material for that.";

            if (data.query && data.query.search && data.query.search.length > 0) {
                // Get the top result
                const topResult = data.query.search[0];
                // Strip HTML tags from snippet
                const cleanSnippet = topResult.snippet.replace(/<\/?[^>]+(>|$)/g, "");
                reply = `Based on a web search for "${topResult.title}":\n\n${cleanSnippet}...`;
            }

            setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
        } catch (error) {
            console.error("Chatbot error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "An error occurred while searching the web." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1000,
            fontFamily: 'inherit'
        }}>
            {/* Chat Window */}
            {isOpen && (
                <div className="glass-panel" style={{
                    width: '350px',
                    height: '500px',
                    marginBottom: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.4)'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(255,182,193, 0.5)',
                        borderBottom: '1px solid rgba(255,255,255,0.3)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <h3 style={{ margin: 0, fontSize: '1.2rem', fontStyle: 'italic' }}>Study Assistant</h3>
                        <button className="btn-icon" onClick={toggleChat} style={{ border: 'none', cursor: 'pointer', background: 'transparent' }}>
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Body */}
                    <div style={{
                        flex: 1,
                        padding: '1rem',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                background: msg.role === 'user' ? 'var(--primary-color)' : 'rgba(255,255,255,0.8)',
                                color: msg.role === 'user' ? '#fff' : 'var(--dark-text)',
                                padding: '0.75rem 1rem',
                                borderRadius: msg.role === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                                maxWidth: '80%',
                                wordBreak: 'break-word',
                                fontSize: '0.95rem'
                            }}>
                                {msg.content}
                            </div>
                        ))}
                        {isLoading && (
                            <div style={{
                                alignSelf: 'flex-start',
                                background: 'rgba(255,255,255,0.8)',
                                padding: '0.75rem 1rem',
                                borderRadius: '12px 12px 12px 0',
                                fontStyle: 'italic',
                                opacity: 0.7
                            }}>
                                Typing...
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div style={{
                        padding: '1rem',
                        borderTop: '1px solid rgba(255,255,255,0.3)',
                        display: 'flex',
                        gap: '0.5rem',
                        background: 'rgba(255,255,255, 0.4)'
                    }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask a question..."
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(0,0,0,0.1)',
                                outline: 'none',
                                background: 'rgba(255,255,255,0.9)',
                                fontStyle: 'italic'
                            }}
                        />
                        <button
                            className="btn"
                            onClick={handleSend}
                            disabled={isLoading}
                            style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Bubble */}
            <button
                className="btn"
                onClick={toggleChat}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    padding: 0
                }}
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>
        </div>
    );
}

export default Chatbot;
