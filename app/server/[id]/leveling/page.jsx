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
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";

export default function Dashboard() {

    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState("#3357FF");
    const [messageEnabled, setMessageEnabled] = useState(false);
    const [roleEnabled, setRoleEnabled] = useState(false);
    const [tlevel, setTlevel] = useState(0);
    const [vlevel, setVlevel] = useState(0);
    const [message, setMessage] = useState(`**🥳 Congratulations, [user]!** You've leveled up from \`[oldLevel]\` to \`[newLevel]\` and earned the **[rewardRole]** role! 🚀`)
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
                        <path fill="currentColor" d="M22 8.162v.073c0 .86 0 1.291-.207 1.643s-.584.561-1.336.98l-.793.44c.546-1.848.729-3.834.796-5.532l.01-.221l.002-.052c.651.226 1.017.395 1.245.711c.283.393.283.915.283 1.958m-20 0v.073c0 .86 0 1.291.207 1.643s.584.561 1.336.98l.794.44c-.547-1.848-.73-3.834-.797-5.532l-.01-.221l-.001-.052c-.652.226-1.018.395-1.246.711C2 6.597 2 7.12 2 8.162"></path>
                        <path fill="currentColor" fillRule="evenodd" d="M16.377 2.347A26.4 26.4 0 0 0 12 2c-1.783 0-3.253.157-4.377.347c-1.139.192-1.708.288-2.184.874c-.475.586-.45 1.219-.4 2.485c.173 4.348 1.111 9.78 6.211 10.26V19.5H9.82a1 1 0 0 0-.98.804l-.19.946H6a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5h-2.65l-.19-.946a1 1 0 0 0-.98-.804h-1.43v-3.534c5.1-.48 6.039-5.911 6.211-10.26c.05-1.266.076-1.9-.4-2.485c-.476-.586-1.045-.682-2.184-.874" clipRule="evenodd"></path>
                    </svg>
                    <span>Leveling System</span>
                </h2>

            </div>
            <hr className="border-[#302e46]  mb-4" />



            <div className="bg-[#191822]/50   p-4 sm:p-5 rounded-xl border border-[#2e2b41]">
                <div className="text-2xl">Leveling Settings</div>
                <hr className="border-[#302e46] mt-4  mb-4" />
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div className="">
                        <span className="text-[#d2cbf1] manrope">Enabled Channel</span>
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
                        <span className="text-[#d2cbf1] manrope">Disabled Channel</span>
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


            <div className="bg-[#191822]/50 mt-4 p-4 sm:p-5 rounded-xl border border-[#2e2b41]">
                <div className="flex justify-between items-center">
                    <div className="flex text-center items-center space-x-2">
                        <div className="bg-[#22202e] rounded-lg text-[#9a92c9] p-3 flex text-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} className="w-6.5 h-6.5" viewBox="0 0 48 48">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="m12 24l12-12l12 12M12 36l12-12l12 12"></path>
                            </svg>
                        </div>
                        <span className="text-xl">Level-UP Message</span>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={messageEnabled}
                            onChange={() => setMessageEnabled(!messageEnabled)}
                            className="sr-only peer"
                        />
                        <div className="w-16 h-8 bg-[#22202e] rounded-full peer-checked:bg-indigo-500 transition-colors"></div>
                        <div className="absolute left-1 w-6 h-6 bg-white rounded-full peer-checked:translate-x-8 transition-transform"></div>
                    </label>
                </div>

                <AnimatePresence>
                    {messageEnabled && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.25, delay: 0.1 }}
                                className="mt-4 text-[#a29dbb]"
                            >

                                <p className="text-sm leading-relaxed">
                                    This message will be sent automatically when the user achiev the points of new level.
                                </p>
                                <div className="mt-3">
                                    <span className="text-[#d2cbf1] manrope">Message Channel</span>
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

                                <div className="mt-3 flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Write your Log message..."
                                        className="w-full sm:w-1/2 bg-[#191822]/60 custom-scrollbar px-4 py-3 border-2 border-[#222031] rounded-lg hover:border-[#2e2b41] transition-colors focus:outline-none text-white resize-none"
                                        rows={5}
                                    />

                                    <div className="w-full sm:w-1/2 flex flex-col space-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <div className="bg-[#22202e] py-0.5 px-2 rounded-md">
                                                <span className="text-indigo-600 text-lg">[user]</span>
                                            </div>
                                            <span className="text-white tfont">Mention the new user</span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <div className="bg-[#22202e] py-0.5 px-2 rounded-md">
                                                <span className="text-indigo-600 text-lg">[userName]</span>
                                            </div>
                                            <span className="text-white tfont">User's username</span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <div className="bg-[#22202e] py-0.5 px-2 rounded-md">
                                                <span className="text-indigo-600 text-lg">[level]</span>
                                            </div>
                                            <span className="text-white tfont">User's current level</span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <div className="bg-[#22202e] py-0.5 px-2 rounded-md">
                                                <span className="text-indigo-600 text-lg">[oldLevel]</span>
                                            </div>
                                            <span className="text-white tfont">User's old level</span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <div className="bg-[#22202e] py-0.5 px-2 rounded-md">
                                                <span className="text-indigo-600 text-lg">[nextLevel]</span>
                                            </div>
                                            <span className="text-white tfont">User's next level</span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <div className="bg-[#22202e] py-0.5 px-2 rounded-md">
                                                <span className="text-indigo-600 text-lg">[rewardRole]</span>
                                            </div>
                                            <span className="text-white tfont">User's next role name</span>
                                        </div>


                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>


            <div className="bg-[#191822]/50 mt-4 p-4 sm:p-5 rounded-xl border border-[#2e2b41]">
                <div className="flex justify-between items-center">
                    <div className="flex text-center items-center space-x-2">
                        <div className="bg-[#22202e] rounded-lg text-[#9a92c9] p-3 flex text-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} className="w-6.5 h-6.5" viewBox="0 0 48 48">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="m12 24l12-12l12 12M12 36l12-12l12 12"></path>
                            </svg>
                        </div>
                        <span className="text-xl">Level-UP Role</span>
                    </div>

                    <button onClick={() => setRoleEnabled(!roleEnabled)} className="px-7 cursor-pointer py-3 items-center bg-indigo-600 rounded-md flex space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                <path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z"></path>
                                <path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1M11 14h6m-3-3v6"></path>
                            </g>
                        </svg>

                        <span>Add new Role</span>
                    </button>
                </div>

                <AnimatePresence>
                    {roleEnabled && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.25, delay: 0.1 }}
                                className="mt-4 text-[#a29dbb]"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                    <div className="bg-[#1918226e] mt-4 p-4 sm:p-5 rounded-xl border border-[#2e2b41]">
                                        <span className="text-white">Reward No.1</span>
                                        <div>
                                            <label className="block text-md mt-3 manrope text-[#a29dbb] mb-2">
                                                Text Level
                                            </label>
                                            <div className="flex items-center bg-[#191822]/60 rounded-lg border border-[#222031] py-3 focus-within:border-[#2e2b41]">
                                                <button
                                                    onClick={() => setTlevel(prev => prev + 1)}
                                                    className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                >
                                                    <Plus />
                                                </button>

                                                <input
                                                    type="number"
                                                    onChange={(e) => {
                                                        const value = Number(e.target.value);
                                                        setTlevel(value < 0 ? 0 : value);
                                                    }}
                                                    value={tlevel}
                                                    min={0}
                                                    className="w-full manrope bg-transparent text-white text-center focus:outline-none"
                                                />

                                                <button
                                                    onClick={() => setTlevel(prev => Math.max(0, prev - 1))}
                                                    className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                >
                                                    <Minus />
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-md mt-3 manrope text-[#a29dbb] mb-2">
                                                Voice Level
                                            </label>
                                            <div className="flex items-center bg-[#191822]/60 rounded-lg border border-[#222031] py-3 focus-within:border-[#2e2b41]">
                                                <button
                                                    onClick={() => setVlevel(prev => prev + 1)}
                                                    className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                >
                                                    <Plus />
                                                </button>

                                                <input
                                                    type="number"
                                                    onChange={(e) => {
                                                        const value = Number(e.target.value);
                                                        setVlevel(value < 0 ? 0 : value);
                                                    }}
                                                    value={vlevel}
                                                    min={0}
                                                    className="w-full manrope bg-transparent text-white text-center focus:outline-none"
                                                />

                                                <button
                                                    onClick={() => setVlevel(prev => Math.max(0, prev - 1))}
                                                    className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                >
                                                    <Minus />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <label className="block text-md mt-3 manrope text-[#a29dbb] mb-2">
                                                Role
                                            </label>
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

                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>


      </>

    )
}