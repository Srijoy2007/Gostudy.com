
'use client';

import { useParams } from 'next/navigation';
import React from 'react';

const videoMap: Record<string, string> = {
  'Introduction to C Programming': '/videos/video1.mp4',
  'Introduction to Python Programming': '/videos/video2.mp4',
  'Digital Logic Design': '/videos/video2.mp4',
  'Advanced English Grammar': '/videos/video4.mp4',
  'Organic Chemistry Basics': '/videos/video6.mp4',
};

export default function LecturePage() {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title as string);
  const videoSrc = videoMap[decodedTitle];

  if (!videoSrc) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-xl font-semibold">Video not found for: {decodedTitle}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFEDD5] p-6 text-black">
      <h1 className="text-2xl font-bold text-center mb-6">{decodedTitle}</h1>

      <div className="w-full max-w-3xl mx-auto bg-black rounded-lg overflow-hidden shadow-lg">
        <video
          controls
          className="w-full h-auto"
          src={videoSrc}
          controlsList="nodownload"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <p className="mt-4 max-w-3xl mx-auto text-center text-sm text-gray-700">
        This is the lecture video for <strong>{decodedTitle}</strong>. for any querry. solve it urself dont come to us
      </p>
    </div>
  );
}
