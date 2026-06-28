import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GetStart() {
    return (
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
    );
}