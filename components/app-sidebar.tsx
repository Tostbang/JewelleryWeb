"use client"

import * as React from "react"
import {
  Download,
  Medal,
  Sparkles,
} from "lucide-react"

import { AnimatePresence, motion as m } from "motion/react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { MyNav } from "./my-nav"
import Image from "next/image"
// import logo from "@/public/miniLogo.svg"
import { Link } from "next-view-transitions"
import { ScrollArea } from "./ui/scroll-area"
// import { useProfileStore } from "@/lib/stores/profile-store"

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar()
  // const { profile } = useProfileStore()

  const profile = {
    roleId: "Manager"
  }
  const isSupplier = profile?.roleId === "Supplier" ? true : false;
  const isManager = profile?.roleId === "Manager"
  const isPurchaser = profile?.roleId === "Purchaser"

  return (
    <Sidebar collapsible="icon" variant="floating"  {...props}>
      <SidebarHeader >
        {/* <TeamSwitcher teams={data.teams} /> */}
        <SidebarMenuButton
          size="lg"
          className={`data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-white`}
          asChild
        >
          <Link href={`/dash/dashboard/${isSupplier ? "supplier" : isManager ? "manager" : isPurchaser ? "purchaser" : "manager"}`}>
            <div className={`text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg ${!open && "ml-2"} `}>
              {/* <activeTeam.logo className="size-4" /> */}
              {/* <Image alt="logo" src={logo} width={200} height={200} className="w-full h-full" /> */}
              <Sparkles className="text-black size-12" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <h2 className="truncate font-bold ">Jewellery</h2>
              <span className="truncate text-xs text-gray-500">Panel</span>
            </div>
          </Link>
          {/* <ChevronsUpDown className="ml-auto" /> */}
        </SidebarMenuButton>
        {/* <div className="flex gap-x-2 items-center px-3">
          <div className="w-20">
            <Image alt="logo" src={logo} width={200} height={200} />
          </div>
          {open && (
            <h2 className="font-medium">Pro-ihale</h2>
          )}
        </div> */}
      </SidebarHeader>
      <SidebarContent className="">
        <ScrollArea className="h-full">
          <MyNav />
        </ScrollArea>
        {/* <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter className="overflow-hidden ">
        <AnimatePresence mode="wait" >
          {open && (
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: .2 }} className="relative w-[250px] min-w-full rounded-2xl overflow-hidden bg-mainColor text-white py-3 px-3 ">
              {/* decorative background - placed behind content */}
              <div className="bg-pattern-download" />
              {/* <div className="absolute inset-0 opacity-100 bg-[url('/pattern.svg')] bg-cover pointer-events-none -z-10" /> */}
              <div className="relative z-10 flex flex-col sm:items-center sm:justify-between gap-4">
                <div className="min-w-0">
                  <span className="flex justify-center items-center size-5 bg-white text-gray-500 rounded-full"><Medal className="size-4" /></span>
                  <h2 className='text-xl font-normal text-gray-100'>Uygulamamızı Keşfedin</h2>
                  <p className="text-sm font-extralight mt-1 mb-2">Play Store ve App Store</p>
                </div>
                <button className='inline-flex items-center justify-center w-full rounded-lg gap-2 px-3 py-2 bg-secondaryColor 
             text-mainColor text-sm font-semibold'><Download className='size-4' />INDIR</button>
              </div>
            </m.div>
          )}
        </AnimatePresence>
        {/* <NavUser profile={profile} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
