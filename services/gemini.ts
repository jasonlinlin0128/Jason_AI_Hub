
import { GoogleGenAI, Type } from "@google/genai";
import { OptimizationResult } from "../types";

export const optimizeWorkflow = async (workflow: string, painPoints: string): Promise<OptimizationResult> => {
  // Create a new instance right before making an API call to ensure it uses the most up-to-date API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `請分析以下工作流程並提供優化建議。
      
      目前工作流程: ${workflow}
      痛點或問題: ${painPoints}
      
      請給出具體的 AI 工具推薦與流程調整建議。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          analysis: {
            type: Type.STRING,
            description: "對當前流程瓶頸的深度分析"
          },
          suggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                impact: { 
                    type: Type.STRING,
                    description: "High, Medium, or Low"
                }
              },
              required: ["title", "description", "impact"]
            }
          },
          examplePrompt: {
            type: Type.STRING,
            description: "一個可以直接使用的優化提示詞範例"
          }
        },
        required: ["analysis", "suggestions"]
      }
    }
  });

  try {
    const text = response.text || '';
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    // Handle "Requested entity was not found" or parsing errors
    throw new Error("無法解析 AI 回應或 API Key 無效，請確認 Key 權限後再試。");
  }
};
