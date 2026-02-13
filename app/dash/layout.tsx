import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";
import { ViewTransitions } from "next-view-transitions";
import { cookies } from "next/headers";
import { DashProviders, MainComponent } from "@/components/DashProviders";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const sideBarDefaultValue = (await cookies()).get("sidebar_state")?.value === "true" ? true : false;

  return (
    <ViewTransitions>
      <main className="bg-my-gradient">
        <DashProviders sideBarDefaultValue={sideBarDefaultValue}>
          <AppSidebar layout="dash" variant="floating" />
          <SidebarInset className="bg-transparent">
            <MainComponent >
              {children}
            </MainComponent>
          </SidebarInset>
        </DashProviders>
      </main>
    </ViewTransitions>
  )
}

