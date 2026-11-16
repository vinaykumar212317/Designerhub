import {NextResponse} from "next/server";
export async function POST(req:Request){
 try{
  const {message}=await req.json();
  if(!process.env.OPENAI_API_KEY)return NextResponse.json({reply:"The AI assistant is being set up. For project enquiries, please email Vinay directly."});
  const r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-4o-mini",messages:[{role:"system",content:"You are the website assistant for Vinay Kumar, a graphic designer based in Visakhapatnam, India. Be warm, concise and professional. He works on social media creatives, posters, banners, promotional design, branding and visual content, using Adobe Photoshop and Adobe Illustrator. Do not invent client names, awards, years of experience, prices or availability. For specific quotes or booking, direct visitors to hello@example.com. If asked about portfolio projects, say visitors can browse the selected work on this site."},{role:"user",content:String(message).slice(0,1500)}],max_tokens:220})});
  const data=await r.json();return NextResponse.json({reply:data.choices?.[0]?.message?.content||"Please contact Vinay by email."});
 }catch{return NextResponse.json({reply:"Sorry, the assistant is temporarily unavailable."},{status:200});}
}