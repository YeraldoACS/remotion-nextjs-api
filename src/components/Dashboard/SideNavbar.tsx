"use client";
import { NavBarCollapse } from "./NavBarCollapse";
import { NavBarExpand } from "./NavBarExpand";

interface SideNavbarProps {
  collapsed?: boolean;
}
export function SideNavbar({ collapsed = false }: SideNavbarProps) {
  console.log("🚀 ~ SideNavbar ~ collapsed:", collapsed)
  return collapsed ? <NavBarCollapse /> : <NavBarExpand />;
}
