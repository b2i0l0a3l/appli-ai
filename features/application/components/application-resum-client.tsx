import DashboardContainer from "@/components/layout/DashboardContainer";
import ApplicationList from "./application-list/application-list";
import ApplicationListLoadingSkeleton from "./skeleton/ApplicationListLoadingSkeleton";
import { Suspense } from "react";

export default function ApplicationClient() {
  return (
    <DashboardContainer
      description="Explore your Applications"
      title="Applications"
    >
      <Suspense fallback={<ApplicationListLoadingSkeleton />}>
        <ApplicationList />
      </Suspense>
    </DashboardContainer>
  );
}
