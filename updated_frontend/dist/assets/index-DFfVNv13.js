import{r as i,C as v,a as A,L as S,P as N,b as _,A as k,B as O,p as W,d as D,i as I,j as s,R as P}from"./charts-CXwA4iir.js";import{r as B}from"./react-BXzAdMEE.js";import"./map-ofWW7qUh.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();var g,p=B;g=p.createRoot,p.hydrateRoot;/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=(...r)=>r.filter((e,n,a)=>!!e&&e.trim()!==""&&a.indexOf(e)===n).join(" ").trim();/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,n,a)=>a?a.toUpperCase():n.toLowerCase());/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=r=>{const e=U(r);return e.charAt(0).toUpperCase()+e.slice(1)};/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var d={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=r=>{for(const e in r)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1},z=i.createContext({}),F=()=>i.useContext(z),M=i.forwardRef(({color:r,size:e,strokeWidth:n,absoluteStrokeWidth:a,className:t="",children:o,iconNode:c,...u},x)=>{const{size:l=24,strokeWidth:m=2,absoluteStrokeWidth:C=!1,color:w="currentColor",className:b=""}=F()??{},E=a??C?Number(n??m)*24/Number(e??l):n??m;return i.createElement("svg",{ref:x,...d,width:e??l??d.width,height:e??l??d.height,stroke:r??w,strokeWidth:E,className:y("lucide",b,t),...!o&&!$(u)&&{"aria-hidden":"true"},...u},[...c.map(([j,L])=>i.createElement(j,L)),...Array.isArray(o)?o:[o]])});/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=(r,e)=>{const n=i.forwardRef(({className:a,...t},o)=>i.createElement(M,{ref:o,iconNode:e,className:y(`lucide-${R(f(r))}`,`lucide-${r}`,a),...t}));return n.displayName=f(r),n};/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],K=T("shield-check",H),Z="".trim().replace(/\/$/,"");Z.replace(/^http/,"ws");v.register(A,S,N,_,k,O,W,D,I);new Date().toISOString();function q(){return s.jsx("div",{className:"maintenance-shell",children:s.jsxs("article",{className:"card maintenance-card",children:[s.jsx("div",{className:"card-head",children:s.jsxs("div",{className:"card-head-left",children:[s.jsx(K,{size:16,className:"card-head-icon"}),s.jsx("h2",{children:"Website Under Maintenance"})]})}),s.jsxs("div",{className:"card-body maintenance-body",children:[s.jsx("p",{children:"We're doing scheduled updates to the Wildlife Crime Intelligence Center."}),s.jsx("p",{className:"maintenance-muted",children:"Please check back soon."})]})]})})}function V(){return s.jsx(q,{})}class G extends P.Component{constructor(e){super(e),this.state={hasError:!1,message:""}}static getDerivedStateFromError(e){return{hasError:!0,message:e instanceof Error?e.message:"Unknown runtime error"}}componentDidCatch(e){console.error("Dashboard runtime error:",e)}render(){return this.state.hasError?s.jsxs("div",{style:{padding:"24px",color:"#e8edff",fontFamily:"Inter, sans-serif"},children:[s.jsx("h2",{style:{marginTop:0},children:"Dashboard failed to load"}),s.jsx("p",{style:{opacity:.9},children:this.state.message||"Unexpected client error."}),s.jsxs("p",{style:{opacity:.8},children:["Open ",s.jsx("a",{href:"/legacy?legacy=1",style:{color:"#9ec2ff"},children:"legacy dashboard"})," while this is being fixed."]})]}):this.props.children}}const h=document.getElementById("root");if(h){window.addEventListener("error",r=>{console.error("Window error:",r.error||r.message)}),window.addEventListener("unhandledrejection",r=>{console.error("Unhandled promise rejection:",r.reason)});try{window.__WILDLIFE_DASHBOARD_BOOTED__=!0,g(h).render(s.jsx(G,{children:s.jsx(V,{})}))}catch(r){console.error("Fatal dashboard bootstrap error:",r),h.innerHTML=`
      <div style="padding:24px;color:#e8edff;font-family:Inter,sans-serif">
        <h2 style="margin-top:0">Dashboard failed to initialize</h2>
        <p>${r instanceof Error?r.message:"Unknown bootstrap error"}</p>
        <p><a href="/legacy?legacy=1" style="color:#9ec2ff">Open legacy dashboard</a></p>
      </div>
    `}}
