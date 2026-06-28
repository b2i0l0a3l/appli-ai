import Hero from "./hero";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("./footer"), {loading: () => <div></div>});
const Feature = dynamic(() => import("./feature"), {loading: () => <div></div>});
const Detail = dynamic(() => import("./details"), {loading: () => <div></div>});
const Review = dynamic(() => import("./review"), {loading: () => <div></div>});
const GetStart = dynamic(() => import("./get-start"), {loading: () => <div></div>});

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
      <GetStart/>
      <Footer/>
    </div>
    );
}