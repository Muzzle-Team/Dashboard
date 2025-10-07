'use client'
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LeaderboardCorns() {
    const [sortedUsers, setSortedUsers] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const users = [
            { id: 0, name: "mazinx", icon: 'https://cdn.discordapp.com/avatars/618078478755037185/22daa8cb1def381f4928b95ac0624679.png?size=1024', corns: 1050 },
            { id: 1, name: "reno", icon: 'https://cdn.discordapp.com/avatars/618078478755037185/22daa8cb1def381f4928b95ac0624679.png?size=1024', corns: 313000 },
            { id: 2, name: "yves", icon: 'https://cdn.discordapp.com/avatars/618078478755037185/22daa8cb1def381f4928b95ac0624679.png?size=1024', corns: 3000000 },
            { id: 3, name: "ahmed", icon: 'https://cdn.discordapp.com/avatars/618078478755037185/22daa8cb1def381f4928b95ac0624679.png?size=1024', corns: 10 },
            { id: 4, name: "ifk", icon: 'https://cdn.discordapp.com/avatars/618078478755037185/22daa8cb1def381f4928b95ac0624679.png?size=1024', corns: 5 },
        ];

        const sorted = users.sort((a, b) => b.corns - a.corns).slice(0, 100);
        setSortedUsers(sorted);
    }, []);

    const getBgColor = (index) => {
        switch (index) {
            case 0: return "bg-[#967f00] border-2 border-[#e6c200] glass-shine";
            case 1: return "bg-[#005983] border-2 border-[#009de6] glass-shine";
            case 2: return "bg-[#14503c] border-2 border-[#2ea67e] glass-shine";
            default: return "bg-[#1b1922]/50  border-2 border-[#2e2b41]";
        }
    };

    const getMedal = (index) => {
        switch (index) {
            case 0: return "/assets/top1.png";
            case 1: return "/assets/top2.png";
            case 2: return "/assets/top3.png";
            default: return null;
        }
    };

    const formatNumber = (num) => {
        if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
        if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
        return num.toString();
    };
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: i * 0.05,
                duration: 0.4,
                ease: "easeOut",
            },
        }),
    };

    const animatedCount = Math.min(20, sortedUsers.length);

    return (
        <div className="flex flex-col space-y-3 w-full items-center">
            {sortedUsers.map((user, index) => (
                <motion.div
                    key={user.id}
                    className={`${getBgColor(index)} p-3 h-[4rem] items-center rounded-xl flex justify-between w-full max-w-[60rem] cursor-pointer`}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    custom={index < animatedCount ? index : 0}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <div className="flex space-x-3 text-center items-center">
                        {getMedal(index) ? (
                            <img src={getMedal(index)} className="h-12 w-12 select-none" draggable="false" />
                        ) : (
                            <div className="h-12 w-12 flex items-center justify-center text-lg font-bold text-white lolfont rounded-lg select-none">
                                #{index + 1}
                            </div>
                        )}
                        <div className="flex space-x-3 items-center">
                            <img src={user.icon} className="h-12 w-12 rounded-full select-none" draggable="false" />
                            <span className="font-bold text-xl">{user.name}</span>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <AnimatePresence mode="wait">
                            {hoveredIndex === index ? (
                                <motion.span
                                    key="full"
                                    className="font-semibold lolfont select-none"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.1 }}
                                >
                                    <AnimatedCounter value={user.corns} />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="short"
                                    className="font-semibold lolfont"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.1 }}
                                >
                                    {formatNumber(user.corns)}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

function AnimatedCounter({ value }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 800;
        const increment = value / (duration / 16);
        const interval = setInterval(() => {
            start += increment;
            if (start >= value) {
                start = value;
                clearInterval(interval);
            }
            setDisplayValue(Math.floor(start));
        }, 16);
        return () => clearInterval(interval);
    }, [value]);

    return <span>{displayValue.toLocaleString()}</span>;
}
