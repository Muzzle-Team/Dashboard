'use client'
import { useState, useRef, useEffect } from "react";
import Page from "@/components/dashboard/page";
import ReCAPTCHA from "react-google-recaptcha";
import CountdownTimer from "@/components/dashboard/timer";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "@/context/userSidebar";
import LeaderboardCorns from "@/components/dashboard/leaderboard_corns";

export default function Corns() {
    return (
        <Page>
            <div className="md:flex gap-6 justify-center items-center lolfont font-extrabold text-3xl md:text-4xl mb-9">
                Top 100 Users Have Corns
                <div className="flex space-x-3">
                    <img 
                    src="/assets/top1.png"
                    className="h-9 w-9 select-none"
                    draggable="false"
                    />
                    <img 
                    src="/assets/top2.png"
                    className="h-9 w-9 select-none"
                    draggable="false"
                    />
                    <img 
                    src="/assets/top3.png"
                    className="h-9 w-9 select-none"
                    draggable="false"
                    />
                </div>
            </div>
            <div
                className="flex justify-center items-center">
                <LeaderboardCorns />
            </div>
        </Page>
    )
}