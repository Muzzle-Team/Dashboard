"use client";

import { createContext, useState, useContext, useEffect } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGeneralOpen, setIsGeneralOpen] = useState(true);
  const [isStore, setIsStore] = useState(true);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(true);
  const [isOthers, setIsOthers] = useState(true);
  const [active, setActive] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  useEffect(() => {
    setHasAnimated(true);
  }, [setHasAnimated]);
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
        isStore,
        setIsStore,
        isOthers,
        setIsOthers,
        hasAnimated,
        setHasAnimated,
        timeLeft,
        setTimeLeft
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
