
import React from 'react';
import { Article } from '../types';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  onEdit: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack, onEdit }) => {
  const getEmbedUrl = (url?: string) => {
    if (!url) return null;
    
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

    const vimeoMatch = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

    return null;
  };

  const embedUrl = getEmbedUrl(article.videoUrl);

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-indigo-600 transition-colors font-bold group"
        >
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm border border-gray-100 group-hover:bg-indigo-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          返回探索
        </button>
        
        <button 
          onClick={onEdit}
          className="flex items-center space-x-2 px-6 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-100 transition-all active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <span>編輯文章</span>
        </button>
      </div>

      <article className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
        {embedUrl ? (
          <div className="relative pt-[56.25%] bg-black">
            <iframe 
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-[450px] object-cover"
          />
        )}
        
        <div className="p-10 md:p-16">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest">
              {article.category}
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 font-medium">{article.date}</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-900 font-bold">{article.author}</span>
          </div>

          <h1 className="text-5xl font-black text-gray-900 mb-10 leading-[1.15] tracking-tight">
            {article.title}
          </h1>

          <div className="prose prose-lg prose-indigo max-w-none text-gray-700 leading-loose whitespace-pre-line">
            {article.content}
          </div>

          <div className="mt-16 pt-10 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-5">
               <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-indigo-500 shadow-inner">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
               </div>
               <div>
                 <p className="font-black text-gray-900 text-lg leading-tight">{article.author}</p>
                 <p className="text-gray-400">AI Workshop Hub 核心貢獻者</p>
               </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;
