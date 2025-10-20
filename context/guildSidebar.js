"use client";

import { createContext, useState, useContext, useEffect } from 'react';

const GuildSidebarContext = createContext();

export const GuildSidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGeneralOpen, setIsGeneralOpen] = useState(true);
  const [isModeration, setIsModeration] = useState(true);
  const [isGiveaway, setIsGiveawayOpen] = useState(true);
  const [isNotifications, setIsNotificationsOpen] = useState(true);
  const [isOthers, setIsOthers] = useState(true);
  const [active, setActive] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  useEffect(() => {
    setHasAnimated(true);
  }, [setHasAnimated]);
  return (
    <GuildSidebarContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        active,
        setActive,
        isGeneralOpen,
        setIsGeneralOpen,
        isModeration,
        setIsModeration,
        isGiveaway,
        setIsGiveawayOpen,
        isNotifications,
        setIsNotificationsOpen,
        isOthers,
        setIsOthers,
        hasAnimated,
        setHasAnimated,
        timeLeft,
        setTimeLeft
      }}
    >
      {children}
    </GuildSidebarContext.Provider>
  );
};

export const useGuildSidebar = () => useContext(GuildSidebarContext);
