"use client"
import { AppSidebar } from "@/components/app-sidebar";
import DashPage from "@/components/DashPage";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { NavUser } from "@/components/nav-user";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import Cookies from "js-cookie";
import { ViewTransitions } from "next-view-transitions";


export default function Layout({ children }: { children: React.ReactNode }) {
  const sideBarDefaultValue = Cookies.get("sidebar_state") === "true" ? true : false;
  return (
    <ViewTransitions>
      <main className="bg-linear-to-r from-[#f8f6f5] to-[#f9f4ea] ">
        <SidebarProvider defaultOpen={sideBarDefaultValue}>
          <AppSidebar variant="floating" />
          <SidebarInset className="bg-transparent">
            <MainComponent >
              {children}
            </MainComponent>
          </SidebarInset>
        </SidebarProvider>
      </main>
    </ViewTransitions>
  )
}

function MainComponent({ children }: { children: ReactNode | ReactNode[] }) {
  const { state } = useSidebar()
  return (
    <main className={`h-screen ${state === "expanded" ? "md:w-[calc(100vw-19rem)]" : "md:w-[calc(100vw-6rem)]"} transition-all duration-300 flex flex-col overflow-hidden  px-2 pb-2 mr-2`}>
      <header className="flex justify-between h-14 shrink-0 items-center gap-2 bg-transparent transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1 " />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <div>
            <DynamicBreadcrumb />
          </div>
        </div>
        <NavUser />
      </header>
      <DashPage>
        {children}
      </DashPage>
    </main>
  )
}