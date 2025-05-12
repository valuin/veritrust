"use client";

import { ConfirmationTimeline } from "@/components/screen/monitoring/confirmation-timeline";
import { SelectedAidCard } from "@/components/screen/monitoring/selected-aid-card";
import { StatusCard } from "@/components/screen/monitoring/status-card";
import { AidDetails, StatusDetails, TimelineEntry } from "@/lib/type";
import React from "react";

const dummyAid: AidDetails = {
  organization: "UNHCR",
  title: "Rohingya Social Aid Program",
  amount: 51,
  amountUnit: "in CHEQ",
  tags: ["Refugees"],
  approvalRate: 91,
  flagSrc: "/path/to/myanmar-flag.png", 
  logoSrc: "/path/to/unhcr-logo-blue.png", 
};

const dummyStatus: StatusDetails = {
  status: "Approved",
  description:
    "The program provider has reviewed your application and confirmed your eligibility",
};

const dummyTimelineEntries: TimelineEntry[] = [
  {
    id: "1",
    date: "07 August 2025",
    description:
      "Your application has been successfully submitted by our AI Agent. All required documents have been verified and sent to the program administrators for review.",
    timestamp: "11.01 WIB",
  },
  {
    id: "2",
    date: "07 August 2025",
    description:
      "Your uploaded documents are being reviewed for eligibility. Any missing information will be flagged for correction.",
    timestamp: "11.03 WIB",
  },
  {
    id: "3",
    date: "11 August 2025",
    description:
      "Congratulations! You have been confirmed as eligible for the Rohingya Social Aid Program. Your profile meets the criteria for this program, and your application has moved to the next stage.",
    timestamp: "11.07 WIB",
  },
  {
    id: "4",
    date: "13 August 2025",
    description:
      "Aid resources have been allocated to your account. Based on your needs, $CHEQ tokens have been reserved for distribution to your Cheqd Wallet .",
    timestamp: "11.00 WIB",
  },
  {
    id: "5",
    date: "13 August 2025",
    description:
      '"Your application has been fully approved! A notification has been sent to your registered email/SMS with the digital aid you will receive.',
    timestamp: "11.10 WIB",
  },
  {
    id: "6",
    date: "14 August 2025",
    description:
      "Your $CHEQ tokens are being transferred to your Cheqd Wallet. The transfer process has begun, and you will soon see your tokens in your wallet balance.",
    timestamp: "10.00 WIB",
  },
  {
    id: "7",
    date: "14 August 2025",
    description:
      '"Your $CHEQ tokens have been successfully delivered to your wallet! You can view your updated wallet balance anytime through the VeriTrust dashboard',
    timestamp: "11.01 WIB",
  },
  {
    id: "8",
    date: "14 August 2025",
    description:
      "You have successfully received your aid! On this date, the recipient confirms receipt of the $CHEQ tokens in their wallet.",
    timestamp: "08.00 WIB",
  },
];

export function MonitoringView() {
  const handleConfirmReport = (report: string) => {
    console.log("Report submitted:", report);
    alert("Report submitted!"); 
  };

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Selected Aid Application
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <SelectedAidCard aid={dummyAid} />
          <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">Status</h2>
          <StatusCard status={dummyStatus} />
        </div>
        <div className="w-full lg:w-2/3">
          <ConfirmationTimeline
            timelineEntries={dummyTimelineEntries}
            onConfirm={handleConfirmReport} 
          />
        </div>
      </div>
    </div>
  );
}

export default MonitoringView; 
