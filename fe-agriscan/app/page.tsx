"use client";

import {
  Upload,
  Brain,
  CheckCircle,
  Zap,
  Sparkles,
  Shield,
  LogIn,
  UserPlus,
  ArrowRight,
  BarChart3,
  Camera,
  Smartphone,
  Globe,
  Award,
  Layers,
  Scan,
  ChevronDown,
  Play,
  Cpu,
  Database,
  Microscope,
  Atom,
  Eye,
  TrendingUp as Growth,
  Bolt as Lightning,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import DoodleBackground from "@/components/doodle-background";
import UploadBackground from "@/components/upload-background";
import { useAuth } from "@/lib/auth";
import UploadSection from "@/components/upload-section";
import { predictDisease } from "@/lib/services/api";
import { toast } from "sonner";

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, token, logout } = useAuth();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove as EventListener);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove as EventListener);
    };
  }, []);

  useEffect(() => {
    // Force service worker update
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (let registration of registrations) {
          registration.unregister();
        }
        // Re-register the service worker
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("SW registered:", registration);
          })
          .catch((error) => {
            console.log("SW registration failed:", error);
          });
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 overflow-hidden relative">
      {/* Advanced Floating Elements with Mouse Parallax */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-emerald-200/10 rounded-full blur-3xl animate-pulse transition-transform duration-1000"
          style={{
            top: `${20 + mousePosition.y * 0.01}%`,
            left: `${10 + mousePosition.x * 0.01}%`,
          }}
        ></div>
        <div
          className="absolute w-80 h-80 bg-teal-300/15 rounded-full blur-2xl animate-bounce transition-transform duration-1000"
          style={{
            top: `${40 + mousePosition.y * -0.02}%`,
            right: `${20 + mousePosition.x * 0.015}%`,
          }}
        ></div>
        <div
          className="absolute w-64 h-64 bg-green-200/20 rounded-full blur-xl animate-pulse delay-1000 transition-transform duration-1000"
          style={{
            bottom: `${20 + mousePosition.y * 0.01}%`,
            left: `${25 + mousePosition.x * -0.01}%`,
          }}
        ></div>
        <div
          className="absolute w-48 h-48 bg-emerald-300/25 rounded-full blur-lg animate-bounce delay-500 transition-transform duration-1000"
          style={{
            top: `${35 + mousePosition.y * 0.02}%`,
            right: `${35 + mousePosition.x * -0.015}%`,
          }}
        ></div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 animate-grid-move"
            style={{
              backgroundImage: `
                linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      {/* Elegant Header with Transparent Background */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-lg shadow-md py-3" : "py-5"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg mr-3">
                <Scan className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">
                Agri<span className="text-emerald-600">Scan</span>
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {["Beranda", "Cara Kerja", "Deteksi"].map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="px-4 py-2 text-slate-600 hover:text-emerald-600 font-medium rounded-lg hover:bg-emerald-50 transition-all duration-300"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            {user === null && token === null ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center px-4 py-2 rounded-xl hover:bg-emerald-50 transition-all duration-300 border-2 border-transparent hover:border-emerald-200 group"
                >
                  <LogIn className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Login
                </Link>

                <Link
                  href="/register"
                  className="bg-white text-emerald-600 border-2 border-emerald-300 hover:border-emerald-400 hover:bg-emerald-50 shadow-md hover:shadow-lg transition-all duration-300 px-4 py-2 rounded-xl font-bold flex items-center group"
                >
                  <UserPlus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => logout()}
                  className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center px-4 py-2 rounded-xl hover:bg-emerald-50 transition-all duration-300 border-2 border-transparent hover:border-emerald-200 group"
                >
                  <LogIn className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Revolutionary Hero Section */}
      <section
        id="beranda"
        className="relative py-40 min-h-screen flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-teal-50/40 to-green-50/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(16,185,129,0.15),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(20,184,166,0.15),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]"></div>

        {/* Floating Tech Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-100/50 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-emerald-200/30 animate-float">
          <Cpu className="w-10 h-10 text-emerald-600" />
        </div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-teal-100/50 rounded-xl flex items-center justify-center backdrop-blur-sm border border-teal-200/30 animate-float-delayed">
          <Database className="w-8 h-8 text-teal-600" />
        </div>
        <div className="absolute bottom-40 left-20 w-18 h-18 bg-green-100/50 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-green-200/30 animate-bounce">
          <Atom className="w-9 h-9 text-green-600" />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mb-10 animate-fade-in-up">
            <span className="bg-gradient-to-r from-emerald-100 via-teal-100 to-green-100 text-emerald-700 border-2 border-emerald-200/50 px-6 py-3 text-sm font-bold shadow-lg rounded-full inline-flex items-center backdrop-blur-lg group hover:scale-105 transition-all duration-300">
              <Shield className="w-4 h-4 mr-2 animate-pulse" />
              Revolusi AI untuk Pertanian
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-800 mb-8 leading-none tracking-tight font-amoria">
            <span className="block animate-slide-in-left ">
              Deteksi Penyakit
            </span>
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 bg-clip-text text-transparent relative animate-slide-in-up block">
              Tanaman AI
              <div className="absolute -bottom-3 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400/40 via-teal-400/40 to-green-400/40 rounded-full animate-pulse"></div>
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium animate-fade-in-up delay-300">
            Sistem prediksi penyakit tanaman berbasis{" "}
            <span className="text-emerald-600 font-bold relative">
              machine learning
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-emerald-400 rounded-full"></div>
            </span>{" "}
            yang membantu petani mengidentifikasi dan menangani penyakit tanaman{" "}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20 animate-fade-in-up delay-500">
            <a
              href="#deteksi"
              className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 hover:from-emerald-600 hover:via-teal-600 hover:to-green-600 text-white shadow-xl hover:shadow-2xl transition-all duration-500 px-8 py-4 text-lg rounded-2xl font-bold flex items-center justify-center group hover:scale-105 transform overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Upload className="w-5 h-5 mr-3 group-hover:scale-125 transition-transform" />
              Mulai Scan Sekarang
              <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
            </a>
            <Link
              href="/register"
              className="border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 shadow-lg hover:shadow-xl transition-all duration-500 px-8 py-4 text-lg rounded-2xl font-bold flex items-center justify-center bg-white/80 backdrop-blur-lg group hover:scale-105 transform"
            >
              <Camera className="w-5 h-5 mr-3 group-hover:scale-125 transition-transform" />
              Lihat Demo Live
              <Play className="w-4 h-4 ml-3 text-emerald-600" />
            </Link>
          </div>

          {/* Animated Scroll Indicator */}
          <div className="absolute -bottom-35 left-0 right-0 flex justify-center z-10">
            <div className="flex flex-col items-center animate-bounce-slow">
              <div className="text-emerald-600 text-sm font-bold mb-2 whitespace-nowrap">
                Scroll untuk eksplorasi
              </div>
              <div className="w-8 h-12 border-2 border-emerald-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2 animate-pulse"></div>
              </div>
              <ChevronDown className="w-6 h-6 text-emerald-500 mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Modern How It Works with Interactive Elements */}
      <section
        id="cara-kerja"
        className=" bg-gradient-to-br from-white via-slate-50 to-emerald-50 relative overflow-hidden z-0 w-full"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.08),transparent_50%)]"></div>
        <div className=" absolute z-[-1] w-full hidden lg:block">
          <DoodleBackground />
        </div>

        <div className="container mx-auto px-6 relative py-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight font-amoria">
              Cara Kerja
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                {" "}
                AgriScan
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
              Proses deteksi revolusioner dalam 3 langkah sederhana dengan
              teknologi AI terdepan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Upload,
                title: "Upload Foto",
                desc: "Ambil foto berkualitas tinggi daun tanaman yang terindikasi penyakit menggunakan smartphone atau kamera profesional",
                gradient: "from-emerald-400 via-teal-400 to-green-400",
                bgColor: "from-emerald-50 to-teal-50",
                step: "01",
                tech: "Computer Vision",
                features: [""],
              },
              {
                icon: Brain,
                title: "Analisis AI",
                desc: "Algoritma machine learning dengan 50+ layer neural network menganalisis gambar menggunakan teknologi computer vision terdepan",
                gradient: "from-teal-400 via-emerald-400 to-green-400",
                bgColor: "from-teal-50 to-emerald-50",
                step: "02",
                tech: "Deep Learning",
                features: [""],
              },
              {
                icon: CheckCircle,
                title: "Solusi Cerdas",
                desc: "Dapatkan diagnosis akurat dengan confidence score dan rekomendasi penanggulangan yang tepat berdasarkan database terkini",
                gradient: "from-green-400 via-emerald-400 to-teal-400",
                bgColor: "from-green-50 to-emerald-50",
                step: "03",
                tech: "Smart Analytics",
                features: [""],
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative group bg-[#047857]/65 rounded-2xl py-8"
              >
                <div className="relative p-8 text-center">
                  {/* Step Number */}
                  <div className=" text-6xl font-bold text-emerald-200/50 group-hover:text-emerald-300/70 transition-colors duration-500 mb-3 font-amoria">
                    {step.step}
                  </div>

                  {/* Tech Badge */}
                  {/* <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-emerald-200">
                    <span className="text-emerald-600 text-xs font-medium">
                      {step.tech}
                    </span>
                  </div> */}

                  {/* Main Icon */}
                  <div
                    className={`w-14 h-14 bg-[#047857] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 absolute z-[2] -top-14 -right-5`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-3xl font-bold text-[#ffffff] mb-4">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-medium mb-5 text-[#ffffff]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section
        id="deteksi"
        className="py-28 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative z-0 w-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(20,184,166,0.12),transparent_50%)]"></div>
        <div className="absolute z-[-1] w-full hidden lg:block">
          <UploadBackground />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-12 h-12 bg-emerald-200/30 rounded-full animate-float blur-sm"></div>
        <div className="absolute bottom-20 right-20 w-10 h-10 bg-teal-200/40 rounded-full animate-float-delayed blur-sm"></div>

        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Upload Foto
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                {" "}
                Tanaman
              </span>
            </h2>
            <p className="text-xl text-slate-600 font-medium max-w-3xl mx-auto">
              Ambil foto atau pilih file untuk mendeteksi penyakit tanaman
              dengan AI
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <UploadSection />
          </div>
        </div>
      </section>

      {/* Ultimate CTA Section */}
      <section className="py-40 bg-[#047857] relative overflow-hidden">
        {/* Advanced Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_60%)]"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-white/10 rounded-full animate-float blur-sm"></div>
        <div className="absolute bottom-20 right-20 w-12 h-12 bg-white/15 rounded-full animate-float-delayed blur-sm"></div>
        <div className="absolute top-1/2 left-10 w-10 h-10 bg-white/20 rounded-full animate-bounce blur-sm"></div>

        <div className="container mx-auto px-6 text-center relative">
          {/* Badge */}
          <div className="mb-8">
            <span className="bg-white/20 text-white border border-white/30 px-6 py-2 text-sm font-bold shadow-lg rounded-full inline-flex items-center backdrop-blur-lg group hover:scale-105 transition-all duration-300">
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              Bergabung Sekarang
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            <span className="block animate-slide-in-left font-amoria">
              Siap Revolusi Pertanian Anda?
            </span>
          </h2>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link
              href="#deteksi"
              className="relative bg-white text-emerald-600 hover:bg-emerald-50 shadow-xl hover:shadow-2xl transition-all duration-700 px-8 py-4 text-lg font-bold rounded-2xl flex items-center justify-center group hover:scale-105 transform overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/0 via-emerald-100/50 to-emerald-50/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Upload className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Mulai Scan Gratis
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/register"
              className="border-2 border-white text-white hover:bg-white/10 shadow-xl hover:shadow-2xl transition-all duration-700 px-8 py-4 text-lg font-bold rounded-2xl flex items-center justify-center group hover:scale-105 transform backdrop-blur-lg"
            >
              <Brain className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
              Demo AI Live
              <Play className="w-5 h-5 ml-3 group-hover:scale-105 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer with Contact Information */}
      <footer className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.05),transparent_50%)]"></div>
        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Company Info */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg mr-3">
                  <Scan className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  Agri<span className="text-emerald-400">Scan</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                Solusi cerdas untuk deteksi penyakit tanaman berbasis AI yang
                membantu petani meningkatkan hasil panen.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">
                Tautan Cepat
              </h3>
              <ul className="space-y-2">
                {["Beranda", "Cara Kerja", "Deteksi"].map((item, index) => (
                  <li key={index}>
                    <a
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="text-slate-400 hover:text-emerald-400 text-sm transition-colors duration-300 flex items-center"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 text-emerald-500" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Kontak Kami</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="mr-3 w-5 h-5 bg-emerald-900 rounded-full flex items-center justify-center text-emerald-500">
                    <i className="ri-mail-line text-xs"></i>
                  </div>
                  <span className="text-slate-400 text-sm">
                    info@agriscan.id
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center"></div>
        </div>
      </footer>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          0% {
            opacity: 0;
            transform: translateX(50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-up {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-grid-move {
          animation: grid-move 20s linear infinite;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }

        .animate-slide-in-left {
          animation: slide-in-left 1s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 1s ease-out 0.2s both;
        }

        .animate-slide-in-up {
          animation: slide-in-up 1s ease-out 0.4s both;
        }

        .rounded-4xl {
          border-radius: 2rem;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        .text-shadow-lg {
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
        }

        .backdrop-blur-2xl {
          backdrop-filter: blur(40px);
        }

        .backdrop-blur-3xl {
          backdrop-filter: blur(64px);
        }

        .border-3 {
          border-width: 3px;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }

        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}
