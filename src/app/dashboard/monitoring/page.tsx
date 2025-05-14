"use client";

import { ConfirmationTimeline } from "@/components/screen/monitoring/confirmation-timeline";
import { SelectedAidCard } from "@/components/screen/monitoring/selected-aid-card";
import { StatusCard } from "@/components/screen/monitoring/status-card";
import { AidDetails, StatusDetails, TimelineEntry } from "@/lib/type";
import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/client";

// Interface for the expected API response for an application (adjust as needed)
interface ApplicationDataFromAPI {
  id: string;
  application_status: string;
  program_details: {
    name: string;
    about: string;
    description: string;
    aid_amount: number;
    aid_unit: string;
    tags: string[];
  };
  eligibility_score?: number;
  timeline: Array<{
    date: string;
    description: string; // Short title
    details: string; // Longer explanation
    time: string;
  }>;
}

export default function Page() {
  const [aidDetails, setAidDetails] = useState<AidDetails | null>(null);
  const [statusDetails, setStatusDetails] = useState<StatusDetails | null>(
    null
  );
  const [timelineEntries, setTimelineEntries] = useState<TimelineEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonitoringData = async () => {
      setIsLoading(true);
      setError(null);

      const supabase = await createClient();
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        let errorMessage =
          "User not logged in or session expired. Please log in again.";
        if (sessionError) {
          console.error("Session error:", sessionError.message);
          errorMessage = `Session error: ${sessionError.message}. Please log in again.`;
        }
        if (!session) {
          console.warn("No active session found for monitoring page.");
        }
        setError(errorMessage);
        setIsLoading(false);
        return;
      }

      const token = session.access_token;
      setCurrentUserId(session.user.id);

      try {
        const response = await fetch(`/api/monitoring`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          let errorMsg = "Failed to fetch monitoring data";
          try {
            const errorData = await response.json();
            if (response.status === 401) {
              errorMsg =
                errorData.error || "Unauthorized. Please log in again.";
            } else {
              errorMsg = errorData.error || errorMsg;
            }
          } catch (e) {
            errorMsg = response.statusText || errorMsg;
          }
          throw new Error(errorMsg);
        }
        const data: ApplicationDataFromAPI = await response.json();

        if (data) {
          const transformedAidDetails: AidDetails = {
            name: data.program_details.name,
            about: data.program_details.about,
            description:data.program_details.description,
            amount: data.program_details.aid_amount,
            amountUnit: data.program_details.aid_unit,
            tags: data.program_details.tags || [],
            approvalRate: data.eligibility_score,
          };
          setAidDetails(transformedAidDetails);

          let appStatusDescription = "Status details unavailable.";
          switch (data.application_status?.toLowerCase()) {
            case "approved":
              appStatusDescription =
                "The program provider has reviewed your application and confirmed your eligibility";
              break;
            case "pending":
              appStatusDescription =
                "Your application is currently pending review by the program provider.";
              break;
            case "rejected":
              appStatusDescription =
                "Unfortunately, your application was not approved for this program.";
              break;
            default:
              appStatusDescription = data.application_status
                ? `Your application status is: ${data.application_status}`
                : "Application status is not available.";
          }

          const transformedStatusDetails: StatusDetails = {
            status: data.application_status as StatusDetails["status"],
            description: appStatusDescription,
          };
          setStatusDetails(transformedStatusDetails);

          const transformedTimelineEntries: TimelineEntry[] = data.timeline.map(
            (event, index) => ({
              id: `${data.id}-event-${index}`,
              date: event.date,
              description: event.details,
              timestamp: event.time,
            })
          );
          setTimelineEntries(transformedTimelineEntries);
        } else {
          setError("No application data found for monitoring.");
        }
      } catch (err: any) {
        console.error("Error fetching monitoring data:", err);
        setError(
          err.message || "An unexpected error occurred while fetching data."
        );
      }
      setIsLoading(false);
    };

    fetchMonitoringData();
  }, []);

  const handleConfirmReport = (report: string) => {
    console.log("Report submitted:", report);
    alert("Report submitted!");
  };

  if (isLoading) {
    return (
      <div className="p-8 min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-700">Loading monitoring data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 min-h-screen flex flex-col justify-center items-center text-center">
        <p className="text-xl text-red-600 font-semibold">An Error Occurred</p>
        <p className="text-md text-gray-700 mt-2">{error}</p>
        <p className="text-sm text-gray-500 mt-4">
          Please try refreshing the page or contact support if the issue
          persists.
        </p>
      </div>
    );
  }

  if (!currentUserId) {
    return (
      <div className="p-8 min-h-screen flex flex-col justify-center items-center text-center">
        <p className="text-xl text-gray-700">
          Please log in to view your application monitoring.
        </p>
      </div>
    );
  }

  if (!aidDetails || !statusDetails || timelineEntries.length === 0) {
    return (
      <div className="p-8 min-h-screen flex flex-col justify-center items-center text-center">
        <p className="text-xl text-gray-700">
          No application data available for monitoring.
        </p>
        <p className="text-md text-gray-500 mt-2">
          This might be because you haven't applied for any aid programs yet, or
          there was an issue loading your current application.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Aid Application Monitoring
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          {aidDetails && <SelectedAidCard aid={aidDetails} />}
          <h2 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
            Current Status
          </h2>
          {statusDetails && <StatusCard status={statusDetails} />}
        </div>
        <div className="w-full lg:w-2/3">
          <ConfirmationTimeline
            timelineEntries={timelineEntries}
            onConfirm={handleConfirmReport}
          />
        </div>
      </div>
    </div>
  );
}
