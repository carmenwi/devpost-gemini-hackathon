
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';
import { SYSTEM_PROMPT } from '../constants';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // remove the data url prefix: 'data:video/mp4;base64,'
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

const responseSchema = {
    type: Type.OBJECT,
    properties: {
      candidate_profile: {
        type: Type.OBJECT,
        properties: {
          confidence_score: { type: Type.INTEGER },
          energy_level: { type: Type.STRING },
          hire_recommendation: { type: Type.STRING },
        },
        required: ['confidence_score', 'energy_level', 'hire_recommendation'],
      },
      executive_summary: { type: Type.STRING },
      analysis_vectors: {
        type: Type.OBJECT,
        properties: {
          visual: {
            type: Type.OBJECT,
            properties: {
              eye_contact: { type: Type.STRING },
              posture: { type: Type.STRING },
              facial_expressions: { type: Type.STRING },
            },
            required: ['eye_contact', 'posture', 'facial_expressions'],
          },
          vocal: {
            type: Type.OBJECT,
            properties: {
              tone: { type: Type.STRING },
              clarity: { type: Type.STRING },
              filler_words_usage: { type: Type.STRING },
            },
            required: ['tone', 'clarity', 'filler_words_usage'],
          },
        },
        required: ['visual', 'vocal'],
      },
      key_issues: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
      emotional_timeline: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            timestamp: { type: Type.STRING },
            emotion: { type: Type.STRING },
            intensity: { type: Type.INTEGER },
            observation: { type: Type.STRING },
          },
          required: ['timestamp', 'emotion', 'intensity', 'observation'],
        },
      },
    },
    required: ['candidate_profile', 'executive_summary', 'analysis_vectors', 'key_issues', 'emotional_timeline'],
};


export const analyzeVideo = async (videoFile: File): Promise<AnalysisResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const base64Video = await fileToBase64(videoFile);

  const videoPart = {
    inlineData: {
      data: base64Video,
      mimeType: videoFile.type,
    },
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{ parts: [videoPart] }],
    config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
    }
  });

  const text = response.text;
  if (!text) {
      throw new Error("API returned an empty response.");
  }

  try {
    return JSON.parse(text) as AnalysisResult;
  } catch (e) {
    console.error("Failed to parse JSON response:", text);
    throw new Error("Received malformed data from the AI. Please check the model's output.");
  }
};
