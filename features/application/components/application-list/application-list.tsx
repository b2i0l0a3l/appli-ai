import { getUserApplications } from "@/app/actions/application.actions";
import ApplicationCard from "./application-card";
import Link from "next/link";
import EmptyApplication from "../default/empty-application";
import { Briefcase, Percent, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export default async function ApplicationList() {
  const applications = await getUserApplications();

  if (applications.length === 0) {
    return <EmptyApplication />;
  }

  const totalApps = applications.length;
  const avgScore =
    applications.reduce((acc, app) => acc + app.match_score, 0) /
    (totalApps || 1);
  const bestScore = Math.max(...applications.map((app) => app.match_score), 0);

  return (
    <div className="space-y-8 w-full pb-12">
      <ApplicationDashBoardCards
        totalApps={totalApps}
        avgScore={avgScore}
        bestScore={bestScore}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Your Tailored Letters
          </h2>
          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">
            {totalApps} {totalApps === 1 ? "Letter" : "Letters"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
          {applications.map((app) => (
            <Link
              key={app.id}
              href={`/cover-letter/${app.id}`}
              className="block transition-transform duration-200 hover:-translate-y-0.5"
            >
              <ApplicationCard
                companyName={app.company_name}
                createdAt={new Date(app.created_at).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric", year: "numeric" },
                )}
                jobTitle={app.job_title}
                matchScore={app.match_score}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const ApplicationDashBoardCards = React.memo(
  ({
    totalApps,
    avgScore,
    bestScore,
  }: {
    totalApps: number;
    avgScore: number;
    bestScore: number;
  }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="border border-border/50 bg-card/45 backdrop-blur-sm shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Total Applications
              </p>
              <p className="text-3xl font-bold tracking-tight text-foreground">
                {totalApps}
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400">
              <Briefcase className="h-5.5 w-5.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 bg-card/45 backdrop-blur-sm shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Average Match
              </p>
              <p className="text-3xl font-bold tracking-tight text-foreground">
                {avgScore.toFixed(0)}%
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-400">
              <Percent className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/50 bg-card/45 backdrop-blur-sm shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Top Match
              </p>
              <p className="text-3xl font-bold tracking-tight text-foreground">
                {bestScore.toFixed(0)}%
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400">
              <Award className="h-5.5 w-5.5" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  },
);
