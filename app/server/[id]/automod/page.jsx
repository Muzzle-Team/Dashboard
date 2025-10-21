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
                        <path fill="currentColor" d="M7.604 4.604C9.34 2.868 10.208 2 11.286 2c1.079 0 1.947.868 3.682 2.604l4.42 4.419c1.735 1.735 2.603 2.603 2.603 3.682s-.868 1.946-2.604 3.682s-2.604 2.604-3.682 2.604c-1.079 0-1.947-.868-3.682-2.604l-4.42-4.419C5.869 10.233 5 9.365 5 8.286s.868-1.946 2.604-3.682m-.32 9.166l-4.458 4.458c-.343.343-.514.514-.617.692a1.56 1.56 0 0 0 0 1.562c.103.178.274.35.617.692s.513.514.692.617a1.56 1.56 0 0 0 1.562 0c.178-.103.35-.275.692-.617l4.458-4.458z"></path>
                        <path fill="currentColor" d="m8.345 12.71l.004-.005l2.946 2.946l-.005.004zm11.324-5.527a1.56 1.56 0 0 0-.024-1.52c-.103-.178-.275-.349-.617-.691c-.342-.343-.514-.514-.692-.617a1.56 1.56 0 0 0-1.519-.024z"></path>
                    </svg>
                    <span>Auto Moderation</span>
                </h2>

            </div>
            <hr className="border-[#302e46]  mb-4" />


            <div className="mt-[2rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-[2rem]">
                <div className="bg-[#191822]/50  p-4 sm:p-5 rounded-md border border-[#2e2b41] flex  flex-col justify-between">
                    <div className="flex justify-between">

                        <div className="flex space-x-2 items-center">
                            <div className="bg-[#22202e] rounded-lg p-3 flex text-center text-[#625d83] justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2zm-10-2h.01M12 7v4"></path>
                                </svg>
                            </div>
                            <div className="">
                                <span className="text-xl uppercase ">Bad Words</span>
                                <p className="text-[#a29dbb] text-sm">Detects and blocks harmful or restricted language.</p>
                            </div>

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

                    <div className="mt-[1rem] flex flex-wrap gap-2">
                        <div className="bg-[#22202e] py-1 px-2 rounded-sm">
                            <span className="text-[#938dbe] text-sm">Block Message</span>
                        </div>
                        <div className="bg-[#22202e] py-1 px-2 rounded-sm">
                            <span className="text-[#938dbe] text-sm">Timeout Member</span>
                        </div>
                    </div>

                    <button className="mt-[1rem] w-full bg-[#211e2c67] p-2 py-3 rounded-md border-2 border-[#353047] hover:bg-[#3530478e] transition-all duration-250 cursor-pointer">Edit Rule</button>

                </div>


                <div className="bg-[#191822]/50  p-4 sm:p-5 rounded-md border border-[#2e2b41] flex  flex-col justify-between">
                    <div className="flex justify-between">

                        <div className="flex space-x-2 items-center">
                            <div className="bg-[#22202e] rounded-lg p-3 flex text-center text-[#625d83] justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} className="w-6.5 h-6.5" viewBox="0 0 15 15">
                                    <path fill="currentColor" d="M1.5 7a.5.5 0 0 1 .5.5A3.5 3.5 0 0 0 5.5 11h7.293l-1.147-1.146l-.064-.078a.5.5 0 0 1 .693-.694l.079.065l2 2a.5.5 0 0 1 0 .707l-2 2a.5.5 0 1 1-.708-.707L12.793 12H5.5A4.5 4.5 0 0 1 1 7.5a.5.5 0 0 1 .5-.5m1.225-5.918a.5.5 0 0 1 .693.694l-.065.078L2.207 3H9.5A4.5 4.5 0 0 1 14 7.5a.5.5 0 0 1-1 0A3.5 3.5 0 0 0 9.5 4H2.207l1.146 1.147l.065.078a.5.5 0 0 1-.693.693l-.079-.064l-2-2a.5.5 0 0 1 0-.707l2-2z"></path>
                                </svg>
                            </div>
                            <div className="">
                                <span className="text-xl uppercase ">Repeated Text</span>
                                <p className="text-[#a29dbb] text-sm">Detects and limits repeated or spam-like messages.</p>
                            </div>

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

                    <div className="mt-[1rem] flex flex-wrap gap-2">
                        <div className="bg-[#22202e] py-1 px-2 rounded-sm">
                            <span className="text-[#938dbe] text-sm">Block Message</span>
                        </div>
                        <div className="bg-[#22202e] py-1 px-2 rounded-sm">
                            <span className="text-[#938dbe] text-sm">Timeout Member</span>
                        </div>
                    </div>

                    <button className="mt-[1rem] w-full bg-[#211e2c67] p-2 py-3 rounded-md border-2 border-[#353047] hover:bg-[#3530478e] transition-all duration-250 cursor-pointer">Edit Rule</button>

                </div>


                <div className="bg-[#191822]/50  p-4 sm:p-5 rounded-md border border-[#2e2b41] flex  flex-col justify-between">
                    <div className="flex justify-between">

                        <div className="flex space-x-2 items-center">
                            <div className="bg-[#22202e] rounded-lg p-3 flex text-center text-[#625d83] justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17H7A5 5 0 0 1 7 7m8 0h2a5 5 0 0 1 4 8M8 12h4M2 2l20 20"></path>
                                </svg>
                            </div>
                            <div className="">
                                <span className="text-xl uppercase ">Discord Invites</span>
                                <p className="text-[#a29dbb] text-sm">Detects and blocks messages containing Discord invite links.</p>
                            </div>

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

                    <div className="mt-[1rem] flex flex-wrap gap-2">
                        <div className="bg-[#22202e] py-1 px-2 rounded-sm">
                            <span className="text-[#938dbe] text-sm">Block Message</span>
                        </div>
                        <div className="bg-[#22202e] py-1 px-2 rounded-sm">
                            <span className="text-[#938dbe] text-sm">Timeout Member</span>
                        </div>
                    </div>

                    <button className="mt-[1rem] w-full bg-[#211e2c67] p-2 py-3 rounded-md border-2 border-[#353047] hover:bg-[#3530478e] transition-all duration-250 cursor-pointer">Edit Rule</button>

                </div>


                <div className="bg-[#191822]/50  p-4 sm:p-5 rounded-md border border-[#2e2b41] flex  flex-col justify-between">
                    <div className="flex justify-between">

                        <div className="flex space-x-2 items-center">
                            <div className="bg-[#22202e] rounded-lg p-3 flex text-center text-[#625d83] justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m6.918 6h-3.215a49 49 0 0 0-.565-3.357A8.05 8.05 0 0 1 18.918 8m-5.904-3.928c.068.352.387 2.038.645 3.928h-3.318c.258-1.89.577-3.576.645-3.928C11.319 4.029 11.656 4 12 4s.681.029 1.014.072M14 12c0 .598-.043 1.286-.109 2h-3.782c-.066-.714-.109-1.402-.109-2s.043-1.286.109-2h3.782c.066.714.109 1.402.109 2M8.862 4.643A49 49 0 0 0 8.297 8H5.082a8.05 8.05 0 0 1 3.78-3.357M4.263 10h3.821C8.033 10.668 8 11.344 8 12s.033 1.332.085 2H4.263C4.097 13.359 4 12.692 4 12s.098-1.359.263-2m.819 6h3.215c.188 1.424.42 2.65.565 3.357A8.05 8.05 0 0 1 5.082 16m5.904 3.928A77 77 0 0 1 10.341 16h3.318a78 78 0 0 1-.645 3.928c-.333.043-.67.072-1.014.072s-.681-.029-1.014-.072m4.152-.571c.145-.707.377-1.933.565-3.357h3.215a8.05 8.05 0 0 1-3.78 3.357M19.737 14h-3.821c.051-.668.084-1.344.084-2s-.033-1.332-.085-2h3.821c.166.641.264 1.308.264 2s-.097 1.359-.263 2"></path>
                                </svg>
                            </div>
                            <div className="">
                                <span className="text-xl uppercase ">External Links </span>
                                <p className="text-[#a29dbb] text-sm">Detects and blocks messages containing suspicious or unsafe external links.</p>
                            </div>

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

                    <div className="mt-[1rem] flex flex-wrap gap-2">
                        <div className="bg-[#22202e] py-1 px-2 rounded-sm">
                            <span className="text-[#938dbe] text-sm">Block Message</span>
                        </div>
                        <div className="bg-[#22202e] py-1 px-2 rounded-sm">
                            <span className="text-[#938dbe] text-sm">Timeout Member</span>
                        </div>
                    </div>

                    <button className="mt-[1rem] w-full bg-[#211e2c67] p-2 py-3 rounded-md border-2 border-[#353047] hover:bg-[#3530478e] transition-all duration-250 cursor-pointer">Edit Rule</button>

                </div>



                <div className="bg-[#191822]/50  p-4 sm:p-5 rounded-md border border-[#2e2b41] flex  flex-col justify-between">
                    <div className="flex justify-between">

                        <div className="flex space-x-2 items-center">
                            <div className="bg-[#22202e] rounded-lg p-3 flex text-center text-[#625d83] justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
                                        <path d="m8 12l2-1.5L8 9m8 3l-2-1.5L16 9m0 7.25l-1.333-1l-1.334 1l-1.333-1l-1.333 1l-1.334-1l-1.333 1"></path>
                                        <path d="M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0"></path>
                                    </g>
                                </svg>
                            </div>
                            <div className="">
                                <span className="text-xl uppercase ">Mass Emojis</span>
                                <p className="text-[#a29dbb] text-sm">Detects and limits messages containing excessive or spammy emoji usage.</p>
                            </div>

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

                    <div className="mt-[1rem] flex flex-wrap gap-2">
                        <div className="bg-[#22202e] py-1 px-2 rounded-sm">
                            <span className="text-[#938dbe] text-sm">Block Message</span>
                        </div>
                        <div className="bg-[#22202e] py-1 px-2 rounded-sm">
                            <span className="text-[#938dbe] text-sm">Timeout Member</span>
                        </div>
                    </div>

                    <button className="mt-[1rem] w-full bg-[#211e2c67] p-2 py-3 rounded-md border-2 border-[#353047] hover:bg-[#3530478e] transition-all duration-250 cursor-pointer">Edit Rule</button>

                </div>



                <div className="bg-[#191822]/50  p-4 sm:p-5 rounded-md border border-[#2e2b41] flex  flex-col justify-between">
                    <div className="flex justify-between">

                        <div className="flex space-x-2 items-center">
                            <div className="bg-[#22202e] rounded-lg p-3 flex text-center text-[#625d83] justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} className="w-6.5 h-6.5" viewBox="0 0 16 16">
                                    <path fill="currentColor" d="m4.588 14.807l1.79-1.301A5.5 5.5 0 0 1 13 6.207V6a2 2 0 0 0-2.001-2H3a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2v.998a1 1 0 0 0 1.588.809M14 6v.6q.538.276 1 .657V6a4 4 0 0 0-4-4H5a2 2 0 0 0-1.732 1H11a3 3 0 0 1 3 3m-2.5 2a3.5 3.5 0 1 0 0 7h1a.5.5 0 0 1 0 1h-1a4.5 4.5 0 1 1 4.5-4.5v.75a1.75 1.75 0 0 1-3.167 1.027c-.407.447-.966.723-1.583.723C10.007 14 9 12.88 9 11.5S10.007 9 11.25 9c.465 0 .897.157 1.256.425a.5.5 0 0 1 .994.075v2.75a.75.75 0 0 0 1.5 0v-.75A3.5 3.5 0 0 0 11.5 8m-.25 5c.594 0 1.25-.57 1.25-1.5s-.656-1.5-1.25-1.5s-1.25.57-1.25 1.5s.656 1.5 1.25 1.5"></path>
                                </svg>
                            </div>
                            <div className="">
                                <span className="text-xl uppercase ">Mass Mentions</span>
                                <p className="text-[#a29dbb] text-sm">Detects and restricts messages with excessive user or role mentions.</p>
                            </div>

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

                    <div className="mt-[1rem] flex flex-wrap gap-2">
                        <div className="bg-[#22202e] py-1 px-2 rounded-sm">
                            <span className="text-[#938dbe] text-sm">Block Message</span>
                        </div>
                        <div className="bg-[#22202e] py-1 px-2 rounded-sm">
                            <span className="text-[#938dbe] text-sm">Timeout Member</span>
                        </div>
                    </div>

                    <button className="mt-[1rem] w-full bg-[#211e2c67] p-2 py-3 rounded-md border-2 border-[#353047] hover:bg-[#3530478e] transition-all duration-250 cursor-pointer">Edit Rule</button>

                </div>



                <div className="bg-[#191822]/50  p-4 sm:p-5 rounded-md border border-[#2e2b41] flex  flex-col justify-between">
                    <div className="flex justify-between">

                        <div className="flex space-x-2 items-center">
                            <div className="bg-[#22202e] rounded-lg p-3 flex text-center text-[#625d83] justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9h1m4 0h3m-8 4h5M8 4h10a3 3 0 0 1 3 3v8c0 .577-.163 1.116-.445 1.573M18 18h-5l-5 3v-3H6a3 3 0 0 1-3-3V7c0-1.085.576-2.036 1.439-2.562M3 3l18 18"></path>
                                </svg>
                            </div>
                            <div className="">
                                <span className="text-xl uppercase ">Spam Messages</span>
                                <p className="text-[#a29dbb] text-sm">Detects and blocks messages sent in rapid succession or with spam content.</p>
                            </div>

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

                    <div className="mt-[1rem] flex flex-wrap gap-2">
                        <div className="bg-[#22202e] py-1 px-2 rounded-sm">
                            <span className="text-[#938dbe] text-sm">Block Message</span>
                        </div>
                        <div className="bg-[#22202e] py-1 px-2 rounded-sm">
                            <span className="text-[#938dbe] text-sm">Timeout Member</span>
                        </div>
                    </div>

                    <button className="mt-[1rem] w-full bg-[#211e2c67] p-2 py-3 rounded-md border-2 border-[#353047] hover:bg-[#3530478e] transition-all duration-250 cursor-pointer">Edit Rule</button>

                </div>



                <div className="bg-[#191822]/50  p-4 sm:p-5 rounded-md border border-[#2e2b41] flex  flex-col justify-between">
                    <div className="flex justify-between">

                        <div className="flex space-x-2 items-center">
                            <div className="bg-[#22202e] rounded-lg p-3 flex text-center text-[#625d83] justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} className="w-6.5 h-6.5" viewBox="0 0 16 16">
                                    <path fill="currentColor" d="M4.5 2.25a.75.75 0 0 1 .704.49l3.5 9.5a.75.75 0 0 1-1.408.52l-.924-2.51H2.628l-.924 2.51a.75.75 0 1 1-1.408-.52l3.5-9.5a.75.75 0 0 1 .704-.49m0 2.92L3.181 8.75H5.82zm5.25-2.92A.75.75 0 0 0 9 3v9.5c0 .414.336.75.75.75h2.5a3.25 3.25 0 0 0 1.57-6.097A3 3 0 0 0 11.5 2.25zm3.25 3a1.5 1.5 0 0 1-1.5 1.5h-1v-3h1a1.5 1.5 0 0 1 1.5 1.5m-.75 6.5H10.5v-3.5h1.75a1.75 1.75 0 1 1 0 3.5"></path>
                                </svg>
                            </div>
                            <div className="">
                                <span className="text-xl uppercase ">Excessive Caps</span>
                                <p className="text-[#a29dbb] text-sm">Detects and limits messages written with excessive capital letters.</p>
                            </div>

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

                    <div className="mt-[1rem] flex flex-wrap gap-2">
                        <div className="bg-[#22202e] py-1 px-2 rounded-sm">
                            <span className="text-[#938dbe] text-sm">Block Message</span>
                        </div>
                        <div className="bg-[#22202e] py-1 px-2 rounded-sm">
                            <span className="text-[#938dbe] text-sm">Timeout Member</span>
                        </div>
                    </div>

                    <button className="mt-[1rem] w-full bg-[#211e2c67] p-2 py-3 rounded-md border-2 border-[#353047] hover:bg-[#3530478e] transition-all duration-250 cursor-pointer">Edit Rule</button>

                </div>






            </div>




        </Page>

    )
}