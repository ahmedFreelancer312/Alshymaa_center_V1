/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import { FaLightbulb, FaChevronRight, FaTimes } from "react-icons/fa";

export default function StudyTipsWidget() {
  const tips = [
    "Active recall boosts retention by 50% - test yourself instead of re-reading",
    "Study in 90-minute blocks for optimal focus (our natural attention cycle)",
    "Handwritten notes create stronger neural connections than typing",
    "Sleep is when memory consolidation happens - don't skip it!"
  ];
  
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tips.length);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 mb-6 border border-blue-200 shadow-sm relative">
      {/* Close button */}
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close tips"
      >
        <FaTimes className="text-sm" />
      </button>
      
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="bg-blue-100 p-2 rounded-lg mt-0.5">
          <FaLightbulb className="text-primary-light text-lg" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">Study Tip</h3>
          <p className="text-xs text-primary-light">Evidence-based learning strategy</p>
        </div>
      </div>
      
      {/* Tip content */}
      <p className="text-gray-700 mb-4 pl-2 border-l-2 border-blue-300 italic">
        "{tips[currentTipIndex]}"
      </p>
      
      {/* Footer controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-1.5">
          {tips.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentTipIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === currentTipIndex ? 'bg-primary-light' : 'bg-gray-300'}`}
              aria-label={`Go to tip ${i+1}`}
            />
          ))}
        </div>
        <button 
          onClick={nextTip}
          className="text-primary-light hover:text-primary flex items-center text-sm group transition-colors"
        >
          Next tip <FaChevronRight className="ml-1 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}