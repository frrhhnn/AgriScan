"use client";

import { useEffect, useState } from "react";
import { dataInfo } from "@/data";
import {
  ArrowLeft,
  Leaf,
  Video,
  Link2,
  AlertTriangle,
  Pill,
} from "lucide-react";
import Link from "next/link";
import { usePredictionStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  leafVariants,
  circleVariants,
  getViewportDimensions,
} from "@/data/animation";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Leaf animation variants

const BackgroundAnimation = () => {
  const [dimensions, setDimensions] = useState(getViewportDimensions());

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getViewportDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          custom={i}
          variants={circleVariants}
          initial="initial"
          animate="animate"
          className="absolute rounded-full bg-gradient-to-r from-emerald-200/20 to-teal-200/20"
          style={{
            width: Math.random() * 200 + 100 + "px",
            height: Math.random() * 200 + 100 + "px",
            left: Math.random() * dimensions.width + "px",
            top: Math.random() * dimensions.height + "px",
          }}
        />
      ))}
    </div>
  );
};

const FallingLeaves = () => {
  const [dimensions, setDimensions] = useState(getViewportDimensions());

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getViewportDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={leafVariants}
          initial="initial"
          animate="animate"
          className="absolute"
          style={{
            width: "20px",
            height: "20px",
            left: Math.random() * dimensions.width + "px",
          }}
        >
          <Leaf className="w-full h-full text-white" />
        </motion.div>
      ))}
    </div>
  );
};

export default function ResultsPage() {
  const { predictionData, imageUrl } = usePredictionStore();
  const router = useRouter();

  useEffect(() => {
    if (!predictionData) {
      router.push("/");
    }
  }, [predictionData, router]);

  if (!predictionData) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50"
      >
        <BackgroundAnimation />
        <FallingLeaves />
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl max-w-md mx-auto"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mb-6"
          >
            <Leaf className="w-16 h-16 text-emerald-500 mx-auto" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            No Results Found
          </h1>
          <p className="text-gray-600 mb-6">
            Please upload an image to get plant analysis results.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all duration-300 gap-2 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  const topPrediction = predictionData.data.topPredictions[0];
  const diseaseInfo = dataInfo[topPrediction.class];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="min-h-screen bg-[#047857] relative z-0 overflow-hidden"
    >
      <div className="absolute top-0 left-0 z-[-5] w-full">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1916 2709"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1626.48 1939.94C679.124 1412.29 609.572 1044.95 877.339 555.713C1162.36 34.9437 1805 132.698 1915.02 132.698"
            stroke="url(#paint0_linear_0_1)"
            stroke-opacity="0.3"
            stroke-width="250"
          />
          <path
            d="M835.001 2675.6C789.501 2235 1272.5 2147.51 1460.17 2219.03C1733.37 2323.16 1736.13 2653.5 1736.13 2695.96"
            stroke="url(#paint1_linear_0_1)"
            stroke-opacity="0.3"
            stroke-width="250"
          />
          <rect
            x="351"
            y="144"
            width="64"
            height="64"
            rx="32"
            fill="url(#paint2_linear_0_1)"
          />
          <rect
            x="186"
            y="2470"
            width="220"
            height="220"
            rx="110"
            fill="url(#paint3_linear_0_1)"
          />
          <path
            d="M146.624 2596.34C1111.72 2126.35 1207.26 1843.47 982.426 1493.8C743.101 1121.58 170 1252 0.499774 1252"
            stroke="url(#paint4_linear_0_1)"
            stroke-opacity="0.3"
            stroke-width="250"
          />
          <defs>
            <linearGradient
              id="paint0_linear_0_1"
              x1="1486.62"
              y1="172.138"
              x2="1946.63"
              y2="2083.59"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="0.829126" stop-color="#047857" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_0_1"
              x1="1688.16"
              y1="2490.08"
              x2="787.235"
              y2="2843.15"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="0.829126" stop-color="#047857" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_0_1"
              x1="351"
              y1="144"
              x2="415"
              y2="208"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="1" stop-color="#047857" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_0_1"
              x1="186"
              y1="2470"
              x2="406"
              y2="2690"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="1" stop-color="#047857" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_0_1"
              x1="416.035"
              y1="1249.63"
              x2="246.019"
              y2="2776.07"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="0.829126" stop-color="#047857" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <BackgroundAnimation />
      <FallingLeaves />
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Header Section */}
        <motion.div variants={fadeIn} className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-white  mb-4 group font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Kembali
          </Link>
          <motion.h1
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-4xl font-bold text-white"
          >
            Hasil Analisis
          </motion.h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image and Prediction Results */}
          <motion.div variants={staggerContainer} className="space-y-6">
            {/* Uploaded Image */}
            {imageUrl && (
              <motion.div
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl">
                  <motion.img
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={imageUrl}
                    alt="Analyzed plant"
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            )}

            {/* Prediction Results */}
            <motion.div
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Hasil Prediksi
                </h2>
                <motion.div variants={staggerContainer} className="space-y-4">
                  {predictionData.data.topPredictions.map(
                    (prediction, index) =>
                      index === 0 && (
                        <motion.div
                          key={index}
                          variants={fadeIn}
                          whileHover={{ scale: 1.02 }}
                          className={`p-4 rounded-xl transition-all duration-300 ${
                            index === 0
                              ? "bg-gradient-to-r from-emerald-50/80 to-teal-50/80 border border-emerald-200"
                              : "bg-gray-50/80 border border-gray-200"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-gray-700">
                              {dataInfo[prediction.class]?.disease_name ||
                                prediction.class}
                            </span>
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className={`font-bold ${
                                index === 0
                                  ? "text-emerald-600"
                                  : "text-gray-600"
                              }`}
                            >
                              {prediction.score}
                            </motion.span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {dataInfo[prediction.class]?.plant_name ||
                              "Unknown Plant"}
                          </p>
                        </motion.div>
                      )
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Disease Information */}
          <motion.div
            variants={fadeIn}
            whileHover={{ scale: 1.02 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Informasi Prediksi
              </h2>

              {diseaseInfo ? (
                <motion.div variants={staggerContainer} className="space-y-8">
                  <motion.div variants={fadeIn} className="relative group">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        Tanda-tanda
                      </h3>
                    </div>
                    <ul className="list-none space-y-2 text-gray-600">
                      {diseaseInfo.symptoms.map((symptom, index) => (
                        <motion.li
                          key={index}
                          variants={fadeIn}
                          className="flex items-start gap-2"
                        >
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>{symptom}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div variants={fadeIn}>
                    <div className="flex items-center gap-2 mb-3">
                      <Pill className="w-5 h-5 text-emerald-500" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        Perawatan
                      </h3>
                    </div>
                    <ul className="list-none space-y-2 text-gray-600">
                      {diseaseInfo.treatment.map((treatment, index) => (
                        <motion.li
                          key={index}
                          variants={fadeIn}
                          className="flex items-start gap-2"
                        >
                          <span className="text-emerald-500 mt-1">•</span>
                          <span>{treatment}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div variants={fadeIn}>
                    <div className="flex items-center gap-2 mb-3">
                      <Link2 className="w-5 h-5 text-emerald-500" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        Artikel Referensi
                      </h3>
                    </div>
                    <motion.div
                      variants={staggerContainer}
                      className="grid grid-cols-1 gap-2"
                    >
                      {diseaseInfo.link_artikel.map((link, index) => (
                        <motion.a
                          key={index}
                          variants={fadeIn}
                          whileHover={{ scale: 1.05 }}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 truncate bg-emerald-50/80 px-4 py-2 rounded-md transition-colors duration-300 hover:bg-emerald-100"
                        >
                          <Link2 className="w-4 h-4" />
                          Article {index + 1}
                        </motion.a>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div variants={fadeIn} className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                  <p className="text-gray-600">
                    No detailed information available for this disease.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mt-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <Video className="w-5 h-5 text-white" />
            <h3 className="text-lg font-semibold text-white">
              Video Referensi
            </h3>
          </div>
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {diseaseInfo.link_video.map((link, index) => (
              <motion.iframe
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
                className="w-full aspect-video rounded-xl shadow-lg"
                src={link}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
