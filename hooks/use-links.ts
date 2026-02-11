import { ItemLink } from "@/components/my-nav";
import { AdminLinks, DepartmentUser, ManagerLinks, PurchaserLinks, SupplierLinks } from "@/lib/static";
// import { useProfileStore } from "@/lib/stores/profile-store"
import { useMemo } from "react";
import { sidebarLinks } from "./static";

export function useLinks() {
  // const roleId = useProfileStore(s => s.profile?.roleId)

  return useMemo(() => {
    // if (roleId === "Supplier") {
    //   return SupplierLinks;
    // }
    // else if (roleId === "Purchaser") {
    //   return PurchaserLinks;
    // }
    // else if (roleId === "Manager") {
    //   return ManagerLinks;
    // } else if (roleId === "Admin") {
    //   return AdminLinks
    // } else if (roleId === "DepartmentUser") {
    //   return DepartmentUser
    // }
    // return []
    return sidebarLinks;
    // }, [roleId]) as ItemLink[]
  }, []) as ItemLink[]
}