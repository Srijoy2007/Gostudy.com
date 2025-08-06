'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
{/*youtube link to embded https://www.youtube.com/embed/[replace this with the lasst part of link ex dkTOJXPBgpM ] */}
const videoData = [
  {
    title: 'CS01: Introduction to algorithm',
    youtubeUrl: 'https://www.youtube.com/embed/dkTOJXPBgpM',
    subject: 'CSE',
    pdf: '/pdfs/CS1.pdf',
    description: 'An overview of algorithms with practical applications and introductory concepts.',
    homework: '/M1.png',
    handwrittenNotes: '',
  },
  {
    title: 'Math01: Number System & Binomial Algebra',
    youtubeUrl: 'https://www.youtube.com/embed/xyz789', 
    subject: 'MATHEMATICS',
    pdf: '/pdfs/MAT1.pdf',
    description: 'Covers fundamentals of number systems and introductory binomial theorems.',
    handwrittenNotes: '', // ❌ not uploaded yet
  },
  {
    title: 'E01: Writing skills',
    youtubeUrl: 'https://www.youtube.com/embed/abc123', 
    subject: 'ENGLISH',
    pdf: '/pdfs/E1.pdf',
    description: 'Some random shit about writing skills',
  },
];
export default function LecturePage() {
  const { title } = useParams();
  const pathname = usePathname();
  const decodedTitle = decodeURIComponent(title as string);
  const currentIndex = videoData.findIndex((vid) => vid.title === decodedTitle);
  const videoInfo = videoData[currentIndex];
  const [progress, setProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem(`watch-${decodedTitle}`);
    if (saved) setProgress(Number(saved));
  }, [decodedTitle]);

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

  const handleTimeUpdate = () => {
    // No time update needed for YouTube, but keeping for consistency
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  if (!videoInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-red-600">
          Video not found for: {decodedTitle}
        </p>
      </div>
    );
  }

  const { youtubeUrl, subject, pdf, description, homework } = videoInfo;
  const match = decodedTitle.match(/\b[A-Z]{2,}\d{2}\b/);
  const lectureCode = match ? match[0] : subject?.slice(0, 3).toUpperCase();

  const prevLecture = videoData[currentIndex - 1];
  const nextLecture = videoData[currentIndex + 1];

  return (
    <div className="min-h-screen bg-[#FFEDD5] text-black pb-10 relative">
      {/* Header/Navbar */}
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
            const isActive = pathname === href || (link === 'Lectures' && pathname.includes('/lectures'));
            return (
              <Link
                key={link}
                href={href}
                className={`text-sm font-semibold px-4 py-1 rounded border transition-all ${
                  isActive ? 'bg-[#FC6D2F] text-black border-black' : 'text-black hover:text-blue-600'
                }`}
              >
                {link.toUpperCase()}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Mobile Nav Drawer */}
      <nav className={`fixed top-0 right-0 z-30 h-screen w-2/3 sm:w-1/2 bg-black text-white transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out flex flex-col p-6 space-y-6 rounded-l-lg shadow-lg md:hidden`}>
        {['Home', 'Lectures', 'Books', 'Notes'].map((link) => {
          const href = link === 'Home' ? '/' : `/${link.toLowerCase()}`;
          const isActive = pathname === href || (link === 'Lectures' && pathname.includes('/lectures'));
          return (
            <Link
              key={link}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className={`block text-base font-semibold px-4 py-2 rounded border ${
                isActive ? 'bg-[#FC6D2F] text-black border-black' : 'hover:text-blue-500'
              }`}
            >
              {link.toUpperCase()}
            </Link>
          );
        })}
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-2">
          <span className="inline-block bg-black text-white text-xs px-3 py-1 rounded-full font-mono">
            {lectureCode || subject}
          </span>
        </div>

        <h1 className="text-2xl font-bold mb-2">{decodedTitle}</h1>

        {description && <p className="text-sm text-gray-800 mb-4">📝 {description}</p>}

        <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={youtubeUrl}
            title={decodedTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {progress > 0 && (
          <p className="text-sm mt-2 text-gray-700">
            ⏱️ Last watched at {Math.floor(progress)}s
          </p>
        )}

        {/* Action Buttons (Removed Download Video) */}
        <div className="mt-4 flex flex-wrap gap-3">
          {pdf && (
            <a
              href={pdf}
              download
              className="bg-[#FC6D2F] text-black px-4 py-2 rounded shadow hover:bg-orange-400"
            >
              ⬇️ Download Slides
            </a>
          )}
          {homework ? (
            <a
              href={homework}
              download
              className="bg-blue-700 text-white px-4 py-2 rounded shadow hover:bg-blue-800"
            >
              📝 Download Homework
            </a>
          ) : (
            <span className="text-sm text-gray-800 px-3 py-2 bg-yellow-100 rounded">
              📝 No homework today.
            </span>
          )}
        </div>

        {/* PDF Viewer */}
        {pdf && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Lecture Slides</h2>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow">
              <iframe src={pdf} className="w-full h-[500px]" loading="lazy" />
            </div>
          </div>
        )}
        {/* Handwritten Notes Section */}
<div className="mt-8">
  <h2 className="text-lg font-semibold mb-2">Handwritten Notes</h2>
  {videoInfo.handwrittenNotes ? (
    <div className="flex flex-col gap-3">
      <a
        href={videoInfo.handwrittenNotes}
        download
        className="bg-[#FC6D2F] text-black border-black px-4 py-2 rounded shadow inline-block w-fit"
      >
       Download Handwritten Notes
      </a>
      <iframe src={videoInfo.handwrittenNotes} className="w-full h-[500px] rounded shadow" loading="lazy" />
    </div>
  ) : (
    <div className="bg-yellow-100 p-4 rounded shadow text-sm text-gray-800">
      <p className="mb-2">Handwritten notes haven't been uploaded yet.</p>
      <p>If you've made notes for this lecture, please send them to me:</p>
      <ul className="list-disc list-inside mt-2">
        <li><strong>Discord:</strong> <code>being_leo</code></li>
        <li><strong>Email:</strong> <a href="mailto:srijoyg07@gmail.com" className="text-blue-700 underline">srijoyg07@gmail.com</a></li>
      </ul>
    </div>
  )}
</div>


        {/* Navigation Buttons */}
        <div className="mt-10 flex justify-between items-center">
          {prevLecture ? (
            <Link
              href={`/lectures/${encodeURIComponent(prevLecture.title)}`}
              className="text-sm px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              ⬅️ Prev Lecture
            </Link>
          ) : <div />}
          {nextLecture && (
            <Link
              href={`/lectures/${encodeURIComponent(nextLecture.title)}`}
              className="text-sm px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Next Lecture ➡️
            </Link>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs mt-10 text-gray-600">
        <p>Made For VIT-AP study resources | v1.0 🔥</p>
        <p>Made With ❤️ by Srijoy & Shagnik (1st Year Students)</p>
      </footer>
    </div>
  );
}