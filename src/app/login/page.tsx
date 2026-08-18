"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/Input";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isCredentialsLoading, setIsCredentialsLoading] = useState(false);
	const [isGoogleLoading, setIsGoogleLoading] = useState(false);
	const [error, setError] = useState("");

	const handleCredentialsSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsCredentialsLoading(true);
		setError("");

		try {
			const res = await signIn("credentials", {
				email,
				password,
				redirect: false,
				callbackUrl: "/dashboard",
			});

			if (res?.error) {
				setError("Invalid email or password");
				setIsCredentialsLoading(false);
			} else {
				router.push("/dashboard");
			}
		} catch {
			setError("Failed to sign in with credentials");
			setIsCredentialsLoading(false);
		}
	};

	const handleGoogleSignIn = async () => {
		setIsGoogleLoading(true);
		try {
			await signIn("google", { callbackUrl: "/dashboard" });
		} catch {
			setIsGoogleLoading(false);
		}
	};

	const isAnyLoading = isCredentialsLoading || isGoogleLoading;

	return (
		<div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-3 sm:p-4">
			<div className="w-full max-w-95 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col items-center gap-4 text-center">
				{/* Logo Badge */}
				<Logo size="md" showText={false} />

				<div className="flex flex-col gap-1">
					<h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
						Welcome to <span className="text-[#FD853A]">JCREA</span>
					</h1>
					<p className="text-xs text-slate-600">
						Sign in to access your protected product dashboard.
					</p>
				</div>

				{/* Email & Password Login Form */}
				<form onSubmit={handleCredentialsSignIn} className="w-full flex flex-col gap-3">
					<Input
						label="Email Address"
						type="email"
						placeholder="name@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						icon={<Mail className="w-4 h-4" />}
						required
						disabled={isAnyLoading}
					/>

					<Input
						label="Password"
						type="password"
						placeholder="********"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						icon={<Lock className="w-4 h-4" />}
						required
						disabled={isAnyLoading}
					/>

					{error && <p className="text-xs text-red-500 font-semibold text-left pl-1">{error}</p>}

					<Button
						type="submit"
						variant="primary"
						isLoading={isCredentialsLoading}
						loadingText="Signing in..."
						disabled={isAnyLoading}
						className="mt-0.5"
					>
						<span>Sign In</span>
						<ArrowRight className="w-4 h-4" />
					</Button>
				</form>

				<div className="relative w-full flex items-center justify-center my-0.5">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-slate-200" />
					</div>
					<span className="relative bg-white px-2.5 text-[10px] uppercase font-bold text-slate-400">
						or continue with
					</span>
				</div>

				{/* Google Sign In Button */}
				<Button
					type="button"
					variant="outline"
					onClick={handleGoogleSignIn}
					isLoading={isGoogleLoading}
					loadingText="Signing in with Google..."
					disabled={isAnyLoading}
					icon={<FcGoogle className="w-5 h-5" />}
				>
					<span>Sign in with Google</span>
				</Button>
			</div>
		</div>
	);
}
