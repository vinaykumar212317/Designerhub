 "use client";
import { useEffect, useState } from "react";

type Project = { id:string; title:string; category:string; year:string; image:string; description:string; };
const initial:Project[] = [
 {id:"01",title:"Visual Identity Study",category:"BRANDING",year:"2026",image:"https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=85",description:"A considered identity direction exploring form, contrast and memorable brand expression."},
 {id:"02",title:"Culture in Motion",category:"POSTER DESIGN",year:"2026",image:"https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=85",description:"An expressive poster concept balancing strong typography with a confident visual rhythm."},
 {id:"03",title:"Everyday Objects",category:"ART DIRECTION",year:"2025",image:"https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1200&q=85",description:"A minimal visual study focused on composition, material and quiet detail."},
 {id:"04",title:"The New Edit",category:"SOCIAL CAMPAIGN",year:"2025",image:"https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85",description:"A flexible campaign system designed for clear, consistent digital communication."}
];
export default function Home(){
 const [projects,setProjects]=useState<Project[]>(initial);
 const [chatOpen,setChatOpen]=useState(false);
 const [messages,setMessages]=useState<{role:string;text:string}[]>([{role:"assistant",text:"Hello. I’m Vinay’s portfolio assistant. Ask me about his design approach, services or availability."}]);
 const [question,setQuestion]=useState("");
 const [busy,setBusy]=useState(false);
 useEffect(()=>{try{const saved=localStorage.getItem("vinay-projects");if(saved)setProjects(JSON.parse(saved));}catch{}},[]);
 async function send(){if(!question.trim()||busy)return;const q=question.trim();setQuestion("");setMessages(m=>[...m,{role:"user",text:q}]);setBusy(true);
  try{const r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:q})});const d=await r.json();setMessages(m=>[...m,{role:"assistant",text:d.reply||"Please contact Vinay directly for more details."}]);}
  catch{setMessages(m=>[...m,{role:"assistant",text:"The AI assistant is not configured yet. Please use the contact link to reach Vinay."}]);}finally{setBusy(false);}
 }
 return <main>
  <nav className="nav"><a className="wordmark" href="#">VINAY KUMAR<span>®</span></a><div className="navlinks"><a href="#work">WORK</a><a href="#about">ABOUT</a><a href="#contact">CONTACT</a><a className="availability" href="mailto:hello@example.com">AVAILABLE FOR WORK ↗</a></div></nav>
  <section className="hero"><div className="eyebrow"><span className="dot"/> INDEPENDENT GRAPHIC DESIGNER <span>— VISAKHAPATNAM, INDIA</span></div><h1>Ideas made<br/><em>visible.</em></h1><div className="hero-bottom"><p>Thoughtful visuals. Clear communication.<br/>Design that makes a lasting impression.</p><a href="#work" className="round-link">EXPLORE SELECTED WORK <span>↓</span></a></div><div className="hero-index">PORTFOLIO / 2026</div></section>
  <section id="work" className="work section"><div className="section-head"><div><div className="eyebrow">01 / SELECTED WORK</div><h2>A selection of<br/><em>visual stories.</em></h2></div><p>A growing collection of graphic design, creative direction and visual experiments.</p></div>
   <div className="project-grid">{projects.map((p,i)=><article className="project" key={p.id}><a className="project-image" href={p.image} target="_blank" rel="noreferrer"><img src={p.image} alt={p.title}/><span className="image-arrow">↗</span></a><div className="project-meta"><div><h3>{p.title}</h3><p>{p.category}</p></div><span>{p.year}</span></div><p className="project-description">{p.description}</p></article>)}</div>
  </section>
  <section id="about" className="about section"><div className="eyebrow">02 / A LITTLE ABOUT ME</div><div className="about-content"><h2>Design is more<br/>than how it <em>looks.</em></h2><div><p className="about-lead">It’s how it communicates.</p><p>I’m Vinay Kumar, a graphic designer interested in creating clean, purposeful and memorable visual experiences. I work with typography, imagery, layout and colour to turn ideas into engaging design.</p><p>From social media creatives and promotional artwork to posters, banners and brand visuals, I enjoy bringing clarity and character to every brief.</p><div className="tool-list"><span>ADOBE PHOTOSHOP</span><span>ADOBE ILLUSTRATOR</span><span>VISUAL DESIGN</span><span>CREATIVE THINKING</span></div></div></div></section>
  <section className="services section"><div className="eyebrow">03 / WHAT I DO</div><div className="service-list">{["Social media & digital creatives","Posters, banners & campaigns","Branding & visual identity","Marketing & promotional design"].map((s,i)=><div className="service-row" key={s}><span>0{i+1}</span><h3>{s}</h3><span>↗</span></div>)}</div></section>
  <section id="contact" className="contact section"><div className="eyebrow">04 / HAVE A PROJECT IN MIND?</div><h2>Let’s make<br/><em>something matter.</em></h2><a className="contact-link" href="mailto:hello@example.com">LET’S TALK <span>↗</span></a><div className="contact-bottom"><span>VISAKHAPATNAM, INDIA</span><span>OPEN TO REMOTE OPPORTUNITIES</span><a href="https://www.linkedin.com/" target="_blank">LINKEDIN ↗</a></div></section>
  <footer><a className="wordmark" href="#">VINAY KUMAR<span>®</span></a><span>© 2026 — DESIGNED WITH INTENTION</span><a href="#top">BACK TO TOP ↑</a></footer>
  <button className="chat-launch" onClick={()=>setChatOpen(!chatOpen)} aria-label="Open AI assistant">{chatOpen?"×":"CHAT WITH AI ↗"}</button>
  {chatOpen&&<div className="chat-panel"><div className="chat-head"><div><b>PORTFOLIO ASSISTANT</b><small>ASK ME ABOUT VINAY</small></div><button onClick={()=>setChatOpen(false)}>×</button></div><div className="chat-messages">{messages.map((m,i)=><div className={"bubble "+m.role} key={i}>{m.text}</div>)}</div><form onSubmit={e=>{e.preventDefault();send()}}><input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ask a question..." /><button disabled={busy}>↑</button></form></div>}
 </main>
}