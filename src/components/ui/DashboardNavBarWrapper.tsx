// Client Component wrapper for NavBar to handle icon mapping

"use client"

import { NavBar } from "./tubelight-navbar"
import { Search, Bookmark, Newspaper, MessageCircle, Phone } from "lucide-react"

const iconMap = {
  Search,
  Bookmark,
  Newspaper,
  MessageCircle,
  Phone,
}

const navItems = [
  { name: "Find Aid", url: "/dashboard", icon: "Search" },
  { name: "Saved Aid", url: "/dashboard/saved-aid", icon: "Bookmark" },
  { name: "News", url: "#", icon: "Newspaper" },
  { name: "Testimonial", url: "#", icon: "MessageCircle" },
  { name: "Contact", url: "#", icon: "Phone" },
]

export default function DashboardNavBarWrapper({ className }: { className?: string }) {
  // Map icon string to actual icon component
  const itemsWithIcons = navItems.map(item => ({
    ...item,
    icon: iconMap[item.icon as keyof typeof iconMap],
  }))
  return <NavBar items={itemsWithIcons} className={className} />
}