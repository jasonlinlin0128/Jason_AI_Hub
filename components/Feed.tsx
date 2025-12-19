
import React from 'react';
import { Article } from '../types';

interface FeedProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
  onEditClick: (article: Article) => void;
  onAddNew: () => void;
}

const Feed: React.FC<FeedProps> = ({ articles, onArticleClick, onEditClick, onAddNew }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">探索 AI 應用</h1>
          <p className="text-gray-500 text-lg">分享、學習、並將 AI 整合進你的日常工作流程。</p>
        </div>
        <button 
          onClick={onAddNew}
          className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl active:scale-95 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          新增分享
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div 
            key={article.id}
            className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col h-full"
          >
            {/* 編輯快捷按鈕 */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEditClick(article);
              }}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity hover:text-indigo-600 shadow-md border border-gray-100"
              title="編輯文章"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>

            <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => onArticleClick(article)}>
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-lg">
                  {article.category}
                </span>
              </div>
            </div>
            
            <div className="p-7 flex flex-col flex-grow cursor-pointer" onClick={() => onArticleClick(article)}>
              <div className="flex items-center text-xs text-gray-400 mb-4 font-medium">
                <span>{article.date}</span>
                <span className="mx-2">•</span>
                <span>By {article.author}</span>
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors leading-tight">
                {article.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="mt-auto flex items-center text-indigo-600 font-bold text-sm">
                閱讀全文 
                <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
