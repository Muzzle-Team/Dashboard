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
    const [selectedLang, setSelectedLang] = useState('english');
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState("#3357FF");
    const router = useRouter();

    const languages = [
        {
            id: 'english',
            name: 'English',
            flag: (
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 512 512">
                    <mask id="SVGuywqVbel">
                        <circle cx={256} cy={256} r={256} fill="#fff"></circle>
                    </mask>
                    <g mask="url(#SVGuywqVbel)">
                        <path fill="#eee" d="M256 0h256v64l-32 32l32 32v64l-32 32l32 32v64l-32 32l32 32v64l-256 32L0 448v-64l32-32l-32-32v-64z"></path>
                        <path fill="#d80027" d="M224 64h288v64H224Zm0 128h288v64H256ZM0 320h512v64H0Zm0 128h512v64H0Z"></path>
                        <path fill="#0052b4" d="M0 0h256v256H0Z"></path>
                        <path fill="#eee" d="m187 243l57-41h-70l57 41l-22-67zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67zm162-81l57-41h-70l57 41l-22-67zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67Zm162-82l57-41h-70l57 41l-22-67Zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67Z"></path>
                    </g>
                </svg>
            )
        },
        {
            id: 'arabic',
            name: 'العربية',
            flag: (
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 512 512">
                    <mask id="SVGuywqVbel2">
                        <circle cx={256} cy={256} r={256} fill="#fff"></circle>
                    </mask>
                    <g mask="url(#SVGuywqVbel2)">
                        <path fill="#496e2d" d="M0 0h512v512H0z"></path>
                        <g fill="#eee">
                            <path d="M144.7 306c0 18.5 15 33.5 33.4 33.5h100.2a27.8 27.8 0 0 0 27.8 27.8h33.4a27.8 27.8 0 0 0 27.8-27.8V306zm225.4-161.3v78c0 12.2-10 22.2-22.3 22.2v33.4c30.7 0 55.7-25 55.7-55.7v-77.9H370zm-239.3 78c0 12.2-10 22.2-22.3 22.2v33.4c30.7 0 55.7-25 55.7-55.7v-77.9h-33.4z"></path>
                            <path d="M320 144.7h33.4v78H320zm-50 44.5a5.6 5.6 0 0 1-11.2 0v-44.5h-33.4v44.5a5.6 5.6 0 0 1-11.1 0v-44.5h-33.4v44.5a39 39 0 0 0 39 39a38.7 38.7 0 0 0 22.2-7a38.7 38.7 0 0 0 22.2 7c1.7 0 3.4-.1 5-.3a22.3 22.3 0 0 1-21.6 17v33.4c30.6 0 55.6-25 55.6-55.7v-77.9H270z"></path>
                            <path d="M180.9 244.9h50v33.4h-50z"></path>
                        </g>
                    </g>
                </svg>
            )
        }
    ];

    const selectedLanguage = languages.find(lang => lang.id === selectedLang);

    const handleSelect = (langId) => {
        setSelectedLang(langId);
        setIsOpen(false);
    };

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
        <Page>

            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <h2 className="text-white flex space-x-2 font-medium text-lg md:text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" strokeWidth={2}>
                            <path d="M16.308 4.384c-.59 0-.886 0-1.155-.1l-.111-.046c-.261-.12-.47-.328-.888-.746c-.962-.962-1.443-1.443-2.034-1.488a2 2 0 0 0-.24 0c-.591.045-1.072.526-2.034 1.488c-.418.418-.627.627-.888.746l-.11.046c-.27.1-.565.1-1.156.1h-.11c-1.507 0-2.261 0-2.73.468s-.468 1.223-.468 2.73v.11c0 .59 0 .886-.1 1.155q-.022.057-.046.111c-.12.261-.328.47-.746.888c-.962.962-1.443 1.443-1.488 2.034a2 2 0 0 0 0 .24c.045.591.526 1.072 1.488 2.034c.418.418.627.627.746.888q.025.054.046.11c.1.27.1.565.1 1.156v.11c0 1.507 0 2.261.468 2.73s1.223.468 2.73.468h.11c.59 0 .886 0 1.155.1q.057.021.111.046c.261.12.47.328.888.746c.962.962 1.443 1.443 2.034 1.488q.12.009.24 0c.591-.045 1.072-.526 2.034-1.488c.418-.418.627-.626.888-.746q.054-.025.11-.046c.27-.1.565-.1 1.156-.1h.11c1.507 0 2.261 0 2.73-.468s.468-1.223.468-2.73v-.11c0-.59 0-.886.1-1.155q.021-.057.046-.111c.12-.261.328-.47.746-.888c.962-.962 1.443-1.443 1.488-2.034q.009-.12 0-.24c-.045-.591-.526-1.072-1.488-2.034c-.418-.418-.626-.627-.746-.888l-.046-.11c-.1-.27-.1-.565-.1-1.156v-.11c0-1.507 0-2.261-.468-2.73s-1.223-.468-2.73-.468z"></path>
                            <path d="M15.5 12a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0Z"></path>
                        </g>
                    </svg>
                    <span>Settings</span>
                </h2>

            </div>
            <hr className="border-[#302e46]  mb-4" />

            <div className="bg-[#191822]/50   p-4 sm:p-5 rounded-xl border border-[#2e2b41]">
                <div className="relative">
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full cursor-pointer bg-[#191822]/60 px-4 py-4 border-2 border-[#222031] rounded-md justify-between flex hover:border-[#2e2b41] transition-colors"

                    >
                        <div className="flex space-x-2 items-center text-center select-none">
                            {selectedLanguage.flag}
                            <span>{selectedLanguage.name}</span>
                        </div>
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="rotate-90"
                            width={24}
                            height={24}
                            viewBox="0 0 20 20"

                            transition={{ duration: 0.3 }}
                        >
                            <path fill="currentColor" fillRule="evenodd" d="M16.53 10.511a.75.75 0 0 0 0-1.06l-3.25-3.25a.75.75 0 0 0-1.06 1.06l2.72 2.72l-2.72 2.72a.75.75 0 1 0 1.06 1.06zm-9.81-4.31l-3.25 3.25a.75.75 0 0 0 0 1.06l3.25 3.25a.75.75 0 1 0 1.06-1.06l-2.72-2.72l2.72-2.72a.75.75 0 0 0-1.06-1.06" clipRule="evenodd"></path>
                        </motion.svg>
                    </motion.button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute w-full mt-2 bg-[#191822] border-2 border-[#222031] rounded-md overflow-hidden z-50 shadow-xl"
                            >
                                {languages.map((lang, index) => (
                                    <motion.button
                                        key={lang.id}
                                        onClick={() => handleSelect(lang.id)}
                                        className={`w-full p-2 px-3 cursor-pointer flex items-center space-x-2 hover:bg-[#222031] transition-colors ${selectedLang === lang.id ? 'bg-[#222031]' : ''
                                            }`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}

                                    >
                                        {lang.flag}
                                        <span>{lang.name}</span>
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-[2rem]">

                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                        {/* Color Picker Section */}
                        <div className="relative">
                            <motion.div
                                className="relative flex items-center space-x-3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    className="w-6 h-6 rounded-full cursor-pointer hover:scale-110 transition-transform"
                                    src="/assets/colors.png"
                                    onClick={() => setOpen(!open)}
                                />

                                <AnimatePresence>
                                    {open && (
                                        <>
                                            <motion.div
                                                className="fixed inset-0 z-40"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                onClick={() => setOpen(false)}
                                            />
                                            <motion.div
                                                className="absolute z-50 mt-[18rem]"
                                                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className="bg-[#201f29] translate-y-6 p-3 px-4 rounded-lg border border-[#2e2b41]">
                                                    <span className="text-[#a29dbb] text-sm mb-1 select-none">Color Picker </span>
                                                    <HexColorPicker color={color} onChange={setColor} style={{ width: "250px", height: "180px" }} />
                                                    <div className="mt-4 flex space-x-2">
                                                        <div
                                                            className="p-5 rounded-lg border"
                                                            style={{
                                                                backgroundColor: color,
                                                                borderColor: darken(color, 10),
                                                            }}
                                                        ></div>

                                                        <input
                                                            value={color}
                                                            onChange={(e) => setColor(e.target.value)}
                                                            className="p-2 rounded-lg focus:outline-none border border-[#3a394b] bg-[#31303f] w-[200px]"
                                                        />


                                                    </div>
                                                </div>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>

                                <span className="block w-px h-4 bg-[#5b5683]" />

                                <motion.div
                                    className="flex space-x-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    {[
                                        "#FF5733",
                                        "#33FF57",
                                        "#3357FF",
                                        "#F1C40F",
                                        "#9B59B6",
                                        "#E67E22",
                                        "#1ABC9C",
                                        "#E74C3C",
                                    ].map((c, index) => (
                                        <motion.div
                                            key={c}
                                            className={`w-6 h-6 rounded-full cursor-pointer transition-all ${color === c ? "ring-2 ring-white scale-110" : "hover:scale-110"
                                                }`}
                                            style={{ backgroundColor: c }}
                                            onClick={() => setColor(c)}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.2, delay: index * 0.05 }}
                                            whileHover={{ scale: 1.15 }}
                                            whileTap={{ scale: 0.95 }}
                                        />
                                    ))}
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Discord Embed Section */}
                        <motion.div
                            className="bg-[#191822] rounded-md p-4  transition-colors duration-300"

                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            <div className="flex items-start space-x-3">
                                <img
                                    src="https://cdn.discordapp.com/icons/1294072522219978802/12e48a18d32be277c7b1dc8a87ac00b9.png?size=80&quality=lossless"
                                    alt="Muzzle"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2 ">
                                        <span className="text-white font-semibold">Muzzle</span>
                                        <span className="bg-[#5865F2] text-white text-[10px] px-1.5 py-0.5 rounded font-semibold flex items-center space-x-1">
                                            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M12.5 3.5L5.5 10.5L2.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                            </svg>
                                            <span>APP</span>
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            Today at {new Date().toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                        </span>
                                    </div>
                                    <div
                                        className="bg-[#161420] mt-[-0.2rem] rounded p-3 border-l-4 transition-colors duration-300"
                                        style={{ borderLeftColor: color }}
                                    >
                                        <p className="text-gray-300 text-sm">
                                            This is a simple embed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>





        </Page>

    )
}