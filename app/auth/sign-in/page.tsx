"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Leaf, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/auth-store";

const signInSchema = z.object({
  email: z.string().min(1, "Email wajib diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (data: SignInForm) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      router.replace("/home");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-phone">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-surface rounded-3xl shadow-card-md p-6"
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-primary-soft rounded-2xl flex items-center justify-center mb-3">
              <Leaf className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-extrabold text-text">Masuk ke akunmu</h1>
            <p className="text-text-muted text-sm mt-1">Selamat datang kembali!</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-text block mb-1.5">
                Email / No. HP
              </label>
              <input
                {...register("email")}
                type="text"
                placeholder="contoh@email.com"
                className="w-full px-4 py-3 rounded-2xl border border-border bg-bg text-text text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              />
              {errors.email && (
                <p className="text-danger text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-semibold text-text">Password</label>
                <button type="button" className="text-primary text-xs font-semibold">
                  Lupa kata sandi?
                </button>
              </div>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 6 karakter"
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-bg text-text text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-danger text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-primary text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 disabled:opacity-70 active:scale-95 transition"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : null}
              {isLoading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-text-muted text-xs">atau</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="py-3 border border-border rounded-2xl text-sm font-semibold text-text flex items-center justify-center gap-2">
              <span className="text-lg">G</span> Google
            </button>
            <button className="py-3 border border-border rounded-2xl text-sm font-semibold text-text flex items-center justify-center gap-2">
              <span className="text-lg">🍎</span> Apple
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-sm text-text-muted mt-6">
          Belum punya akun?{" "}
          <Link href="/auth/sign-up" className="text-primary font-bold">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
