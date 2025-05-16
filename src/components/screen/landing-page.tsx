import React, { JSX } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { MouseIcon } from "lucide-react";
import HowItWorks from "../ui/how-it-works";
import AiSection from "../ui/ai-section";

export const LandingPage = (): JSX.Element => {
  // FAQ data
  const faqItems: { question: string; answer: string }[] = [
    {
      question: "What is VeriTrust?",
      answer:
        "VerifiTrust is a blockchain-based platform that simplifies access to social aid by using secure digital identities, AI-powered assistance, and transparent aid aid distribution. Our goal is to empower individuals with privacy, efficiency, and trust in receiving the support they need.",
    },
    {
      question: "How does VeriTrust protect my personal data?",
      answer: "",
    },
    {
      question: "How does the AI Agent help me?",
      answer: "",
    },
    {
      question: "How long does it take to receive aid through VerifiTrust?",
      answer: "",
    },
  ];

  // Technology cards data
  const techCards: { title: string; icon: string }[] = [
    {
      title: "Ensuring Your Data Is Protected And Accessible Only By You",
      icon: "/eva-lock-fill.svg",
    },
    {
      title:
        "Your Verified Credentials (vcs) act As Digital Proof Of Eligibility",
      icon: "/bxs-file.svg",
    },
    {
      title: "Approved Social Aid Is Distributed Directly To Your Cheqd Wallet",
      icon: "/mdi-wallet.svg",
    },
    {
      title: "Receive Aid Even In Regions With Limited Banking Infrastructure",
      icon: "/solar-global-bold.svg",
    },
  ];

  // Solution features data
  const solutionFeatures: {
    title: string;
    description: string;
    icon: string;
    bgColor: string;
    textColor: string;
  }[] = [
    {
      title: "Secure Digital Identity With Zkp",
      description:
        "We prove your eligibility for aid without ever exposing your personal information.",
      icon: "/shield-done.svg",
      bgColor: "bg-[#ffffff1a]",
      textColor: "text-[#ffffffb2]",
    },
    {
      title: "Ai-powered Assistance",
      description:
        "Our AI Agent finds the perfect aid program for you and submits your application.",
      icon: "/uil-robot.svg",
      bgColor: "bg-[#0039c71a]",
      textColor: "text-[#0039c7]",
    },
    {
      title: "Transparent Aid Distribution",
      description:
        "Using blockchain, we ensure that 100% of aid goes directly to you",
      icon: "/icon-park-outline-blockchain.svg",
      bgColor: "bg-[#ffffff1a]",
      textColor: "text-[#ffffffb2]",
    },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-full max-w-[1512px] relative">
        {/* Hero Section */}
        <section className="mx-5 bg-[#0039c7] rounded-[20px] px-10 py-10">
          <h1 className="text-center text-white text-8xl font-medium font-['Geist',Helvetica] leading-[115.2px] mt-8">
            Access Social Aid <br />
            Easily and Securely
          </h1>
          <Card className="w-[901px] h-[358px] mb-10 px-6 justify-center mx-auto mt-24 rounded-[10px]">
            <CardContent className="p-0 flex">
              <div className="relative w-1/2 h-full px-6 py-4 bg-[url(/image-3.png)] rounded-[10px] bg-cover bg-center flex items-center justify-center"></div>
              <div className="w-1/2 h-full flex flex-col justify-between px-6 py-4">
                <div>
                  <h3 className="font-extrabold text-[#0039c7] text-base leading-[19.2px] font-['Geist',Helvetica]">
                    Post-Earthquake Myanmar: The Need for Emergency Resources
                  </h3>
                  <p className="font-normal text-[#0039c7] text-xs leading-[14.4px] font-['Geist',Helvetica] mt-4">
                    On 28 March, a catastrophic earthquake struck Myanmar and
                    Thailand. Homes have collapsed, food supplies are scarce,
                    water facilities have been damaged, and much of the
                    country's infrastructure lies in ruins. In this time of
                    immense need, we stand with the people of Myanmar to provide
                    immediate relief and long-term support through our Social
                    Aid Program.
                  </p>
                </div>
                <div className="flex flex-col py-4 space-y-3">
                  <Button className="w-full h-[31px] bg-[#0039c7] rounded-[5px] font-semibold text-white text-sm font-['Geist',Helvetica]">
                    Apply For Social Aid
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-[31px] rounded-[5px] border-2 border-[#0039c7] font-semibold text-[#0039c7] text-sm font-['Geist',Helvetica]"
                  >
                    More Information
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col mt-5">
            <div className="flex flex-row justify-between items-center">
              <p className="font-normal text-white text-[15px] leading-[18.0px] w-[280px] font-['Geist',Helvetica]">
                Our platform ensures your data remains private and protected
                while making the aid distribution process transparent and
                efficient.
              </p>
              <div className="mr-10">
                <Button className="relative w-[205px] h-[62px] bg-white rounded-[100px] text-black font-semibold text-xl font-['Geist',Helvetica]">
                  <span className="mr-10">Join Now</span>
                  <div className="absolute w-[55px] h-[54px] top-1 right-1 bg-[#020916] rounded-[100px] flex items-center justify-center">
                    <img
                      className="w-[17px] h-[17px]"
                      alt="Arrow"
                      src="/arrow-1.svg"
                    />
                  </div>
                </Button>
              </div>
              <div className="flex items-center">
                <MouseIcon className="w-[17px] h-[17px] text-white mr-2" />
                <span className="font-normal text-white text-[15px] leading-[18.0px] font-['Geist',Helvetica]">
                  Scroll Down
                </span>
              </div>
            </div>
          </div>
        </section>
        {/* Mission Statement */}
        <section className="mt-20 text-center">
          <div className="relative w-[1006px] mx-auto">
            <div className="absolute w-16 h-[86px] top-4 left-[68px]">
              <img
                className="absolute w-[23px] h-[33px] top-[53px] left-0"
                alt="Group"
                src="/group-7.png"
              />
              <img
                className="absolute w-[25px] h-[31px] top-[39px] left-[39px]"
                alt="Group"
                src="/group-8.png"
              />
              <img
                className="absolute w-7 h-8 top-4 left-1"
                alt="Group"
                src="/group-9.png"
              />
              <img
                className="absolute w-[22px] h-[25px] top-0 left-[42px]"
                alt="Group"
                src="/group-10.png"
              />
            </div>
            <div className="absolute w-[59px] h-[79px] top-[18px] right-[68px] -rotate-180">
              <img
                className="absolute w-[21px] h-[31px] top-0 left-0 rotate-180"
                alt="Group"
                src="/group-7-1.png"
              />
              <img
                className="absolute w-[23px] h-[29px] top-[15px] left-9 rotate-180"
                alt="Group"
                src="/group-8-1.png"
              />
              <img
                className="absolute w-[25px] h-[29px] top-[35px] left-1 rotate-180"
                alt="Group"
                src="/group-9-1.png"
              />
              <img
                className="absolute w-5 h-[23px] top-14 left-[39px] rotate-180"
                alt="Group"
                src="/group-10-1.png"
              />
            </div>
            <h2 className="font-semibold text-black text-5xl leading-[57.6px] font-['Geist',Helvetica]">
              At VeriTrust, we believe that <br />
              access to social aid should be <br />
              simple, secure, and inclusive for everyone.
            </h2>
          </div>
        </section>
        {/* Problem Statements */}
        <section id="problem-section" className="mt-16 px-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kolom Kiri */}
            <div className="space-y-8 flex flex-col">
              {/* 40 billion card - 25% height */}
              <div className="bg-[#e6eeff] rounded-[20px]">
                <div className="p-4 h-full flex flex-col justify-between">
                  <p className="font-normal text-black text-[12px] leading-normal font-['Geist',Helvetica]">
                    Fraud and corruption often lead to funds being misused or
                    stolen before they reach the intended beneficiaries.
                  </p>
                  <h3 className="mt-4 font-semibold text-black text-[36px] leading-normal font-['Geist',Helvetica]">
                    $40 billion <br />
                    lost annually
                  </h3>
                </div>
              </div>
              {/* money card - 75% height */}
              <div className="h-[75%] break-inside-avoid rounded-2xl overflow-hidden flex-grow-[0.85]">
                <img
                  className="w-full h-full object-cover"
                  alt="Aid Recipients"
                  src="/image-1.png"
                />
              </div>
            </div>

            {/* Kolom Tengah */}
            <div className="space-y-8 flex flex-col">
              {/* 30% aid card - 100% height */}
              <Card className="bg-[url(/image-2.png)] bg-cover rounded-[20px] break-inside-avoid flex-grow">
                <CardContent className="p-10 flex flex-col justify-between h-full">
                  <h3 className="font-semibold text-white text-2xl leading-normal font-['Geist',Helvetica]">
                    30% of Aid Never Reaches the Intended Recipients
                  </h3>
                  <p className="font-normal text-white text-base leading-normal font-['Geist',Helvetica]">
                    Social aid distributed through traditional methods never
                    reaches its intended recipients due to middlemen, and
                    logistical challenges.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Kolom Kanan */}
            <div className="space-y-8 flex flex-col">
              {/* man & market card - 75% height */}
              <div className="h-[75%] break-inside-avoid rounded-2xl overflow-hidden flex-grow-[0.75]">
                <img
                  className="w-full h-full object-cover"
                  alt="Aid Distribution"
                  src="/image.png"
                />
              </div>
              {/* 2 week several month card - 25% height */}
              <div className="bg-[#8cadff] rounded-[20px] w-full">
                <div className="p-4 h-full flex flex-col justify-between">
                  <p className="font-normal text-black text-[12px] leading-normal font-['Geist',Helvetica]">
                    Waiting months for aid isn't just inconvenient—it's
                    life-threatening. Traditional systems simply aren't built
                    for speed or scalability during urgent situations.
                  </p>
                  <h3 className="font-semibold text-black text-[36px] leading-normal font-['Geist',Helvetica] mt-4">
                    2 weeks to several months
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Solution Section */}
        <section id="solution-section" className="mt-16 mx-5 bg-[#0039c7] rounded-[20px] px-16 py-12 relative">
          <div className="flex items-center mb-8">
            <div className="w-[41px] h-[41px] bg-white rounded-[20.5px] flex items-center justify-center">
              <img
                className="w-[26px] h-[26px]"
                alt="Idea Icon"
                src="/flat-color-icons-idea.svg"
              />
            </div>
            <h2 className="ml-3 font-semibold text-white text-xl leading-[24.0px] font-['Geist',Helvetica]">
              How We Solve
            </h2>
          </div>
          <div className="flex justify-between">
            <div className="max-w-[622px]">
              <h2 className="font-bold text-white text-5xl tracking-[0.48px] leading-[62.9px] font-['Geist',Helvetica]">
                Let us handle <br />
                the rest of your aid.
              </h2>
              <p className="mt-8 font-normal text-[#ffffffb2] text-lg tracking-[0.18px] leading-[30.6px] font-['Geist',Helvetica] max-w-[570px]">
                VeriTrust eliminates all that stress by combining cutting-edge
                privacy protection, AI-powered automation, and blockchain
                transparency into one seamless solution.
              </p>
              <Button className="mt-12 w-[170px] h-16 bg-white rounded-[10px] font-medium text-[#00040e] text-lg leading-[27px] font-['Geist',Helvetica]">
                Get Started
              </Button>
            </div>
            <div className="space-y-8">
              {solutionFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-start ${
                    index === 1
                      ? "bg-white rounded-[20px] p-5 shadow-[0px_20px_100px_-10px_#41475b1a] text-[#0039c7]"
                      : ""
                  }`}
                >
                  <div
                    className={`w-16 h-16 ${feature.bgColor} rounded-[32px] flex items-center justify-center mr-5`}
                  >
                    <img
                      className="w-[38px] h-[38px]"
                      alt={feature.title}
                      src={feature.icon}
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${
                        index === 1 ? "text-[#0039c7]" : "text-white"
                      } text-lg tracking-[0.18px] leading-[23.4px] font-['Geist',Helvetica]`}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={`mt-2 font-normal ${feature.textColor} text-base leading-normal font-['Geist',Helvetica] max-w-[366px]`}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* How it Works Section */}
        <HowItWorks />
        {/* AI Section */}
        <AiSection />
        {/* Technology Section */}
        <section id="technology-section" className="mt-16 mx-5 bg-[#0039c7] rounded-[20px] px-16 py-12 relative">
          <div className="flex items-center mb-8">
            <div className="w-[41px] h-[41px] bg-[#d4e0ff] rounded-[20.5px] flex items-center justify-center">
              <img
                className="w-[25px] h-[25px]"
                alt="System Icon"
                src="/material-icon-theme-systemd-light.svg"
              />
            </div>
            <h2 className="ml-3 font-semibold text-white text-xl leading-[24.0px] font-['Geist',Helvetica]">
              Our Technology
            </h2>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-bold text-white text-[52px] leading-[62.4px] font-['Geist',Helvetica]">
                Powered by CHEQD Network
              </h2>
              <p className="mt-4 font-normal text-white text-[40px] leading-[48.0px] font-['Geist',Helvetica]">
                Control and monetise your data in a <br />
                portable privacy-preserving manner.
              </p>
              <Button className="mt-12 w-[170px] h-16 bg-white rounded-[10px] font-medium text-[#00040e] text-lg leading-[27px] font-['Geist',Helvetica]">
                Learn More
              </Button>
            </div>
            <div className="w-[304px] h-[304px] bg-white rounded-[152px] flex items-center justify-center">
              <img
                className="w-[246px] h-[246px] object-cover"
                alt="CHEQD Logo"
                src="/image-1-1.png"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-16">
            {techCards.map((card, index) => (
              <Card key={index} className="bg-white rounded-[20px]">
                <CardContent className="p-0 flex items-center h-[167px]">
                  <div className="w-28 h-28 ml-[29px] bg-white rounded-[10px] border-2 flex items-center justify-center">
                    <img
                      className="w-[85px] h-[85px]"
                      alt={card.title}
                      src={card.icon}
                    />
                  </div>
                  <h3 className="ml-10 mr-14 font-semibold text-[#0039c7] text-2xl leading-9 font-['Geist',Helvetica] w-[410px]">
                    {card.title}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        {/* FAQ Section */}
        <section id="contact-us-section" className="mt-16 px-16">
          <h2 className="text-center font-semibold text-black text-5xl leading-[57.6px] font-['Geist',Helvetica] mb-16">
            Frequently Asked Question
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-6">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-[30px] border-2 overflow-hidden"
              >
                <AccordionTrigger className="px-[84px] py-[50px] font-medium text-black text-[32px] leading-[38.4px] font-['Geist',Helvetica]">
                  {item.question}
                </AccordionTrigger>
                {item.answer && (
                  <AccordionContent className="px-[84px] pb-[50px] font-normal text-black text-2xl leading-[28.8px] font-['Geist',Helvetica]">
                    {item.answer}
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
          <Separator className="my-8" />
          <div className="flex space-x-8">
            <Card className="w-full h-[139px] bg-white rounded-[30px]">
              <CardContent className="flex items-center justify-center h-full">
                <h3 className="font-medium text-black text-[32px] leading-[38.4px] font-['Geist',Helvetica]">
                  Want to learn more?
                </h3>
              </CardContent>
            </Card>
            <Card className="w-full h-[139px] bg-[#363636] rounded-[30px] shadow-[0px_4px_16.2px_#00000040]">
              <CardContent className="flex items-center justify-between h-full px-8">
                <h3 className="font-medium text-white text-[32px] leading-[38.4px] font-['Geist',Helvetica]">
                  Contact Us
                </h3>
                <div className="w-[103px] h-[103px] bg-white rounded-[20px] flex items-center justify-center">
                  <img
                    className="w-[66px] h-[66px]"
                    alt="Call Icon"
                    src="/material-symbols-call.svg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        {/* CTA Section */}
        <section className="mt-16 px-16">
          <Card className="bg-[#0039c7] rounded-[20px] overflow-hidden">
            <CardContent className="p-[102px] flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-white text-5xl leading-[67.2px] font-['Geist',Helvetica]">
                  Let's try our service now!
                </h2>
                <p className="mt-6 font-normal text-[#ffffffb2] text-lg tracking-[0.18px] leading-[28.8px] font-['Poppins',Helvetica] max-w-[467px]">
                  Everything you need to get help and grow asking for social aid
                  anywhere on the planet.
                </p>
              </div>
              <Button className="w-[178px] h-[67px] bg-white rounded-[10px] font-medium text-[#00040e] text-lg leading-[27px] font-['Geist',Helvetica]">
                Get Started
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};
