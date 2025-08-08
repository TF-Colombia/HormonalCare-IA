"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, Users } from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/patients", label: "Patients", icon: Users },
  { href: "/schedule", label: "Schedule", icon: Home },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4">
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.label}>
            <Link href={item.href}>
              <SidebarMenuButton
                isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
                className="w-full"
                tooltip={item.label}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
}
