import { NextResponse } from "next/server";
const { createCanvas, loadImage } = require("canvas");
const StackBlur = require("stackblur-canvas");

// Level calculation: 1 level per 1000 XP (keep consistent with /rank)
const calculateUserXp = (xp) => Math.floor(xp / 1000);
// XP required to reach level L (linear): 1000 * L
const xpForLevel = (lvl) => 1000 * lvl;
const formatNumber = (num) => {
  if (num >= 1_000_000_000) return Math.floor(num / 100_000_000) / 10 + "B";
  if (num >= 1_000_000) return Math.floor(num / 100_000) / 10 + "M";
  if (num >= 1_000) return Math.floor(num / 100) / 10 + "k";
  return num.toString();
};


// 🎭 FAKE DATA - للعرض التجريبي فقط
const FAKE_USER_DATA = {
  displayName: "mazinx",
  username: "mz_n",
  xp: 45750,
  credits: 1250000,
  reputation: 99,
  about:
    "Professional gamer and anime lover 🎮✨ | Building the best Discord community | Coffee addict ☕",
  rank: 1,
  avatar: "https://cdn.discordapp.com/avatars/618078478755037185/9d67cfd5d3ecd981548c55b5fadd6912.png?size=1024",
};

export async function GET() {
  try {
    // بيانات تجريبية
    const user = FAKE_USER_DATA;

    const level = calculateUserXp(user.xp);
    const currentXP = user.xp ;
    const totalXP = xpForLevel(level + 1);

    // Create canvas with custom profile dimensions
    const canvas = createCanvas(549, 548);
    const ctx = canvas.getContext("2d");

    // Helper function for rounded rectangles
    const roundRect = (x, y, width, height, radius) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
      );
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };

    // Main background with gradient
    const mainGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    mainGradient.addColorStop(0, "#3a327d");
    mainGradient.addColorStop(1, "#1f1b40");
    ctx.fillStyle = mainGradient;
    roundRect(0, 0, canvas.width, canvas.height, 20);
    ctx.fill();

    // Banner section with ACNH background
    try {
      const bannerBackground = await loadImage(
        "https://i.ibb.co/35dLc81K/image.png"
      );
      ctx.save();
      roundRect(15, 15, canvas.width - 30, 160, 15);
      ctx.clip();
      ctx.drawImage(bannerBackground, 15, 15, canvas.width - 30, 160);
      ctx.restore();
    } catch (error) {
      console.error("Banner image failed to load:", error);
      // Fallback to gradient if image fails to load
      const bannerGradient = ctx.createLinearGradient(0, 0, canvas.width, 120);
      bannerGradient.addColorStop(0, "#8B5CF6");
      bannerGradient.addColorStop(0.5, "#A855F7");
      bannerGradient.addColorStop(1, "#7C3AED");
      ctx.fillStyle = bannerGradient;
      roundRect(15, 15, canvas.width - 30, 120, 15);
      ctx.fill();
    }


    // Reputation badge in banner
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    roundRect(canvas.width - 100, 30, 70, 25, 12);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`+${user.reputation}REP`, canvas.width - 65, 47);

    // User avatar positioned below banner
    const avatarSize = 100;
    const avatarX = 50;
    const avatarY = 110;

    // Load avatar with error handling
    let avatar;
    try {
      avatar = await loadImage(user.avatar);
    } catch (error) {
      console.error("Avatar failed to load:", error);
      // Create a fallback avatar (simple circle with initials)
      avatar = null;
    }

    if (avatar) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(
        avatarX + avatarSize / 2,
        avatarY + avatarSize / 2,
        avatarSize / 2,
        0,
        Math.PI * 2
      );
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
      ctx.restore();
    } else {
      // Fallback avatar
      ctx.fillStyle = "#8B5CF6";
      ctx.beginPath();
      ctx.arc(
        avatarX + avatarSize / 2,
        avatarY + avatarSize / 2,
        avatarSize / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 40px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        user.username.charAt(0).toUpperCase(),
        avatarX + avatarSize / 2,
        avatarY + avatarSize / 2
      );
    }

    // Avatar border with glow
    ctx.save();
    ctx.beginPath();
    ctx.arc(
      avatarX + avatarSize / 2,
      avatarY + avatarSize / 2,
      avatarSize / 2 + 2,
      0,
      Math.PI * 2
    );
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(255,255,255,0.6)";
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();

    function drawGlassBackground(ctx, x, y, width, height, radius, blur = 20) {
      const imageData = ctx.getImageData(x, y, width, height);
      StackBlur.imageDataRGBA(imageData, 0, 0, width, height, blur);
      const tempCanvas = createCanvas(width, height);
      const tempCtx = tempCanvas.getContext("2d");
      tempCtx.putImageData(imageData, 0, 0);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
      );
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(tempCanvas, x, y);
      ctx.restore();
    }

    const text = `${user.displayName}`;
    ctx.font = "bold 36px Arial, Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = 36;

    const paddingX = 10;
    const paddingY = 10;
    const textX = avatarX + avatarSize + 20;
    const textY = 150;

    const rectX = textX - paddingX;
    const rectY = textY - textHeight / 2 - paddingY / 2;
    const rectWidth = textWidth + paddingX * 2;
    const rectHeight = textHeight + paddingY;

    drawGlassBackground(ctx, rectX, rectY, rectWidth, rectHeight, 25, 20);

    // Draw text with stroke
    ctx.lineWidth = 2;
    ctx.fillStyle = "#fff";
    ctx.fillText(text, textX, textY);

    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.font = "bold 24px Arial, Arial";
    ctx.textAlign = "left";
    ctx.lineWidth = 1.8;
    ctx.strokeStyle = "rgba(0,0,0,0.48)";
    ctx.strokeText(`@${user.username}`, avatarX + avatarSize + 7, 196);
    ctx.fillText(`@${user.username}`, avatarX + avatarSize + 7, 196);

    function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
      const words = text.split(" ");
      let line = "";
      let currY = y;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, currY);
          line = words[n] + " ";
          currY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, currY);
    }

    ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
    ctx.font = "14px bold Arial, Arial";
    ctx.textAlign = "left";
    ctx.fillText("ABOUT ME", 25, 230);

    // About Me section - fake data
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "16px Arial, Arial";
    ctx.textAlign = "left";

    const aboutText = user.about;
    const startX = 25;
    const startY = 250;
    const maxWidth = 550;
    const lineHeight = 18;

    drawWrappedText(ctx, aboutText, startX, startY, maxWidth, lineHeight);

    // separator line
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(25, 315);
    ctx.lineTo(canvas.width - 25, 315);
    ctx.stroke();

    // Corns section
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "14px Arial, Arial";
    ctx.textAlign = "right";
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = "rgba(0,0,0,0.35)";
    ctx.strokeText("CORNS", canvas.width - 70, 330);
    ctx.fillText("CORNS", canvas.width - 70, 330);

    // Wallet background rectangle
    const walletBgWidth = 150;
    const walletBgHeight = 50;
    const walletBgX = canvas.width - walletBgWidth - 25;
    const walletBgY = 340;
    const walletBgRadius = 12;

    ctx.fillStyle = "rgba(0, 0, 0, 0.31)";
    ctx.beginPath();
    ctx.moveTo(walletBgX + walletBgRadius, walletBgY);
    ctx.lineTo(walletBgX + walletBgWidth - walletBgRadius, walletBgY);
    ctx.quadraticCurveTo(
      walletBgX + walletBgWidth,
      walletBgY,
      walletBgX + walletBgWidth,
      walletBgY + walletBgRadius
    );
    ctx.lineTo(
      walletBgX + walletBgWidth,
      walletBgY + walletBgHeight - walletBgRadius
    );
    ctx.quadraticCurveTo(
      walletBgX + walletBgWidth,
      walletBgY + walletBgHeight,
      walletBgX + walletBgWidth - walletBgRadius,
      walletBgY + walletBgHeight
    );
    ctx.lineTo(walletBgX + walletBgRadius, walletBgY + walletBgHeight);
    ctx.quadraticCurveTo(
      walletBgX,
      walletBgY + walletBgHeight,
      walletBgX,
      walletBgY + walletBgHeight - walletBgRadius
    );
    ctx.lineTo(walletBgX, walletBgY + walletBgRadius);
    ctx.quadraticCurveTo(
      walletBgX,
      walletBgY,
      walletBgX + walletBgRadius,
      walletBgY
    );
    ctx.closePath();
    ctx.fill();

    // Gold coin icon
    const coinUrl =
      "https://i.ibb.co/zVd3pqfH/solar-wallet-money-line-duotone-1.png";
    const coinSize = 24;
    const coinX = walletBgX + 15 + coinSize / 2;
    const coinY = walletBgY + walletBgHeight / 2;

    try {
      const coinImage = await loadImage(coinUrl);
      ctx.drawImage(
        coinImage,
        coinX - coinSize / 2,
        coinY - coinSize / 2,
        coinSize,
        coinSize
      );
    } catch (err) {
      console.error("Coin icon failed to load:", err);
      // fallback circle
      ctx.fillStyle = "#FFD700";
      ctx.beginPath();
      ctx.arc(coinX, coinY, coinSize / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#FFA500";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Gold amount
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 20px Arial, Arial";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 1.8;
    ctx.strokeStyle = "rgba(0,0,0,0.48)";
    const creditsText = formatNumber(user.credits);
    ctx.strokeText(
      creditsText,
      walletBgX + walletBgWidth - 50,
      walletBgY + walletBgHeight / 2
    );
    ctx.fillText(
      creditsText,
      walletBgX + walletBgWidth - 50,
      walletBgY + walletBgHeight / 2
    );

    // Statistics section
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.font = "14px Arial, Arial";
    ctx.textAlign = "left";
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = "rgba(0,0,0,0.38)";
    ctx.strokeText("STATISTICS", 25, 330);
    ctx.fillText("STATISTICS", 25, 330);

    // Level with lightning icon
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "16px Arial, Arial";
    ctx.fillText("⚡", 25, 358);
    ctx.font = "bold 16px Arial, Arial";
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = "rgba(0,0,0,0.38)";
    ctx.strokeText(`LEVEL: ${level}`, 50, 358);
    ctx.fillText(`LEVEL: ${level}`, 50, 358);

    // Rank with trophy icon
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "16px Arial, Arial";
    ctx.fillText("🏆", 25, 388);
    ctx.font = "bold 16px Arial, Arial";
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = "rgba(0,0,0,0.38)";
    ctx.strokeText(`RANK: ${user.rank}`, 50, 388);
    ctx.fillText(`RANK: ${user.rank}`, 50, 388);

    // XP section
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.font = "14px Arial, Arial";
    ctx.textAlign = "left";
    ctx.strokeStyle = "rgba(0,0,0,0.28)";
    ctx.lineWidth = 1.1;
    ctx.strokeText("XP", 25, 412);
    ctx.fillText("XP", 25, 412);

    // Total XP with star icon
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "16px Arial, Arial";
    ctx.fillText("⭐", 25, 438);
    ctx.font = "bold 16px Arial, Arial";
    ctx.strokeStyle = "rgba(0,0,0,0.38)";
    ctx.lineWidth = 1.4;
    ctx.strokeText(`TOTAL XP: ${formatNumber(user.xp)}`, 50, 438);
    ctx.fillText(`TOTAL XP: ${formatNumber(user.xp)}`, 50, 438);

    // XP Progress bar
    const progressBarWidth = canvas.width - 50;
    const progressBarHeight = 20;
    const progressBarX = 25;
    const progressBarY = 470;

    // Progress bar background
    ctx.fillStyle = "rgba(0, 0, 0, 0.36)";
    roundRect(
      progressBarX,
      progressBarY,
      progressBarWidth,
      progressBarHeight,
      10
    );
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    roundRect(
      progressBarX,
      progressBarY,
      progressBarWidth,
      progressBarHeight,
      10
    );
    ctx.stroke();

    // Progress bar fill
    const progressPercent = currentXP / totalXP;
    const progressWidth = progressBarWidth * progressPercent;

    const progressGradient = ctx.createLinearGradient(
      progressBarX,
      progressBarY,
      progressBarX + progressWidth,
      progressBarY
    );
    progressGradient.addColorStop(0, "#6D28D9");
    progressGradient.addColorStop(0.4, "#8B5CF6");
    progressGradient.addColorStop(0.7, "#A78BFA");
    progressGradient.addColorStop(1, "#C4B5FD");

    ctx.fillStyle = progressGradient;
    roundRect(progressBarX, progressBarY, progressWidth, progressBarHeight, 10);
    ctx.fill();

    if (progressWidth > 6) {
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      roundRect(
        progressBarX,
        progressBarY,
        Math.min(progressWidth, progressBarWidth),
        4,
        6
      );
      ctx.fill();
    }

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 14px HONOR, Arial";
    ctx.textAlign = "center";
    // central progress text with outline for readability
    const progressText = `${formatNumber(currentXP)} / ${formatNumber(totalXP)}`;
    ctx.lineWidth = 1.8;
  
    ctx.strokeText(progressText, canvas.width / 2, progressBarY + 10);
    ctx.fillText(progressText, canvas.width / 2, progressBarY + 10);

    // XP Icon
    try {
      const xpIcon = await loadImage("https://i.ibb.co/TMdjN6Mb/logo2.png");
      const iconSize = 40;
      const iconX =
        canvas.width / 2 + ctx.measureText(progressText).width / 2 + 190;
      const iconY = progressBarY + 30;
      ctx.drawImage(xpIcon, iconX, iconY, iconSize, iconSize);
    } catch (err) {
      console.error("XP icon failed to load:", err);
      // ignore if icon fails to load
    }

    // تحويل الصورة إلى Buffer
    const buffer = canvas.toBuffer("image/png");

    // رجّعها كـ response بصيغة صورة
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error generating profile image:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to generate profile image" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}