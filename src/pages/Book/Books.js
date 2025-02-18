import React, { useState } from "react";
import { motion } from "framer-motion";
import { Modal, Box, TextField, Button, Typography, Backdrop, Fade } from "@mui/material";
import { send } from "@emailjs/browser";
import sccCover from "../../Books/Second Chance Commet/cover.jpg";

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
    <div className="min-h-screen bg-gray-900 p-10 text-white">
      <h1 className="text-4xl font-bold text-center mb-10">📖 My Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <motion.div
            key={book.id}
            className="bg-gray-800 p-4 rounded-lg shadow-xl cursor-pointer hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal(book)}
          >
            <img src={book.cover} alt={book.title} className="w-25 h-64 mx-auto object-cover rounded-lg" />
            <h2 className="text-xl text-center font-semibold mt-4">{book.title}</h2>
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
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Want your name in the story?
            </Typography>
            <TextField
              fullWidth
              label="Enter your name"
              variant="outlined"
              value={readerName}
              onChange={(e) => setReaderName(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="contained" color="primary" onClick={sendEmail}>
                Open
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
