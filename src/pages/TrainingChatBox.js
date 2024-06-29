import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';

export default function TrainingChatBox() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const chatContainerRef = useRef(null);

    const callChatbotAPI = async (message) => {
        try {
            const response = await axios.post('https://myai-1-hx35.onrender.com/chatbot/chat', { message });
            return response.data.response;
        } catch (error) {
            console.error('Error calling chatbot API:', error);
            return "Sorry, I'm having trouble connecting right now.";
        }
    };

    const sendFeedback = async (message, correctResponse) => {
        try {
            await axios.post('https://myai-1-hx35.onrender.com/chatbot/feedback', {
                message,
                correct_response: correctResponse
            });
            setFeedbackMessage('Feedback sent successfully!');
        } catch (error) {
            console.error('Error sending feedback:', error);
            setFeedbackMessage('Failed to send feedback. Please try again.');
        }
    };

    const handleUserInput = useCallback(async (inputText) => {
        setMessages(prevMessages => [...prevMessages, { text: inputText, sender: 'user' }]);
        setIsLoading(true);
        const response = await callChatbotAPI(inputText);
        setIsLoading(false);
        setMessages(prevMessages => [...prevMessages, { text: response, sender: 'bot' }]);
    }, []);

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim() !== '') {
            handleUserInput(newMessage.trim());
            setNewMessage('');
        }
    };

    const handleFeedback = (message, index) => {
        const correctResponse = prompt('Please enter the correct response:');
        if (correctResponse) {
            sendFeedback(message.text, correctResponse);
            // Update the message to show it's been corrected
            setMessages(prevMessages => {
                const newMessages = [...prevMessages];
                newMessages[index] = { ...newMessages[index], corrected: correctResponse };
                return newMessages;
            });
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <main className="content">
            <div className="container">
                <div className="card">
                    <div className="row">
                        <div className="col-12">
                            <div className="position-relative" id='down'>
                                <div ref={chatContainerRef} className="chat-messages p-4">
                                    {messages.map((message, index) => (
                                        <div key={index} className={`chat-message-${message.sender === 'user' ? 'right' : 'left'} mb-4`}>
                                            <div className={`flex-shrink-1 bg-light rounded py-2 px-3 ${message.sender === 'user' ? 'mr-3' : 'ml-3'}`}>
                                                <div className="font-weight-bold mb-1">{message.sender === 'user' ? 'You' : 'Consci'}</div>
                                                {message.text}
                                                {message.sender === 'bot' && (
                                                    <button onClick={() => handleFeedback(message, index)} className="btn btn-sm btn-outline-secondary mt-2">
                                                        Provide Feedback
                                                    </button>
                                                )}
                                                {message.corrected && (
                                                    <div className="text-success mt-2">
                                                        Corrected: {message.corrected}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="chat-message-left mb-4">
                                            <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                                <div className="font-weight-bold mb-1">Consci</div>
                                                Typing...
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex-grow-0 py-3 px-4 border-top">
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Type your message" 
                                            value={newMessage} 
                                            onChange={handleInputChange} 
                                        />
                                        <button type="submit" className="btn btn-primary">Send</button>
                                    </div>
                                </form>
                            </div>
                            {feedbackMessage && (
                                <div className="alert alert-info mt-3">{feedbackMessage}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}