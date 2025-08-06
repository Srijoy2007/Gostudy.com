'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// Manually define the Resource type
interface Resource {
  id: number;
  title: string;
  subject: string;
  type: string;
  youtubeUrl: string; 
  pdf?: string;
  description?: string;
  homework?: string;
  thumbnail?: string; // Add thumbnail as an optional property
}



const categories = ['CSE', 'ECE', 'MATHEMATICS', 'ENGLISH', 'PHYSICS', 'CHEMISTRY'];

// Static resource data with YouTube URLs and thumbnail mapping
const resourcesData = [
  {
    id: 1,
    title: 'CS01: Introduction to algorithm',
    subject: 'CSE',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/dkTOJXPBgpM', // Replace with actual YouTube video ID
    pdf: '/pdfs/CS1.pdf',
    description: 'An overview of algorithms with practical applications and introductory concepts.',
    homework: '/CS1H.png',
    thumbnail: '/C1.png', // Add thumbnail path
  },
  {
    id: 2,
    title: 'Math01: Number System & Binomial Algebra',
    subject: 'MATHEMATICS',
    type: 'video',
    youtubeUrl: 'https://www.youtube.com/embed/xyz789', // Replace with actual YouTube video ID
    pdf: '/pdfs/MAT1.pdf',
    description: 'Covers fundamentals of number systems and introductory binomial theorems.',
    thumbnail: '/M1.png', // Add thumbnail path
  },
  {
    id: 3,
    title: 'E01: Writing skills',
    subject: 'ENGLISH',
    type: 'video',
    youtubeUrl: '', // Replace with actual YouTube video ID
    pdf: '/pdfs/E1.pdf',
    description: 'Some random shit about writing skills',
    thumbnail: '/E1.png', // Add thumbnail path
  },
];

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('CSE');
  const [resources, setResources] = useState<Resource[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Filter resources based on selected category
    const filteredResources = resourcesData.filter((item) => item.subject === selectedCategory);
    setResources(filteredResources);
  }, [selectedCategory]);

  useEffect(() => {
    if (isMenuOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen bg-[#FFEDD5] text-black relative">
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
              <span
                className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
              ></span>
              <span
                className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
              ></span>
              <span
                className={`w-full h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              ></span>
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
                  isActive
                    ? 'bg-[#FC6D2F] text-black border-black'
                    : 'text-black hover:text-blue-600'
                }`}
              >
                {link.toUpperCase()}
              </Link>
            );
          })}
        </nav>
      </header>

      <nav
        className={`${isMenuOpen ? 'flex flex-col slide-in' : 'hidden'} md:hidden fixed top-0 right-0 bg-black text-white p-6 shadow-md rounded-l-lg w-1/2 h-screen z-20`}
        style={{ transformOrigin: 'right', transition: 'transform 0.4s ease-in-out' }}
      >
        {['Home', 'Lectures', 'Books', 'Notes'].map((link) => {
          const href = link === 'Home' ? '/' : `/${link.toLowerCase()}`;
          const isActive = pathname === href;
          return (
            <Link
              key={link}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className={`block py-3 text-sm font-semibold px-4 rounded border transition ${
                isActive
                  ? 'bg-[#FC6D2F] text-black border-black'
                  : 'hover:text-blue-600'
              }`}
              style={{ marginBottom: '1rem' }}
            >
              {link.toUpperCase()}
            </Link>
          );
        })}
      </nav>

      <main className="container mx-auto p-6">
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 border rounded-full font-medium text-sm ${
                selectedCategory === cat
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-gray-100'
              } transition`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {resources.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden cursor-pointer group"
              onClick={() => router.push(`/lectures/${encodeURIComponent(item.title)}`)}
            >
              <div className="relative w-full h-40">
                <Image
                  src={item.thumbnail || '/video-placeholder.jpg'} // Use item.thumbnail or fallback to placeholder
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-3 relative">
                <h3 className="font-semibold text-sm text-center">{item.title}</h3>
                <span className="absolute bottom-2 right-2 text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                  {item.type.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="w-full bg-[#FFEDD5] text-gray-500 p-2 fixed bottom-0 left-0 text-center">
        <p className="text-sm font-semibold">Made by LEO AND AQUA | v1.0 🔥</p>
        <p className="text-sm font-semibold">Contact for queries: Discord - leo_aqua#1234</p>
      </footer>
    </div>
  );
}