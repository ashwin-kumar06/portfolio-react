import React, { useState } from "react";
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
  useMediaQuery
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../logos/logo.jpg';
import photos from '../photosdata';

const StyledImageListItem = styled(ImageListItem)(({ theme }) => ({
  overflow: 'hidden',
  '& img': {
    transition: 'transform 0.3s ease-in-out',
  },
  '&:hover img': {
    transform: 'scale(1.1)',
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

  const handleOpenModal = (image) => {
    setSelectedImage(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const allPhotos = Object.values(photos);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <img src={logo} alt="Logo" style={{ width: 50, height: 50, marginRight: 10, borderRadius: '50%' }} />
          
          <IconButton color="inherit" href="/home">
            Home
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container  sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h2" gutterBottom align="center" sx={{ mb: 4 }}>
          My Photo Gallery
        </Typography>

        <ImageList variant="masonry" cols={isMobile ? 2 : 3} gap={8}>
          {allPhotos.map((item, index) => (
            <StyledImageListItem key={index} onClick={() => handleOpenModal(item)}>
              <img
                src={item}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
                style={{ cursor: 'pointer' }}
              />
            </StyledImageListItem>
          ))}
        </ImageList>
      </Container>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          outline: 'none',
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
      </Modal>
    </Box>
  );
}