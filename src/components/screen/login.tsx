"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

export default function Login() {
  // Data for form fields
  const formData = {
    title: "Welcome To Veritrust",
    description:
      "At Veritrust, We Believe That Access To Social Aid Should Be simple, Secure, And Inclusive For Everyone.",
    missionStatement:
      "We Help People In Need, Whether In War Zones, Or Places Where People Without Support Struggle To Break The Vicious Cycle Of Poverty.",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/dashboard");
      } else {
        // Tangani error dari backend
        const errorMessage =
          data.message ||
          data.error ||
          "Login gagal. Silakan cek email dan password Anda.";
        setError(errorMessage);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Terjadi kesalahan saat login. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white flex flex-col md:flex-row justify-center w-full min-h-screen px-10">
      <div className="bg-white w-full relative flex flex-col md:flex-row">
        {/* Left side - Sign in form */}
        <div className="flex-1 flex justify-center items-center py-8">
          <Card className="border-none shadow-none w-full max-w-md mx-auto">
            <CardContent className="p-0">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="font-bold text-3xl md:text-4xl leading-tight tracking-[0] text-center">
                    {formData.title}
                  </h1>
                  <p className="font-normal text-xs text-center leading-[18px] tracking-[0] max-w-xs mx-auto">
                    {formData.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Email field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="font-medium text-base leading-6 block"
                    >
                      Email
                    </label>
                    <Input
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      placeholder="Enter Your Email"
                      className="h-10 rounded-[5px] border-[#d2d2d2] placeholder:text-[#d2d2d2] placeholder:text-xs"
                    />
                  </div>

                  {/* Password field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="font-medium text-base leading-6 block"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        type="password"
                        className="h-10 rounded-[5px] border-[#d2d2d2]"
                      />
                    </div>
                  </div>

                  {/* Remember me and forgot password */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        className="rounded-sm border-[#b5b5b5] w-4 h-4"
                      />
                      <label
                        htmlFor="remember"
                        className="font-normal text-xs text-[#b5b5b5] leading-[18px]"
                      >
                        Remember Me
                      </label>
                    </div>
                    <a
                      href="/auth/forgot-password"
                      className="font-semibold text-xs text-[#0039c7] leading-[18px]"
                    >
                      Forgot Password
                    </a>
                  </div>

                  {/* Sign in button */}
                  <Button
                    onClick={handleLogin}
                    className="w-full h-12 bg-[#0039c7] rounded-[10px] font-bold text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging In" : "Login"}
                  </Button>

                  {/* Error message */}
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                      {error}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Background image */}
        <div className="hidden md:block w-full rounded-2xl max-w-xl h-[400px] md:h-[928px] relative bg-[url(/signin-veritrust.png)] bg-cover bg-center">
          <img
            className="w-20 h-14 absolute top-10 left-10"
            alt="Veritrust Logo"
            src="/group-1-1.png"
          />
          <p className="w-[90%] absolute bottom-10 left-10 font-bold text-white text-lg md:text-2xl leading-9 tracking-[0]">
            {formData.missionStatement}
          </p>
        </div>
      </div>
    </div>
  );
}
