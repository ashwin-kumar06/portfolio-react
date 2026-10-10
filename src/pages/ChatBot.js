import React, { useState } from 'react';
import bot from '../logos/chatbot.gif'
import ChatBox from './ChatBox';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../constant';

const RetroChatContainer = styled(motion.div)`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const RetroImageFrame = styled.div`
  background: ${COLORS.goldenYellow};
  border: 3px solid #000;
  box-shadow: 6px 6px 0px #000;
  padding: 0.5rem;
  transition: all 0.1s;
  
  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000;
  }
`;

const Title = styled(motion.div)`
  font-family: 'Press Start 2P', monospace;
  font-size: 1rem;
  margin-top: 1rem;
  color: #000;
  background: #fff;
  border: 2px solid #000;
  padding: 0.5rem 1rem;
  box-shadow: 3px 3px 0px #000;
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
        <div style={{ position: 'relative', zIndex: 10 }}>
            {isOpen ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <RetroImageFrame onClick={closeChatBox} style={{ cursor: 'pointer', marginBottom: '1rem', width: '100px' }}>
                        <img src={bot} alt="Chatbot" style={{ width: '100%' }} />
                    </RetroImageFrame>
                    <ChatBox isOpen={isOpen} onClose={closeChatBox} />
                </div>
            ) : (
                <RetroChatContainer onClick={toggleChatBox}>
                    <RetroImageFrame>
                        <img src={bot} alt="Chatbot" style={{ width: 200 }} />
                    </RetroImageFrame>
                    <Title
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                    >
                        CLICK TO TALK.EXE
                    </Title>
                </RetroChatContainer>
            )}
        </div>
    );
};