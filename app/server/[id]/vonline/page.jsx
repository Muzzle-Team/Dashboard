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
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 11v3m2.5-11C7.27 3 5.155 3 3.753 4.198q-.3.256-.555.555C2 6.155 2 8.27 2 12.5s0 6.345 1.198 7.747q.256.3.555.555C5.155 22 7.27 22 11.5 22s6.345 0 7.747-1.198q.3-.256.555-.555C21 18.845 21 16.73 21 12.5M12 8v9m3-7v5m-9-3v1m9.388-7.913a3.11 3.11 0 0 0 2.7-2.699c.026-.213.197-.388.412-.388s.386.175.413.388a3.11 3.11 0 0 0 2.699 2.7c.213.026.388.197.388.412s-.175.386-.388.413a3.11 3.11 0 0 0-2.7 2.699c-.026.213-.197.388-.412.388s-.386-.175-.413-.388a3.11 3.11 0 0 0-2.699-2.7C15.175 5.887 15 5.716 15 5.5s.175-.386.388-.413"></path>
                    </svg>
                    <span>Voice Online</span>
                </h2>

            </div>
            <hr className="border-[#302e46]  mb-4" />





        </>
    )
}