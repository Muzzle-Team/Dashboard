import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/context/userSidebar";
import { GuildSidebarProvider } from "@/context/guildSidebar";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400..800&family=Cairo:wght@200..1000&family=Chiron+GoRound+TC:wght@200..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lilita+One&family=Londrina+Outline&family=Manrope:wght@200..800&family=Noto+Sans+Arabic:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Tajawal:wght@200;300;400;500;700;800;900&family=UnifrakturCook:wght@700&family=Vazirmatn:wght@100..900&display=swap" rel="stylesheet"/>

              <title>Muzzle Bot</title>
              <meta name="description" content="Muzzle - Discord bot for Fun, Memes, Images, Giveaway, Economy and Anime! Muzzle serve over 117 commands!" />
              <meta name="theme-color" content="#4f39f6" />

              {/* Favicon */}
              <link rel="icon" href="/assets/logo1.png" />

              {/* Open Graph (social sharing preview) */}
              <meta property="og:title" content="Muzzle Bot" />
              <meta property="og:description" content="Muzzle - Discord bot for Fun, Memes, Images, Giveaway, Economy and Anime! Muzzle serve over 117 commands!" />
              <meta property="og:image" content="/assets/banner.png" />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://muzzlebot.xyz/" />

              {/* Twitter card */}
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="Muzzle Bot" />
              <meta name="twitter:description" content="Muzzle - Discord bot for Fun, Memes, Images, Giveaway, Economy and Anime! Muzzle serve over 117 commands!" />
              <meta name="twitter:image" content="/assets/banner.png" />
            </head>
            <body
              className={`tfont custom-scrollbar min-h-screen`}
            >
              <SidebarProvider>
                <GuildSidebarProvider>
                  {children}
                </GuildSidebarProvider>
              </SidebarProvider>
            </body>
          </html>
          );
}
