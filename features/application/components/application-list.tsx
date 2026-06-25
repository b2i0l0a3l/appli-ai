import { getUserApplications } from "@/app/actions/application.actions";
import ApplicationCard from "./application-card";
import Link from "next/link";
import EmptyApplication from "./empty-application";

export default async function ApplicationList() {
  const applications = await getUserApplications();

  if (applications.length === 0) {
    return (
     <EmptyApplication/>
    );
  }

  return (
    <div className="flex flex-1 w-full gap-6 h-auto flex-wrap translate-y-4 pb-12">
      {applications.map((app) => (
        <Link 
          key={app.id} 
          href={`/cover-letter?applicationId=${app.id}`} 
          className="block transition-transform hover:scale-[1.01]"
        >
          <ApplicationCard 
            companyName={app.company_name} 
            createdAt={new Date(app.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} 
            jobTitle={app.job_title} 
            matchScore={app.match_score}
          />
        </Link>
      ))}
    </div>
  );
}