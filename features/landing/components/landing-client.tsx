import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  ArrowRight, 
  Heart,
  Mail
} from "lucide-react";
import Hero from "./hero";
import Feature from "./feature";
import Detail from "./details";
import Review from "./review";

export default function LandingClient() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[600px] w-full max-w-7xl bg-radial from-violet-500/10 via-transparent to-transparent blur-3xl" />
      <div className="absolute top-[800px] left-1/4 -z-10 h-[400px] w-[400px] bg-radial from-indigo-500/5 via-transparent to-transparent blur-3xl" />

      <Hero/>
      <Feature/>    
      <Detail/>
      <Review/>

      <section className="pb-24 max-w-7xl mx-auto px-6">
        <div className="relative rounded-2xl overflow-hidden bg-linear-to-tr from-violet-600/90 to-indigo-600/90 dark:from-violet-950/60 dark:to-indigo-950/60 p-8 md:p-12 text-center text-white border border-violet-500/20 shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#80808010_1px,transparent_1px)] bg-[size:10px_10px]" />
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 relative z-10">
            Ready to secure your next interview?
          </h2>
          <p className="text-violet-100 dark:text-violet-200 max-w-xl mx-auto mb-8 text-sm sm:text-base relative z-10">
            Sign up today and optimize your job applications with the power of artificial intelligence.
          </p>
          <Button asChild size="lg" className="h-12 px-8 bg-white hover:bg-violet-50 text-violet-600 font-bold shadow-lg transition-transform hover:-translate-y-0.5 relative z-10 cursor-pointer">
            <Link href="/dashboard">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border/40 py-8 bg-card/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-violet-500" />
              <span className="font-bold text-foreground">AppliAI</span>
              <span>&copy; {new Date().getFullYear()}. All rights reserved.</span>
            </span>
            <span className="hidden sm:inline text-muted-foreground/30">|</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 fill-indigo-500 text-indigo-500 animate-pulse" /> by <span className="text-foreground font-medium">Bilal</span>
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <a
              href="mailto:belamraoui21@gmail.com"
              className="flex items-center gap-1.5 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
            >
              <Mail className="h-4 w-4 text-indigo-500/70" />
              <span>belamraoui21@gmail.com</span>
            </a>
            <div className="flex gap-4">
              <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
              <Link href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</Link>
              <Link href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
    );
}