"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const linkImage =
    "https://cdn.rri.co.id/berita/Bukittinggi/o/1715917227082-PHOTO-2024-05-12-13-00-02/gl9b5uz4v7ahbtw.jpeg";
  return (
    <main className="container mx-auto pt-6 pb-[7rem] flex flex-col items-center">
      <section className="w-full max-w-6xl flex flex-col items-center">
        {/* Masonry Grid of Images */}
        <div className="grid grid-cols-5 md:grid-cols-9 gap-2 md:gap-3 max-w-6xl mx-4">
          {/* First Column - 2 grid */}
          <div className="col-span-1 space-y-2 md:space-y-3 mt-12">
            <div className="rounded-lg overflow-hidden aspect-[3/4]">
              <Image
                src={linkImage}
                alt="Person from community"
                width={350}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden aspect-[3/4]">
              <Image
                src={linkImage}
                alt="Person from community"
                width={350}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Second Column - 2 grid */}
          <div className="col-span-1 space-y-2 md:space-y-3 mt-6">
            <div className="rounded-lg overflow-hidden aspect-square">
              <Image
                src={linkImage}
                alt="Person from community"
                width={350}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden aspect-square">
              <Image
                src={linkImage}
                alt="Person from community"
                width={350}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Third Column - 1 grid */}
          <div className="col-span-1 space-y-2 md:space-y-3 mt-0">
            <div className="rounded-lg overflow-hidden aspect-[3/5]">
              <Image
                src={linkImage}
                alt="Person from community"
                width={350}
                height={250}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Fourth Column - 1 grid */}
          <div className="col-span-1 space-y-2 md:space-y-3 mt-8">
            <div className="rounded-lg overflow-hidden aspect-square">
              <Image
                src={linkImage}
                alt="Person from community"
                width={350}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Fifth Column (Center) - 1 grid */}
          <div className="col-span-1 space-y-2 md:space-y-3 mt-4">
            <div className="rounded-lg overflow-hidden aspect-[3/4]">
              <Image
                src={linkImage}
                alt="Person from community"
                width={350}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Sixth Column - 1 grid */}
          <div className="col-span-1 space-y-2 md:space-y-3 mt-10">
            <div className="rounded-lg overflow-hidden aspect-square">
              <Image
                src={linkImage}
                alt="Person from community"
                width={350}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Seventh Column - 1 grid */}
          <div className="col-span-1 space-y-2 md:space-y-3 mt-0">
            <div className="rounded-lg overflow-hidden aspect-[3/5]">
              <Image
                src={linkImage}
                alt="Person from community"
                width={350}
                height={250}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Eighth Column - 2 grid */}
          <div className="col-span-1 space-y-2 md:space-y-3 mt-6">
            <div className="rounded-lg overflow-hidden aspect-square">
              <Image
                src={linkImage}
                alt="Person from community"
                width={350}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden aspect-square">
              <Image
                src={linkImage}
                alt="Person from community"
                width={350}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Ninth Column - 2 grid */}
          <div className="col-span-1 space-y-2 md:space-y-3 mt-12">
            <div className="rounded-lg overflow-hidden aspect-[3/4]">
              <Image
                src={linkImage}
                alt="Person from community"
                width={350}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden aspect-[3/4]">
              <Image
                src={linkImage}
                alt="Person from community"
                width={350}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Testimonial Content - Centered */}
        <div className="absolute inset-0 top-1/2 flex flex-col items-center justify-center text-center">
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
      </section>
    </main>
  );
}
