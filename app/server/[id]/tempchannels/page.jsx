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
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                        <g fill="none">
                            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                            <path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m0 2a1 1 0 0 1 .993.883L13 7v4.586l2.707 2.707a1 1 0 0 1-1.32 1.497l-.094-.083l-3-3a1 1 0 0 1-.284-.576L11 12V7a1 1 0 0 1 1-1"></path>
                        </g>
                    </svg>
                    <span>Temporary Channels</span>
                </h2>

            </div>
            <hr className="border-[#302e46]  mb-4" />





        </>
    )
}