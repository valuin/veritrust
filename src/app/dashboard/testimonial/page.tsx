"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <main className="container mx-auto pt-6 pb-[7rem] flex flex-col items-center">
      <section className="w-full max-w-6xl flex flex-col items-center relative">
        {/* Single Image to replace Masonry Grid */}
        <div className="w-full max-w-6xl mx-auto">
          <Image
            src="/testimonial-grid.png" // Path to your single grid image
            alt="Testimonial image grid"
            width={1200} // Adjust width as needed, e.g., the width of your max-w-6xl container
            height={400} // Adjust height as needed, or use layout='responsive' if you have intrinsic dimensions
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>

        {/* Testimonial Content - Centered */}
        <div className="absolute top-[14rem] flex flex-col items-center justify-center text-center">
          <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300 mb-4">
            Testimonials
          </Badge>

          <div className="text-center space-y-4 max-w-2xl px-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600">
              Trusted by people
            </h2>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-400">
              from various countries
            </p>

            <p className="text-base md:text-lg text-center text-blue-600 mt-6">
              Learn why people around the world trust our solution
              <br />
              to complete their social aid application
            </p>

            <Button
              onClick={() => router.push("/dashboard/testimonial/story")}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-6"
              size="lg"
            >
              Read success story <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="py-10"></div>
      </section>
    </main>
  );
}
