"use client"

import * as React from "react"
import {
  LayoutDashboard,
  FolderKanban,
  SendHorizontal,
  FileText,
  Sparkles,
  ChevronUp,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useClerk, useUser } from "@clerk/nextjs"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview & generate",
  },
  {
    title: "Applications",
    url: "/applications",
    icon: FolderKanban,
    description: "All your job apps",
  },
  {
    title: "Cover Letter",
    url: "/cover-letter",
    icon: SendHorizontal,
    description: "Edit your letter",
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

function AppSidebarHeader() {
  return (
    <SidebarHeader className="p-4 border-b border-border/50">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-tr from-violet-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/30">
          <Sparkles className="h-4.5 w-4.5" />
        </div>
        <div className="flex flex-col group-data-[collapsible=icon]:hidden">
          <span className="font-bold text-sm leading-tight text-foreground tracking-tight">
            Appli<span className="text-violet-500">AI</span>
          </span>
          <span className="text-[10px] text-muted-foreground font-medium">Your AI job copilot</span>
        </div>
      </div>
    </SidebarHeader>
  )
}

function AppSidebarContent() {
  const pathname = usePathname()

  return (
    <SidebarContent className="px-2 py-3">
      <SidebarGroup>
        <SidebarGroupLabel className="px-3 mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
          Platform
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="space-y-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.url || pathname.startsWith(item.url + "?")
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link
                      href={item.url}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      )}
                    >
                      <div className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors duration-200",
                        isActive
                          ? "bg-primary/15 text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                        <span className="text-sm leading-none">{item.title}</span>
                        <span className={cn(
                          "text-[10px] mt-0.5 font-normal leading-none transition-colors",
                          isActive ? "text-primary/70" : "text-muted-foreground/60"
                        )}>
                          {item.description}
                        </span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary rounded-r-full" />
                  )}
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}

function AppSidebarFooter() {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()

  const displayName = user?.fullName || user?.firstName || "User"
  const email = user?.emailAddresses?.[0]?.emailAddress || ""
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <SidebarFooter className="p-3 border-t border-border/50">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="w-full rounded-xl px-3 py-2.5 hover:bg-muted/60 transition-all data-[state=open]:bg-muted/60"
                tooltip={displayName}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-violet-500 to-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20">
                  {initials || "U"}
                </div>
                <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
                  <span className="text-xs font-semibold text-foreground truncate leading-none">{displayName}</span>
                  <span className="text-[10px] text-muted-foreground truncate mt-0.5 leading-none">{email}</span>
                </div>
                <ChevronUp className="ml-auto h-3.5 w-3.5 text-muted-foreground group-data-[collapsible=icon]:hidden" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="top"
              align="start"
              className="w-56 rounded-xl shadow-xl border-border/60"
            >
              <div className="px-3 py-2.5 border-b border-border/40">
                <p className="text-xs font-semibold text-foreground">{displayName}</p>
                <p className="text-[11px] text-muted-foreground truncate">{email}</p>
              </div>
              <DropdownMenuItem
                onClick={() => openUserProfile()}
                className="mt-1 cursor-pointer rounded-lg mx-1 text-sm"
              >
                Manage Account
              </DropdownMenuItem>
              <DropdownMenuSeparator className="mx-1" />
              <DropdownMenuItem
                onClick={() => signOut({ redirectUrl: "/" })}
                className="cursor-pointer rounded-lg mx-1 mb-1 text-sm text-red-500 hover:text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30"
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}