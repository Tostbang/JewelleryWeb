import { Calculator01Filled, CustomerSupportFilled, DashboardSquare03Filled, LaptopPhoneSync1Filled, Package, PackageFilled, User02Filled } from "asem-icons";
import { CircleQuestionMark, Factory, Headset, LayoutDashboard, Star, User } from "lucide-react";


export const userLinks = [
  {
    title: "Kontrol Paneli",
    url: "/dash/dashboard",
    icon: DashboardSquare03Filled,
    subLinks: null,
  },
  {
    title: "hesaplama",
    url: "/dash/calculate",
    icon: Calculator01Filled,
    subLinks: null,
  },
  // {
  //   title: "Destek",
  //   url: "/dash/support",
  //   icon: CustomerSupportFilled,
  //   subLinks: null
  // },
  // {
  //   title: "Paketler",
  //   url: "/dash/packages",
  //   icon: Package,
  //   subLinks: null
  // },
  // {
  //   title: "Ihaleler",
  //   url: true,
  //   icon: HandshakeIcon,
  //   subLinks: [
  //     {
  //       title: "İhaleler Listele",
  //       url: "/dash/tender",
  //       icon: LayoutList
  //     },
  //     {
  //       title: "Açık İhaleler",
  //       url: "/dash/public-tenders",
  //       icon: Check
  //     },
  //     {
  //       title: "Sipariş Bekliyor",
  //       url: "/dash/completed-tenders",
  //       icon: CheckCheck
  //     },
  //   ],
  // },
  // {
  //   title: "Ekip Yönetimi",
  //   url: null,
  //   icon: Users,
  //   subLinks: [
  //     {
  //       title: "Departmanlar",
  //       url: "/dash/departments",
  //       icon: Building2,
  //       subLinks: null,
  //     },
  //     {
  //       title: "Personeller",
  //       url: "/dash/users",
  //       icon: Users,
  //       subLinks: null,
  //     },
  //   ],
  // },
  {
    title: "Cihazlar",
    url: "/dash/devices",
    icon: LaptopPhoneSync1Filled,
    subLinks: null
  },
  {
    title: "paketler",
    url: "/dash/packages",
    icon: PackageFilled,
    subLinks: null,
  },
  {
    title: "profil",
    url: "/dash/profile",
    icon: User02Filled,
    subLinks: null,
  },
  // {
  //   title: "Sıkça Sorulan Sorular",
  //   url: "/dash/faq",
  //   icon: CircleQuestionMark,
  //   subLinks: null,
  // },
  // {
  //   title: "Değerlendirmeler",
  //   url: "/dash/reviews",
  //   icon: Star,
  //   subLinks: null,
  // },
  // {
  //   title: "Hesabım",
  //   url: null,
  //   icon: Settings,
  //   subLinks: [
  //     {
  //       title: "Profil",
  //       url: "/dash/profile",
  //       icon: User
  //     },
  //     {
  //       title: "Cihazlar",
  //       url: "/dash/devices",
  //       icon: MonitorSmartphone
  //     },
  //   ]
  // }
]

export const adminLinks = [
  {
    title: "Kontrol Paneli",
    url: "/admin/dashboard",
    icon: DashboardSquare03Filled,
    subLinks: null,
  },
  {
    title: "Destek",
    url: "/admin/support",
    icon: CustomerSupportFilled,
    subLinks: null
  },
  {
    title: "Cihazlar",
    url: "/admin/devices",
    icon: LaptopPhoneSync1Filled,
    subLinks: null
  },
  {
    title: "paketler",
    url: "/admin/packages",
    icon: PackageFilled,
    subLinks: null,
  },
  {
    title: "profil",
    url: "/admin/profile",
    icon: User02Filled,
    subLinks: null,
  },
]