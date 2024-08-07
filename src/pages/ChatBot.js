import React, { useState } from 'react';
import bot from '../logos/chatbot.gif'
import ChatBox from './ChatBox';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Title = styled(motion.h1)`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #C8ACD6;
`;

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChatBox = () => {
        setIsOpen(!isOpen);
    };

    const closeChatBox = () => {
        setIsOpen(false);
    };



    return (
        <div >
            {isOpen ? (
                <div className='ChatBox d-flex' >
                    <div className='close-chat' onClick={() => { closeChatBox() }} style={{ cursor: 'pointer' }}>
                        <img src={bot} style={{ width: 250 }} className='chatbot-img' />
                    </div>
                    <ChatBox isOpen={isOpen} onClose={closeChatBox} />
                </div>
            ) : (
                <div className={`chatbot-container ${isOpen ? 'open' : ''}`} onClick={() => { toggleChatBox() }}>

                    <img src={bot} style={{ width: 250 }} className='chatbot-img' />
                    <Title
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                    >
                        Click to talk
                    </Title>
                </div>
            )}
        </div>
    );
};