"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { createClient } from "@/utils/supabase/client"
import Image from "next/image"
import Link from "next/link"
import { useSidebar } from "@/components/ui/sidebar"; // Import the hook

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Automate",
      url: "#",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "Automate Mail",
          url: "/dashboard/automate",
        },
      ],
    },
  ],
  projects: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<any>(null)
  const supabase = createClient()

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    fetchUser()
  }, [])

  // Prepare user data for NavUser
  const navUser = user
    ? {
        name: user.user_metadata.full_name || user.email || "User",
        email: user.email || "",
        avatar: user.user_metadata.avatar_url || "/file.svg", // fallback to a default avatar
      }
    : {
        name: "Guest",
        email: "",
        avatar: "/file.svg",
      }

  const { state } = useSidebar(); // Get sidebar state

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className={`flex items-center ${state === "expanded" && 'px-2'} py-1`}>
          <Link href={'/dashboard'} className="flex items-center gap-2">
            <Image
              src={'/logo.png'}
              alt="logo"
              width={1920}
              height={1080}
              className="w-8 h-8"
            />
            {/* Only show text when expanded */}
            {state === "expanded" && (
              <span className="font-bold text-lg tracking-tight font-mont">AutoReach</span>
            )}
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
