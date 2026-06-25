export default function Detail(){
    return(
        <section id="how-it-works" className="py-20 md:py-28 bg-muted/30 border-t border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4">
              Get hired in three simple steps
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Say goodbye to hours of writing and formatting. With AppliAI, you can optimize your path to an interview in under 2 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="text-center p-6 space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-white font-bold text-lg shadow-lg shadow-violet-500/20">
                1
              </div>
              <h3 className="font-bold text-lg text-foreground">Upload Your Resume</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Add your resume or experiences to AppliAI once. Our model securely parses your skills and achievements.
              </p>
            </div>

            <div className="text-center p-6 space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
                2
              </div>
              <h3 className="font-bold text-lg text-foreground">Paste Job Details</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Paste the job description and company details of the role you want. We analyze target terms.
              </p>
            </div>

            <div className="text-center p-6 space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white font-bold text-lg shadow-lg shadow-emerald-500/20">
                3
              </div>
              <h3 className="font-bold text-lg text-foreground">Optimize & Export</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Review your match score, view suggestions, polish your letter inside the editor, and download the PDF.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
}