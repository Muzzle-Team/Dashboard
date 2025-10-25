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
import { Plus } from "lucide-react";

export default function Dashboard() {

    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState("#3357FF");
    const router = useRouter();
    const [selected, setSelected] = useState("toggle");
    const [rselected, setRSelected] = useState("toggle");
    const [dselected, setDSelected] = useState("single");
    const [active, setActive] = useState("button")

    const options = [
        { id: "button", label: "Button" },
        { id: "reaction", label: "Reaction" },
        { id: "dropdown", label: "Dropdown" },
    ];


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
                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10"></path>
                            <path d="M16.5 14.5s-1.5 2-4.5 2s-4.5-2-4.5-2"></path>
                            <path fill="currentColor" d="M15.5 9a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1m-7 0a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1"></path>
                        </g>
                    </svg>
                    <span>Reaction Roles</span>
                </h2>

            </div>
            <hr className="border-[#302e46]  mb-4" />

            <div className="mt-[2rem]">
                <button onClick={() => setIsOpen(!isOpen)} className="w-full py-7 text-[#a29dbb] text-xl cursor-pointer rounded-md border-2 border-dashed border-[#2e2b41]  hover:border-[#3a3750] hover:bg-[#191822]/60 flex space-x-3 text-center items-center justify-center transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                            <path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z"></path>
                            <path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1M11 14h6m-3-3v6"></path>
                        </g>
                    </svg>
                    <span>Create Reaction Role</span>
                </button>
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
                            onClick={() => {
                                setIsOpen(false)
                                setActive("button")
                            }}
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
                                    <span>Create New Reaction Role</span>
                                </h3>
                                <button
                                    onClick={() => {
                                        setIsOpen(false)
                                        setActive("button")
                                    }}
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
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    <div className="">
                                        <span className="text-[#a29dbb] manrope">Select Embed</span>
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
                                        <span className="text-[#a29dbb] manrope">Select Message</span>
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

                                <div className="flex justify-center mt-5">
                                    <div className="relative  w-fit">
                                        <div className="relative flex bg-[#1f1e2b] p-1 rounded-lg overflow-hidden">
                                            <motion.div
                                                layout
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                className="absolute top-1 bottom-1 rounded-md bg-indigo-500"
                                                style={{
                                                    left:
                                                        active === "button"
                                                            ? "0.25rem"
                                                            : active === "reaction"
                                                                ? "calc(33.333% + 0.25rem)"
                                                                : "calc(66.666% + 0.25rem)",
                                                    width: "calc(33.333% - 0.5rem)",
                                                }}
                                            />
                                            {options.map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => setActive(opt.id)}
                                                    className={`relative z-10 w-[100px] py-2 rounded-md text-sm font-medium transition-all duration-200 ${active === opt.id ? "text-white" : "text-gray-300"
                                                        }`}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-[#302e46] mt-4  mb-4" />
                                <div className="mt-2">
                                    {active === "button" ? (
                                        <>
                                            <span className="text-[#a29dbb] manrope text-xl">Role Mode</span>
                                            <div className="space-y-2">
                                                <label className="flex items-center bg-[#1e1c29b6] px-4 py-4 rounded-xl gap-3 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="radioGroup"
                                                        value="toggle"
                                                        checked={selected === "toggle"}
                                                        onChange={() => setSelected("toggle")}
                                                        className="sr-only peer"
                                                    />

                                                    <span className="relative flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 border-indigo-600 transition-all">
                                                        <span
                                                            className={`absolute rounded-full bg-indigo-600 transition-all duration-200 ease-out ${selected === "toggle"
                                                                ? "scale-100 w-3 h-3"
                                                                : "scale-0"
                                                                }`}
                                                        />
                                                    </span>

                                                    <div className=" grid items-center  ">
                                                        <span className="text-lg  font-medium">Toggle Mode</span>
                                                        <span className="text-[#a29dbb] manrope">Users can get or remove the role</span>
                                                    </div>
                                                </label>


                                                <label className="flex items-center bg-[#1e1c29b6] px-4 py-4 rounded-xl gap-3 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="radioGroup"
                                                        value="give"
                                                        checked={selected === "give"}
                                                        onChange={() => setSelected("give")}
                                                        className="sr-only peer"
                                                    />

                                                    <span className="relative flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 border-indigo-600 transition-all">
                                                        <span
                                                            className={`absolute rounded-full bg-indigo-600 transition-all duration-200 ease-out ${selected === "give"
                                                                ? "scale-100 w-3 h-3"
                                                                : "scale-0"
                                                                }`}
                                                        />
                                                    </span>

                                                    <div className=" grid items-center  ">
                                                        <span className="text-lg  font-medium">Give Mode</span>
                                                        <span className="text-[#a29dbb] manrope">Users can get role only</span>
                                                    </div>
                                                </label>


                                                <label className="flex items-center bg-[#1e1c29b6] px-4 py-4 rounded-xl gap-3 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="radioGroup"
                                                        value="remove"
                                                        checked={selected === "remove"}
                                                        onChange={() => setSelected("remove")}
                                                        className="sr-only peer"
                                                    />

                                                    <span className="relative flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 border-indigo-600 transition-all">
                                                        <span
                                                            className={`absolute rounded-full bg-indigo-600 transition-all duration-200 ease-out ${selected === "remove"
                                                                ? "scale-100 w-3 h-3"
                                                                : "scale-0"
                                                                }`}
                                                        />
                                                    </span>

                                                    <div className=" grid items-center  ">
                                                        <span className="text-lg  font-medium">Remove Mode</span>
                                                        <span className="text-[#a29dbb] manrope">Users can remove the role only</span>
                                                    </div>
                                                </label>
                                            </div>
                                            <hr className="border-[#302e46] mt-4  mb-4" />
                                            <div className="flex items-center justify-between w-full">
                                                <span className="text-[#a29dbb] manrope text-xl">Buttons</span>
                                                <button className="flex items-center gap-2 px-5 py-2 border border-indigo-500 bg-indigo-600/30 hover:bg-indigo-600/50 text-white rounded-lg font-medium transition-all duration-200">
                                                    <Plus className="w-4 h-4" />
                                                    Add button
                                                </button>
                                            </div>

                                            <div className="bg-[#1e1c2965] mt-4 px-6 rounded-xl w-full py-4 space-y-2">
                                                <div className="">
                                                    <span className="text-[#a29dbb] manrope">Select Role</span>
                                                    <motion.button
                                                        className="cursor-pointer bg-[#14131b65] px-4 py-3 border border-[#222031] rounded-md justify-between flex w-full transition-colors"
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
                                                <div className="flex space-x-2 items-center">
                                                    <div className="bg-[#232131fd] translate-y-3 px-3 h-11 w-40 rounded-xl flex items-center gap-3">
                                                        <div className="w-4 h-4 rounded-full bg-[#5865f2]" />
                                                        <div className="w-4 h-4 rounded-full bg-[#4f545c]" />
                                                        <div className="w-4 h-4 rounded-full bg-[#3ba55c]" />
                                                        <div className="w-4 h-4 rounded-full bg-[#ed4245]" />
                                                    </div>

                                                    <div className="w-full">
                                                        <span className="text-[#a29dbb] manrope">Name</span>
                                                        <motion.button
                                                            className="cursor-pointer bg-[#14131b65] px-4 py-3 border border-[#222031] rounded-md justify-between flex w-full transition-colors"
                                                        >
                                                            <div className="flex space-x-2 items-center text-center select-none">
                                                                New Button
                                                            </div>

                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </div>

                                        </>
                                    ) : active === "reaction" ? (
                                        <>
                                            <span className="text-[#a29dbb] manrope text-xl">Role Mode</span>
                                            <div className="space-y-2">
                                                <label className="flex items-center bg-[#1e1c29b6] px-4 py-4 rounded-xl gap-3 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="radioGroup"
                                                        value="toggle"
                                                        checked={rselected === "toggle"}
                                                        onChange={() => setRSelected("toggle")}
                                                        className="sr-only peer"
                                                    />

                                                    <span className="relative flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 border-indigo-600 transition-all">
                                                        <span
                                                            className={`absolute rounded-full bg-indigo-600 transition-all duration-200 ease-out ${rselected === "toggle"
                                                                ? "scale-100 w-3 h-3"
                                                                : "scale-0"
                                                                }`}
                                                        />
                                                    </span>

                                                    <div className=" grid items-center  ">
                                                        <span className="text-lg  font-medium">Toggle Mode</span>
                                                        <span className="text-[#a29dbb] manrope">Users can get or remove the role</span>
                                                    </div>
                                                </label>


                                                <label className="flex items-center bg-[#1e1c29b6] px-4 py-4 rounded-xl gap-3 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="radioGroup"
                                                        value="give"
                                                        checked={rselected === "give"}
                                                        onChange={() => setRSelected("give")}
                                                        className="sr-only peer"
                                                    />

                                                    <span className="relative flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 border-indigo-600 transition-all">
                                                        <span
                                                            className={`absolute rounded-full bg-indigo-600 transition-all duration-200 ease-out ${rselected === "give"
                                                                ? "scale-100 w-3 h-3"
                                                                : "scale-0"
                                                                }`}
                                                        />
                                                    </span>

                                                    <div className=" grid items-center  ">
                                                        <span className="text-lg  font-medium">Give Mode</span>
                                                        <span className="text-[#a29dbb] manrope">Users can get role only</span>
                                                    </div>
                                                </label>


                                                <label className="flex items-center bg-[#1e1c29b6] px-4 py-4 rounded-xl gap-3 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="radioGroup"
                                                        value="remove"
                                                        checked={rselected === "remove"}
                                                        onChange={() => setRSelected("remove")}
                                                        className="sr-only peer"
                                                    />

                                                    <span className="relative flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 border-indigo-600 transition-all">
                                                        <span
                                                            className={`absolute rounded-full bg-indigo-600 transition-all duration-200 ease-out ${rselected === "remove"
                                                                ? "scale-100 w-3 h-3"
                                                                : "scale-0"
                                                                }`}
                                                        />
                                                    </span>

                                                    <div className=" grid items-center  ">
                                                        <span className="text-lg  font-medium">Remove Mode</span>
                                                        <span className="text-[#a29dbb] manrope">Users can remove the role only</span>
                                                    </div>
                                                </label>
                                            </div>
                                            <hr className="border-[#302e46] mt-4  mb-4" />
                                            <div className="flex items-center justify-between w-full">
                                                <span className="text-[#a29dbb] manrope text-xl">Reactions</span>
                                                <button className="flex items-center gap-2 px-5 py-2 border border-indigo-500 bg-indigo-600/30 hover:bg-indigo-600/50 text-white rounded-lg font-medium transition-all duration-200">
                                                    <Plus className="w-4 h-4" />
                                                    Add Reaction
                                                </button>
                                            </div>

                                            <div className="bg-[#1e1c2965] mt-4 px-6 rounded-xl w-full py-4 space-y-2">
                                                <div className="">
                                                    <span className="text-[#a29dbb] manrope">Select Role</span>
                                                    <motion.button
                                                        className="cursor-pointer bg-[#14131b65] px-4 py-3 border border-[#222031] rounded-md justify-between flex w-full transition-colors"
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
                                                <div className="flex space-x-2 items-center mb-2">
                                                    <div className="bg-[#232131fd] text-[#9188c9fd] translate-y-3 px-3 h-11  rounded-xl flex items-center gap-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                                                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10"></path>
                                                                <path d="M16.5 14.5s-1.5 2-4.5 2s-4.5-2-4.5-2"></path>
                                                                <path fill="currentColor" d="M15.5 9a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1m-7 0a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1"></path>
                                                            </g>
                                                        </svg>
                                                    </div>


                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-[#a29dbb] manrope text-xl">Role Mode</span>
                                            <div className="space-y-2">
                                                <label className="flex items-center bg-[#1e1c29b6] px-4 py-4 rounded-xl gap-3 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="radioGroup"
                                                        value="single"
                                                        checked={dselected === "single"}
                                                        onChange={() => setDSelected("single")}
                                                        className="sr-only peer"
                                                    />

                                                    <span className="relative flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 border-indigo-600 transition-all">
                                                        <span
                                                            className={`absolute rounded-full bg-indigo-600 transition-all duration-200 ease-out ${dselected === "single"
                                                                ? "scale-100 w-3 h-3"
                                                                : "scale-0"
                                                                }`}
                                                        />
                                                    </span>

                                                    <div className=" grid items-center  ">
                                                        <span className="text-lg  font-medium">Single Select Mode</span>
                                                        <span className="text-[#a29dbb] manrope">Users can select only one role from the list.</span>
                                                    </div>
                                                </label>


                                                <label className="flex items-center bg-[#1e1c29b6] px-4 py-4 rounded-xl gap-3 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="radioGroup"
                                                        value="multi"
                                                        checked={dselected === "multi"}
                                                        onChange={() => setDSelected("multi")}
                                                        className="sr-only peer"
                                                    />

                                                    <span className="relative flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 border-indigo-600 transition-all">
                                                        <span
                                                            className={`absolute rounded-full bg-indigo-600 transition-all duration-200 ease-out ${dselected === "multi"
                                                                ? "scale-100 w-3 h-3"
                                                                : "scale-0"
                                                                }`}
                                                        />
                                                    </span>

                                                    <div className=" grid items-center  ">
                                                        <span className="text-lg  font-medium">Multi Select Mode</span>
                                                        <span className="text-[#a29dbb] manrope">Users can select multiple roles from the list.</span>
                                                    </div>
                                                </label>



                                            </div>
                                            <hr className="border-[#302e46] mt-4  mb-4" />
                                            <div className="flex items-center justify-between w-full">
                                                <span className="text-[#c1bcdb] manrope text-xl">Dropdown</span>
                                                <button className="flex items-center gap-2 px-5 py-2 border border-indigo-500 bg-indigo-600/30 hover:bg-indigo-600/50 text-white rounded-lg font-medium transition-all duration-200">
                                                    <Plus className="w-4 h-4" />
                                                    Add Option
                                                </button>
                                            </div>
                                             <div className="w-full">
                                                        <span className="text-[#a29dbb] manrope">Set Dropdown Placeholder</span>
                                                        <motion.button
                                                            className="cursor-pointer bg-[#14131b65] px-4 py-3 border border-[#222031] rounded-md justify-between flex w-full transition-colors"
                                                        >
                                                            <div className="flex space-x-2 items-center text-center select-none">
                                                                Placeholder
                                                            </div>

                                                        </motion.button>
                                                    </div>

                                            <div className="bg-[#1e1c2965] mt-4 px-6 rounded-xl w-full py-4 space-y-2">
                                                <div className="">
                                                    <span className="text-[#a29dbb] manrope">Select Role</span>
                                                    <motion.button
                                                        className="cursor-pointer bg-[#14131b65] px-4 py-3 border border-[#222031] rounded-md justify-between flex w-full transition-colors"
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
                                                <div className="flex space-x-2 items-center mb-2">
                                                    <div className="bg-[#232131fd] text-[#9188c9fd] translate-y-3 px-3 h-11  rounded-xl flex items-center gap-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                                                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10"></path>
                                                                <path d="M16.5 14.5s-1.5 2-4.5 2s-4.5-2-4.5-2"></path>
                                                                <path fill="currentColor" d="M15.5 9a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1m-7 0a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1"></path>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <div className="w-full">
                                                        <span className="text-[#a29dbb] manrope">Name</span>
                                                        <motion.button
                                                            className="cursor-pointer bg-[#14131b65] px-4 py-3 border border-[#222031] rounded-md justify-between flex w-full transition-colors"
                                                        >
                                                            <div className="flex space-x-2 items-center text-center select-none">
                                                                New Button
                                                            </div>

                                                        </motion.button>
                                                    </div>

                                                </div>
                                            </div>
                                        </>
                                    )}
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