'use client'
import Navbar from "@/components/dashboard/navbar"
import Sidebar from "@/components/dashboard/sidebar"
import { useSidebar } from "@/context/userSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, LayoutDashboard } from "lucide-react"
import Page from "@/components/dashboard/page";
import ChartAreaDefault from "@/components/dashboard/chart-area";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch('/api/profile-image');
        const arrayBuffer = await res.arrayBuffer(); 
        const base64 = btoa(
          new Uint8Array(arrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        setImgUrl(`data:image/png;base64,${base64}`);
      } catch (e) {
        console.error(e);
      }
    };
  
    fetchImage();
  }, []);

  const addCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const formatted = addCommas("1250000")
  
  return (
    <Page>

      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
      <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 * 0.1 }}>
        <h2 className="text-white flex space-x-2 font-medium text-lg md:text-xl">
          <LayoutDashboard className="h-6 w-6" />
          <span>Overview</span>
        </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 2 * 0.1 }}>
        <span className="hidden md:block w-px h-4 bg-[#5b5683]"></span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 3 * 0.1 }}>
        <span className="text-md text-zinc-400">
          The Overview page gives you a quick glance at your most important information and activities, all in one place. It’s designed to help you stay on top of your account without needing to jump between different sections.
        </span>
        </motion.div>
      </div>
      <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 4 * 0.1 }}
          >
      <hr className="border-[#373450] mb-4" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 5 * 0.1 }}
          className="bg-[#1b1922]/50 backdrop-blur p-3 sm:p-4 sm:py-2 rounded-md border border-[#2e2b41]"
        >
          <div className="flex items-center  gap-2 justify-between sm:gap-3">

            <div className="flex flex-col mt-0.5">
              <p className="text-sm sm:text-base font-medium text-gray-400">
                Corns
              </p>
            </div>
            <div className="bg-card-secondary bg-indigo-600 text-colors-title p-2 rounded-xl translate-y-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[30px] text-white" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 9h4" opacity="0.5" /><path strokeWidth="1.5" d="M20.833 10h-2.602C16.446 10 15 11.343 15 13s1.447 3 3.23 3h2.603c.084 0 .125 0 .16-.002c.54-.033.97-.432 1.005-.933c.002-.032.002-.071.002-.148v-3.834c0-.077 0-.116-.002-.148c-.036-.501-.465-.9-1.005-.933c-.035-.002-.076-.002-.16-.002Z" /><path strokeWidth="1.5" d="M20.965 10c-.078-1.872-.328-3.02-1.137-3.828C18.657 5 16.771 5 13 5h-3C6.229 5 4.343 5 3.172 6.172S2 9.229 2 13s0 5.657 1.172 6.828S6.229 21 10 21h3c3.771 0 5.657 0 6.828-1.172c.809-.808 1.06-1.956 1.137-3.828" /><path strokeLinecap="round" strokeWidth="1.5" d="m6 5l3.735-2.477a3.24 3.24 0 0 1 3.53 0L17 5" opacity="0.5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.991 13H18" opacity="0.5" /></g></svg>
            </div>
          </div>

          <p className=" text-xl sm:text-2xl font-semibold break-words">
          {formatted}
          </p>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 6 * 0.1 }}
          className="bg-[#1b1922]/50 backdrop-blur p-3 sm:p-4 sm:py-2 rounded-md border border-[#2e2b41]"
        >
          <div className="flex items-center  gap-2 justify-between sm:gap-3">

            <div className="flex flex-col mt-0.5">
              <p className="text-sm sm:text-base font-medium text-gray-400">
                Level
              </p>
            </div>
            <div className="bg-card-secondary bg-green-600 text-colors-title p-2 rounded-xl translate-y-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="w-[30px] h-[30px] text-white" viewBox="0 0 24 24"><circle cx="12" cy="9" r="7" fill="currentColor" opacity="0.5" /><path fill="currentColor" d="m7.546 14.4l-.195.6l-.637 2.323c-.628 2.292-.942 3.438-.523 4.065c.147.22.344.396.573.513c.652.332 1.66-.193 3.675-1.243c.67-.35 1.006-.524 1.362-.562q.199-.021.398 0c.356.038.691.212 1.362.562c2.015 1.05 3.023 1.575 3.675 1.243c.229-.117.426-.293.573-.513c.42-.627.105-1.773-.523-4.065L16.649 15l-.195-.6c-1.21 1-2.762 1.6-4.454 1.6s-3.244-.6-4.454-1.6" /></svg>
            </div>
          </div>

          <p className=" text-xl sm:text-2xl font-semibold break-words">
            45
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 7 * 0.1 }}
          className="bg-[#1b1922]/50 backdrop-blur p-3 sm:p-4 sm:py-2 rounded-md border border-[#2e2b41]"
        >
          <div className="flex items-center  gap-2 justify-between sm:gap-3">

            <div className="flex flex-col mt-0.5">
              <p className="text-sm sm:text-base font-medium text-gray-400">
                Reputation
              </p>
            </div>
            <div className="bg-card-secondary bg-red-600 text-colors-title p-2 rounded-xl translate-y-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="w-[30px] h-[30px] text-white" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M8.106 18.247C5.298 16.083 2 13.542 2 9.137C2 4.274 7.5.825 12 5.501V20.5c-1 0-2-.77-3.038-1.59q-.417-.326-.856-.663" clipRule="evenodd" opacity="0.5" /><path fill="currentColor" d="M15.038 18.91C17.981 16.592 22 14 22 9.138S16.5.825 12 5.501V20.5c1 0 2-.77 3.038-1.59" /></svg>
            </div>
          </div>

          <p className=" text-xl sm:text-2xl font-semibold break-words">
            99
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 8 * 0.1 }}
          className="bg-[#1b1922]/50 backdrop-blur p-3 sm:p-4 sm:py-2 rounded-md border border-[#2e2b41]"
        >
          <div className="flex items-center  gap-2 justify-between sm:gap-3">

            <div className="flex flex-col mt-0.5">
              <p className="text-sm sm:text-base font-medium text-gray-400">
                Rank
              </p>
            </div>
            <div className="bg-card-secondary bg-yellow-600 text-colors-title p-2 rounded-xl translate-y-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="w-[30px] h-[30px] text-white" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16c-5.76 0-6.78-5.74-6.96-10.294c-.051-1.266-.076-1.9.4-2.485c.475-.586 1.044-.682 2.183-.874A26.4 26.4 0 0 1 12 2c1.784 0 3.253.157 4.377.347c1.139.192 1.708.288 2.184.874s.45 1.219.4 2.485C18.781 10.26 17.761 16 12.001 16" opacity="0.5" /><path fill="currentColor" d="m17.64 12.422l2.817-1.565c.752-.418 1.128-.627 1.336-.979C22 9.526 22 9.096 22 8.235v-.073c0-1.043 0-1.565-.283-1.958s-.778-.558-1.768-.888L19 5l-.017.085q-.008.283-.022.621c-.088 2.225-.377 4.733-1.32 6.716M5.04 5.706c.087 2.225.376 4.733 1.32 6.716l-2.817-1.565c-.752-.418-1.129-.627-1.336-.979S2 9.096 2 8.235v-.073c0-1.043 0-1.565.283-1.958s.778-.558 1.768-.888L5 5l.017.087q.008.281.022.62" /><path fill="currentColor" fillRule="evenodd" d="M5.25 22a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75" clipRule="evenodd" /><path fill="currentColor" d="M15.458 21.25H8.542l.297-1.75a1 1 0 0 1 .98-.804h4.361a1 1 0 0 1 .98.804z" opacity="0.5" /><path fill="currentColor" d="M12 16q-.39 0-.75-.034v2.73h1.5v-2.73A8 8 0 0 1 12 16" /></svg>
            </div>
          </div>

          <p className=" text-xl sm:text-2xl font-semibold break-words">
            #1
          </p>
        </motion.div>
      </div>

      <div className="mt-[2rem] flex flex-col lg:flex-row items-stretch w-full gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 9 * 0.1 }}
          className="flex-1 min-w-0"
        >
          <ChartAreaDefault />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 10 * 0.1 }}
          className="flex-shrink-0 w-full lg:w-[420px] xl:w-[500px] h-full"
        >
          <div className="bg-[#1b1922]/50 border border-[#2e2b41] p-6 rounded-lg flex flex-col  md:h-[34.5rem]">
            <div className="flex justify-between">
              <h3 className="text-xl text-gray-200 font-semibold mb-6">Profile</h3>
              <div className="group">
                <Link href="/dashboard/store/profile" className=" flex space-x-1 p-1.5 bg-[#4f39f65d] rounded-xl cursor-pointer -translate-y-2 border-2 border-indigo-600 group-hover:bg-indigo-600  transition-all duration-300 ">
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="currentColor" fillRule="evenodd" clipRule="evenodd"><path d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352z"></path><path d="M19.846 4.318a2.2 2.2 0 0 0-.437-.692a2 2 0 0 0-.654-.463a1.92 1.92 0 0 0-1.544 0a2 2 0 0 0-.654.463l-.546.578l2.852 3.02l.546-.579a2.1 2.1 0 0 0 .437-.692a2.24 2.24 0 0 0 0-1.635M17.45 8.721L14.597 5.7L9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.5.5 0 0 0 .255-.145l4.778-5.06Z"></path></g></svg>
                  <span className="mt-1">Edit Profile</span>
                </Link>
              </div>
            </div>

            {imgUrl ? (
              <img
                src={imgUrl}
                alt="Profile Image"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()} 
                className="w-full select-none h-full max-h-[550px] rounded-lg object-cover shadow-lg transition-transform hover:scale-[1.03] duration-300"
              />
            ) : (
              <div className="w-full h-full max-h-[550px] bg-[#2a2835] rounded-lg animate-pulse" />
            )}

          </div>
        </motion.div>
      </div>



    </Page>

  )
}