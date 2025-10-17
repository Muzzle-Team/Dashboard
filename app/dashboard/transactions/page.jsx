'use client'
import Navbar from "@/components/dashboard/navbar"
import Sidebar from "@/components/dashboard/sidebar"
import { useSidebar } from "@/context/userSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, LayoutDashboard, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import Page from "@/components/dashboard/page";
import ChartAreaDefault from "@/components/dashboard/chart-area";
import Link from "next/link";
import { useState, useEffect } from "react";


export default function Dashboard() {
  const [imgUrl, setImgUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

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

  // بيانات تجريبية للمعاملات (25 معاملة للتجربة)
  const [allTransactions] = useState([
    {
      id: 1,
      user: {
        name: "Ahmed Hassan",
        id: "1234567890123456",
        image: "https://i.pravatar.cc/150?img=12"
      },
      date: "17/10/2025 9:19:31 PM",
      amount: 15000,
      balance: 125000
    },
    {
      id: 2,
      user: {
        name: "Sara Mohamed",
        id: "2345678901234567",
        image: "https://i.pravatar.cc/150?img=23"
      },
      date: "17/10/2025 8:45:12 PM",
      amount: -5000,
      balance: 98000
    },
    {
      id: 3,
      user: {
        name: "Omar Khaled",
        id: "3456789012345678",
        image: "https://i.pravatar.cc/150?img=33"
      },
      date: "17/10/2025 7:30:45 PM",
      amount: 25000,
      balance: 175000
    },
    {
      id: 4,
      user: {
        name: "Nour Ali",
        id: "4567890123456789",
        image: "https://i.pravatar.cc/150?img=44"
      },
      date: "17/10/2025 6:15:20 PM",
      amount: -12000,
      balance: 63000
    },
    {
      id: 5,
      user: {
        name: "Youssef Ibrahim",
        id: "5678901234567890",
        image: "https://i.pravatar.cc/150?img=15"
      },
      date: "17/10/2025 5:00:00 PM",
      amount: 8500,
      balance: 142500
    },
    {
      id: 6,
      user: {
        name: "Layla Mahmoud",
        id: "6789012345678901",
        image: "https://i.pravatar.cc/150?img=25"
      },
      date: "17/10/2025 4:30:15 PM",
      amount: -3500,
      balance: 87000
    },
    {
      id: 7,
      user: {
        name: "Karim Fouad",
        id: "7890123456789012",
        image: "https://i.pravatar.cc/150?img=31"
      },
      date: "17/10/2025 3:45:30 PM",
      amount: 18000,
      balance: 156000
    },
    {
      id: 8,
      user: {
        name: "Mona Saeed",
        id: "8901234567890123",
        image: "https://i.pravatar.cc/150?img=41"
      },
      date: "17/10/2025 2:20:45 PM",
      amount: 9500,
      balance: 112500
    },
    {
      id: 9,
      user: {
        name: "Tamer Hosny",
        id: "9012345678901234",
        image: "https://i.pravatar.cc/150?img=51"
      },
      date: "17/10/2025 1:10:00 PM",
      amount: -7500,
      balance: 92000
    },
    {
      id: 10,
      user: {
        name: "Dina Essam",
        id: "1122334455667788",
        image: "https://i.pravatar.cc/150?img=26"
      },
      date: "17/10/2025 12:00:00 PM",
      amount: 12000,
      balance: 134000
    },
    {
      id: 11,
      user: {
        name: "Hossam Habib",
        id: "2233445566778899",
        image: "https://i.pravatar.cc/150?img=13"
      },
      date: "16/10/2025 11:30:00 PM",
      amount: -4500,
      balance: 78000
    },
    {
      id: 12,
      user: {
        name: "Rana Sameh",
        id: "3344556677889900",
        image: "https://i.pravatar.cc/150?img=24"
      },
      date: "16/10/2025 10:15:30 PM",
      amount: 16500,
      balance: 148000
    },
    {
      id: 13,
      user: {
        name: "Mahmoud Adel",
        id: "4455667788990011",
        image: "https://i.pravatar.cc/150?img=32"
      },
      date: "16/10/2025 9:00:00 PM",
      amount: 7800,
      balance: 118000
    },
    {
      id: 14,
      user: {
        name: "Nada Yasser",
        id: "5566778899001122",
        image: "https://i.pravatar.cc/150?img=45"
      },
      date: "16/10/2025 8:45:15 PM",
      amount: -9000,
      balance: 85000
    },
    {
      id: 15,
      user: {
        name: "Amr Diab",
        id: "6677889900112233",
        image: "https://i.pravatar.cc/150?img=52"
      },
      date: "16/10/2025 7:30:00 PM",
      amount: 22000,
      balance: 188000
    },
    {
      id: 16,
      user: {
        name: "Salma Ahmed",
        id: "7788990011223344",
        image: "https://i.pravatar.cc/150?img=27"
      },
      date: "16/10/2025 6:20:45 PM",
      amount: 5500,
      balance: 96000
    },
    {
      id: 17,
      user: {
        name: "Sherif Mounir",
        id: "8899001122334455",
        image: "https://i.pravatar.cc/150?img=14"
      },
      date: "16/10/2025 5:10:30 PM",
      amount: -6500,
      balance: 72000
    },
    {
      id: 18,
      user: {
        name: "Hana Mostafa",
        id: "9900112233445566",
        image: "https://i.pravatar.cc/150?img=28"
      },
      date: "16/10/2025 4:00:00 PM",
      amount: 13500,
      balance: 138000
    },
    {
      id: 19,
      user: {
        name: "Amir Eid",
        id: "1357924680135792",
        image: "https://i.pravatar.cc/150?img=34"
      },
      date: "16/10/2025 3:45:15 PM",
      amount: 9800,
      balance: 127000
    },
    {
      id: 20,
      user: {
        name: "Yasmine Sabri",
        id: "2468013579246801",
        image: "https://i.pravatar.cc/150?img=46"
      },
      date: "16/10/2025 2:30:00 PM",
      amount: -11000,
      balance: 68000
    },
    {
      id: 21,
      user: {
        name: "Hassan Shakosh",
        id: "3691470258147036",
        image: "https://i.pravatar.cc/150?img=53"
      },
      date: "16/10/2025 1:15:45 PM",
      amount: 17500,
      balance: 162000
    },
    {
      id: 22,
      user: {
        name: "Huda Hussein",
        id: "4702581470258147",
        image: "https://i.pravatar.cc/150?img=29"
      },
      date: "16/10/2025 12:00:30 PM",
      amount: 4200,
      balance: 89000
    },
    {
      id: 23,
      user: {
        name: "Khaled Selim",
        id: "5814703692581470",
        image: "https://i.pravatar.cc/150?img=16"
      },
      date: "15/10/2025 11:45:00 PM",
      amount: -8700,
      balance: 76000
    },
    {
      id: 24,
      user: {
        name: "Reem Mostafa",
        id: "6925814703692581",
        image: "https://i.pravatar.cc/150?img=30"
      },
      date: "15/10/2025 10:30:15 PM",
      amount: 19500,
      balance: 173000
    },
    {
      id: 25,
      user: {
        name: "Ali Mahmoud",
        id: "7036925814703692",
        image: "https://i.pravatar.cc/150?img=35"
      },
      date: "15/10/2025 9:15:00 PM",
      amount: 6800,
      balance: 105000
    }
  ]);

  const addCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // حساب الصفحات
  const totalPages = Math.ceil(allTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = allTransactions.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <Page>

      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
      <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 * 0.1 }}>
        <h2 className="text-white flex space-x-2 font-medium text-lg md:text-xl items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-[30px] h-[30px] text-white" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 9h4" opacity="0.5" /><path strokeWidth="1.5" d="M20.833 10h-2.602C16.446 10 15 11.343 15 13s1.447 3 3.23 3h2.603c.084 0 .125 0 .16-.002c.54-.033.97-.432 1.005-.933c.002-.032.002-.071.002-.148v-3.834c0-.077 0-.116-.002-.148c-.036-.501-.465-.9-1.005-.933c-.035-.002-.076-.002-.16-.002Z" /><path strokeWidth="1.5" d="M20.965 10c-.078-1.872-.328-3.02-1.137-3.828C18.657 5 16.771 5 13 5h-3C6.229 5 4.343 5 3.172 6.172S2 9.229 2 13s0 5.657 1.172 6.828S6.229 21 10 21h3c3.771 0 5.657 0 6.828-1.172c.809-.808 1.06-1.956 1.137-3.828" /><path strokeLinecap="round" strokeWidth="1.5" d="m6 5l3.735-2.477a3.24 3.24 0 0 1 3.53 0L17 5" opacity="0.5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.991 13H18" opacity="0.5" /></g></svg>
          <span>Corns Transactions</span>
        </h2>
        </motion.div>
       
        
      </div>
      <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 4 * 0.1 }}
          >
      <hr className="border-[#302e46] mb-4" />
      </motion.div>

      {/* جدول المعاملات */}
      <div className="w-full overflow-hidden">
        <div className="space-y-3">
          {currentTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`relative bg-[#1a1825] rounded-lg overflow-hidden hover:bg-[#211e2e] transition-colors`}
            >
              {/* الخط الجانبي الملون على الشمال */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-1 ${
                  transaction.amount > 0 ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              
              <div className="p-4 pl-5">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  
                  {/* معلومات المستخدم */}
                  <div className="flex items-center gap-3">
                    <img 
                      src={transaction.user.image} 
                      alt={transaction.user.name}
                      className="w-12 h-12 rounded-full border-2 border-[#302e46]"
                    />
                    <div>
                      <p className="text-white font-medium">{transaction.user.name}</p>
                      <p className="text-gray-400 text-sm">{transaction.user.id}</p>
                    </div>
                  </div>

                  {/* التاريخ */}
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Date</p>
                    <p className="text-white text-sm">{transaction.date}</p>
                  </div>

                  {/* المبلغ */}
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Amount</p>
                    <p className={`text-lg font-semibold ${
                      transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{addCommas(transaction.amount)}
                    </p>
                  </div>

                  {/* الرصيد */}
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Balance</p>
                    <div className="flex items-center gap-2 ">
                      <p className="text-white text-lg font-medium">
                        {addCommas(transaction.balance)}
                      </p>
                      <span className={`flex items-center ${
                        transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {transaction.amount > 0 ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg mb-4 ${
                currentPage === 1
                  ? 'bg-[#1a1825] text-gray-600 cursor-not-allowed'
                  : 'bg-[#1a1825] text-white hover:bg-[#211e2e]'
              }`}
            >
                 <ChevronLeft className="w-5 h-5" />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => goToPage(i + 1)}
                className={`px-4 py-2 rounded-lg mb-4 ${
                  currentPage === i + 1
                    ? 'bg-indigo-500 text-white'
                    : 'bg-[#1a1825] text-white hover:bg-[#211e2e]'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg mb-4 ${
                currentPage === totalPages
                  ? 'bg-[#1a1825] text-gray-600 cursor-not-allowed'
                  : 'bg-[#1a1825] text-white hover:bg-[#211e2e]'
              }`}
            >
                 <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

    </Page>

  )
}