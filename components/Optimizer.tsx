
import React, { useState, useEffect } from 'react';
import { optimizeWorkflow } from '../services/gemini';
import { OptimizationResult } from '../types';

// Use the existing global AIStudio type to avoid declaration conflicts
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}

const Optimizer: React.FC = () => {
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [workflow, setWorkflow] = useState('');
  const [painPoints, setPainPoints] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkKeyStatus();
  }, []);

  const checkKeyStatus = async () => {
    if (window.aistudio) {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasKey(selected);
    }
  };

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // Assume success as per guidelines to avoid race condition
      setHasKey(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workflow.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await optimizeWorkflow(workflow, painPoints);
      setResult(data);
    } catch (err: any) {
      setError(err.message || '優化過程中發生錯誤');
      if (err.message?.includes('not found')) {
        setHasKey(false);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!hasKey) {
    return (
      <div className="max-w-3xl mx-auto mt-12 animate-in fade-in zoom-in duration-500 px-4">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-indigo-50 overflow-hidden">
          {/* Header Image/Pattern */}
          <div className="bg-indigo-600 h-32 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            <svg className="w-16 h-16 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">解鎖 AI 進階流程優化功能</h2>
            
            <div className="space-y-8 mb-10">
              <section>
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm mr-2">?</span>
                  為什麼需要 API Key？
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="font-bold text-gray-800 mb-1">使用進階模型</p>
                    <p>流程優化器使用 Gemini 3 Pro，這是一個具備深度邏輯推理能力的高階模型，能處理複雜的工作流分析。</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="font-bold text-gray-800 mb-1">個人化計費與安全</p>
                    <p>透過您自己的 API Key，您可以精確控管資源消耗，並確保您的數據完全留在您的 Google 專案環境中。</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm mr-2">!</span>
                  如何獲取我的 API Key？
                </h3>
                <ol className="space-y-4 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="font-bold text-indigo-600 mr-2">1.</span>
                    <div>
                      前往 <a href="https://aistudio.google.com/" target="_blank" className="text-indigo-600 underline font-medium">Google AI Studio</a> 登入您的 Google 帳戶。
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-indigo-600 mr-2">2.</span>
                    <div>
                      點擊左側導航欄的 「Get API Key」，並建立一個新的 Key（建議綁定一個付費專案以獲得更高的配額）。
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-indigo-600 mr-2">3.</span>
                    <div>
                      回到此頁面，點擊下方的按鈕開啟系統選擇器，選取您剛建立的 Key 即可開始使用！
                    </div>
                  </li>
                </ol>
              </section>
            </div>

            <button
              onClick={handleSelectKey}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center space-x-3"
            >
              <span>立即選擇 API Key 開始優化</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            
            <p className="mt-6 text-center text-xs text-gray-400">
              提示：如果您還不清楚如何設置付費專案，請參考 
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-indigo-400 hover:text-indigo-600 ml-1 underline">
                官方計費文檔
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">AI 流程優化器</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          描述您目前的工作流程，Gemini 將協助您重新設計更高效的自動化方案。
        </p>
        <button 
          onClick={handleSelectKey}
          className="mt-4 inline-flex items-center text-xs text-indigo-500 hover:text-indigo-700 font-medium"
        >
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          更換當前使用的 API Key
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">當前工作流程</label>
              <textarea
                value={workflow}
                onChange={(e) => setWorkflow(e.target.value)}
                placeholder="例如：手動從 Excel 複製數據到 PPT..."
                className="w-full h-44 px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none bg-gray-50/50"
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-2">痛點或挑戰</label>
              <textarea
                value={painPoints}
                onChange={(e) => setPainPoints(e.target.value)}
                placeholder="哪些地方最花時間？"
                className="w-full h-24 px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none bg-gray-50/50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg flex items-center justify-center space-x-2 ${
                loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>分析中...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>開始優化建議</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="lg:col-span-7">
          {!result && !loading && !error && (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem]">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-400">填寫流程以獲取方案</h3>
              <p className="text-gray-400 mt-2 max-w-xs">您的專屬 AI 顧問正待命準備優化您的工作細節。</p>
            </div>
          )}

          {error && (
            <div className="p-8 bg-red-50 border border-red-100 rounded-3xl text-red-700 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-bold text-lg">優化失敗</p>
              </div>
              <p className="leading-relaxed opacity-80">{error}</p>
              <button 
                onClick={() => setHasKey(false)}
                className="mt-6 bg-red-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-red-200 hover:bg-red-700 transition-all"
              >
                重設 API Key
              </button>
            </div>
          )}

          {result && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                <div className="flex items-center mb-6">
                   <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold mr-4">1</div>
                   <h2 className="text-2xl font-black text-gray-900 tracking-tight">流程瓶頸分析</h2>
                </div>
                <p className="text-gray-600 leading-loose text-lg whitespace-pre-line">
                  {result.analysis}
                </p>
              </div>

              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                <div className="flex items-center mb-8">
                   <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center font-bold mr-4">2</div>
                   <h2 className="text-2xl font-black text-gray-900 tracking-tight">具體優化建議</h2>
                </div>
                <div className="grid gap-5">
                  {result.suggestions.map((s, i) => (
                    <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-indigo-300 hover:bg-white transition-all hover:shadow-md">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">{s.title}</h4>
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                          s.impact === 'High' ? 'bg-red-100 text-red-600' :
                          s.impact === 'Medium' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                        }`}>
                          {s.impact}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {result.examplePrompt && (
                <div className="bg-slate-900 p-8 rounded-[2rem] shadow-2xl text-white relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl transition-all group-hover:bg-indigo-500/30"></div>
                  <h2 className="text-2xl font-black mb-6 flex items-center relative z-10">
                    <svg className="w-6 h-6 mr-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    提示詞 Playground
                  </h2>
                  <div className="bg-slate-950/80 p-6 rounded-2xl font-mono text-sm leading-relaxed border border-slate-800 whitespace-pre-line text-indigo-100 mb-8 relative z-10 backdrop-blur-sm">
                    {result.examplePrompt}
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(result.examplePrompt || '');
                      alert('提示詞已複製！可以立即到 Gemini 測試。');
                    }}
                    className="relative z-10 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-500 transition-all shadow-xl active:scale-95 flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    複製範例提示詞
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Optimizer;
