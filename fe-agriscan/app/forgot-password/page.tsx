"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useAuth } from "@/lib/auth";
import { forgotPasswordSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  AlertCircle, 
  Leaf, 
  ArrowLeft, 
  Mail, 
  Scan,
  Shield,
  CheckCircle2,
  Sparkles,
  Lock,
  KeyRound
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    setIsLoading(true);
    setError(null);
    
    try {
      await forgotPassword(values.email);
      setSuccess(true);
      form.reset();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden">
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
                Lupa Password
              </CardTitle>
              <CardDescription className="text-slate-600 text-base">
                Masukkan alamat email Anda dan kami akan mengirimkan link untuk reset password
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
                    Jika email terdaftar dalam sistem kami, Anda akan menerima link reset password dalam beberapa menit.
                  </AlertDescription>
                </Alert>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type="email" 
                              placeholder="Masukkan alamat email Anda" 
                              className="border-slate-200 focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 shadow-sm pl-10"
                              {...field} 
                              disabled={isLoading || success}
                            />
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 hover:from-emerald-600 hover:via-teal-600 hover:to-green-600 text-white shadow-md hover:shadow-lg transition-all duration-500 py-6 mt-2 relative overflow-hidden group"
                    disabled={isLoading || success}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    {isLoading ? "Memproses..." : "Kirim Link Reset"}
                  </Button>
                </form>
              </Form>

              {/* Additional Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700 mt-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p>Link reset password akan kedaluwarsa dalam 1 jam. Jika Anda tidak menerima email, periksa folder spam atau hubungi dukungan.</p>
                  </div>
                </div>
              </div>
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