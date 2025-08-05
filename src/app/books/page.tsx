"use client";

import { useState } from 'react';

const sections = [
  {
    name: 'Mathematics',
    books: [
      {
        title: 'Calculus Basics',
        author: 'Isaac Newton',
        pdf: '/pdfs/calculus.pdf',
        cover: 'https://covers.openlibrary.org/b/id/10492352-L.jpg',
      },
      {
        title: 'Linear Algebra Intro',
        author: 'David Lay',
        pdf: '/pdfs/linear-algebra.pdf',
        cover: 'https://covers.openlibrary.org/b/id/10569336-L.jpg',
      },
    ],
  },
  {
    name: 'Physics',
    books: [
      {
        title: 'Fundamentals of Physics',
        author: 'Halliday & Resnick',
        pdf: '/pdfs/fundamentals.pdf',
        cover: 'https://covers.openlibrary.org/b/id/8281993-L.jpg',
      },
      {
        title: 'Quantum Mechanics',
        author: 'Richard Feynman',
        pdf: '/pdfs/quantum.pdf',
        cover: 'https://covers.openlibrary.org/b/id/11153291-L.jpg',
      },
    ],
  },
  {
    name: 'Computer Science',
    books: [
      {
        title: 'Intro to Algorithms',
        author: 'CLRS',
        pdf: '/pdfs/algorithms.pdf',
        cover: 'https://covers.openlibrary.org/b/id/11125024-L.jpg',
      },
      {
        title: 'Operating Systems',
        author: 'Andrew S. Tanenbaum',
        pdf: '/pdfs/os.pdf',
        cover: 'https://covers.openlibrary.org/b/id/9259861-L.jpg',
      },
    ],
  },
];

export default function BookLibrary() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [activeSection, setActiveSection] = useState('Mathematics');

  const activeBooks = sections.find((s) => s.name === activeSection)?.books || [];

  return (
    <div className="bg-[#FFF7ED] min-h-screen px-4 sm:px-6 py-4 text-black">
    
      <div className="flex flex-wrap gap-3 mb-6">
        {sections.map((section, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSection(section.name)}
            className={`text-sm px-4 py-2 rounded-full border shadow-sm transition-colors duration-200 ${
              activeSection === section.name
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-black border-gray-300 hover:bg-gray-100'
            }`}
          >
            {section.name}
          </button>
        ))}
      </div>

      
      <div className="mb-10">
        <div className="text-xl font-bold mb-4">{activeSection}</div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {activeBooks.map((book, idx) => (
            <div
              key={idx}
              className="min-w-[160px] sm:min-w-[180px] cursor-pointer hover:shadow-md bg-white rounded p-2"
              onClick={() => setSelectedBook(book)}
            >
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-48 object-cover rounded"
              />
              <div className="mt-2 text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                {book.title}
              </div>
              <div className="text-xs text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">
                {book.author}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedBook && (
        <div className="mt-10 border-t pt-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <img
              src={selectedBook.cover}
              alt={selectedBook.title}
              className="w-40 h-56 rounded shadow"
            />
            <div>
              <div className="text-lg font-bold">{selectedBook.title}</div>
              <div className="text-sm text-gray-600 mb-4">by {selectedBook.author}</div>
              <a
                href={selectedBook.pdf}
                download
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                ⬇️ Download PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
