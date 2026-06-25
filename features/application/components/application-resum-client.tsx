import DashboardContainer from "@/components/layout/DashboardContainer";
import ApplicationCard from "./application-card";
import ApplicationList from "./application-list";

export default function ApplicationClient(){
    return <>
    <DashboardContainer description="Explore your Applications" title="Applications" >
         <ApplicationList/>
    </DashboardContainer>
    </>
}