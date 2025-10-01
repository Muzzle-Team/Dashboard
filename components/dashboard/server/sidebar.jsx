'use client'

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LogOut } from "lucide-react"

export default function Sidebar() {
    const [hovered, setHovered] = useState(null);
    const [hoveredPosition, setHoveredPosition] = useState(0);
    const items = Array.from({ length: 20 });

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
            className="fixed top-0 left-0 bottom-0 h-screen z-50 flex"
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
                        className="w-14 h-14 rounded-[50%] hover:rounded-[35%] transition-all duration-300"
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
                                className="w-14 h-14 rounded-[50%] hover:rounded-[35%] transition-all duration-300"
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
                        <div className="absolute left-[5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-[#22212f]"></div>

                        <div className="bg-[#22212f] rounded-lg px-3 py-2">
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


            <div className="h-full overflow-y-auto hidden-scrollbar w-73 bg-[#191822] mt-[40px] flex flex-col justify-between items-center py-4 relative border border-[#38364d] border-b-0 border-r-0 rounded-tl-xl">
                Sidebar

                <div className="bg-gradient-to-r  from-[#665be6] to-[#2617c9] w-73 rounded-t-xl mb-6 p-4 flex items-center gap-3 shrink-0">
      <div className="flex items-center gap-3 group  shrink-0">
      <img
        src="https://cdn.discordapp.com/avatars/1141791569574375514/9238922f80daa0b9f06855e1d5700993.png?size=1024"
        alt="User"
        className="w-9 h-9 rounded-full group-hover:scale-110 transition-all duration-300"
      />
      <div className="flex flex-col">

        <span className="text-lg font-bold text-gray-200/80 group-hover:text-white transition-all duration-300 ">@mz_n</span>
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
