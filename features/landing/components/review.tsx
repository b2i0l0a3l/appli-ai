export default function Review(){
    return (
        <section id="testimonials" className="py-20 md:py-28 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-4">
            Hear from our successful users
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Thousands of professionals have saved time and doubled their interview rates using AppliAI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
            <p className="text-sm text-muted-foreground italic mb-4 leading-relaxed">
              "AppliAI completely changed my job search strategy. I generated 15 tailored letters in one afternoon, got 4 interviews, and signed a great offer within a month!"
            </p>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-linear-to-tr from-violet-500 to-indigo-500 flex items-center justify-center font-bold text-white text-xs">SK</div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Sarah K.</h4>
                <p className="text-xs text-muted-foreground">Product Manager</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
            <p className="text-sm text-muted-foreground italic mb-4 leading-relaxed">
              "Calculating the match score is a game-changer. I optimized my resume to reach a 92% match score for a developer job, and the HR reached out in under 48 hours."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-linear-to-tr from-emerald-500 to-teal-500 flex items-center justify-center font-bold text-white text-xs">MA</div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Marc A.</h4>
                <p className="text-xs text-muted-foreground">Frontend Developer</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm">
            <p className="text-sm text-muted-foreground italic mb-4 leading-relaxed">
              "The document analytics inside the builder are incredibly helpful. It highlights exactly what to fix and how to structure impact points for optimal readability."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-linear-to-tr from-amber-500 to-orange-500 flex items-center justify-center font-bold text-white text-xs">TL</div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Tariq L.</h4>
                <p className="text-xs text-muted-foreground">Operations Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}