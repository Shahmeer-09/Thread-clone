import{h as W,s as Z,q as I,r as j,v as O,w as T,$,j as e,F as C,T as w,a0 as z,a1 as G,a2 as H,a3 as q,a4 as N,a5 as U,m as Y,I as J,a6 as K,B as P,n as R}from"./index-BaGnycZU.js";import{B as Q}from"./chunk-PULVB27S-Ctr0RtIK.js";const re=({feed:r})=>{var b,_,S;const u=W(),o=Z(I),[h,B]=j.useState((b=r.likes)==null?void 0:b.includes(o==null?void 0:o._id)),[m,k]=O(T),[M,x]=j.useState(!1),[L,p]=j.useState(!1),[y,E]=j.useState(""),{isOpen:A,onOpen:D,onClose:v}=$(),F=async l=>{var i,n,c,d;if(l.preventDefault(),!M)try{x(!0);const a=await R.post(`/post/like/${r._id}`);if(console.log(a.data.data),((i=a.data)==null?void 0:i.success)===!1&&(u({title:"Error",description:(n=a.data)==null?void 0:n.message,status:"error",duration:3e3,isClosable:!0}),x(!1)),h){const s=m.map(t=>t._id===r._id?{...t,likes:t.likes.filter(f=>f!==o._id)}:t);k(s)}else{const s=m.map(t=>t._id===r._id?{...t,likes:[o._id,...t.likes]}:t);k(s)}B(!h),x(!1)}catch(a){u({title:"Error",description:a.message||((d=(c=a.response)==null?void 0:c.data)==null?void 0:d.message),status:"error",duration:3e3,isClosable:!0}),x(!1)}},V=async l=>{var i,n,c,d,a;l.preventDefault();try{p(!0);const s=await R.post(`/post/reply/${r._id}`,{text:y}),t=(i=s.data)==null?void 0:i.data;console.log(t),((n=s==null?void 0:s.data)==null?void 0:n.success)===!1&&(u({title:"Error",description:(c=s.data)==null?void 0:c.message,status:"error",duration:3e3,isClosable:!0}),p(!1));const f=m.map(g=>g._id===r._id?{...g,replies:[t,...g.replies]}:g);k(f),p(!1),v()}catch(s){u({title:"Error",description:s.message||((a=(d=s.response)==null?void 0:d.data)==null?void 0:a.message),status:"error",duration:3e3,isClosable:!0}),p(!1)}};return e.jsxs(C,{flexDirection:"column",children:[e.jsxs(C,{gap:3,my:2,onClick:l=>l.preventDefault(),children:[e.jsx("svg",{"aria-label":"Like",color:h?"rgb(237, 73, 86)":"",fill:h?"rgb(237, 73, 86)":"transparent",height:"19",role:"img",viewBox:"0 0 24 22",width:"20",onClick:F,children:e.jsx("path",{d:"M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z",stroke:"currentColor",strokeWidth:"2"})}),e.jsxs("svg",{"aria-label":"Comment",color:"",fill:"",height:"20",role:"img",viewBox:"0 0 24 24",width:"20",onClick:D,children:[e.jsx("title",{children:"Comment"}),e.jsx("path",{d:"M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z",fill:"none",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"2"})]}),e.jsx(X,{}),e.jsx(ee,{})]}),e.jsxs(C,{gap:2,alignItems:"center",children:[e.jsxs(w,{color:"gray.light",fontSize:"sm",children:[(_=r==null?void 0:r.likes)==null?void 0:_.length," likes"]}),e.jsx(Q,{w:.5,h:.5,borderRadius:"full",bg:"gray.dark"}),e.jsxs(w,{color:"gray.light",fontSize:"sm",children:[(S=r.replies)==null?void 0:S.length," replies"]})]}),e.jsxs(z,{isOpen:A,onClose:v,children:[e.jsx(G,{}),e.jsxs(H,{children:[e.jsx(q,{}),e.jsx(N,{}),e.jsx(U,{pb:6,children:e.jsx(Y,{children:e.jsx(J,{placeholder:"Enter Your Reply ",value:y,onChange:l=>E(l.target.value)})})}),e.jsx(K,{children:e.jsx(P,{colorScheme:"blue",mr:3,onClick:V,disabled:L,children:"Reply"})})]})]})]})},X=()=>e.jsxs("svg",{"aria-label":"Repost",color:"currentColor",fill:"currentColor",height:"20",role:"img",viewBox:"0 0 24 24",width:"20",children:[e.jsx("title",{children:"Repost"}),e.jsx("path",{fill:"",d:"M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1Zm-6.41-3.496-1.795 1.795a1 1 0 1 0 1.414 1.414l3.5-3.5a1.003 1.003 0 0 0 0-1.417l-3.5-3.5a1 1 0 0 0-1.414 1.414l1.794 1.794H8.27A5.277 5.277 0 0 0 3 9.271V13.5a1 1 0 0 0 2 0V9.271a3.275 3.275 0 0 1 3.271-3.27Z"})]}),ee=()=>e.jsxs("svg",{"aria-label":"Share",color:"",fill:"rgb(243, 245, 247)",height:"20",role:"img",viewBox:"0 0 24 24",width:"20",children:[e.jsx("title",{children:"Share"}),e.jsx("line",{fill:"none",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"2",x1:"22",x2:"9.218",y1:"3",y2:"10.083"}),e.jsx("polygon",{fill:"none",points:"11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334",stroke:"currentColor",strokeLinejoin:"round",strokeWidth:"2"})]});export{re as A};
