{/** 'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Book = {
  title: string;
  author: string;
  pdf: string;
  cover: string;
};

type Section = {
  name: string;
  books: Book[];
};

const sections: Section[] = [
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
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeSection, setActiveSection] = useState('Mathematics');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const activeBooks = sections.find((s) => s.name === activeSection)?.books || [];

  const filteredBooks = activeBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#FFEDD5] min-h-screen">
    
      <header className="w-full px-4 md:px-12 py-4 flex justify-between items-center border-b bg-[#FFEDD5] shadow-sm">
        <Link href="/" className="cursor-pointer transition-transform duration-200 hover:scale-105">
          <h1 style={{ fontFamily: "'Press Start 2P', cursive", color: '#FC6D2F', fontSize: '24px', margin: 0 }}>
            GOSTUDY.COM
          </h1>
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        <nav className="hidden md:flex space-x-4 md:space-x-6">
          {['Home', 'Lectures', 'Books', 'Notes'].map((link) => {
            const href = link === 'Home' ? '/' : `/${link.toLowerCase()}`;
            const isActive = pathname === href;
            return (
              <Link
                key={link}
                href={href}
                className={`text-sm md:text-base font-semibold px-3 py-1 rounded border transition ${
                  isActive ? 'bg-[#FC6D2F] text-black border-black' : 'text-black hover:text-blue-600'
                }`}
              >
                {link.toUpperCase()}
              </Link>
            );
          })}
        </nav>
      </header>


      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 bg-[#FFEDD5] shadow-sm space-y-2">
          {['Home', 'Lectures', 'Books', 'Notes'].map((link) => {
            const href = link === 'Home' ? '/' : `/${link.toLowerCase()}`;
            const isActive = pathname === href;
            return (
              <Link
                key={link}
                href={href}
                className={`block text-sm font-semibold px-3 py-2 rounded border transition ${
                  isActive ? 'bg-[#FC6D2F] text-black border-black' : 'text-black hover:text-blue-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.toUpperCase()}
              </Link>
            );
          })}
        </div>
      )}

    
      <div className="px-4 sm:px-6 py-4 text-black">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex flex-wrap gap-3">
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

          <input
            type="text"
            placeholder="Search books or authors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-full px-4 py-2 shadow-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="mb-10">
          <div className="text-xl font-bold mb-4">{activeSection}</div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {filteredBooks.map((book, idx) => (
              <div
                key={idx}
                className="min-w-[160px] sm:min-w-[180px] cursor-pointer hover:shadow-md bg-white rounded p-2 relative"
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
                <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full shadow">
                  ★ 4.5
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
              <div className="flex-1">
                <div className="text-lg font-bold mb-1">{selectedBook.title}</div>
                <div className="text-sm text-gray-600 mb-2">by {selectedBook.author}</div>

                <div className="flex flex-wrap gap-3 mb-4">
                  <a
                    href={selectedBook.pdf}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                  >
                    Download PDF
                  </a>

                  <button className="px-4 py-2 rounded border hover:bg-gray-100">
                    Bookmark
                  </button>
                  <button className="px-4 py-2 rounded border hover:bg-gray-100">
                    Comment
                  </button>
                </div>

               
                  
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} */}
 export default function UnderConstruction() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFEDD5] text-center text-black">
      <h1 className="text-2xl font-bold mb-4">🚧 Under Construction</h1>
      <p className="text-sm text-gray-700">This page is currently being built. Check back soon!</p>
    </div>
  );
}
