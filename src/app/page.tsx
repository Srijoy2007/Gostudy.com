'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const categories = ['CSE', 'ECE', 'MATHEMATICS', 'ENGLISH', 'PHYSICS', 'CHEMISTRY'];

const videoData = [
  { title: 'CS01: Introduction to algorithm', thumbnail: '/C1.png', subject: 'CSE', type: 'video', src: '/videos/CS1.mp4' },
  { title: 'Math01: Number System & Binomial Algebra', thumbnail: '/M1.png', subject: 'MATHEMATICS', type: 'video', src: '/videos/M1.mp4' },

 
  
  { title: 'E01: Writing skills', thumbnail: '/video4.jpg', subject: 'ENGLISH', type: 'video', src: '/videos/E1.mp4' },
  
];

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('CSE');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredVideos = videoData.filter((item) => item.subject === selectedCategory);

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
    <div className="min-h-screen bg-[#FFEDD5] text-black relative pb-16">

      <header className="w-full px-4 md:px-12 py-4 flex justify-between items-center border-b bg-[#FFEDD5] shadow-sm">
        <Link href="/" className="transition-transform hover:scale-105">
          <h1 className="text-xl font-bold text-[#FC6D2F] tracking-wide" style={{ fontFamily: "'Press Start 2P', cursive" }}>
            GOSTUDY.COM
          </h1>
        </Link>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-black transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-black transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        <nav className="hidden md:flex space-x-6">
          {['Home', 'Lectures', 'Books', 'Notes'].map((link) => {
            const href = link === 'Home' ? '/' : `/${link.toLowerCase()}`;
            const isActive = pathname === href;

            return (
              <Link
                key={link}
                href={href}
                className={`text-sm font-semibold px-4 py-1 rounded border transition-all ${
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
        className={`fixed top-0 right-0 z-30 h-screen w-2/3 sm:w-1/2 bg-black text-white transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out flex flex-col p-6 space-y-6 rounded-l-lg shadow-lg md:hidden`}
      >
        {['Home', 'Lectures', 'Books', 'Notes'].map((link) => {
          const href = link === 'Home' ? '/' : `/${link.toLowerCase()}`;
          const isActive = pathname === href;

          return (
            <Link
              key={link}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className={`block text-base font-semibold px-4 py-2 rounded border ${
                isActive
                  ? 'bg-[#FC6D2F] text-black border-black'
                  : 'hover:text-blue-500'
              }`}
            >
              {link.toUpperCase()}
            </Link>
          );
        })}
      </nav>

      <main className="container mx-auto px-4 py-8">

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 border-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black hover:bg-gray-100 border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

  
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredVideos.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                if (!item.title) return;
                if (item.type === 'video') {
                  router.push(`/lectures/${encodeURIComponent(item.title)}`);
                } else {
                  router.push(`/pdf?title=${encodeURIComponent(item.title)}`);
                }
              }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden cursor-pointer group"
            >
              <div className="relative w-full h-40">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm text-center">{item.title}</h3>
                <span className="absolute bottom-2 right-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                  {item.type.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>


      <footer className="fixed bottom-0 w-full bg-[#FFEDD5] text-center py-2 border-t text-sm font-semibold text-gray-600">
        <p className='"font-semibold text-gray-500'>Made For VIT-AP study resources| v1.0 🔥</p>
        <p> Made With ❤️ by Srijoy & Shagnik (1st Year Students)</p>
      </footer>
    </div>
  );
}
