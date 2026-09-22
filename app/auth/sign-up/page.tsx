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

const signUpSchema = z
  .object({
    name: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.string().email("Format email tidak valid"),
    phone: z.string().min(10, "Nomor HP minimal 10 digit"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine((v) => v, "Kamu harus menyetujui syarat & ketentuan"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data: SignUpForm) => {
    setIsLoading(true);
    try {
      await signUp(data.name, data.email, data.phone, data.password);
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
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 bg-primary-soft rounded-2xl flex items-center justify-center mb-3">
              <Leaf className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-extrabold text-text">Buat akun baru</h1>
            <p className="text-text-muted text-sm mt-1">Bergabung dan selamatkan makanan!</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-semibold text-text block mb-1.5">Nama Lengkap</label>
              <input
                {...register("name")}
                type="text"
                placeholder="Nama lengkapmu"
                className="w-full px-4 py-3 rounded-2xl border border-border bg-bg text-text text-sm focus:ring-2 focus:ring-primary outline-none transition"
              />
              {errors.name && <p className="text-danger text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-text block mb-1.5">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="contoh@email.com"
                className="w-full px-4 py-3 rounded-2xl border border-border bg-bg text-text text-sm focus:ring-2 focus:ring-primary outline-none transition"
              />
              {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-semibold text-text block mb-1.5">No. HP</label>
              <input
                {...register("phone")}
                type="tel"
                placeholder="+62 812-xxxx-xxxx"
                className="w-full px-4 py-3 rounded-2xl border border-border bg-bg text-text text-sm focus:ring-2 focus:ring-primary outline-none transition"
              />
              {errors.phone && <p className="text-danger text-xs mt-1">{errors.phone.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-text block mb-1.5">Password</label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 6 karakter"
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-bg text-text text-sm focus:ring-2 focus:ring-primary outline-none transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-danger text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-semibold text-text block mb-1.5">Konfirmasi Password</label>
              <div className="relative">
                <input
                  {...register("confirmPassword")}
                  type={showConfirm ? "text" : "password"}
                  placeholder="Ulangi password"
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-bg text-text text-sm focus:ring-2 focus:ring-primary outline-none transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-danger text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-3">
              <input
                {...register("agreeTerms")}
                type="checkbox"
                id="terms"
                className="mt-0.5 w-4 h-4 accent-primary rounded"
              />
              <label htmlFor="terms" className="text-xs text-text-muted leading-relaxed">
                Saya menyetujui{" "}
                <span className="text-primary font-semibold">Syarat & Ketentuan</span> serta{" "}
                <span className="text-primary font-semibold">Kebijakan Privasi</span> Bungkus.in
              </label>
            </div>
            {errors.agreeTerms && (
              <p className="text-danger text-xs">{errors.agreeTerms.message}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-primary text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 disabled:opacity-70 active:scale-95 transition"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : null}
              {isLoading ? "Membuat akun..." : "Buat Akun"}
            </button>
          </form>
        </motion.div>

        <p className="text-center text-sm text-text-muted mt-6">
          Sudah punya akun?{" "}
          <Link href="/auth/sign-in" className="text-primary font-bold">
            Masuk sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
