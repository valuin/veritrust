import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function EmailVerificationForm() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleChange = (idx: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[idx] = value;
    setCode(newCode);
    if (value && idx < 3) {
      const next = document.getElementById(`code-input-${idx + 1}`);
      if (next) (next as HTMLInputElement).focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Code verified! Proceed to next step.");
    }, 1200);
  };

  const handleResend = () => {
    alert("Verification code resent!");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto px-4 py-12">
      <CheckCircle2 className="w-12 h-12 text-blue-600 mb-4" />
      <h2 className="font-bold text-2xl mb-2">Verify Your Account</h2>
      <p className="text-gray-600 mb-6 text-center">
        Check your inbox, we've sent a 4-digit verification code
      </p>
      <form
        className="flex flex-col items-center w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-3 mb-6">
          {code.map((digit, idx) => (
            <Input
              key={idx}
              id={`code-input-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              className="w-14 h-14 text-center text-2xl border-2 border-gray-300 rounded focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
              autoFocus={idx === 0}
            />
          ))}
        </div>
        <Button
          type="submit"
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded text-white font-bold text-lg mb-4"
          disabled={loading || code.some((c) => !c)}
        >
          {loading ? "Verifying..." : "Submit"}
        </Button>
        <button
          type="button"
          className="text-blue-600 underline text-sm"
          onClick={handleResend}
          disabled={loading}
        >
          Resend Verification Code
        </button>
      </form>
    </div>
  );
}
