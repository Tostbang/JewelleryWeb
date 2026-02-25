"use client"
import { useProfileStore } from "@/lib/store/profile-store";
import { SidebarProvider, SidebarTrigger, useSidebar } from "./ui/sidebar";
import useGetProfile from "@/app/dash/_services/queries";
import { ReactNode, useEffect } from "react";
import { Separator } from "./ui/separator";
import DynamicBreadcrumb from "./DynamicBreadcrumb";
import { NavUser } from "./nav-user";
import DashPage from "./DashPage";

export function DashProviders({ children, sideBarDefaultValue }: { children: React.ReactNode, sideBarDefaultValue: boolean }) {
  const { setProfile } = useProfileStore()
  const { data: profile } = useGetProfile()
  useEffect(() => {
    if (profile) {
      setProfile(profile)
    }
  }, [profile])
  return (
    <SidebarProvider defaultOpen={sideBarDefaultValue}>
      {children}
    </SidebarProvider>
  )
}

export function MainComponent({ children }: { children: ReactNode | ReactNode[] }) {
  const { state } = useSidebar()
  return (
    <main className={`h-screen ${state === "expanded" ? "md:w-[calc(100vw-19rem)]" : "md:w-[calc(100vw-6rem)]"} transition-all duration-300 flex flex-col overflow-hidden  px-2 pb-2 mr-2`}>
      <header className="flex justify-between h-14 shrink-0 items-center gap-2 bg-transparent transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1 " />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4 bg-gray-600 mt-1.5"
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