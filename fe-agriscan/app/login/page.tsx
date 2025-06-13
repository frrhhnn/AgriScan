"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, LogInIcon } from "lucide-react";
import AgriScanLogo from "@/components/logo";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";
import { LoadingOverlay } from "@/components/ui/loading";
import { ToastContainer } from "@/components/ui/toast";
import { useToast } from "@/hooks/useToast";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState("");
  const { toasts, showSuccess, showError, removeToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(userName, password);
      showSuccess("Login berhasil!");
      router.push("/");
    } catch (error) {
      showError("Login gagal. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative z-0 overflow-hidden">
      {/* Advanced Background Elements */}
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

      <div className="absolute z-[-1] w-full hidden lg:block">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1905 1412"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M503.082 2089.8C619.366 1155.63 469.343 955.555 128.437 964.147C-234.441 973.293 -153.043 1319.18 -327.419 1393.2"
            stroke="url(#paint0_linear_0_1)"
            stroke-opacity="0.3"
            stroke-width="250"
          />
          <path
            d="M-286.448 -512C-268.907 -216.124 -61.2659 -217.514 83.2429 -102.423C490.305 221.773 -264.878 593.642 -154.434 587.22"
            stroke="url(#paint1_linear_0_1)"
            stroke-opacity="0.3"
            stroke-width="250"
          />
          <path
            d="M2610.81 -35.2045C1831.61 493.036 1585.2 450.363 1437.88 142.812C1281.07 -184.561 1626.15 -269.298 1612.81 -458.263"
            stroke="url(#paint2_linear_0_1)"
            stroke-opacity="0.3"
            stroke-width="250"
          />
          <path
            d="M2549.55 2167.27C1506.67 1705.28 1386.68 1461.63 1597.07 1184.76C1821.03 890.042 2133.63 1164.05 2313.85 1064.03"
            stroke="url(#paint3_linear_0_1)"
            stroke-opacity="0.3"
            stroke-width="250"
          />
          <g filter="url(#filter0_dd_0_1)">
            <rect
              x="1516"
              y="946"
              width="194"
              height="194"
              rx="97"
              fill="#047857"
              fill-opacity="0.1"
              shape-rendering="crispEdges"
            />
            <rect
              x="1516.5"
              y="946.5"
              width="193"
              height="193"
              rx="96.5"
              stroke="#059669"
              stroke-opacity="0.2"
              shape-rendering="crispEdges"
            />
          </g>
          <g filter="url(#filter1_dd_0_1)">
            <rect
              x="1453"
              y="344"
              width="150"
              height="150"
              rx="75"
              fill="#047857"
              fill-opacity="0.1"
              shape-rendering="crispEdges"
            />
            <rect
              x="1453.5"
              y="344.5"
              width="149"
              height="149"
              rx="74.5"
              stroke="#059669"
              stroke-opacity="0.2"
              shape-rendering="crispEdges"
            />
          </g>
          <g filter="url(#filter2_dd_0_1)">
            <rect
              x="1755"
              y="452"
              width="150"
              height="150"
              rx="75"
              fill="#047857"
              fill-opacity="0.1"
              shape-rendering="crispEdges"
            />
            <rect
              x="1755.5"
              y="452.5"
              width="149"
              height="149"
              rx="74.5"
              stroke="#059669"
              stroke-opacity="0.2"
              shape-rendering="crispEdges"
            />
          </g>
          <defs>
            <filter
              id="filter0_dd_0_1"
              x="1496"
              y="930"
              width="234"
              height="250"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="6"
                operator="erode"
                in="SourceAlpha"
                result="effect1_dropShadow_0_1"
              />
              <feOffset dy="8" />
              <feGaussianBlur stdDeviation="5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_0_1"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="5"
                operator="erode"
                in="SourceAlpha"
                result="effect2_dropShadow_0_1"
              />
              <feOffset dy="20" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="effect1_dropShadow_0_1"
                result="effect2_dropShadow_0_1"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect2_dropShadow_0_1"
                result="shape"
              />
            </filter>
            <filter
              id="filter1_dd_0_1"
              x="1433"
              y="328"
              width="190"
              height="206"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="6"
                operator="erode"
                in="SourceAlpha"
                result="effect1_dropShadow_0_1"
              />
              <feOffset dy="8" />
              <feGaussianBlur stdDeviation="5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_0_1"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="5"
                operator="erode"
                in="SourceAlpha"
                result="effect2_dropShadow_0_1"
              />
              <feOffset dy="20" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="effect1_dropShadow_0_1"
                result="effect2_dropShadow_0_1"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect2_dropShadow_0_1"
                result="shape"
              />
            </filter>
            <filter
              id="filter2_dd_0_1"
              x="1735"
              y="436"
              width="190"
              height="206"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="6"
                operator="erode"
                in="SourceAlpha"
                result="effect1_dropShadow_0_1"
              />
              <feOffset dy="8" />
              <feGaussianBlur stdDeviation="5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_0_1"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="5"
                operator="erode"
                in="SourceAlpha"
                result="effect2_dropShadow_0_1"
              />
              <feOffset dy="20" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="effect1_dropShadow_0_1"
                result="effect2_dropShadow_0_1"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect2_dropShadow_0_1"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear_0_1"
              x1="-295.187"
              y1="1275.66"
              x2="654.894"
              y2="1536.21"
              gradientUnits="userSpaceOnUse"
            >
              <stop />
              <stop offset="1" stop-color="#07DEA1" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_0_1"
              x1="548.181"
              y1="104.763"
              x2="-121.986"
              y2="-79.0196"
              gradientUnits="userSpaceOnUse"
            >
              <stop />
              <stop offset="1" stop-color="#07DEA1" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_0_1"
              x1="1522.77"
              y1="-376.123"
              x2="2186.74"
              y2="351.673"
              gradientUnits="userSpaceOnUse"
            >
              <stop />
              <stop offset="1" stop-color="#07DEA1" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_0_1"
              x1="2172.23"
              y1="1020.46"
              x2="1882.56"
              y2="1962.07"
              gradientUnits="userSpaceOnUse"
            >
              <stop />
              <stop offset="1" stop-color="#07DEA1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Elegant Header with Transparent Background */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#059669] ${
          isScrolled ? " backdrop-blur-lg shadow-md py-3" : "py-5"
        }`}
      >
        <div className="px-5 md:px-24">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center px-4 py-2 rounded-xl bg-emerald-50 transition-all duration-300 border-2 border-transparent hover:border-emerald-200 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                <p className=" hidden md:block">Beranda</p>
              </Link>
            </div>

            <h1 className=" text-white font-amoria text-[30px] md:text-[40px] -mb-2">
              AGRISCAN
            </h1>

            <div className="flex items-center space-x-3">
              <Link
                href="/register"
                className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center px-4 py-2 rounded-xl bg-emerald-50 transition-all duration-300 border-2 border-transparent hover:border-emerald-200 group"
              >
                <LogInIcon className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                <p className=" hidden md:block">Register</p>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className=" w-screen min-h-screen bg-transparent flex justify-center items-center">
        <div className="p-5 lg:p-10 rounded-[30px] bg-[#047857]/40 flex flex-col gap-7 items-center justify-center w-[90%] lg:min-w-[500px] mt-12 lg:w-[35%] lg:mt-14">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className=" scale-[0.8] md:scale-[1]">
              <AgriScanLogo />
            </div>
            <h1 className="font-amoria text-[40px] text-[#126D28] ">
              Agri<span className="text-[#75BE39]">Scan</span>
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-[#126D28] text-[20px] font-semibold"
              >
                Username
              </label>
              <input
                required
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Masukkan username anda"
                type="text"
                className="bg-white px-5 text-[20px] rounded-[12px] h-14 border-[#059669] border-[2px] outline-none ring-0 placeholder:text-[#126D28]/50"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-[#126D28] text-[20px] font-semibold"
              >
                Password
              </label>
              <input
                required
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password anda"
                type="password"
                className="bg-white px-5 text-[20px] rounded-[12px] h-14 border-[#059669] border-[2px] outline-none ring-0 placeholder:text-[#126D28]/50"
              />
            </div>

            <button
              onClick={(e) => handleSubmit(e)}
              className="bg-[#047857] rounded-[16px] text-center py-3 w-full font-semibold text-[20px] text-white mt-7 md:mt-16"
            >
              Masuk
            </button>
          </div>

          <h1 className=" text-[15px] md:text-[20px] font-medium">
            Belum punya akun ?{" "}
            <a
              href="/register"
              className="text-[#126D28] font-semibold font-amoria"
            >
              Daftar
            </a>
          </h1>
        </div>
      </div>
      {isLoading && <LoadingOverlay />}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
