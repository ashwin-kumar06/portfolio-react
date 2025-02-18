import React from "react";
import HTMLFlipBook from "react-pageflip";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import page1 from "../../Books/Second Chance Commet/Second Chance Comet_pages-to-jpg-0001.jpg";
import page2 from "../../Books/Second Chance Commet/Second Chance Comet_pages-to-jpg-0002.jpg";
import page3 from "../../Books/Second Chance Commet/Second Chance Comet_pages-to-jpg-0003.jpg";
import page4 from "../../Books/Second Chance Commet/Second Chance Comet_pages-to-jpg-0004.jpg";
import page5 from "../../Books/Second Chance Commet/Second Chance Comet_pages-to-jpg-0005.jpg";
import page6 from "../../Books/Second Chance Commet/Second Chance Comet_pages-to-jpg-0006.jpg";
import page7 from "../../Books/Second Chance Commet/Second Chance Comet_pages-to-jpg-0007.jpg";
import page8 from "../../Books/Second Chance Commet/Second Chance Comet_pages-to-jpg-0008.jpg";
import page9 from "../../Books/Second Chance Commet/Second Chance Comet_pages-to-jpg-0009.jpg";
import page10 from "../../Books/Second Chance Commet/Second Chance Comet_pages-to-jpg-0010.jpg";
import page11 from "../../Books/Second Chance Commet/Second Chance Comet_pages-to-jpg-0011.jpg";
import page12 from "../../Books/Second Chance Commet/Second Chance Comet_pages-to-jpg-0012.jpg";
import page13 from "../../Books/Second Chance Commet/Second Chance Comet_pages-to-jpg-0013.jpg";


export default function BookReader(){
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;

  if (!book) return <div className="text-center text-red-500">Book not found</div>;

  const pages = [
    page1,
    page2,
    page3,
    page4,
    page5,
    page6,
    page7,
    page8,
    page9,
    page10,
    page11,
    page12,
    page13
  ];

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        className="flex items-center gap-2 text-gray-300 hover:text-white mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={20} />
        <span>Back to Books</span>
      </button>

      <h1 className="text-3xl font-bold mb-6">{book.title}</h1>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="shadow-2xl rounded-lg overflow-hidden"
      >
        <HTMLFlipBook width={400} height={600} showCover={true} className="shadow-2xl">
          {pages.map((page, index) => (
            <div key={index} className="page bg-white p-6 flex items-center justify-center">
              <img src={page} alt={`Page ${index + 1}`} className="w-100 h-full object-cover rounded-lg" />
            </div>
          ))}
        </HTMLFlipBook>
      </motion.div>
    </motion.div>
  );
};
