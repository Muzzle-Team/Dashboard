"use client";

import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function DailyNumber() {
  const recaptchaRef = useRef();
  const [number, setNumber] = useState(null);
  const [message, setMessage] = useState("");

  const handleCaptchaChange = async (token) => {
    if (!token) return;

    setMessage("جارٍ التحقق من reCAPTCHA...");

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();

      if (data.success) {
        // هنا نرجع الرقم من الـ backend
        setNumber(data.number);
        setMessage("✅ تم التحقق بنجاح!");
      } else {
        setMessage("❌ فشل التحقق من reCAPTCHA");
      }
    } catch (err) {
      setMessage("❌ خطأ في الاتصال بالـ backend");
    }
  };

  return (
    <div className="meteor ripple" style={{ padding: "50px", fontFamily: "sans-serif" }}>
      <h1>خد رقم الدايلي</h1>

      {!number && (
        <ReCAPTCHA
          sitekey="6Le5ktwrAAAAAKxS5RUzLd5YQHSX5R1xhcm72lae"
          ref={recaptchaRef}
          onChange={handleCaptchaChange} // هتشتغل مباشرة بعد الحل
        />
      )}

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
      {number !== null && (
        <p style={{ marginTop: "20px", fontSize: "24px", fontWeight: "bold", color: "green" }}>
          رقمك اليومي: {number}
        </p>
      )}
    </div>
  );
}
