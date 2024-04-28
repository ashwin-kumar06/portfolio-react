import React, { useEffect, useRef, useState } from 'react';

export default function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const chatContainerRef = useRef(null);

    // Define responses for different user inputs
    const responses = {
      "hi": ["Hello!", "Hi there!", "Hey!"],
      "how are you": ["I'm good, thanks!", "I'm doing well, how about you?"],
      "what's your name": ["I'm a chatbot!", "You can call me Chatbot."],
      "bye": ["Goodbye!", "See you later!", "Bye! Take care!"],
      "thank you": ["You're welcome!", "No problem!", "Anytime!"],
      "who are you": ["I'm a chatbot designed to assist you!", "I'm here to help you with any questions you have."],
      "help": ["Sure, what do you need help with?", "How can I assist you?"],
      "sorry": ["No worries!", "It's okay.", "Don't apologize!"],
      "tell me a joke": ["Why don't scientists trust atoms? Because they make up everything!", "Did you hear about the mathematician who’s afraid of negative numbers? He’ll stop at nothing to avoid them!"]
    };

    // Function to generate a response to user input
    const respond = (inputText) => {
        const inputTextLower = inputText.toLowerCase();
        for (const key in responses) {
            if (inputTextLower.startsWith(key)) {
                const possibleResponses = responses[key];
                return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
            }
        }
        return "I'm sorry, I don't understand that.";
    };

    // Function to handle user input and generate responses
    const handleUserInput = (inputText) => {
        const response = respond(inputText);
        setMessages([...messages, { text: inputText, sender: 'user' },{ text: response, sender: 'bot' }]);
    };

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

    useEffect(()=>{
        if (chatContainerRef.current){
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    },[messages]);

    return (
        <main className="content">
            <div className="container">
                <div className="card">
                    <div className="row">
                        <div className="col-12">

                            {/* Chat messages */}
                            <div className="position-relative" id='down'>
                                <div ref={chatContainerRef} className="chat-messages p-4">
                                    {messages.map((message, index) => (
                                        <div key={index} className={`chat-message-${message.sender === 'user' ? 'right' : 'left'} mb-4`}>
                                            <div className={`flex-shrink-1 bg-light rounded py-2 px-3 ${message.sender === 'user' ? 'mr-3' : 'ml-3'}`}>
                                                <div className="font-weight-bold mb-1">{message.sender === 'user' ? 'You' : 'Consci'}</div>
                                                {message.text}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Message input */}
                            <div className="flex-grow-0 py-3 px-4 border-top">
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Type your message" value={newMessage} onChange={handleInputChange} />
                                        <button type="submit" className="btn btn-primary">Send</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}