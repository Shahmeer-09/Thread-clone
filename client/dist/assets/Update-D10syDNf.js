import{d as _,f as k,j as e,h as A,r as x,V as E,v as I,q as B,F as N,l as R,m as l,B as g,I as n,n as z}from"./index-BaGnycZU.js";import{S as f}from"./chunk-ZHMYA64R-DIeFXQI-.js";import{H,F as o}from"./chunk-7OLJDQMT-CPi3j6qS.js";import{A as P}from"./chunk-V7PAE35Z-BZKDwIF4.js";var j=_("div",{baseStyle:{display:"flex",alignItems:"center",justifyContent:"center"}});j.displayName="Center";var V={horizontal:{insetStart:"50%",transform:"translateX(-50%)"},vertical:{top:"50%",transform:"translateY(-50%)"},both:{insetStart:"50%",top:"50%",transform:"translate(-50%, -50%)"}};k(function(c,h){const{axis:d="both",...r}=c;return e.jsx(_.div,{ref:h,__css:V[d],...r,position:"absolute"})});function M(){const i=A(),c=x.useRef(null),{handleprev:h,imageurl:d}=E(),[r,F]=I(B),[b,u]=x.useState(!1),[a,p]=x.useState({name:r.name,username:r.username,email:r.email,bio:r.bio}),U=async s=>{var y,v,w,C,S;if(s.preventDefault(),!b)try{u(!0);const t=await z.put(`/user/update/${r._id}`,{...a,profilepic:d||""}),m=(y=t.data)==null?void 0:y.data;i({title:"updated!.",description:"updated successfully",status:"success",duration:2e3,isClosable:!0}),((v=t.data)==null?void 0:v.success)==!1&&(i({title:"Error!.",description:(w=t.data)==null?void 0:w.message,status:"error",duration:2e3,isClosable:!0}),u(!1)),localStorage.setItem("user-info",JSON.stringify(m)),console.log(m),F(m),u(!1)}catch(t){console.log(t),i({title:"Error!.",description:((S=(C=t.response)==null?void 0:C.data)==null?void 0:S.message)||t.message,status:"error",duration:2e3,isClosable:!0}),u(!1);return}};return e.jsx("form",{onSubmit:U,children:e.jsx(N,{align:"center",justify:"center",children:e.jsxs(f,{spacing:4,w:"full",maxW:"md",bg:R("white","gray.dark"),rounded:"xl",boxShadow:"lg",p:6,my:6,children:[e.jsx(H,{lineHeight:1.1,fontSize:{base:"2xl",sm:"3xl"},children:"User Profile update"}),e.jsxs(l,{id:"userName",children:[e.jsx(o,{children:"User avatar"}),e.jsxs(f,{direction:["column","row"],spacing:6,children:[e.jsx(j,{children:e.jsx(P,{size:"xl",src:d||r.profilepic})}),e.jsxs(j,{w:"full",children:[e.jsx(g,{w:"full",onClick:()=>c.current.click(),children:"Change Avatat"}),e.jsx("input",{type:"file",hidden:!0,ref:c,onChange:h})]})]})]}),e.jsxs(l,{children:[e.jsx(o,{children:"Full name"}),e.jsx(n,{value:a.name,onChange:s=>p({...a,name:s.target.value}),placeholder:"Full name",_placeholder:{color:"gray.500"},type:"text"})]}),e.jsxs(l,{children:[e.jsx(o,{children:"User name"}),e.jsx(n,{value:a.username,onChange:s=>p({...a,username:s.target.value}),placeholder:"UserName",_placeholder:{color:"gray.500"},type:"text"})]}),e.jsxs(l,{children:[e.jsx(o,{children:"Password"}),e.jsx(n,{placeholder:"password",_placeholder:{color:"gray.500"},type:"password"})]}),e.jsxs(l,{children:[e.jsx(o,{children:"Email address"}),e.jsx(n,{value:a.email,onChange:s=>p({...a,email:s.target.value}),placeholder:"your-email@example.com",_placeholder:{color:"gray.500"},type:"email"})]}),e.jsxs(l,{children:[e.jsx(o,{children:"Bio"}),e.jsx(n,{value:a.bio,onChange:s=>p({...a,bio:s.target.value}),placeholder:"Bio",_placeholder:{color:"gray.500"},type:"text"})]}),e.jsxs(f,{spacing:6,direction:["column","row"],children:[e.jsx(g,{bg:"green.400",color:"white",w:"full",_hover:{bg:"green.500"},children:"Cancel"}),e.jsx(g,{bg:"blue.400",color:"white",w:"full",_hover:{bg:"blue.500"},type:"submit",children:b?"updating...":"Update"})]})]})})})}export{M as default};