'use client'
import Navbar from "@/components/dashboard/navbar"
import Sidebar from "@/components/dashboard/sidebar"
import { useSidebar } from "@/context/userSidebar";
import { LogOut, LayoutDashboard } from "lucide-react"
export default function Page({ children }) {
    const {
        setIsSidebarOpen,
        isSidebarOpen
    } = useSidebar();
    return (
        <main>
            <Navbar />
            <div className="md:ml-[10rem] min-h-screen  bg-[#1d1c27] text-white">
                <Sidebar />
                <div className="w-full fixed z-50 mt-[40px] ml-0 md:ml-[13.25rem] border-t  border-[#38364d]" />
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 backdrop-blur-sm z-10"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}
                <div className="px-5 md:px-[20px]  overflow-auto ml-0 md:ml-[15rem] pt-[60px] md:pt-[90px] ">
                    {children}
                </div>
            </div>
        </main>
    )
}