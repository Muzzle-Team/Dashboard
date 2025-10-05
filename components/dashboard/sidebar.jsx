'use client'
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, LayoutDashboard, Sparkles } from "lucide-react"
import { useSidebar } from "@/context/userSidebar";
import { useState, useTransition, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
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
        isStore,
        setIsStore,
        isOthers,
        setIsOthers,
        hasAnimated,
        setHasAnimated
    } = useSidebar();
    const [hovered, setHovered] = useState(null);
    const [hoveredPosition, setHoveredPosition] = useState(0);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);
    const router = useRouter();
    const items = [
        { id: 1, name: "Marin Chan", members: 16, icon: "https://cdn.discordapp.com/icons/1294072522219978802/12e48a18d32be277c7b1dc8a87ac00b9.png?size=80&quality=lossless" },
        { id: 2, name: "One Piece", members: 120, icon: "https://cdn.discordapp.com/embed/avatars/0.png" },
        { id: 3, name: "Anime Hub", members: 45, icon: "https://cdn.discordapp.com/embed/avatars/0.png" },
        { id: 4, name: "Gaming Zone", members: 200, icon: "https://cdn.discordapp.com/embed/avatars/0.png" },
        { id: 5, name: "Cinema Club", members: 67, icon: "https://cdn.discordapp.com/embed/avatars/0.png" },
    ];

    const pathname = usePathname();

    useEffect(() => {
        if (!pathname) return;

        const afterDashboard = pathname.split("/dashboard/")[1] || "";

        let newActive;
        if (!afterDashboard) {
            newActive = "overview";
        } else if (afterDashboard.startsWith("top/")) {
            newActive = afterDashboard.split("top/")[1];
        } else if (afterDashboard.startsWith("store/")) {
            newActive = afterDashboard.split("store/")[1];
        } else {
            newActive = afterDashboard;
        }

        setActive(newActive);
    }, [pathname]);


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


    useEffect(() => {
        setHasAnimated(true);
    }, [setHasAnimated]);

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
                        src="https://cdn.discordapp.com/avatars/618078478755037185/6eb3714acb606504d5d1e63bc98c368a.png?size=1024"
                        alt="Profile"
                        draggable={false}
                        className="w-14 h-14 rounded-[50%] bg-indigo-700 cursor-pointer hover:rounded-[35%] transition-all duration-300 select-none"
                    />
                </div>

                <div className="w-10 border-t-2 rounded-md border-[#413f52] mb-4"></div>

                <motion.div
                    className="flex flex-col gap-4 mb-12"
                    variants={containerVariants}
                    initial={hasAnimated ? "show" : "hidden"}
                    animate={hasAnimated ? "show" : "hidden"}

                >
                    {items.map((item, i) => (
                        <motion.div
                            key={item.id}
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
                                src={item.icon}
                                alt={item.name}
                                draggable={false}
                                className="w-14 h-14 rounded-[50%] bg-indigo-700 hover:rounded-[35%] transition-all duration-300 cursor-pointer select-none"
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
                                    <p className="font-semibold">{items[hovered].name}</p>
                                    <p className="text-xs text-gray-400">{items[hovered].members} Members</p>
                                </>
                            )}
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>


            <div className="h-full overflow-y-auto hidden-scrollbar w-73 bg-[#191822]  mt-[40px] flex flex-col justify-between items-center py-4 relative border border-[#38364d] border-b-0  rounded-r-xl sm:rounded-r-none sm:rounded-tl-xl">
                <div className="mb-[6rem] w-[16rem]">



                    <div
                        className="text-gray-400 cursor-pointer flex items-center  justify-between"
                        onClick={() => setIsGeneralOpen(!isGeneralOpen)}
                    >
                        <span className="text-white text-sm transition-colors font-extrabold duration-300 select-none">
                            GENERAL
                        </span>
                        <svg
                            className={`w-4 h-4 transform transition-transform ${isGeneralOpen ? "rotate-90" : "rotate-0"
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

                    <AnimatePresence initial={false}>
                        {isGeneralOpen && (
                            <motion.div
                                key="general-section"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="flex flex-col space-y-3 py-4 gap-1 pb-4">
                                    <Link href="/dashboard" className="group">
                                        <div
                                            onClickCapture={() => setActive("overview")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "overview"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "overview" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="w-6 h-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.557 2.75H4.682A1.93 1.93 0 0 0 2.75 4.682v3.875a1.94 1.94 0 0 0 1.932 1.942h3.875a1.94 1.94 0 0 0 1.942-1.942V4.682A1.94 1.94 0 0 0 8.557 2.75m10.761 0h-3.875a1.94 1.94 0 0 0-1.942 1.932v3.875a1.943 1.943 0 0 0 1.942 1.942h3.875a1.94 1.94 0 0 0 1.932-1.942V4.682a1.93 1.93 0 0 0-1.932-1.932M8.557 13.5H4.682a1.943 1.943 0 0 0-1.932 1.943v3.875a1.93 1.93 0 0 0 1.932 1.932h3.875a1.94 1.94 0 0 0 1.942-1.932v-3.875a1.94 1.94 0 0 0-1.942-1.942m8.818-.001a3.875 3.875 0 1 0 0 7.75a3.875 3.875 0 0 0 0-7.75" /></svg>
                                            <span className="mt-1">Overview</span>
                                        </div>
                                    </Link>

                                    <Link href="/dashboard/premium" className="group">
                                        <div
                                            onClickCapture={() => setActive("premium")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "premium"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-yellow-400 hover:bg-yellow-500/20"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-yellow-500 transition-all duration-300
                ${active === "premium" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M13 10a.75.75 0 0 1 .725.556a2.37 2.37 0 0 0 1.72 1.72a.75.75 0 0 1 0 1.449a2.37 2.37 0 0 0-1.72 1.72a.75.75 0 0 1-1.45 0a2.37 2.37 0 0 0-1.72-1.72a.75.75 0 0 1 0-1.45a2.37 2.37 0 0 0 1.72-1.72l.043-.117A.75.75 0 0 1 13 10M7 0a1 1 0 0 1 .986.836c.279 1.67.815 2.8 1.596 3.582c.781.781 1.912 1.317 3.582 1.596a1 1 0 0 1 0 1.972c-1.67.279-2.8.815-3.582 1.596c-.781.781-1.317 1.912-1.596 3.582a1 1 0 0 1-1.972 0c-.279-1.67-.815-2.8-1.596-3.582c-.781-.781-1.912-1.317-3.582-1.596a1 1 0 0 1 0-1.972c1.67-.279 2.8-.815 3.582-1.596c.781-.781 1.317-1.912 1.596-3.582l.018-.089A1 1 0 0 1 7 0" /></svg>
                                            <span className="mt-1">Manage Subscriptions</span>
                                        </div>
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>


                    <div
                        className="text-gray-400 cursor-pointer mt-4 flex items-center justify-between"
                        onClick={() => setIsStore(!isStore)}
                    >
                        <span className="text-white text-sm transition-colors font-extrabold duration-300 select-none">
                            CORNS STORE
                        </span>
                        <svg
                            className={`w-4 h-4 transform transition-transform ${isStore ? "rotate-90" : "rotate-0"
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

                    <AnimatePresence initial={false}>
                        {isStore && (
                            <motion.div
                                key="general-section"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="flex flex-col space-y-3 py-4 gap-1 pb-4">
                                    <Link href="/dashboard/store/profile" className="group">
                                        <div
                                            onClickCapture={() => setActive("profile")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "profile"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "profile" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="w-6 h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="m3 16l4.47-4.47a1.81 1.81 0 0 1 2.56 0L14 15.5m1.5 1.5L14 15.5m7 .5l-2.47-2.47a1.81 1.81 0 0 0-2.56 0L14 15.5M15.5 8a.5.5 0 0 0 0-1m0 1a.5.5 0 0 1 0-1m0 1V7" /><path d="M3.698 19.747C2.5 18.345 2.5 16.23 2.5 12s0-6.345 1.198-7.747q.256-.3.555-.555C5.655 2.5 7.77 2.5 12 2.5s6.345 0 7.747 1.198q.3.256.555.555C21.5 5.655 21.5 7.77 21.5 12s0 6.345-1.198 7.747q-.256.3-.555.555C18.345 21.5 16.23 21.5 12 21.5s-6.345 0-7.747-1.198q-.3-.256-.555-.555" /></g></svg>
                                            <span className="mt-1">Profile Backgrounds</span>
                                        </div>
                                    </Link>

                                    <Link href="/dashboard/store/id" className="group">
                                        <div
                                            onClickCapture={() => setActive("id")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "id"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "id" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="9" r="2" /><path d="M13 15c0 1.105 0 2-4 2s-4-.895-4-2s1.79-2 4-2s4 .895 4 2Z" /><path d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12s0 5.657-1.172 6.828S17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172S2 15.771 2 12Z" /><path strokeLinecap="round" d="M19 12h-4m4-3h-5m5 6h-3" /></g></svg>
                                            <span className="mt-1">ID Backgrounds</span>
                                        </div>
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>


                    <div
                        className="text-gray-400 mt-4 cursor-pointer flex items-center justify-between"
                        onClick={() => setIsLeaderboardOpen(!isLeaderboardOpen)}
                    >
                        <span className="text-white text-sm transition-colors font-extrabold duration-300 select-none">
                            LEADERBOARD
                        </span>
                        <svg
                            className={`w-4 h-4 transform transition-transform ${isLeaderboardOpen ? "rotate-90" : "rotate-0"
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

                    <AnimatePresence initial={false}>
                        {isLeaderboardOpen && (
                            <motion.div
                                key="general-section"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="flex flex-col space-y-3 py-4 gap-1 pb-4">
                                    <Link href="/dashboard/top/corns" className="group">
                                        <div
                                            onClickCapture={() => setActive("corns")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "corns"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "corns" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="24" height="24" viewBox="0 0 24 24"><defs><path id="SVGVBpQocTe" fill="currentColor" d="M19 14a1 1 0 1 1-2 0a1 1 0 0 1 2 0" /></defs><path fill="currentColor" fillRule="evenodd" d="M20.924 11.75H18.23c-1.424 0-2.481 1.059-2.481 2.25s1.057 2.25 2.48 2.25h2.718c.206-.013.295-.152.302-.236v-4.028c-.007-.084-.096-.223-.302-.235zm-.074-1.5q.1-.001.19.004c.87.053 1.641.71 1.706 1.628c.004.06.004.125.004.185v3.866c0 .06 0 .125-.004.185c-.065.918-.836 1.575-1.707 1.629q-.089.004-.19.003h-2.618c-2.145 0-3.981-1.628-3.981-3.75s1.836-3.75 3.98-3.75z" clipRule="evenodd" /><use href="#SVGVBpQocTe" /><path fill="currentColor" fillRule="evenodd" d="M20.85 10.25q.1-.001.19.004c.225.013.443.067.645.156c-.107-1.606-.402-2.844-1.326-3.769c-.749-.748-1.698-1.08-2.87-1.238l-.042-.005l-.032-.023l-3.736-2.477a3.99 3.99 0 0 0-4.358 0L5.586 5.375l-.033.023l-.042.005c-1.172.158-2.121.49-2.87 1.238c-.748.749-1.08 1.698-1.238 2.87c-.153 1.14-.153 2.595-.153 4.433v.112c0 1.838 0 3.294.153 4.433c.158 1.172.49 2.121 1.238 2.87c.749.748 1.698 1.08 2.87 1.238c1.14.153 2.595.153 4.433.153h3.112c1.838 0 3.294 0 4.433-.153c1.172-.158 2.121-.49 2.87-1.238c.924-.925 1.219-2.163 1.326-3.77q-.305.136-.646.158q-.089.004-.19.003h-.681c-.114 1.342-.371 2.05-.87 2.548c-.423.423-1.003.677-2.009.812c-1.027.138-2.382.14-4.289.14h-3c-1.907 0-3.261-.002-4.29-.14c-1.005-.135-1.585-.389-2.008-.812s-.677-1.003-.812-2.009c-.138-1.027-.14-2.382-.14-4.289s.002-3.261.14-4.29c.135-1.005.389-1.585.812-2.008s1.003-.677 2.009-.812c1.028-.138 2.382-.14 4.289-.14h3c1.907 0 3.262.002 4.29.14c1.005.135 1.585.389 2.008.812c.499.498.756 1.207.87 2.548zm-10.906-5h3.112q.775 0 1.46.003L12.85 4.148c-.8-.53-1.9-.53-2.7 0L8.483 5.253q.686-.004 1.46-.003" clipRule="evenodd" /><path fill="currentColor" d="M6 9.25a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5z" /><use href="#SVGVBpQocTe" fillRule="evenodd" clipRule="evenodd" /></svg>
                                            <span className="mt-1">Richest 100 Millionaires</span>
                                        </div>
                                    </Link>

                                    <Link href="/dashboard/top/xp" className="group">
                                        <div
                                            onClickCapture={() => setActive("xp")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "xp"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "xp" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="w-6 h-6" viewBox="0 0 24 24"><path fill="currentColor" d="M22 8.162v.073c0 .86 0 1.291-.207 1.643s-.584.561-1.336.98l-.793.44c.546-1.848.729-3.834.796-5.532l.01-.221l.002-.052c.651.226 1.017.395 1.245.711c.283.393.283.915.283 1.958m-20 0v.073c0 .86 0 1.291.207 1.643s.584.561 1.336.98l.794.44c-.547-1.848-.73-3.834-.797-5.532l-.01-.221l-.001-.052c-.652.226-1.018.395-1.246.711C2 6.597 2 7.12 2 8.162" /><path fill="currentColor" fillRule="evenodd" d="M16.377 2.347A26.4 26.4 0 0 0 12 2c-1.783 0-3.253.157-4.377.347c-1.139.192-1.708.288-2.184.874c-.475.586-.45 1.219-.4 2.485c.173 4.348 1.111 9.78 6.211 10.26V19.5H9.82a1 1 0 0 0-.98.804l-.19.946H6a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5h-2.65l-.19-.946a1 1 0 0 0-.98-.804h-1.43v-3.534c5.1-.48 6.039-5.911 6.211-10.26c.05-1.266.076-1.9-.4-2.485c-.476-.586-1.045-.682-2.184-.874" clipRule="evenodd" /></svg>
                                            <span className="mt-1">Top 100 by XP</span>
                                        </div>
                                    </Link>

                                    <Link href="/dashboard/top/reputation" className="group">
                                        <div
                                            onClickCapture={() => setActive("reputation")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "reputation"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "reputation" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M8.106 18.247C5.298 16.083 2 13.542 2 9.137C2 4.274 7.5.825 12 5.501V20.5c-1 0-2-.77-3.038-1.59q-.417-.326-.856-.663" clipRule="evenodd" opacity="0.5" /><path fill="currentColor" d="M15.038 18.91C17.981 16.592 22 14 22 9.138S16.5.825 12 5.501V20.5c1 0 2-.77 3.038-1.59" /></svg>
                                            <span className="mt-1">Top 100 Reputation</span>
                                        </div>
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>


                    <div
                        className="text-gray-400 cursor-pointer mt-4 flex items-center justify-between"
                        onClick={() => setIsOthers(!isOthers)}
                    >
                        <span className="text-white text-sm transition-colors font-extrabold duration-300 select-none">
                            Others
                        </span>
                        <svg
                            className={`w-4 h-4 transform transition-transform ${isOthers ? "rotate-90" : "rotate-0"
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

                    <AnimatePresence initial={false}>
                        {isOthers && (
                            <motion.div
                                key="general-section"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden "
                            >
                                <div className="flex flex-col space-y-3 py-4 gap-1 pb-4">
                                    <Link href="/dashboard/daily" className="group">
                                        <div
                                            onClickCapture={() => setActive("daily")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "daily"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "daily" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" className="w-6 h-6" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M256 104v56h56a56 56 0 1 0-56-56Zm0 0v56h-56a56 56 0 1 1 56-56Z" /><rect width="384" height="112" x="64" y="160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" rx="32" ry="32" /><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M416 272v144a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V272m160-112v304" /></svg>
                                            <span className="mt-1">Daily</span>
                                        </div>
                                    </Link>

                                    <Link href="https://top.gg/bot/1321940665667551272/vote" target="blank" className="group">
                                        <div

                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "vote"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "vote" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>


                                            <svg viewBox="120 120 580 580" className="w-6 h-6" focusable="false" > <path fill="currentColor" d="M655.711 247H330.71V572H397.113C422.599 572 447.042 561.876 465.064 543.854C483.086 525.832 493.21 501.389 493.21 475.902V409.5H559.613C585.099 409.5 609.542 399.375 627.564 381.354C645.586 363.332 655.711 338.889 655.711 313.402V247Z"></path> <path fill="currentColor" d="M144 247H306.5V409.5H193.657C180.531 409.5 167.943 404.286 158.661 395.004C149.379 385.722 144.165 373.134 144.165 360.008L144 247Z"></path></svg>
                                            <span className="mt-1">Vote</span>
                                        </div>
                                    </Link>

                                    <Link href="/dashboard/transactions" className="group">
                                        <div
                                            onClickCapture={() => setActive("transactions")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "transactions"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "transactions" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="w-5 h-5" viewBox="0 0 512 512"><path fill="currentColor" d="M32 96h320V32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9S352 236.8 352 223.8v-64L32 160c-17.7 0-32-14.3-32-32s14.3-32 32-32m448 256c17.7 0 32 14.3 32 32s-14.3 32-32 32H160v64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-96-96c-6-6-9.4-14.1-9.4-22.6s3.4-16.6 9.4-22.6l96-96c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6v64h320z" /></svg>
                                            <span className="mt-1">Corns Transactions</span>
                                        </div>
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>





                </div>

                <div className="bg-gradient-to-r z-50 fixed bottom-0  from-[#665be6] to-[#2617c9] w-72.5 md:w-73 rounded-t-3xl  p-4 flex items-center gap-3 shrink-0">
                    <div onClickCapture={() => router.push("/dashboard")} className="flex items-center gap-3 group  shrink-0 cursor-pointer">
                        <img
                            src="https://cdn.discordapp.com/avatars/618078478755037185/6eb3714acb606504d5d1e63bc98c368a.png?size=1024"
                            alt="User"
                            className="w-9 h-9 bg-white rounded-full group-hover:scale-110 transition-all duration-300 select-none"
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
