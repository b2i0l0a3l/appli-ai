"use client";
import React from "react";
import { ModeToggle } from "../toggles/mode-toggle"
import { SidebarTrigger } from "../ui/sidebar"

const SideBarHeader = ()=>{
    return <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-zinc-200/50 px-4 bg-white/50 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-950/50">
                        <SidebarTrigger className="-ml-1" />
                        <ModeToggle />
                      </header>
}
export default React.memo(SideBarHeader);