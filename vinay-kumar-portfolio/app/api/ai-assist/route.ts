import {NextResponse} from "next/server";
export async function POST(req:Request){
 try{const {prompt}=await req.json();if(!process.env.OPENAI_API_KEY)return NextResponse.json({error:"Add OPENAI_API_KEY in your Vercel environment variables to enable AI."},{status:200});
 const r=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-4o-mini",messages:[{role:"system",content:"You are a premium creative portfolio assistant. Help a graphic designer write concise, truthful project descriptions, portfolio copy and professional client communication. Never invent credentials or project facts."},{role:"user",content:String(prompt).slice(0,2000)}],max_tokens:350})});
 const d=await r.json();return NextResponse.json({result:d.choices?.[0]?.message?.content||"No response generated."});
 }catch{return NextResponse.json({error:"AI request failed."},{status:200});}
}