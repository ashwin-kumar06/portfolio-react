import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWindowClose, FaRegWindowMaximize, FaWindowMinimize, FaPaperPlane } from 'react-icons/fa';
import { COLORS } from '../constant';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const RetroWindow = styled(motion.div)`
  background: ${COLORS.lightSage};
  border: 3px solid #000;
  box-shadow: 10px 10px 0px #000;
  width: 90%;
  max-width: 600px;
  height: 70vh;
  display: flex;
  flex-direction: column;
`;

const WindowHeader = styled.div`
  background: ${COLORS.sageGreen};
  border-bottom: 3px solid #000;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
`;

const WindowIcons = styled.div`
  display: flex;
  gap: 0.5rem;
  
  svg {
    cursor: pointer;
    background: ${COLORS.lightSage};
    color: #000;
    border: 1px solid #000;
    padding: 2px;
  }
`;

const ChatArea = styled.div`
  flex: 1;
  background: #fff;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-bottom: 3px solid #000;
  
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background: #fff;
    border-left: 2px solid #000;
  }
  &::-webkit-scrollbar-thumb {
    background: ${COLORS.goldenYellow}; 
    border: 2px solid #000;
  }
`;

const MessageBubble = styled.div`
  max-width: 80%;
  padding: 1rem;
  font-family: 'VT323', monospace;
  font-size: 1.4rem;
  border: 3px solid #000;
  box-shadow: 4px 4px 0px #000;
  align-self: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  background: ${props => props.$isUser ? COLORS.goldenYellow : COLORS.lightSage};
  color: #000;
`;

const InputArea = styled.form`
  display: flex;
  padding: 1rem;
  background: ${COLORS.lightSage};
  gap: 1rem;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  background: #fff;
  border: 3px solid #000;
  box-shadow: inset 3px 3px 0px rgba(0,0,0,0.2);
  font-family: 'VT323', monospace;
  font-size: 1.5rem;
  
  &:focus {
    outline: none;
    background: #fffae6;
  }
`;

const SendButton = styled.button`
  background: ${COLORS.burntOrange};
  color: #fff;
  border: 3px solid #000;
  box-shadow: 4px 4px 0px #000;
  padding: 0 1.5rem;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000;
  }
  &:disabled {
    background: #999;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

export default function ChatBox({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const callChatbotAPI = async (message) => {
    try {
      const response = await axios.post(
        'https://consci-v2.onrender.com/chat',
        { request: message },
        { timeout: 30000 }
      );
      return response.data.response;
    } catch (error) {
      console.error('Error calling chatbot API:', error.response?.data ?? error.message);
      return error.message;
    }
  };

  const handleUserInput = useCallback(async (inputText) => {
    setMessages(prevMessages => [...prevMessages, { text: inputText, sender: 'user' }]);
    setIsLoading(true);
    try {
      const response = await callChatbotAPI(inputText);
      setMessages(prevMessages => [...prevMessages, { text: response, sender: 'bot' }]);
    } catch (error) {
      console.error('Error in handleUserInput:', error);
      setMessages(prevMessages => [...prevMessages, { text: "SYSTEM ERROR: CONNECTION REFUSED", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      handleUserInput(newMessage.trim());
      setNewMessage('');
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <RetroWindow
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <WindowHeader>
              <span>CHAT_ASSISTANT.EXE</span>
              <WindowIcons>
                <FaWindowMinimize onClick={onClose} />
                <FaRegWindowMaximize />
                <FaWindowClose onClick={onClose} />
              </WindowIcons>
            </WindowHeader>
            
            <ChatArea ref={chatContainerRef}>
              {messages.length === 0 && (
                <div style={{ textAlign: 'center', color: '#999', fontFamily: "'VT323', monospace", fontSize: '1.5rem', marginTop: '2rem' }}>
                  [System initialized. Waiting for input...]
                </div>
              )}
              {messages.map((message, index) => (
                <MessageBubble key={index} $isUser={message.sender === 'user'}>
                  {message.text}
                </MessageBubble>
              ))}
              {isLoading && (
                <MessageBubble $isUser={false} style={{ animation: "pulse 1.5s infinite" }}>
                  PROCESSING...
                </MessageBubble>
              )}
            </ChatArea>
            
            <InputArea onSubmit={handleSubmit}>
              <StyledInput 
                type="text"
                placeholder="Enter command..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <SendButton type="submit" disabled={!newMessage.trim() || isLoading}>
                SEND <FaPaperPlane />
              </SendButton>
            </InputArea>
          </RetroWindow>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
}
