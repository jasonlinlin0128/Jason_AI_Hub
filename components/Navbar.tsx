
import React from 'react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setView('feed')}
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
            A
          </div>
          <span className="font-bold text-xl text-gray-800 tracking-tight">AI Hub</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => setView('feed')}
            className={`font-medium transition-colors ${currentView === 'feed' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-400'}`}
          >
            應用分享
          </button>
          <button 
            onClick={() => setView('optimizer')}
            className={`font-medium transition-colors ${currentView === 'optimizer' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-400'}`}
          >
            流程優化器
          </button>
          <button 
            onClick={() => setView('about')}
            className={`font-medium transition-colors ${currentView === 'about' ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-400'}`}
          >
            關於平台
          </button>
        </div>

        <div className="md:hidden">
          {/* Mobile menu toggle would go here */}
          <button className="p-2 text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
