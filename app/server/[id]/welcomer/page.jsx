'use client'
import Page from "@/components/dashboard/server/page";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Stage, Layer, Image as KonvaImage, Text, Transformer, Rect } from 'react-konva';
import { HexColorPicker } from "react-colorful";

export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState("");
    const [lopen, setlOpen] = useState(false);
    const [lsearch, setlSearch] = useState("");
    const [lselected, setlSelected] = useState("");
    const [messageEnabled, setMessageEnabled] = useState(false);
    const [messageLeaveEnabled, setMessageLeaveEnabled] = useState(false);
    const [imgEnabled, setImgEnabled] = useState(false);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showWelcomeColorPicker, setShowWelcomeColorPicker] = useState(false);
    const dropdownRef = useRef(null);
    const ldropdownRef = useRef(null);

    // Canvas refs
    const stageRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);
    const welcomeRef = useRef(null);
    const imageTrRef = useRef(null);
    const textTrRef = useRef(null);
    const welcomeTrRef = useRef(null);

    // Canvas states
    const [imageObj, setImageObj] = useState(null);
    const [bgImage, setBgImage] = useState(null);
    const [activeTab, setActiveTab] = useState('image');
    const [selectedItem, setSelectedItem] = useState('image');

    const [imagePos, setImagePos] = useState({ x: 69, y: 99 });
    const [imageSize, setImageSize] = useState({ width: 100, height: 100 });
    const [imageRadius, setImageRadius] = useState(50);

    const [textPos, setTextPos] = useState({ x: 209, y: 152 });
    const [textSize, setTextSize] = useState({ fontSize: 33.124447086818506 });
    const [textColor, setTextColor] = useState('#ffffff');
    const username = 'username';

    const [welcomePos, setWelcomePos] = useState({ x: 180, y: 100 });
    const [welcomeSize, setWelcomeSize] = useState({ fontSize: 32 });
    const [welcomeColor, setWelcomeColor] = useState('#ffffff');
    const [welcomeText, setWelcomeText] = useState('Welcome to server');

    const [bgUrl, setBgUrl] = useState('');
    const [canvasSize, setCanvasSize] = useState({ width: 500, height: 300 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getIndicatorStyle = () => {
        if (isMobile) {
            // موبايل (2 فوق + 2 تحت)
            return {
                top:
                    activeTab === "image" || activeTab === "username"
                        ? "0.25rem"
                        : "calc(50% + 0.25rem)",
                left:
                    activeTab === "image" || activeTab === "welcome"
                        ? "0.25rem"
                        : "calc(50% + 0.25rem)",
                width: "calc(50% - 0.5rem)",
                height: "calc(50% - 0.5rem)",
            };
        } else {
            // ديسكتوب (كلهم صف واحد)
            return {
                top: "0.25rem",
                bottom: "0.25rem",
                height: "auto",
                left:
                    activeTab === "image"
                        ? "0.25rem"
                        : activeTab === "username"
                            ? "calc(25% + 0.25rem)"
                            : activeTab === "welcome"
                                ? "calc(50% + 0.25rem)"
                                : "calc(75% + 0.25rem)",
                width: "calc(25% - 0.5rem)",
            };
        }
    };

    const channels = [
        "welcome-logs",
        "general",
        "member-joins",
        "bot-commands",
        "mod-logs",
        "audit-channel"
    ];


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

    const filtered = channels.filter(ch =>
        ch.toLowerCase().includes(search.toLowerCase())
    );
    const lfiltered = channels.filter(ch =>
        ch.toLowerCase().includes(search.toLowerCase())
    );
    // Load default avatar image
    useEffect(() => {
        const img = new window.Image();
        img.src = 'https://cdn.discordapp.com/embed/avatars/0.png';
        img.crossOrigin = 'Anonymous';
        img.onload = () => setImageObj(img);
    }, []);

    // Handle background image resize
    useEffect(() => {
        if (bgImage) {
            const maxWidth = 800;
            const maxHeight = 500;
            let newWidth = bgImage.width;
            let newHeight = bgImage.height;

            if (newWidth > maxWidth || newHeight > maxHeight) {
                const ratio = Math.min(maxWidth / newWidth, maxHeight / newHeight);
                newWidth = newWidth * ratio;
                newHeight = newHeight * ratio;
            }

            setCanvasSize({ width: newWidth, height: newHeight });

            const centerX = newWidth / 2;
            const centerY = newHeight / 2;

            setWelcomePos({ x: Math.max(0, centerX - 100), y: Math.max(0, centerY * 0.2) });
            setImagePos({ x: Math.max(0, centerX - imageSize.width / 2), y: Math.max(0, centerY - imageSize.height / 2) });
            setTextPos({ x: Math.max(0, centerX - 50), y: Math.max(0, centerY + imageSize.height / 2 + 10) });
        } else {
            setCanvasSize({ width: 500, height: 300 });
        }
    }, [bgImage]);

    // Handle transformer selection
    useEffect(() => {
        if (imageTrRef.current) imageTrRef.current.nodes([]);
        if (textTrRef.current) textTrRef.current.nodes([]);
        if (welcomeTrRef.current) welcomeTrRef.current.nodes([]);

        const updateTransformer = (ref, node) => {
            if (ref.current && node) {
                ref.current.nodes([node]);
                ref.current.getLayer().batchDraw();
            }
        };

        if (selectedItem === 'image') updateTransformer(imageTrRef, imageRef.current);
        else if (selectedItem === 'username') updateTransformer(textTrRef, textRef.current);
        else if (selectedItem === 'welcome') updateTransformer(welcomeTrRef, welcomeRef.current);
    }, [selectedItem, imageRef.current, textRef.current, welcomeRef.current]);


    // Handle dropdown outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const loadBackground = () => {
        if (!bgUrl.trim()) {
            setBgImage(null);
            return;
        }
        const bg = new window.Image();
        bg.src = bgUrl;
        bg.crossOrigin = 'Anonymous';
        bg.onload = () => setBgImage(bg);
    };

    const handleSend = () => {
        console.log('Background:', bgImage ? { width: canvasSize.width, height: canvasSize.height, url: bgUrl } : 'No background');
        console.log('Image:', { ...imagePos, ...imageSize, imageRadius });
        console.log('Text:', { ...textPos, ...textSize, color: textColor });
        console.log('Welcome:', { ...welcomePos, ...welcomeSize, color: welcomeColor, text: welcomeText });
    };

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <h2 className="text-white flex space-x-2 font-medium text-lg md:text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M7.03 4.95L3.5 8.5c-3.33 3.31-3.33 8.69 0 12s8.69 3.33 12 0l6-6c1-.97 1-2.56 0-3.54c-.1-.12-.23-.23-.37-.32l.37-.39c1-.97 1-2.56 0-3.54c-.14-.16-.33-.3-.5-.41c.38-.92.21-2.02-.54-2.77c-.87-.87-2.22-.96-3.2-.28a2.517 2.517 0 0 0-3.88-.42l-2.51 2.51c-.09-.14-.2-.27-.32-.39a2.53 2.53 0 0 0-3.52 0m1.41 1.42c.2-.2.51-.2.71 0s.2.51 0 .71l-3.18 3.18a3 3 0 0 1 0 4.24l1.41 1.41a5 5 0 0 0 1.12-5.36l6.3-6.3c.2-.2.51-.2.7 0s.21.51 0 .71l-4.59 4.6l1.41 1.41l6.01-6.01c.2-.2.51-.2.71 0s.2.51 0 .71l-6.01 6.01l1.41 1.41l4.95-4.95c.2-.2.51-.2.71 0s.2.51 0 .71l-5.66 5.65l1.41 1.42l3.54-3.54c.2-.2.51-.2.71 0s.2.51 0 .71l-6 6.01c-2.54 2.54-6.65 2.54-9.19 0s-2.54-6.65 0-9.19zM23 17c0 3.31-2.69 6-6 6v-1.5c2.5 0 4.5-2 4.5-4.5zM1 7c0-3.31 2.69-6 6-6v1.5c-2.5 0-4.5 2-4.5 4.5z"></path>
                    </svg>
                    <span>Welcome & Goodbye</span>
                </h2>
            </div>

            <hr className="border-[#302e46] mb-4" />

            {/* Welcome Setup Section */}
            <div className="bg-[#191822]/50 p-4 sm:p-5 rounded-xl border border-[#2e2b41]">
                <div className="flex text-center items-center space-x-2">
                    <div className="bg-[#22202e] rounded-lg p-3 flex text-center text-[#9a92c9] justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7.03 4.95L3.5 8.5c-3.33 3.31-3.33 8.69 0 12s8.69 3.33 12 0l6-6c1-.97 1-2.56 0-3.54c-.1-.12-.23-.23-.37-.32l.37-.39c1-.97 1-2.56 0-3.54c-.14-.16-.33-.3-.5-.41c.38-.92.21-2.02-.54-2.77c-.87-.87-2.22-.96-3.2-.28a2.517 2.517 0 0 0-3.88-.42l-2.51 2.51c-.09-.14-.2-.27-.32-.39a2.53 2.53 0 0 0-3.52 0m1.41 1.42c.2-.2.51-.2.71 0s.2.51 0 .71l-3.18 3.18a3 3 0 0 1 0 4.24l1.41 1.41a5 5 0 0 0 1.12-5.36l6.3-6.3c.2-.2.51-.2.7 0s.21.51 0 .71l-4.59 4.6l1.41 1.41l6.01-6.01c.2-.2.51-.2.71 0s.2.51 0 .71l-6.01 6.01l1.41 1.41l4.95-4.95c.2-.2.51-.2.71 0s.2.51 0 .71l-5.66 5.65l1.41 1.42l3.54-3.54c.2-.2.51-.2.71 0s.2.51 0 .71l-6 6.01c-2.54 2.54-6.65 2.54-9.19 0s-2.54-6.65 0-9.19zM23 17c0 3.31-2.69 6-6 6v-1.5c2.5 0 4.5-2 4.5-4.5zM1 7c0-3.31 2.69-6 6-6v1.5c-2.5 0-4.5 2-4.5 4.5z"></path>
                        </svg>
                    </div>
                    <span className="text-xl">Welcome Setup</span>
                </div>
                <hr className="border-[#302e46] mt-4  mb-4" />
                <div className="mt-3 block">
                    <span className="text-[#a29dbb]">Log Channel</span>
                </div>

                <div className="relative mt-2" ref={dropdownRef}>
                    <div className="relative">
                        <input
                            placeholder="Search or select channel"
                            value={search || selected}

                            onClick={() => setOpen(!open)}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setOpen(true);
                            }}
                            className="w-full cursor-pointer bg-[#191822]/60 px-4 py-3 border-2 border-[#222031] rounded-lg hover:border-[#2e2b41] transition-colors focus:outline-none focus-within:border-[#2e2b41] text-white pr-9"
                        />
                        <motion.div
                            animate={{ rotate: open ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a29dbb] cursor-pointer"
                            onClick={() => setOpen(!open)}
                        >
                            <ChevronDown size={18} />
                        </motion.div>
                    </div>

                    <AnimatePresence>
                        {open && filtered.length > 0 && (
                            <motion.ul
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                                className="absolute w-full mt-2 bg-[#191822] border border-[#2e2b41] rounded-lg shadow-lg z-10 overflow-hidden"
                            >
                                {filtered.map((ch) => (
                                    <li
                                        key={ch}
                                        onClick={() => {
                                            setSelected(ch);
                                            setSearch("");
                                            setOpen(false);
                                        }}
                                        className="px-4 py-3 text-white hover:bg-[#22202e] cursor-pointer transition-colors"
                                    >
                                        # {ch}
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Welcome Message Section */}
            <div className="bg-[#191822]/50 mt-4 p-4 sm:p-5 rounded-xl border border-[#2e2b41]">
                <div className="flex justify-between items-center">
                    <div className="flex text-center items-center space-x-2">
                        <div className="bg-[#22202e] rounded-lg text-[#9a92c9] p-3 flex text-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9h8m-8 4h6m4-9a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z"></path>
                            </svg>
                        </div>
                        <span className="text-xl">Welcome Message</span>
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
                                    This message will be sent automatically when a new user joins your server.
                                </p>
                                <div className="mt-3 flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
                                    <textarea
                                        placeholder="Write your welcome message..."
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
                                                <span className="text-indigo-600 text-lg">[server]</span>
                                            </div>
                                            <span className="text-white tfont">Server name</span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <div className="bg-[#22202e] py-0.5 px-2 rounded-md">
                                                <span className="text-indigo-600 text-lg">[memberCount]</span>
                                            </div>
                                            <span className="text-white tfont">Server member count</span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <div className="bg-[#22202e] py-0.5 px-2 rounded-md">
                                                <span className="text-indigo-600 text-lg">[inviter]</span>
                                            </div>
                                            <span className="text-white tfont">Mention the inviter</span>
                                            <div className=" manrope font-bold bg-[#795a2c] text-[#f6b85b]  text-[0.7rem] uppercase px-2 rounded-sm"> premium </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <div className="bg-[#22202e] py-0.5 px-2 rounded-md">
                                                <span className="text-indigo-600 text-lg">[inviterName]</span>
                                            </div>
                                            <span className="text-white tfont">Inviter's name only</span>
                                            <div className=" manrope font-bold bg-[#795a2c] text-[#f6b85b]  text-[0.7rem] uppercase px-2 rounded-sm"> premium </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <div className="bg-[#22202e] py-0.5 px-2 rounded-md">
                                                <span className="text-indigo-600 text-lg">[inviteCount]</span>
                                            </div>
                                            <span className="text-white tfont">Inviter's total invites</span>
                                            <div className=" manrope font-bold bg-[#795a2c] text-[#f6b85b]  text-[0.7rem] uppercase px-2 rounded-sm"> premium </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Welcome Image Section */}
            <div className="bg-[#191822]/50 mt-4 p-4 sm:p-5 rounded-xl border border-[#2e2b41] ">
                <div className="flex justify-between items-center">
                    <div className="flex text-center items-center space-x-2">
                        <div className="bg-[#22202e] rounded-lg p-3 flex text-center text-[#9a92c9] justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width={256} height={256} className="w-6.5 h-6.5" viewBox="0 0 256 256">
                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} transform="scale(3.77953)">
                                    <rect width={59.267} height={59.267} x={4.233} y={4.233} ry={8.467}></rect>
                                    <path d="m 25.4,33.866667 c -12.7,0 -16.9333334,8.466665 -21.1666669,8.466665"></path>
                                    <path d="m 25.4,33.866667 c 12.7,0 17.582797,8.466665 25.399999,8.466665"></path>
                                    <path d="M 63.5,38.099999 C 48.683332,38.099998 46.566666,50.8 38.1,50.8"></path>
                                    <circle cx={46.567} cy={21.167} r={8.467}></circle>
                                </g>
                            </svg>
                        </div>
                        <span className="text-xl">Welcome Image</span>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={imgEnabled}
                            onChange={() => setImgEnabled(!imgEnabled)}
                            className="sr-only peer"
                        />
                        <div className="w-16 h-8 bg-[#22202e] rounded-full peer-checked:bg-indigo-500 transition-colors"></div>
                        <div className="absolute left-1 w-6 h-6 bg-white rounded-full peer-checked:translate-x-8 transition-transform"></div>
                    </label>
                </div>

                <AnimatePresence>
                    {imgEnabled && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}

                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.25, delay: 0.1 }}
                                className="mt-4 "
                            >
                                <div className="flex flex-col lg:flex-row gap-4">
                                    {/* Canvas Preview */}
                                    <div className="w-full">
                                        <div className="rounded-lg p-4">
                                            <div
                                                className="overflow-x-auto touch-pan-x"
                                                style={{
                                                    WebkitOverflowScrolling: "touch",
                                                    touchAction: "pan-x pan-y",
                                                }}
                                            >
                                                <div className="min-w-max flex justify-center">
                                                    <Stage
                                                        width={canvasSize.width}
                                                        height={canvasSize.height}
                                                        ref={stageRef}
                                                        className="rounded-lg"
                                                        style={{
                                                            background: bgImage
                                                                ? "transparent"
                                                                : "color-mix(in oklab, #191822 60%, transparent)",
                                                        }}
                                                        onMouseDown={(e) => {
                                                            const clickedOnEmpty = e.target === e.target.getStage();
                                                            if (clickedOnEmpty) setSelectedItem(null);
                                                        }}
                                                        onTouchStart={(e) => {
                                                            const clickedOnEmpty = e.target === e.target.getStage();
                                                            if (clickedOnEmpty) setSelectedItem(null);
                                                        }}
                                                    >

                                                        <Layer>
                                                            {bgImage && (
                                                                <Rect
                                                                    width={canvasSize.width}
                                                                    height={canvasSize.height}
                                                                    fillPatternImage={bgImage}
                                                                    fillPatternScaleX={canvasSize.width / bgImage.width}
                                                                    fillPatternScaleY={canvasSize.height / bgImage.height}
                                                                    listening={false} // 🔥 ده المفتاح - يمنع الباكجراوند من اعتراض اللمس
                                                                />
                                                            )}

                                                            {imageObj && (
                                                                <>
                                                                    <KonvaImage
                                                                        ref={imageRef}
                                                                        image={imageObj}
                                                                        x={imagePos.x}
                                                                        y={imagePos.y}
                                                                        width={imageSize.width}
                                                                        height={imageSize.height}
                                                                        cornerRadius={imageRadius}
                                                                        draggable
                                                                        onClick={() => setSelectedItem(prev => prev === "image" ? "" : "image")}
                                                                        onTap={() => setSelectedItem(prev => prev === "image" ? "" : "image")}

                                                                        onDragEnd={(e) => {
                                                                            const node = e.target;
                                                                            const newX = Math.max(
                                                                                0,
                                                                                Math.min(node.x(), canvasSize.width - imageSize.width)
                                                                            );
                                                                            const newY = Math.max(
                                                                                0,
                                                                                Math.min(node.y(), canvasSize.height - imageSize.height)
                                                                            );
                                                                            node.x(newX);
                                                                            node.y(newY);
                                                                            setImagePos({ x: newX, y: newY });
                                                                        }}
                                                                        dragBoundFunc={(pos) => ({
                                                                            x: Math.max(
                                                                                0,
                                                                                Math.min(pos.x, canvasSize.width - imageSize.width)
                                                                            ),
                                                                            y: Math.max(
                                                                                0,
                                                                                Math.min(pos.y, canvasSize.height - imageSize.height)
                                                                            ),
                                                                        })}
                                                                        onTransformEnd={() => {
                                                                            const node = imageRef.current;
                                                                            const newWidth = Math.max(
                                                                                20,
                                                                                node.width() * node.scaleX()
                                                                            );
                                                                            const newHeight = Math.max(
                                                                                20,
                                                                                node.height() * node.scaleY()
                                                                            );
                                                                            const scaleRatio = newWidth / imageSize.width;
                                                                            setImageRadius(imageRadius * scaleRatio);
                                                                            setImageSize({ width: newWidth, height: newHeight });
                                                                            node.scaleX(1);
                                                                            node.scaleY(1);
                                                                        }}
                                                                    />
                                                                    <Transformer
                                                                        ref={imageTrRef}
                                                                        rotateEnabled={false}
                                                                        enabledAnchors={[
                                                                            "top-left",
                                                                            "top-right",
                                                                            "bottom-left",
                                                                            "bottom-right",
                                                                        ]}
                                                                        keepRatio={true}
                                                                        boundBoxFunc={(oldBox, newBox) => {
                                                                            if (newBox.width < 20 || newBox.height < 20) return oldBox;
                                                                            if (
                                                                                newBox.x < 0 ||
                                                                                newBox.y < 0 ||
                                                                                newBox.x + newBox.width > canvasSize.width ||
                                                                                newBox.y + newBox.height > canvasSize.height
                                                                            )
                                                                                return oldBox;
                                                                            return newBox;
                                                                        }}
                                                                    />
                                                                </>
                                                            )}

                                                            <>
                                                                <Text
                                                                    ref={textRef}
                                                                    x={textPos.x}
                                                                    y={textPos.y}
                                                                    text={username}
                                                                    fontSize={textSize.fontSize}
                                                                    fill={textColor}
                                                                    draggable
                                                                    onClick={() => setSelectedItem(prev => prev === "username" ? "" : "username")}
                                                                    onTap={() => setSelectedItem(prev => prev === "username" ? "" : "username")}

                                                                    onDragEnd={(e) => {
                                                                        const node = e.target;
                                                                        const newX = Math.max(
                                                                            0,
                                                                            Math.min(node.x(), canvasSize.width - node.width())
                                                                        );
                                                                        const newY = Math.max(
                                                                            0,
                                                                            Math.min(node.y(), canvasSize.height - node.height())
                                                                        );
                                                                        node.x(newX);
                                                                        node.y(newY);
                                                                        setTextPos({ x: newX, y: newY });
                                                                    }}
                                                                    dragBoundFunc={(pos) => {
                                                                        const node = textRef.current;
                                                                        return {
                                                                            x: Math.max(
                                                                                0,
                                                                                Math.min(pos.x, canvasSize.width - node.width())
                                                                            ),
                                                                            y: Math.max(
                                                                                0,
                                                                                Math.min(pos.y, canvasSize.height - node.height())
                                                                            ),
                                                                        };
                                                                    }}
                                                                    onTransformEnd={() => {
                                                                        const node = textRef.current;
                                                                        setTextSize({
                                                                            fontSize: Math.max(10, node.fontSize() * node.scaleX()),
                                                                        });
                                                                        node.scaleX(1);
                                                                        node.scaleY(1);
                                                                    }}
                                                                />
                                                                <Transformer
                                                                    ref={textTrRef}
                                                                    enabledAnchors={[
                                                                        "top-left",
                                                                        "top-right",
                                                                        "bottom-left",
                                                                        "bottom-right",
                                                                    ]}
                                                                    rotateEnabled={false}
                                                                    keepRatio={true}
                                                                />
                                                            </>

                                                            <>
                                                                <Text
                                                                    ref={welcomeRef}
                                                                    x={welcomePos.x}
                                                                    y={welcomePos.y}
                                                                    text={welcomeText}
                                                                    fontSize={welcomeSize.fontSize}
                                                                    fill={welcomeColor}
                                                                    draggable
                                                                    onClick={() => setSelectedItem(prev => prev === "welcome" ? "" : "welcome")}
                                                                    onTap={() => setSelectedItem(prev => prev === "welcome" ? "" : "welcome")}

                                                                    onDragEnd={(e) => {
                                                                        const node = e.target;
                                                                        const newX = Math.max(
                                                                            0,
                                                                            Math.min(node.x(), canvasSize.width - node.width())
                                                                        );
                                                                        const newY = Math.max(
                                                                            0,
                                                                            Math.min(node.y(), canvasSize.height - node.height())
                                                                        );
                                                                        node.x(newX);
                                                                        node.y(newY);
                                                                        setWelcomePos({ x: newX, y: newY });
                                                                    }}
                                                                    dragBoundFunc={(pos) => {
                                                                        const node = welcomeRef.current;
                                                                        return {
                                                                            x: Math.max(
                                                                                0,
                                                                                Math.min(pos.x, canvasSize.width - node.width())
                                                                            ),
                                                                            y: Math.max(
                                                                                0,
                                                                                Math.min(pos.y, canvasSize.height - node.height())
                                                                            ),
                                                                        };
                                                                    }}
                                                                    onTransformEnd={() => {
                                                                        const node = welcomeRef.current;
                                                                        setWelcomeSize({
                                                                            fontSize: Math.max(10, node.fontSize() * node.scaleX()),
                                                                        });
                                                                        node.scaleX(1);
                                                                        node.scaleY(1);
                                                                    }}
                                                                />
                                                                <Transformer
                                                                    ref={welcomeTrRef}
                                                                    enabledAnchors={[
                                                                        "top-left",
                                                                        "top-right",
                                                                        "bottom-left",
                                                                        "bottom-right",
                                                                    ]}
                                                                    rotateEnabled={false}
                                                                    keepRatio={true}
                                                                />
                                                            </>
                                                        </Layer>
                                                    </Stage>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    {/* Controls */}

                                </div>
                                <div className="w-full mt-4">
                                    <div className=" rounded-lg ">
                                        {/* Tabs */}
                                        <div className="relative mt-5 w-full flex justify-center">
                                            <div className="relative flex flex-wrap w-full max-w-2xl bg-[#1f1e2b] p-1 rounded-lg overflow-hidden">
                                                <motion.div
                                                    layout
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                    className="absolute rounded-md bg-indigo-600 transition-all duration-300"
                                                    style={getIndicatorStyle()}
                                                />

                                                <button
                                                    onClick={() => setActiveTab("image")}
                                                    className={`relative cursor-pointer z-10 flex-1 min-w-[45%] sm:min-w-[25%] py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === "image" ? "text-white" : "text-[#a29dbb]"
                                                        }`}
                                                >
                                                    Avatar
                                                </button>

                                                <button
                                                    onClick={() => setActiveTab("username")}
                                                    className={`relative cursor-pointer z-10 flex-1 min-w-[45%] sm:min-w-[25%] py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === "username" ? "text-white" : "text-[#a29dbb]"
                                                        }`}
                                                >
                                                    Name
                                                </button>

                                                <button
                                                    onClick={() => setActiveTab("welcome")}
                                                    className={`relative cursor-pointer z-10 flex-1 min-w-[45%] sm:min-w-[25%] py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === "welcome" ? "text-white" : "text-[#a29dbb]"
                                                        }`}
                                                >
                                                    Text
                                                </button>

                                                <button
                                                    onClick={() => setActiveTab("background")}
                                                    className={`relative cursor-pointer z-10 flex-1 min-w-[45%] sm:min-w-[25%] py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === "background" ? "text-white" : "text-[#a29dbb]"
                                                        }`}
                                                >
                                                    Background
                                                </button>
                                            </div>
                                        </div>


                                        {/* Tab Content */}
                                        <div className="p-4 space-y-3 max-h-[500px]  custom-scrollbar">
                                            {activeTab === 'image' && (
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-bold text-white mb-3">Image Controls</h3>

                                                    {/* X & Y Position */}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {/* X Position */}
                                                        <div>
                                                            <label className="block text-sm text-[#a29dbb] mb-2">X Position</label>
                                                            <div className="flex items-center bg-[#191822]/60 rounded-lg border-2 border-[#222031] py-3 focus-within:border-[#2e2b41]">
                                                                <button
                                                                    onClick={() =>
                                                                        setImagePos({
                                                                            ...imagePos,
                                                                            x: Math.min(canvasSize.width - imageSize.width, imagePos.x + 1),
                                                                        })
                                                                    }
                                                                    className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                                >
                                                                    <ChevronUp />
                                                                </button>
                                                                <input
                                                                    type="number"
                                                                    value={Math.round(imagePos.x)}
                                                                    onChange={(e) =>
                                                                        setImagePos({
                                                                            ...imagePos,
                                                                            x: Math.max(0, Math.min(Number(e.target.value), canvasSize.width - imageSize.width)),
                                                                        })
                                                                    }
                                                                    className="w-full bg-transparent text-white text-center focus:outline-none"
                                                                />
                                                                <button
                                                                    onClick={() =>
                                                                        setImagePos({
                                                                            ...imagePos,
                                                                            x: Math.max(0, imagePos.x - 1),
                                                                        })
                                                                    }
                                                                    className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                                >
                                                                    <ChevronDown />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Y Position */}
                                                        <div>
                                                            <label className="block text-sm text-[#a29dbb] mb-2">Y Position</label>
                                                            <div className="flex items-center bg-[#191822]/60 rounded-lg border-2 border-[#222031] py-3 focus-within:border-[#2e2b41]">
                                                                <button
                                                                    onClick={() =>
                                                                        setImagePos({
                                                                            ...imagePos,
                                                                            y: Math.min(canvasSize.height - imageSize.height, imagePos.y + 1),
                                                                        })
                                                                    }
                                                                    className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                                >
                                                                    <ChevronUp />
                                                                </button>
                                                                <input
                                                                    type="number"
                                                                    value={Math.round(imagePos.y)}
                                                                    onChange={(e) =>
                                                                        setImagePos({
                                                                            ...imagePos,
                                                                            y: Math.max(0, Math.min(Number(e.target.value), canvasSize.height - imageSize.height)),
                                                                        })
                                                                    }
                                                                    className="w-full bg-transparent text-white text-center focus:outline-none"
                                                                />
                                                                <button
                                                                    onClick={() =>
                                                                        setImagePos({
                                                                            ...imagePos,
                                                                            y: Math.max(0, imagePos.y - 1),
                                                                        })
                                                                    }
                                                                    className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                                >
                                                                    <ChevronDown />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Width & Height */}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {/* Width */}
                                                        <div>
                                                            <label className="block text-sm text-[#a29dbb] mb-2">Width</label>
                                                            <div className="flex items-center bg-[#191822]/60 rounded-lg border-2 border-[#222031] py-3 focus-within:border-[#2e2b41]">
                                                                <button
                                                                    onClick={() => {
                                                                        const w = imageSize.width + 1;
                                                                        setImageSize({ width: w, height: w });
                                                                        setImageRadius(w / 2);
                                                                    }}
                                                                    className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                                >
                                                                    <ChevronUp />
                                                                </button>
                                                                <input
                                                                    type="number"
                                                                    value={Math.round(imageSize.width)}
                                                                    onChange={(e) => {
                                                                        const w = Math.max(20, Number(e.target.value));
                                                                        setImageSize({ width: w, height: w });
                                                                        setImageRadius(w / 2);
                                                                    }}
                                                                    className="w-full bg-transparent text-white text-center focus:outline-none"
                                                                />
                                                                <button
                                                                    onClick={() => {
                                                                        const w = Math.max(20, imageSize.width - 1);
                                                                        setImageSize({ width: w, height: w });
                                                                        setImageRadius(w / 2);
                                                                    }}
                                                                    className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                                >
                                                                    <ChevronDown />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Height */}
                                                        <div>
                                                            <label className="block text-sm text-[#a29dbb] mb-2">Height</label>
                                                            <div className="flex items-center bg-[#191822]/60 rounded-lg border-2 border-[#222031] py-3 focus-within:border-[#2e2b41]">
                                                                <button
                                                                    onClick={() => {
                                                                        const h = imageSize.height + 1;
                                                                        setImageSize({ width: h, height: h });
                                                                        setImageRadius(h / 2);
                                                                    }}
                                                                    className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                                >
                                                                    <ChevronUp />
                                                                </button>
                                                                <input
                                                                    type="number"
                                                                    value={Math.round(imageSize.height)}
                                                                    onChange={(e) => {
                                                                        const h = Math.max(20, Number(e.target.value));
                                                                        setImageSize({ width: h, height: h });
                                                                        setImageRadius(h / 2);
                                                                    }}
                                                                    className="w-full bg-transparent text-white text-center focus:outline-none"
                                                                />
                                                                <button
                                                                    onClick={() => {
                                                                        const h = Math.max(20, imageSize.height - 1);
                                                                        setImageSize({ width: h, height: h });
                                                                        setImageRadius(h / 2);
                                                                    }}
                                                                    className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                                >
                                                                    <ChevronDown />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Radius */}
                                                    <div>
                                                        <label className="block text-sm text-[#a29dbb] mb-2">
                                                            Corner Radius: {Math.round(imageRadius)}
                                                        </label>
                                                        <div className="flex items-center bg-[#191822]/60 rounded-lg border-2 border-[#222031] py-3 focus-within:border-[#2e2b41]">
                                                            <button
                                                                onClick={() => {
                                                                    const newRadius = Math.min(
                                                                        imageRadius + 1,
                                                                        Math.min(imageSize.width, imageSize.height) / 2
                                                                    );
                                                                    setImageRadius(newRadius);
                                                                }}
                                                                className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                            >
                                                                <ChevronUp />
                                                            </button>
                                                            <input
                                                                type="number"
                                                                value={Math.round(imageRadius)}
                                                                onChange={(e) => {
                                                                    const val = Number(e.target.value);
                                                                    const max = Math.min(imageSize.width, imageSize.height) / 2;
                                                                    setImageRadius(Math.max(0, Math.min(val, max)));
                                                                }}
                                                                className="w-full bg-transparent text-white text-center focus:outline-none"
                                                            />
                                                            <button
                                                                onClick={() => {
                                                                    const newRadius = Math.max(0, imageRadius - 1);
                                                                    setImageRadius(newRadius);
                                                                }}
                                                                className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                            >
                                                                <ChevronDown />
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>

                                            )}

                                            {activeTab === 'username' && (
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-bold text-white mb-3">Username Controls</h3>

                                                    {/* X & Y Position */}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {/* X Position */}
                                                        <div>
                                                            <label className="block text-sm text-[#a29dbb] mb-2">X Position</label>
                                                            <div className="flex items-center bg-[#191822]/60 rounded-lg border-2 border-[#222031] py-3 focus-within:border-[#2e2b41]">
                                                                <button
                                                                    onClick={() =>
                                                                        setTextPos({
                                                                            ...textPos,
                                                                            x: textPos.x + 1,
                                                                        })
                                                                    }
                                                                    className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                                >
                                                                    <ChevronUp />
                                                                </button>
                                                                <input
                                                                    type="number"
                                                                    value={Math.round(textPos.x)}
                                                                    onChange={(e) => setTextPos({ ...textPos, x: Number(e.target.value) })}
                                                                    className="w-full bg-transparent text-white text-center focus:outline-none"
                                                                />
                                                                <button
                                                                    onClick={() =>
                                                                        setTextPos({
                                                                            ...textPos,
                                                                            x: textPos.x - 1,
                                                                        })
                                                                    }
                                                                    className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                                >
                                                                    <ChevronDown />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Y Position */}
                                                        <div>
                                                            <label className="block text-sm text-[#a29dbb] mb-2">Y Position</label>
                                                            <div className="flex items-center bg-[#191822]/60 rounded-lg border-2 border-[#222031] py-3 focus-within:border-[#2e2b41]">
                                                                <button
                                                                    onClick={() =>
                                                                        setTextPos({
                                                                            ...textPos,
                                                                            y: textPos.y + 1,
                                                                        })
                                                                    }
                                                                    className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                                >
                                                                    <ChevronUp />
                                                                </button>
                                                                <input
                                                                    type="number"
                                                                    value={Math.round(textPos.y)}
                                                                    onChange={(e) => setTextPos({ ...textPos, y: Number(e.target.value) })}
                                                                    className="w-full bg-transparent text-white text-center focus:outline-none"
                                                                />
                                                                <button
                                                                    onClick={() =>
                                                                        setTextPos({
                                                                            ...textPos,
                                                                            y: textPos.y - 1,
                                                                        })
                                                                    }
                                                                    className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                                >
                                                                    <ChevronDown />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Font Size */}
                                                    <div>
                                                        <label className="block text-sm text-[#a29dbb] mb-2">Font Size</label>
                                                        <div className="flex items-center bg-[#191822]/60 rounded-lg border-2 border-[#222031] py-3 focus-within:border-[#2e2b41]">
                                                            <button
                                                                onClick={() => setTextSize({ fontSize: textSize.fontSize + 1 })}
                                                                className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                            >
                                                                <ChevronUp />
                                                            </button>
                                                            <input
                                                                type="number"
                                                                value={textSize.fontSize}
                                                                onChange={(e) => setTextSize({ fontSize: Number(e.target.value) })}
                                                                className="w-full bg-transparent text-white text-center focus:outline-none"
                                                            />
                                                            <button
                                                                onClick={() => setTextSize({ fontSize: Math.max(1, textSize.fontSize - 1) })}
                                                                className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                            >
                                                                <ChevronDown />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Color Picker */}
                                                    <div className="relative">
                                                        <label className="block text-sm text-[#a29dbb] mb-2">Color</label>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => setShowColorPicker(!showColorPicker)}
                                                                className="h-13 w-full rounded-md border-2 border-[#222031] cursor-pointer"
                                                                style={{ backgroundColor: textColor }}
                                                            />

                                                        </div>

                                                        {showColorPicker && (
                                                            <>
                                                                <motion.div
                                                                    className="fixed inset-0 z-40"
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    exit={{ opacity: 0 }}
                                                                    onClick={() => setShowColorPicker(false)}
                                                                />
                                                                <motion.div
                                                                    className="absolute z-[9999] translate-x-[3rem] "
                                                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                                    transition={{ duration: 0.2 }}
                                                                >
                                                                    <div className="bg-[#201f29] p-3 px-4 rounded-lg border border-[#2e2b41] shadow-lg">
                                                                        <span className="text-[#a29dbb] text-sm mb-2 block">Color Picker</span>
                                                                        <HexColorPicker
                                                                            color={textColor}
                                                                            onChange={setTextColor}
                                                                            style={{ width: '220px', height: '160px' }}
                                                                        />
                                                                        <div className="mt-4 flex items-center gap-2">
                                                                            <div
                                                                                className="p-5 rounded-lg border"
                                                                                style={{
                                                                                    backgroundColor: textColor,
                                                                                    borderColor: darken(textColor, 10),
                                                                                }}
                                                                            />
                                                                            <input
                                                                                value={textColor}
                                                                                onChange={(e) => setTextColor(e.target.value)}
                                                                                className="p-2 rounded-lg focus:outline-none border border-[#3a394b] bg-[#31303f] w-[170px]"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            )}



                                            {activeTab === 'welcome' && (
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-bold text-white mb-3">Welcome Text Controls</h3>

                                                    {/* Text */}
                                                    <div>
                                                        <label className="block text-sm text-[#a29dbb] mb-2">Text</label>
                                                        <input
                                                            type="text"
                                                            value={welcomeText}
                                                            onChange={(e) => setWelcomeText(e.target.value)}
                                                            className="w-full bg-[#191822]/60 text-white rounded-lg px-4 py-3 border-2 border-[#222031] focus:outline-none focus:border-[#2e2b41]"
                                                        />
                                                    </div>

                                                    {/* X & Y Position */}
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {/* X Position */}
                                                        <div>
                                                            <label className="block text-sm text-[#a29dbb] mb-2">X Position</label>
                                                            <div className="flex items-center bg-[#191822]/60 rounded-lg border-2 border-[#222031] py-3 focus-within:border-[#2e2b41]">
                                                                <button
                                                                    onClick={() =>
                                                                        setWelcomePos({
                                                                            ...welcomePos,
                                                                            x: welcomePos.x + 1,
                                                                        })
                                                                    }
                                                                    className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                                >
                                                                    <ChevronUp />
                                                                </button>
                                                                <input
                                                                    type="number"
                                                                    value={Math.round(welcomePos.x)}
                                                                    onChange={(e) => setWelcomePos({ ...welcomePos, x: Number(e.target.value) })}
                                                                    className="w-full bg-transparent text-white text-center focus:outline-none"
                                                                />
                                                                <button
                                                                    onClick={() =>
                                                                        setWelcomePos({
                                                                            ...welcomePos,
                                                                            x: welcomePos.x - 1,
                                                                        })
                                                                    }
                                                                    className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                                >
                                                                    <ChevronDown />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Y Position */}
                                                        <div>
                                                            <label className="block text-sm text-[#a29dbb] mb-2">Y Position</label>
                                                            <div className="flex items-center bg-[#191822]/60 rounded-lg border-2 border-[#222031] py-3 focus-within:border-[#2e2b41]">
                                                                <button
                                                                    onClick={() =>
                                                                        setWelcomePos({
                                                                            ...welcomePos,
                                                                            y: welcomePos.y + 1,
                                                                        })
                                                                    }
                                                                    className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                                >
                                                                    <ChevronUp />
                                                                </button>
                                                                <input
                                                                    type="number"
                                                                    value={Math.round(welcomePos.y)}
                                                                    onChange={(e) => setWelcomePos({ ...welcomePos, y: Number(e.target.value) })}
                                                                    className="w-full bg-transparent text-white text-center focus:outline-none"
                                                                />
                                                                <button
                                                                    onClick={() =>
                                                                        setWelcomePos({
                                                                            ...welcomePos,
                                                                            y: welcomePos.y - 1,
                                                                        })
                                                                    }
                                                                    className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                                >
                                                                    <ChevronDown />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Font Size */}
                                                    <div>
                                                        <label className="block text-sm text-[#a29dbb] mb-2">Font Size</label>
                                                        <div className="flex items-center bg-[#191822]/60 rounded-lg border-2 border-[#222031] py-3 focus-within:border-[#2e2b41]">
                                                            <button
                                                                onClick={() => setWelcomeSize({ fontSize: welcomeSize.fontSize + 1 })}
                                                                className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                            >
                                                                <ChevronUp />
                                                            </button>
                                                            <input
                                                                type="number"
                                                                value={welcomeSize.fontSize}
                                                                onChange={(e) => setWelcomeSize({ fontSize: Number(e.target.value) })}
                                                                className="w-full bg-transparent text-white text-center focus:outline-none"
                                                            />
                                                            <button
                                                                onClick={() =>
                                                                    setWelcomeSize({ fontSize: Math.max(1, welcomeSize.fontSize - 1) })
                                                                }
                                                                className="px-3 cursor-pointer text-[#a29dbb] hover:text-white transition-all duration-250"
                                                            >
                                                                <ChevronDown />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Color Picker */}
                                                    <div className="relative">
                                                        <label className="block text-sm text-[#a29dbb] mb-2">Color</label>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => setShowWelcomeColorPicker(!showWelcomeColorPicker)}
                                                                className="h-13 w-full rounded-md border-2 border-[#222031] cursor-pointer"
                                                                style={{ backgroundColor: welcomeColor }}
                                                            />
                                                        </div>

                                                        {showWelcomeColorPicker && (
                                                            <>
                                                                <motion.div
                                                                    className="fixed inset-0 z-40"
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    exit={{ opacity: 0 }}
                                                                    onClick={() => setShowWelcomeColorPicker(false)}
                                                                />
                                                                <motion.div
                                                                    className="absolute z-[9999] translate-x-[3rem]"
                                                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                                    transition={{ duration: 0.2 }}
                                                                >
                                                                    <div className="bg-[#201f29] p-3 px-4 rounded-lg border border-[#2e2b41] shadow-lg">
                                                                        <span className="text-[#a29dbb] text-sm mb-2 block">Color Picker</span>
                                                                        <HexColorPicker
                                                                            color={welcomeColor}
                                                                            onChange={setWelcomeColor}
                                                                            style={{ width: '220px', height: '160px' }}
                                                                        />
                                                                        <div className="mt-4 flex items-center gap-2">
                                                                            <div
                                                                                className="p-5 rounded-lg border"
                                                                                style={{
                                                                                    backgroundColor: welcomeColor,
                                                                                    borderColor: darken(welcomeColor, 10),
                                                                                }}
                                                                            />
                                                                            <input
                                                                                value={welcomeColor}
                                                                                onChange={(e) => setWelcomeColor(e.target.value)}
                                                                                className="p-2 rounded-lg focus:outline-none border border-[#3a394b] bg-[#31303f] w-[170px]"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            )}


                                            {activeTab === 'background' && (
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-bold text-white mb-3">Background Controls</h3>

                                                    {/* Image URL Input */}
                                                    <div>
                                                        <label className="block text-sm text-[#a29dbb] mb-2">Image URL</label>
                                                        <div className="flex items-center bg-[#191822]/60 rounded-lg border-2 border-[#222031] px-3 py-3 focus-within:border-[#2e2b41]">
                                                            <input
                                                                type="text"
                                                                placeholder="https://example.com/image.jpg"
                                                                value={bgUrl}
                                                                onChange={(e) => setBgUrl(e.target.value)}
                                                                className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-[#5b5870]"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Load Background Button */}
                                                    <button
                                                        onClick={loadBackground}
                                                        className="w-full bg-[#3357FF] hover:bg-[#2847dd] text-white font-semibold py-3 rounded-lg transition-all duration-200"
                                                    >
                                                        Load Background
                                                    </button>

                                                    {/* Remove Background Button */}
                                                    {bgImage && (
                                                        <button
                                                            onClick={() => {
                                                                setBgImage(null);
                                                                setBgUrl('');
                                                            }}
                                                            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-all duration-200"
                                                        >
                                                            Remove Background
                                                        </button>
                                                    )}

                                                    {/* Preview Section */}
                                                    {bgImage && (
                                                        <div className="mt-4">
                                                            <label className="block text-sm text-[#a29dbb] mb-2">Preview</label>
                                                            <div className="rounded-lg border-2 border-[#222031] overflow-hidden">
                                                                <img
                                                                    src={bgImage}
                                                                    alt="Background Preview"
                                                                    className="w-full h-40 object-cover"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                        </div>


                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>


            <div className="bg-[#191822]/50 mt-4 p-4 sm:p-5 rounded-xl border border-[#2e2b41]">
                <div className="flex text-center items-center space-x-2">
                    <div className="bg-[#22202e] rounded-lg p-3 flex text-center text-[#9a92c9] justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7.03 4.95L3.5 8.5c-3.33 3.31-3.33 8.69 0 12s8.69 3.33 12 0l6-6c1-.97 1-2.56 0-3.54c-.1-.12-.23-.23-.37-.32l.37-.39c1-.97 1-2.56 0-3.54c-.14-.16-.33-.3-.5-.41c.38-.92.21-2.02-.54-2.77c-.87-.87-2.22-.96-3.2-.28a2.517 2.517 0 0 0-3.88-.42l-2.51 2.51c-.09-.14-.2-.27-.32-.39a2.53 2.53 0 0 0-3.52 0m1.41 1.42c.2-.2.51-.2.71 0s.2.51 0 .71l-3.18 3.18a3 3 0 0 1 0 4.24l1.41 1.41a5 5 0 0 0 1.12-5.36l6.3-6.3c.2-.2.51-.2.7 0s.21.51 0 .71l-4.59 4.6l1.41 1.41l6.01-6.01c.2-.2.51-.2.71 0s.2.51 0 .71l-6.01 6.01l1.41 1.41l4.95-4.95c.2-.2.51-.2.71 0s.2.51 0 .71l-5.66 5.65l1.41 1.42l3.54-3.54c.2-.2.51-.2.71 0s.2.51 0 .71l-6 6.01c-2.54 2.54-6.65 2.54-9.19 0s-2.54-6.65 0-9.19zM23 17c0 3.31-2.69 6-6 6v-1.5c2.5 0 4.5-2 4.5-4.5zM1 7c0-3.31 2.69-6 6-6v1.5c-2.5 0-4.5 2-4.5 4.5z"></path>
                        </svg>
                    </div>
                    <span className="text-xl">Leave Setup</span>
                </div>

                <div className="mt-3 block">
                    <span className="text-[#a29dbb]">Log Channel</span>
                </div>

                <div className="relative mt-2" ref={ldropdownRef}>
                    <div className="relative">
                        <input
                            placeholder="Search or select channel"
                            value={lsearch || lselected}

                            onClick={() => setlOpen(!lopen)}
                            onChange={(e) => {
                                setlSearch(e.target.value);
                                setlOpen(true);
                            }}
                            className="w-full cursor-pointer bg-[#191822]/60 px-4 py-3 border-2 border-[#222031] rounded-lg hover:border-[#2e2b41] transition-colors focus:outline-none focus-within:border-[#2e2b41] text-white pr-9"
                        />
                        <motion.div
                            animate={{ rotate: open ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a29dbb] cursor-pointer"
                            onClick={() => setlOpen(!open)}
                        >
                            <ChevronDown size={18} />
                        </motion.div>
                    </div>

                    <AnimatePresence>
                        {lopen && lfiltered.length > 0 && (
                            <motion.ul
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                                className="absolute w-full mt-2 bg-[#191822] border border-[#2e2b41] rounded-lg shadow-lg z-10 overflow-hidden"
                            >
                                {lfiltered.map((ch) => (
                                    <li
                                        key={ch}
                                        onClick={() => {
                                            setlSelected(ch);
                                            setlSearch("");
                                            setlOpen(false);
                                        }}
                                        className="px-4 py-3 text-white hover:bg-[#22202e] cursor-pointer transition-colors"
                                    >
                                        # {ch}
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Welcome Message Section */}
            <div className="bg-[#191822]/50 mt-4 mb-6 p-4 sm:p-5 rounded-xl border border-[#2e2b41]">
                <div className="flex justify-between items-center">
                    <div className="flex text-center items-center space-x-2">
                        <div className="bg-[#22202e] rounded-lg p-3 flex text-center text-[#9a92c9] justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-6.5 h-6.5" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9h8m-8 4h6m4-9a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z"></path>
                            </svg>
                        </div>
                        <span className="text-xl">Leave Message</span>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={messageLeaveEnabled}
                            onChange={() => setMessageLeaveEnabled(!messageLeaveEnabled)}
                            className="sr-only peer"
                        />
                        <div className="w-16 h-8 bg-[#22202e] rounded-full peer-checked:bg-indigo-500 transition-colors"></div>
                        <div className="absolute left-1 w-6 h-6 bg-white rounded-full peer-checked:translate-x-8 transition-transform"></div>
                    </label>
                </div>

                <AnimatePresence>
                    {messageLeaveEnabled && (
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
                                    This message will be sent automatically when a new user leaves your server.
                                </p>
                                <div className="mt-3 flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
                                    <textarea
                                        placeholder="Write your message..."
                                        className="w-full sm:w-1/2 bg-[#191822]/60 custom-scrollbar px-4 py-3 border-2 border-[#222031] rounded-lg hover:border-[#2e2b41] transition-colors focus:outline-none text-white resize-none"
                                        rows={5}
                                    />

                                    <div className="w-full sm:w-1/2 flex flex-col space-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <div className="bg-[#22202e] py-0.5 px-2 rounded-md">
                                                <span className="text-indigo-600 text-lg">[user]</span>
                                            </div>
                                            <span className="text-white tfont">Mention the left user</span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <div className="bg-[#22202e] py-0.5 px-2 rounded-md">
                                                <span className="text-indigo-600 text-lg">[userName]</span>
                                            </div>
                                            <span className="text-white tfont">User's username </span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <div className="bg-[#22202e] py-0.5 px-2 rounded-md">
                                                <span className="text-indigo-600 text-lg">[server]</span>
                                            </div>
                                            <span className="text-white tfont">Server name</span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <div className="bg-[#22202e] py-0.5 px-2 rounded-md">
                                                <span className="text-indigo-600 text-lg">[memberCount]</span>
                                            </div>
                                            <span className="text-white tfont">Server member count</span>
                                        </div>


                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
       </>
    );
}