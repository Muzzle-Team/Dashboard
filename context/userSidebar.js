"use client";

import { createContext, useState, useContext } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGeneralOpen, setIsGeneralOpen] = useState(true);
  const [isSubscription, setIsSubscription] = useState(true);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(true);
  const [active, setActive] = useState("overview");

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        active,
        setActive,
        isLeaderboardOpen,
        setIsLeaderboardOpen,
        isGeneralOpen,
        setIsGeneralOpen,
        isSubscription,
        setIsSubscription,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
