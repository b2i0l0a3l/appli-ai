import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-600 dark:text-violet-400 text-xs font-semibold mb-6 animate-pulse">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Next-Gen Application Intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1] mb-6">
          Land Your Dream Job with{" "}
          <span className="bg-linear-to-tr from-violet-600 to-indigo-500 bg-clip-text text-transparent">
            AI-Powered
          </span>{" "}
          Precision
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          AppliAI is your personal job application copilot. Scan job descriptions, calculate match compatibility, and instantly write high-converting cover letters tailored to your profile.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button asChild size="lg" className="w-full sm:w-auto h-12 px-8 bg-linear-to-tr from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 cursor-pointer">
            <Link href="/dashboard">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 border-border/80 bg-background/50 backdrop-blur-sm hover:bg-muted/80 transition-all hover:-translate-y-0.5 cursor-pointer">
            <Link href="#features">Explore Features</Link>
          </Button>
        </div>

        <div className="relative max-w-5xl mx-auto rounded-xl border border-border/50 bg-card/30 backdrop-blur-md p-2 shadow-2xl shadow-violet-500/5">
          <div className="rounded-lg border border-border/40 overflow-hidden bg-background/80">
            <div className="flex items-center justify-between border-b border-border/40 px-4 py-3 bg-muted/30">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/30" />
                <span className="h-3 w-3 rounded-full bg-amber-500/20 border border-amber-500/30" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/20 border border-emerald-500/30" />
              </div>
              <div className="text-xs text-muted-foreground font-mono">appliai.com/dashboard</div>
              <div className="w-12" />
            </div>
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="md:col-span-2 space-y-4">
                <div className="h-6 w-1/3 bg-muted rounded animate-pulse" />
                <div className="h-4 w-full bg-muted/60 rounded" />
                <div className="h-4 w-5/6 bg-muted/60 rounded" />
                <div className="pt-4 space-y-3">
                  <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-sm">94%</div>
                      <div>
                        <div className="font-semibold text-sm">Senior Frontend Engineer</div>
                        <div className="text-xs text-muted-foreground">Google, Inc.</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">High Match</span>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-border/50 bg-muted/20 space-y-4">
                <div className="font-bold text-sm">Application Quality</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-violet-500">A+</span>
                  <span className="text-xs text-muted-foreground">Ready to submit</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Impact Points</span>
                    <span className="text-emerald-500 font-semibold">+4 added</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded overflow-hidden">
                    <div className="h-full w-[90%] bg-violet-500 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    )
}