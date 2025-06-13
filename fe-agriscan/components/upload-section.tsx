"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Upload,
  Camera,
  X,
  Image as ImageIcon,
  Loader2,
  Send,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { toast } from "react-hot-toast";
import { usePredictionStore } from "@/lib/store";
import { useRouter } from "next/navigation";

interface UploadSectionProps {
  isLoading?: boolean;
}

export default function UploadSection({
  isLoading: externalLoading,
}: UploadSectionProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const { setPredictionData, setImageUrl } = usePredictionStore();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Get API URL from environment or fallback
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-agriscan.gutechdeveloper.site";

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Handle file drop
  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && isValidFileType(file)) {
      handleFileSelect(file);
    }
  }, []);

  // Handle file input change
  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && isValidFileType(file)) {
        handleFileSelect(file);
      }
    },
    []
  );

  // Validate file type and size
  const isValidFileType = useCallback((file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPG, PNG)");
      return false;
    }

    if (file.size > maxSize) {
      toast.error("File size must be less than 10MB");
      return false;
    }

    return true;
  }, []);

  // Handle file selection
  const handleFileSelect = useCallback(
    (file: File) => {
      // Clean up previous preview URL to prevent memory leaks
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.onerror = () => {
        toast.error("Failed to read file");
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    },
    [previewUrl]
  );

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }

    if (!token) {
      toast.error("Please login first to use this feature");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", selectedFile);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const response = await fetch(`${API_URL}/api/predict`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      // Convert image to base64 for storing
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        // Store prediction data and image
        setPredictionData(data);
        setImageUrl(base64Image);
        // Navigate to results page
        router.push("/results");
      };
      reader.onerror = () => {
        toast.error("Failed to process image for storage");
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error("Error submitting:", error);
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          toast.error("Request timeout. Please try again.");
        } else {
          toast.error(
            error.message || "Failed to analyze image. Please try again."
          );
        }
      } else {
        toast.error("Failed to analyze image. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [selectedFile, token, API_URL, setPredictionData, setImageUrl, router]);

  // Handle camera activation
  const activateCamera = useCallback(async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast.error("Camera not supported on this device/browser");
        return;
      }

      // Stop any existing stream first
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
        streamRef.current = null;
      }

      // Set camera active state first to show video element
      setIsCameraActive(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "environment", // Use back camera if available
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;

        // Simple play without complex promise handling
        try {
          await videoRef.current.play();
        } catch (playError) {
          console.warn(
            "Auto-play failed, but video should still work:",
            playError
          );
        }
      }
    } catch (err) {
      console.error("Error accessing camera:", err);

      // Reset camera state on error
      setIsCameraActive(false);

      if (err instanceof Error) {
        if (err.name === "NotAllowedError") {
          toast.error(
            "Camera access denied. Please allow camera permissions and try again."
          );
        } else if (err.name === "NotFoundError") {
          toast.error("No camera found on this device.");
        } else {
          toast.error("Failed to access camera. Please try again.");
        }
      } else {
        toast.error(
          "Failed to access camera. Please check camera permissions."
        );
      }

      // Clean up on error
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
        streamRef.current = null;
      }
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  }, []);

  // Handle camera capture
  const captureImage = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !streamRef.current) {
      toast.error("Camera not ready. Please try again.");
      return;
    }

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Check if video has valid dimensions
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        toast.error(
          "Camera is still loading. Please wait a moment and try again."
        );
        return;
      }

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        toast.error("Failed to get canvas context");
        return;
      }

      // Draw the current video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], "camera-capture.jpg", {
              type: "image/jpeg",
            });
            handleFileSelect(file);
            stopCamera();
            toast.success("Foto berhasil diambil!");
          } else {
            toast.error("Failed to capture image. Please try again.");
          }
        },
        "image/jpeg",
        0.8
      );
    } catch (err) {
      console.error("Error capturing image:", err);
      toast.error("Failed to capture image. Please try again.");
    }
  }, [handleFileSelect, stopCamera]);

  // Clear selected file
  const clearSelection = useCallback(() => {
    // Clean up preview URL to prevent memory leaks
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [previewUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clean up camera stream
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
        streamRef.current = null;
      }

      // Clean up preview URL
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-40 transition-all duration-700 animate-pulse"></div>

        {/* Main Upload Area */}
        <div
          className={`relative border-3 border-dashed ${
            dragActive ? "border-emerald-500" : "border-emerald-300"
          } hover:border-emerald-400 transition-all duration-700 bg-white/90 backdrop-blur-2xl shadow-xl hover:shadow-2xl rounded-3xl group-hover:scale-102 transform overflow-hidden ${
            isLoading || externalLoading ? "opacity-75 pointer-events-none" : ""
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {(isLoading || externalLoading) && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                <p className="text-emerald-600 font-medium">
                  Menganalisis gambar...
                </p>
              </div>
            </div>
          )}

          <div className="relative p-12 text-center">
            {isCameraActive ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full max-w-md mx-auto rounded-xl border-4 border-emerald-500 bg-black"
                  style={{ minHeight: "300px" }}
                />
                <canvas ref={canvasRef} className="hidden" />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                  <button
                    onClick={captureImage}
                    className="bg-emerald-500 text-white p-4 rounded-full hover:bg-emerald-600 transition-colors shadow-lg hover:shadow-xl"
                    title="Ambil Foto"
                  >
                    <Camera className="w-6 h-6" />
                  </button>
                  <button
                    onClick={stopCamera}
                    className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl"
                    title="Tutup Kamera"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                {/* Loading indicator for camera */}
                {!streamRef.current && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                    <div className="flex flex-col items-center gap-2 text-white">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <p className="text-sm">Mengaktifkan kamera...</p>
                    </div>
                  </div>
                )}
              </div>
            ) : previewUrl ? (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full rounded-xl border-4 border-emerald-500"
                />
                <button
                  onClick={clearSelection}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Submit Button */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedFile || isLoading || externalLoading}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5" />
                    Analisis Gambar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-center gap-4 mb-6">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-700"
                  >
                    <ImageIcon className="w-10 h-10 text-white" />
                  </button>
                  <button
                    onClick={activateCamera}
                    className="w-20 h-20 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-700"
                  >
                    <Camera className="w-10 h-10 text-white" />
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleFileInput}
                />

                <h3 className="text-slate-800 mb-4 text-2xl font-bold">
                  Pilih atau Ambil Foto Tanaman
                </h3>
                <p className="text-base text-slate-500 font-medium">
                  Format: JPG, PNG, JPEG (Max 10MB)
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
