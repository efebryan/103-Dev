"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    acceptTerms?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Password strength state
  const [pwdStrength, setPwdStrength] = useState({ score: 0, text: "Very Weak", color: "bg-error" });

  useEffect(() => {
    if (!password) {
      setPwdStrength({ score: 0, text: "", color: "bg-transparent" });
      return;
    }

    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    let text = "Weak";
    let color = "bg-error";

    if (score === 4) {
      text = "Strong";
      color = "bg-primary";
    } else if (score >= 2) {
      text = "Medium";
      color = "bg-tertiary-container";
    }

    setPwdStrength({ score, text, color });
  }, [password]);

  useEffect(() => {
    if (signupSuccess) {
      const timer = setTimeout(() => {
        window.location.href = "/";
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [signupSuccess]);

  const validateForm = () => {
    const tempErrors: typeof errors = {};

    if (!fullName) {
      tempErrors.fullName = "Full name is required";
    } else if (fullName.length < 2) {
      tempErrors.fullName = "Please enter your full name";
    }

    if (!email) {
      tempErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      tempErrors.password = "Password is required";
    } else if (password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters";
    }

    if (password !== confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    if (!acceptTerms) {
      tempErrors.acceptTerms = "You must accept the terms of service";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate signup request
    setTimeout(() => {
      setIsLoading(false);
      setSignupSuccess(true);
    }, 1500);
  };

  return (
    <AuthLayout title="Create your account" subtitle="Join the developer marketplace and start selling or buying assets.">
      {signupSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-6"
        >
          <div className="w-16 h-16 bg-primary/20 text-primary border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4 neon-glow-emerald">
            <span className="material-symbols-outlined text-[32px]">verified_user</span>
          </div>
          <h3 className="text-xl font-bold text-on-surface mb-2">Account Created!</h3>
          <p className="text-sm text-on-surface-variant/80 mb-6">Welcome to 103.Dev! Redirecting you to home page...</p>
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block">
              Full Name
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[20px]">
                person
              </span>
              <input
                type="text"
                placeholder="Ada Lovelace"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                }}
                className={`w-full bg-surface-container-lowest/60 border ${
                  errors.fullName ? "border-error/50 focus:border-error focus:ring-error/20" : "border-white/10 focus:border-primary focus:ring-primary/20"
                } rounded-xl pl-10 pr-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-2 transition-all`}
              />
            </div>
            {errors.fullName && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-error/90 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">error</span>
                {errors.fullName}
              </motion.p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[20px]">
                mail
              </span>
              <input
                type="email"
                placeholder="ada@lovelace.dev"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                className={`w-full bg-surface-container-lowest/60 border ${
                  errors.email ? "border-error/50 focus:border-error focus:ring-error/20" : "border-white/10 focus:border-primary focus:ring-primary/20"
                } rounded-xl pl-10 pr-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-2 transition-all`}
              />
            </div>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-error/90 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">error</span>
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[20px]">
                lock
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                className={`w-full bg-surface-container-lowest/60 border ${
                  errors.password ? "border-error/50 focus:border-error focus:ring-error/20" : "border-white/10 focus:border-primary focus:ring-primary/20"
                } rounded-xl pl-10 pr-12 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-2 transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 hover:text-on-surface transition-colors focus:outline-none"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>

            {/* Password strength visual meter */}
            {password && (
              <div className="space-y-1 mt-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-on-surface-variant/70">Password strength:</span>
                  <span className={`font-semibold ${pwdStrength.score === 4 ? "text-primary" : pwdStrength.score >= 2 ? "text-tertiary-container" : "text-error"}`}>
                    {pwdStrength.text}
                  </span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden flex gap-[2px]">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`h-full flex-1 transition-all duration-300 ${
                        step <= pwdStrength.score ? pwdStrength.color : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-error/90 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">error</span>
                {errors.password}
              </motion.p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block">
              Confirm Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[20px]">
                lock
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                }}
                className={`w-full bg-surface-container-lowest/60 border ${
                  errors.confirmPassword ? "border-error/50 focus:border-error focus:ring-error/20" : "border-white/10 focus:border-primary focus:ring-primary/20"
                } rounded-xl pl-10 pr-12 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:ring-2 transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 hover:text-on-surface transition-colors focus:outline-none"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showConfirmPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-error/90 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">error</span>
                {errors.confirmPassword}
              </motion.p>
            )}
          </div>

          {/* Terms checkbox */}
          <div className="space-y-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => {
                  setAcceptTerms(e.target.checked);
                  if (errors.acceptTerms) setErrors({ ...errors, acceptTerms: undefined });
                }}
                className="sr-only peer"
              />
              <div className="w-5 h-5 bg-surface-container-lowest/60 border border-white/10 rounded peer-checked:bg-primary peer-checked:border-primary peer-focus:ring-2 peer-focus:ring-primary/20 flex items-center justify-center transition-all mt-0.5 shrink-0">
                <span className="material-symbols-outlined text-[14px] text-on-primary font-bold hidden peer-checked:block">
                  check
                </span>
              </div>
              <span className="text-xs text-on-surface-variant leading-relaxed">
                I agree to the{" "}
                <Link href="#" onClick={(e) => e.preventDefault()} className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" onClick={(e) => e.preventDefault()} className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            {errors.acceptTerms && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-error/90 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">error</span>
                {errors.acceptTerms}
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-on-primary font-semibold py-3 rounded-xl text-sm transition-all duration-150 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(66,229,176,0.3)] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex justify-center items-center gap-2 cursor-pointer mt-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Social Logins */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface-container/10 px-3 text-on-surface-variant/60 font-medium">Or sign up with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  setSignupSuccess(true);
                }, 1000);
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-surface-container-lowest/40 hover:bg-surface-container-lowest/80 border border-white/5 hover:border-white/10 rounded-xl text-xs font-semibold text-on-surface transition-all duration-150 hover:shadow-sm cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" fillOpacity="1" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  setSignupSuccess(true);
                }, 1000);
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-surface-container-lowest/40 hover:bg-surface-container-lowest/80 border border-white/5 hover:border-white/10 rounded-xl text-xs font-semibold text-on-surface transition-all duration-150 hover:shadow-sm cursor-pointer"
            >
              <svg className="w-4 h-4 text-on-surface" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </button>
          </div>

          <div className="text-center text-xs text-on-surface-variant mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-semibold">
              Sign in
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
