'use client'
import Navbar from "@/components/dashboard/navbar"
import Sidebar from "@/components/dashboard/sidebar"
import { useSidebar } from "@/context/userSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LogOut, LayoutDashboard } from "lucide-react"
import Image from "next/image";
import Page from "@/components/dashboard/page";
const tabs = ["All", "Anime", "Games", "Tv & Cinema", "Nature", "Others", "Owned"];

export default function ProfileStore() {
    const [active, setActive] = useState("All");
    const [items, setItems] = useState([
        {
            id: 1,
            img: "https://i.ibb.co/mCzNMwqz/acnh-bg.png",
            tag: "Anime",
            price: 20000,
            isOwned: true,
            isUsed: true,
        },
        {
            id: 2,
            img: "https://i.ibb.co/mCzNMwqz/acnh-bg.png",
            tag: "Games",
            price: 15000,
            isOwned: true,
            isUsed: false,
        },
        {
            id: 3,
            img: "https://i.ibb.co/mCzNMwqz/acnh-bg.png",
            tag: "Nature",
            price: 10000,
            isOwned: false,
            isUsed: false,
        },
        {
            id: 4,
            img: "https://i.ibb.co/mCzNMwqz/acnh-bg.png",
            tag: "Tv & Cinema",
            price: 30000,
            isOwned: false,
            isUsed: false,
        },
    ]);

    const filtered =
        active === "All"
            ? items
            : active === "Owned"
                ? items.filter((it) => it.isOwned)
                : items.filter((it) => it.tag === active);


    const handleBuy = (id) => {
        setItems(prev =>
            prev.map(it => it.id === id ? { ...it, isOwned: true } : it)
        );
    };


    const handleEquip = (id) => {
        setItems(prev =>
            prev.map(it =>
                it.id === id
                    ? { ...it, isUsed: true }
                    : { ...it, isUsed: false }
            )
        );
    };



    return (
        <Page>
            <div className="bg-[#26253a] border border-[#3a3766] px-3 py-2 rounded-lg 
                flex items-center gap-2 ml-auto mr-4 w-fit">
                <svg xmlns="http://www.w3.org/2000/svg"
                    className="w-[24px] h-[24px] text-white"
                    viewBox="0 0 24 24">
                    <g fill="none" stroke="#5e55d8" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 9h4" opacity="0.5" />
                        <path strokeWidth="1.5" d="M20.833 10h-2.602C16.446 10 15 11.343 15 13s1.447 3 3.23 3h2.603c.084 0 .125 0 .16-.002c.54-.033.97-.432 1.005-.933c.002-.032.002-.071.002-.148v-3.834c0-.077 0-.116-.002-.148c-.036-.501-.465-.9-1.005-.933c-.035-.002-.076-.002-.16-.002Z" />
                        <path strokeWidth="1.5" d="M20.965 10c-.078-1.872-.328-3.02-1.137-3.828C18.657 5 16.771 5 13 5h-3C6.229 5 4.343 5 3.172 6.172S2 9.229 2 13s0 5.657 1.172 6.828S6.229 21 10 21h3c3.771 0 5.657 0 6.828-1.172c.809-.808 1.06-1.956 1.137-3.828" />
                        <path strokeLinecap="round" strokeWidth="1.5" d="m6 5l3.735-2.477a3.24 3.24 0 0 1 3.53 0L17 5" opacity="0.5" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.991 13H18" opacity="0.5" />
                    </g>
                </svg>
                <span className="text-white font-medium mt-1">0</span>
            </div>

            <div className="w-full flex flex-col items-center">
                <div className="relative w-full border-b border-[#5b5683]">
                    <div
                        className="
        flex flex-wrap justify-center 
        gap-4 sm:gap-6 md:gap-8 
        overflow-x-auto hidden-scrollbar overflow-y-hidden
      "
                    >
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setActive(tab);
                                    console.log("Selected Tab:", tab);
                                }}
                                className={`relative py-2 sm:py-3 text-xs sm:text-sm md:text-base font-medium transition-colors whitespace-nowrap ${active === tab
                                    ? "text-white"
                                    : "text-gray-400 hover:text-gray-200"
                                    }`}
                            >
                                {tab}

                                {active === tab && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute left-0 right-0 -bottom-[1px] h-[3px] bg-[#4f39f6] rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-[3rem] mb-[3rem]">
                {filtered.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => !item.isOwned && handleBuy(item.id)}
                        className={`relative w-auto h-auto max-w-[600px] max-h-[220px] rounded-xl overflow-hidden ${item.isOwned
                                ? "border-2 border-indigo-400"
                                : "cursor-pointer hover:scale-[1.02] transition"
                            }`}
                    >
                        <img
                            src={item.img}
                            alt={`Item ${item.id}`}
                            draggable={false}
                            className="w-auto h-auto select-none object-contain"
                        />

                        <div className="absolute top-2 left-2 backdrop-blur select-none bg-white/10 text-white px-3 py-1 text-sm rounded-md shadow-md">
                            {item.isOwned ? "Owned" : `$ ${item.price}`}
                        </div>

                        {item.isOwned && (
                            <div className="absolute bottom-2 w-full flex justify-center">
                                <button
                                    onClick={() => handleEquip(item.id)}
                                    className={`px-4 py-1 rounded-md text-sm font-medium shadow-md transition-all select-none duration-300 ${item.isUsed
                                            ? "bg-indigo-500/30 backdrop-blur text-white cursor-default"
                                            : "bg-indigo-500/60 backdrop-blur text-white hover:bg-indigo-500/90 cursor-pointer"
                                        }`}
                                >
                                    {item.isUsed ? "Equipped" : "Equip"}
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </Page>
    )
}