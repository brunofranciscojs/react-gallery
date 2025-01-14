import{r as s,j as e}from"./react-b7d2ab0c.js";import{c as H}from"./react-dom-7bb7604b.js";import{s as $,t as J,u as q,v as G,w as K,x as j,y as Z,z as P,A as W,B as X}from"./@firebase-62d1d465.js";import{C as Y}from"./compressorjs-dec42b9c.js";import{g as Q}from"./firebase-36cfa548.js";import{I as ee}from"./react-image-zooom-c37f69f0.js";import"./scheduler-765c72db.js";import"./idb-81bdbf9b.js";import"./tslib-6635c9de.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))u(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&u(r)}).observe(document,{childList:!0,subtree:!0});function l(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function u(t){if(t.ep)return;t.ep=!0;const a=l(t);fetch(t.href,a)}})();const te={apiKey:"AIzaSyCymqW4p240cXYriVYKTs4isL5L88hFjTg",authDomain:"ilutras.firebaseapp.com",projectId:"ilutras",storageBucket:"ilutras.appspot.com",messagingSenderId:"986891199172",appId:"1:986891199172:web:aec4b1b63856986e565f91",measurementId:"G-DHPPF9BC8G"},D=$(te),se=J(D),N=q(D);Q(D);const T=s.createContext({}),ae=({children:i})=>{const[n,l]=s.useState(),[u,t]=s.useState([]),[a,r]=s.useState(()=>{const g=localStorage.getItem("logado");return g?JSON.parse(g):""});s.useEffect(()=>{(async()=>{const h=G(se,"configuracao","login"),c=await K(h);if(c.exists()){const f=c.data();f.credenciais&&t(f.credenciais)}})()},[]),s.useEffect(()=>{var c;const g=localStorage.getItem("token"),h=localStorage.getItem("bancoDados");if(g&&h){const f=(c=JSON.parse(h))==null?void 0:c.filter(b=>b.usuario===JSON.parse(g).usuario);f&&l(f[0])}},[]);const x=(g,h)=>{const c=u,f=c==null?void 0:c.filter(b=>b.usuario===g);if(f!=null&&f.length)if(f[0].usuario===g&&f[0].senha===h){const b=Math.random().toString(36).substring(2);localStorage.setItem("token",JSON.stringify({usuario:g,token:b})),l({usuario:g,senha:h}),r("1"),localStorage.setItem("logado",JSON.stringify(1));return}else return"usuario ou senha errados";else return"Usuário sem conta"},o=()=>{r(""),l(null),localStorage.removeItem("logado"),localStorage.removeItem("token")};return e.jsx(T.Provider,{value:{user:n,logged:!!n,login:x,sair:o,logado:a},children:i})};function _(){return s.useContext(T)}function re(){const{login:i}=_(),[n,l]=s.useState(),[u,t]=s.useState(),[a,r]=s.useState(),x=async()=>{if(!n|!u){r("Insira as credenciais");return}const o=await i(n,u);if(o){r(o);return}};return e.jsxs("div",{className:"absolute mx-auto top-14 right-0 px-5 login z-0",children:[e.jsxs("div",{className:"relative flex gap-1 backdrop-blur-md py-2 px-3 rounded-xl",children:[e.jsx("input",{type:"text",placeholder:"usuario",className:"px-2 py-1 rounded-md w-[120px] bg-gray-100 text-gray-800",onChange:o=>[l(o.target.value),r("")]}),e.jsx("input",{type:"password",placeholder:"senha",className:"px-2 py-1 rounded-md w-[120px] bg-gray-100 text-gray-800",onChange:o=>[t(o.target.value),r("")]}),e.jsx("input",{type:"submit",value:"ir",onClick:x,className:`bg-gray-600 text-white py-1 rounded-md border-2 border-gray-600 border-solid duration-200 w-[40px] block\r
                    hover:boder-gray-600 hover:bg-transparent hover:text-gray-600 cursor-pointer`})]}),e.jsx("small",{className:"text-red-500 w-auto",children:a})]})}function oe({setupWindow:i,upWindow:n}){const[l,u]=s.useState(0),[t,a]=s.useState(null),[r,x]=s.useState(""),{logado:o,sair:g}=_(),[h,c]=s.useState(!1),[f,b]=s.useState(!1),[A,k]=s.useState(""),z='<svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" class="hds-flight-icon--animation-loading"><g fill="#000000" fill-rule="evenodd" clip-rule="evenodd"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"/><path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"/></g></svg>',[S,I]=s.useState(!1);function L(p){const v=p.target.files[0];if(p.target.files&&p.target.files[0]){const m=new FileReader;m.onload=E,m.readAsDataURL(p.target.files[0])}c(!0),new Y(v,{quality:.7,mimeType:"image/webp",resize:"contain",width:"1000",success:m=>{a(m)}})}const E=p=>k(p.target.result),d=p=>{let v="";const m="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";let C=0;for(;C<p;)v+=m.charAt(Math.floor(Math.random()*m.length)),C+=1;return v},y=()=>{if(I(!0),!t){alert("erro");return}const p=j(N,`${r}/${r}-${d(r.length)}.webp`);Z(p,t).on("state_changed",m=>{const C=Math.round(m.bytesTransferred/m.totalBytes*100);u(C),setTimeout(()=>{C>99&&I(!1)},2e3)})};return o?o&&n&&e.jsx("span",{className:"flex flex-row add items-center right-5 fixed top-0 left-0 bg-[#000000cc] w-full h-full backdrop-blur-md z-40",children:e.jsxs("div",{className:"addinputs flex flex-col items-center relative left-1/2 -translate-x-1/2",children:[e.jsx("button",{className:"text-white z-30",onClick:()=>{l>99?window.location.reload():i(!1)},children:"X"}),e.jsxs("div",{className:"flex gap-5",children:[!h&&e.jsx("input",{type:"file",onChange:L,accept:"/image/*",id:"files",placeholder:"Escolher",className:`p-28 bg-[#ffffff22] border-4 border-dashed border-gray-500 rounded-lg mt-2 [&::file-selector-button]:opacity-0  max-w-[520px] w-full text-transparent \r
                                               before:content-['DRAG_&_DROP'] before:text-white before:flex before:justify-center`}),h&&e.jsxs("div",{className:"flex flex-col",children:[e.jsx("img",{src:A,className:"block w-96 "}),e.jsx("button",{className:"text-center text-gray-200 block py-3",onClick:()=>c(!1),children:"escolher outra"})]})]}),e.jsx("input",{type:"text",placeholder:"D I G I T E  A  C A T E G O R I A",required:!0,className:"border-[#888] bg-transparent border py-2 px-5 max-w-[520px] w-full outline-none mx-3 text-gray-200 border-l-0 border-r-0 border-t-0 text-center",onChange:p=>{x(p.target.value.toLowerCase())}}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("button",{className:"ml-1 text-gray-200 duration-200",onClick:y,disabled:!(r.length>1),style:{cursor:r.length<1?"not-allowed":"pointer"},children:"ENVIAR"}),l>.9&&r.length>0&&S&&e.jsx("span",{className:"animate-spin dark:text-gray-300 dark:hover:text-gray-100 text-gray-700 hover:text-gray-500 flex items-center gap-2 dark:[&_svg]:invert hover:[&_svg]:stroke-gray-100 duration-200 transition-all",dangerouslySetInnerHTML:{__html:z}}),l>99&&!S&&e.jsx("span",{className:"dark:text-gray-300 dark:hover:text-gray-100 text-gray-700 hover:text-gray-500",children:"enviado com sucesso!"})]})}):e.jsx(e.Fragment,{children:e.jsxs("span",{className:"flex flex-row add items-center absolute top-0 right-6",children:[e.jsx("button",{className:"log text-2xl cursor-pointer text-gray-700 z-50 relative top-2",onClick:()=>{b(!0)},children:" + "}),f&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"log text-2xl cursor-pointer text-gray-700 z-50 absolute md:top-[4rem] md:-left-[21rem] top-[6px] -left-1 backdrop-blur px-2",onClick:()=>{b(!1)},children:"x"}),e.jsx(re,{})]})]})})}const F=s.createContext(),B=()=>s.useContext(F),ne=({children:i})=>{const[n,l]=s.useState("jogos");return e.jsx(F.Provider,{value:{categoria:n,setCategoria:l},children:i})};function le(){const[i,n]=s.useState([]),{setCategoria:l,categoria:u}=B(),{logado:t,sair:a}=_(),[r,x]=s.useState(!1);return s.useEffect(()=>{(async()=>{const h=(await P(j(N,"/"))).prefixes.map(c=>c.fullPath);n(h.reverse())})()},[]),e.jsxs(e.Fragment,{children:[t&&e.jsx("span",{className:"log fixed right-12 md:top-[14px] top-10 text-gray-600 hover:text-gray-950 cursor-pointer z-[1]",onClick:a,children:"sair"}),t&&e.jsx("button",{className:"log fixed right-6 top-[8px] text-gray-600 hover:text-gray-950 cursor-pointer z-30 text-2xl",onClick:()=>{x(!0)},children:" + "}),e.jsxs("nav",{children:[e.jsx("ul",{className:"bg-white dark:bg-[#313131] items-start md:items-center justify-center mt-6 py-4 px-12 w-fit rounded-full z-50 [&:has(:not(li:hover))_li:hover]:opacity-100 [&:has(li:hover)_li]:opacity-45",children:i.map(o=>e.jsx("li",{className:`${o.split(" ").join("")} ${o.toLowerCase()===u?"active":""} dark:text-gray-50 text-gray-700 dark:before:bg-[#313131] before:bg-[#fff] dark:before:border-[#313131]`,onClick:()=>l(o.toLowerCase()),children:o.toLowerCase()},o))},"categorias"),e.jsx(oe,{setupWindow:x,upWindow:r})]})]})}function ie({params:{deletar:i,logado:n,currentImageIndex:l,setModal:u,setConfirmation:t,setDelURL:a,setDelCat:r,theme:x,pastinha:o}}){return e.jsxs("div",{className:"fixed z-[90] w-full h-dvh backdrop-blur-md backdrop-brightness-[.2] saturate-[1.3] left-0 top-0 grid place-items-center",style:{background:x},children:[e.jsx("div",{className:"absolute bottom-16 backdrop-blur-sm flex justify-center",children:n&&e.jsx("button",{className:"absolute top-1 left-1 opacity-1 z-50 shadow-sm px-1 py-1 rounded [&>svg_path]:fill-none [&>svg_path]:stroke-gray-50 hover:[&>svg_path]:fill-gray-500 duration-300",dangerouslySetInnerHTML:{__html:i},title:"deletar",onClick:()=>{t(!0),a(l),r(o.cat)}})}),e.jsx("a",{onClick:()=>u(!1),className:"bg-black w-8 h-8 rounded-full p-2 leading-none cursor-pointer absolute z-50 text-gray-300 hover:text-white md:top-10 md:right-12 top-[unset] right-[unset] left-1/2 bottom-8 md:left-[unset] md:bottom-[unset]",children:"X"}),e.jsx(ee,{src:l,className:"[&_img]:w-auto [&_img]:h-[95dvh] [&_img]:block [&_img]:mx-auto [&_img]:rounded-3xl [&_img]:object-contain !bg-transparent",zoom:"200"})]})}function ce({url:i,cat:n,logado:l,abrirModal:u,deletar:t,setConfirmation:a,setDelURL:r,setDelCat:x,index:o}){return e.jsxs("figure",{className:`item ${n.toLowerCase()} [&:has(img:hover)_button]:opacity-100 [&:has(button:hover)_button]:opacity-100 grid place-items-center`,children:[l&&e.jsx("button",{className:"absolute top-1 left-1 opacity-0 z-[70] shadow-sm px-1 py-1 rounded [&>svg_path]:fill-none [&>svg_path]:stroke-gray-500 hover:[&>svg_path]:fill-gray-500 duration-300",dangerouslySetInnerHTML:{__html:t},title:"deletar",onClick:()=>{a(!0),r(i),x(n)}}),e.jsx("img",{src:i,style:{transitionDelay:`${o*35}ms`},onClick:()=>u(i)}),e.jsx("figcaption",{className:"flex flex-col justify-end text-left ",children:e.jsx("span",{className:"text-base text-gray-200 font-semibold leading-none",children:n})})]})}const de=()=>{const i='<svg width="20px" height="20px" viewBox="0 0 24 24"> <path d="M5.73708 6.54391V18.9857C5.73708 19.7449 6.35257 20.3604 7.11182 20.3604H16.8893C17.6485 20.3604 18.264 19.7449 18.264 18.9857V6.54391M2.90906 6.54391H21.0909" stroke="#1C1C1C" stroke-width="1.7" stroke-linecap="round"/> <path d="M8 6V4.41421C8 3.63317 8.63317 3 9.41421 3H14.5858C15.3668 3 16 3.63317 16 4.41421V6" stroke-width="2" stroke-linecap="round"/> </svg>',n='<svg width="20px" height="20px" viewBox="0 0 64 64"><path d="M30.051 45.6071L17.851 54.7401C17.2728 55.1729 16.5856 55.4363 15.8662 55.5008C15.1468 55.5652 14.4237 55.4282 13.7778 55.1049C13.1319 54.7817 12.5887 54.2851 12.209 53.6707C11.8293 53.0563 11.6281 52.3483 11.628 51.626V15.306C11.628 13.2423 12.4477 11.2631 13.9069 9.8037C15.3661 8.34432 17.3452 7.52431 19.409 7.52405H45.35C47.4137 7.52431 49.3929 8.34432 50.8521 9.8037C52.3112 11.2631 53.131 13.2423 53.131 15.306V51.625C53.1309 52.3473 52.9297 53.0553 52.55 53.6697C52.1703 54.2841 51.6271 54.7807 50.9812 55.1039C50.3353 55.4272 49.6122 55.5642 48.8928 55.4998C48.1734 55.4353 47.4862 55.1719 46.908 54.739L34.715 45.6071C34.0419 45.1031 33.2238 44.8308 32.383 44.8308C31.5422 44.8308 30.724 45.1031 30.051 45.6071V45.6071Z" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>',l='<svg width="20px" height="20px" viewBox="0 0 64 64"><path d="M45.35 6.1709H19.41C16.8178 6.17618 14.3333 7.20827 12.5003 9.04123C10.6674 10.8742 9.63528 13.3587 9.62999 15.9509V52.2709C9.6272 53.3655 9.92973 54.4392 10.5036 55.3713C11.0775 56.3034 11.9 57.057 12.8787 57.5474C13.8573 58.0377 14.9533 58.2454 16.0435 58.1471C17.1337 58.0488 18.1748 57.6484 19.05 56.9909L31.25 47.8509C31.5783 47.6074 31.9762 47.4759 32.385 47.4759C32.7938 47.4759 33.1917 47.6074 33.52 47.8509L45.71 56.9809C46.5842 57.6387 47.6246 58.0397 48.7142 58.1387C49.8038 58.2378 50.8994 58.0311 51.8779 57.5418C52.8565 57.0525 53.6793 56.3001 54.2537 55.3689C54.8282 54.4378 55.1317 53.365 55.13 52.2709V15.9509C55.1247 13.3587 54.0926 10.8742 52.2597 9.04123C50.4267 7.20827 47.9422 6.17618 45.35 6.1709Z" stroke-width="4"/></svg>',u='<svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" class="hds-flight-icon--animation-loading"><g fill="#000000" fill-rule="evenodd" clip-rule="evenodd"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"/><path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"/></g></svg>',{categoria:t}=B(),{logado:a}=_(),[r,x]=s.useState([]),[o,g]=s.useState(!1),[h,c]=s.useState(!1),[f,b]=s.useState(),[A,k]=s.useState(),[z,S]=s.useState(0);s.useEffect(()=>{(async()=>{try{const y="cacheImagens",m=(await P(j(N,"/"))).prefixes.map(w=>w).map(async w=>{const M=j(N,w.fullPath),R=await P(M),U=await Promise.all(R.items.map(async V=>({url:await W(V)})));return{cat:w.fullPath,img:U}}),O=(await Promise.all(m)).map(w=>({...w,img:w.img.sort((M,R)=>R.url.localeCompare(M.url))}));localStorage.setItem(y,JSON.stringify(O)),x(O)}catch(y){console.error("Erro ao buscar URLs ou metadados:",y)}})()},[]),s.useEffect(()=>{const d=y=>{y.code==="Escape"&&g(!1)};return document.addEventListener("keydown",d),()=>document.removeEventListener("keydown",d)},[]);const I=async(d,y)=>{const p=j(N,d);await X(p),x(v=>v.map(m=>m.cat===y?{...m,img:m.img.filter(C=>C.url!==d)}:m))},L=r.filter(d=>d.cat.toLowerCase()===t),E=d=>{g(!0),S(d)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mansonry z-10",children:L.map(d=>e.jsx("span",{children:d.img.map(({url:y},p)=>e.jsx(ce,{url:y,cat:d.cat,logado:a,abrirModal:E,deletar:i,setConfirmation:c,setDelURL:b,setDelCat:k,saveIcon:n,savedIcon:l},p))},d.cat))},"mansonry"),h&&e.jsx("div",{className:"fixed bg-[#00000066] w-full h-[100dvh] top-0 left-0 z-[999999] grid place-items-center backdrop-saturate-0",children:e.jsxs("div",{className:"flex flex-col justify-center items-center bg-gray-200/30 backdrop-blur-md rounded-xl px-10 py-5 gap-4 max-w-[300px] w-[90%] border-gray-400/60 border-2 shadow-2xl",children:[e.jsx("h2",{className:"font-semibold text-gray-50",children:"TEM CERTEZA?"}),e.jsxs("div",{className:"flex justify-center items-center gap-4",children:[e.jsx("button",{onClick:()=>{I(f,A),c(!1)},className:"bg-black px-4 py-2 text-white text-sm rounded-lg",children:" DELETAR"}),e.jsx("button",{onClick:()=>c(!1),className:"bg-white px-4 py-2 text-black text-sm rounded-lg",children:"CANCELAR"})]})]})},"msg"),o&&L.map((d,y)=>e.jsx(ie,{params:{pastinha:d,deletar:i,logado:a,currentImageIndex:z,saveIcon:n,savedIcon:l,setModal:g,setConfirmation:c,setDelURL:b,setDelCat:k,loadSpin:u,modal:o}},"asd"))]})};function ue(){return e.jsxs("div",{className:"App",children:[e.jsx(le,{}),e.jsxs("div",{className:"presentation duration-200 transition-all relative overflow-hidden my-[70px] max-w-[1100px] mx-auto sm:py-7 sm:px-16 text-left rounded-3xl flex bg-[length:100%,50%] px-8 py-8 z-0",children:[e.jsxs("div",{className:" relative grid place-items-center mx-auto",children:[e.jsx("span",{className:"text-gray-700 dark:text-gray-200 tracking-[20px]",children:"BRUNO FRANCISCO"}),e.jsx("h1",{className:"font-100 text-gray-700 dark:text-gray-100 leading-none m-0 w-full text-[clamp(1rem,_0.284rem_+_3.9506vw,_2rem)] font-['Time_New_Roman'] uppercase text-center tracking-[10px] mt-2",children:"Ilustras e rabiscos."})]}),e.jsx("div",{className:"z-0 bg-[length:80%] w-full h-full absolute right-0 top-0 bg-[center_50%] text-[#e5e5e5] dark:text-[#434343] bg-fixed"})]}),e.jsx(de,{}),e.jsx("footer",{className:"text-center text-gray-700 dark:text-gray-400 pt-20",children:"Desenvolvido com React.JS, Firebase, TailwindCSS - Deployed no Vercel"})]})}H.createRoot(document.getElementById("root")).render(e.jsx(ae,{children:e.jsx(ne,{children:e.jsx(ue,{})})}));
