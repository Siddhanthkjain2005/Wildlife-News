import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, Leaf, PawPrint, ShieldCheck, Pause, Play } from "lucide-react";
import tigerImage from "../assets/tiger-sanctuary.jpg";

export function ConservationBrand() {
  return <div className="conservation-brand"><span className="conservation-logo"><PawPrint size={24} /></span><span>WILDGUARD<small>WILDLIFE INTELLIGENCE</small></span></div>;
}

export function PartnerMark() {
  return <div className="partner-mark"><span className="partner-monogram">WTI</span><span>In collaboration with<strong>Wildlife Trust of India</strong></span></div>;
}

// A projected 3D sphere. The land silhouettes are decorative, not incident locations.
function FieldGlobe({ paused }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame, visible = true, angle = 0.5, previous = 0;
    const points = [];
    const lands = [[-110,45,42,26],[-65,-15,18,40],[20,4,25,35],[65,48,70,23],[80,20,11,20],[135,-25,22,15],[-42,72,17,12]];
    for (let lat = -78; lat < 80; lat += 5) for (let lon = -180; lon < 180; lon += 5) {
      const land = lands.some(([x,y,w,h]) => ((lon-x)/w)**2 + ((lat-y)/h)**2 < 1);
      points.push({lat:lat*Math.PI/180,lon:lon*Math.PI/180,land});
    }
    function draw(time = 0) {
      const size = canvas.clientWidth;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(size*dpr)) { canvas.width = Math.round(size*dpr); canvas.height = Math.round(size*dpr); }
      ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,size,size);
      if (!paused && !reduced.matches && visible && previous) angle += Math.min(time-previous,40)*0.00009;
      previous = time;
      const c = size/2, r = size*0.37;
      const glow = ctx.createRadialGradient(c-r*.25,c-r*.3,0,c,c,r*1.4);
      glow.addColorStop(0,"#234f40");glow.addColorStop(.66,"#102e26");glow.addColorStop(1,"#102e2600");
      ctx.fillStyle=glow;ctx.fillRect(0,0,size,size);
      ctx.strokeStyle="#99c99e25";ctx.lineWidth=1;ctx.beginPath();ctx.arc(c,c,r,0,Math.PI*2);ctx.stroke();
      points.forEach(({lat,lon,land})=>{
        const x = Math.cos(lat)*Math.sin(lon+angle), z = Math.cos(lat)*Math.cos(lon+angle), y = Math.sin(lat);
        if (z < 0) return;
        const yy = y*.94-z*.34;
        ctx.fillStyle = land ? `rgba(200,214,157,${.25+z*.65})` : `rgba(94,148,120,${.08+z*.18})`;
        ctx.beginPath();ctx.arc(c+x*r,c-yy*r,land?1.65:0.7,0,Math.PI*2);ctx.fill();
      });
      ctx.save();ctx.translate(c,c);ctx.rotate(-.35);ctx.strokeStyle="#d4c79255";ctx.beginPath();ctx.ellipse(0,0,r*1.18,r*.3,0,0,Math.PI*2);ctx.stroke();
      const orbit = angle*2;ctx.fillStyle="#e7d9a4";ctx.shadowColor="#e7d9a4";ctx.shadowBlur=12;ctx.beginPath();ctx.arc(Math.cos(orbit)*r*1.18,Math.sin(orbit)*r*.3,3,0,Math.PI*2);ctx.fill();ctx.restore();
      if (!paused && !reduced.matches && visible) frame=requestAnimationFrame(draw);
    }
    const observer = new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;cancelAnimationFrame(frame);previous=0;if(visible)draw();});observer.observe(canvas);
    const resize = new ResizeObserver(()=>{cancelAnimationFrame(frame);previous=0;draw();});resize.observe(canvas);
    const motionChange = ()=>{cancelAnimationFrame(frame);previous=0;draw();};reduced.addEventListener("change",motionChange);
    draw();return()=>{cancelAnimationFrame(frame);observer.disconnect();resize.disconnect();reduced.removeEventListener("change",motionChange);};
  },[paused]);
  return <canvas ref={ref} className="field-globe" aria-label="Decorative rotating three-dimensional conservation globe" role="img" />;
}

export default function ConservationHero({ onExplore, onIntelligence }) {
  const [paused, setPaused] = useState(false);
  const heroRef = useRef(null);
  function parallax(event) {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    heroRef.current?.style.setProperty("--pan-x", `${((event.clientX-box.left)/box.width-.5)*-12}px`);
    heroRef.current?.style.setProperty("--pan-y", `${((event.clientY-box.top)/box.height-.5)*-8}px`);
  }
  return <div className={`conservation-overview ${paused ? "motion-paused" : ""}`}>
    <section className="wildlife-hero" ref={heroRef} onPointerMove={parallax} onPointerLeave={()=>{heroRef.current?.style.setProperty("--pan-x","0px");heroRef.current?.style.setProperty("--pan-y","0px");}}>
      <img className="hero-wildlife-image" src={tigerImage} alt="Bengal tiger emerging from a lush green forest" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="hero-copy">
        <span className="eyebrow"><span className="tiny-diamond" /> INTELLIGENCE FOR CONSERVATION</span>
        <h1>A safer future.<br /><em>A wilder world.</em></h1>
        <p>Turn signals into action. Protect India’s wildlife<br className="desktop-break" /> with intelligence that makes a difference.</p>
        <button className="mission-button" onClick={onExplore}>Explore incidents <ArrowUpRight size={17} /></button>
        <div className="hero-partner"><ShieldCheck size={15} /> In collaboration with <strong>Wildlife Trust of India</strong></div>
      </div>
      <div className="species-caption"><span>PANTHERA TIGRIS</span><strong>The wild is worth protecting.</strong></div>
      <span className="hero-corner" aria-hidden="true">01 / INDIA’S WILDLIFE</span>
    </section>
    <section className="mission-card">
      <div className="mission-card-top"><span className="eyebrow">ONE PLANET. ONE MISSION.</span><button className="motion-toggle" aria-label={paused ? "Resume ambient animation" : "Pause ambient animation"} onClick={()=>setPaused(!paused)}>{paused ? <Play size={13}/> : <Pause size={13}/>}</button></div>
      <FieldGlobe paused={paused} />
      <div className="mission-card-copy"><span className="mission-mini"><Leaf size={13} /> CONNECTED FOR CONSERVATION</span><h2>Every signal matters.</h2><p>See the connections.<br />Stay ahead of wildlife crime.</p><button onClick={onIntelligence}>Explore intelligence <ArrowRight size={16}/></button></div>
    </section>
  </div>;
}

export function LoginStory() {
  return <section className="login-story"><img src={tigerImage} alt="Bengal tiger in the Indian forest" /><div className="login-story-shade"/><ConservationBrand/><div className="login-story-copy"><span className="eyebrow">PROTECT WHAT CANNOT BE REPLACED.</span><h1>Their future.<br /><em>Our responsibility.</em></h1><p>Intelligence that connects the dots.<br />Action that keeps the wild alive.</p><PartnerMark /></div><div className="login-story-foot"><span>WILDLIFE CRIME INTELLIGENCE PLATFORM</span><span>INDIA · CONSERVATION FIRST</span></div></section>;
}
