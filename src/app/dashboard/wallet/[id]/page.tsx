import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const MOCK_DATA = {
  approvalRate: 92,
  countryFlag: "https://flagsapi.com/MM/flat/64.png",
  orgName: "UNHCR",
  programTitle: "Rohingya Social Aid Program",
  orgLogo: "/group-1-1.png",
  category: "Refugees",
  status: {
    type: "approved",
    title: "Approved",
    description:
      "The program provider has reviewed your application and confirmed your eligibility",
  },
  timeline: [
    {
      stage: "Submitted",
      icon: "File",
      date: "07 August 2025",
      desc: "Your application has been successfully submitted.",
      time: "11.01 WIB",
    },
    {
      stage: "Reviewed",
      icon: "Box",
      date: "08 August 2025",
      desc: "Your application is under review.",
      time: "15.30 WIB",
    },
    {
      stage: "Approved",
      icon: "Person",
      date: "09 August 2025",
      desc: "Your application has been approved.",
      time: "09.10 WIB",
    },
  ],
  currentStage: 2,
};

export default function WalletDetailPage() {
  // In real app, fetch data using id param from URL
  const data = MOCK_DATA;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column */}
        <div className="md:w-1/3 flex flex-col gap-6">
          <AidDetailCard {...data} />
          <StatusBox status={data.status} />
        </div>
        {/* Right Column */}
        <div className="md:flex-1 flex flex-col gap-6">
          <ApplicationTimeline
            timeline={data.timeline}
            currentStage={data.currentStage}
          />
        </div>
      </div>
    </div>
  );
}

type AidDetailCardProps = {
  approvalRate: number;
  countryFlag: string;
  orgName: string;
  programTitle: string;
  orgLogo: string;
  category: string;
};
function AidDetailCard({
  approvalRate,
  countryFlag,
  orgName,
  programTitle,
  orgLogo,
  category,
}: AidDetailCardProps) {
  return (
    <Card>
      <CardContent className="p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            {approvalRate}% Approval Rate
          </Badge>
          <Image
            src={countryFlag}
            alt="Country Flag"
            width={24}
            height={16}
            className="rounded"
          />
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={orgLogo}
            alt="Org Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-semibold">{orgName}</span>
        </div>
        <div className="text-xl font-bold">{programTitle}</div>
        <Badge variant="secondary" className="w-fit">
          {category}
        </Badge>
      </CardContent>
    </Card>
  );
}

type StatusBoxProps = {
  status: {
    type: string;
    title: string;
    description: string;
  };
};
function StatusBox({ status }: StatusBoxProps) {
  const statusColor =
    status.type === "approved"
      ? "bg-green-100 border-green-300 text-green-800"
      : status.type === "pending"
      ? "bg-amber-100 border-amber-300 text-amber-800"
      : "bg-red-100 border-red-300 text-red-800";
  return (
    <div>
      <div className="font-semibold mb-2">Status</div>
      <div className={`rounded-lg border p-4 ${statusColor}`}>
        <div className="font-bold mb-1">{status.title}</div>
        <div className="text-sm">{status.description}</div>
      </div>
    </div>
  );
}

type TimelineEvent = {
  stage: string;
  icon: string;
  date: string;
  desc: string;
  time: string;
};
type ApplicationTimelineProps = {
  timeline: TimelineEvent[];
  currentStage: number;
};
function ApplicationTimeline({
  timeline,
  currentStage,
}: ApplicationTimelineProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="font-semibold mb-4">Konfirmasi</div>
        <HorizontalProgress timeline={timeline} currentStage={currentStage} />
        <VerticalEventTimeline timeline={timeline} />
      </CardContent>
    </Card>
  );
}

function HorizontalProgress({
  timeline,
  currentStage,
}: {
  timeline: TimelineEvent[];
  currentStage: number;
}) {
  const icons = [
    <svg
      key="file"
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>,
    <svg
      key="box"
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    </svg>,
    <svg
      key="person"
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a7.5 7.5 0 0 1 13 0" />
    </svg>,
  ];
  return (
    <div className="flex items-center justify-between mb-6">
      {icons.map((icon, idx) => (
        <div key={idx} className="flex items-center flex-1">
          <div
            className={`rounded-full border-2 ${
              idx <= currentStage
                ? "border-blue-600 bg-blue-100"
                : "border-gray-300 bg-gray-100"
            } flex items-center justify-center w-10 h-10`}
          >
            {icon}
          </div>
          {idx < icons.length - 1 && (
            <div
              className={`flex-1 h-1 ${
                idx < currentStage ? "bg-blue-600" : "bg-gray-300"
              } mx-1`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function VerticalEventTimeline({ timeline }: { timeline: TimelineEvent[] }) {
  return (
    <div className="relative pl-4 border-l-2 border-gray-200">
      {timeline.map((event: TimelineEvent, idx: number) => (
        <div key={idx} className="mb-6 relative">
          <div className="absolute -left-5 top-1.5 w-3 h-3 rounded-full border-2 border-blue-600 bg-white"></div>
          <div className="text-xs text-gray-500">
            {event.date} <span className="ml-2">{event.time}</span>
          </div>
          <div className="text-sm">{event.desc}</div>
        </div>
      ))}
    </div>
  );
}
