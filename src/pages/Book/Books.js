import React, { useState } from "react";
import { motion } from "framer-motion";
import { Modal, Box, TextField, Button, Typography, Backdrop, Fade } from "@mui/material";
import { send } from "@emailjs/browser";
import sccCover from "../../Books/Second Chance Commet/cover.jpg";
import { COLORS } from "../../constant";

const books = [
  { id: 1, title: "Second Chance Commet", cover: sccCover },
];

export default function Books() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [readerName, setReaderName] = useState("");
  const [open, setOpen] = useState(false);

  const openModal = (book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setReaderName("");
  };

  const sendEmail = async () => {
    if (!readerName) {
      alert("Please enter your name.");
      return;
    }

    const emailParams = {
      book_title: selectedBook.title,
      reader_name: readerName,
      recipient_email: "ashwinkumar0850@gmail.com",
      to_name: "Ashwin"
    };

    try {
      await send("service_dmqn8z9", "template_ypo2wkb", emailParams, "ZsNn8cANpSqGjjXmW");
      alert("Request sent successfully!");
      handleClose();
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send request.");
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#161d19', color: '#f0f4f1', padding: '2.5rem' }}>
      <h1 className="text-4xl font-bold text-center mb-10" style={{ color: COLORS.goldenYellow }}>📖 My Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <motion.div
            key={book.id}
            style={{
              backgroundColor: '#202a24',
              border: '1px solid rgba(162, 185, 167, 0.25)',
              padding: '1rem',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              cursor: 'pointer'
            }}
            whileHover={{ scale: 1.05, borderColor: COLORS.goldenYellow }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal(book)}
          >
            <img src={book.cover} alt={book.title} className="w-25 h-64 mx-auto object-cover rounded-lg" />
            <h2 className="text-xl text-center font-semibold mt-4" style={{ color: COLORS.goldenYellow }}>{book.title}</h2>
          </motion.div>
        ))}
      </div>

      {/* MUI Modal */}
      <Modal open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "#202a24",
              color: "#f0f4f1",
              border: "1px solid rgba(162, 185, 167, 0.3)",
              borderRadius: 3,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom sx={{ color: COLORS.goldenYellow }}>
              Want your name in the story?
            </Typography>
            <TextField
              fullWidth
              label="Enter your name"
              variant="outlined"
              value={readerName}
              onChange={(e) => setReaderName(e.target.value)}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: 'rgba(162, 185, 167, 0.4)' },
                  '&:hover fieldset': { borderColor: COLORS.goldenYellow },
                },
                '& .MuiInputLabel-root': { color: COLORS.lightSage }
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                onClick={sendEmail}
                sx={{
                  backgroundColor: `${COLORS.burntOrange} !important`,
                  color: '#fff !important',
                  '&:hover': { backgroundColor: `${COLORS.goldenYellow} !important`, color: '#161d19 !important' }
                }}
              >
                Open
              </Button>
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{
                  color: `${COLORS.lightSage} !important`,
                  borderColor: `${COLORS.lightSage} !important`,
                  '&:hover': { borderColor: `${COLORS.goldenYellow} !important`, color: `${COLORS.goldenYellow} !important` }
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
