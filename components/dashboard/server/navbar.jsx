'use client'

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Headset } from "lucide-react";
import { useGuildSidebar } from "@/context/guildSidebar";

export default function Navbar() {
  const {
    setIsSidebarOpen,
    isSidebarOpen,
    active,
    setActive,
    isLeaderboardOpen,
    setIsLeaderboardOpen,
    isGeneralOpen,
    setIsGeneralOpen,
    isSubscription,
    setIsSubscription,
  } = useGuildSidebar();
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#111018] px-4 sm:px-8 py-2 flex items-center justify-between z-50">
     <div className="hidden md:block"></div>
     <div className="flex items-center gap-2">
          <img
            src={`https://cdn.discordapp.com/avatars/618078478755037185/9d67cfd5d3ecd981548c55b5fadd6912.png?size=1024`}
            alt="Profile"
            draggable={false}
            className="rounded-md bg-indigo-700 w-6 h-6 object-cover select-none"
          />
          <span className="text-white text-md font-bold tajawal select-none">mazinx</span>
      </div>
        <div className="block">
        <div
      id="nav-icon3"
      className={`${isSidebarOpen ? "open" : ""} block md:hidden`}
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
        </div>
    </nav>
  );
}
