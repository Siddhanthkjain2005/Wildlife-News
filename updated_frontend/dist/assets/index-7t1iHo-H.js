import{r as l,j as e,L as es,B as ve,D as ss,C as ts,a as as,b as ns,P as rs,d as is,A as os,e as ls,p as cs,f as ds,i as hs,R as ps}from"./charts-FKz6KObn.js";import{r as ms}from"./react-DAgX4J4O.js";import{L as ae}from"./map-TYzTYvzY.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))o(c);new MutationObserver(c=>{for(const i of c)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(c){const i={};return c.integrity&&(i.integrity=c.integrity),c.referrerPolicy&&(i.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?i.credentials="include":c.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(c){if(c.ep)return;c.ep=!0;const i=a(c);fetch(c.href,i)}})();var Fe,Ne=ms;Fe=Ne.createRoot,Ne.hydrateRoot;/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Le=(...s)=>s.filter((t,a,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===a).join(" ").trim();/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const us=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xs=s=>s.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,a,o)=>o?o.toUpperCase():a.toLowerCase());/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=s=>{const t=xs(s);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var oe={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fs=s=>{for(const t in s)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},gs=l.createContext({}),js=()=>l.useContext(gs),bs=l.forwardRef(({color:s,size:t,strokeWidth:a,absoluteStrokeWidth:o,className:c="",children:i,iconNode:r,...x},n)=>{const{size:f=24,strokeWidth:h=2,absoluteStrokeWidth:g=!1,color:b="currentColor",className:y=""}=js()??{},N=o??g?Number(a??h)*24/Number(t??f):a??h;return l.createElement("svg",{ref:n,...oe,width:t??f??oe.width,height:t??f??oe.height,stroke:s??b,strokeWidth:N,className:Le("lucide",y,c),...!i&&!fs(x)&&{"aria-hidden":"true"},...x},[...r.map(([d,k])=>l.createElement(d,k)),...Array.isArray(i)?i:[i]])});/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=(s,t)=>{const a=l.forwardRef(({className:o,...c},i)=>l.createElement(bs,{ref:i,iconNode:t,className:Le(`lucide-${us(ke(s))}`,`lucide-${s}`,o),...c}));return a.displayName=ke(s),a};/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ys=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],Re=m("activity",ys);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vs=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Ns=m("arrow-right",vs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ks=[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]],Ee=m("briefcase",ks);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ws=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],Ie=m("chart-column",ws);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _s=[["path",{d:"M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",key:"pzmjnu"}],["path",{d:"M21.21 15.89A10 10 0 1 1 8 2.83",key:"k2fpak"}]],Cs=m("chart-pie",_s);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zs=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],we=m("chevron-down",zs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ss=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Ms=m("chevron-right",Ss);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $s=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],_e=m("circle-alert",$s);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const As=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]],Fs=m("database",As);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ls=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],le=m("download",Ls);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rs=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],ne=m("external-link",Rs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Es=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]],Ce=m("file-spreadsheet",Es);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Is=[["path",{d:"M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z",key:"15baut"}],["path",{d:"M18 12v.5",key:"18hhni"}],["path",{d:"M16 17.93a9.77 9.77 0 0 1 0-11.86",key:"16dt7o"}],["path",{d:"M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33",key:"l9di03"}],["path",{d:"M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4",key:"1kjonw"}],["path",{d:"m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98",key:"1zlm23"}]],Ts=m("fish",Is);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bs=[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",key:"1slcih"}]],Os=m("flame",Bs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qs=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]],ze=m("funnel",qs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ps=[["path",{d:"M10 16h.01",key:"1bzywj"}],["path",{d:"M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"18tbho"}],["path",{d:"M21.946 12.013H2.054",key:"zqlbp7"}],["path",{d:"M6 16h.01",key:"1pmjb7"}]],Hs=m("hard-drive",Ps);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Us=[["polyline",{points:"22 12 16 12 14 15 10 15 8 12 2 12",key:"o97t9d"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"oot6mr"}]],Te=m("inbox",Us);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ds=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],Ws=m("info",Ds);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vs=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],Ys=m("layout-dashboard",Vs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Js=[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]],de=m("lightbulb",Js);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gs=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],Ks=m("loader-circle",Gs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qs=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],Zs=m("lock",Qs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xs=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],et=m("log-out",Xs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const st=[["path",{d:"M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0",key:"11u0oz"}],["circle",{cx:"12",cy:"8",r:"2",key:"1822b1"}],["path",{d:"M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712",key:"q8zwxj"}]],Be=m("map-pinned",st);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tt=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],Oe=m("map-pin",tt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const at=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],nt=m("menu",at);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rt=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]],it=m("message-square",rt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ot=[["rect",{x:"16",y:"16",width:"6",height:"6",rx:"1",key:"4q2zg0"}],["rect",{x:"2",y:"16",width:"6",height:"6",rx:"1",key:"8cvhb9"}],["rect",{x:"9",y:"2",width:"6",height:"6",rx:"1",key:"1egb70"}],["path",{d:"M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",key:"1jsf9p"}],["path",{d:"M12 12V8",key:"2874zd"}]],he=m("network",ot);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lt=[["path",{d:"M12 16h.01",key:"1drbdi"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",key:"1fd625"}]],ct=m("octagon-alert",lt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dt=[["path",{d:"M16.247 7.761a6 6 0 0 1 0 8.478",key:"1fwjs5"}],["path",{d:"M19.075 4.933a10 10 0 0 1 0 14.134",key:"ehdyv1"}],["path",{d:"M4.925 19.067a10 10 0 0 1 0-14.134",key:"1q22gi"}],["path",{d:"M7.753 16.239a6 6 0 0 1 0-8.478",key:"r2q7qm"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],qe=m("radio",dt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ht=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],pe=m("refresh-cw",ht);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pt=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],mt=m("rotate-ccw",pt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ut=[["path",{d:"m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5",key:"dzhfyz"}],["path",{d:"M16.5 7.5 19 5",key:"1ltcjm"}],["path",{d:"m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5",key:"nfoymv"}],["path",{d:"M9 21a6 6 0 0 0-6-6",key:"1iajcf"}],["path",{d:"M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z",key:"nv9zqy"}]],Pe=m("satellite",ut);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xt=[["path",{d:"m13.5 8.5-5 5",key:"1cs55j"}],["path",{d:"m8.5 8.5 5 5",key:"a8mexj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],ft=m("search-x",xt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gt=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],jt=m("search",gt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bt=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],He=m("shield-check",bt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yt=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],vt=m("shield",yt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nt=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],kt=m("sparkles",Nt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wt=[["path",{d:"M12 3v18",key:"108xh3"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}]],Ue=m("table",wt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _t=[["path",{d:"M16 17h6v-6",key:"t6n2it"}],["path",{d:"m22 17-8.5-8.5-5 5L2 7",key:"x473p"}]],Ct=m("trending-down",_t);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],St=m("trending-up",zt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mt=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],$t=m("triangle-alert",Mt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const At=[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]],Ft=m("upload",At);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lt=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],Rt=m("user",Lt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Et=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],It=m("users",Et);function Tt(s){if(!s)return"-";const t=new Date(s);return Number.isNaN(t.getTime())?s:t.toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function Bt(s){if(!s)return"-";const t=new Date(s);return Number.isNaN(t.getTime())?s:t.toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function xe(s){const t=Number(s||0);return t>80?"high":t>=50?"medium":"low"}const Ot=[{title:"Monitoring",items:[{id:"overview",label:"Overview",icon:Ys},{id:"map",label:"Threat Map",icon:Be},{id:"alerts",label:"Live Alerts",icon:qe}]},{title:"Analysis",items:[{id:"networks",label:"Network",icon:he},{id:"analytics",label:"Analytics",icon:Ie},{id:"incidents",label:"Incidents",icon:Ue}]},{title:"Intelligence",items:[{id:"osint",label:"OSINT Feed",icon:Pe},{id:"reco",label:"Recommendations",icon:de}]}];function qt({activeSection:s,onSelect:t,isOpen:a,syncStatus:o,lastSync:c}){function i(x){t==null||t(x);const n=document.getElementById(`section-${x}`);n&&n.scrollIntoView({behavior:"smooth",block:"start"})}const r=!!(o!=null&&o.running);return e.jsxs("aside",{className:`sidebar ${a?"is-open":""}`,"aria-label":"Primary navigation",children:[e.jsxs("div",{className:"sidebar-head",children:[e.jsx("div",{className:"brand-mark","aria-hidden":"true",children:e.jsx(vt,{size:20,strokeWidth:2})}),e.jsxs("div",{className:"brand-copy",children:[e.jsx("div",{className:"brand-title",children:"Wildlife Intelligence"}),e.jsx("div",{className:"brand-sub",children:"Command Center"})]})]}),e.jsx("nav",{className:"sidebar-body",children:Ot.map(x=>e.jsxs("div",{className:"nav-group",children:[e.jsx("div",{className:"nav-group-title",children:x.title}),x.items.map(({id:n,label:f,icon:h})=>{const g=s===n;return e.jsxs("button",{type:"button",className:`nav-item ${g?"is-active":""}`,onClick:()=>i(n),"aria-current":g?"page":void 0,children:[e.jsx(h,{size:16,className:"nav-icon",strokeWidth:2}),e.jsx("span",{children:f}),e.jsx("span",{className:"nav-dot","aria-hidden":"true"})]},n)})]},x.title))}),e.jsx("div",{className:"sidebar-foot",children:e.jsxs("div",{className:"sync-card",children:[e.jsxs("div",{className:"sync-row",children:[e.jsx("span",{children:"Data sync"}),e.jsxs("span",{className:`pulse ${r?"":"is-idle"}`,children:[e.jsx("span",{className:"pulse-dot"}),r?"Live":"Idle"]})]}),e.jsxs("div",{className:"sync-row",children:[e.jsx("span",{children:"Last update"}),e.jsx("strong",{className:"mono",children:Bt(c)})]})]})})]})}function Pt({activeSection:s,busy:t,syncStatus:a,onRefresh:o,onExport:c,onToggleMenu:i,onLogout:r}){const x={overview:"Overview",map:"Threat Map",alerts:"Live Alerts",analytics:"Analytics",incidents:"Incidents",osint:"OSINT Feed",reco:"Recommendations"},n=!!(a!=null&&a.running),f=n?"Search in progress":"Auto search active",h=(a==null?void 0:a.progress)||{},g=String((a==null?void 0:a.message)||"").trim(),b=typeof h.stage=="string"&&h.stage!=="-"?h.stage:"",y=typeof h.provider=="string"&&h.provider!=="-"?h.provider:"",N=typeof h.language=="string"&&h.language!=="-"?h.language:"",d=typeof h.query=="string"&&h.query!=="-"?h.query:"",k=[y,N].filter(Boolean).join(" / "),A=[];b&&A.push(`stage: ${b}`),k&&A.push(k),d&&A.push(`q: ${d}`);const S=n?A.join(" • ")||g||"Collecting live reports":"",[w,z]=l.useState(null),B=l.useRef(null),H=l.useRef(null);l.useEffect(()=>{function L($){B.current&&!B.current.contains($.target)&&H.current&&!H.current.contains($.target)&&z(null)}function U($){$.key==="Escape"&&z(null)}return w&&(document.addEventListener("mousedown",L),document.addEventListener("keydown",U)),()=>{document.removeEventListener("mousedown",L),document.removeEventListener("keydown",U)}},[w]);const V=()=>typeof import.meta<"u"?"".trim().replace(/\/$/,""):"",D=L=>{c(L),z(null)},re=()=>{window.location.href=`${V()}/api/public/download-csv`,z(null)},C=()=>{window.location.href=`${V()}/api/public/download-db`,z(null)},X=()=>{z(null);const L=document.createElement("input");L.type="file",L.accept=".db,.sqlite,.sqlite3",L.onchange=async U=>{var Y;const $=(Y=U.target.files)==null?void 0:Y[0];if(!$||!confirm(`Restore database from "${$.name}"? This will replace all current data.`))return;const ee=new FormData;ee.append("file",$);try{const P=await(await fetch(`${V()}/api/public/upload-db`,{method:"POST",body:ee})).json();P.ok?(alert(`Database restored!

Total rows: ${P.total_rows}
Poaching articles: ${P.poaching_rows}
Predictor retrained: ${P.predictor_retrained?"Yes":"No"}`),window.location.reload()):alert(`Restore failed: ${P.detail||"Unknown error"}`)}catch(J){alert(`Upload failed: ${J.message}`)}},L.click()};return e.jsxs("header",{className:"topbar",children:[e.jsxs("div",{className:"topbar-left",children:[e.jsx("button",{type:"button",className:"mobile-menu",onClick:i,"aria-label":"Open navigation menu",children:e.jsx(nt,{size:18})}),e.jsxs("div",{className:"breadcrumb",children:[e.jsx("span",{children:"Wildlife Intelligence"}),e.jsx("span",{className:"sep",children:"/"}),e.jsx("strong",{children:x[s]||"Overview"})]}),e.jsxs("div",{className:"india-exclusive-badge hidden md:flex",children:[e.jsx("span",{className:"dot animate-pulse"}),e.jsx("span",{children:"India Exclusive Intelligence"})]})]}),e.jsx("div",{className:"topbar-center",children:e.jsxs("div",{className:`sync-pill ${n?"is-running":"is-idle"}`,role:"status","aria-live":"polite",children:[e.jsx("span",{className:"sync-pill-dot","aria-hidden":"true"}),e.jsx("span",{className:"sync-pill-label",children:f}),S?e.jsx("span",{className:"sync-pill-meta",children:S}):null]})}),e.jsxs("div",{className:"topbar-right",children:[e.jsxs("div",{className:"dropdown",ref:B,children:[e.jsxs("button",{type:"button",className:"btn",onClick:()=>z(w==="export"?null:"export"),"aria-haspopup":"menu","aria-expanded":w==="export",children:[e.jsx(le,{size:15}),e.jsx("span",{className:"btn-label",children:"Export"}),e.jsx(we,{size:13,className:`dropdown-caret ${w==="export"?"is-open":""}`})]}),w==="export"&&e.jsxs("div",{className:"dropdown-menu",role:"menu",children:[e.jsxs("button",{type:"button",role:"menuitem",className:"dropdown-item",onClick:()=>D("csv"),children:[e.jsx(le,{size:14}),e.jsx("span",{children:"Export as CSV"})]}),e.jsxs("button",{type:"button",role:"menuitem",className:"dropdown-item",onClick:()=>D("excel"),children:[e.jsx(Ce,{size:14}),e.jsx("span",{children:"Export as Excel"})]}),e.jsxs("button",{type:"button",role:"menuitem",className:"dropdown-item",onClick:()=>D("excel_incidents_reports"),children:[e.jsx(Ce,{size:14}),e.jsx("span",{children:"Excel (2-Sheet)"})]})]})]}),e.jsxs("div",{className:"dropdown",ref:H,children:[e.jsxs("button",{type:"button",className:"btn",onClick:()=>z(w==="database"?null:"database"),"aria-haspopup":"menu","aria-expanded":w==="database",children:[e.jsx(Fs,{size:15}),e.jsx("span",{className:"btn-label",children:"Database"}),e.jsx(we,{size:13,className:`dropdown-caret ${w==="database"?"is-open":""}`})]}),w==="database"&&e.jsxs("div",{className:"dropdown-menu",role:"menu",children:[e.jsxs("button",{type:"button",role:"menuitem",className:"dropdown-item",onClick:re,children:[e.jsx(le,{size:14}),e.jsx("span",{children:"Download All Data (CSV)"})]}),e.jsxs("button",{type:"button",role:"menuitem",className:"dropdown-item",onClick:C,children:[e.jsx(Hs,{size:14}),e.jsx("span",{children:"Download Database"})]}),e.jsxs("button",{type:"button",role:"menuitem",className:"dropdown-item",onClick:X,children:[e.jsx(Ft,{size:14}),e.jsx("span",{children:"Upload Database"})]})]})]}),e.jsx("div",{className:"topbar-divider"}),e.jsxs("button",{type:"button",className:"btn btn-ghost",onClick:o,disabled:t,"aria-label":"Refresh data",children:[e.jsx(pe,{size:15,className:t?"spin":""}),e.jsx("span",{className:"btn-label",children:"Refresh"})]}),e.jsxs("button",{type:"button",className:"btn btn-ghost",onClick:r,"aria-label":"Logout",children:[e.jsx(et,{size:15}),e.jsx("span",{className:"btn-label",children:"Logout"})]})]}),e.jsx("style",{children:`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `})]})}function Ht(s){const t=Number(s||0);return Number.isFinite(t)?t>=1e3?t.toLocaleString("en-US"):t.toString():"0"}function Ut({value:s}){if(s==null)return null;const t=s>=0,a=t?St:Ct;return e.jsxs("span",{className:`kpi-trend ${t?"is-up":"is-down"}`,children:[e.jsx(a,{size:12}),Math.abs(s).toFixed(1),"%"]})}function Dt({summary:s,loading:t}){const a=(s==null?void 0:s.kpis)||s||{},o=[{id:"total",label:"Total Incidents",value:a.total_incidents??0,trend:a.trend_incidents,icon:ct,tone:"primary",hint:"All tracked events"},{id:"high",label:"High Risk",value:a.high_risk_count??a.high_risk??0,trend:a.trend_high_risk,icon:Os,tone:"danger",hint:"Risk score above 80"},{id:"states",label:"States Affected",value:a.states_affected??a.states_active??0,trend:a.trend_states,icon:Oe,tone:"default",hint:"With recent activity"},{id:"species",label:"Species Impacted",value:a.species_impacted??a.species_tracked??0,trend:a.trend_species,icon:Ts,tone:"warn",hint:"Unique species tracked"}];return t&&!s?e.jsx("div",{className:"kpi-grid","aria-busy":"true",children:Array.from({length:4}).map((c,i)=>e.jsx("div",{className:"skel skel-kpi"},i))}):e.jsx("div",{className:"kpi-grid",children:o.map(({id:c,label:i,value:r,trend:x,icon:n,tone:f,hint:h})=>e.jsxs("article",{className:`kpi-card ${f==="danger"?"is-danger":f==="primary"?"is-primary":f==="warn"?"is-warn":""}`,children:[e.jsxs("div",{className:"kpi-head",children:[e.jsx("div",{className:"kpi-label",children:i}),e.jsx("div",{className:"kpi-icon",children:e.jsx(n,{size:16,strokeWidth:2})})]}),e.jsxs("div",{className:"kpi-body",children:[e.jsx("div",{className:"kpi-value",children:Ht(r)}),e.jsx(Ut,{value:x})]}),e.jsx("div",{className:"kpi-meta",children:h})]},c))})}const me="".trim().replace(/\/$/,""),v=s=>me?`${me}${s}`:s,fe="wildlife_admin_token",Se=me.replace(/^http/,"ws"),Wt=s=>Se?`${Se}${s}`:`ws://${window.location.host}${s}`,Vt=2e4,_={adminLogin:v("/api/admin/login"),adminLogout:v("/api/admin/logout"),adminRefresh:v("/api/admin/refresh"),summary:v("/api/dashboard-summary"),chart:v("/api/chart-data"),map:v("/api/map-data"),alerts:v("/api/alerts?limit=60"),reports:v("/api/reports?limit=50"),osint:v("/api/osint-feed?limit=30"),syncStatus:v("/api/sync-status"),filterNews:v("/api/filter-news"),exportCsv:v("/api/export/csv"),exportPdf:v("/api/export/pdf"),exportExcel:v("/api/export/excel"),exportExcelIncidentsReports:v("/api/export/excel-incidents-reports"),exportBriefing:v("/api/export/briefing-pack"),publicDownloadCsv:v("/api/public/download-csv"),publicDownloadDb:v("/api/public/download-db"),publicUploadDb:v("/api/public/upload-db"),predictions:v("/api/predictions"),predictionsTrain:v("/api/predictions/train"),predictionsHotspots:v("/api/predictions/hotspots"),predictionsPersons:v("/api/predictions/persons"),graphNetworks:v("/api/graph/networks"),graphPersonProfile:s=>v(`/api/graph/person/${encodeURIComponent(s)}`),ragQuery:v("/api/rag/query"),searchSemantic:v("/api/search/semantic"),wsLive:s=>Wt(`/api/ws/live?token=${s}`)};function Z(s,t=""){const a=String(s||"").trim()||String(t||"").trim();return a?/^https?:\/\//i.test(a)?a:a.startsWith("//")?`https:${a}`:a.startsWith("/")?v(a):a.startsWith("www.")?`https://${a}`:/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(a)?`https://${a}`:"#":"#"}async function De(s,t={},a=Vt){const o=new AbortController,c=new AbortController,i=[o.signal,t.signal].filter(Boolean),r=()=>c.abort(),x=setTimeout(()=>o.abort(),a);i.forEach(n=>{if(n.aborted){r();return}n.addEventListener("abort",r,{once:!0})});try{return await fetch(s,{...t,signal:c.signal})}finally{clearTimeout(x),i.forEach(n=>n.removeEventListener("abort",r))}}async function T(s,{retry:t=!0,signal:a}={}){const o=ge(),c=o?{Authorization:`Bearer ${o}`}:{},i=await De(s,{cache:"no-store",headers:c,signal:a});if(i.status===401&&t&&o&&await We())return T(s,{retry:!1,signal:a});if(!i.ok){let r="";try{const n=await i.json();r=String((n==null?void 0:n.detail)||"").trim()}catch{r=""}const x=new Error(r||`HTTP ${i.status}`);throw x.status=i.status,x}return i.json()}async function Q(s,t,{includeAuth:a=!0,retry:o=!0,signal:c}={}){const i=a?ge():"",r={"Content-Type":"application/json"};i&&(r.Authorization=`Bearer ${i}`);const x=await De(s,{method:"POST",headers:r,body:JSON.stringify(t||{}),signal:c});if(x.status===401&&o&&i&&a&&await We())return Q(s,t,{includeAuth:a,retry:!1,signal:c});if(!x.ok){let n="";try{const h=await x.json();n=String((h==null?void 0:h.detail)||"").trim()}catch{n=""}const f=new Error(n||`HTTP ${x.status}`);throw f.status=x.status,f}return x.json()}async function We(){try{const s=await Q(_.adminRefresh,{},{includeAuth:!1});if(s!=null&&s.access_token)return Ve(s.access_token),!0}catch(s){console.error("Token refresh failed:",s)}return!1}function ge(){return String(localStorage.getItem(fe)||"").trim()}function Ve(s){const t=String(s||"").trim();t&&localStorage.setItem(fe,t)}function Yt(){localStorage.removeItem(fe)}function Me(s){const t=new URLSearchParams;return Object.entries(s).forEach(([a,o])=>{String(o||"").trim()!==""&&t.set(a,o)}),t.toString()}function Jt({mapData:s,onMapError:t}){var r;const a=l.useRef(null),o=l.useRef(null),c=l.useRef(null);l.useEffect(()=>{var x,n;if(!(!a.current||!s))try{o.current||(o.current=ae.map(a.current,{zoomControl:!0,attributionControl:!0}).setView([((x=s.center)==null?void 0:x.lat)||22.97,((n=s.center)==null?void 0:n.lng)||78.65],5),ae.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:12,attribution:"&copy; OpenStreetMap contributors"}).addTo(o.current),c.current=ae.layerGroup().addTo(o.current));const f=c.current;if(!f)return;f.clearLayers(),(s.markers||[]).slice(0,600).forEach(h=>{if(typeof h.lat!="number"||typeof h.lng!="number")return;const g=xe(h.risk_score),b=g==="high"?"#C75050":g==="medium"?"#C9933D":"#5A9E6F",y=ae.circleMarker([h.lat,h.lng],{radius:g==="high"?8:g==="medium"?7:6,color:b,fillColor:b,fillOpacity:.8,weight:2}),N=(h.title||"Incident").replace(/</g,"&lt;"),d=Z(h.open_url,h.url).replace(/"/g,"&quot;");y.bindPopup(`<div style="min-width:240px;font-family:Inter,sans-serif">
            <b style="font-size:14px;color:#1A1917">${N}</b>
            <div style="margin-top:6px;color:#6B6966;font-size:12px">${h.state||"-"} · ${h.district||"-"}</div>
            <div style="margin-top:8px;font-size:13px;color:#1A1917">Risk <b style="color:${b}">${Number(h.risk_score||0)}</b> · ${h.species||"—"}</div>
            <a href="${d}" target="_blank" rel="noopener" style="display:inline-block;margin-top:10px;color:#C17F59;font-weight:500">Open article →</a>
          </div>`),y.addTo(f)})}catch(f){console.error("Map rendering failed:",f),t==null||t("Map failed to render on this browser. Use legacy view as fallback.")}},[s,t]);const i=((r=s==null?void 0:s.markers)==null?void 0:r.length)||0;return e.jsxs("article",{className:"card map-card",id:"section-map",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{className:"card-head-left",children:[e.jsx(Be,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"National Threat Map"})]}),e.jsxs("span",{className:"card-count mono",children:[i," markers"]})]}),e.jsx("div",{className:"card-body-flush",style:{position:"relative",minHeight:460},children:e.jsx("div",{className:"map-surface",ref:a})}),e.jsxs("div",{className:"map-legend",children:[e.jsx("span",{className:"legend-dot high",children:"High risk"}),e.jsx("span",{className:"legend-dot medium",children:"Medium"}),e.jsx("span",{className:"legend-dot low",children:"Low"}),e.jsx("span",{style:{marginLeft:"auto",color:"var(--dim)"},children:"Tap a marker for details"})]})]})}const ue="#6B6966",$e="rgba(26, 25, 23, 0.06)",Ye="#6B6966",W={responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:Ye,font:{family:"Inter, sans-serif",size:11,weight:"500"},usePointStyle:!0,boxWidth:8,padding:14}},tooltip:{backgroundColor:"#FFFFFF",borderColor:"rgba(26, 25, 23, 0.12)",borderWidth:1,titleColor:"#1A1917",bodyColor:"#6B6966",padding:12,boxPadding:6,cornerRadius:12,titleFont:{family:"Inter, sans-serif",size:13,weight:"600"},bodyFont:{family:"JetBrains Mono, monospace",size:11}}},scales:{x:{ticks:{color:ue,font:{family:"Inter, sans-serif",size:10}},grid:{color:$e,drawBorder:!1},border:{display:!1}},y:{ticks:{color:ue,font:{family:"JetBrains Mono, monospace",size:10}},grid:{color:$e,drawBorder:!1},border:{display:!1}}}},Gt={responsive:!0,maintainAspectRatio:!1,cutout:"62%",plugins:{legend:{position:"right",labels:{color:Ye,font:{family:"Inter, sans-serif",size:11},usePointStyle:!0,boxWidth:8,padding:10}},tooltip:W.plugins.tooltip}};function Kt({chartData:s}){const t=(s==null?void 0:s.timeline)||{labels:[],incidents:[],high_risk:[],granularity:"monthly"},a=(s==null?void 0:s.top_states)||[],o=(s==null?void 0:s.species_dist)||(s==null?void 0:s.species_distribution)||[],c=(s==null?void 0:s.source_rank)||(s==null?void 0:s.source_rankings)||[],i={labels:t.labels,datasets:[{label:"Incidents",data:t.incidents,borderColor:"#C17F59",backgroundColor:g=>{const{ctx:b,chartArea:y}=g.chart;if(!y)return"rgba(193, 127, 89, 0.12)";const N=b.createLinearGradient(0,y.top,0,y.bottom);return N.addColorStop(0,"rgba(193, 127, 89, 0.2)"),N.addColorStop(1,"rgba(193, 127, 89, 0)"),N},fill:!0,tension:.4,borderWidth:2.5,pointRadius:0,pointHoverRadius:5,pointHoverBackgroundColor:"#C17F59"},{label:"High Risk",data:t.high_risk,borderColor:"#C75050",backgroundColor:g=>{const{ctx:b,chartArea:y}=g.chart;if(!y)return"rgba(199, 80, 80, 0.1)";const N=b.createLinearGradient(0,y.top,0,y.bottom);return N.addColorStop(0,"rgba(199, 80, 80, 0.18)"),N.addColorStop(1,"rgba(199, 80, 80, 0)"),N},fill:!0,tension:.4,borderWidth:2.5,pointRadius:0,pointHoverRadius:5,pointHoverBackgroundColor:"#C75050"}]},r={labels:a.map(g=>g.state),datasets:[{label:"Incidents",data:a.map(g=>g.count),backgroundColor:"rgba(193, 127, 89, 0.75)",hoverBackgroundColor:"#C17F59",borderRadius:6,borderSkipped:!1,barThickness:16}]},x=["#C17F59","#D4956F","#C9933D","#C75050","#5B7BA8","#5A9E6F","#8B7355","#A67B5B","#9C7B56","#7D7471"],n={labels:o.slice(0,10).map(g=>g.species),datasets:[{data:o.slice(0,10).map(g=>g.count),backgroundColor:x,borderColor:"#FFFFFF",borderWidth:3,hoverOffset:8}]},f={labels:c.slice(0,10).map(g=>g.source),datasets:[{label:"Reliability",data:c.slice(0,10).map(g=>Number(g.reliability_score||0)),backgroundColor:"rgba(91, 123, 168, 0.75)",hoverBackgroundColor:"#5B7BA8",borderRadius:6,borderSkipped:!1,barThickness:14}]},h={...W,indexAxis:"y",scales:{...W.scales,y:{...W.scales.y,ticks:{color:ue,font:{family:"Inter, sans-serif",size:10}}}}};return e.jsxs("div",{className:"charts-grid",id:"section-analytics",children:[e.jsxs("article",{className:"card chart-card",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{className:"card-head-left",children:[e.jsx(Re,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"Incident Timeline"})]}),e.jsx("span",{className:"badge",children:t.granularity||"daily"})]}),e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"chart-wrap",children:e.jsx(es,{data:i,options:W})})})]}),e.jsxs("article",{className:"card chart-card",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{className:"card-head-left",children:[e.jsx(Ie,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"Top States"})]}),e.jsx("span",{className:"card-count mono",children:a.length})]}),e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"chart-wrap",children:e.jsx(ve,{data:r,options:W})})})]}),e.jsxs("article",{className:"card chart-card",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{className:"card-head-left",children:[e.jsx(Cs,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"Species Distribution"})]}),e.jsx("span",{className:"card-count mono",children:o.length})]}),e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"chart-wrap",children:e.jsx(ss,{data:n,options:Gt})})})]}),e.jsxs("article",{className:"card chart-card",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{className:"card-head-left",children:[e.jsx(He,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"Source Reliability"})]}),e.jsx("span",{className:"card-count mono",children:c.length})]}),e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"chart-wrap",children:e.jsx(ve,{data:f,options:h})})})]})]})}const Qt={q:"",species:"",state:"",date_from:"",date_to:"",crime_type:"",severity:"",source:""};function Zt({filters:s,filterOptions:t,onChange:a,onApply:o,onBriefing:c}){const i=Object.values(s).filter(n=>String(n||"").trim()!=="").length;function r(n,f){a({...s,[n]:f})}function x(){a(Qt)}return e.jsxs("article",{className:"card filters-card",id:"section-incidents",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{className:"card-head-left",children:[e.jsx(ze,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"Analyst Filters"}),i>0?e.jsxs("span",{className:"badge",children:[i," active"]}):null]}),e.jsxs("button",{type:"button",className:"btn btn-ghost",onClick:x,children:[e.jsx(mt,{size:14}),e.jsx("span",{className:"btn-label",children:"Reset"})]})]}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"filter-grid",children:[e.jsxs("div",{className:"filter-field",style:{gridColumn:"span 2"},children:[e.jsx("label",{className:"filter-label",htmlFor:"f-search",children:"Search"}),e.jsxs("div",{className:"input-with-icon",children:[e.jsx(jt,{size:14,className:"icon"}),e.jsx("input",{id:"f-search",className:"input",placeholder:"Search title, summary, or keywords",value:s.q,onChange:n=>r("q",n.target.value),onKeyDown:n=>{n.key==="Enter"&&o()}})]})]}),e.jsxs("div",{className:"filter-field",children:[e.jsx("label",{className:"filter-label",htmlFor:"f-species",children:"Species"}),e.jsxs("select",{id:"f-species",className:"select",value:s.species,onChange:n=>r("species",n.target.value),children:[e.jsx("option",{value:"",children:"All species"}),(t.species||[]).map(n=>e.jsx("option",{value:n,children:n},n))]})]}),e.jsxs("div",{className:"filter-field",children:[e.jsx("label",{className:"filter-label",htmlFor:"f-state",children:"State"}),e.jsxs("select",{id:"f-state",className:"select",value:s.state,onChange:n=>r("state",n.target.value),children:[e.jsx("option",{value:"",children:"All states"}),(t.states||[]).map(n=>e.jsx("option",{value:n,children:n},n))]})]}),e.jsxs("div",{className:"filter-field",children:[e.jsx("label",{className:"filter-label",htmlFor:"f-crime",children:"Crime type"}),e.jsxs("select",{id:"f-crime",className:"select",value:s.crime_type,onChange:n=>r("crime_type",n.target.value),children:[e.jsx("option",{value:"",children:"All types"}),(t.crime_types||[]).map(n=>e.jsx("option",{value:n,children:n},n))]})]}),e.jsxs("div",{className:"filter-field",children:[e.jsx("label",{className:"filter-label",htmlFor:"f-source",children:"Source"}),e.jsxs("select",{id:"f-source",className:"select",value:s.source,onChange:n=>r("source",n.target.value),children:[e.jsx("option",{value:"",children:"All sources"}),(t.sources||[]).map(n=>e.jsx("option",{value:n,children:n},n))]})]}),e.jsxs("div",{className:"filter-field",children:[e.jsx("label",{className:"filter-label",htmlFor:"f-severity",children:"Severity"}),e.jsxs("select",{id:"f-severity",className:"select",value:s.severity,onChange:n=>r("severity",n.target.value),children:[e.jsx("option",{value:"",children:"All severity"}),e.jsx("option",{value:"high",children:"High"}),e.jsx("option",{value:"medium",children:"Medium"}),e.jsx("option",{value:"low",children:"Low"})]})]}),e.jsxs("div",{className:"filter-field",children:[e.jsx("label",{className:"filter-label",htmlFor:"f-from",children:"Date from"}),e.jsx("input",{id:"f-from",type:"date",className:"input",value:s.date_from,onChange:n=>r("date_from",n.target.value)})]}),e.jsxs("div",{className:"filter-field",children:[e.jsx("label",{className:"filter-label",htmlFor:"f-to",children:"Date to"}),e.jsx("input",{id:"f-to",type:"date",className:"input",value:s.date_to,onChange:n=>r("date_to",n.target.value)})]})]}),e.jsxs("div",{className:"filter-actions",children:[e.jsx("div",{className:"filter-actions-left",children:i>0?`${i} filter${i===1?"":"s"} applied`:"No filters applied"}),e.jsxs("div",{className:"filter-actions-right",children:[e.jsxs("button",{type:"button",className:"btn",onClick:c,children:[e.jsx(Ee,{size:14}),e.jsx("span",{children:"Briefing Pack"})]}),e.jsxs("button",{type:"button",className:"btn btn-primary",onClick:o,children:[e.jsx(ze,{size:14}),e.jsx("span",{children:"Apply Filters"})]})]})]})]})]})}function Xt({rows:s,loading:t}){return e.jsxs("article",{className:"card table-card",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{className:"card-head-left",children:[e.jsx(Ue,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"Incident Intelligence"})]}),e.jsxs("span",{className:"card-count mono",children:[s.length," rows"]})]}),e.jsx("div",{className:"card-body-flush",style:{maxHeight:"600px",overflowY:"auto"},children:e.jsx("div",{className:"table-wrap",children:e.jsxs("table",{className:"data-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Date"}),e.jsx("th",{children:"Risk"}),e.jsx("th",{children:"Title"}),e.jsx("th",{children:"Species"}),e.jsx("th",{children:"State"}),e.jsx("th",{children:"District"}),e.jsx("th",{children:"Involved persons"}),e.jsx("th",{children:"Crime type"}),e.jsx("th",{children:"Source"}),e.jsx("th",{children:"Conf."}),e.jsx("th",{children:"Link"})]})}),e.jsxs("tbody",{children:[s.map(a=>{const o=xe(a.risk_score);return e.jsxs("tr",{children:[e.jsx("td",{className:"cell-mono",children:Tt(a.date)}),e.jsx("td",{children:e.jsx("span",{className:`risk-pill ${o}`,children:a.risk_score})}),e.jsx("td",{className:"cell-title",children:a.title}),e.jsx("td",{className:"cell-muted",children:a.species||"—"}),e.jsx("td",{className:"cell-muted",children:a.state||"—"}),e.jsx("td",{className:"cell-muted",children:a.district||"—"}),e.jsx("td",{className:"cell-muted",children:a.involved_persons||"—"}),e.jsx("td",{className:"cell-muted",children:a.crime_type||"—"}),e.jsx("td",{className:"cell-muted",children:a.source||"—"}),e.jsx("td",{className:"cell-mono",children:Number(a.confidence||0).toFixed(2)}),e.jsx("td",{children:e.jsxs("a",{href:Z(a.open_url,a.url),target:"_blank",rel:"noopener noreferrer",className:"feed-link","aria-label":"Open source article",children:["Open ",e.jsx(ne,{size:12})]})})]},a.id)}),!s.length&&!t?e.jsx("tr",{children:e.jsxs("td",{colSpan:11,className:"empty-cell",children:[e.jsx("div",{className:"empty-cell-icon",children:e.jsx(ft,{size:20})}),"No incidents match the current filters."]})}):null]})]})})})]})}function ea(){var g,b,y,N;const[s,t]=l.useState(null),[a,o]=l.useState(!0),[c,i]=l.useState(null),[r,x]=l.useState(null),n=l.useRef(null),f=l.useRef(0),h=l.useCallback(async()=>{var A;f.current+=1;const d=f.current;(A=n.current)==null||A.abort();const k=new AbortController;n.current=k,o(!0);try{const S=new URLSearchParams({limit:"10000",min_size:"2",incident_limit:"10000"}),w=await T(`${_.graphNetworks}?${S.toString()}`,{signal:k.signal});if(d!==f.current)return;t(w),x(z=>{if(!w.networks||w.networks.length===0)return null;if(z!=null&&z.network_id){const B=w.networks.find(H=>H.network_id===z.network_id);if(B)return B}return w.networks[0]}),i(null)}catch(S){if((S==null?void 0:S.name)==="AbortError"||d!==f.current)return;i("Failed to load intelligence networks."),console.error("Failed to load intelligence networks:",S)}finally{d===f.current&&o(!1)}},[]);return l.useEffect(()=>(h(),()=>{var d;f.current+=1,(d=n.current)==null||d.abort()}),[h]),a&&!s?e.jsxs("div",{className:"network-loading",children:[e.jsx(pe,{size:24,className:"spin"}),e.jsx("p",{children:"Analyzing criminal networks..."})]}):e.jsxs("div",{className:"network-container",children:[e.jsxs("div",{className:"network-header",children:[e.jsxs("div",{className:"header-info",children:[e.jsx(he,{size:24,className:"accent-icon"}),e.jsxs("div",{children:[e.jsx("h1",{children:"Intelligence Network Browser"}),e.jsxs("p",{className:"subtitle",children:["Visualizing ",(s==null?void 0:s.person_nodes)||0," actors across ",(s==null?void 0:s.incidents_analyzed)||0," incidents and ",(s==null?void 0:s.total_network_count)||0," networks"]})]})]}),e.jsxs("button",{className:"btn-secondary",onClick:h,disabled:a,children:[e.jsx(pe,{size:14,className:a?"spin":""}),"Refresh Analysis"]})]}),c?e.jsx("div",{className:"network-error",role:"alert",children:c}):null,e.jsxs("div",{className:"network-layout",children:[e.jsxs("aside",{className:"network-sidebar",children:[e.jsxs("div",{className:"sidebar-label",children:["Detected Clusters (",(s==null?void 0:s.network_count)||0," shown / ",(s==null?void 0:s.total_network_count)||(s==null?void 0:s.network_count)||0," total)"]}),e.jsx("div",{className:"cluster-list",children:(g=s==null?void 0:s.networks)==null?void 0:g.map(d=>e.jsxs("button",{className:`cluster-item ${(r==null?void 0:r.network_id)===d.network_id?"active":""}`,onClick:()=>x(d),children:[e.jsx("div",{className:"cluster-id",children:d.network_id}),e.jsxs("div",{className:"cluster-info",children:[e.jsxs("span",{className:"cluster-stats",children:[e.jsx(It,{size:12})," ",d.suspect_count," Suspects"]}),e.jsxs("span",{className:"cluster-stats",children:[e.jsx($t,{size:12})," ",d.incident_count," Incidents"]}),e.jsxs("span",{className:"cluster-stats",children:["Score ",Number(d.network_score||0).toFixed(1)," • Avg risk ",Number(d.avg_risk_score||0).toFixed(1)]})]}),e.jsx(Ms,{size:14,className:"chevron"})]},d.network_id))})]}),e.jsx("main",{className:"network-details",children:r?e.jsxs("div",{className:"network-view animate-fade-in",children:[e.jsx("div",{className:"network-hero",children:e.jsxs("div",{className:"hero-stats",children:[e.jsxs("div",{className:"stat-card",children:[e.jsx("label",{children:"Threat Score"}),e.jsx("div",{className:"value",children:Number(r.network_score||0).toFixed(1)})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("label",{children:"Avg Incident Risk"}),e.jsx("div",{className:"value",children:Number(r.avg_risk_score||0).toFixed(1)})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("label",{children:"Link Density"}),e.jsx("div",{className:"value",children:Number(r.edge_density||0).toFixed(3)})]})]})}),e.jsxs("div",{className:"network-grid",children:[e.jsxs("section",{className:"actors-section",children:[e.jsxs("h3",{children:[e.jsx(Rt,{size:18})," Network Actors (",r.actor_count||r.suspect_count||0,")"]}),e.jsxs("div",{className:"actor-list",children:[(r.actors||r.top_actors||[]).map((d,k)=>e.jsxs("div",{className:"actor-card animate-fade-in",style:{animationDelay:`${k*.05}s`},children:[e.jsxs("div",{className:"actor-main",children:[e.jsx("div",{className:"actor-name",children:d.name}),e.jsxs("div",{className:"actor-meta",children:[e.jsxs("span",{children:["Centrality: ",d.centrality]}),e.jsx("span",{children:"•"}),e.jsxs("span",{children:[d.incident_count," Incidents"]})]})]}),e.jsx("div",{className:"actor-risk-bar",children:e.jsx("div",{className:"bar-fill",style:{width:`${d.centrality*100}%`}})})]},`${d.name||"actor"}-${d.incident_count||0}-${k}`)),(!r.actors||r.actors.length===0)&&(!r.top_actors||r.top_actors.length===0)&&e.jsx("div",{className:"empty-state",children:e.jsx("p",{children:"No actor nodes found for this network."})})]})]}),e.jsxs("section",{className:"intel-section",children:[e.jsxs("h3",{children:[e.jsx(Oe,{size:18})," Operation Areas"]}),e.jsx("div",{className:"pill-cloud",children:(b=r.top_states)==null?void 0:b.map((d,k)=>e.jsxs("span",{className:"location-pill",children:[d.state," ",e.jsx("span",{className:"pill-count",children:d.count})]},`${d.state||"state"}-${k}`))}),e.jsxs("h3",{style:{marginTop:"24px"},children:[e.jsx(Ee,{size:18})," Species Targeted"]}),e.jsx("div",{className:"pill-cloud",children:(y=r.top_species)==null?void 0:y.map((d,k)=>e.jsxs("span",{className:"species-pill",children:[d.species," ",e.jsx("span",{className:"pill-count",children:d.count})]},`${d.species||"species"}-${k}`))}),e.jsxs("h3",{style:{marginTop:"24px"},children:[e.jsx(ne,{size:18})," Linked Incidents"]}),e.jsxs("div",{className:"incident-list",children:[(N=r.linked_incidents)==null?void 0:N.map((d,k)=>{const A=Z(d.url,d.open_url),S=e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"incident-title",children:d.title}),e.jsxs("div",{className:"incident-meta",children:["Risk ",d.risk_score," • ",d.state||"Unknown",d.district?`, ${d.district}`:""]})]}),w=d.id||`${d.title||"incident"}-${k}`;return A==="#"?e.jsx("div",{className:"incident-item incident-item-disabled",children:S},w):e.jsx("a",{className:"incident-item",href:A,target:"_blank",rel:"noopener noreferrer",children:S},w)}),(!r.linked_incidents||r.linked_incidents.length===0)&&e.jsx("div",{className:"empty-state",children:e.jsx("p",{children:"No linked incidents found for this network."})})]})]})]})]}):e.jsxs("div",{className:"empty-state",children:[e.jsx(he,{size:48,className:"faint-icon"}),e.jsx("p",{children:"Select a cluster to view intelligence details"})]})})]}),e.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .network-container {
          padding: 24px;
          color: #1A1917;
        }
        .network-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 24px;
        }
        .header-info {
          display: flex;
          gap: 16px;
          align-items: center;
          min-width: 0;
          flex: 1;
        }
        .header-info > div {
          min-width: 0;
        }
        .header-info h1 {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          overflow-wrap: anywhere;
        }
        .subtitle {
          color: #6B6966;
          font-size: 13px;
          margin: 4px 0 0;
          overflow-wrap: anywhere;
        }
        .network-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 24px;
          height: 600px;
        }
        .network-sidebar {
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(26, 25, 23, 0.08);
          border-radius: 16px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          backdrop-filter: blur(8px);
        }
        .sidebar-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #6B6966;
          font-weight: 600;
          padding-left: 8px;
        }
        .cluster-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow-y: auto;
        }
        .cluster-item {
          display: grid;
          grid-template-columns: 56px minmax(0, 1fr) 20px;
          column-gap: 8px;
          align-items: center;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid transparent;
          background: transparent;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cluster-item:hover {
          background: rgba(193, 127, 89, 0.05);
          border-color: rgba(193, 127, 89, 0.1);
        }
        .cluster-item.active {
          background: #C17F59;
          color: white;
          box-shadow: 0 4px 12px rgba(193, 127, 89, 0.25);
        }
        .cluster-id {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 700;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .cluster-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }
        .cluster-stats {
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 4px;
          opacity: 0.8;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .network-details {
          background: #FFFFFF;
          border: 1px solid rgba(26, 25, 23, 0.08);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(26, 25, 23, 0.04);
          overflow-y: auto;
          min-width: 0;
        }
        .network-hero {
          background: linear-gradient(135deg, #1A1917 0%, #3D3B38 100%);
          border-radius: 16px;
          padding: 24px;
          color: white;
          margin-bottom: 32px;
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .stat-card label {
          font-size: 11px;
          text-transform: uppercase;
          opacity: 0.6;
          display: block;
          margin-bottom: 4px;
        }
        .stat-card .value {
          font-size: 24px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
        }
        .network-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
        }
        .network-grid h3 {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .actor-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border-bottom: 1px solid rgba(26, 25, 23, 0.06);
          position: relative;
        }
        .actor-rank {
          font-family: 'JetBrains Mono', monospace;
          color: #C17F59;
          font-weight: 700;
          font-size: 14px;
        }
        .actor-name {
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 2px;
          overflow-wrap: anywhere;
        }
        .actor-meta {
          font-size: 11px;
          color: #6B6966;
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          overflow-wrap: anywhere;
        }
        .actor-risk-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 100%;
          background: rgba(26, 25, 23, 0.03);
        }
        .bar-fill {
          height: 100%;
          background: #C17F59;
          opacity: 0.6;
        }
        .pill-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .location-pill, .species-pill {
          padding: 6px 12px;
          background: rgba(26, 25, 23, 0.04);
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
        }
        .pill-count {
          font-size: 10px;
          opacity: 0.5;
          margin-left: 4px;
        }
        .incident-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .incident-item {
          display: block;
          text-decoration: none;
          color: inherit;
          border: 1px solid rgba(26, 25, 23, 0.08);
          border-radius: 10px;
          padding: 10px 12px;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .incident-item:hover {
          background: rgba(193, 127, 89, 0.06);
          border-color: rgba(193, 127, 89, 0.25);
        }
        .incident-title {
          font-size: 13px;
          font-weight: 600;
          line-height: 1.35;
          margin-bottom: 2px;
          overflow-wrap: anywhere;
        }
        .incident-meta {
          font-size: 11px;
          color: #6B6966;
          overflow-wrap: anywhere;
        }
        .incident-item-disabled {
          opacity: 0.7;
          cursor: default;
        }
        .incident-item-disabled:hover {
          background: #FFFFFF;
          border-color: rgba(26, 25, 23, 0.08);
        }
        .network-error {
          margin: 0 0 16px;
          padding: 10px 12px;
          border: 1px solid rgba(199, 80, 80, 0.2);
          border-radius: 10px;
          background: rgba(199, 80, 80, 0.06);
          color: #A03434;
          font-size: 13px;
        }
        @media (max-width: 1280px) {
          .network-layout {
            grid-template-columns: 1fr;
            height: auto;
          }
          .network-sidebar {
            max-height: 260px;
          }
          .network-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
        @media (max-width: 900px) {
          .network-container {
            padding: 20px;
          }
          .network-details {
            padding: 20px;
          }
          .hero-stats {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
        .spin { animation: rotate 2s linear infinite; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}})]})}function sa({onSelectIncident:s}){var h,g;const[t,a]=l.useState(""),[o,c]=l.useState(!1),[i,r]=l.useState(null),[x,n]=l.useState(null),f=async b=>{if(b.preventDefault(),!!t.trim()){c(!0),n(null);try{const y=await Q(_.ragQuery,{query:t.trim(),top_k:5});r(y)}catch(y){n(y.message||"Failed to process natural language query."),console.error(y)}finally{c(!1)}}};return e.jsxs("div",{className:"semantic-search-container",children:[e.jsxs("form",{onSubmit:f,className:"semantic-input-group",children:[e.jsxs("div",{className:"input-with-icon",children:[e.jsx(kt,{size:18,className:"sparkle-icon"}),e.jsx("input",{type:"text",placeholder:"Ask anything (e.g. 'What are the main smuggling routes for pangolins in Odisha?')",value:t,onChange:b=>a(b.target.value),disabled:o})]}),e.jsx("button",{type:"submit",className:"btn-primary semantic-btn",disabled:o||!t.trim(),children:o?e.jsx(Ks,{size:18,className:"spin"}):e.jsx(Ns,{size:18})})]}),x&&e.jsxs("div",{className:"semantic-error",children:[e.jsx(Ws,{size:14}),e.jsx("span",{children:x})]}),i&&e.jsxs("div",{className:"semantic-result-area animate-fade-in",children:[e.jsxs("div",{className:"result-answer",children:[e.jsxs("div",{className:"answer-header",children:[e.jsx(it,{size:16}),e.jsx("span",{children:"Intelligence Analysis"})]}),e.jsx("div",{className:"answer-text",children:i.answer})]}),e.jsxs("div",{className:"result-sources",children:[e.jsxs("div",{className:"sources-label",children:["Citations (",((h=i.sources)==null?void 0:h.length)||0,")"]}),e.jsx("div",{className:"sources-list",children:(g=i.sources)==null?void 0:g.map((b,y)=>e.jsxs("div",{className:"source-item",onClick:()=>s==null?void 0:s(b.id),children:[e.jsx("div",{className:"source-title",children:b.title}),e.jsxs("div",{className:"source-meta",children:[e.jsxs("span",{className:"source-score",children:["Relevance: ",(b.relevance*100).toFixed(0),"%"]}),e.jsx("span",{children:"•"}),e.jsx("span",{children:b.date})]})]},y))})]})]}),e.jsx("style",{dangerouslySetInnerHTML:{__html:`
        .semantic-search-container {
          margin-bottom: 24px;
        }
        .semantic-input-group {
          display: flex;
          gap: 12px;
          position: relative;
        }
        .input-with-icon {
          flex: 1;
          position: relative;
        }
        .sparkle-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #C17F59;
        }
        .semantic-input-group input {
          width: 100%;
          padding: 14px 14px 14px 48px;
          border-radius: 12px;
          border: 2px solid rgba(193, 127, 89, 0.15);
          background: rgba(255, 255, 255, 0.8);
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(193, 127, 89, 0.04);
        }
        .semantic-input-group input:focus {
          outline: none;
          border-color: #C17F59;
          background: #FFFFFF;
          box-shadow: 0 8px 24px rgba(193, 127, 89, 0.08);
        }
        .semantic-btn {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          padding: 0;
        }
        .semantic-error {
          margin-top: 12px;
          padding: 12px 16px;
          background: rgba(199, 80, 80, 0.05);
          border: 1px solid rgba(199, 80, 80, 0.1);
          border-radius: 8px;
          color: #C75050;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .semantic-result-area {
          margin-top: 20px;
          background: #FFFFFF;
          border: 1px solid rgba(26, 25, 23, 0.08);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(26, 25, 23, 0.06);
        }
        .result-answer {
          padding: 24px;
          border-bottom: 1px solid rgba(26, 25, 23, 0.06);
          background: linear-gradient(to bottom right, rgba(193, 127, 89, 0.03), transparent);
        }
        .answer-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #C17F59;
          margin-bottom: 12px;
        }
        .answer-text {
          font-size: 15px;
          line-height: 1.6;
          color: #1A1917;
          white-space: pre-wrap;
        }
        .result-sources {
          padding: 20px 24px;
          background: rgba(26, 25, 23, 0.01);
        }
        .sources-label {
          font-size: 11px;
          font-weight: 600;
          color: #6B6966;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .sources-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .source-item {
          padding: 12px;
          border-radius: 8px;
          background: #FFFFFF;
          border: 1px solid rgba(26, 25, 23, 0.06);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .source-item:hover {
          border-color: #C17F59;
          background: rgba(193, 127, 89, 0.02);
          transform: translateX(4px);
        }
        .source-title {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .source-meta {
          font-size: 11px;
          color: #6B6966;
          display: flex;
          gap: 8px;
        }
        .source-score {
          color: #C17F59;
          font-weight: 600;
        }
        .spin { animation: rotate 1s linear infinite; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}})]})}function ta({alerts:s}){return e.jsxs("article",{className:"card",id:"section-alerts",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{className:"card-head-left",children:[e.jsx(qe,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"Live High-Risk Alerts"})]}),e.jsxs("span",{className:"card-count mono",children:[s.length," active"]})]}),e.jsx("div",{className:"card-body-flush",children:s.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:e.jsx(Te,{size:20})}),e.jsx("div",{children:"No active alerts"})]}):e.jsx("div",{className:"feed",children:s.slice(0,25).map(t=>{const a=xe(t.risk_score);return e.jsxs("div",{className:`feed-row is-${a}`,children:[e.jsxs("div",{className:"feed-row-head",children:[e.jsx("div",{className:"feed-title",children:t.title||"Alert"}),e.jsx("span",{className:`risk-pill ${a}`,children:t.risk_score||0})]}),e.jsxs("div",{className:"feed-meta",children:[e.jsx("span",{children:t.state||"Unknown state"}),e.jsx("span",{className:"dot"}),e.jsx("span",{children:t.district||"—"}),t.species?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"dot"}),e.jsx("span",{children:t.species})]}):null]}),e.jsxs("a",{href:Z(t.open_url,t.url),target:"_blank",rel:"noopener noreferrer",className:"feed-link",children:["Open source ",e.jsx(ne,{size:12})]})]},t.id)})})})]})}function aa({items:s}){return e.jsxs("article",{className:"card",id:"section-osint",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{className:"card-head-left",children:[e.jsx(Pe,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"OSINT Signal Feed"})]}),e.jsxs("span",{className:"card-count mono",children:[s.length," signals"]})]}),e.jsx("div",{className:"card-body-flush",children:s.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:e.jsx(Te,{size:20})}),e.jsx("div",{children:"No OSINT signals yet"})]}):e.jsx("div",{className:"feed",children:s.slice(0,16).map(t=>{const a=Number(t.signal_strength||0);return e.jsxs("div",{className:"feed-row",children:[e.jsxs("div",{className:"feed-row-head",children:[e.jsx("div",{className:"feed-title",children:t.title}),e.jsx("span",{className:"badge mono",children:a.toFixed(2)})]}),e.jsxs("div",{className:"feed-meta",children:[e.jsx("span",{children:t.source_type||"source"}),e.jsx("span",{className:"dot"}),e.jsx("span",{children:"Signal strength"})]}),e.jsxs("a",{href:Z(t.open_url,t.url),target:"_blank",rel:"noopener noreferrer",className:"feed-link",children:["Open source ",e.jsx(ne,{size:12})]})]},t.id)})})})]})}function na({items:s}){return e.jsxs("article",{className:"card",id:"section-reco",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{className:"card-head-left",children:[e.jsx(de,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"Top Recommendations"})]}),e.jsx("span",{className:"card-count mono",children:s.length})]}),e.jsx("div",{className:"card-body-flush",children:s.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:e.jsx(de,{size:20})}),e.jsx("div",{children:"No recommendations generated yet"})]}):e.jsx("div",{className:"feed",children:s.map(([t,a])=>e.jsxs("div",{className:"reco-row",children:[e.jsx("span",{children:t}),e.jsx("span",{className:"reco-count",children:a})]},t))})})]})}ts.register(as,ns,rs,is,os,ls,cs,ds,hs);const ra=15e3,ia={q:"",species:"",state:"",date_from:"",date_to:"",crime_type:"",severity:"",source:""},Ae=!1;new Date().toISOString();function oa(){const[s,t]=l.useState(!0),[a,o]=l.useState(""),[c,i]=l.useState(!1),[r,x]=l.useState(()=>ge()),[n,f]=l.useState(""),[h,g]=l.useState(!1),[b,y]=l.useState({username:"",password:""}),[N,d]=l.useState(null),[k,A]=l.useState(null),[S,w]=l.useState(null),[z,B]=l.useState([]),[H,V]=l.useState([]),[D,re]=l.useState([]),[C,X]=l.useState(null),[L,U]=l.useState([]),[$,ee]=l.useState(ia),[Y,J]=l.useState("overview"),[P,ie]=l.useState(!1),G=l.useCallback((j="Please log in to continue.")=>{Yt(),x(""),f(j),o(""),i(!1),t(!1)},[]),se=l.useCallback(async()=>{if(!r||Ae)return;i(!0);const j=await Promise.allSettled([T(_.summary),T(_.chart),T(_.map),T(_.alerts),T(_.reports),T(_.osint),T(_.syncStatus)]);if(j.some(I=>{var K;return I.status==="rejected"&&Number((K=I.reason)==null?void 0:K.status)===401})){G("Session expired. Please sign in again.");return}const[u,F,O,R,M,E,q]=j;u.status==="fulfilled"&&d(u.value),F.status==="fulfilled"&&A(F.value),O.status==="fulfilled"&&w(O.value),R.status==="fulfilled"&&B(Array.isArray(R.value)?R.value:[]),M.status==="fulfilled"&&re(Array.isArray(M.value)?M.value:[]),E.status==="fulfilled"&&V(Array.isArray(E.value)?E.value:[]),q.status==="fulfilled"&&X(q.value),j.every(I=>I.status==="rejected")?o("Unable to load dashboard data right now."):o(""),t(!1),i(!1)},[r,G]),te=l.useCallback(async()=>{if(!r||Ae)return;const j=Me({...$,min_confidence:0,limit:120});try{const p=await T(`${_.filterNews}?${j}`);U(Array.isArray(p.items)?p.items:[])}catch(p){Number(p==null?void 0:p.status)===401?G("Session expired. Please sign in again."):(console.error("Failed to refresh filtered incidents:",p),o(u=>u||"Incident feed is temporarily unavailable."))}},[r,$,G]);l.useEffect(()=>{if(!r){t(!1);return}const j=_.wsLive(r);let p=null,u=null;function F(){p=new WebSocket(j),p.onmessage=R=>{try{const{channel:M,data:E}=JSON.parse(R.data);M==="alerts"?B(q=>[E,...q].slice(0,100)):M==="incidents"?U(q=>[E,...q].slice(0,200)):M==="sync_status"&&X(E)}catch(M){console.error("WS parse error:",M)}},p.onclose=()=>{u=window.setTimeout(F,5e3)},p.onerror=R=>{console.error("WS error:",R),p.close()}}F(),t(!0),se(),te();const O=window.setInterval(()=>{se(),te()},ra);return()=>{window.clearInterval(O),u&&window.clearTimeout(u),p&&(p.onclose=null,p.close())}},[r,se,te]),l.useEffect(()=>{const j=["overview","map","alerts","networks","analytics","incidents","osint","reco"],p=[];return j.forEach(u=>{const F=document.getElementById(`section-${u}`);if(!F)return;const O=new IntersectionObserver(R=>{R.forEach(M=>{M.isIntersecting&&J(u)})},{rootMargin:"-40% 0px -55% 0px",threshold:0});O.observe(F),p.push(O)}),()=>p.forEach(u=>u.disconnect())},[s]);const Je=l.useMemo(()=>{const j=new Map;return D.forEach(p=>{const u=(p.recommendation||"").trim();u&&j.set(u,(j.get(u)||0)+1)}),[...j.entries()].sort((p,u)=>u[1]-p[1]).slice(0,8)},[D]),Ge=(k==null?void 0:k.filters)||{states:[],species:[],crime_types:[],sources:[]},Ke=(N==null?void 0:N.last_sync_time)||(C==null?void 0:C.finished_at),je=l.useCallback((j,{last:p=!1}={})=>{const u=j||{},F=typeof u.stage=="string"&&u.stage!=="-"?u.stage:"",O=typeof u.provider=="string"&&u.provider!=="-"?u.provider:"",R=typeof u.language=="string"&&u.language!=="-"?u.language:"",M=typeof u.query=="string"&&u.query!=="-"?u.query:"",E=Number.isFinite(Number(u.scanned))?Number(u.scanned):null,q=Number.isFinite(Number(u.kept))?Number(u.kept):null,I=[];F&&I.push(`stage: ${p?`last ${F}`:F}`);const K=[O,R].filter(Boolean).join(" / ");return K&&I.push(`source: ${K}`),M&&I.push(`query: ${M}`),E!==null&&q!==null&&I.push(`scanned ${E}, kept ${q}`),I.join(" • ")},[]),be=l.useMemo(()=>C!=null&&C.running?je(C==null?void 0:C.progress,{last:!1}):"",[C,je]);function ye(j){if(!r)return;const p=Me({...$,min_confidence:0,admin_token:r}),u=j==="pdf"?_.exportPdf:j==="excel"?_.exportExcel:j==="excel_incidents_reports"?_.exportExcelIncidentsReports:j==="briefing"?_.exportBriefing:_.exportCsv;window.location.href=p?`${u}?${p}`:u}async function Qe(j){j.preventDefault(),g(!0),f("");try{const p=await Q(_.adminLogin,{username:b.username.trim(),password:b.password},{includeAuth:!1}),u=String((p==null?void 0:p.access_token)||"").trim();if(!u){f("Login failed. Missing access token.");return}Ve(u),x(u),y({username:"",password:""}),t(!0)}catch(p){Number(p==null?void 0:p.status)===401?f("Invalid username or password."):Number(p==null?void 0:p.status)===429?f("Too many login attempts. Try again in a minute."):f(String((p==null?void 0:p.message)||"Unable to login right now."))}finally{g(!1)}}async function Ze(){try{await Q(_.adminLogout,{},{includeAuth:!0})}catch{}G("Signed out.")}function Xe(j){J(j),ie(!1)}return r?e.jsxs("div",{className:"app",children:[e.jsx(qt,{activeSection:Y,onSelect:Xe,isOpen:P,syncStatus:C,lastSync:Ke}),e.jsx("div",{className:`scrim ${P?"is-visible":""}`,onClick:()=>ie(!1),"aria-hidden":"true"}),e.jsxs("div",{className:"main",children:[e.jsx(Pt,{activeSection:Y,busy:c,syncStatus:C,onRefresh:se,onExport:ye,onToggleMenu:()=>ie(j=>!j),onLogout:Ze}),e.jsxs("div",{className:"content",children:[a?e.jsxs("div",{className:"status error",role:"alert",children:[e.jsx(_e,{size:16}),e.jsx("span",{children:a})]}):null,C!=null&&C.running?e.jsxs("div",{className:"status info",role:"status",children:[e.jsx(Re,{size:16}),e.jsxs("span",{children:[C.message||"Search in progress...",be?` - ${be}`:""]})]}):null,e.jsxs("section",{className:"dashboard-section",id:"section-overview",children:[e.jsx("div",{className:"section-header",children:e.jsxs("div",{className:"section-header-content",children:[e.jsx("span",{className:"section-number",children:"01"}),e.jsxs("div",{children:[e.jsx("h2",{children:"National Overview"}),e.jsx("p",{children:"Real-time wildlife threat monitoring across India"})]})]})}),e.jsx(Dt,{summary:N,loading:s})]}),e.jsxs("section",{className:"dashboard-section",id:"section-map",children:[e.jsx("div",{className:"section-header",children:e.jsxs("div",{className:"section-header-content",children:[e.jsx("span",{className:"section-number",children:"02"}),e.jsxs("div",{children:[e.jsx("h2",{children:"Operations Center"}),e.jsx("p",{children:"Geographic incident mapping"})]})]})}),e.jsx(Jt,{mapData:S,onMapError:o})]}),e.jsxs("section",{className:"dashboard-section",id:"section-alerts",children:[e.jsx("div",{className:"section-header",children:e.jsxs("div",{className:"section-header-content",children:[e.jsx("span",{className:"section-number",children:"03"}),e.jsxs("div",{children:[e.jsx("h2",{children:"Live High-Risk Alerts"}),e.jsx("p",{children:"Immediate notifications for critical poaching and trafficking signals"})]})]})}),e.jsx(ta,{alerts:z})]}),e.jsxs("section",{className:"dashboard-section",id:"section-networks",children:[e.jsx("div",{className:"section-header",children:e.jsxs("div",{className:"section-header-content",children:[e.jsx("span",{className:"section-number",children:"04"}),e.jsxs("div",{children:[e.jsx("h2",{children:"Network Intelligence"}),e.jsx("p",{children:"Analyzing connections between suspects and organized crime groups"})]})]})}),e.jsx("article",{className:"card network-card",children:e.jsx(ea,{})})]}),e.jsxs("section",{className:"dashboard-section",id:"section-analytics",children:[e.jsx("div",{className:"section-header",children:e.jsxs("div",{className:"section-header-content",children:[e.jsx("span",{className:"section-number",children:"05"}),e.jsxs("div",{children:[e.jsx("h2",{children:"Intelligence Analytics"}),e.jsx("p",{children:"Trends, distributions, and source reliability metrics"})]})]})}),e.jsx(Kt,{chartData:k})]}),e.jsxs("section",{className:"dashboard-section",id:"section-incidents",children:[e.jsx("div",{className:"section-header",children:e.jsxs("div",{className:"section-header-content",children:[e.jsx("span",{className:"section-number",children:"06"}),e.jsxs("div",{children:[e.jsx("h2",{children:"Incident Database"}),e.jsx("p",{children:"Search and filter wildlife crime reports"})]})]})}),e.jsx(sa,{}),e.jsx(Zt,{filters:$,filterOptions:Ge,onChange:ee,onApply:()=>te(),onBriefing:()=>ye("briefing")}),e.jsx(Xt,{rows:L,loading:s})]}),e.jsxs("section",{className:"dashboard-section",id:"section-osint",children:[e.jsx("div",{className:"section-header",children:e.jsxs("div",{className:"section-header-content",children:[e.jsx("span",{className:"section-number",children:"07"}),e.jsxs("div",{children:[e.jsx("h2",{children:"Intelligence Feed"}),e.jsx("p",{children:"External sources and strategic recommendations"})]})]})}),e.jsxs("div",{className:"bottom-grid",children:[e.jsx(aa,{items:H}),e.jsx(na,{items:Je})]})]})]})]})]}):e.jsx("div",{className:"auth-shell",children:e.jsxs("article",{className:"card auth-card",children:[e.jsx("div",{className:"card-head",children:e.jsxs("div",{className:"card-head-left",children:[e.jsx(He,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"Authorized Access"})]})}),e.jsxs("div",{className:"card-body auth-card-body",children:[e.jsxs("div",{className:"auth-brand",children:[e.jsx("h1",{children:"Wildlife Crime Intelligence Center"}),e.jsx("p",{children:"Sign in with authorized credentials to continue."})]}),e.jsxs("form",{className:"auth-form",onSubmit:Qe,children:[e.jsxs("label",{className:"auth-field",children:[e.jsx("span",{children:"Username"}),e.jsx("input",{value:b.username,onChange:j=>y(p=>({...p,username:j.target.value})),autoComplete:"username",required:!0})]}),e.jsxs("label",{className:"auth-field",children:[e.jsx("span",{children:"Password"}),e.jsx("input",{type:"password",value:b.password,onChange:j=>y(p=>({...p,password:j.target.value})),autoComplete:"current-password",required:!0})]}),n?e.jsxs("div",{className:"status error auth-status",role:"alert",children:[e.jsx(_e,{size:16}),e.jsx("span",{children:n})]}):null,e.jsxs("button",{className:"btn btn-primary auth-submit",type:"submit",disabled:h,children:[e.jsx(Zs,{size:14}),h?"Signing in...":"Sign in"]})]})]})]})})}class la extends ps.Component{constructor(t){super(t),this.state={hasError:!1,message:""}}static getDerivedStateFromError(t){return{hasError:!0,message:t instanceof Error?t.message:"Unknown runtime error"}}componentDidCatch(t){console.error("Dashboard runtime error:",t)}render(){return this.state.hasError?e.jsxs("div",{style:{padding:"24px",color:"#e8edff",fontFamily:"Inter, sans-serif"},children:[e.jsx("h2",{style:{marginTop:0},children:"Dashboard failed to load"}),e.jsx("p",{style:{opacity:.9},children:this.state.message||"Unexpected client error."}),e.jsxs("p",{style:{opacity:.8},children:["Open ",e.jsx("a",{href:"/legacy?legacy=1",style:{color:"#9ec2ff"},children:"legacy dashboard"})," while this is being fixed."]})]}):this.props.children}}const ce=document.getElementById("root");if(ce){window.addEventListener("error",s=>{console.error("Window error:",s.error||s.message)}),window.addEventListener("unhandledrejection",s=>{console.error("Unhandled promise rejection:",s.reason)});try{window.__WILDLIFE_DASHBOARD_BOOTED__=!0,Fe(ce).render(e.jsx(la,{children:e.jsx(oa,{})}))}catch(s){console.error("Fatal dashboard bootstrap error:",s),ce.innerHTML=`
      <div style="padding:24px;color:#e8edff;font-family:Inter,sans-serif">
        <h2 style="margin-top:0">Dashboard failed to initialize</h2>
        <p>${s instanceof Error?s.message:"Unknown bootstrap error"}</p>
        <p><a href="/legacy?legacy=1" style="color:#9ec2ff">Open legacy dashboard</a></p>
      </div>
    `}}
