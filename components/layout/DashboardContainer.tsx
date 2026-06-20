export default function DashboardContainer({children, className,title,description}:{
    children:React.ReactNode,
    title : string,
    description : string,
    className? : string,

}){
  return (
    <div className="w-full h-full px-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-xs translate-y-1 text-primary/50">{description}</p>
        <div className={className ?? ""}>
            {children}
        </div>
        
    </div>
  )
}