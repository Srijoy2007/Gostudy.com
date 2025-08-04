'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const videoData = [
  { title: 'Introduction DSA Notes', src: '/pdfs/DSANotes.pdf' },
  { title: 'Calculus Made Easy Notes', src: '/pdfs/calculus_notes.pdf' },
  { title: 'Basic Concepts of Physics Notes', src: '/pdfs/physics_basics.pdf' },
];

export default function PDFViewer() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const title = searchParams.get('title');
  const [src, setSrc] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const match = videoData.find((item) => item.title === title);
    setSrc(match?.src ?? null);
  }, [title]);

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

  if (!src) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFEDD5] text-red-600 font-semibold text-lg">
        PDF not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFEDD5] text-black relative pb-16">
      {/* Header */}
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

        {/* Desktop Nav */}
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

      {/* Mobile Menu */}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
          {title}
        </h1>

        {/* Download Button */}
        <div className="flex justify-center mb-4">
          <a
            href={src}
            download
            className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Download PDF
          </a>
        </div>

        {/* PDF Viewer */}
        <div className="flex justify-center">
          <iframe
            src={src}
            className="w-full max-w-5xl h-[80vh] rounded-lg border border-gray-300 shadow-md"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full bg-[#FFEDD5] text-center py-2 border-t text-sm font-semibold text-gray-600">
        <p>Made For VIT-AP study resources | v1.0 🔥</p>
        <p>With ❤️ by being_leo & aqua.suxs</p>
      </footer>
    </div>
  );
}
