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
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9h8m-8 4h6m-1 5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6m-5 9l5-5m0 4.5V17h-4.5"></path>
                    </svg>
                    <span>Auto Responder</span>
                </h2>

            </div>
            <hr className="border-[#302e46]  mb-4" />



            <div className="bg-[#191822]/50   p-4 sm:p-5 rounded-xl border border-[#2e2b41]">
                <div className="flex flex-row-reverse items-center w-full bg-[#191822]/60 px-4 py-4 border-2 border-[#222031] rounded-md hover:border-[#2e2b41] transition-colors focus-within:border-[#2e2b41]">
                    <input
                        placeholder="Search for a reply by trigger name"
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
                    <button onClick={() => setIsOpen(!isOpen)} className="w-full py-5 text-[#a29dbb] text-xl cursor-pointer rounded-md border-2 border-dashed border-[#2e2b41]  hover:border-[#3a3750] hover:bg-[#191822]/60 flex space-x-3 text-center items-center justify-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                <path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z"></path>
                                <path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1M11 14h6m-3-3v6"></path>
                            </g>
                        </svg>
                        <span>Create new reply</span>
                    </button>
                </div>

                <div className="mt-[2rem] flex justify-center text-lg text-center space-x-2 text-[#5f5c6b]">
                    <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 24 24">
                        <g fill="none">
                            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                            <path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m-.01 6c.558 0 1.01.452 1.01 1.01v5.124A1 1 0 0 1 12.5 18h-.49A1.01 1.01 0 0 1 11 16.99V12a1 1 0 1 1 0-2zM12 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2"></path>
                        </g>
                    </svg>
                    <span>No replies available</span>
                </div>

            </div>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop with blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Modal */}
                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="fixed  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[90%] w-[95%] max-w-2xl border-[#2e2b41] border bg-[#0e0d13] rounded-xl shadow-2xl z-70 max-h-[70vh] flex flex-col overflow-hidden"
                        >
                            {/* Header - Fixed */}
                            <div className="flex items-center justify-between p-6">
                                <h3 className="text-xl manrope font-semibold text-white flex items-center space-x-2">
                                    <span>Create New Auto Responder</span>
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-[#928ea8] cursor-pointer hover:text-white transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 6L6 18M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            {/* Body - Scrollable */}
                            <div className="px-6 space-y-5 mb-3 custom-scrollbar overflow-y-auto flex-1">
                                {/* Trigger Name */}
                                <div className="md:flex space-y-2 gap-2">
                                    <div className="flex-1">
                                        <span className="text-[#a29dbb] manrope">Trigger</span>
                                        <div className="items-center w-full bg-[#191822]/50 px-4 py-3 border border-[#222031] rounded-md transition-colors">
                                            <input
                                                placeholder="Trigger Name"
                                                className="w-full bg-transparent items-center placeholder:text-[#5e5c6d] outline-none text-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="md:w-40 w-full">
                                        <span className="text-[#a29dbb] manrope">Trigger Type</span>
                                        <motion.button
                                            className="cursor-pointer bg-[#191822]/50 px-4 py-3 border border-[#222031] rounded-md justify-between flex w-full transition-colors"
                                        >
                                            <div className="flex space-x-2 items-center text-center select-none">
                                                Equals
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

                                <div>
                                    <span className="text-[#a29dbb] manrope">Random Response</span>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-[#191822]/80 w-12 h-12 flex items-center justify-center rounded-full select-none manrope text-white border border-[#333049]">1</div>
                                            <div className="flex-1 bg-[#191822]/50 px-4 py-3 border border-[#222031] rounded-md transition-colors">
                                                <input
                                                    className="w-full bg-transparent placeholder:text-[#5e5c6d] outline-none text-white"
                                                />
                                            </div>
                                            <button
                                                className="text-red-400 cursor-pointer border border-red-400 bg-red-400/10 hover:bg-red-400/30 p-3 rounded-md transition-colors duration-250 flex items-center justify-center w-12 h-12"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="texr-center justify-center items-center flex">
                                        <button className="bg-[#191822]/80 w-full mt-3 px-4 py-3 border border-[#333049] manrope rounded-md transition-colors">
                                            Create new response
                                        </button>
                                    </div>
                                </div>

                                <div className="">
                                    <span className="text-[#a29dbb] manrope">Send type</span>
                                    <motion.button
                                        className="cursor-pointer bg-[#191822]/50 px-4 py-3 border border-[#222031] rounded-md justify-between flex w-full transition-colors"
                                    >
                                        <div className="flex space-x-2 items-center text-center select-none">
                                            Reply with ping
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

                                <div className="space-y-2">
                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                        <div className="">
                                            <span className="text-[#a29dbb] manrope">Enabled Channels</span>
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
                                            <span className="text-[#a29dbb] manrope">Disabled Channels</span>
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
                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                        <div className="">
                                            <span className="text-[#a29dbb] manrope">Enabled Roles</span>
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
                                            <span className="text-[#a29dbb] manrope">Disabled Roles</span>
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
                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                        <div className="flex flex-col">
                                            <span className="text-[#a29dbb] manrope mb-2">Auto Delete Bot's Reply After 5 Seconds</span>
                                            <label className="relative inline-flex items-center cursor-pointer w-fit">
                                                <input type="checkbox" className="sr-only peer" />
                                                <div className="w-16 h-8 bg-[#22202e] rounded-full peer-checked:bg-indigo-500 transition-colors"></div>
                                                <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full peer-checked:translate-x-8 transition-transform"></div>
                                            </label>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-[#a29dbb] manrope mb-2">Auto Delete Author's Message</span>
                                            <label className="relative inline-flex items-center cursor-pointer w-fit">
                                                <input type="checkbox" className="sr-only peer" />
                                                <div className="w-16 h-8 bg-[#22202e] rounded-full peer-checked:bg-indigo-500 transition-colors"></div>
                                                <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full peer-checked:translate-x-8 transition-transform"></div>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className="flex flex-col">
                                            <span className="text-[#a29dbb] manrope mb-2">Auto Delete Bot's Reply on Author's Message Deletion</span>
                                            <label className="relative inline-flex items-center cursor-pointer w-fit">
                                                <input type="checkbox" className="sr-only peer" />
                                                <div className="w-16 h-8 bg-[#22202e] rounded-full peer-checked:bg-indigo-500 transition-colors"></div>
                                                <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full peer-checked:translate-x-8 transition-transform"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer - Fixed */}
                            <div className="flex justify-end space-x-3 p-6 bg-[#0e0d1394]">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="px-6 py-2.5 border border-[#39394d] bg-[#39394d]/30 cursor-pointer hover:bg-[#39394d]/50 text-white rounded-xl transition-all duration-250 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-6 py-2.5 border border-indigo-600 bg-indigo-600/30 cursor-pointer hover:bg-indigo-600/50 text-white rounded-xl transition-all duration-250 font-medium"
                                >
                                    Create
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>


        </>

    )
}