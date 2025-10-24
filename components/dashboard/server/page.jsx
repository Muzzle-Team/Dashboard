'use client'
import Navbar from "@/components/dashboard/server/navbar"
import Sidebar from "@/components/dashboard/server/sidebar"
import { useGuildSidebar } from "@/context/guildSidebar";
import { LogOut, LayoutDashboard } from "lucide-react"
import { useRef, useEffect } from 'react'

export default function Page({ children }) {
    const {
        setIsSidebarOpen,
        isSidebarOpen
    } = useGuildSidebar();

    
    return (
        <main>
            <Navbar />
            <div className="lg:ml-[10rem] min-h-screen bg-[#111018d5] text-white">
                <Sidebar />
                <div className="w-full fixed hidden-scrollbar z-40 mt-[40px] ml-0 lg:ml-[13.25rem] border-t border-[#32304d]" />
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 backdrop-blur-sm z-10"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}
                <div className="px-5 lg:px-[20px] hidden-scrollbar ml-0 lg:ml-[15rem] pt-[60px] lg:pt-[90px] min-h-screen">
                    {children}
                </div>
            </div>
        </main>
    )
}
