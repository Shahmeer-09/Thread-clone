import{f as S,e as W,o as A,j as e,d as P,a as D,F as l,T as g,v as E,w as F,s as R,q as B,h as T,p as I,x as k,r as G,L,y as v,z as N,B as $,n as _}from"./index-BaGnycZU.js";import{g as q}from"./getUserbyname-C-LeqiZc.js";import{A as z}from"./chunk-V7PAE35Z-BZKDwIF4.js";import{A as U}from"./Action-Bea6qZMP.js";import{B as H}from"./chunk-PULVB27S-Ctr0RtIK.js";var j=S(function(d,o){const{borderLeftWidth:b,borderBottomWidth:u,borderTopWidth:c,borderRightWidth:p,borderWidth:x,borderStyle:y,borderColor:r,...f}=W("Divider",d),{className:n,orientation:a="horizontal",__css:m,...h}=A(d),s={vertical:{borderLeftWidth:b||p||x||"1px",height:"100%"},horizontal:{borderBottomWidth:u||c||x||"1px",width:"100%"}};return e.jsx(P.hr,{ref:o,"aria-orientation":a,...h,__css:{...f,border:"0",borderColor:r,borderStyle:y,...s[a],...m},className:D("chakra-divider",n)})});j.displayName="Divider";const J=({reply:t,lastReply:d})=>e.jsxs(e.Fragment,{children:[e.jsxs(l,{py:2,my:2,gap:4,w:"full",children:[e.jsx(z,{name:"avatar",src:t.userProfilePic,size:"md"}),e.jsxs(l,{w:"full",gap:1,flexDirection:"column",children:[e.jsx(l,{w:"full",alignItems:"center",justifyContent:"space-between",children:e.jsx(g,{fontSize:"sm",fontWeight:"bold",children:t.username})}),e.jsx(g,{fontSize:"sm",children:t.text})]})]}),d?null:e.jsx(j,{})]}),X=()=>{var f;const{user:t,loading:d}=q(),[o,b]=E(F),u=R(B),c=T(),p=I(),{pid:x}=k();G.useEffect(()=>{(async()=>{var a,m,h,s,w;try{const i=await _.get(`/post/getpost/${x}`),C=(a=i==null?void 0:i.data)==null?void 0:a.data;((m=i.data)==null?void 0:m.success)===!1&&c({title:"Error!.",description:(h=i.data)==null?void 0:h.message,status:"error",duration:2e3,isClosable:!0}),b([C])}catch(i){c({title:"Error!.",description:((w=(s=i.response)==null?void 0:s.data)==null?void 0:w.message)||(i==null?void 0:i.message),status:"error",duration:2e3,isClosable:!0})}})()},[x]),console.log(o);const y=async()=>{var n,a,m,h;try{if(!window.confirm(" Do you realy want to delete?  "))return;const s=await _.delete(`/post/deletePost/${o==null?void 0:o._id}`);s.data.success==!1&&(c({title:"Error!.",description:(n=s.data)==null?void 0:n.message,status:"error",duration:2e3,isClosable:!0}),p(`/${t.username}`)),c({title:"success!.",description:(a=s.data)==null?void 0:a.message,status:"success",duration:2e3,isClosable:!0}),p(`/${t.username}`)}catch(s){c({title:"Error!.",description:((h=(m=s.response)==null?void 0:m.data)==null?void 0:h.message)||(s==null?void 0:s.message),status:"error",duration:2e3,isClosable:!0})}};console.log(o[0]);const r=o[0];if(r)return console.log(r.replies),e.jsxs(e.Fragment,{children:[d&&!t&&e.jsx(L,{}),!d&&t&&o&&e.jsxs(e.Fragment,{children:[e.jsxs(l,{children:[e.jsxs(l,{w:"full",alignItems:"center",gap:3,children:[e.jsx(z,{size:"md",name:"shahmeer",src:t.porfilepublic}),e.jsx(g,{fontSize:"sm",fontWeight:"bold",children:t.username}),e.jsx(v,{src:"/verified.png",w:4,h:4,ml:1})]}),e.jsx(l,{gap:4,alignItems:"center",children:e.jsx(g,{fontSize:"xs",width:36,textAlign:"right",color:"gray.light"})}),(u==null?void 0:u._id)===t._id&&e.jsx(N,{cursor:"pointer",fontSize:"16px",onClick:y})]}),e.jsx(g,{fontSize:"sm",my:3,children:r.text}),e.jsx(H,{borderRadius:6,overflow:"hidden",border:"1px solid",borderColor:"gray.light",children:e.jsx(v,{src:r.img,w:"full"})}),e.jsx(l,{gap:3,my:1,children:e.jsx(U,{feed:r})}),e.jsx(j,{my:2}),e.jsxs(l,{gap:3,justify:"space-between",children:[e.jsxs(l,{alignItems:"center",gap:2,children:[e.jsx(g,{color:"gray.light",children:" 👏 "}),e.jsxs(g,{color:"gray.light",children:[" ","Get the app to like post and share"]})]}),e.jsx($,{children:"Get"})]}),e.jsx(j,{my:2}),(f=r==null?void 0:r.replies)==null?void 0:f.map(n=>{var a;return e.jsx(J,{reply:n,lastReply:n._id===r.replies[((a=r.replies)==null?void 0:a.length)-1]._id},n._id)})]})]})};export{X as default};