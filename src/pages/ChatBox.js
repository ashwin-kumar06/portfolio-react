import React, { useState } from 'react';

export default function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleInputChange = (e) => {
        setNewMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim() !== '') {
            // Add the new message to the messages array
            setMessages([...messages, { text: newMessage, sender: 'user' }]);
            // Clear the input field after sending the message
            setNewMessage('');
            // Here you can handle sending the message to a server or any other logic
        }
    };

    return (
        <main className="content">
            <div className="container">
                <div className="card">
                    <div className="row">
                        <div className="col-12">

                            {/* Chat messages */}
                            <div className="position-relative">
                                <div className="chat-messages p-4">
                                    <div class="chat-message-left pb-4">
                                        <div>
                                            <img src="https://bootdey.com/img/Content/avatar/avatar3.png" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40"/>
                                        </div>
                                        <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                            <div class="font-weight-bold mb-1">Consci</div>
                                            Hi, How are you?
                                        </div>
                                    </div>

                                    <div class="chat-message-right mb-4">
                                        <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                            <div class="font-weight-bold mb-1">You</div>
                                            Im fine
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Message input */}
                            <div className="flex-grow-0 py-3 px-4 border-top">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Type your message" />
                                    <button className="btn btn-primary">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}