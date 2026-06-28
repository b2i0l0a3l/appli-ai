import { Heart, Mail, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
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
    );
}