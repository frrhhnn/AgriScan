import { useAuth } from "../auth";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface PredictionResponse {
  status: number;
  message: string;
  data: any;
}

export async function predictDisease(
  image: File,
  token: string
): Promise<PredictionResponse> {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error predicting disease:", error);
    throw error;
  }
}

export async function getPredictionResult(
  id: string
): Promise<PredictionResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/predictions/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch prediction result");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching prediction result:", error);
    throw error;
  }
}
