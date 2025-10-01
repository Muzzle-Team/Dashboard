'use client'
import Navbar from "@/components/dashboard/navbar"
import Sidebar from "@/components/dashboard/sidebar"
import { useSidebar } from "@/context/userSidebar";
import { LogOut, LayoutDashboard } from "lucide-react"
export default function Dashboard() {
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
    } = useSidebar();
    return (
        <main>
            <Navbar />
            <div className="md:ml-[10rem] h-screen  bg-[#1d1c27] text-white">
                <Sidebar />
                <div className="w-full fixed z-50 mt-[40px] ml-0 md:ml-[13.25rem] border-t  border-[#38364d]" />
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 backdrop-blur-sm z-10"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}
                <div className="px-5 md:px-[100px]  overflow-auto ml-0 md:ml-[15rem] pt-[60px] md:pt-[90px] ">

                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                        <h2 className="text-white flex space-x-2 font-medium text-lg md:text-xl">
                            <LayoutDashboard className="h-6 w-6" />
                            <span>Overview</span>
                        </h2>


                       
                        <span className="hidden md:block w-px h-4 bg-[#5b5683]"></span>

                        <span className="text-md text-zinc-400">
                            Get a comprehensive overview of all your activity.
                        </span>
                    </div>
                </div>
            </div>
        </main>

    )
}