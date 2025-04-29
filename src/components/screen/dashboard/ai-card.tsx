import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import AiLogoVeritrust from "@/components/icons/ai-logo-veritrust.svg";
import Image from "next/image";

type AiCardProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

// Fungsi untuk memanggil AI
const handleCallAI = () => {
  alert("AI Assistant feature coming soon!");
};

export function AiCard({
  title = "AI Assistant",
  description = "Interact with your AI assistant here.",
  action,
  footer,
  children,
  className,
}: AiCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      <CardContent>
        {" "}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={AiLogoVeritrust}
            alt="AI Logo"
            width={64}
            height={64}
            draggable={false}
            className="object-contain opacity-75 w-64 h-64 absolute overflow-visible"
          />
          <div className=" opacity-30 pointer-events-none select-none">
            <div className="w-64 h-64 rounded-full border-8 border-white/20 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border-8 border-white/30 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-8 border-white/40 flex items-center justify-center">
                  <div className="w-16 h-16 overflow-visible rounded-full bg-white/50 relative"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto relative z-10">
          <p className="text-white text-lg mb-4">Didn't know where to apply?</p>
          <button
            onClick={handleCallAI}
            className="bg-white text-[#0039c7] font-medium py-2 px-6 rounded-full hover:bg-gray-100 transition"
          >
            Call AI
          </button>
        </div>
        {children}
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

export default AiCard;
