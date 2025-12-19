
import React, { useState } from 'react';
import { Article, Category } from '../types';

interface EditorProps {
  article: Article | null;
  onSave: (article: Article) => void;
  onCancel: () => void;
}

const CATEGORIES: Category[] = ['Tutorial', 'Case Study', 'Tool Review', 'Prompt Engineering'];

const Editor: React.FC<EditorProps> = ({ article, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Article>>(
    article || {
      title: '',
      excerpt: '',
      content: '',
      category: 'Tutorial',
      author: 'AI 探索者',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
      videoUrl: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newArticle: Article = {
      ...formData as Article,
      id: article?.id || Date.now().toString(),
      date: article?.date || new Date().toISOString().split('T')[0],
    };
    onSave(newArticle);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-gray-900">
          {article ? '編輯分享內容' : '發佈新 AI 應用'}
        </h1>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 font-bold">
          取消編輯
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">文章標題</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
              placeholder="輸入吸引人的標題..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">分類</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
            >
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">作者名稱</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">簡短摘要</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none h-20 resize-none"
              required
              placeholder="簡單描述這篇分享的核心內容..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">封面圖片連結 (URL)</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">影片連結 (YouTube/Vimeo, 選填)</label>
            <input
              type="url"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <label className="block text-sm font-bold text-gray-700 mb-4">詳細內容 (支援段落與列表)</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none h-96 resize-none font-sans text-lg leading-relaxed"
            required
            placeholder="在這裡分享您的教學、提示詞或應用技巧..."
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-grow bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-xl transition-all active:scale-[0.98]"
          >
            {article ? '儲存變更' : '發佈分享'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-4 bg-white text-gray-600 rounded-2xl font-bold border border-gray-100 hover:bg-gray-50 transition-all"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editor;
