import React, { useState, useCallback } from "react";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  ImageList, 
  ImageListItem, 
  Modal,
  IconButton,
  useMediaQuery,
  Fade
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../logos/logo.jpg';
import photos from '../photosdata';

const StyledImageListItem = styled(motion(ImageListItem))(({ theme }) => ({
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  '& img': {
    transition: 'transform 0.3s ease-in-out',
  },
  '&:hover img': {
    transform: 'scale(1.05)',
  },
}));

const ModalImage = styled('img')({
  maxHeight: '90vh',
  maxWidth: '90vw',
  objectFit: 'contain',
});

export default function PhotoAlbum() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenModal = useCallback((image) => {
    setSelectedImage(image);
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const allPhotos = Object.values(photos);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <img 
            src={logo} 
            alt="Logo" 
            style={{ width: 50, height: 50, marginRight: 10, borderRadius: '50%' }} 
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Photo Gallery
          </Typography>
          <IconButton color="inherit" href="/home" aria-label="home">
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          My Photo Gallery
        </Typography>

        <ImageList variant="masonry" cols={isMobile ? 2 : 3} gap={16}>
          <AnimatePresence>
            {allPhotos.map((item, index) => (
              <StyledImageListItem 
                key={index} 
                onClick={() => handleOpenModal(item)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <img
                  src={item}
                  alt={`Gallery image ${index + 1}`}
                  loading="lazy"
                  style={{ cursor: 'pointer' }}
                />
              </StyledImageListItem>
            ))}
          </AnimatePresence>
        </ImageList>
      </Container>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
      >
        <Fade in={openModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            outline: 'none',
            borderRadius: theme.shape.borderRadius,
          }}>
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedImage && <ModalImage src={selectedImage} alt="Selected" />}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}