import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import sccCover from "../../Books/Second Chance Commet/cover.jpg"

const books = [
  { id: 1, title: "Second Chance Commet", cover: sccCover},
];

export default function Books (){
  const navigate = useNavigate();

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
            onClick={() => navigate(`/book/${book.id}`, { state: { book } })}
          >
            <img src={book.cover} alt={book.title} className="w-25" />
            <h2 className="text-xl text-center font-semibold mt-4">{book.title}</h2>
          </motion.div>
        ))}
      </div>
    </div>
  );
};