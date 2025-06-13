import { create } from "zustand";

interface Prediction {
  class: string;
  probability: number;
  score: string;
}

interface PredictionResult {
  status: number;
  data: {
    topPredictions: Prediction[];
  };
  message: string;
}

interface PredictionStore {
  predictionData: PredictionResult | null;
  imageUrl: string | null;
  setPredictionData: (data: PredictionResult) => void;
  setImageUrl: (url: string) => void;
  clearPrediction: () => void;
}

export const usePredictionStore = create<PredictionStore>((set) => ({
  predictionData: null,
  imageUrl: null,
  setPredictionData: (data) => set({ predictionData: data }),
  setImageUrl: (url) => set({ imageUrl: url }),
  clearPrediction: () => set({ predictionData: null, imageUrl: null }),
}));
