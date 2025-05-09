"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

// Define the testimonial type
interface Testimonial {
  id: number;
  quote: string;
  name: string;
  location: string;
  avatar: string;
}

// Sample testimonial data
const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "VerifiTrust has transformed how our community receives aid. Before, there were long queues and confusion about eligibility.",
    name: "Fatima Begum",
    location: "Kutupalong Refugee Camp, Bangladesh",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    quote:
      "The transparency and efficiency of VerifiTrust has made a significant difference in our distribution process. We can now help more people in less time.",
    name: "Ahmed Hassan",
    location: "Relief Coordinator, Jordan",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    quote:
      "As a donor, I appreciate knowing exactly how my contributions are being used. VerifiTrust provides that accountability I've always wanted.",
    name: "Sarah Johnson",
    location: "International Aid Foundation",
    avatar: "/placeholder.svg?height=80&width=80",
  },
];

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <main className="container mx-auto py-24">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
        <div className="space-y-3">
          <h2 className="text-5xl text-blue-600">From our</h2>
          <h2 className="text-5xl font-bold text-blue-600">community.</h2>
          <p className="text-xl text-blue-600">
            Here&apos;s what other people had to say <br />
            about VerifiTrust
          </p>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full p-6 border-blue-600 text-black hover:bg-blue-50 hover:text-blue-700"
              onClick={handlePrevious}
            >
              <ArrowLeft className="h-8 w-8" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full p-6 border-blue-600 text-black hover:bg-blue-50 hover:text-blue-700"
              onClick={handleNext}
            >
              <ArrowRight className="h-10 w-10" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>

        <Card className="shadow-lg border-0 rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <div className="mb-4 text-blue-600">
              <Quote className="h-10 w-10 fill-current" />
            </div>
            <p className="text-2xl font-medium mb-8">
              {currentTestimonial.quote}
            </p>
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 border-2 border-gray-200">
                <AvatarImage
                  src={currentTestimonial.avatar || "/placeholder.svg"}
                  alt={currentTestimonial.name}
                />
                <AvatarFallback>
                  {currentTestimonial.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-xl font-bold">{currentTestimonial.name}</h4>
                <p className="text-gray-600">{currentTestimonial.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
