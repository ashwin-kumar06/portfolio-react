import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  Avatar, 
  CircularProgress,
  Modal,
  IconButton
} from '@mui/material';
import { Send as SendIcon, Person as PersonIcon, Close as CloseIcon } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

export default function ChatBox({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const handleClose = () => {
    onClose();
  };

  const callChatbotAPI = async (message) => {
    const timeoutDuration = 30000; // 30 seconds
  
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeoutDuration)
    );
  
    try {
      const responsePromise = axios.post('https://myai-1-hx35.onrender.com/chatbot/chat', { message });
      const response = await Promise.race([responsePromise, timeoutPromise]);
      return response.data.response;
    } catch (error) {
      console.error('Error calling chatbot API:', error);
      return "Sorry, I'm having trouble connecting right now. Please try again later.";
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
      setMessages(prevMessages => [...prevMessages, { text: "Sorry, an error occurred. Please try again.", sender: 'bot' }]);
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
  }, [messages]);

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={isOpen}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '80%',
            height: '60%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
          }}
         >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url(https://source.unsplash.com/random/1920x1080/?nature)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(10px)',
              transform: 'scale(1.1)',
              zIndex: -1,
            }}
          />
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 1,
              }}
            >
              <IconButton onClick={handleClose} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
            <Box
              ref={chatContainerRef}
              sx={{
                flex: 1,
                overflowY: 'auto',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {messages.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                      alignItems: 'center',
                      maxWidth: '70%',
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: message.sender === 'user' ? 'secondary.main' : 'primary.main',
                        mr: message.sender === 'user' ? 0 : 1,
                        ml: message.sender === 'user' ? 1 : 0,
                      }}
                    >
                      {message.sender === 'user' ? <PersonIcon /> : 'C'}
                    </Avatar>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        bgcolor: message.sender === 'user' ? 'secondary.light' : 'primary.light',
                      }}
                    >
                      <Typography variant="body1">{message.text}</Typography>
                    </Paper>
                  </Box>
                </Box>
              ))}
              {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              )}
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                p: 2,
                borderTop: 1,
                borderColor: 'divider',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type your message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  sx={{ mr: 1 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  endIcon={<SendIcon />}
                  disabled={!newMessage.trim()}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}