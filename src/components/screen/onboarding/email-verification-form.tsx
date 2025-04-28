"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/client";
import { CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface EmailVerificationFormProps {
  onVerificationSuccess: () => void;
}

export function EmailVerificationForm({
  onVerificationSuccess,
}: EmailVerificationFormProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const emailFromQuery = searchParams.get("email");
    if (emailFromQuery) {
      setEmail(decodeURIComponent(emailFromQuery));
    } else {
      setError("Email address not found in URL. Please return to sign up.");
      console.error("Email parameter missing in URL for verification.");
    }
  }, [searchParams]);

  const handleChange = (idx: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[idx] = value;
    setCode(newCode);
    setError(null);
    setSuccessMessage(null);

    if (value && idx < code.length - 1) {
      const nextInput = document.getElementById(
        `code-input-${idx + 1}`
      ) as HTMLInputElement | null;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      const prevInput = document.getElementById(
        `code-input-${idx - 1}`
      ) as HTMLInputElement | null;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Cannot verify code without an email address.");
      return;
    }
    const otp = code.join("");
    if (otp.length !== code.length) {
      setError(`Please enter the complete ${code.length}-digit code.`);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "signup",
      });

      if (verifyError) {
        throw verifyError;
      }

      setSuccessMessage("Verification successful! Proceeding to next step...");
      setTimeout(() => {
        onVerificationSuccess();
      }, 1500);
    } catch (err: any) {
      console.error("OTP Verification error:", err);
      let displayError =
        err.message ||
        "Invalid or expired verification code. Please try again or resend.";
      if (err.message?.includes("Token has expired or is invalid")) {
        displayError =
          "Verification code is invalid or has expired. Please resend.";
      }
      setError(displayError);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError("Cannot resend code without an email address.");
      return;
    }
    setResendLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: email,
      });

      if (resendError) {
        throw resendError;
      }

      setSuccessMessage("A new verification code has been sent to your email.");
      setCode(Array(code.length).fill(""));
    } catch (err: any) {
      console.error("Resend OTP error:", err);
      setError(
        err.message ||
          "Failed to resend verification code. Please try again later."
      );
    } finally {
      setResendLoading(false);
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto px-4 py-12">
      <CheckCircle2 className="w-12 h-12 text-blue-600 mb-4" />
      <h2 className="font-bold text-2xl mb-2">Verify Your Account</h2>
      {email ? (
        <p className="text-gray-600 mb-6 text-center">
          We've sent a {code.length}-digit verification code to{" "}
          <span className="font-medium text-gray-800">{email}</span>. Please
          enter it below.
        </p>
      ) : (
        <p className="text-red-600 mb-6 text-center">
          Loading email address or email not provided...
        </p>
      )}
      <form
        className="flex flex-col items-center w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {code.map((digit, idx) => (
            <Input
              key={idx}
              id={`code-input-${idx}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl border-2 border-gray-300 rounded focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition disabled:opacity-50"
              autoFocus={idx === 0}
              disabled={loading || !email || !!successMessage}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-600 mb-4 text-center text-sm">{error}</p>
        )}
        {successMessage && (
          <p className="text-green-600 mb-4 text-center text-sm">
            {successMessage}
          </p>
        )}

        <Button
          type="submit"
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold text-lg mb-4 disabled:opacity-50"
          disabled={
            loading ||
            !email ||
            !isCodeComplete ||
            resendLoading ||
            !!successMessage
          }
        >
          {loading ? "Verifying..." : "Submit Code"}
        </Button>
        <button
          type="button"
          className="text-blue-600 underline text-sm disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"
          onClick={handleResend}
          disabled={resendLoading || loading || !email || !!successMessage}
        >
          {resendLoading ? "Sending..." : "Resend Verification Code"}
        </button>
      </form>
    </div>
  );
}
