import { Mail, Globe, Heart } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-card/20 backdrop-blur-md py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs md:text-sm text-muted-foreground">
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
          <span>© {new Date().getFullYear()} <span className="font-semibold text-foreground">AppliAI</span>. All rights reserved.</span>
          <span className="hidden sm:inline text-muted-foreground/30">|</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 fill-indigo-500 text-indigo-500 animate-pulse" /> by <span className="text-foreground font-medium">Bilal</span>
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <a
            href="mailto:belamraoui21@gmail.com"
            className="flex items-center gap-1.5 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
          >
            <Mail className="h-4 w-4 text-indigo-500/70" />
            <span>belamraoui21@gmail.com</span> 
          </a>
          <a
            href="https://github.com/b2i0l0a3l"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
            aria-label="Website"
          >
            <Globe className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
