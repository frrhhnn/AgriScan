"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useAuth } from "@/lib/auth";
import { resetPasswordSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  AlertCircle, 
  Leaf, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  KeyRound,
  Scan,
  Shield,
  CheckCircle2,
  Sparkles,
  Lock,
  RefreshCw
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ResetPasswordPage() {
  const { resetPassword, token } = useAuth();
  const router = useRouter();
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove as EventListener);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove as EventListener);
    };
  }, []);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    if (!token) {
      setError("Reset token is missing. Please use the link from your email.");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      await resetPassword(token, values.password);
      setSuccess(true);
      form.reset();
      
      // Redirect to login after successful password reset
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Common background and header elements
  const backgroundElements = (
    <>
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
              backgroundSize: '50px 50px'
            }}
          ></div>
        </div>
      </div>

      {/* Elegant Header with Transparent Background */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-md py-3' : 'py-5'}`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg mr-3 group-hover:rotate-6 transition-transform duration-300">
                <Scan className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">Agri<span className="text-emerald-600">Scan</span></span>
            </Link>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center px-4 py-2 rounded-xl hover:bg-emerald-50 transition-all duration-300 border-2 border-transparent hover:border-emerald-200 group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Kembali ke Login
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );

  // If no token is provided in the URL, show an error
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden">
        {backgroundElements}
        
        <div className="flex min-h-screen items-center justify-center p-4 pt-24">
          <div className="container mx-auto max-w-md">
            <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm overflow-hidden transform hover:scale-[1.01] transition-all duration-500 rounded-2xl">
              <div className="h-2 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-size-200 animate-gradient-x"></div>
              <CardHeader className="space-y-1 pb-6 pt-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="flex flex-col items-center group">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg mb-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                      <AlertCircle className="w-9 h-9 text-white group-hover:rotate-12 transition-transform duration-500" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
                        AgriScan
                      </span>
                      <Sparkles className="w-5 h-5 text-emerald-500 animate-pulse" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800 mb-2">Link Reset Invalid</CardTitle>
                <CardDescription className="text-slate-600 text-base">
                  Link reset password tidak valid atau telah kedaluwarsa. Silakan minta link reset password baru.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-6">
                <Alert variant="destructive" className="bg-red-50 text-red-700 border border-red-200 animate-shake">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Link reset password tidak valid atau telah kedaluwarsa. Silakan minta link reset password baru.
                  </AlertDescription>
                </Alert>
                <Button 
                  className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 hover:from-emerald-600 hover:via-teal-600 hover:to-green-600 text-white shadow-md hover:shadow-lg transition-all duration-500 py-6 relative overflow-hidden group"
                  onClick={() => router.push("/forgot-password")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <RefreshCw className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Minta Link Reset Baru
                </Button>
              </CardContent>
              <CardFooter className="flex justify-center py-6 border-t border-slate-100 bg-slate-50/80">
                <div className="space-x-4 text-sm text-slate-600">
                  <Link 
                    href="/login" 
                    className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
                  >
                    Kembali ke Login
                  </Link>
                  <span className="text-slate-400">•</span>
                  <Link 
                    href="/register" 
                    className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
                  >
                    Daftar Akun Baru
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        <style jsx>{`
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          
          @keyframes grid-move {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
          
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          .animate-gradient-x { 
            background-size: 200% 200%; 
            animation: gradient-x 3s ease infinite; 
          }
          
          .animate-shake { 
            animation: shake 0.5s ease-in-out; 
          }
          
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
          
          .animate-grid-move {
            animation: grid-move 20s linear infinite;
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .bg-size-200 { 
            background-size: 200% 200%; 
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden">
      {backgroundElements}
      
      {/* Main content */}
      <div className="flex min-h-screen items-center justify-center p-4 pt-24">
        <div className="container mx-auto max-w-md">
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm overflow-hidden transform hover:scale-[1.01] transition-all duration-500 rounded-2xl">
            {/* Gradient Top Bar */}
            <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 bg-size-200 animate-gradient-x"></div>
            
            <CardHeader className="space-y-1 pb-6 pt-8 text-center">
              {/* Logo Animation */}
              <div className="flex justify-center mb-6">
                <div className="flex flex-col items-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg mb-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                    <KeyRound className="w-9 h-9 text-white group-hover:rotate-12 transition-transform duration-500" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
                      AgriScan
                    </span>
                    <Sparkles className="w-5 h-5 text-emerald-500 animate-pulse" />
                  </div>
                </div>
              </div>
              
              <CardTitle className="text-2xl font-bold text-slate-800 mb-2">
                Reset Password
              </CardTitle>
              <CardDescription className="text-slate-600 text-base">
                Buat password baru untuk akun Anda
              </CardDescription>

              {/* Security Badge */}
              <div className="mt-4">
                <span className="bg-gradient-to-r from-emerald-100 via-teal-100 to-green-100 text-emerald-700 border border-emerald-200/50 px-4 py-2 text-sm font-medium shadow-sm rounded-full inline-flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Proses Aman & Terenkripsi
                </span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6 px-6">
              {error && (
                <Alert variant="destructive" className="bg-red-50 text-red-700 border border-red-200 animate-shake">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {success && (
                <Alert className="bg-emerald-50 text-emerald-700 border border-emerald-200 animate-fade-in">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  <AlertDescription>
                    Password Anda telah berhasil direset! Mengalihkan ke halaman login...
                  </AlertDescription>
                </Alert>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Password Baru</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"}
                              placeholder="Masukkan password baru Anda" 
                              className="border-slate-200 focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 shadow-sm pl-10 pr-10"
                              {...field} 
                              disabled={isLoading || success}
                            />
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <button 
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors duration-200"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Konfirmasi Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Konfirmasi password baru Anda" 
                              className="border-slate-200 focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 shadow-sm pl-10 pr-10"
                              {...field} 
                              disabled={isLoading || success}
                            />
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <button 
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors duration-200"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  {/* Password Strength Indicator */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <p className="text-xs text-slate-600 font-medium mb-2">Password harus memenuhi kriteria berikut:</p>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                        <span className="text-xs text-slate-600">Minimal 8 karakter</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                        <span className="text-xs text-slate-600">Setidaknya 1 huruf besar</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                        <span className="text-xs text-slate-600">Setidaknya 1 angka</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 hover:from-emerald-600 hover:via-teal-600 hover:to-green-600 text-white shadow-md hover:shadow-lg transition-all duration-500 py-6 mt-2 relative overflow-hidden group"
                    disabled={isLoading || success}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <KeyRound className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    {isLoading ? "Sedang Mereset Password..." : "Reset Password"}
                  </Button>
                </form>
              </Form>
            </CardContent>
            
            <CardFooter className="flex justify-center py-6 border-t border-slate-100 bg-slate-50/80">
              <div className="space-x-4 text-sm text-slate-600">
                <Link 
                  href="/login" 
                  className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Kembali ke Login
                </Link>
                <span className="text-slate-400">•</span>
                <Link 
                  href="/register" 
                  className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Daftar Akun Baru
                </Link>
              </div>
            </CardFooter>
          </Card>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-6 mt-6">
            <div className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-1" />
              <span className="text-xs font-medium text-slate-600">SSL Encrypted</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-xs font-medium text-slate-600">GDPR Compliant</span>
            </div>
            <div className="flex items-center">
              <Lock className="w-4 h-4 text-purple-500 mr-1" />
              <span className="text-xs font-medium text-slate-600">Secure Process</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-gradient-x { 
          background-size: 200% 200%; 
          animation: gradient-x 3s ease infinite; 
        }
        
        .animate-shake { 
          animation: shake 0.5s ease-in-out; 
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        .animate-grid-move {
          animation: grid-move 20s linear infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .bg-size-200 { 
          background-size: 200% 200%; 
        }
      `}</style>
    </div>
  );
} 