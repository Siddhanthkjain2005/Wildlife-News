import{r as c,j as e,L as fs,B as Fe,D as gs,C as js,a as bs,b as ys,P as vs,d as Ns,A as ks,e as ws,p as _s,f as Cs,i as zs,R as $s}from"./charts-FKz6KObn.js";import{r as Ss}from"./react-DAgX4J4O.js";import{L as he}from"./map-TYzTYvzY.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const r of l.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function a(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(o){if(o.ep)return;o.ep=!0;const l=a(o);fetch(o.href,l)}})();var We,Re=Ss;We=Re.createRoot,Re.hydrateRoot;/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ue=(...s)=>s.filter((t,a,n)=>!!t&&t.trim()!==""&&n.indexOf(t)===a).join(" ").trim();/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const As=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ms=s=>s.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,a,n)=>n?n.toUpperCase():a.toLowerCase());/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee=s=>{const t=Ms(s);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var fe={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fs=s=>{for(const t in s)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},Rs=c.createContext({}),Es=()=>c.useContext(Rs),Ls=c.forwardRef(({color:s,size:t,strokeWidth:a,absoluteStrokeWidth:n,className:o="",children:l,iconNode:r,...m},i)=>{const{size:u=24,strokeWidth:j=2,absoluteStrokeWidth:d=!1,color:k="currentColor",className:v=""}=Es()??{},_=n??d?Number(a??j)*24/Number(t??u):a??j;return c.createElement("svg",{ref:i,...fe,width:t??u??fe.width,height:t??u??fe.height,stroke:s??k,strokeWidth:_,className:Ue("lucide",v,o),...!l&&!Fs(m)&&{"aria-hidden":"true"},...m},[...r.map(([x,C])=>c.createElement(x,C)),...Array.isArray(l)?l:[l]])});/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=(s,t)=>{const a=c.forwardRef(({className:n,...o},l)=>c.createElement(Ls,{ref:l,iconNode:t,className:Ue(`lucide-${As(Ee(s))}`,`lucide-${s}`,n),...o}));return a.displayName=Ee(s),a};/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Is=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],Ve=f("activity",Is);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ts=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Bs=f("arrow-right",Ts);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Os=[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]],Je=f("briefcase",Os);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ps=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],Ye=f("chart-column",Ps);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qs=[["path",{d:"M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",key:"pzmjnu"}],["path",{d:"M21.21 15.89A10 10 0 1 1 8 2.83",key:"k2fpak"}]],Hs=f("chart-pie",qs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ds=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Le=f("chevron-down",Ds);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ws=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Us=f("chevron-right",Ws);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vs=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],Ie=f("circle-alert",Vs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Js=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]],Ys=f("database",Js);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gs=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],ge=f("download",Gs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ks=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],ce=f("external-link",Ks);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qs=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]],Te=f("file-spreadsheet",Qs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xs=[["path",{d:"M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z",key:"15baut"}],["path",{d:"M18 12v.5",key:"18hhni"}],["path",{d:"M16 17.93a9.77 9.77 0 0 1 0-11.86",key:"16dt7o"}],["path",{d:"M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33",key:"l9di03"}],["path",{d:"M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4",key:"1kjonw"}],["path",{d:"m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98",key:"1zlm23"}]],Zs=f("fish",Xs);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const et=[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",key:"1slcih"}]],st=f("flame",et);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tt=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]],Be=f("funnel",tt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const at=[["path",{d:"M10 16h.01",key:"1bzywj"}],["path",{d:"M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"18tbho"}],["path",{d:"M21.946 12.013H2.054",key:"zqlbp7"}],["path",{d:"M6 16h.01",key:"1pmjb7"}]],nt=f("hard-drive",at);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const it=[["polyline",{points:"22 12 16 12 14 15 10 15 8 12 2 12",key:"o97t9d"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"oot6mr"}]],Ge=f("inbox",it);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],lt=f("info",rt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ot=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],ct=f("layout-dashboard",ot);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dt=[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]],be=f("lightbulb",dt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ht=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],pt=f("loader-circle",ht);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mt=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],ut=f("lock",mt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xt=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],ft=f("log-out",xt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gt=[["path",{d:"M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0",key:"11u0oz"}],["circle",{cx:"12",cy:"8",r:"2",key:"1822b1"}],["path",{d:"M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712",key:"q8zwxj"}]],Ke=f("map-pinned",gt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jt=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],Qe=f("map-pin",jt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bt=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],yt=f("menu",bt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vt=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]],Nt=f("message-square",vt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kt=[["rect",{x:"16",y:"16",width:"6",height:"6",rx:"1",key:"4q2zg0"}],["rect",{x:"2",y:"16",width:"6",height:"6",rx:"1",key:"8cvhb9"}],["rect",{x:"9",y:"2",width:"6",height:"6",rx:"1",key:"1egb70"}],["path",{d:"M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",key:"1jsf9p"}],["path",{d:"M12 12V8",key:"2874zd"}]],ye=f("network",kt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wt=[["path",{d:"M12 16h.01",key:"1drbdi"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",key:"1fd625"}]],_t=f("octagon-alert",wt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=[["path",{d:"M16.247 7.761a6 6 0 0 1 0 8.478",key:"1fwjs5"}],["path",{d:"M19.075 4.933a10 10 0 0 1 0 14.134",key:"ehdyv1"}],["path",{d:"M4.925 19.067a10 10 0 0 1 0-14.134",key:"1q22gi"}],["path",{d:"M7.753 16.239a6 6 0 0 1 0-8.478",key:"r2q7qm"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],Xe=f("radio",Ct);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],pe=f("refresh-cw",zt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],St=f("rotate-ccw",$t);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const At=[["path",{d:"m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5",key:"dzhfyz"}],["path",{d:"M16.5 7.5 19 5",key:"1ltcjm"}],["path",{d:"m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5",key:"nfoymv"}],["path",{d:"M9 21a6 6 0 0 0-6-6",key:"1iajcf"}],["path",{d:"M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z",key:"nv9zqy"}]],Ze=f("satellite",At);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mt=[["path",{d:"m13.5 8.5-5 5",key:"1cs55j"}],["path",{d:"m8.5 8.5 5 5",key:"a8mexj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],Ft=f("search-x",Mt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rt=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],Et=f("search",Rt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lt=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],es=f("shield-check",Lt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const It=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],Tt=f("shield",It);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bt=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],Ot=f("sparkles",Bt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pt=[["path",{d:"M12 3v18",key:"108xh3"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}]],ss=f("table",Pt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qt=[["path",{d:"M16 17h6v-6",key:"t6n2it"}],["path",{d:"m22 17-8.5-8.5-5 5L2 7",key:"x473p"}]],Ht=f("trending-down",qt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dt=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],Wt=f("trending-up",Dt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ut=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Vt=f("triangle-alert",Ut);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jt=[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]],Yt=f("upload",Jt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gt=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],Kt=f("user",Gt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qt=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],Xt=f("users",Qt);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zt=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],ea=f("x",Zt);function ts(s){if(!s)return"-";const t=String(s).replace(/^(\d{4}-\d{2}-\d{2})\s(\d{2}:\d{2}:\d{2})/,"$1T$2"),a=new Date(t);return Number.isNaN(a.getTime())?s:a.toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function as(s){if(!s)return"-";const t=String(s).replace(/^(\d{4}-\d{2}-\d{2})\s(\d{2}:\d{2}:\d{2})/,"$1T$2"),a=new Date(t);return Number.isNaN(a.getTime())?s:a.toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}function me(s){const t=Number(s||0);return t>80?"high":t>=50?"medium":"low"}const sa=[{title:"Monitoring",items:[{id:"overview",label:"Overview",icon:ct},{id:"map",label:"Threat Map",icon:Ke},{id:"alerts",label:"Live Alerts",icon:Xe}]},{title:"Analysis",items:[{id:"networks",label:"Network",icon:ye},{id:"analytics",label:"Analytics",icon:Ye},{id:"incidents",label:"Incidents",icon:ss}]},{title:"Intelligence",items:[{id:"osint",label:"OSINT Feed",icon:Ze},{id:"reco",label:"Recommendations",icon:be}]}];function ta({activeSection:s,onSelect:t,isOpen:a,syncStatus:n,lastSync:o}){function l(m){t==null||t(m);const i=document.getElementById(`section-${m}`);i&&i.scrollIntoView({behavior:"smooth",block:"start"})}const r=!!(n!=null&&n.running);return e.jsxs("aside",{className:`sidebar ${a?"is-open":""}`,"aria-label":"Primary navigation",children:[e.jsxs("div",{className:"sidebar-head",children:[e.jsx("div",{className:"brand-mark","aria-hidden":"true",children:e.jsx(Tt,{size:20,strokeWidth:2})}),e.jsxs("div",{className:"brand-copy",children:[e.jsx("div",{className:"brand-title",children:"Wildlife Intelligence"}),e.jsx("div",{className:"brand-sub",children:"Command Center"})]})]}),e.jsx("nav",{className:"sidebar-body",children:sa.map(m=>e.jsxs("div",{className:"nav-group",children:[e.jsx("div",{className:"nav-group-title",children:m.title}),m.items.map(({id:i,label:u,icon:j})=>{const d=s===i;return e.jsxs("button",{type:"button",className:`nav-item ${d?"is-active":""}`,onClick:()=>l(i),"aria-current":d?"page":void 0,children:[e.jsx(j,{size:16,className:"nav-icon",strokeWidth:2}),e.jsx("span",{children:u}),e.jsx("span",{className:"nav-dot","aria-hidden":"true"})]},i)})]},m.title))}),e.jsx("div",{className:"sidebar-foot",children:e.jsxs("div",{className:"sync-card",children:[e.jsxs("div",{className:"sync-row",children:[e.jsx("span",{children:"Data sync"}),e.jsxs("span",{className:`pulse ${r?"":"is-idle"}`,children:[e.jsx("span",{className:"pulse-dot"}),r?"Live":"Idle"]})]}),e.jsxs("div",{className:"sync-row",children:[e.jsx("span",{children:"Last update"}),e.jsx("strong",{className:"mono",children:as(o)})]})]})})]})}function aa({activeSection:s,busy:t,syncStatus:a,onRefresh:n,onExport:o,onToggleMenu:l,onLogout:r,onReanalyze:m}){const i={overview:"Overview",map:"Threat Map",alerts:"Live Alerts",analytics:"Analytics",incidents:"Incidents",osint:"OSINT Feed",reco:"Recommendations"},u=!!(a!=null&&a.running),j=u?"Search in progress":"Auto search active",d=u?(a==null?void 0:a.progress)||{}:(a==null?void 0:a.last_search)||{},k=String((a==null?void 0:a.message)||"").trim(),v=typeof d.stage=="string"&&d.stage!=="-"?d.stage:"",_=typeof d.provider=="string"&&d.provider!=="-"?d.provider:"",x=typeof d.language=="string"&&d.language!=="-"?d.language:"",C=typeof d.query=="string"&&d.query!=="-"?d.query:"",q=d.scanned!==void 0?d.scanned:null,M=d.kept!==void 0?d.kept:null,I=typeof d.updated_at=="string"&&d.updated_at!=="-"?d.updated_at:"",D=[_,x].filter(Boolean).join(" / "),T=[];v&&T.push(`stage: ${u?v:`last ${v}`}`),D&&T.push(D),C&&T.push(`q: ${C}`),q!==null&&M!==null&&T.push(`scanned ${q}, kept ${M}`),!u&&I&&T.push(`updated ${as(I)}`);const G=T.length?T.join(" • "):k||(u?"Collecting live reports":""),[B,O]=c.useState(null),se=c.useRef(null),b=c.useRef(null);c.useEffect(()=>{function F(P){se.current&&!se.current.contains(P.target)&&b.current&&!b.current.contains(P.target)&&O(null)}function V(P){P.key==="Escape"&&O(null)}return B&&(document.addEventListener("mousedown",F),document.addEventListener("keydown",V)),()=>{document.removeEventListener("mousedown",F),document.removeEventListener("keydown",V)}},[B]);const W=()=>typeof import.meta<"u"?"".trim().replace(/\/$/,""):"",te=F=>{o(F),O(null)},ae=()=>{window.location.href=`${W()}/api/public/download-csv`,O(null)},y=()=>{window.location.href=`${W()}/api/public/download-db`,O(null)},U=()=>{O(null);const F=document.createElement("input");F.type="file",F.accept=".db,.sqlite,.sqlite3",F.onchange=async V=>{var de;const P=(de=V.target.files)==null?void 0:de[0];if(!P||!confirm(`Restore database from "${P.name}"? This will replace all current data.`))return;const J=new FormData;J.append("file",P);try{const Y=await(await fetch(`${W()}/api/public/upload-db`,{method:"POST",body:J})).json();Y.ok?(alert(`Database restored!

Total rows: ${Y.total_rows}
Poaching articles: ${Y.poaching_rows}
Predictor retrained: ${Y.predictor_retrained?"Yes":"No"}`),window.location.reload()):alert(`Restore failed: ${Y.detail||"Unknown error"}`)}catch(ne){alert(`Upload failed: ${ne.message}`)}},F.click()},K=()=>{O(null),m()};return e.jsxs("header",{className:"topbar",children:[e.jsxs("div",{className:"topbar-left",children:[e.jsx("button",{type:"button",className:"mobile-menu",onClick:l,"aria-label":"Open navigation menu",children:e.jsx(yt,{size:18})}),e.jsxs("div",{className:"breadcrumb",children:[e.jsx("span",{children:"Wildlife Intelligence"}),e.jsx("span",{className:"sep",children:"/"}),e.jsx("strong",{children:i[s]||"Overview"})]}),e.jsxs("div",{className:"india-exclusive-badge hidden md:flex",children:[e.jsx("span",{className:"dot animate-pulse"}),e.jsx("span",{children:"India Exclusive Intelligence"})]})]}),e.jsx("div",{className:"topbar-center",children:e.jsxs("div",{className:`sync-pill ${u?"is-running":"is-idle"}`,role:"status","aria-live":"polite",children:[e.jsx("span",{className:"sync-pill-dot","aria-hidden":"true"}),e.jsx("span",{className:"sync-pill-label",children:j}),G?e.jsx("span",{className:"sync-pill-meta",children:G}):null]})}),e.jsxs("div",{className:"topbar-right",children:[e.jsxs("div",{className:"dropdown",ref:se,children:[e.jsxs("button",{type:"button",className:"btn",onClick:()=>O(B==="export"?null:"export"),"aria-haspopup":"menu","aria-expanded":B==="export",children:[e.jsx(ge,{size:15}),e.jsx("span",{className:"btn-label",children:"Export"}),e.jsx(Le,{size:13,className:`dropdown-caret ${B==="export"?"is-open":""}`})]}),B==="export"&&e.jsxs("div",{className:"dropdown-menu",role:"menu",children:[e.jsxs("button",{type:"button",role:"menuitem",className:"dropdown-item",onClick:()=>te("csv"),children:[e.jsx(ge,{size:14}),e.jsx("span",{children:"Export as CSV"})]}),e.jsxs("button",{type:"button",role:"menuitem",className:"dropdown-item",onClick:()=>te("excel"),children:[e.jsx(Te,{size:14}),e.jsx("span",{children:"Export as Excel"})]}),e.jsxs("button",{type:"button",role:"menuitem",className:"dropdown-item",onClick:()=>te("excel_incidents_reports"),children:[e.jsx(Te,{size:14}),e.jsx("span",{children:"Excel (2-Sheet)"})]})]})]}),e.jsxs("div",{className:"dropdown",ref:b,children:[e.jsxs("button",{type:"button",className:"btn",onClick:()=>O(B==="database"?null:"database"),"aria-haspopup":"menu","aria-expanded":B==="database",children:[e.jsx(Ys,{size:15}),e.jsx("span",{className:"btn-label",children:"Database"}),e.jsx(Le,{size:13,className:`dropdown-caret ${B==="database"?"is-open":""}`})]}),B==="database"&&e.jsxs("div",{className:"dropdown-menu",role:"menu",children:[e.jsxs("button",{type:"button",role:"menuitem",className:"dropdown-item",onClick:ae,children:[e.jsx(ge,{size:14}),e.jsx("span",{children:"Download All Data (CSV)"})]}),e.jsxs("button",{type:"button",role:"menuitem",className:"dropdown-item",onClick:y,children:[e.jsx(nt,{size:14}),e.jsx("span",{children:"Download Database"})]}),e.jsxs("button",{type:"button",role:"menuitem",className:"dropdown-item",onClick:U,children:[e.jsx(Yt,{size:14}),e.jsx("span",{children:"Upload Database"})]}),e.jsxs("button",{type:"button",role:"menuitem",className:"dropdown-item",onClick:K,children:[e.jsx(pe,{size:14}),e.jsx("span",{children:"Re-analyze Database"})]})]})]}),e.jsx("div",{className:"topbar-divider"}),e.jsxs("button",{type:"button",className:"btn btn-ghost",onClick:n,disabled:t,"aria-label":"Refresh data",children:[e.jsx(pe,{size:15,className:t?"spin":""}),e.jsx("span",{className:"btn-label",children:"Refresh"})]}),e.jsxs("button",{type:"button",className:"btn btn-ghost",onClick:r,"aria-label":"Logout",children:[e.jsx(ft,{size:15}),e.jsx("span",{className:"btn-label",children:"Logout"})]})]}),e.jsx("style",{children:`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `})]})}function na(s){const t=Number(s||0);return Number.isFinite(t)?t>=1e3?t.toLocaleString("en-US"):t.toString():"0"}function ia({value:s}){if(s==null)return null;const t=s>=0,a=t?Wt:Ht;return e.jsxs("span",{className:`kpi-trend ${t?"is-up":"is-down"}`,children:[e.jsx(a,{size:12}),Math.abs(s).toFixed(1),"%"]})}function ra({summary:s,loading:t}){const a=(s==null?void 0:s.kpis)||s||{},n=[{id:"total",label:"Total Incidents",value:a.total_incidents??0,trend:a.trend_incidents,icon:_t,tone:"primary",hint:"All tracked events"},{id:"high",label:"High Risk",value:a.high_risk_count??a.high_risk??0,trend:a.trend_high_risk,icon:st,tone:"danger",hint:"Risk score above 80"},{id:"states",label:"States Affected",value:a.states_affected??a.states_active??0,trend:a.trend_states,icon:Qe,tone:"default",hint:"With recent activity"},{id:"species",label:"Species Impacted",value:a.species_impacted??a.species_tracked??0,trend:a.trend_species,icon:Zs,tone:"warn",hint:"Unique species tracked"}];return t&&!s?e.jsx("div",{className:"kpi-grid","aria-busy":"true",children:Array.from({length:4}).map((o,l)=>e.jsx("div",{className:"skel skel-kpi"},l))}):e.jsx("div",{className:"kpi-grid",children:n.map(({id:o,label:l,value:r,trend:m,icon:i,tone:u,hint:j})=>e.jsxs("article",{className:`kpi-card ${u==="danger"?"is-danger":u==="primary"?"is-primary":u==="warn"?"is-warn":""}`,children:[e.jsxs("div",{className:"kpi-head",children:[e.jsx("div",{className:"kpi-label",children:l}),e.jsx("div",{className:"kpi-icon",children:e.jsx(i,{size:16,strokeWidth:2})})]}),e.jsxs("div",{className:"kpi-body",children:[e.jsx("div",{className:"kpi-value",children:na(r)}),e.jsx(ia,{value:m})]}),e.jsx("div",{className:"kpi-meta",children:j})]},o))})}const la="".trim(),ns=s=>s.replace(/\/$/,""),oa=()=>{const s=ns(la);return s?typeof window>"u"||!/^https?:\/\//i.test(s)?s:window.location.protocol==="https:"&&s.startsWith("http://")?s.replace(/^http:\/\//i,"https://"):s:""},oe=oa(),N=s=>oe?`${oe}${s}`:s,Ne="wildlife_admin_token",ca=()=>{if(!oe)return"";const s=typeof window<"u",t=s&&window.location.protocol==="https:";try{const a=s?window.location.origin:"http://localhost",n=new URL(oe,a),o=t||n.protocol==="https:"?"wss:":"ws:";return n.protocol=o,ns(n.toString())}catch{let a=oe.replace(/^https?:\/\//i,n=>n.toLowerCase().startsWith("https")?"wss://":"ws://");return t&&(a=a.replace(/^ws:\/\//i,"wss://")),a}},Oe=ca(),da=s=>Oe?`${Oe}${s}`:`${window.location.protocol==="https:"?"wss":"ws"}://${window.location.host}${s}`,ha=2e4,z={adminLogin:N("/api/admin/login"),adminLogout:N("/api/admin/logout"),adminRefresh:N("/api/admin/refresh"),summary:N("/api/dashboard-summary"),chart:N("/api/chart-data"),map:N("/api/map-data"),alerts:N("/api/alerts?limit=60"),reports:N("/api/reports?limit=50"),osint:N("/api/osint-feed?limit=30"),syncStatus:N("/api/sync-status"),filterNews:N("/api/filter-news"),exportCsv:N("/api/export/csv"),exportPdf:N("/api/export/pdf"),exportExcel:N("/api/export/excel"),exportExcelIncidentsReports:N("/api/export/excel-incidents-reports"),exportBriefing:N("/api/export/briefing-pack"),publicDownloadCsv:N("/api/public/download-csv"),publicDownloadDb:N("/api/public/download-db"),publicUploadDb:N("/api/public/upload-db"),predictions:N("/api/predictions"),predictionsTrain:N("/api/predictions/train"),predictionsHotspots:N("/api/predictions/hotspots"),predictionsPersons:N("/api/predictions/persons"),graphNetworks:N("/api/graph/networks"),graphPersonProfile:s=>N(`/api/graph/person/${encodeURIComponent(s)}`),ragQuery:N("/api/rag/query"),searchSemantic:N("/api/search/semantic"),adminReanalyze:N("/api/admin/reanalyze"),reviewIncident:s=>N(`/api/incidents/${s}/review`),wsLive:s=>da(`/api/ws/live?token=${s}`)};function ee(s,t=""){const a=String(s||"").trim()||String(t||"").trim();return a?/^https?:\/\//i.test(a)?a:a.startsWith("//")?`https:${a}`:a.startsWith("/")?N(a):a.startsWith("www.")?`https://${a}`:/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(a)?`https://${a}`:"#":"#"}async function ke(s,t={},a=ha){const n=new AbortController,o=new AbortController,l=[n.signal,t.signal].filter(Boolean),r=()=>o.abort(),m=setTimeout(()=>n.abort(),a);l.forEach(i=>{if(i.aborted){r();return}i.addEventListener("abort",r,{once:!0})});try{return await fetch(s,{...t,signal:o.signal})}finally{clearTimeout(m),l.forEach(i=>i.removeEventListener("abort",r))}}async function H(s,{retry:t=!0,signal:a}={}){const n=ue(),o=n?{Authorization:`Bearer ${n}`}:{},l=await ke(s,{cache:"no-store",headers:o,signal:a});if(l.status===401&&t&&n&&await we())return H(s,{retry:!1,signal:a});if(!l.ok){let r="";try{const i=await l.json();r=String((i==null?void 0:i.detail)||"").trim()}catch{r=""}const m=new Error(r||`HTTP ${l.status}`);throw m.status=l.status,m}return l.json()}async function Z(s,t,{includeAuth:a=!0,retry:n=!0,signal:o}={}){const l=a?ue():"",r={"Content-Type":"application/json"};l&&(r.Authorization=`Bearer ${l}`);const m=await ke(s,{method:"POST",headers:r,body:JSON.stringify(t||{}),signal:o});if(m.status===401&&n&&l&&a&&await we())return Z(s,t,{includeAuth:a,retry:!1,signal:o});if(!m.ok){let i="";try{const j=await m.json();i=String((j==null?void 0:j.detail)||"").trim()}catch{i=""}const u=new Error(i||`HTTP ${m.status}`);throw u.status=m.status,u}return m.json()}async function is(s,t,{includeAuth:a=!0,retry:n=!0,signal:o}={}){const l=a?ue():"",r={"Content-Type":"application/json"};l&&(r.Authorization=`Bearer ${l}`);const m=await ke(s,{method:"PATCH",headers:r,body:JSON.stringify(t||{}),signal:o});if(m.status===401&&n&&l&&a&&await we())return is(s,t,{includeAuth:a,retry:!1,signal:o});if(!m.ok){let i="";try{const j=await m.json();i=String((j==null?void 0:j.detail)||"").trim()}catch{i=""}const u=new Error(i||`HTTP ${m.status}`);throw u.status=m.status,u}return m.json()}async function we(){try{const s=await Z(z.adminRefresh,{},{includeAuth:!1});if(s!=null&&s.access_token)return rs(s.access_token),!0}catch(s){console.error("Token refresh failed:",s)}return!1}function ue(){return String(localStorage.getItem(Ne)||"").trim()}function rs(s){const t=String(s||"").trim();t&&localStorage.setItem(Ne,t)}function pa(){localStorage.removeItem(Ne)}function Pe(s){const t=new URLSearchParams;return Object.entries(s).forEach(([a,n])=>{String(n||"").trim()!==""&&t.set(a,n)}),t.toString()}function ma({mapData:s,onMapError:t}){var r;const a=c.useRef(null),n=c.useRef(null),o=c.useRef(null);c.useEffect(()=>{var m,i;if(!(!a.current||!s))try{n.current||(n.current=he.map(a.current,{zoomControl:!0,attributionControl:!0}).setView([((m=s.center)==null?void 0:m.lat)||22.97,((i=s.center)==null?void 0:i.lng)||78.65],5),he.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:12,attribution:"&copy; OpenStreetMap contributors"}).addTo(n.current),o.current=he.layerGroup().addTo(n.current));const u=o.current;if(!u)return;u.clearLayers(),(s.markers||[]).slice(0,600).forEach(j=>{if(typeof j.lat!="number"||typeof j.lng!="number")return;const d=me(j.risk_score),k=d==="high"?"#C75050":d==="medium"?"#C9933D":"#5A9E6F",v=he.circleMarker([j.lat,j.lng],{radius:d==="high"?8:d==="medium"?7:6,color:k,fillColor:k,fillOpacity:.8,weight:2}),_=(j.title||"Incident").replace(/</g,"&lt;"),x=ee(j.open_url,j.url).replace(/"/g,"&quot;");v.bindPopup(`<div style="min-width:240px;font-family:Inter,sans-serif">
            <b style="font-size:14px;color:#1A1917">${_}</b>
            <div style="margin-top:6px;color:#6B6966;font-size:12px">${j.state||"-"} · ${j.district||"-"}</div>
            <div style="margin-top:8px;font-size:13px;color:#1A1917">Risk <b style="color:${k}">${Number(j.risk_score||0)}</b> · ${j.species||"—"}</div>
            <a href="${x}" target="_blank" rel="noopener" style="display:inline-block;margin-top:10px;color:#C17F59;font-weight:500">Open article →</a>
          </div>`),v.addTo(u)})}catch(u){console.error("Map rendering failed:",u),t==null||t("Map failed to render on this browser. Use legacy view as fallback.")}},[s,t]);const l=((r=s==null?void 0:s.markers)==null?void 0:r.length)||0;return e.jsxs("article",{className:"card map-card",id:"section-map",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{className:"card-head-left",children:[e.jsx(Ke,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"National Threat Map"})]}),e.jsxs("span",{className:"card-count mono",children:[l," markers"]})]}),e.jsx("div",{className:"card-body-flush",style:{position:"relative",minHeight:460},children:e.jsx("div",{className:"map-surface",ref:a})}),e.jsxs("div",{className:"map-legend",children:[e.jsx("span",{className:"legend-dot high",children:"High risk"}),e.jsx("span",{className:"legend-dot medium",children:"Medium"}),e.jsx("span",{className:"legend-dot low",children:"Low"}),e.jsx("span",{style:{marginLeft:"auto",color:"var(--dim)"},children:"Tap a marker for details"})]})]})}const ve="#6B6966",qe="rgba(26, 25, 23, 0.06)",ls="#6B6966",X={responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{labels:{color:ls,font:{family:"Inter, sans-serif",size:11,weight:"500"},usePointStyle:!0,boxWidth:8,padding:14}},tooltip:{backgroundColor:"#FFFFFF",borderColor:"rgba(26, 25, 23, 0.12)",borderWidth:1,titleColor:"#1A1917",bodyColor:"#6B6966",padding:12,boxPadding:6,cornerRadius:12,titleFont:{family:"Inter, sans-serif",size:13,weight:"600"},bodyFont:{family:"JetBrains Mono, monospace",size:11}}},scales:{x:{ticks:{color:ve,font:{family:"Inter, sans-serif",size:10}},grid:{color:qe,drawBorder:!1},border:{display:!1}},y:{ticks:{color:ve,font:{family:"JetBrains Mono, monospace",size:10}},grid:{color:qe,drawBorder:!1},border:{display:!1}}}},ua={responsive:!0,maintainAspectRatio:!1,cutout:"62%",plugins:{legend:{position:"right",labels:{color:ls,font:{family:"Inter, sans-serif",size:11},usePointStyle:!0,boxWidth:8,padding:10}},tooltip:X.plugins.tooltip}};function xa({chartData:s}){const t=(s==null?void 0:s.timeline)||{labels:[],incidents:[],high_risk:[],granularity:"monthly"},a=(s==null?void 0:s.top_states)||[],n=(s==null?void 0:s.species_dist)||(s==null?void 0:s.species_distribution)||[],o=(s==null?void 0:s.source_rank)||(s==null?void 0:s.source_rankings)||[],l={labels:t.labels,datasets:[{label:"Incidents",data:t.incidents,borderColor:"#C17F59",backgroundColor:d=>{const{ctx:k,chartArea:v}=d.chart;if(!v)return"rgba(193, 127, 89, 0.12)";const _=k.createLinearGradient(0,v.top,0,v.bottom);return _.addColorStop(0,"rgba(193, 127, 89, 0.2)"),_.addColorStop(1,"rgba(193, 127, 89, 0)"),_},fill:!0,tension:.4,borderWidth:2.5,pointRadius:0,pointHoverRadius:5,pointHoverBackgroundColor:"#C17F59"},{label:"High Risk",data:t.high_risk,borderColor:"#C75050",backgroundColor:d=>{const{ctx:k,chartArea:v}=d.chart;if(!v)return"rgba(199, 80, 80, 0.1)";const _=k.createLinearGradient(0,v.top,0,v.bottom);return _.addColorStop(0,"rgba(199, 80, 80, 0.18)"),_.addColorStop(1,"rgba(199, 80, 80, 0)"),_},fill:!0,tension:.4,borderWidth:2.5,pointRadius:0,pointHoverRadius:5,pointHoverBackgroundColor:"#C75050"}]},r={labels:a.map(d=>d.state),datasets:[{label:"Incidents",data:a.map(d=>d.count),backgroundColor:"rgba(193, 127, 89, 0.75)",hoverBackgroundColor:"#C17F59",borderRadius:6,borderSkipped:!1,barThickness:16}]},m=["#C17F59","#D4956F","#C9933D","#C75050","#5B7BA8","#5A9E6F","#8B7355","#A67B5B","#9C7B56","#7D7471"],i={labels:n.slice(0,10).map(d=>d.species),datasets:[{data:n.slice(0,10).map(d=>d.count),backgroundColor:m,borderColor:"#FFFFFF",borderWidth:3,hoverOffset:8}]},u={labels:o.slice(0,10).map(d=>d.source),datasets:[{label:"Reliability",data:o.slice(0,10).map(d=>Number(d.reliability_score||0)),backgroundColor:"rgba(91, 123, 168, 0.75)",hoverBackgroundColor:"#5B7BA8",borderRadius:6,borderSkipped:!1,barThickness:14}]},j={...X,indexAxis:"y",scales:{...X.scales,y:{...X.scales.y,ticks:{color:ve,font:{family:"Inter, sans-serif",size:10}}}}};return e.jsxs("div",{className:"charts-grid",id:"section-analytics",children:[e.jsxs("article",{className:"card chart-card",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{className:"card-head-left",children:[e.jsx(Ve,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"Incident Timeline"})]}),e.jsx("span",{className:"badge",children:t.granularity||"daily"})]}),e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"chart-wrap",children:e.jsx(fs,{data:l,options:X})})})]}),e.jsxs("article",{className:"card chart-card",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{className:"card-head-left",children:[e.jsx(Ye,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"Top States"})]}),e.jsx("span",{className:"card-count mono",children:a.length})]}),e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"chart-wrap",children:e.jsx(Fe,{data:r,options:X})})})]}),e.jsxs("article",{className:"card chart-card",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{className:"card-head-left",children:[e.jsx(Hs,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"Species Distribution"})]}),e.jsx("span",{className:"card-count mono",children:n.length})]}),e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"chart-wrap",children:e.jsx(gs,{data:i,options:ua})})})]}),e.jsxs("article",{className:"card chart-card",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{className:"card-head-left",children:[e.jsx(es,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"Source Reliability"})]}),e.jsx("span",{className:"card-count mono",children:o.length})]}),e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"chart-wrap",children:e.jsx(Fe,{data:u,options:j})})})]})]})}const fa={q:"",species:"",state:"",date_from:"",date_to:"",crime_type:"",severity:"",source:""};function ga({filters:s,filterOptions:t,onChange:a,onApply:n,onBriefing:o}){const l=Object.values(s).filter(i=>String(i||"").trim()!=="").length;function r(i,u){a({...s,[i]:u})}function m(){a(fa)}return e.jsxs("article",{className:"card filters-card",id:"section-incidents",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{className:"card-head-left",children:[e.jsx(Be,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"Analyst Filters"}),l>0?e.jsxs("span",{className:"badge",children:[l," active"]}):null]}),e.jsxs("button",{type:"button",className:"btn btn-ghost",onClick:m,children:[e.jsx(St,{size:14}),e.jsx("span",{className:"btn-label",children:"Reset"})]})]}),e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"filter-grid",children:[e.jsxs("div",{className:"filter-field",style:{gridColumn:"span 2"},children:[e.jsx("label",{className:"filter-label",htmlFor:"f-search",children:"Search"}),e.jsxs("div",{className:"input-with-icon",children:[e.jsx(Et,{size:14,className:"icon"}),e.jsx("input",{id:"f-search",className:"input",placeholder:"Search title, summary, or keywords",value:s.q,onChange:i=>r("q",i.target.value),onKeyDown:i=>{i.key==="Enter"&&n()}})]})]}),e.jsxs("div",{className:"filter-field",children:[e.jsx("label",{className:"filter-label",htmlFor:"f-species",children:"Species"}),e.jsxs("select",{id:"f-species",className:"select",value:s.species,onChange:i=>r("species",i.target.value),children:[e.jsx("option",{value:"",children:"All species"}),(t.species||[]).map(i=>e.jsx("option",{value:i,children:i},i))]})]}),e.jsxs("div",{className:"filter-field",children:[e.jsx("label",{className:"filter-label",htmlFor:"f-state",children:"State"}),e.jsxs("select",{id:"f-state",className:"select",value:s.state,onChange:i=>r("state",i.target.value),children:[e.jsx("option",{value:"",children:"All states"}),(t.states||[]).map(i=>e.jsx("option",{value:i,children:i},i))]})]}),e.jsxs("div",{className:"filter-field",children:[e.jsx("label",{className:"filter-label",htmlFor:"f-crime",children:"Crime type"}),e.jsxs("select",{id:"f-crime",className:"select",value:s.crime_type,onChange:i=>r("crime_type",i.target.value),children:[e.jsx("option",{value:"",children:"All types"}),(t.crime_types||[]).map(i=>e.jsx("option",{value:i,children:i},i))]})]}),e.jsxs("div",{className:"filter-field",children:[e.jsx("label",{className:"filter-label",htmlFor:"f-source",children:"Source"}),e.jsxs("select",{id:"f-source",className:"select",value:s.source,onChange:i=>r("source",i.target.value),children:[e.jsx("option",{value:"",children:"All sources"}),(t.sources||[]).map(i=>e.jsx("option",{value:i,children:i},i))]})]}),e.jsxs("div",{className:"filter-field",children:[e.jsx("label",{className:"filter-label",htmlFor:"f-severity",children:"Severity"}),e.jsxs("select",{id:"f-severity",className:"select",value:s.severity,onChange:i=>r("severity",i.target.value),children:[e.jsx("option",{value:"",children:"All severity"}),e.jsx("option",{value:"high",children:"High"}),e.jsx("option",{value:"medium",children:"Medium"}),e.jsx("option",{value:"low",children:"Low"})]})]}),e.jsxs("div",{className:"filter-field",children:[e.jsx("label",{className:"filter-label",htmlFor:"f-from",children:"Date from"}),e.jsx("input",{id:"f-from",type:"date",className:"input",value:s.date_from,onChange:i=>r("date_from",i.target.value)})]}),e.jsxs("div",{className:"filter-field",children:[e.jsx("label",{className:"filter-label",htmlFor:"f-to",children:"Date to"}),e.jsx("input",{id:"f-to",type:"date",className:"input",value:s.date_to,onChange:i=>r("date_to",i.target.value)})]})]}),e.jsxs("div",{className:"filter-actions",children:[e.jsx("div",{className:"filter-actions-left",children:l>0?`${l} filter${l===1?"":"s"} applied`:"No filters applied"}),e.jsxs("div",{className:"filter-actions-right",children:[e.jsxs("button",{type:"button",className:"btn",onClick:o,children:[e.jsx(Je,{size:14}),e.jsx("span",{children:"Briefing Pack"})]}),e.jsxs("button",{type:"button",className:"btn btn-primary",onClick:n,children:[e.jsx(Be,{size:14}),e.jsx("span",{children:"Apply Filters"})]})]})]})]})]})}function ja({rows:s,loading:t,onSelectRow:a}){return e.jsxs("article",{className:"card table-card",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{className:"card-head-left",children:[e.jsx(ss,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"Incident Intelligence"})]}),e.jsxs("span",{className:"card-count mono",children:[s.length," rows"]})]}),e.jsx("div",{className:"card-body-flush",style:{maxHeight:"600px",overflowY:"auto"},children:e.jsx("div",{className:"table-wrap",children:e.jsxs("table",{className:"data-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Date"}),e.jsx("th",{children:"Risk"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Title"}),e.jsx("th",{children:"Species"}),e.jsx("th",{children:"State"}),e.jsx("th",{children:"District"}),e.jsx("th",{children:"Involved persons"}),e.jsx("th",{children:"Crime type"}),e.jsx("th",{children:"Source"}),e.jsx("th",{children:"Conf."}),e.jsx("th",{children:"Link"})]})}),e.jsxs("tbody",{children:[s.map(n=>{const o=me(n.risk_score),l=n.review_status||"pending";return e.jsxs("tr",{onClick:()=>a&&a(n),style:{cursor:"pointer"},className:"clickable-row",children:[e.jsx("td",{className:"cell-mono",children:ts(n.date)}),e.jsx("td",{children:e.jsx("span",{className:`risk-pill ${o}`,children:n.risk_score})}),e.jsx("td",{children:e.jsx("span",{className:`status-pill ${l}`,children:l})}),e.jsx("td",{className:"cell-title",children:n.title}),e.jsx("td",{className:"cell-muted",children:n.species||"—"}),e.jsx("td",{className:"cell-muted",children:n.state||"—"}),e.jsx("td",{className:"cell-muted",children:n.district||"—"}),e.jsx("td",{className:"cell-muted",children:n.involved_persons||"—"}),e.jsx("td",{className:"cell-muted",children:n.crime_type||"—"}),e.jsx("td",{className:"cell-muted",children:n.source||"—"}),e.jsx("td",{className:"cell-mono",children:Number(n.confidence||0).toFixed(2)}),e.jsx("td",{children:e.jsxs("a",{href:ee(n.open_url,n.url),target:"_blank",rel:"noopener noreferrer",className:"feed-link","aria-label":"Open source article",onClick:r=>r.stopPropagation(),children:["Open ",e.jsx(ce,{size:12})]})})]},n.id)}),!s.length&&!t?e.jsx("tr",{children:e.jsxs("td",{colSpan:12,className:"empty-cell",children:[e.jsx("div",{className:"empty-cell-icon",children:e.jsx(Ft,{size:20})}),"No incidents match the current filters."]})}):null]})]})})})]})}function ba(){var d,k,v,_;const[s,t]=c.useState(null),[a,n]=c.useState(!0),[o,l]=c.useState(null),[r,m]=c.useState(null),i=c.useRef(null),u=c.useRef(0),j=c.useCallback(async()=>{var q;u.current+=1;const x=u.current;(q=i.current)==null||q.abort();const C=new AbortController;i.current=C,n(!0);try{const M=new URLSearchParams({limit:"10000",min_size:"2",incident_limit:"10000"}),I=await H(`${z.graphNetworks}?${M.toString()}`,{signal:C.signal});if(x!==u.current)return;t(I),m(D=>{if(!I.networks||I.networks.length===0)return null;if(D!=null&&D.network_id){const T=I.networks.find(G=>G.network_id===D.network_id);if(T)return T}return I.networks[0]}),l(null)}catch(M){if((M==null?void 0:M.name)==="AbortError"||x!==u.current)return;l("Failed to load intelligence networks."),console.error("Failed to load intelligence networks:",M)}finally{x===u.current&&n(!1)}},[]);return c.useEffect(()=>(j(),()=>{var x;u.current+=1,(x=i.current)==null||x.abort()}),[j]),a&&!s?e.jsxs("div",{className:"network-loading",children:[e.jsx(pe,{size:24,className:"spin"}),e.jsx("p",{children:"Analyzing criminal networks..."})]}):e.jsxs("div",{className:"network-container",children:[e.jsxs("div",{className:"network-header",children:[e.jsxs("div",{className:"header-info",children:[e.jsx(ye,{size:24,className:"accent-icon"}),e.jsxs("div",{children:[e.jsx("h1",{children:"Intelligence Network Browser"}),e.jsxs("p",{className:"subtitle",children:["Visualizing ",(s==null?void 0:s.person_nodes)||0," actors across ",(s==null?void 0:s.incidents_analyzed)||0," incidents and ",(s==null?void 0:s.total_network_count)||0," networks"]})]})]}),e.jsxs("button",{className:"btn-secondary",onClick:j,disabled:a,children:[e.jsx(pe,{size:14,className:a?"spin":""}),"Refresh Analysis"]})]}),o?e.jsx("div",{className:"network-error",role:"alert",children:o}):null,e.jsxs("div",{className:"network-layout",children:[e.jsxs("aside",{className:"network-sidebar",children:[e.jsxs("div",{className:"sidebar-label",children:["Detected Clusters (",(s==null?void 0:s.network_count)||0," shown / ",(s==null?void 0:s.total_network_count)||(s==null?void 0:s.network_count)||0," total)"]}),e.jsx("div",{className:"cluster-list",children:(d=s==null?void 0:s.networks)==null?void 0:d.map(x=>e.jsxs("button",{className:`cluster-item ${(r==null?void 0:r.network_id)===x.network_id?"active":""}`,onClick:()=>m(x),children:[e.jsx("div",{className:"cluster-id",children:x.network_id}),e.jsxs("div",{className:"cluster-info",children:[e.jsxs("span",{className:"cluster-stats",children:[e.jsx(Xt,{size:12})," ",x.suspect_count," Suspects"]}),e.jsxs("span",{className:"cluster-stats",children:[e.jsx(Vt,{size:12})," ",x.incident_count," Incidents"]}),e.jsxs("span",{className:"cluster-stats",children:["Score ",Number(x.network_score||0).toFixed(1)," • Avg risk ",Number(x.avg_risk_score||0).toFixed(1)]})]}),e.jsx(Us,{size:14,className:"chevron"})]},x.network_id))})]}),e.jsx("main",{className:"network-details",children:r?e.jsxs("div",{className:"network-view animate-fade-in",children:[e.jsx("div",{className:"network-hero",children:e.jsxs("div",{className:"hero-stats",children:[e.jsxs("div",{className:"stat-card",children:[e.jsx("label",{children:"Threat Score"}),e.jsx("div",{className:"value",children:Number(r.network_score||0).toFixed(1)})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("label",{children:"Avg Incident Risk"}),e.jsx("div",{className:"value",children:Number(r.avg_risk_score||0).toFixed(1)})]}),e.jsxs("div",{className:"stat-card",children:[e.jsx("label",{children:"Link Density"}),e.jsx("div",{className:"value",children:Number(r.edge_density||0).toFixed(3)})]})]})}),e.jsxs("div",{className:"network-grid",children:[e.jsxs("section",{className:"actors-section",children:[e.jsxs("h3",{children:[e.jsx(Kt,{size:18})," Network Actors (",r.actor_count||r.suspect_count||0,")"]}),e.jsxs("div",{className:"actor-list",children:[(r.actors||r.top_actors||[]).map((x,C)=>e.jsxs("div",{className:"actor-card animate-fade-in",style:{animationDelay:`${C*.05}s`},children:[e.jsxs("div",{className:"actor-main",children:[e.jsx("div",{className:"actor-name",children:x.name}),e.jsxs("div",{className:"actor-meta",children:[e.jsxs("span",{children:["Centrality: ",x.centrality]}),e.jsx("span",{children:"•"}),e.jsxs("span",{children:[x.incident_count," Incidents"]})]})]}),e.jsx("div",{className:"actor-risk-bar",children:e.jsx("div",{className:"bar-fill",style:{width:`${x.centrality*100}%`}})})]},`${x.name||"actor"}-${x.incident_count||0}-${C}`)),(!r.actors||r.actors.length===0)&&(!r.top_actors||r.top_actors.length===0)&&e.jsx("div",{className:"empty-state",children:e.jsx("p",{children:"No actor nodes found for this network."})})]})]}),e.jsxs("section",{className:"intel-section",children:[e.jsxs("h3",{children:[e.jsx(Qe,{size:18})," Operation Areas"]}),e.jsx("div",{className:"pill-cloud",children:(k=r.top_states)==null?void 0:k.map((x,C)=>e.jsxs("span",{className:"location-pill",children:[x.state," ",e.jsx("span",{className:"pill-count",children:x.count})]},`${x.state||"state"}-${C}`))}),e.jsxs("h3",{style:{marginTop:"24px"},children:[e.jsx(Je,{size:18})," Species Targeted"]}),e.jsx("div",{className:"pill-cloud",children:(v=r.top_species)==null?void 0:v.map((x,C)=>e.jsxs("span",{className:"species-pill",children:[x.species," ",e.jsx("span",{className:"pill-count",children:x.count})]},`${x.species||"species"}-${C}`))}),e.jsxs("h3",{style:{marginTop:"24px"},children:[e.jsx(ce,{size:18})," Linked Incidents"]}),e.jsxs("div",{className:"incident-list",children:[(_=r.linked_incidents)==null?void 0:_.map((x,C)=>{const q=ee(x.url,x.open_url),M=e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"incident-title",children:x.title}),e.jsxs("div",{className:"incident-meta",children:["Risk ",x.risk_score," • ",x.state||"Unknown",x.district?`, ${x.district}`:""]})]}),I=x.id||`${x.title||"incident"}-${C}`;return q==="#"?e.jsx("div",{className:"incident-item incident-item-disabled",children:M},I):e.jsx("a",{className:"incident-item",href:q,target:"_blank",rel:"noopener noreferrer",children:M},I)}),(!r.linked_incidents||r.linked_incidents.length===0)&&e.jsx("div",{className:"empty-state",children:e.jsx("p",{children:"No linked incidents found for this network."})})]})]})]})]}):e.jsxs("div",{className:"empty-state",children:[e.jsx(ye,{size:48,className:"faint-icon"}),e.jsx("p",{children:"Select a cluster to view intelligence details"})]})})]}),e.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
      `}})]})}function ya({onSelectIncident:s}){var j,d;const[t,a]=c.useState(""),[n,o]=c.useState(!1),[l,r]=c.useState(null),[m,i]=c.useState(null),u=async k=>{if(k.preventDefault(),!!t.trim()){o(!0),i(null);try{const v=await Z(z.ragQuery,{query:t.trim(),top_k:5});r(v)}catch(v){i(v.message||"Failed to process natural language query."),console.error(v)}finally{o(!1)}}};return e.jsxs("div",{className:"semantic-search-container",children:[e.jsxs("form",{onSubmit:u,className:"semantic-input-group",children:[e.jsxs("div",{className:"input-with-icon",children:[e.jsx(Ot,{size:18,className:"sparkle-icon"}),e.jsx("input",{type:"text",placeholder:"Ask anything (e.g. 'What are the main smuggling routes for pangolins in Odisha?')",value:t,onChange:k=>a(k.target.value),disabled:n})]}),e.jsx("button",{type:"submit",className:"btn-primary semantic-btn",disabled:n||!t.trim(),children:n?e.jsx(pt,{size:18,className:"spin"}):e.jsx(Bs,{size:18})})]}),m&&e.jsxs("div",{className:"semantic-error",children:[e.jsx(lt,{size:14}),e.jsx("span",{children:m})]}),l&&e.jsxs("div",{className:"semantic-result-area animate-fade-in",children:[e.jsxs("div",{className:"result-answer",children:[e.jsxs("div",{className:"answer-header",children:[e.jsx(Nt,{size:16}),e.jsx("span",{children:"Intelligence Analysis"})]}),e.jsx("div",{className:"answer-text",children:l.answer})]}),e.jsxs("div",{className:"result-sources",children:[e.jsxs("div",{className:"sources-label",children:["Citations (",((j=l.sources)==null?void 0:j.length)||0,")"]}),e.jsx("div",{className:"sources-list",children:(d=l.sources)==null?void 0:d.map((k,v)=>e.jsxs("div",{className:"source-item",onClick:()=>s==null?void 0:s(k.id),children:[e.jsx("div",{className:"source-title",children:k.title}),e.jsxs("div",{className:"source-meta",children:[e.jsxs("span",{className:"source-score",children:["Relevance: ",(k.relevance*100).toFixed(0),"%"]}),e.jsx("span",{children:"•"}),e.jsx("span",{children:k.date})]})]},v))})]})]}),e.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
      `}})]})}function va({alerts:s}){return e.jsxs("article",{className:"card",id:"section-alerts",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{className:"card-head-left",children:[e.jsx(Xe,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"Live High-Risk Alerts"})]}),e.jsxs("span",{className:"card-count mono",children:[s.length," active"]})]}),e.jsx("div",{className:"card-body-flush",children:s.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:e.jsx(Ge,{size:20})}),e.jsx("div",{children:"No active alerts"})]}):e.jsx("div",{className:"feed",children:s.slice(0,25).map(t=>{const a=me(t.risk_score);return e.jsxs("div",{className:`feed-row is-${a}`,children:[e.jsxs("div",{className:"feed-row-head",children:[e.jsx("div",{className:"feed-title",children:t.title||"Alert"}),e.jsx("span",{className:`risk-pill ${a}`,children:t.risk_score||0})]}),e.jsxs("div",{className:"feed-meta",children:[e.jsx("span",{children:t.state||"Unknown state"}),e.jsx("span",{className:"dot"}),e.jsx("span",{children:t.district||"—"}),t.species?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"dot"}),e.jsx("span",{children:t.species})]}):null]}),e.jsxs("a",{href:ee(t.open_url,t.url),target:"_blank",rel:"noopener noreferrer",className:"feed-link",children:["Open source ",e.jsx(ce,{size:12})]})]},t.id)})})})]})}function Na({items:s}){return e.jsxs("article",{className:"card",id:"section-osint",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{className:"card-head-left",children:[e.jsx(Ze,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"OSINT Signal Feed"})]}),e.jsxs("span",{className:"card-count mono",children:[s.length," signals"]})]}),e.jsx("div",{className:"card-body-flush",children:s.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:e.jsx(Ge,{size:20})}),e.jsx("div",{children:"No OSINT signals yet"})]}):e.jsx("div",{className:"feed",children:s.slice(0,16).map(t=>{const a=Number(t.signal_strength||0);return e.jsxs("div",{className:"feed-row",children:[e.jsxs("div",{className:"feed-row-head",children:[e.jsx("div",{className:"feed-title",children:t.title}),e.jsx("span",{className:"badge mono",children:a.toFixed(2)})]}),e.jsxs("div",{className:"feed-meta",children:[e.jsx("span",{children:t.source_type||"source"}),e.jsx("span",{className:"dot"}),e.jsx("span",{children:"Signal strength"})]}),e.jsxs("a",{href:ee(t.open_url,t.url),target:"_blank",rel:"noopener noreferrer",className:"feed-link",children:["Open source ",e.jsx(ce,{size:12})]})]},t.id)})})})]})}function ka({items:s}){return e.jsxs("article",{className:"card",id:"section-reco",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{className:"card-head-left",children:[e.jsx(be,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"Top Recommendations"})]}),e.jsx("span",{className:"card-count mono",children:s.length})]}),e.jsx("div",{className:"card-body-flush",children:s.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-state-icon",children:e.jsx(be,{size:20})}),e.jsx("div",{children:"No recommendations generated yet"})]}):e.jsx("div",{className:"feed",children:s.map(([t,a])=>e.jsxs("div",{className:"reco-row",children:[e.jsx("span",{children:t}),e.jsx("span",{className:"reco-count",children:a})]},t))})})]})}js.register(bs,ys,vs,Ns,ks,ws,_s,Cs,zs);const wa=15e3,He={q:"",species:"",state:"",date_from:"",date_to:"",crime_type:"",severity:"",source:""},De=!1;new Date().toISOString();const _a=s=>{let t="",a=null;return s.forEach(n=>{if(!n)return;const o=Date.parse(n);Number.isNaN(o)||(a===null||o>a)&&(a=o,t=n)}),t};function Ca(){return e.jsx(za,{})}function za(){var Me;const[s,t]=c.useState(!0),[a,n]=c.useState(""),[o,l]=c.useState(!1),[r,m]=c.useState(()=>ue()),[i,u]=c.useState(""),[j,d]=c.useState(!1),[k,v]=c.useState({username:"",password:""}),[_,x]=c.useState(null),[C,q]=c.useState(null),[M,I]=c.useState(null),[D,T]=c.useState([]),[G,B]=c.useState([]),[O,se]=c.useState([]),[b,W]=c.useState(null),[te,ae]=c.useState([]),[y,U]=c.useState(null),[K,F]=c.useState("pending"),[V,P]=c.useState("");c.useEffect(()=>{y&&(F(y.review_status||"pending"),P(y.review_notes||""))},[y]);const[J,de]=c.useState(He),[ne,Y]=c.useState(He);c.useEffect(()=>{const h=setTimeout(()=>{Y(J)},300);return()=>clearTimeout(h)},[J]);const[_e,Ce]=c.useState("overview"),[ze,xe]=c.useState(!1),ie=c.useCallback((h="Please log in to continue.")=>{pa(),m(""),u(h),n(""),l(!1),t(!1)},[]),Q=c.useCallback(async()=>{if(!r||De)return;l(!0);const h=await Promise.allSettled([H(z.summary),H(z.chart),H(z.map),H(z.alerts),H(z.reports),H(z.osint),H(z.syncStatus)]);if(h.some(L=>{var le;return L.status==="rejected"&&Number((le=L.reason)==null?void 0:le.status)===401})){ie("Session expired. Please sign in again.");return}const[g,$,S,A,R,w,E]=h;g.status==="fulfilled"&&x(g.value),$.status==="fulfilled"&&q($.value),S.status==="fulfilled"&&I(S.value),A.status==="fulfilled"&&T(Array.isArray(A.value)?A.value:[]),R.status==="fulfilled"&&se(Array.isArray(R.value)?R.value:[]),w.status==="fulfilled"&&B(Array.isArray(w.value)?w.value:[]),E.status==="fulfilled"&&W(E.value),h.every(L=>L.status==="rejected")?n("Unable to load dashboard data right now."):n(""),t(!1),l(!1)},[r,ie]),re=c.useCallback(async()=>{if(!r||De)return;const h=Pe({...ne,min_confidence:0,limit:120});try{const p=await H(`${z.filterNews}?${h}`);ae(Array.isArray(p.items)?p.items:[])}catch(p){Number(p==null?void 0:p.status)===401?ie("Session expired. Please sign in again."):(console.error("Failed to refresh filtered incidents:",p),n(g=>g||"Incident feed is temporarily unavailable."))}},[r,ne,ie]);c.useEffect(()=>{if(!r){t(!1);return}const h=z.wsLive(r);let p=null,g=null;function $(){p=new WebSocket(h),p.onmessage=A=>{try{const{channel:R,data:w}=JSON.parse(A.data);if(R==="alerts"){const E=(w==null?void 0:w.payload)||w;T(L=>[E,...L].slice(0,100))}else if(R==="incidents"){const E=(w==null?void 0:w.payload)||w;ae(L=>[E,...L].slice(0,200))}else R==="sync_status"&&((w==null?void 0:w.type)==="sync_snapshot"&&w.snapshot?W(w.snapshot):(w==null?void 0:w.type)==="sync_completed"?W(E=>({...E,running:!1,finished_at:w.finished_at||new Date().toISOString(),duration_seconds:w.duration_seconds,stats:w.stats||(E==null?void 0:E.stats),message:`Completed in ${(w.duration_seconds||0).toFixed(1)}s`})):W(w))}catch(R){console.error("WS parse error:",R)}},p.onclose=()=>{g=window.setTimeout($,5e3)},p.onerror=A=>{console.error("WS error:",A),p.close()}}$(),t(!0),Q();const S=window.setInterval(()=>{Q()},wa);return()=>{window.clearInterval(S),g&&window.clearTimeout(g),p&&(p.onclose=null,p.close())}},[r,Q]),c.useEffect(()=>{re()},[re]),c.useEffect(()=>{const h=["overview","map","alerts","networks","analytics","incidents","osint","reco"],p=[];return h.forEach(g=>{const $=document.getElementById(`section-${g}`);if(!$)return;const S=new IntersectionObserver(A=>{A.forEach(R=>{R.isIntersecting&&Ce(g)})},{rootMargin:"-40% 0px -55% 0px",threshold:0});S.observe($),p.push(S)}),()=>p.forEach(g=>g.disconnect())},[s]);const os=c.useMemo(()=>{const h=new Map;return O.forEach(p=>{const g=(p.recommendation||"").trim();g&&h.set(g,(h.get(g)||0)+1)}),[...h.entries()].sort((p,g)=>g[1]-p[1]).slice(0,8)},[O]),cs=(C==null?void 0:C.filters)||{states:[],species:[],crime_types:[],sources:[]},ds=c.useMemo(()=>{var h;return _a([_==null?void 0:_.last_sync_time,b==null?void 0:b.finished_at,(h=b==null?void 0:b.last_search)==null?void 0:h.updated_at,b==null?void 0:b.started_at])},[_==null?void 0:_.last_sync_time,b==null?void 0:b.finished_at,(Me=b==null?void 0:b.last_search)==null?void 0:Me.updated_at,b==null?void 0:b.started_at]),$e=c.useCallback((h,{last:p=!1}={})=>{const g=h||{},$=typeof g.stage=="string"&&g.stage!=="-"?g.stage:"",S=typeof g.provider=="string"&&g.provider!=="-"?g.provider:"",A=typeof g.language=="string"&&g.language!=="-"?g.language:"",R=typeof g.query=="string"&&g.query!=="-"?g.query:"",w=Number.isFinite(Number(g.scanned))?Number(g.scanned):null,E=Number.isFinite(Number(g.kept))?Number(g.kept):null,L=[];$&&L.push(`stage: ${p?`last ${$}`:$}`);const le=[S,A].filter(Boolean).join(" / ");return le&&L.push(`source: ${le}`),R&&L.push(`query: ${R}`),w!==null&&E!==null&&L.push(`scanned ${w}, kept ${E}`),L.join(" • ")},[]),Se=c.useMemo(()=>b!=null&&b.running?$e(b==null?void 0:b.progress,{last:!1}):"",[b,$e]);function Ae(h){if(!r)return;const p=Pe({...J,min_confidence:0,admin_token:r}),g=h==="pdf"?z.exportPdf:h==="excel"?z.exportExcel:h==="excel_incidents_reports"?z.exportExcelIncidentsReports:h==="briefing"?z.exportBriefing:z.exportCsv;window.location.href=p?`${g}?${p}`:g}const hs=c.useCallback(async()=>{if(confirm(`Re-analyze the entire historical database?

This will trigger the AI pipeline in the background to classify WPA 1972 protection schedules, offence categories, and penalty classes for all historical records.`))try{l(!0);const h=await Z(z.adminReanalyze,{});alert(`Historical analysis queued successfully!

Status: ${h.status||"queued"}
Message: ${h.message||"Historical analysis pipeline has been triggered in the background."}`),Q(),re()}catch(h){alert(`Failed to trigger database re-analysis: ${h.message}`)}finally{l(!1)}},[Q,re]),ps=c.useCallback(async(h,p,g)=>{try{l(!0);const $=await is(z.reviewIncident(h),{review_status:p,review_notes:g});ae(S=>S.map(A=>A.id===h?{...A,...$}:A)),U(S=>S&&S.id===h?{...S,...$}:S),alert(`Incident review updated to: ${p.toUpperCase()}`)}catch($){alert(`Failed to submit review: ${$.message}`)}finally{l(!1)}},[]);async function ms(h){h.preventDefault(),d(!0),u("");try{const p=await Z(z.adminLogin,{username:k.username.trim(),password:k.password},{includeAuth:!1}),g=String((p==null?void 0:p.access_token)||"").trim();if(!g){u("Login failed. Missing access token.");return}rs(g),m(g),v({username:"",password:""}),t(!0)}catch(p){Number(p==null?void 0:p.status)===401?u("Invalid username or password."):Number(p==null?void 0:p.status)===429?u("Too many login attempts. Try again in a minute."):u(String((p==null?void 0:p.message)||"Unable to login right now."))}finally{d(!1)}}async function us(){try{await Z(z.adminLogout,{},{includeAuth:!0})}catch{}ie("Signed out.")}function xs(h){Ce(h),xe(!1)}return r?e.jsxs("div",{className:"app",children:[e.jsx(ta,{activeSection:_e,onSelect:xs,isOpen:ze,syncStatus:b,lastSync:ds}),e.jsx("div",{className:`scrim ${ze?"is-visible":""}`,onClick:()=>xe(!1),"aria-hidden":"true"}),e.jsxs("div",{className:"main",children:[e.jsx(aa,{activeSection:_e,busy:o,syncStatus:b,onRefresh:Q,onExport:Ae,onToggleMenu:()=>xe(h=>!h),onLogout:us,onReanalyze:hs}),e.jsxs("div",{className:"content",children:[a?e.jsxs("div",{className:"status error",role:"alert",children:[e.jsx(Ie,{size:16}),e.jsx("span",{children:a})]}):null,b!=null&&b.running?e.jsxs("div",{className:"status info",role:"status",children:[e.jsx(Ve,{size:16}),e.jsxs("span",{children:[b.message||"Search in progress...",Se?` - ${Se}`:""]})]}):null,e.jsxs("section",{className:"dashboard-section",id:"section-overview",children:[e.jsx("div",{className:"section-header",children:e.jsxs("div",{className:"section-header-content",children:[e.jsx("span",{className:"section-number",children:"01"}),e.jsxs("div",{children:[e.jsx("h2",{children:"National Overview"}),e.jsx("p",{children:"Real-time wildlife threat monitoring across India"})]})]})}),e.jsx(ra,{summary:_,loading:s})]}),e.jsxs("section",{className:"dashboard-section",id:"section-map",children:[e.jsx("div",{className:"section-header",children:e.jsxs("div",{className:"section-header-content",children:[e.jsx("span",{className:"section-number",children:"02"}),e.jsxs("div",{children:[e.jsx("h2",{children:"Operations Center"}),e.jsx("p",{children:"Geographic incident mapping"})]})]})}),e.jsx(ma,{mapData:M,onMapError:n})]}),e.jsxs("section",{className:"dashboard-section",id:"section-alerts",children:[e.jsx("div",{className:"section-header",children:e.jsxs("div",{className:"section-header-content",children:[e.jsx("span",{className:"section-number",children:"03"}),e.jsxs("div",{children:[e.jsx("h2",{children:"Live High-Risk Alerts"}),e.jsx("p",{children:"Immediate notifications for critical poaching and trafficking signals"})]})]})}),e.jsx(va,{alerts:D})]}),e.jsxs("section",{className:"dashboard-section",id:"section-networks",children:[e.jsx("div",{className:"section-header",children:e.jsxs("div",{className:"section-header-content",children:[e.jsx("span",{className:"section-number",children:"04"}),e.jsxs("div",{children:[e.jsx("h2",{children:"Network Intelligence"}),e.jsx("p",{children:"Analyzing connections between suspects and organized crime groups"})]})]})}),e.jsx("article",{className:"card network-card",children:e.jsx(ba,{})})]}),e.jsxs("section",{className:"dashboard-section",id:"section-analytics",children:[e.jsx("div",{className:"section-header",children:e.jsxs("div",{className:"section-header-content",children:[e.jsx("span",{className:"section-number",children:"05"}),e.jsxs("div",{children:[e.jsx("h2",{children:"Intelligence Analytics"}),e.jsx("p",{children:"Trends, distributions, and source reliability metrics"})]})]})}),e.jsx(xa,{chartData:C})]}),e.jsxs("section",{className:"dashboard-section",id:"section-incidents",children:[e.jsx("div",{className:"section-header",children:e.jsxs("div",{className:"section-header-content",children:[e.jsx("span",{className:"section-number",children:"06"}),e.jsxs("div",{children:[e.jsx("h2",{children:"Incident Database"}),e.jsx("p",{children:"Search and filter wildlife crime reports"})]})]})}),e.jsx(ya,{}),e.jsx(ga,{filters:J,filterOptions:cs,onChange:de,onApply:()=>re(),onBriefing:()=>Ae("briefing")}),e.jsx(ja,{rows:te,loading:s,onSelectRow:h=>U(h)})]}),e.jsxs("section",{className:"dashboard-section",id:"section-osint",children:[e.jsx("div",{className:"section-header",children:e.jsxs("div",{className:"section-header-content",children:[e.jsx("span",{className:"section-number",children:"07"}),e.jsxs("div",{children:[e.jsx("h2",{children:"Intelligence Feed"}),e.jsx("p",{children:"External sources and strategic recommendations"})]})]})}),e.jsxs("div",{className:"bottom-grid",children:[e.jsx(Na,{items:G}),e.jsx(ka,{items:os})]})]})]})]}),y&&e.jsx("div",{className:"modal-overlay",onClick:()=>U(null),children:e.jsxs("div",{className:"modal-container",onClick:h=>h.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("div",{className:"modal-title-area",children:[e.jsxs("div",{className:"modal-title-pills",children:[e.jsxs("span",{className:`risk-pill ${me(y.risk_score)}`,children:["Risk: ",y.risk_score]}),e.jsx("span",{className:`status-pill ${y.review_status||"pending"}`,children:y.review_status||"pending"})]}),e.jsx("h1",{className:"modal-title",children:y.title})]}),e.jsx("button",{type:"button",className:"modal-close-btn",onClick:()=>U(null),"aria-label":"Close modal",children:e.jsx(ea,{size:20})})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"modal-section-title",children:"General Intelligence"}),e.jsxs("div",{className:"metadata-grid",children:[e.jsxs("div",{className:"metadata-item",children:[e.jsx("span",{className:"metadata-label",children:"Date"}),e.jsx("span",{className:"metadata-value cell-mono",children:ts(y.date)})]}),e.jsxs("div",{className:"metadata-item",children:[e.jsx("span",{className:"metadata-label",children:"Species"}),e.jsx("span",{className:"metadata-value",children:y.species||"—"})]}),e.jsxs("div",{className:"metadata-item",children:[e.jsx("span",{className:"metadata-label",children:"State"}),e.jsx("span",{className:"metadata-value",children:y.state||"—"})]}),e.jsxs("div",{className:"metadata-item",children:[e.jsx("span",{className:"metadata-label",children:"District"}),e.jsx("span",{className:"metadata-value",children:y.district||"—"})]}),e.jsxs("div",{className:"metadata-item",children:[e.jsx("span",{className:"metadata-label",children:"Crime Type"}),e.jsx("span",{className:"metadata-value",children:y.crime_type||"—"})]}),e.jsxs("div",{className:"metadata-item",children:[e.jsx("span",{className:"metadata-label",children:"Involved Persons"}),e.jsx("span",{className:"metadata-value",children:y.involved_persons||"—"})]}),e.jsxs("div",{className:"metadata-item",children:[e.jsx("span",{className:"metadata-label",children:"Source"}),e.jsx("span",{className:"metadata-value",children:y.source||"—"})]}),e.jsxs("div",{className:"metadata-item",children:[e.jsx("span",{className:"metadata-label",children:"AI Confidence"}),e.jsx("span",{className:"metadata-value cell-mono",children:Number(y.confidence||0).toFixed(2)})]})]})]}),y.summary&&e.jsxs("div",{children:[e.jsx("h3",{className:"modal-section-title",children:"Incident Summary"}),e.jsx("div",{className:"description-box",children:y.summary})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"modal-section-title",children:"Wildlife Protection Act (WPA) 1972 Classification"}),e.jsxs("div",{className:"classification-grid",children:[e.jsxs("div",{className:"classification-card",children:[e.jsx("span",{className:"label",children:"WPA Schedule"}),e.jsx("span",{className:"value",children:y.wpa_schedule||"Not Classified"})]}),e.jsxs("div",{className:"classification-card",children:[e.jsx("span",{className:"label",children:"WPA Section"}),e.jsx("span",{className:"value",children:y.wpa_section||"Not Classified"})]}),e.jsxs("div",{className:"classification-card",children:[e.jsx("span",{className:"label",children:"Offence Type"}),e.jsx("span",{className:"value",children:y.wpa_offence_type||"Not Classified"})]}),e.jsxs("div",{className:"classification-card",children:[e.jsx("span",{className:"label",children:"Penalty Class"}),e.jsx("span",{className:"value",children:y.wpa_penalty_class||"Not Classified"})]}),e.jsxs("div",{className:"classification-card",children:[e.jsx("span",{className:"label",children:"Protected Area Type"}),e.jsx("span",{className:"value",children:y.protected_area_type||"None / Not Applicable"})]}),e.jsxs("div",{className:"classification-card",children:[e.jsx("span",{className:"label",children:"Enforcement Authority"}),e.jsx("span",{className:"value",children:y.enforcement_authority||"Local Police / Forest Dept."})]})]})]}),e.jsxs("div",{className:"review-section",children:[e.jsx("h3",{className:"modal-section-title",style:{margin:0,border:"none",padding:0},children:"Manual Checking & Verification"}),e.jsxs("div",{className:"review-status-selector",children:[e.jsx("button",{type:"button",className:`review-status-btn pending ${K==="pending"?"active":""}`,onClick:()=>F("pending"),children:"Pending"}),e.jsx("button",{type:"button",className:`review-status-btn approved ${K==="approved"?"active":""}`,onClick:()=>F("approved"),children:"Approve"}),e.jsx("button",{type:"button",className:`review-status-btn rejected ${K==="rejected"?"active":""}`,onClick:()=>F("rejected"),children:"Reject"})]}),e.jsx("textarea",{className:"review-notes-input",placeholder:"Add manual checking notes, comments, or corrections...",value:V,onChange:h=>P(h.target.value)})]})]}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("button",{type:"button",className:"btn btn-ghost",onClick:()=>U(null),children:"Cancel"}),e.jsxs("a",{href:ee(y.open_url,y.url),target:"_blank",rel:"noopener noreferrer",className:"btn",style:{marginRight:"auto"},children:["Open Article ",e.jsx(ce,{size:14,style:{marginLeft:"4px"}})]}),e.jsx("button",{type:"button",className:"btn btn-primary",onClick:()=>ps(y.id,K,V),disabled:o,children:o?"Saving...":"Save Review"})]})]})})]}):e.jsx("div",{className:"auth-shell",children:e.jsxs("article",{className:"card auth-card",children:[e.jsx("div",{className:"card-head",children:e.jsxs("div",{className:"card-head-left",children:[e.jsx(es,{size:16,className:"card-head-icon"}),e.jsx("h2",{children:"Authorized Access"})]})}),e.jsxs("div",{className:"card-body auth-card-body",children:[e.jsxs("div",{className:"auth-brand",children:[e.jsx("h1",{children:"Wildlife Crime Intelligence Center"}),e.jsx("p",{children:"Sign in with authorized credentials to continue."})]}),e.jsxs("form",{className:"auth-form",onSubmit:ms,children:[e.jsxs("label",{className:"auth-field",children:[e.jsx("span",{children:"Username"}),e.jsx("input",{value:k.username,onChange:h=>v(p=>({...p,username:h.target.value})),autoComplete:"username",required:!0})]}),e.jsxs("label",{className:"auth-field",children:[e.jsx("span",{children:"Password"}),e.jsx("input",{type:"password",value:k.password,onChange:h=>v(p=>({...p,password:h.target.value})),autoComplete:"current-password",required:!0})]}),i?e.jsxs("div",{className:"status error auth-status",role:"alert",children:[e.jsx(Ie,{size:16}),e.jsx("span",{children:i})]}):null,e.jsxs("button",{className:"btn btn-primary auth-submit",type:"submit",disabled:j,children:[e.jsx(ut,{size:14}),j?"Signing in...":"Sign in"]})]})]})]})})}class $a extends $s.Component{constructor(t){super(t),this.state={hasError:!1,message:"",redirecting:!1}}static getDerivedStateFromError(t){return{hasError:!0,message:t instanceof Error?t.message:"Unknown runtime error"}}componentDidCatch(t){console.error("Dashboard runtime error:",t);const a=t instanceof Error?t.message:"";typeof window<"u"&&/WebSocket/i.test(a)&&/insecure/i.test(a)&&(this.setState({redirecting:!0}),window.setTimeout(()=>{window.location.replace("/legacy?legacy=1")},1500))}render(){return this.state.hasError?e.jsxs("div",{style:{padding:"24px",color:"#e8edff",fontFamily:"Inter, sans-serif"},children:[e.jsx("h2",{style:{marginTop:0},children:"Dashboard failed to load"}),e.jsx("p",{style:{opacity:.9},children:this.state.message||"Unexpected client error."}),e.jsx("p",{style:{opacity:.8},children:this.state.redirecting?"Redirecting to the legacy dashboard...":e.jsxs(e.Fragment,{children:["Open ",e.jsx("a",{href:"/legacy?legacy=1",style:{color:"#9ec2ff"},children:"legacy dashboard"})," while this is being fixed."]})})]}):this.props.children}}const je=document.getElementById("root");if(je){window.addEventListener("error",s=>{console.error("Window error:",s.error||s.message)}),window.addEventListener("unhandledrejection",s=>{console.error("Unhandled promise rejection:",s.reason)});try{window.__WILDLIFE_DASHBOARD_BOOTED__=!0,We(je).render(e.jsx($a,{children:e.jsx(Ca,{})}))}catch(s){console.error("Fatal dashboard bootstrap error:",s),je.innerHTML=`
      <div style="padding:24px;color:#e8edff;font-family:Inter,sans-serif">
        <h2 style="margin-top:0">Dashboard failed to initialize</h2>
        <p>${s instanceof Error?s.message:"Unknown bootstrap error"}</p>
        <p><a href="/legacy?legacy=1" style="color:#9ec2ff">Open legacy dashboard</a></p>
      </div>
    `}}
