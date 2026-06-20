"use client"

import * as React from "react"
import {
  LayoutDashboard,
  FolderKanban,
  SendHorizontal,
  Settings,
  Sparkles,
  ChevronRight,
  User,
  LogOut,
  FileText,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Applications",
    url: "/applications",
    icon: FolderKanban,
  },
  {
    title: "Cover Letter",
    url: "/cover-letter",
    icon: SendHorizontal,
  },
  {
    title: "Resume Builder",
    url: "/resume-builder",
    icon: FileText
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <AppSidebarHeader />
      <AppSidebarContent />
      <AppSidebarFooter />      
    </Sidebar>
  )
}


function AppSidebarHeader(){
  return (
<SidebarHeader className="p-4 border-b border-zinc-200/50 dark:border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-tr from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div className="flex flex-col data-[cola]:hidden">
            <span className="font-semibold text-sm leading-tight text-zinc-900 dark:text-zinc-50  ">Appli AI</span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 ">v0.1.0</span>
          </div>
        </div>
      </SidebarHeader>

  )
}


function AppSidebarContent(){
  return (

 <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              {items.map((item) => (
                <React.Fragment key={item.title} >
                <SidebarMenuItem >
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-50"
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
  )
}


function AppSidebarFooter(){
  return (
    <SidebarFooter className="p-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
        <div className="flex items-center justify-between gap-2 rounded-xl p-2 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30 transition-all cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              <User className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Fatma</span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500">fatma@appli.ai</span>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-zinc-400 dark:text-zinc-600" />
        </div>
      </SidebarFooter>
  )}