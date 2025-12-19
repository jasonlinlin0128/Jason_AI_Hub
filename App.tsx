
import React, { useState, useEffect } from 'react';
import { View, Article } from './types';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Optimizer from './components/Optimizer';
import ArticleDetail from './components/ArticleDetail';
import Editor from './components/Editor';

// Initial Mock Data
const INITIAL_ARTICLES: Article[] = [
  {
    id: '3',
    title: '【影片】Prompt Engineering 大師課',
    excerpt: '透過 10 分鐘的實戰教學，學會如何運用 Chain-of-Thought 技術提升回答質量。',
    category: 'Prompt Engineering',
    author: 'AI Coach',
    date: '2024-06-01',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://www.youtube.com/watch?v=jC4v5AS4RIM',
    content: `
      ## 影片教學摘要
      
      在本教學影片中，我們將深入探討：
      
      1. **Few-shot Prompting**: 透過範例引導 AI。
      2. **Chain-of-Thought**: 讓 AI 展示推理過程，減少幻覺。
      3. **Role Prompting**: 設定精確的角色特質。
      
      ### 為什麼要學習提示詞工程？
      提示詞工程不只是說話的藝術，更是與模型架構深度互動的技術。好的提示詞能將模型的潛力從 60% 提升到 95% 以上。
    `
  },
  {
    id: '1',
    title: 'Antigravity 使用全攻略：從入門到精通',
    excerpt: '探索如何利用 Antigravity 的強大功能來優化你的日常開發流程與視覺創作。',
    category: 'Tutorial',
    author: 'AI Expert',
    date: '2024-05-15',
    imageUrl: 'https://picsum.photos/seed/antigravity/800/450',
    content: `
      ## 什麼是 Antigravity?
      Antigravity 是一款專為創意工作者設計的 AI 輔助工具。它可以幫助你快速生成複雜的場景與物件。

      ### 核心功能
      1. **即時渲染反饋**：修改參數，即刻見效。
      2. **物件控制項**：精確控制場景中的每一個元素。
    `
  },
  {
    id: '2',
    title: '如何對 Gemini 下出高質量的提示詞 (Prompt)',
    excerpt: '掌握提示詞工程的核心技巧，讓 Gemini 成為你最強大的數位助手。',
    category: 'Prompt Engineering',
    author: 'Prompt Master',
    date: '2024-05-20',
    imageUrl: 'https://picsum.photos/seed/gemini/800/450',
    content: `
      ## 提示詞工程的三大支柱
      想要讓 Gemini 給出精準的回答，你需要學會如何結構化你的請求。
    `
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('feed');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);

  const navigateToArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('article-detail');
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setCurrentView('editor');
  };

  const handleAddNew = () => {
    setEditingArticle(null);
    setCurrentView('editor');
  };

  const handleSave = (newArticle: Article) => {
    if (editingArticle) {
      setArticles(articles.map(a => a.id === newArticle.id ? newArticle : a));
    } else {
      setArticles([newArticle, ...articles]);
    }
    setSelectedArticle(newArticle);
    setCurrentView('article-detail');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {currentView === 'feed' && (
          <Feed 
            articles={articles} 
            onArticleClick={navigateToArticle} 
            onEditClick={handleEdit}
            onAddNew={handleAddNew}
          />
        )}
        
        {currentView === 'optimizer' && (
          <Optimizer />
        )}

        {currentView === 'editor' && (
          <Editor 
            article={editingArticle} 
            onSave={handleSave} 
            onCancel={() => setCurrentView(editingArticle ? 'article-detail' : 'feed')} 
          />
        )}

        {currentView === 'article-detail' && selectedArticle && (
          <ArticleDetail 
            article={selectedArticle} 
            onBack={() => setCurrentView('feed')} 
            onEdit={() => handleEdit(selectedArticle)}
          />
        )}

        {currentView === 'about' && (
          <div className="max-w-3xl mx-auto bg-white p-12 rounded-[2rem] shadow-sm border border-gray-100">
            <h1 className="text-4xl font-black mb-8 text-indigo-900 tracking-tight">關於 AI Workshop Hub</h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              這是一個專為公司內部 Workshop 打造的 AI 應用分享平台。我們相信 AI 不僅僅是工具，更是提升生產力的關鍵。
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              在這裡，您可以分享教學、管理應用實踐，並使用優化器來改善工作流程。
            </p>
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-2xl">
              <p className="text-indigo-700 font-bold mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM5.884 6.68a1 1 0 101.415-1.414L6.586 4.55a1 1 0 10-1.414 1.414l.712.716zM14.116 11.32a1 1 0 10-1.415 1.414l.712.716a1 1 0 101.414-1.414l-.712-.716zM10 8a2 2 0 100 4 2 2 0 000-4z" /></svg>
                API 使用規範
              </p>
              <p className="text-indigo-600">
                為了公平使用資源，優化器功能需使用者綁定個人的 Google AI Studio Key。
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 py-10 text-center text-gray-400 text-sm">
        <p className="mb-2">AI Workshop Hub &copy; 2024</p>
        <p className="opacity-60 italic text-xs uppercase tracking-widest">Empowering Creativity through Intelligence</p>
      </footer>
    </div>
  );
};

export default App;
