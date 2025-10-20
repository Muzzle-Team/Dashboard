'use client'
import Navbar from "@/components/dashboard/navbar"
import Sidebar from "@/components/dashboard/sidebar"
import { useSidebar } from "@/context/userSidebar";
import { LogOut, LayoutDashboard } from "lucide-react"
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

    const formatted = addCommas("1250000")

    return (
        <Page>

            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <h2 className="text-white flex space-x-2 font-medium text-lg md:text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9h8m-8 4h6m4-9a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z"></path>
                    </svg>
                    <span>Embed Messages</span>
                </h2>

            </div>
            <hr className="border-[#302e46]  mb-4" />


            <div className="bg-[#191822]/50   p-4 sm:p-5 rounded-md border border-[#2e2b41]">
                <div className="flex flex-row-reverse items-center w-full bg-[#191822]/60 px-4 py-4 border-2 border-[#222031] rounded-md hover:border-[#2e2b41] transition-colors focus-within:border-[#2e2b41]">
                    <input
                        placeholder="Search for an embed message by name"
                        className="w-full bg-transparent items-center mt-1 placeholder:text-[#928ea8] outline-none text-white"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={30}
                        height={30}
                        viewBox="0 0 24 24"
                        className=" mr-2 text-[#928ea8]"
                    >
                        <g fill="none">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit={10}
                                strokeWidth={1.5}
                                d="m21 21l-4-4m2-6a8 8 0 1 1-16 0a8 8 0 0 1 16 0m-8.194-2.224l-.377 1.508a.2.2 0 0 1-.145.145l-1.508.377c-.202.05-.202.338 0 .388l1.508.377a.2.2 0 0 1 .145.145l.377 1.508c.05.202.338.202.388 0l.377-1.508a.2.2 0 0 1 .145-.145l1.508-.377c.202-.05.202-.338 0-.388l-1.508-.377a.2.2 0 0 1-.145-.145l-.377-1.508c-.05-.202-.338-.202-.388 0"
                            />
                            <path
                                fill="currentColor"
                                fillOpacity={0.16}
                                d="M11 19a8 8 0 1 0 0-16a8 8 0 0 0 0 16"
                            />
                        </g>
                    </svg>
                </div>
                <div className="flex justify-center mt-[2rem] mb-4">
                    <hr className="border-[#302e46] w-[13rem]" />
                </div>

                <div className="mt-[2rem]">
                    <button onClick={() => router.push("embed/create")} className="w-full py-5 text-[#a29dbb] text-xl cursor-pointer rounded-md border-2 border-dashed border-[#2e2b41]  hover:border-[#3a3750] hover:bg-[#191822]/60 flex space-x-3 text-center items-center justify-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                <path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z"></path>
                                <path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1M11 14h6m-3-3v6"></path>
                            </g>
                        </svg>
                        <span>Create new message</span>
                    </button>
                </div>

                <div className="mt-[2rem] flex justify-center text-lg text-center space-x-2 text-[#5f5c6b]">
                    <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 24 24">
                        <g fill="none">
                            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                            <path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m-.01 6c.558 0 1.01.452 1.01 1.01v5.124A1 1 0 0 1 12.5 18h-.49A1.01 1.01 0 0 1 11 16.99V12a1 1 0 1 1 0-2zM12 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2"></path>
                        </g>
                    </svg>
                    <span>No messages available</span>
                </div>

            </div>




        </Page>

    )
}