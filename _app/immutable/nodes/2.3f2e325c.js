import{S as fe,i as he,s as de,a as N,k as b,q as S,c as T,l as v,m as C,r as M,h as g,n as d,b as K,G as c,J as te,K as j,L as pe,u as Z,H as se,M as _e,o as me,N as ye,O as ge,P as le,w as oe}from"../chunks/index.53f96013.js";const{document:ke}=ye;function ne(t,o,e){const s=t.slice();return s[32]=o[e],s[34]=e,s}function ie(t){let o,e=t[3],s=[];for(let n=0;n<e.length;n+=1)s[n]=ae(ne(t,e,n));return{c(){o=b("ul");for(let n=0;n<s.length;n+=1)s[n].c();this.h()},l(n){o=v(n,"UL",{id:!0,class:!0});var u=C(o);for(let i=0;i<s.length;i+=1)s[i].l(u);u.forEach(g),this.h()},h(){d(o,"id","autocomplete-items-list"),d(o,"class","svelte-1t68oyf")},m(n,u){K(n,o,u);for(let i=0;i<s.length;i+=1)s[i]&&s[i].m(o,null);t[26](o)},p(n,u){if(u[0]&20552){e=n[3];let i;for(i=0;i<e.length;i+=1){const w=ne(n,e,i);s[i]?s[i].p(w,u):(s[i]=ae(w),s[i].c(),s[i].m(o,null))}for(;i<s.length;i+=1)s[i].d(1);s.length=e.length}},d(n){n&&g(o),ge(s,n),t[26](null)}}}function ae(t){let o,e=t[14](t[32])+"",s,n,u,i;function w(){return t[25](t[32])}return{c(){o=b("li"),s=S(e),n=N(),this.h()},l(p){o=v(p,"LI",{class:!0});var _=C(o);s=M(_,e),_.forEach(g),n=T(p),this.h()},h(){d(o,"class","autocomplete-items svelte-1t68oyf"),le(o,"selected",t[34]===t[6])},m(p,_){K(p,o,_),c(o,s),K(p,n,_),u||(i=j(o,"click",w),u=!0)},p(p,_){t=p,_[0]&8&&e!==(e=t[14](t[32])+"")&&Z(s,e),_[0]&64&&le(o,"selected",t[34]===t[6])},d(p){p&&g(o),p&&g(n),u=!1,i()}}}function re(t){let o,e,s;return{c(){o=b("div"),e=b("span"),s=S(t[5]),this.h()},l(n){o=v(n,"DIV",{class:!0});var u=C(o);e=v(u,"SPAN",{class:!0});var i=C(e);s=M(i,t[5]),i.forEach(g),u.forEach(g),this.h()},h(){d(e,"class","svelte-1t68oyf"),d(o,"class","svelte-1t68oyf")},m(n,u){K(n,o,u),c(o,e),c(e,s)},p(n,u){u[0]&32&&Z(s,n[5])},d(n){n&&g(o)}}}function be(t){let o,e,s,n,u,i,w,p,_,E,O,D,G,k,A,a,W,R,P,z,U=t[14](t[4])+"",I,J,L,Q,V,X,Y,$,m=t[10]&&ie(t),y=t[5]&&re(t);return{c(){o=N(),e=b("div"),s=b("h1"),n=S("Welcome to raincheck"),u=N(),i=b("p"),w=S("number of cities: "),p=S(t[11]),_=N(),E=b("p"),O=S("number of filtered cities: "),D=S(t[9]),G=N(),k=b("form"),A=b("div"),a=b("input"),W=N(),m&&m.c(),R=N(),P=b("p"),z=S("User chose: "),I=S(U),J=N(),L=b("button"),Q=S("test"),X=N(),y&&y.c(),this.h()},l(f){o=T(f),e=v(f,"DIV",{class:!0});var r=C(e);s=v(r,"H1",{class:!0});var x=C(s);n=M(x,"Welcome to raincheck"),x.forEach(g),u=T(r),i=v(r,"P",{class:!0});var l=C(i);w=M(l,"number of cities: "),p=M(l,t[11]),l.forEach(g),_=T(r),E=v(r,"P",{class:!0});var h=C(E);O=M(h,"number of filtered cities: "),D=M(h,t[9]),h.forEach(g),G=T(r),k=v(r,"FORM",{id:!0,class:!0});var B=C(k);A=v(B,"DIV",{class:!0});var H=C(A);a=v(H,"INPUT",{autocomplete:!0,placeholder:!0,id:!0,type:!0,class:!0}),H.forEach(g),W=T(B),m&&m.l(B),B.forEach(g),R=T(r),P=v(r,"P",{id:!0,class:!0});var F=C(P);z=M(F,"User chose: "),I=M(F,U),F.forEach(g),J=T(r),L=v(r,"BUTTON",{class:!0});var q=C(L);Q=M(q,"test"),q.forEach(g),X=T(r),y&&y.l(r),r.forEach(g),this.h()},h(){d(s,"class","svelte-1t68oyf"),d(i,"class","svelte-1t68oyf"),d(E,"class","svelte-1t68oyf"),d(a,"autocomplete","off"),d(a,"placeholder","Search City"),d(a,"id","city-select"),d(a,"type","text"),d(a,"class","svelte-1t68oyf"),d(A,"class","autocomplete svelte-1t68oyf"),d(k,"id","autocomplete-form"),d(k,"class","svelte-1t68oyf"),d(P,"id","user-chose"),d(P,"class","svelte-1t68oyf"),L.disabled=V=!t[4],d(L,"class","svelte-1t68oyf"),d(e,"class","main svelte-1t68oyf")},m(f,r){K(f,o,r),K(f,e,r),c(e,s),c(s,n),c(e,u),c(e,i),c(i,w),c(i,p),c(e,_),c(e,E),c(E,O),c(E,D),c(e,G),c(e,k),c(k,A),c(A,a),te(a,t[0]),c(k,W),m&&m.m(k,null),t[27](k),c(e,R),c(e,P),c(P,z),c(P,I),c(e,J),c(e,L),c(L,Q),c(e,X),y&&y.m(e,null),Y||($=[j(ke,"click",t[16]),j(a,"keydown",t[17]),j(a,"focus",t[13]),j(a,"change",t[23]),j(a,"input",t[24]),j(k,"submit",pe(t[18])),j(L,"click",t[15])],Y=!0)},p(f,r){r[0]&2048&&Z(p,f[11]),r[0]&512&&Z(D,f[9]),r[0]&1&&a.value!==f[0]&&te(a,f[0]),f[10]?m?m.p(f,r):(m=ie(f),m.c(),m.m(k,null)):m&&(m.d(1),m=null),r[0]&16&&U!==(U=f[14](f[4])+"")&&Z(I,U),r[0]&16&&V!==(V=!f[4])&&(L.disabled=V),f[5]?y?y.p(f,r):(y=re(f),y.c(),y.m(e,null)):y&&(y.d(1),y=null)},i:se,o:se,d(f){f&&g(o),f&&g(e),m&&m.d(),t[27](null),y&&y.d(),Y=!1,_e($)}}}const ee=10,ve=61;async function Ee(){return(await(await fetch("./worldcities.json")).json()).sort((e,s)=>e.city_ascii<s.city_ascii?-1:e.city_ascii>s.city_ascii?1:0)}function Ce(t){const o=t.toUpperCase().split("").map(e=>127397+e.charCodeAt(0));return String.fromCodePoint(...o)}function we(t,o,e){let s,n,u,i,w,p=!1,_="",E=[],O=!1,D,G=0,k=ee,A="",a=-1;me(async()=>{e(20,E=await Ee()),e(19,p=!0)});const W=l=>{e(4,D=l),e(0,_=l.city_ascii),R()},R=()=>{var l,h;e(6,a=-1),e(21,O=!1),(l=document.getElementById("city-select"))==null||l.blur(),(h=document.getElementById("user-chose"))==null||h.focus()},P=()=>{e(21,O=!0)},z=l=>l?`${Ce(l.iso2)} ${l.city}, ${l.admin_name}`:"NOTHING";let U,I;const J=async l=>{const h=l.lat,B=l.lng,H=`https://api.open-meteo.com/v1/forecast?latitude=${h}&longitude=${B}&daily=precipitation_sum&timezone=GMT&past_days=${ve}&forecast_days=1`,q=await(await fetch(H,{cache:"default"})).json();console.log(q);const ce=q.daily.time.map(ue=>new Date(ue));return{values:q.daily.precipitation_sum,dates:ce}},L=l=>{for(let h=l.values.length-1;h>0;h--)if(l.values[h]>0)return l.dates[h];return null},Q=(l,h)=>{if(!l)return"It hasn't rained for more than 2 months...";const H=new Date().valueOf()-l.valueOf();console.log(H),console.log("latest:",l);const F=Math.floor(H/1e3/60/60/24);return F===0?`Looks like ${h} got rain today! 🥳`:F===1?`Looks like it has rained yesterday in ${h}! 🌳`:F<7?`Looks like ${h} has got some rain in the past week! 🍃`:`Looks like it has been ${F} days since the last rain in ${h} 🥵`},V=async()=>{const l=await J(D),h=L(l);e(5,A=Q(h,D.city)),console.log(A)},X=l=>{((I==null?void 0:I.contains(l.target))??!1)||e(21,O=!1)},Y=l=>{if(l.key==="Escape")R();else if(l.key==="ArrowDown"){const h=Math.min(ee,i);e(6,a+=1),e(6,a=a>=h?h-1:a)}else l.key==="ArrowUp"?(e(6,a-=1),e(6,a=a<-1?-1:a)):l.key==="Enter"&&(e(6,a=0),W(n[a]))},$=()=>{console.log("submitted city:",D)},m=()=>{e(1,G=0),e(2,k=ee)};function y(){_=this.value,e(0,_)}const f=l=>W(l);function r(l){oe[l?"unshift":"push"](()=>{U=l,e(7,U)})}function x(l){oe[l?"unshift":"push"](()=>{I=l,e(8,I)})}return t.$$.update=()=>{t.$$.dirty[0]&1048577&&e(22,s=E.filter(l=>l.city_ascii.toLowerCase().startsWith(_.toLowerCase()))),t.$$.dirty[0]&4194310&&e(3,n=s.slice(G,k)),t.$$.dirty[0]&1048576&&e(11,u=E.length),t.$$.dirty[0]&4194304&&e(9,i=s.length),t.$$.dirty[0]&2621448&&e(10,w=p&&n.length>0&&O)},[_,G,k,n,D,A,a,U,I,i,w,u,W,P,z,V,X,Y,$,p,E,O,s,m,y,f,r,x]}class Le extends fe{constructor(o){super(),he(this,o,we,be,de,{},null,[-1,-1])}}export{Le as component};