export default function StatsCard(){
    return(
         <section className="bg-slate-900 dark:bg-slate-950 p-6 rounded-lg shadow-sm text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-300">Document Strength</span>
              <span className="text-2xl font-bold text-blue-400">88%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-6">
              <div className="bg-blue-500 h-full" style={{ width: '88%' }}></div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="text-xl font-bold">342</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-1">Words</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">2.1m</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-1">Read Time</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">4</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-1">Impact Points</div>
              </div>
            </div>
          </section>
    )
}