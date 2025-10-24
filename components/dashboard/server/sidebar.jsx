'use client'
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, LayoutDashboard, Sparkles } from "lucide-react"
import { useGuildSidebar } from "@/context/guildSidebar";
import { useState, useTransition, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname, useParams } from "next/navigation";
export default function Sidebar() {
    const {
        setIsSidebarOpen,
        isSidebarOpen,
        active,
        setActive,
        isGeneralOpen,
        setIsGeneralOpen,
        isModeration,
        setIsModeration,
        isGiveaway,
        setIsGiveawayOpen,
        isNotifications,
        setIsNotificationsOpen,
        isOthers,
        setIsOthers,
        hasAnimated,
        setHasAnimated
    } = useGuildSidebar();
    const params = useParams();
    const id = params.id;
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

        const parts = pathname.split("/");
        const afterId = parts.slice(3).join("/");

        let newActive;
        if (!afterId) {
            newActive = "overview";
        } else if (afterId.startsWith("top/")) {
            newActive = afterId.split("top/")[1];
        } else if (afterId.startsWith("store/")) {
            newActive = afterId.split("store/")[1];
        } else if (afterId.startsWith("embed/")) {
            newActive = "embed";
        } else {
            newActive = afterId;
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
            <div className="h-full overflow-y-auto hidden-scrollbar w-20 bg-[#111018] mt-[30px] flex flex-col items-center py-4 relative">
                <div
                    onClick={() => router.push("/dashboard")}
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
                        src="https://cdn.discordapp.com/avatars/618078478755037185/9d67cfd5d3ecd981548c55b5fadd6912.png?size=1024"
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
                            onClick={() => router.push(`/server/${item.id}`)}
                            className="relative z-10 group"
                            variants={itemVariants}
                            onMouseEnter={(e) => {
                                setHovered(i);
                                setHoveredPosition(e.currentTarget.getBoundingClientRect().top);
                            }}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <div className="absolute -left-[10px] top-1/2 -translate-y-1/2">
                                <div className={`w-1 bg-[#5d57a3] rounded-r-full transition-all duration-300 ${id == item.id ? 'h-10' : 'h-5 group-hover:h-10'
                                    }`}></div>
                            </div>

                            <img
                                src={item.icon}
                                alt={item.name}
                                draggable={false}
                                className={`w-14 h-14 bg-indigo-700 transition-all duration-300 cursor-pointer select-none ${id == item.id ? 'rounded-[35%]' : 'rounded-[50%] hover:rounded-[35%]'
                                    }`}
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

                        <div className="bg-[#191822] border border-[#2d2b3d] rounded-lg px-3 py-2">
                            {hovered === -1 ? (
                                <p className="font-semibold">Home</p>
                            ) : (
                                <>
                                    <p className="font-semibold">{items[hovered].name}</p>
                                    <p className="text-xs text-zinc-400">{items[hovered].members} Members</p>
                                </>
                            )}
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>


            <div className="h-full overflow-y-auto hidden-scrollbar w-73 bg-[#111018]  mt-[40px] flex flex-col justify-between items-center relative border border-[#32304d] border-b-0  rounded-r-xl sm:rounded-r-none sm:rounded-tl-xl">
                <div className="relative w-full h-[9rem] px-[5px]  ">
                    <img
                        src="https://cdn.discordapp.com/icons/1294072522219978802/12e48a18d32be277c7b1dc8a87ac00b9.png?size=80&quality=lossless"
                        className="object-cover w-full h-full "
                        alt="server icon"
                    />
                    <div className="absolute inset-0 backdrop-blur-sm bg-black/30 " />

                    <div className="absolute inset-0 flex items-center justify-center">

                        <h2 className="text-white manrope font-extrabold text-6xl drop-shadow-md">
                            {"Muzzle Support".split(" ").map(w => w[0]).join("")}
                        </h2>


                    </div>
                </div>
                <div className="mb-[6rem] w-[16rem]">






                    <div
                        className="text-gray-400 cursor-pointer mt-4 flex items-center  justify-between"
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
                                <div className="flex flex-col space-y-1 py-4 gap-1 pb-4">
                                    <Link href={`/server/${id}`} className="group">
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

                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="w-6.5 h-6.5" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.557 2.75H4.682A1.93 1.93 0 0 0 2.75 4.682v3.875a1.94 1.94 0 0 0 1.932 1.942h3.875a1.94 1.94 0 0 0 1.942-1.942V4.682A1.94 1.94 0 0 0 8.557 2.75m10.761 0h-3.875a1.94 1.94 0 0 0-1.942 1.932v3.875a1.943 1.943 0 0 0 1.942 1.942h3.875a1.94 1.94 0 0 0 1.932-1.942V4.682a1.93 1.93 0 0 0-1.932-1.932M8.557 13.5H4.682a1.943 1.943 0 0 0-1.932 1.943v3.875a1.93 1.93 0 0 0 1.932 1.932h3.875a1.94 1.94 0 0 0 1.942-1.932v-3.875a1.94 1.94 0 0 0-1.942-1.942m8.818-.001a3.875 3.875 0 1 0 0 7.75a3.875 3.875 0 0 0 0-7.75" /></svg>
                                            <span className="mt-1">Overview</span>
                                        </div>
                                    </Link>

                                    <Link href={`/server/${id}/settings`} className="group">
                                        <div
                                            onClickCapture={() => setActive("settings")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "settings"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "settings" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                                <g fill="none" stroke="currentColor" strokeWidth={2}>
                                                    <path d="M16.308 4.384c-.59 0-.886 0-1.155-.1l-.111-.046c-.261-.12-.47-.328-.888-.746c-.962-.962-1.443-1.443-2.034-1.488a2 2 0 0 0-.24 0c-.591.045-1.072.526-2.034 1.488c-.418.418-.627.627-.888.746l-.11.046c-.27.1-.565.1-1.156.1h-.11c-1.507 0-2.261 0-2.73.468s-.468 1.223-.468 2.73v.11c0 .59 0 .886-.1 1.155q-.022.057-.046.111c-.12.261-.328.47-.746.888c-.962.962-1.443 1.443-1.488 2.034a2 2 0 0 0 0 .24c.045.591.526 1.072 1.488 2.034c.418.418.627.627.746.888q.025.054.046.11c.1.27.1.565.1 1.156v.11c0 1.507 0 2.261.468 2.73s1.223.468 2.73.468h.11c.59 0 .886 0 1.155.1q.057.021.111.046c.261.12.47.328.888.746c.962.962 1.443 1.443 2.034 1.488q.12.009.24 0c.591-.045 1.072-.526 2.034-1.488c.418-.418.627-.626.888-.746q.054-.025.11-.046c.27-.1.565-.1 1.156-.1h.11c1.507 0 2.261 0 2.73-.468s.468-1.223.468-2.73v-.11c0-.59 0-.886.1-1.155q.021-.057.046-.111c.12-.261.328-.47.746-.888c.962-.962 1.443-1.443 1.488-2.034q.009-.12 0-.24c-.045-.591-.526-1.072-1.488-2.034c-.418-.418-.626-.627-.746-.888l-.046-.11c-.1-.27-.1-.565-.1-1.156v-.11c0-1.507 0-2.261-.468-2.73s-1.223-.468-2.73-.468z"></path>
                                                    <path d="M15.5 12a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0Z"></path>
                                                </g>
                                            </svg>
                                            <span className="mt-1">General Settings</span>
                                        </div>
                                    </Link>


                                    <Link href={`/server/${id}/embed`} className="group">
                                        <div
                                            onClickCapture={() => setActive("embed")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "embed"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "embed" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9h8m-8 4h6m4-9a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z"></path>
                                            </svg>
                                            <span className="mt-1">Embed Messages</span>
                                        </div>
                                    </Link>


                                    <Link href={`/server/${id}/premium`} className="group">
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

                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6.5 h-6.5" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M13 10a.75.75 0 0 1 .725.556a2.37 2.37 0 0 0 1.72 1.72a.75.75 0 0 1 0 1.449a2.37 2.37 0 0 0-1.72 1.72a.75.75 0 0 1-1.45 0a2.37 2.37 0 0 0-1.72-1.72a.75.75 0 0 1 0-1.45a2.37 2.37 0 0 0 1.72-1.72l.043-.117A.75.75 0 0 1 13 10M7 0a1 1 0 0 1 .986.836c.279 1.67.815 2.8 1.596 3.582c.781.781 1.912 1.317 3.582 1.596a1 1 0 0 1 0 1.972c-1.67.279-2.8.815-3.582 1.596c-.781.781-1.317 1.912-1.596 3.582a1 1 0 0 1-1.972 0c-.279-1.67-.815-2.8-1.596-3.582c-.781-.781-1.912-1.317-3.582-1.596a1 1 0 0 1 0-1.972c1.67-.279 2.8-.815 3.582-1.596c.781-.781 1.317-1.912 1.596-3.582l.018-.089A1 1 0 0 1 7 0" /></svg>
                                            <span className="mt-1">Manage Subscriptions</span>
                                        </div>
                                    </Link>


                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>





                    <div
                        className="text-gray-400 cursor-pointer mt-4 flex items-center  justify-between"
                        onClick={() => setIsModeration(!isModeration)}
                    >
                        <span className="text-white text-sm transition-colors font-extrabold duration-300 select-none">
                            MODERATION SETTINGS
                        </span>
                        <svg
                            className={`w-4 h-4 transform transition-transform ${isModeration ? "rotate-90" : "rotate-0"
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
                        {isModeration && (
                            <motion.div
                                key="general-section"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="flex flex-col space-y-1 py-4 gap-1 pb-4">

                                    <Link href={`/server/${id}/welcomer`} className="group">
                                        <div
                                            onClickCapture={() => setActive("welcomer")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "welcomer"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "welcomer" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M7.03 4.95L3.5 8.5c-3.33 3.31-3.33 8.69 0 12s8.69 3.33 12 0l6-6c1-.97 1-2.56 0-3.54c-.1-.12-.23-.23-.37-.32l.37-.39c1-.97 1-2.56 0-3.54c-.14-.16-.33-.3-.5-.41c.38-.92.21-2.02-.54-2.77c-.87-.87-2.22-.96-3.2-.28a2.517 2.517 0 0 0-3.88-.42l-2.51 2.51c-.09-.14-.2-.27-.32-.39a2.53 2.53 0 0 0-3.52 0m1.41 1.42c.2-.2.51-.2.71 0s.2.51 0 .71l-3.18 3.18a3 3 0 0 1 0 4.24l1.41 1.41a5 5 0 0 0 1.12-5.36l6.3-6.3c.2-.2.51-.2.7 0s.21.51 0 .71l-4.59 4.6l1.41 1.41l6.01-6.01c.2-.2.51-.2.71 0s.2.51 0 .71l-6.01 6.01l1.41 1.41l4.95-4.95c.2-.2.51-.2.71 0s.2.51 0 .71l-5.66 5.65l1.41 1.42l3.54-3.54c.2-.2.51-.2.71 0s.2.51 0 .71l-6 6.01c-2.54 2.54-6.65 2.54-9.19 0s-2.54-6.65 0-9.19zM23 17c0 3.31-2.69 6-6 6v-1.5c2.5 0 4.5-2 4.5-4.5zM1 7c0-3.31 2.69-6 6-6v1.5c-2.5 0-4.5 2-4.5 4.5z"></path>
                                            </svg>                             <span className="mt-1">Welcome & Goodbye</span>
                                        </div>
                                    </Link>


                                    <Link href={`/server/${id}/automod`} className="group">
                                        <div
                                            onClickCapture={() => setActive("automod")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "automod"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "automod" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M7.604 4.604C9.34 2.868 10.208 2 11.286 2c1.079 0 1.947.868 3.682 2.604l4.42 4.419c1.735 1.735 2.603 2.603 2.603 3.682s-.868 1.946-2.604 3.682s-2.604 2.604-3.682 2.604c-1.079 0-1.947-.868-3.682-2.604l-4.42-4.419C5.869 10.233 5 9.365 5 8.286s.868-1.946 2.604-3.682m-.32 9.166l-4.458 4.458c-.343.343-.514.514-.617.692a1.56 1.56 0 0 0 0 1.562c.103.178.274.35.617.692s.513.514.692.617a1.56 1.56 0 0 0 1.562 0c.178-.103.35-.275.692-.617l4.458-4.458z"></path>
                                                <path fill="currentColor" d="m8.345 12.71l.004-.005l2.946 2.946l-.005.004zm11.324-5.527a1.56 1.56 0 0 0-.024-1.52c-.103-.178-.275-.349-.617-.691c-.342-.343-.514-.514-.692-.617a1.56 1.56 0 0 0-1.519-.024z"></path>
                                            </svg>
                                            <span className="mt-1">Automod</span>
                                        </div>
                                    </Link>


                                    <Link href={`/server/${id}/autoresponder`} className="group">
                                        <div
                                            onClickCapture={() => setActive("autoresponder")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "autoresponder"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "autoresponder" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9h8m-8 4h6m-1 5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6m-5 9l5-5m0 4.5V17h-4.5"></path>
                                            </svg>
                                            <span className="mt-1">Auto Responder</span>
                                        </div>
                                    </Link>


                                    <Link href={`/server/${id}/leveling`} className="group">
                                        <div
                                            onClickCapture={() => setActive("leveling")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "leveling"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "leveling" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M22 8.162v.073c0 .86 0 1.291-.207 1.643s-.584.561-1.336.98l-.793.44c.546-1.848.729-3.834.796-5.532l.01-.221l.002-.052c.651.226 1.017.395 1.245.711c.283.393.283.915.283 1.958m-20 0v.073c0 .86 0 1.291.207 1.643s.584.561 1.336.98l.794.44c-.547-1.848-.73-3.834-.797-5.532l-.01-.221l-.001-.052c-.652.226-1.018.395-1.246.711C2 6.597 2 7.12 2 8.162"></path>
                                                <path fill="currentColor" fillRule="evenodd" d="M16.377 2.347A26.4 26.4 0 0 0 12 2c-1.783 0-3.253.157-4.377.347c-1.139.192-1.708.288-2.184.874c-.475.586-.45 1.219-.4 2.485c.173 4.348 1.111 9.78 6.211 10.26V19.5H9.82a1 1 0 0 0-.98.804l-.19.946H6a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5h-2.65l-.19-.946a1 1 0 0 0-.98-.804h-1.43v-3.534c5.1-.48 6.039-5.911 6.211-10.26c.05-1.266.076-1.9-.4-2.485c-.476-.586-1.045-.682-2.184-.874" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="mt-1">Leveling System</span>
                                        </div>
                                    </Link>

                                    <Link href={`/server/${id}/autoroles`} className="group">
                                        <div
                                            onClickCapture={() => setActive("autoroles")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "autoroles"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "autoroles" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width={512} height={512} className="w-6.5 h-6.5" viewBox="0 0 512 512">
                                                <path fill="currentColor" d="M256 256c-13.47 0-26.94-2.39-37.44-7.17l-148-67.49C63.79 178.26 48 169.25 48 152.24s15.79-26 22.58-29.12l149.28-68.07c20.57-9.4 51.61-9.4 72.19 0l149.37 68.07c6.79 3.09 22.58 12.1 22.58 29.12s-15.79 26-22.58 29.11l-148 67.48C282.94 253.61 269.47 256 256 256m176.76-100.86"></path>
                                                <path fill="currentColor" d="M441.36 226.81L426.27 220l-38.77 17.74l-94 43c-10.5 4.8-24 7.19-37.44 7.19s-26.93-2.39-37.42-7.19l-94.07-43L85.79 220l-15.22 6.84C63.79 229.93 48 239 48 256s15.79 26.08 22.56 29.17l148 67.63C229 357.6 242.49 360 256 360s26.94-2.4 37.44-7.19l147.87-67.61c6.81-3.09 22.69-12.11 22.69-29.2s-15.77-26.07-22.64-29.19"></path>
                                                <path fill="currentColor" d="m441.36 330.8l-15.09-6.8l-38.77 17.73l-94 42.95c-10.5 4.78-24 7.18-37.44 7.18s-26.93-2.39-37.42-7.18l-94.07-43L85.79 324l-15.22 6.84C63.79 333.93 48 343 48 360s15.79 26.07 22.56 29.15l148 67.59C229 461.52 242.54 464 256 464s26.88-2.48 37.38-7.27l147.92-67.57c6.82-3.08 22.7-12.1 22.7-29.16s-15.77-26.07-22.64-29.2"></path>
                                            </svg>
                                            <span className="mt-1">Auto Roles</span>
                                        </div>
                                    </Link>

                                    <Link href={`/server/${id}/auditlogs`} className="group">
                                        <div
                                            onClickCapture={() => setActive("auditlogs")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "auditlogs"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "auditlogs" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-7.5 h-6.5" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M11.11 4.049a1 1 0 1 0-.22-1.988C5.888 2.614 2 6.852 2 12c0 5.523 4.477 10 10 10c5.146 0 9.383-3.887 9.939-8.885a1 1 0 0 0-1.988-.221A8.001 8.001 0 0 1 4 12a8 8 0 0 1 7.11-7.951m3.657-1.658a1 1 0 0 0-.54 1.925q.432.122.842.29a1 1 0 0 0 .757-1.852a10 10 0 0 0-1.059-.363m2.582 2.3a1 1 0 0 1 1.413-.06q.318.291.609.608a1 1 0 0 1-1.474 1.352a8 8 0 0 0-.486-.486a1 1 0 0 1-.062-1.413M11 6a1 1 0 0 1 1 1v5h3a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1m8.94 1.623a1 1 0 0 1 1.304.547a10 10 0 0 1 .365 1.063a1 1 0 1 1-1.925.54a8 8 0 0 0-.291-.846a1 1 0 0 1 .546-1.304"></path>
                                            </svg>
                                            <span className="mt-1">Audit Logs</span>
                                        </div>
                                    </Link>

                                    <Link href={`/server/${id}/colors`} className="group">
                                        <div
                                            onClickCapture={() => setActive("colors")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "colors"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "colors" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M12 22A10 10 0 0 1 2 12A10 10 0 0 1 12 2c5.5 0 10 4 10 9a6 6 0 0 1-6 6h-1.8c-.3 0-.5.2-.5.5c0 .1.1.2.1.3c.4.5.6 1.1.6 1.7c.1 1.4-1 2.5-2.4 2.5m0-18a8 8 0 0 0-8 8a8 8 0 0 0 8 8c.3 0 .5-.2.5-.5c0-.2-.1-.3-.1-.4c-.4-.5-.6-1-.6-1.6c0-1.4 1.1-2.5 2.5-2.5H16a4 4 0 0 0 4-4c0-3.9-3.6-7-8-7m-5.5 6c.8 0 1.5.7 1.5 1.5S7.3 13 6.5 13S5 12.3 5 11.5S5.7 10 6.5 10m3-4c.8 0 1.5.7 1.5 1.5S10.3 9 9.5 9S8 8.3 8 7.5S8.7 6 9.5 6m5 0c.8 0 1.5.7 1.5 1.5S15.3 9 14.5 9S13 8.3 13 7.5S13.7 6 14.5 6m3 4c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5"></path>
                                            </svg>
                                            <span className="mt-1">Colors</span>
                                        </div>
                                    </Link>

                                    <Link href={`/server/${id}/reactionroles`} className="group">
                                        <div
                                            onClickCapture={() => setActive("reactionroles")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "reactionroles"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "reactionroles" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10"></path>
                                                    <path d="M16.5 14.5s-1.5 2-4.5 2s-4.5-2-4.5-2"></path>
                                                    <path fill="currentColor" d="M15.5 9a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1m-7 0a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1"></path>
                                                </g>
                                            </svg>
                                            <span className="mt-1">Reaction Roles</span>
                                        </div>
                                    </Link>

                                    <Link href={`/server/${id}/tempchannels`} className="group">
                                        <div
                                            onClickCapture={() => setActive("tempchannels")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "tempchannels"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "tempchannels" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                                <g fill="none">
                                                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                                                    <path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m0 2a1 1 0 0 1 .993.883L13 7v4.586l2.707 2.707a1 1 0 0 1-1.32 1.497l-.094-.083l-3-3a1 1 0 0 1-.284-.576L11 12V7a1 1 0 0 1 1-1"></path>
                                                </g>
                                            </svg>
                                            <span className="mt-1">Temporary Channels</span>
                                        </div>
                                    </Link>

                                    <Link href={`/server/${id}/ticket`} className="group">
                                        <div
                                            onClickCapture={() => setActive("ticket")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "ticket"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "ticket" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                                <g fill="none">
                                                    <path stroke="currentColor" strokeWidth={2} d="M14 11a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0z"></path>
                                                    <path fill="currentColor" d="m14.008 19.003l-.75-.002zM14.014 17l.75.002V17zM3.15 18.828l-.53.531zm0-13.656l-.53-.531zm-.197 5.082l-.366.655zm-.942-1.265l-.75-.031zm.942 4.757l-.366-.655zm-.942 1.265l.749-.032zm19.036-4.757l.366.655zm.942-1.265l.75-.031zM20.85 5.172l.53-.531zm.197 8.574l-.366.655zm.942 1.265l.75.031zm-1.139 3.817l.53.531zm1.094-4.496l.654-.366zm0-4.664l.654.366zM2.056 14.332l-.654-.366zm0-4.664l.655-.366zM14.014 7h.75v-.002zm-.008-2.501l-.75.002zm2.522-.48l.02-.75zm.506 15.945l.031.75zm-3.174-.11l-.53-.531zm.898-.849l.006-2.003l-1.5-.004L13.258 19zm.258-2.255c.141 0 .253.114.253.25h1.5c0-.968-.787-1.75-1.753-1.75zm0-1.5c-.966 0-1.752.782-1.752 1.75h1.5c0-.136.111-.25.252-.25zM9.995 4.75h3.51v-1.5h-3.51zm3.013 14.5H9.995v1.5h3.013zm-3.013 0c-1.911 0-3.27-.002-4.3-.14c-1.01-.135-1.591-.389-2.016-.813L2.62 19.36c.75.748 1.702 1.08 2.876 1.238c1.154.155 2.63.153 4.5.153zm0-16c-1.87 0-3.346-.002-4.5.153c-1.174.158-2.125.49-2.875 1.238l1.06 1.062c.424-.424 1.006-.678 2.015-.813c1.03-.138 2.389-.14 4.3-.14zm-7.408 7.659c.386.215.643.624.643 1.091h1.5a2.75 2.75 0 0 0-1.41-2.401zM2.76 9.02c.078-1.856.331-2.732.92-3.318L2.62 4.64C1.59 5.668 1.34 7.08 1.26 8.958zM3.23 12c0 .467-.257.876-.643 1.092l.732 1.31A2.75 2.75 0 0 0 4.73 12zm-1.969 3.042c.08 1.876.33 3.29 1.359 4.317l1.06-1.062c-.589-.586-.842-1.462-.92-3.318zM20.77 12c0-.467.257-.876.643-1.091l-.732-1.31A2.75 2.75 0 0 0 19.27 12zm1.969-3.042c-.08-1.876-.33-3.29-1.359-4.317l-1.06 1.062c.588.586.842 1.462.92 3.318zm-1.326 4.134A1.25 1.25 0 0 1 20.77 12h-1.5c0 1.034.571 1.932 1.411 2.401zm-.173 1.887c-.078 1.856-.331 2.732-.92 3.318l1.06 1.062c1.03-1.027 1.28-2.44 1.359-4.317zm-.559-.578c.284.159.47.263.595.342c.062.039.09.06.098.066c.014.012-.037-.024-.085-.11l1.31-.733a1.1 1.1 0 0 0-.269-.312a2.4 2.4 0 0 0-.254-.18c-.167-.106-.396-.233-.663-.383zm2.058.641c.007-.171.015-.348.009-.496a1.3 1.3 0 0 0-.15-.58l-1.309.732c-.05-.09-.043-.152-.04-.086q.002.04 0 .134l-.009.233zm-1.326-4.133c.267-.15.496-.277.663-.383a3 3 0 0 0 .254-.18a1.1 1.1 0 0 0 .268-.312l-1.309-.732c.048-.087.099-.123.084-.111a1 1 0 0 1-.097.066c-.125.08-.31.183-.595.342zM21.24 9.02l.009.233q.002.094 0 .134c-.003.066-.01.004.04-.086l1.31.732a1.3 1.3 0 0 0 .149-.58a6 6 0 0 0-.01-.496zM2.587 13.09c-.267.15-.496.277-.663.383a2.4 2.4 0 0 0-.254.18a1.1 1.1 0 0 0-.268.312l1.309.732c-.048.087-.099.123-.085.111c.009-.007.036-.027.098-.066c.125-.08.31-.183.595-.342zm.173 1.888l-.009-.233a2 2 0 0 1 0-.134c.003-.066.01-.004-.04.086l-1.31-.732a1.3 1.3 0 0 0-.149.58c-.006.148.002.325.01.496zm.559-5.38c-.284-.159-.47-.263-.595-.342a1 1 0 0 1-.098-.066c-.014-.012.037.024.085.11l-1.31.733c.084.148.195.25.269.312c.08.066.169.126.254.18c.167.106.396.233.663.383zm-2.059-.64c-.007.171-.015.348-.009.496c.007.15.03.367.15.58l1.309-.732c.05.09.043.152.04.086a2 2 0 0 1 0-.134l.009-.233zm13.503-1.96l-.008-2.502l-1.5.005l.008 2.501zm.252.252a.25.25 0 0 1-.252-.25h-1.5c0 .968.786 1.75 1.752 1.75zM15.27 7c0 .136-.112.25-.253.25v1.5c.966 0 1.753-.782 1.753-1.75zm0-2.484V7h1.5V4.516zm1.24.253c2.188.056 3.169.292 3.812.934l1.06-1.062c-1.113-1.11-2.687-1.316-4.834-1.372zm.26-.253c0 .14-.116.256-.26.253l.038-1.5a1.247 1.247 0 0 0-1.278 1.247zm-3.264.234a.25.25 0 0 1-.249-.25l1.5-.004a1.25 1.25 0 0 0-1.25-1.246zm3.56 15.964c1.875-.08 3.288-.33 4.315-1.355l-1.06-1.062c-.586.586-1.464.84-3.318.918zM15.27 17v1.977h1.5V17zm-2.011 2c0 .121 0 .214-.003.293c-.002.08-.006.126-.01.155s-.005.019.006-.01a.4.4 0 0 1 .079-.115l1.059 1.062a1.24 1.24 0 0 0 .342-.733c.027-.197.026-.433.027-.647zm-.25 1.75c.214 0 .45.002.647-.025c.219-.03.498-.105.734-.34l-1.06-1.062a.4.4 0 0 1 .117-.078c.028-.012.038-.01.01-.007a2 2 0 0 1-.156.01c-.08.002-.172.002-.292.002zm3.994-1.535c-.12.005-.213.009-.292.01s-.125 0-.152-.003s-.015-.005.015.007c.037.014.08.04.119.076l-1.038 1.083c.244.234.529.304.757.326c.202.02.44.009.654 0zm-1.733-.238c0 .218-.002.46.026.663c.031.226.112.511.359.748l1.038-1.083c.04.038.066.081.082.117c.012.03.01.04.007.012a2 2 0 0 1-.01-.159c-.002-.08-.002-.175-.002-.298z"></path>
                                                </g>
                                            </svg>
                                            <span className="mt-1">Ticket</span>
                                        </div>
                                    </Link>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>


                    <div
                        className="text-gray-400 mt-4 cursor-pointer flex items-center  justify-between"
                        onClick={() => setIsGiveawayOpen(!isGiveaway)}
                    >
                        <span className="text-white text-sm transition-colors font-extrabold duration-300 select-none">
                            GIVEAWAYS
                        </span>
                        <svg
                            className={`w-4 h-4 transform transition-transform ${isGiveaway ? "rotate-90" : "rotate-0"
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
                        {isGiveaway && (
                            <motion.div
                                key="general-section"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="flex flex-col space-y-1 py-4 gap-1 pb-4">

                                    <Link href={`/server/${id}/gsettings`} className="group">
                                        <div
                                            onClickCapture={() => setActive("gsettings")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "gsettings"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "gsettings" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                                <g fill="none" stroke="currentColor" strokeWidth={2}>
                                                    <path d="M16.308 4.384c-.59 0-.886 0-1.155-.1l-.111-.046c-.261-.12-.47-.328-.888-.746c-.962-.962-1.443-1.443-2.034-1.488a2 2 0 0 0-.24 0c-.591.045-1.072.526-2.034 1.488c-.418.418-.627.627-.888.746l-.11.046c-.27.1-.565.1-1.156.1h-.11c-1.507 0-2.261 0-2.73.468s-.468 1.223-.468 2.73v.11c0 .59 0 .886-.1 1.155q-.022.057-.046.111c-.12.261-.328.47-.746.888c-.962.962-1.443 1.443-1.488 2.034a2 2 0 0 0 0 .24c.045.591.526 1.072 1.488 2.034c.418.418.627.627.746.888q.025.054.046.11c.1.27.1.565.1 1.156v.11c0 1.507 0 2.261.468 2.73s1.223.468 2.73.468h.11c.59 0 .886 0 1.155.1q.057.021.111.046c.261.12.47.328.888.746c.962.962 1.443 1.443 2.034 1.488q.12.009.24 0c.591-.045 1.072-.526 2.034-1.488c.418-.418.627-.626.888-.746q.054-.025.11-.046c.27-.1.565-.1 1.156-.1h.11c1.507 0 2.261 0 2.73-.468s.468-1.223.468-2.73v-.11c0-.59 0-.886.1-1.155q.021-.057.046-.111c.12-.261.328-.47.746-.888c.962-.962 1.443-1.443 1.488-2.034q.009-.12 0-.24c-.045-.591-.526-1.072-1.488-2.034c-.418-.418-.626-.627-.746-.888l-.046-.11c-.1-.27-.1-.565-.1-1.156v-.11c0-1.507 0-2.261-.468-2.73s-1.223-.468-2.73-.468z"></path>
                                                    <path d="M15.5 12a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0Z"></path>
                                                </g>
                                            </svg>
                                            <span className="mt-1">Giveaway Settings</span>
                                        </div>
                                    </Link>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>


                    <div
                        className="text-gray-400 mt-4 cursor-pointer flex items-center  justify-between"
                        onClick={() => setIsNotificationsOpen(!isNotifications)}
                    >
                        <span className="text-white uppercase text-sm transition-colors font-extrabold duration-300 select-none">
                            Notifications
                        </span>
                        <svg
                            className={`w-4 h-4 transform transition-transform ${isNotifications ? "rotate-90" : "rotate-0"
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
                        {isNotifications && (
                            <motion.div
                                key="general-section"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="flex flex-col space-y-1 py-4 gap-1 pb-4">

                                    <Link href={`/server/${id}/youtube`} className="group">
                                        <div
                                            onClickCapture={() => setActive("youtube")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "youtube"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "youtube" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73"></path>
                                            </svg>
                                            <span className="mt-1">Youtube</span>
                                        </div>
                                    </Link>

                                    <Link href={`/server/${id}/twitch`} className="group">
                                        <div
                                            onClickCapture={() => setActive("twitch")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "twitch"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "twitch" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"></path>
                                            </svg>
                                            <span className="mt-1">Twitch</span>
                                        </div>
                                    </Link>



                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>


                    <div
                        className="text-gray-400 mt-4 cursor-pointer flex items-center  justify-between"
                        onClick={() => setIsOthers(!isOthers)}
                    >
                        <span className="text-white uppercase text-sm transition-colors font-extrabold duration-300 select-none">
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
                                className="overflow-hidden"
                            >
                                <div className="flex flex-col space-y-1 py-4 gap-1 pb-4">

                                    <Link href={`/server/${id}/youtube`} className="group">
                                        <div
                                            onClickCapture={() => setActive("youtube")}
                                            className={`relative flex items-center gap-2 h-[3rem] py-2 pl-5 pr-4 rounded-md transition
              ${active === "youtube"
                                                    ? "bg-indigo-500/50 text-white"
                                                    : "text-gray-400 hover:bg-indigo-500/20 hover:text-white"
                                                }
            `}
                                        >
                                            <span
                                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-[4px] rounded-l-none rounded-md bg-indigo-500 transition-all duration-300
                ${active === "youtube" ? "h-7" : "h-0 group-hover:h-7"}
              `}
                                            ></span>

                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                                                    <path d="M17 12h-2l-2 5l-2-10l-2 5H7"></path>
                                                    <path d="M3 12c0-4.243 0-6.364 1.318-7.682S7.758 3 12 3s6.364 0 7.682 1.318S21 7.758 21 12s0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12"></path>
                                                </g>
                                            </svg>
                                            <span className="mt-1">Dashboard Logs</span>
                                        </div>
                                    </Link>





                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>




                </div>

                <div className=" z-50 fixed bottom-0  border-[#383853] bg-gradient-to-b from-[#3a374e] to-[#13131a] w-72.5 md:w-73 rounded-t-3xl  p-4 flex items-center gap-3 shrink-0">
                    <div onClickCapture={() => router.push("/dashboard")} className="flex items-center gap-3 group  shrink-0 cursor-pointer">
                        <img
                            src="https://cdn.discordapp.com/avatars/618078478755037185/9d67cfd5d3ecd981548c55b5fadd6912.png?size=1024"
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
