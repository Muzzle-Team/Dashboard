'use client'
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, LayoutDashboard, Sparkles } from "lucide-react"
import { useSidebar } from "@/context/userSidebar";
import { useState, useTransition, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Sidebar() {
    const {
        setIsSidebarOpen,
        isSidebarOpen,
        active,
        setActive,
        isLeaderboardOpen,
        setIsLeaderboardOpen,
        isGeneralOpen,
        setIsGeneralOpen,
        isSubscription,
        setIsSubscription,
    } = useSidebar();
    const [hovered, setHovered] = useState(null);
    const [hoveredPosition, setHoveredPosition] = useState(0);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const router = useRouter();
    const items = Array.from({ length: 20 });

    useEffect(() => {
        if (!router?.asPath) return; // لو undefined اخرج

        const path = router.asPath;
        const afterDashboard = path.split("/dashboard/")[1] || "";

        let newActive;
        if (!afterDashboard) {
            newActive = "overview";
        } else if (afterDashboard.startsWith("top/")) {
            newActive = afterDashboard.split("top/")[1];
        } else {
            newActive = afterDashboard;
        }

        setActive(newActive);
    }, [router?.asPath]);


    const containerVariants = {
        hidden: { opacity: 1 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
    };


    return (
        <div
            id="sidebar"
            className={`fixed top-0 left-0 bottom-0 h-screen z-40 flex  transform ${isSidebarOpen
                ? "translate-x-0 md:translate-x-0"
                : "-translate-x-full md:translate-x-0"
                } transition-transform duration-300 ease-in-out `}
        >
            <div className="h-full overflow-y-auto hidden-scrollbar w-20 bg-[#191822] mt-[30px] flex flex-col items-center py-4 relative">
                <div
                    className="relative mb-4 z-10 group"
                    onMouseEnter={(e) => {
                        setHovered(-1);
                        setHoveredPosition(e.currentTarget.getBoundingClientRect().top);
                    }}
                    onMouseLeave={() => setHovered(null)}
                >

                    <div className="absolute -left-[10px] top-1/2 -translate-y-1/2">
                        <div className="w-1 h-5 bg-[#5d57a3] rounded-r-full transition-all duration-300 group-hover:h-10"></div>
                    </div>

                    <img
                        src="https://cdn.discordapp.com/avatars/1141791569574375514/9238922f80daa0b9f06855e1d5700993.png?size=1024"
                        alt="Profile"
                        draggable={false}
                        className="w-14 h-14 rounded-[50%] cursor-pointer hover:rounded-[35%] transition-all duration-300 select-none"
                    />
                </div>

                <div className="w-10 border-t-2 rounded-md border-[#413f52] mb-4"></div>

                <motion.div
                    className="flex flex-col gap-4 mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {items.map((_, i) => (
                        <motion.div
                            key={i}
                            className="relative z-10 group"
                            variants={itemVariants}
                            onMouseEnter={(e) => {
                                setHovered(i);
                                setHoveredPosition(e.currentTarget.getBoundingClientRect().top);
                            }}
                            onMouseLeave={() => setHovered(null)}
                        >

                            <div className="absolute -left-[10px] top-1/2 -translate-y-1/2">
                                <div className="w-1 h-5 bg-[#5d57a3] rounded-r-full transition-all duration-300 group-hover:h-10"></div>
                            </div>

                            <img
                                src="https://cdn.discordapp.com/avatars/1141791569574375514/9238922f80daa0b9f06855e1d5700993.png?size=1024"
                                alt={`Icon ${i + 1}`}
                                draggable={false}
                                className="w-14 h-14 rounded-[50%] hover:rounded-[35%] transition-all duration-300 cursor-pointer select-none"
                            />
                        </motion.div>
                    ))}
                </motion.div>

                <div className="fixed bottom-0 w-20 left-0 right-0 h-5 rounded-xl pointer-events-none z-20">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#191822] via-[#191822]/60 to-transparent backdrop-blur"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#191822]/90 to-transparent"></div>
                </div>
            </div>

            <AnimatePresence>
                {hovered !== null && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed left-[70px] text-white px-3 py-2 rounded-lg  text-sm w-40 pointer-events-none"
                        style={{
                            top: `${hoveredPosition}px`,
                            zIndex: 9999
                        }}
                    >
                        <div className="absolute left-[5px]  top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-[#22212f]"></div>

                        <div className="bg-[#22212f] border border-[#37354b] rounded-lg px-3 py-2">
                            {hovered === -1 ? (
                                <p className="font-semibold">Home</p>
                            ) : (
                                <>
                                    <p className="font-semibold">Marin Chan</p>
                                    <p className="text-xs text-gray-400">16 Members</p>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            <div className="h-full overflow-y-auto hidden-scrollbar w-73 bg-[#191822] mt-[40px] flex flex-col justify-between items-center py-4 relative border border-[#38364d] border-b-0 border-r-0 rounded-r-xl sm:rounded-r-none sm:rounded-tl-xl">
                <div>
                    <div className="bg-indigo-600/70 w-[16rem] text-center backdrop-blur p-4 text-xl  rounded-xl select-none">
                        Back with new style
                    </div>
                    <hr className="mt-4 mb-4 text-[#665be6]" />


                    <div
                        className="text-gray-400  cursor-pointer  flex items-center justify-between"
                        onClick={() => setIsGeneralOpen(!isGeneralOpen)}
                    >
                        <span className="text-white text-sm transition-colors font-extrabold duration-300 select-none">
                            GENERAL
                        </span>
                        <svg
                            className={`w-4 h-4 transform transition-transform  ${isGeneralOpen ? "rotate-90" : "rotate-0"
                                }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#fff"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>

                    <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isGeneralOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                            }`}
                    >
                        {isGeneralOpen && (
                            <div className="flex flex-col space-y-3 py-4 gap-1  pb-4">
                                <Link href="/dashboard" className="group">
                                    <div
                                        className={`relative flex  items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md  transition
      ${active === "overview" ? "bg-indigo-500/50 text-white" : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"}
    `}
                                    >
                                        <span
                                            className={`
        absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
        ${active === "overview" ? "h-7" : "h-0 group-hover:h-7"}
      `}
                                        ></span>

                                        <LayoutDashboard className="w-6 h-6" />
                                        <span className=" mt-1">Overview</span>
                                    </div>
                                </Link>

                                <Link href="/premium" className="group">
                                    <div
                                        className={`relative flex  items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md  transition
      ${active === "premium" ? "bg-indigo-500/50 text-white" : "text-yellow-400 hover:bg-yellow-500/20 "}
    `}
                                    >
                                        <span
                                            className={`
        absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-yellow-500 transition-all duration-300
        ${active === "premium" ? "h-7" : "h-0 group-hover:h-7"}
      `}
                                        ></span>

                                        <Sparkles className="w-6 h-6" />
                                        <span className=" mt-1">Manage Subscriptions</span>
                                    </div>
                                </Link>


                            </div>
                        )}
                    </div>

                </div>

                <div className="bg-gradient-to-r  from-[#665be6] to-[#2617c9] w-73 rounded-t-xl mb-6 p-4 flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-3 group  shrink-0 cursor-pointer">
                        <img
                            src="https://cdn.discordapp.com/avatars/1141791569574375514/9238922f80daa0b9f06855e1d5700993.png?size=1024"
                            alt="User"
                            className="w-9 h-9 rounded-full group-hover:scale-110 transition-all duration-300 select-none"
                            draggable={false}
                        />
                        <div className="flex flex-col">

                            <span className="text-lg font-bold text-gray-200/80 group-hover:text-white transition-all duration-300 select-none">@mz_n</span>
                        </div>
                    </div>

                    <button className="ml-auto text-white hover:text-red-400 transition-colors cursor-pointer">
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}
