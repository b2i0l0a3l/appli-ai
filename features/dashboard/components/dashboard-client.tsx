import DashboardContainer from "@/components/layout/DashboardContainer";
import UploadFile from "./upload-file";
import JobDetails from "./job-details";
import GenerateApplicationButton from "./generateApplicationButton";

export default function DashboardClient(){
    return(
        <DashboardContainer className="translate-y-4" title="Create Application" description="Taitor your application to any job posting using AI-powered insights.">
            <div className="grid grid-cols-2 gap-10 max-sm:grid-cols-1">
                <UploadFile/>
                <JobDetails/>
            </div>
            <div className="w-full flex items-center justify-center py-10">
                <GenerateApplicationButton/>
            </div>
        </DashboardContainer>
    )
}