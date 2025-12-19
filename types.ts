
export type Category = 'Tutorial' | 'Case Study' | 'Tool Review' | 'Prompt Engineering';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  date: string;
  imageUrl: string;
  videoUrl?: string;
}

export interface OptimizationResult {
  analysis: string;
  suggestions: {
    title: string;
    description: string;
    impact: 'High' | 'Medium' | 'Low';
  }[];
  examplePrompt?: string;
}

export type View = 'feed' | 'optimizer' | 'article-detail' | 'about' | 'editor';
