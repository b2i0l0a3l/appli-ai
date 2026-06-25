import { BrainCircuit, FileText, LayoutDashboard, ShieldCheck, TrendingUp, Zap } from "lucide-react";

export default function Feature() {
    const featureCards=[{
icon:<BrainCircuit/>,
title:"AI Job Match Analysis",
description:"Scan job descriptions against your CV to find exact matches, missing keywords, and profile alignment scores immediately.",
className:"h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
    },
      {
        icon:<FileText/>,
        title:"Tailored Cover Letters",
        description:"Generate fully customized cover letters tailored precisely to your targets, highlighting relevant skills and experiences.",
        className:"h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
      },
      {
        icon:<LayoutDashboard/>,
        title:"Analytics Dashboard",
        description:"Keep track of all your ongoing and past job applications, scores, and generated letter drafts in one premium dashboard.",
        className:"h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
      },
      {
        icon:<Zap/>,
        title:"Real-time Optimization",
        description:"Receive smart suggestions on readability, impact score, and target adjustments directly within the editor interface.",
        className:"h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
      },
      {
        icon:<ShieldCheck/>,
        title:"Privacy Protection",
        description:"Your resume files, job details, and data are securely processed and protected. We do not sell or share user data.",
        className:"h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
      },
      {
        icon:<TrendingUp/>,
        title:"Continuous Updates",
        description:"Continuously trained AI modules stay up-to-date with top hiring practices, giving you an edge in today's competitive market.",
        className:"h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
      }
]
    return (
        <section id="features" className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-t border-border/40">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4">
            Everything you need to apply with confidence
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Take the guesswork out of job hunting. AppliAI analyzes your profile, scores your alignment, and drafts top-tier materials instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureCards.map((feature, index) => (
            <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
        ))}

        </div>

      </section>
    )
}

function FeatureCard({
    icon,
    title,
    description
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="group p-6 rounded-xl border border-border/50 bg-card/40 hover:bg-card/85 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="h-10 w-10 rounded-lg bg-violet-500/10 text-violet-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {icon}
            </div>
            <h3 className="text-lg font-bold mb-2 text-foreground">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>
        </div>
    )
}