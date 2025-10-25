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
    const [openColorPicker, setOpenColorPicker] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const logTypes = [
        'Server Updates Log',
        'Member Roles Updated',
        'Nickname Changed',
        'Timeout',
        'Member Banned',
        'Member Unbanned',
        'Member Kicked',
        'Role Created',
        'Role Updated',
        'Role Deleted',
        'Channel Created',
        'Channel Updated',
        'Channel Deleted',
        'Message Deleted',
        'Message Updated',
        'Media Log',
        'Member Joined Voice',
        'Member Left Voice',
        'Member Voice Muted/Unmuted',
        'Member Voice Deafened/Undeafened',
        'Emoji Created',
        'Emoji Deleted',
        'Sticker Created',
        'Sticker Deleted'
    ];

    // State for each log type
    const [logSettings, setLogSettings] = useState(
        logTypes.reduce((acc, logName) => {
            acc[logName] = {
                enabled: false,
                channel: null,
                color: "#3357FF"
            };
            return acc;
        }, {})
    );

    const handleToggle = (logName) => {
        setLogSettings(prev => ({
            ...prev,
            [logName]: {
                ...prev[logName],
                enabled: !prev[logName].enabled
            }
        }));
        console.log(`${logName} is now ${!logSettings[logName].enabled ? 'enabled' : 'disabled'}`);
    };

    const handleColorChange = (logName, newColor) => {
        setLogSettings(prev => ({
            ...prev,
            [logName]: {
                ...prev[logName],
                color: newColor
            }
        }));
        console.log(`${logName} color changed to ${newColor}`);
    };

    const addCommas = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Filter logs based on search query
    const filteredLogTypes = logTypes.filter(logName =>
        logName.toLowerCase().includes(searchQuery.toLowerCase())
    );


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
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-7.5 h-6.5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M11.11 4.049a1 1 0 1 0-.22-1.988C5.888 2.614 2 6.852 2 12c0 5.523 4.477 10 10 10c5.146 0 9.383-3.887 9.939-8.885a1 1 0 0 0-1.988-.221A8.001 8.001 0 0 1 4 12a8 8 0 0 1 7.11-7.951m3.657-1.658a1 1 0 0 0-.54 1.925q.432.122.842.29a1 1 0 0 0 .757-1.852a10 10 0 0 0-1.059-.363m2.582 2.3a1 1 0 0 1 1.413-.06q.318.291.609.608a1 1 0 0 1-1.474 1.352a8 8 0 0 0-.486-.486a1 1 0 0 1-.062-1.413M11 6a1 1 0 0 1 1 1v5h3a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1m8.94 1.623a1 1 0 0 1 1.304.547a10 10 0 0 1 .365 1.063a1 1 0 1 1-1.925.54a8 8 0 0 0-.291-.846a1 1 0 0 1 .546-1.304"></path>
                    </svg>
                    <span>Audit Logs</span>
                </h2>

            </div>
            <hr className="border-[#302e46]  mb-4" />



            <div className="flex flex-row-reverse items-center w-full bg-[#191822]/60 px-4 py-2 border-2 border-[#222031] rounded-md  transition-colors focus-within:border-[#2e2b41]">
                <input
                    placeholder="Search for log name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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

            <div className="mt-[2rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-[2rem]">
                {filteredLogTypes.length > 0 ? (
                    filteredLogTypes.map((logName, index) => (
                        <div key={index} className="bg-[#191822]/50  p-4  rounded-xl border border-[#2e2b41]">
                            <div className="flex justify-between">

                                <div className="flex space-x-2 items-center">
                                    <div className="">
                                        <span className="text-lg uppercase ">{logName}</span>
                                    </div>

                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={logSettings[logName].enabled}
                                        onChange={() => handleToggle(logName)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-16 h-8 bg-[#22202e] rounded-full peer-checked:bg-indigo-500 transition-colors"></div>
                                    <div className="absolute left-1 w-6 h-6 bg-white rounded-full peer-checked:translate-x-8 transition-transform"></div>
                                </label>
                            </div>
                            <hr className="border-[#302e46] mt-4  mb-4" />
                            <div className="">
                                <span className="text-[#d2cbf1] manrope">Channel</span>
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

                            <div className="relative mt-4">
                                <label className="block  text-[#d2cbf1] manrope mb-2">Color</label>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setOpenColorPicker(openColorPicker === logName ? null : logName)}
                                        className="h-12 w-full rounded-md  cursor-pointer"
                                        style={{ backgroundColor: logSettings[logName].color }}
                                    />

                                </div>
                                {openColorPicker === logName && (
                                    <>
                                        <motion.div
                                            className="fixed inset-0 z-40"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onClick={() => setOpenColorPicker(null)}
                                        />
                                        <motion.div
                                            className="absolute z-[9999]  "
                                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="bg-[#201f29] p-3 px-4 rounded-lg border border-[#2e2b41] shadow-lg">
                                                <span className="text-[#a29dbb] text-sm mb-2 block">Color Picker</span>
                                                <HexColorPicker
                                                    color={logSettings[logName].color}
                                                    onChange={(newColor) => handleColorChange(logName, newColor)}
                                                    style={{ width: '220px', height: '160px' }}
                                                />
                                                <div className="mt-4 flex items-center gap-2">
                                                    <div
                                                        className="p-5 rounded-lg border"
                                                        style={{
                                                            backgroundColor: logSettings[logName].color,
                                                            borderColor: darken(logSettings[logName].color, 10),
                                                        }}
                                                    />
                                                    <input
                                                        value={logSettings[logName].color}
                                                        onChange={(e) => handleColorChange(logName, e.target.value)}
                                                        className="p-2 rounded-lg focus:outline-none border border-[#3a394b] bg-[#31303f] w-[170px]"
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </div>
                          
                            
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <div className="flex flex-col items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 24 24" className="text-[#928ea8]">
                                <g fill="none">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1.5} d="m21 21l-4-4m2-6a8 8 0 1 1-16 0a8 8 0 0 1 16 0"/>
                                    <path fill="currentColor" fillOpacity={0.16} d="M11 19a8 8 0 1 0 0-16a8 8 0 0 0 0 16"/>
                                </g>
                            </svg>
                            <p className="text-[#928ea8] text-lg">No logs found matching "{searchQuery}"</p>
                        </div>
                    </div>
                )}

            </div>

        </>

    )
}