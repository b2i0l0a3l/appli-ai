import { Button } from "@/components/ui/button";
import Link from "next/link";
import AuthButton from "./authButton";


const links = [
    "About", "Features", "Pricing"
]
export default function Navbar() {
    return (
       <>
        <header className="text-sm flex flex-1 items-center justify-between py-3 px-4 sticky top-0 z-10">
            <div>
                <h1 className="font-bold text-xl">Appli.ai</h1>
            </div>
            <nav className="flex items-center gap-4">
                <ul className="flex items-center gap-4">
                    {links.map(link =>{
                        return (
                            <li key={link}>
                                <Link href={`/#${link}`} className="flex items-center border-b  border-transparent hover:border-b-white transition-all duration-300 ease-out">
                                    {link}
                                </Link>
                            </li>)
                    })}
                </ul>  
               <AuthButton/>
            </nav>
        </header>
       </>
    );
}   