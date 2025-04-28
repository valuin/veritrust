import React from "react";
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

  return (
    <div className="bg-white flex flex-col md:flex-row justify-center w-full min-h-screen">
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
                      href="#"
                      className="font-semibold text-xs text-[#0039c7] leading-[18px]"
                    >
                      Forgot Password
                    </a>
                  </div>

                  {/* Sign in button */}
                  <Button className="w-full h-12 bg-[#0039c7] rounded-[10px] font-bold text-lg">
                    Login
                  </Button>

                  {/* Sign in with Google */}
                  <Button
                    variant="outline"
                    className="w-full h-12 rounded-[10px] border-2 border-[#b5b5b5] font-medium text-[#707070] text-lg"
                  >
                    <img
                      src="/google.png"
                      alt="Google"
                      className="w-8 h-8 mr-3 object-cover"
                    />
                    Login With Google
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Background image */}
        <div className="hidden md:block w-full rounded-l-2xl max-w-xl h-[400px] md:h-[928px] relative bg-[url(/signin-veritrust.png)] bg-cover bg-center">
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
