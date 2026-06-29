import type { Metadata } from "next";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import SideBarHeader from "@/components/layout/side-bar-header";
import { Toaster } from "sonner";
import Footer from "@/components/layout/footer";


export const metadata: Metadata = {
  title: "Appli AI",
  description: "AppLi ",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col min-h-screen">
          <SideBarHeader />
          <main className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex-1">{children}</div>
            <Footer />
            <Toaster />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
