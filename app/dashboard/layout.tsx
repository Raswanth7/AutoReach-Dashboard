'use client'
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import React from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : ""
  // fallback for SSR: usePathname is a client hook, so fallback to window.location.pathname
  // but in Next.js 13+, usePathname is preferred in client components
  // We'll use a workaround for now
  let segments: string[] = []
  if (typeof window !== "undefined") {
    segments = window.location.pathname.replace(/^\//, "").split("/")
  }
  // Remove empty and 'dashboard' segment (since we're already in dashboard layout)
  segments = segments.filter((seg) => seg && seg !== "dashboard")

  // Map segment to readable label
  const labelMap: Record<string, string> = {
    "automate": "Automate",
    "automate-mail": "Automate Mail",
  }
  const breadcrumbs = [
    { label: "Outreach", href: "/dashboard" },
    { label: "Dashboard", href: "/dashboard" },
    ...segments.map((seg, i) => {
      const label = labelMap[seg] || seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      const href = "/dashboard/" + segments.slice(0, i + 1).join("/")
      return { label, href }
    })
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, idx) => (
                  <React.Fragment key={crumb.href}>
                    {idx !== 0 && <BreadcrumbSeparator className="hidden md:block" />}
                    <BreadcrumbItem>
                      {idx === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 