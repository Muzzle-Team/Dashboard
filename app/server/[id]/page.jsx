'use client'
import Navbar from "@/components/dashboard/navbar"
import Sidebar from "@/components/dashboard/sidebar"
import { useSidebar } from "@/context/userSidebar";
import { LogOut, LayoutDashboard } from "lucide-react"
import Page from "@/components/dashboard/server/page";
import JoinsAndLeaves from "@/components/dashboard/server/joinandleaves";
import Messages from "@/components/dashboard/server/messages";
import Link from "next/link";
import { useState, useEffect } from "react";
import AuditLogsTable from "@/components/dashboard/server/home_log";


export default function Dashboard() {



  const addCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatted = addCommas("1250000")

  return (
 <>

      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
        <h2 className="text-white flex space-x-2 font-medium text-lg md:text-xl">
          <LayoutDashboard className="h-6 w-6" />
          <span>Overview</span>
        </h2>

      </div>
      <hr className="border-[#302e46] mb-4" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-[#191822]/50 backdrop-blur p-4 sm:p-5 rounded-xl border border-[#2e2b41] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <p className="text-sm sm:text-2xl font-medium text-white">
                Messages
              </p>
              <p className="text-sm font-medium text-gray-400">
                Last 24 hours
              </p>
            </div>

            <div className="bg-indigo-600 p-2 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={28}
                height={28}
                viewBox="0 0 24 24"
                className="w-[30px] h-[30px]"
              >
                <path
                  fill="currentColor"
                  d="M18 3a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-4.724l-4.762 2.857a1 1 0 0 1-1.508-.743L7 21v-2H6a4 4 0 0 1-3.995-3.8L2 15V7a4 4 0 0 1 4-4zm-4 9H8a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2m2-4H8a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2"
                />
              </svg>
            </div>
          </div>

          <p className="text-2xl sm:text-3xl font-semibold text-white mt-4">
            10
          </p>
        </div>



        <div className="bg-[#191822]/50 backdrop-blur p-4 sm:p-5 rounded-xl border border-[#2e2b41] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <p className="text-sm sm:text-2xl font-medium text-white">
                Joins
              </p>
              <p className="text-sm font-medium text-gray-400">
                Last 24 hours
              </p>
            </div>

            <div className="bg-green-600 p-2 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-[30px] h-[30px]" viewBox="0 0 24 24">
                <g fill="none">
                  <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                  <path fill="currentColor" d="M16 14a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5zm4-6a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1V9a1 1 0 0 1 1-1m-8-6a5 5 0 1 1 0 10a5 5 0 0 1 0-10"></path>
                </g>
              </svg>
            </div>
          </div>

          <p className="text-2xl sm:text-3xl font-semibold text-white mt-4 flex space-x-2">
            00

          </p>
        </div>

        <div className="bg-[#191822]/50 backdrop-blur p-4 sm:p-5 rounded-xl border border-[#2e2b41] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <p className="text-sm sm:text-2xl font-medium text-white">
                Leaves
              </p>
              <p className="text-sm font-medium text-gray-400">
                Last 24 hours
              </p>
            </div>

            <div className="bg-red-600 p-2 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-[30px] h-[30px]" viewBox="0 0 24 24">
                <g fill="none">
                  <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                  <path fill="currentColor" d="M16 14a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5zM12 2a5 5 0 1 1 0 10a5 5 0 0 1 0-10m10 8a1 1 0 0 1 .117 1.993L22 12h-4a1 1 0 0 1-.117-1.993L18 10z"></path>
                </g>
              </svg>
            </div>
          </div>

          <p className="text-2xl sm:text-3xl font-semibold text-white mt-4 flex space-x-2">
            00

          </p>
        </div>

        <div className="bg-[#191822]/50 backdrop-blur p-4 sm:p-5 rounded-xl border border-[#2e2b41] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <p className="text-sm sm:text-2xl font-medium text-white">
                Total Members
              </p>
            </div>

            <div className="bg-purple-600 p-2 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} className="w-[30px] h-[30px] text-white" viewBox="0 0 24 24">
                <g fill="currentColor">
                  <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0m7.5 3a3 3 0 1 1 6 0a3 3 0 0 1-6 0m-13.5 0a3 3 0 1 1 6 0a3 3 0 0 1-6 0m4.06 5.368A6.75 6.75 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498a.75.75 0 0 1-.372.568A12.7 12.7 0 0 1 12 21.75a12.7 12.7 0 0 1-6.337-1.684a.75.75 0 0 1-.372-.568a6.8 6.8 0 0 1 1.019-4.38" clipRule="evenodd"></path>
                  <path d="m5.082 14.254l-.036.055a8.3 8.3 0 0 0-1.271 5.08a9.7 9.7 0 0 1-1.765-.44l-.115-.04a.56.56 0 0 1-.373-.487l-.01-.121Q1.5 18.15 1.5 18a3.75 3.75 0 0 1 3.582-3.746m15.144 5.135a8.3 8.3 0 0 0-1.308-5.135a3.75 3.75 0 0 1 3.57 4.047l-.01.121a.56.56 0 0 1-.373.486l-.115.04q-.851.302-1.764.441"></path>
                </g>
              </svg>
            </div>
          </div>

          <p className="text-2xl sm:text-3xl font-semibold text-white mt-4">
            20
          </p>
        </div>


      </div>

      <div className="mt-[2rem] flex flex-col xl:flex-row items-stretch w-full gap-6">
        <div className="flex-1 min-w-0">
          <Messages />
        </div>

        <div className="flex-1 min-w-0">
          <JoinsAndLeaves />
        </div>
      </div>
      <div className=" mt-[2rem]"><AuditLogsTable/></div>


</>

  )
}