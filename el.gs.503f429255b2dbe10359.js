(window.webpackJsonp=window.webpackJsonp||[]).push([["el.gs",4],{483:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),o=a(192),r=a(17),l=a(473),s=a(503),u=a(501),m=a(464),d=a(463),i=a(471),p=a(470),b=a(502),g=a(467),j=a(468),O=a(474),k=a(472),h=a(469),w=a(484),f=a.n(w);const P=["rgba(255, 0, 0, 0.25)","rgba(0, 128, 255, 0.25)"];function E(e){return{currentPotNum:0,selectedTeam:null,pickedGroup:null,hungPot:e[0]}}t.default=Object(n.memo)(({season:e,pots:t})=>{const[a,w]=Object(m.a)("draw-"),T=Object(n.useMemo)(()=>t.map(e=>o(e)),[t,a]),G=Object(n.useMemo)(()=>t[0].map(()=>[]),[t,a]),N=Object(n.useMemo)(()=>E(T),[T]),[{currentPotNum:y,selectedTeam:C,pickedGroup:x,hungPot:v},M]=Object(n.useState)(N),[,$]=Object(r.a)(),J=Object(u.a)(f.a),[S,A]=Object(l.a)(),[I,W]=Object(s.a)(3e3),q=Object(n.useCallback)(async t=>(await J({season:e,pots:T,groups:G,selectedTeam:t})).pickedGroup,[T,G,e,J]),z=Object(n.useCallback)(async e=>{const t=T[y];M({currentPotNum:y,hungPot:t.slice(),selectedTeam:t.splice(e,1)[0],pickedGroup:null})},[T,y]);Object(n.useEffect)(()=>{C&&(async()=>{if(!C)throw new Error("no selected team");let e;W.set(C);try{e=await q(C)}catch(e){return console.error(e),void $({error:"Could not determine the group"})}G[e].push(C);const t=T[y].length>0?y:y+1;A.add(C),W.reset(),M({selectedTeam:null,pickedGroup:e,hungPot:T[t],currentPotNum:t})})()},[C]);const B=Object(n.useCallback)(()=>{w(),M(E(t))},[t]),D=y>=T.length;return c.a.createElement(h.a,null,c.a.createElement(g.a,null,c.a.createElement(p.a,{selectedTeams:C&&[C],initialPots:t,pots:T,currentPotNum:y}),c.a.createElement(b.a,{maxTeams:T.length,currentPotNum:y,groups:G,possibleGroups:null,airborneTeams:S,groupColors:P})),c.a.createElement(j.a,null,c.a.createElement(O.a,{forceNoSelect:!!C,display:!D,selectedTeam:C,pot:v,onPick:z}),c.a.createElement(k.a,{long:!0,calculating:I,completed:D,selectedTeam:C,pickedGroup:x,possibleGroups:null,numGroups:G.length,reset:B})),S.map(e=>{const t=G.findIndex(t=>t.includes(e)),a=Object(d.a)(t),n=G[t].indexOf(e);return c.a.createElement(i.a,{key:e.id,from:`[data-cellid='${e.id}']`,to:`[data-cellid='${a}${n}']`,duration:350,data:e,onAnimationEnd:A.remove})}))})},484:function(e,t,a){e.exports=function(){return new Worker(a.p+"e604e7e45532689c0692.worker.js")}}}]);