'use client'
import Navbar from "@/components/dashboard/navbar"
import Sidebar from "@/components/dashboard/sidebar"
import { useSidebar } from "@/context/userSidebar";
import { LogOut, LayoutDashboard, X, Plus, Trash2, Send } from "lucide-react"
import Page from "@/components/dashboard/server/page";
import JoinsAndLeaves from "@/components/dashboard/server/joinandleaves";
import Messages from "@/components/dashboard/server/messages";
import Link from "next/link";
import { useState, useEffect } from "react";
import AuditLogsTable from "@/components/dashboard/server/home_log";
import { motion, AnimatePresence } from "framer-motion";
import { HexColorPicker } from "react-colorful";

export default function Dashboard() {

    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState("#3357FF");
    const [active, setActive] = useState("embed")
    const [fields, setFields] = useState([]);
    const [messageName, setMessageName] = useState("");
    const [content, setContent] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [authorIconUrl, setAuthorIconUrl] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [footerText, setFooterText] = useState("");
    const [footerIconUrl, setFooterIconUrl] = useState("");
    const [sending, setSending] = useState(false);

    const webhookUrl = "https://discord.com/api/webhooks/1429821236422381699/T-Uc3ab4r4xckmxMRhjZkmRs8hOQNrhNyqS07OyY_0hCD3eL3r3sXhiNdQ726osKgBP1";


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

    const addField = () => {
        setFields([...fields, { id: Date.now(), name: '', value: '', inline: false }]);
    };

    const removeField = (id) => {
        setFields(fields.filter(field => field.id !== id));
    };

    const updateField = (id, key, value) => {
        setFields(fields.map(field =>
            field.id === id ? { ...field, [key]: value } : field
        ));
    };

    const handleImageUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'thumbnail') {
                    setThumbnailUrl(reader.result);
                } else if (type === 'image') {
                    setImageUrl(reader.result);
                } else if (type === 'authorIcon') {
                    setAuthorIconUrl(reader.result);
                } else if (type === 'footerIcon') {
                    setFooterIconUrl(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const sendToDiscord = async () => {
        setSending(true);

        try {
            const payload = {};

            if (active === "embed") {
                const embed = {
                    color: parseInt(color.replace('#', ''), 16),
                };

                if (title) embed.title = title;
                if (description) embed.description = description;
                if (authorName) {
                    embed.author = { name: authorName };
                    if (authorIconUrl) embed.author.icon_url = authorIconUrl;
                }
                if (thumbnailUrl) embed.thumbnail = { url: thumbnailUrl };
                if (imageUrl) embed.image = { url: imageUrl };
                if (footerText) {
                    embed.footer = { text: footerText };
                    if (footerIconUrl) embed.footer.icon_url = footerIconUrl;
                }
                if (fields.length > 0) {
                    embed.fields = fields.filter(f => f.name && f.value).map(f => ({
                        name: f.name,
                        value: f.value,
                        inline: f.inline
                    }));
                }

                payload.embeds = [embed];
                if (content) payload.content = content;
            } else {
                payload.content = content;
            }

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('تم إرسال الرسالة بنجاح! ✅');
            } else {
                alert('حدث خطأ أثناء الإرسال ❌');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ أثناء الإرسال ❌');
        } finally {
            setSending(false);
        }
    };

    const formatted = addCommas("1250000")

    return (
        <Page>

            <div className="flex flex-col md:flex-row  md:items-center gap-1 md:gap-4 mb-4">
                <h2 className="text-white flex space-x-2 font-medium text-lg md:text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M16.698 21.996h-11.6a3.06 3.06 0 0 1-2.2-.92a3.1 3.1 0 0 1-.9-2.21V7.276a3 3 0 0 1 .91-2.19a3 3 0 0 1 1-.67a3.1 3.1 0 0 1 1.2-.24h4.44a.75.75 0 0 1 0 1.5h-4.44a2 2 0 0 0-.63.12a1.62 1.62 0 0 0-.99 1.5v11.59a1.62 1.62 0 0 0 .47 1.16a1.62 1.62 0 0 0 1.15.47h11.6c.213 0 .423-.04.62-.12a1.5 1.5 0 0 0 .52-.35a1.5 1.5 0 0 0 .35-.52a1.5 1.5 0 0 0 .13-.63v-4.44a.75.75 0 1 1 1.5 0v4.47a3.06 3.06 0 0 1-.92 2.2a3.2 3.2 0 0 1-1 .68c-.387.14-.798.205-1.21.19"></path>
                        <path fill="currentColor" d="M21.808 5.456a1.9 1.9 0 0 0-.46-.68l-2.15-2.15a1.9 1.9 0 0 0-.68-.46a2.1 2.1 0 0 0-2.31.46l-1.71 1.71v.05l-7.74 7.73a2.1 2.1 0 0 0-.61 1.48v2.17a2.12 2.12 0 0 0 2.11 2.11h2.17a2.07 2.07 0 0 0 1.48-.62l7.74-7.74l1.72-1.72c.202-.19.36-.422.46-.68a2 2 0 0 0 0-1.63zm-1.38 1.05a.6.6 0 0 1-.14.2l-1.22 1.22l-3-3l1.23-1.23a.64.64 0 0 1 .44-.18a.6.6 0 0 1 .23.05q.116.049.2.14l2.16 2.15a.7.7 0 0 1 .13.2a.6.6 0 0 1 0 .23a.6.6 0 0 1-.03.22"></path>
                    </svg>
                    <span>Create Embed Messages</span>
                </h2>

            </div>
            <hr className="border-[#302e46]  mb-4" />


            <div className="bg-[#191822]/50 mb-[2rem]  p-4 sm:p-5 rounded-md border border-[#2e2b41]">
                <label>Name</label>
                <div className="items-center w-full bg-[#191822]/60 px-4 py-3 border-2 border-[#222031] rounded-md hover:border-[#2e2b41] transition-colors focus-within:border-[#2e2b41]">

                    <input
                        placeholder="Message Name"
                        value={messageName}
                        onChange={(e) => setMessageName(e.target.value)}
                        className="w-full bg-transparent items-center mt-1 placeholder:text-[#928ea8] outline-none text-white"
                    />

                </div>

                <div className="relative mt-5 w-fit">
                    <div className="relative flex bg-[#1f1e2b] p-1 rounded-lg overflow-hidden">
                        <motion.div
                            layout
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute top-1 bottom-1 rounded-md bg-indigo-500"
                            style={{
                                left: active === "embed" ? "calc(50% + 0.25rem)" : "0.25rem",
                                width: "calc(50% - 0.5rem)",
                            }}
                        />
                        <button
                            onClick={() => setActive("message")}
                            className={`relative cursor-pointer z-10 w-[100px] py-2 rounded-md text-sm font-medium transition-all duration-200 ${active === "message" ? "text-white" : "text-gray-300"
                                }`}
                        >
                            Message
                        </button>
                        <button
                            onClick={() => setActive("embed")}
                            className={`relative cursor-pointer z-10 w-[100px] py-2 rounded-md text-sm font-medium transition-all duration-200 ${active === "embed" ? "text-white" : "text-gray-300"
                                }`}
                        >
                            Embed
                        </button>
                    </div>


                </div>
                <div className="mt-5 relative ">
                    {active === "embed" ?
                        (
                            <>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full border border-[#222031] p-3 rounded-lg min-h-[150px] bg-[#191822]/60 text-white placeholder:text-[#928ea8] outline-none focus:border-[#2e2b41] transition-colors"
                                    placeholder="Content"
                                />

                                <div className="bg-[#22202e] p-3 border-l-2 rounded-md rounded-l-[2.5px]" style={{ borderColor: color }}>
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

                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mt-2">
                                        <div className="flex items-center gap-3 sm:order-1 w-full">
                                            <label className="cursor-pointer shrink-0">
                                                {authorIconUrl ? (
                                                    <img
                                                        src={authorIconUrl}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                        alt="Author Icon"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 border-2 border-dashed border-[#484466] rounded-full flex items-center justify-center hover:border-[#5a5a7a] transition-colors">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="22"
                                                            height="22"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            className="text-[#b1b2c4]"
                                                        >
                                                            <path
                                                                opacity=".4"
                                                                d="m22.019 16.82-3.13-7.32c-.57-1.34-1.42-2.1-2.39-2.15-.96-.05-1.89.62-2.6 1.9l-1.9 3.41c-.4.72-.97 1.15-1.59 1.2-.63.06-1.26-.27-1.77-.92l-.22-.28c-.71-.89-1.59-1.32-2.49-1.23-.9.09-1.67.71-2.18 1.72l-1.73 3.45c-.62 1.25-.56 2.7.17 3.88.73 1.18 2 1.89 3.39 1.89h12.76c1.34 0 2.59-.67 3.33-1.79.76-1.12.88-2.53.35-3.76Z"
                                                                fill="currentColor"
                                                            ></path>
                                                            <path
                                                                d="M6.97 8.381a3.38 3.38 0 1 0 0-6.76 3.38 3.38 0 0 0 0 6.76Z"
                                                                fill="currentColor"
                                                            ></path>
                                                        </svg>
                                                    </div>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload(e, 'authorIcon')}
                                                    className="hidden"
                                                />
                                            </label>

                                            <div className="flex flex-col gap-2 w-full">
                                                <div className="w-full bg-[#191822]/60 px-4 py-3 border-2 border-[#222031] rounded-lg hover:border-[#2e2b41] transition-colors focus-within:border-[#2e2b41]">
                                                    <input
                                                        placeholder="Text"
                                                        value={authorName}
                                                        onChange={(e) => setAuthorName(e.target.value)}
                                                        className="w-full bg-transparent placeholder:text-[#928ea8] outline-none text-white"
                                                    />
                                                </div>
                                                <div className="w-full bg-[#191822]/60 px-4 py-3 border-2 border-[#222031] rounded-lg hover:border-[#2e2b41] transition-colors focus-within:border-[#2e2b41]">
                                                    <input
                                                        placeholder="URL"
                                                        className="w-full bg-transparent placeholder:text-[#928ea8] outline-none text-white"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <label className="cursor-pointer block sm:order-2">
                                            {thumbnailUrl ? (
                                                <img
                                                    src={thumbnailUrl}
                                                    className="w-20 h-20 object-cover rounded-md mx-auto"
                                                    alt="Thumbnail"
                                                />
                                            ) : (
                                                <div className="w-20 h-20 border-2 border-dashed border-[#484466] rounded-md flex items-center justify-center mx-auto hover:border-[#5a5a7a] transition-colors">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="40"
                                                        height="40"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        className="text-[#b1b2c4]"
                                                    >
                                                        <path
                                                            opacity=".4"
                                                            d="m22.019 16.82-3.13-7.32c-.57-1.34-1.42-2.1-2.39-2.15-.96-.05-1.89.62-2.6 1.9l-1.9 3.41c-.4.72-.97 1.15-1.59 1.2-.63.06-1.26-.27-1.77-.92l-.22-.28c-.71-.89-1.59-1.32-2.49-1.23-.9.09-1.67.71-2.18 1.72l-1.73 3.45c-.62 1.25-.56 2.7.17 3.88.73 1.18 2 1.89 3.39 1.89h12.76c1.34 0 2.59-.67 3.33-1.79.76-1.12.88-2.53.35-3.76Z"
                                                            fill="currentColor"
                                                        ></path>
                                                        <path
                                                            d="M6.97 8.381a3.38 3.38 0 1 0 0-6.76 3.38 3.38 0 0 0 0 6.76Z"
                                                            fill="currentColor"
                                                        ></path>
                                                    </svg>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, 'thumbnail')}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>

                                    <div className="flex justify-center mt-[2rem] mb-4">
                                        <hr className="border-[#252436] border-[1.5px] w-full" />
                                    </div>

                                    <div className="items-center w-full bg-[#191822]/60 px-4 py-3 border-2 border-[#222031] rounded-lg hover:border-[#2e2b41] transition-colors focus-within:border-[#2e2b41]">
                                        <input
                                            placeholder="Title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="w-full bg-transparent items-center mt-1 placeholder:text-[#928ea8] outline-none text-white"
                                        />
                                    </div>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full border mt-2 border-[#222031] p-3 rounded-lg min-h-[150px] bg-[#191822]/60 text-white placeholder:text-[#928ea8] outline-none focus:border-[#2e2b41] transition-colors"
                                        placeholder="Description"
                                    />
                                    <div className="flex justify-center mt-[2rem] mb-4">
                                        <hr className="border-[#252436] border-[1.5px] w-full" />
                                    </div>

                                    {/* Fields Section */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[#a29dbb] text-sm font-medium">Fields</span>
                                            <button
                                                onClick={addField}
                                                className="flex cursor-pointer items-center space-x-2 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                                            >
                                                <Plus size={16} />
                                                <span>Add Field</span>
                                            </button>
                                        </div>

                                        <AnimatePresence>
                                            {fields.map((field, index) => (
                                                <motion.div
                                                    key={field.id}
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="bg-[#191822]/60 p-4 rounded-lg border border-[#222031] space-y-3"
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-white text-sm font-medium">Field {index + 1}</span>
                                                        <div className=" flex space-x-2">

                                                            <div className="relative flex bg-[#292738] p-1 rounded-lg overflow-hidden">
                                                                <motion.div
                                                                    layout
                                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                                    className="absolute top-1 bottom-1 rounded-md bg-indigo-500"
                                                                    style={{
                                                                        left: !field.inline ? "calc(50% + 0.25rem)" : "0.25rem",
                                                                        width: "calc(50% - 0.5rem)",
                                                                    }}
                                                                />
                                                                <button
                                                                    onClick={() => updateField(field.id, 'inline', true)}
                                                                    className={`relative cursor-pointer z-10 w-[50px] py-2 text-center flex justify-center rounded-md text-sm font-medium transition-all duration-200 ${field.inline ? "text-white" : "text-gray-300"
                                                                        }`}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                                        <g fill="none" stroke="currentColor" strokeWidth={1.5}>
                                                                            <path strokeLinecap="round" d="M2 12h3m17 0h-3m-5 0h-4"></path>
                                                                            <path d="M7.5 5c-.935 0-1.402 0-1.75.201a1.5 1.5 0 0 0-.549.549C5 6.098 5 6.565 5 7.5v9c0 .935 0 1.402.201 1.75a1.5 1.5 0 0 0 .549.549C6.098 19 6.565 19 7.5 19s1.402 0 1.75-.201a1.5 1.5 0 0 0 .549-.549c.201-.348.201-.815.201-1.75v-9c0-.935 0-1.402-.201-1.75a1.5 1.5 0 0 0-.549-.549C8.902 5 8.435 5 7.5 5Zm9 2c-.935 0-1.402 0-1.75.201a1.5 1.5 0 0 0-.549.549C14 8.098 14 8.565 14 9.5v5c0 .935 0 1.402.201 1.75a1.5 1.5 0 0 0 .549.549c.348.201.815.201 1.75.201s1.402 0 1.75-.201a1.5 1.5 0 0 0 .549-.549c.201-.348.201-.815.201-1.75v-5c0-.935 0-1.402-.201-1.75a1.5 1.5 0 0 0-.549-.549C17.902 7 17.435 7 16.5 7Z"></path>
                                                                        </g>
                                                                    </svg>
                                                                </button>
                                                                <button
                                                                    onClick={() => updateField(field.id, 'inline', false)}
                                                                    className={`relative cursor-pointer z-10 w-[50px] py-2 rounded-md text-center flex justify-center text-sm font-medium transition-all duration-200 ${field.inline === false ? "text-white" : "text-gray-300"
                                                                        }`}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                                        <g fill="none" stroke="currentColor" strokeWidth={1.5}>
                                                                            <path strokeLinecap="round" d="M12 2v3m0 17v-3m0-5v-4"></path>
                                                                            <path d="M5 7.5c0-.935 0-1.402.201-1.75a1.5 1.5 0 0 1 .549-.549C6.098 5 6.565 5 7.5 5h9c.935 0 1.402 0 1.75.201a1.5 1.5 0 0 1 .549.549C19 6.098 19 6.565 19 7.5s0 1.402-.201 1.75a1.5 1.5 0 0 1-.549.549c-.348.201-.815.201-1.75.201h-9c-.935 0-1.402 0-1.75-.201a1.5 1.5 0 0 1-.549-.549C5 8.902 5 8.435 5 7.5Zm2 9c0-.935 0-1.402.201-1.75a1.5 1.5 0 0 1 .549-.549C8.098 14 8.565 14 9.5 14h5c.935 0 1.402 0 1.75.201a1.5 1.5 0 0 1 .549.549c.201.348.201.815.201 1.75s0 1.402-.201 1.75a1.5 1.5 0 0 1-.549.549c-.348.201-.815.201-1.75.201h-5c-.935 0-1.402 0-1.75-.201a1.5 1.5 0 0 1-.549-.549C7 17.902 7 17.435 7 16.5Z"></path>
                                                                        </g>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                            <button
                                                                onClick={() => removeField(field.id)}
                                                                className="text-red-400 cursor-pointer hover:text-red-300 hover:bg-red-400/10 p-2 rounded transition-colors"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>

                                                        </div>
                                                    </div>

                                                    <div className="items-center w-full bg-[#13121d] px-4 py-3 border-2 border-[#222031] rounded-lg hover:border-[#2e2b41] transition-colors focus-within:border-[#2e2b41]">
                                                        <input
                                                            placeholder="Field Name"
                                                            value={field.name}
                                                            onChange={(e) => updateField(field.id, 'name', e.target.value)}
                                                            className="w-full bg-transparent items-center placeholder:text-[#928ea8] outline-none text-white"
                                                        />
                                                    </div>


                                                    <textarea
                                                        placeholder="Field Value"
                                                        value={field.value}
                                                        onChange={(e) => updateField(field.id, 'value', e.target.value)}
                                                        className=" min-h-[100px]  placeholder:text-[#928ea8] outline-none text-white items-center w-full bg-[#13121d] px-4 py-3 border-2 border-[#222031] rounded-lg hover:border-[#2e2b41] transition-colors focus-within:border-[#2e2b41]"
                                                    />



                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>

                                    <div className="flex justify-center mt-[2rem] mb-4">
                                        <hr className="border-[#252436] border-[1.5px] w-full" />
                                    </div>

                                    <label className="cursor-pointer block">
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                className="w-full h-[12rem] object-cover rounded-md"
                                                alt="Embed Image"
                                            />
                                        ) : (
                                            <div className="h-[12rem] border-2 border-dashed border-[#484466] rounded-md flex items-center justify-center shrink-0 hover:border-[#5a5a7a] transition-colors">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="90"
                                                    height="90"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    className="text-[#b1b2c4]"
                                                >
                                                    <path
                                                        opacity=".4"
                                                        d="m22.019 16.82-3.13-7.32c-.57-1.34-1.42-2.1-2.39-2.15-.96-.05-1.89.62-2.6 1.9l-1.9 3.41c-.4.72-.97 1.15-1.59 1.2-.63.06-1.26-.27-1.77-.92l-.22-.28c-.71-.89-1.59-1.32-2.49-1.23-.9.09-1.67.71-2.18 1.72l-1.73 3.45c-.62 1.25-.56 2.7.17 3.88.73 1.18 2 1.89 3.39 1.89h12.76c1.34 0 2.59-.67 3.33-1.79.76-1.12.88-2.53.35-3.76Z"
                                                        fill="currentColor"
                                                    ></path>
                                                    <path
                                                        d="M6.97 8.381a3.38 3.38 0 1 0 0-6.76 3.38 3.38 0 0 0 0 6.76Z"
                                                        fill="currentColor"
                                                    ></path>
                                                </svg>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, 'image')}
                                            className="hidden"
                                        />
                                    </label>

                                    <div className="flex justify-center mt-[2rem] mb-4">
                                        <hr className="border-[#252436] border-[1.5px] w-full" />
                                    </div>

                                    <div className="flex space-x-2 mt-2 items-center">
                                        <label className="cursor-pointer">
                                            {footerIconUrl ? (
                                                <img
                                                    src={footerIconUrl}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                    alt="Footer Icon"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 border-2 border-dashed border-[#484466] rounded-full flex items-center justify-center shrink-0">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="22"
                                                        height="22"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        className="text-[#b1b2c4]"
                                                    >
                                                        <path
                                                            opacity=".4"
                                                            d="m22.019 16.82-3.13-7.32c-.57-1.34-1.42-2.1-2.39-2.15-.96-.05-1.89.62-2.6 1.9l-1.9 3.41c-.4.72-.97 1.15-1.59 1.2-.63.06-1.26-.27-1.77-.92l-.22-.28c-.71-.89-1.59-1.32-2.49-1.23-.9.09-1.67.71-2.18 1.72l-1.73 3.45c-.62 1.25-.56 2.7.17 3.88.73 1.18 2 1.89 3.39 1.89h12.76c1.34 0 2.59-.67 3.33-1.79.76-1.12.88-2.53.35-3.76Z"
                                                            fill="currentColor"
                                                        ></path>
                                                        <path
                                                            d="M6.97 8.381a3.38 3.38 0 1 0 0-6.76 3.38 3.38 0 0 0 0 6.76Z"
                                                            fill="currentColor"
                                                        ></path>
                                                    </svg>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, 'footerIcon')}
                                                className="hidden"
                                            />
                                        </label>

                                        <div className="items-center w-full bg-[#191822]/60 px-4 py-3 border-2 border-[#222031] rounded-lg hover:border-[#2e2b41] transition-colors focus-within:border-[#2e2b41]">
                                            <input
                                                placeholder="Footer"
                                                value={footerText}
                                                onChange={(e) => setFooterText(e.target.value)}
                                                className="w-full bg-transparent items-center mt-1 placeholder:text-[#928ea8] outline-none text-white"
                                            />
                                        </div>
                                    </div>




                                </div>


                            </>
                        )
                        :
                        (
                            <>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full border border-[#222031] p-3 rounded-lg min-h-[150px] bg-[#191822]/60 text-white placeholder:text-[#928ea8] outline-none focus:border-[#2e2b41] transition-colors"
                                    placeholder="Content"
                                />
                            </>
                        )
                    }

                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={sendToDiscord}
                        disabled={sending}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${sending
                                ? 'bg-gray-500 cursor-not-allowed'
                                : 'bg-indigo-500 hover:bg-indigo-600 cursor-pointer'
                            } text-white`}
                    >
                        <Send size={20} />
                        <span>{sending ? 'جاري الإرسال...' : 'Send'}</span>
                    </button>
                </div>


            </div>




        </Page>

    )
}