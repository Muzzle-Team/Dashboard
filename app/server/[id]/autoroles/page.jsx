'use client'
import Navbar from "@/components/dashboard/navbar"
import Sidebar from "@/components/dashboard/sidebar"
import { useSidebar } from "@/context/userSidebar";
import { LogOut, LayoutDashboard, Trash2 } from "lucide-react"
import Page from "@/components/dashboard/server/page";
import JoinsAndLeaves from "@/components/dashboard/server/joinandleaves";
import Messages from "@/components/dashboard/server/messages";
import Link from "next/link";
import { useState, useEffect } from "react";
import AuditLogsTable from "@/components/dashboard/server/home_log";
import { motion, AnimatePresence } from "framer-motion";
import { HexColorPicker } from "react-colorful";
import { useRouter } from "next/navigation";

export default function Dashboard() {

    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState("#3357FF");
    const router = useRouter();

    const addCommas = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };


    function darken(hex, amount = 20) {
        let col = hex.replace('#', '')
        if (col.length === 3)
            col = col.split('').map(c => c + c).join('')
        const num = parseInt(col, 16)
        let r = (num >> 16) - amount
        let g = ((num >> 8) & 0x00ff) - amount
        let b = (num & 0x0000ff) - amount
        r = r < 0 ? 0 : r
        g = g < 0 ? 0 : g
        b = b < 0 ? 0 : b
        return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`
    }

    const formatted = addCommas("1250000")

    return (
       <>

            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <h2 className="text-white flex space-x-2 font-medium text-lg md:text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width={512} height={512} className="w-6.5 h-6.5" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M256 256c-13.47 0-26.94-2.39-37.44-7.17l-148-67.49C63.79 178.26 48 169.25 48 152.24s15.79-26 22.58-29.12l149.28-68.07c20.57-9.4 51.61-9.4 72.19 0l149.37 68.07c6.79 3.09 22.58 12.1 22.58 29.12s-15.79 26-22.58 29.11l-148 67.48C282.94 253.61 269.47 256 256 256m176.76-100.86"></path>
                        <path fill="currentColor" d="M441.36 226.81L426.27 220l-38.77 17.74l-94 43c-10.5 4.8-24 7.19-37.44 7.19s-26.93-2.39-37.42-7.19l-94.07-43L85.79 220l-15.22 6.84C63.79 229.93 48 239 48 256s15.79 26.08 22.56 29.17l148 67.63C229 357.6 242.49 360 256 360s26.94-2.4 37.44-7.19l147.87-67.61c6.81-3.09 22.69-12.11 22.69-29.2s-15.77-26.07-22.64-29.19"></path>
                        <path fill="currentColor" d="m441.36 330.8l-15.09-6.8l-38.77 17.73l-94 42.95c-10.5 4.78-24 7.18-37.44 7.18s-26.93-2.39-37.42-7.18l-94.07-43L85.79 324l-15.22 6.84C63.79 333.93 48 343 48 360s15.79 26.07 22.56 29.15l148 67.59C229 461.52 242.54 464 256 464s26.88-2.48 37.38-7.27l147.92-67.57c6.82-3.08 22.7-12.1 22.7-29.16s-15.77-26.07-22.64-29.2"></path>
                    </svg>
                    <span>Auto Roles</span>
                </h2>

            </div>
            <hr className="border-[#302e46]  mb-4" />



            <div className="bg-[#191822]/50   p-4 sm:p-5 rounded-xl border border-[#2e2b41]">
                <div className="flex justify-between">
                    <div className="flex text-center items-center space-x-2">
                        <div className="bg-[#22202e] rounded-lg p-3 flex text-center text-[#9a92c9] justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 5h-3m-4.25-2v4M13 5H3m4 7H3m7.75-2v4M21 12H11m10 7h-3m-4.25-2v4M13 19H3"></path>
                            </svg>
                        </div>
                        <span className="text-xl">Configuration</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                        />
                        <div className="w-16 h-8 bg-[#22202e] rounded-full peer-checked:bg-indigo-500 transition-colors"></div>
                        <div className="absolute left-1 w-6 h-6 bg-white rounded-full peer-checked:translate-x-8 transition-transform"></div>
                    </label>
                </div>
                <hr className="border-[#302e46] mt-4  mb-4" />
                <div className="space-y-2">
                    <div className="">
                        <span className="text-[#d2cbf1] manrope">Roles for Humans</span>
                        <motion.button
                            className="cursor-pointer bg-[#191822]/50 px-4 py-3 border border-[#222031] rounded-md justify-between flex w-full transition-colors"
                        >
                            <div className="flex space-x-2 items-center text-center select-none">
                                Choose
                            </div>
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="rotate-90"
                                width={20}
                                height={20}
                                viewBox="0 0 20 20"
                                transition={{ duration: 0.3 }}
                            >
                                <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    d="M16.53 10.511a.75.75 0 0 0 0-1.06l-3.25-3.25a.75.75 0 0 0-1.06 1.06l2.72 2.72l-2.72 2.72a.75.75 0 1 0 1.06 1.06zm-9.81-4.31l-3.25 3.25a.75.75 0 0 0 0 1.06l3.25 3.25a.75.75 0 1 0 1.06-1.06l-2.72-2.72l2.72-2.72a.75.75 0 0 0-1.06-1.06"
                                    clipRule="evenodd"
                                />
                            </motion.svg>
                        </motion.button>
                    </div>
                    <div className="">
                        <span className="text-[#d2cbf1] manrope">Roles for Bots</span>
                        <motion.button
                            className="cursor-pointer bg-[#191822]/50 px-4 py-3 border border-[#222031] rounded-md justify-between flex w-full transition-colors"
                        >
                            <div className="flex space-x-2 items-center text-center select-none">
                                Choose
                            </div>
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="rotate-90"
                                width={20}
                                height={20}
                                viewBox="0 0 20 20"
                                transition={{ duration: 0.3 }}
                            >
                                <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    d="M16.53 10.511a.75.75 0 0 0 0-1.06l-3.25-3.25a.75.75 0 0 0-1.06 1.06l2.72 2.72l-2.72 2.72a.75.75 0 1 0 1.06 1.06zm-9.81-4.31l-3.25 3.25a.75.75 0 0 0 0 1.06l3.25 3.25a.75.75 0 1 0 1.06-1.06l-2.72-2.72l2.72-2.72a.75.75 0 0 0-1.06-1.06"
                                    clipRule="evenodd"
                                />
                            </motion.svg>
                        </motion.button>
                    </div>
                </div>
            </div>
</>
    )
}