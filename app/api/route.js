// app/api/verify-recaptcha/route.js
export async function POST(req) {
    const { token } = await req.json();
    if (!token) return new Response(JSON.stringify({ success: false, error: "Token missing" }), { status: 400 });
  
    const secret = "6Le5ktwrAAAAADFattJUJnb-UtonC7JKGZviH6Vi";
  
    try {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
        { method: "POST" }
      );
      const data = await response.json();
  
      if (data.success) {
        // نرجع الرقم اليومي هنا
        const dailyNumber = Math.floor(Math.random() * 1000); // مثال: رقم عشوائي
        return new Response(JSON.stringify({ success: true, number: dailyNumber }), { status: 200 });
       
      } else {
        return new Response(JSON.stringify({ success: false, error: data["error-codes"] }), { status: 200 });
      }
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
    }
  }
  