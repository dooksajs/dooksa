var He=Object.defineProperty,Ge=(e,t,n)=>t in e?He(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,D=(e,t,n)=>(Ge(e,typeof t!="symbol"?t+"":t,n),n);/**
* (c) Iconify
*
* For the full copyright and license information, please view the license.txt
* files at https://github.com/iconify/iconify
*
* Licensed under MIT.
*
* @license MIT
* @version 1.0.1
*/const je=Object.freeze({left:0,top:0,width:16,height:16}),N=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),_=Object.freeze({...je,...N}),H=Object.freeze({..._,body:"",hidden:!1}),Ke=Object.freeze({width:null,height:null}),Ce=Object.freeze({...Ke,...N});function Ve(e,t=0){const n=e.replace(/^-?[0-9.]*/,"");function o(r){for(;r<0;)r+=4;return r%4}if(n===""){const r=parseInt(e);return isNaN(r)?0:o(r)}else if(n!==e){let r=0;switch(n){case"%":r=25;break;case"deg":r=90}if(r){let i=parseFloat(e.slice(0,e.length-n.length));return isNaN(i)?0:(i=i/r,i%1===0?o(i):0)}}return t}const We=/[\s,]+/;function Xe(e,t){t.split(We).forEach(n=>{switch(n.trim()){case"horizontal":e.hFlip=!0;break;case"vertical":e.vFlip=!0;break}})}const Ae={...Ce,preserveAspectRatio:""};function ce(e){const t={...Ae},n=(o,r)=>e.getAttribute(o)||r;return t.width=n("width",null),t.height=n("height",null),t.rotate=Ve(n("rotate","")),Xe(t,n("flip","")),t.preserveAspectRatio=n("preserveAspectRatio",n("preserveaspectratio","")),t}function Ye(e,t){for(const n in Ae)if(e[n]!==t[n])return!0;return!1}const I=/^[a-z0-9]+(-[a-z0-9]+)*$/,O=(e,t,n,o="")=>{const r=e.split(":");if(e.slice(0,1)==="@"){if(r.length<2||r.length>3)return null;o=r.shift().slice(1)}if(r.length>3||!r.length)return null;if(r.length>1){const s=r.pop(),a=r.pop(),u={provider:r.length>0?r[0]:o,prefix:a,name:s};return t&&!P(u)?null:u}const i=r[0],c=i.split("-");if(c.length>1){const s={provider:o,prefix:c.shift(),name:c.join("-")};return t&&!P(s)?null:s}if(n&&o===""){const s={provider:o,prefix:"",name:i};return t&&!P(s,n)?null:s}return null},P=(e,t)=>e?!!((e.provider===""||e.provider.match(I))&&(t&&e.prefix===""||e.prefix.match(I))&&e.name.match(I)):!1;function Ze(e,t){const n={};!e.hFlip!=!t.hFlip&&(n.hFlip=!0),!e.vFlip!=!t.vFlip&&(n.vFlip=!0);const o=((e.rotate||0)+(t.rotate||0))%4;return o&&(n.rotate=o),n}function ae(e,t){const n=Ze(e,t);for(const o in H)o in N?o in e&&!(o in n)&&(n[o]=N[o]):o in t?n[o]=t[o]:o in e&&(n[o]=e[o]);return n}function et(e,t){const n=e.icons,o=e.aliases||{},r=Object.create(null);function i(c){if(n[c])return r[c]=[];if(!(c in r)){r[c]=null;const s=o[c]&&o[c].parent,a=s&&i(s);a&&(r[c]=[s].concat(a))}return r[c]}return(t||Object.keys(n).concat(Object.keys(o))).forEach(i),r}function tt(e,t,n){const o=e.icons,r=e.aliases||{};let i={};function c(s){i=ae(o[s]||r[s],i)}return c(t),n.forEach(c),ae(e,i)}function _e(e,t){const n=[];if(typeof e!="object"||typeof e.icons!="object")return n;e.not_found instanceof Array&&e.not_found.forEach(r=>{t(r,null),n.push(r)});const o=et(e);for(const r in o){const i=o[r];i&&(t(r,tt(e,r,i)),n.push(r))}return n}const nt={provider:"",aliases:{},not_found:{},...je};function U(e,t){for(const n in t)if(n in e&&typeof e[n]!=typeof t[n])return!1;return!0}function Oe(e){if(typeof e!="object"||e===null)return null;const t=e;if(typeof t.prefix!="string"||!e.icons||typeof e.icons!="object"||!U(e,nt))return null;const n=t.icons;for(const r in n){const i=n[r];if(!r.match(I)||typeof i.body!="string"||!U(i,H))return null}const o=t.aliases||{};for(const r in o){const i=o[r],c=i.parent;if(!r.match(I)||typeof c!="string"||!n[c]&&!o[c]||!U(i,H))return null}return t}const R=Object.create(null);function rt(e,t){return{provider:e,prefix:t,icons:Object.create(null),missing:new Set}}function y(e,t){const n=R[e]||(R[e]=Object.create(null));return n[t]||(n[t]=rt(e,t))}function te(e,t){return Oe(t)?_e(t,(n,o)=>{o?e.icons[n]=o:e.missing.add(n)}):[]}function ot(e,t,n){try{if(typeof n.body=="string")return e.icons[t]={...n},!0}catch(o){}return!1}function it(e,t){let n=[];return(typeof e=="string"?[e]:Object.keys(R)).forEach(o=>{(typeof o=="string"&&typeof t=="string"?[t]:Object.keys(R[o]||{})).forEach(r=>{const i=y(o,r);n=n.concat(Object.keys(i.icons).map(c=>(o!==""?"@"+o+":":"")+r+":"+c))})}),n}let j=!1;function Se(e){return typeof e=="boolean"&&(j=e),j}function C(e){const t=typeof e=="string"?O(e,!0,j):e;if(t){const n=y(t.provider,t.prefix),o=t.name;return n.icons[o]||(n.missing.has(o)?null:void 0)}}function Ee(e,t){const n=O(e,!0,j);if(!n)return!1;const o=y(n.provider,n.prefix);return ot(o,n.name,t)}function ue(e,t){if(typeof e!="object")return!1;if(typeof t!="string"&&(t=e.provider||""),j&&!t&&!e.prefix){let r=!1;return Oe(e)&&(e.prefix="",_e(e,(i,c)=>{c&&Ee(i,c)&&(r=!0)})),r}const n=e.prefix;if(!P({provider:t,prefix:n,name:"a"}))return!1;const o=y(t,n);return!!te(o,e)}function st(e){return!!C(e)}function ct(e){const t=C(e);return t?{..._,...t}:null}function at(e){const t={loaded:[],missing:[],pending:[]},n=Object.create(null);e.sort((r,i)=>r.provider!==i.provider?r.provider.localeCompare(i.provider):r.prefix!==i.prefix?r.prefix.localeCompare(i.prefix):r.name.localeCompare(i.name));let o={provider:"",prefix:"",name:""};return e.forEach(r=>{if(o.name===r.name&&o.prefix===r.prefix&&o.provider===r.provider)return;o=r;const i=r.provider,c=r.prefix,s=r.name,a=n[i]||(n[i]=Object.create(null)),u=a[c]||(a[c]=y(i,c));let l;s in u.icons?l=t.loaded:c===""||u.missing.has(s)?l=t.missing:l=t.pending;const f={provider:i,prefix:c,name:s};l.push(f)}),t}function Me(e,t){e.forEach(n=>{const o=n.loaderCallbacks;o&&(n.loaderCallbacks=o.filter(r=>r.id!==t))})}function ut(e){e.pendingCallbacksFlag||(e.pendingCallbacksFlag=!0,setTimeout(()=>{e.pendingCallbacksFlag=!1;const t=e.loaderCallbacks?e.loaderCallbacks.slice(0):[];if(!t.length)return;let n=!1;const o=e.provider,r=e.prefix;t.forEach(i=>{const c=i.icons,s=c.pending.length;c.pending=c.pending.filter(a=>{if(a.prefix!==r)return!0;const u=a.name;if(e.icons[u])c.loaded.push({provider:o,prefix:r,name:u});else if(e.missing.has(u))c.missing.push({provider:o,prefix:r,name:u});else return n=!0,!0;return!1}),c.pending.length!==s&&(n||Me([e],i.id),i.callback(c.loaded.slice(0),c.missing.slice(0),c.pending.slice(0),i.abort))})}))}let lt=0;function ft(e,t,n){const o=lt++,r=Me.bind(null,n,o);if(!t.pending.length)return r;const i={id:o,icons:t,callback:e,abort:r};return n.forEach(c=>{(c.loaderCallbacks||(c.loaderCallbacks=[])).push(i)}),r}const G=Object.create(null);function le(e,t){G[e]=t}function K(e){return G[e]||G[""]}function dt(e,t=!0,n=!1){const o=[];return e.forEach(r=>{const i=typeof r=="string"?O(r,t,n):r;i&&o.push(i)}),o}var ht={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function pt(e,t,n,o){const r=e.resources.length,i=e.random?Math.floor(Math.random()*r):e.index;let c;if(e.random){let d=e.resources.slice(0);for(c=[];d.length>1;){const b=Math.floor(Math.random()*d.length);c.push(d[b]),d=d.slice(0,b).concat(d.slice(b+1))}c=c.concat(d)}else c=e.resources.slice(i).concat(e.resources.slice(0,i));const s=Date.now();let a="pending",u=0,l,f=null,p=[],h=[];typeof o=="function"&&h.push(o);function w(){f&&(clearTimeout(f),f=null)}function S(){a==="pending"&&(a="aborted"),w(),p.forEach(d=>{d.status==="pending"&&(d.status="aborted")}),p=[]}function m(d,b){b&&(h=[]),typeof d=="function"&&h.push(d)}function g(){return{startTime:s,payload:t,status:a,queriesSent:u,queriesPending:p.length,subscribe:m,abort:S}}function E(){a="failed",h.forEach(d=>{d(void 0,l)})}function se(){p.forEach(d=>{d.status==="pending"&&(d.status="aborted")}),p=[]}function Be(d,b,k){const M=b!=="success";switch(p=p.filter(v=>v!==d),a){case"pending":break;case"failed":if(M||!e.dataAfterTimeout)return;break;default:return}if(b==="abort"){l=k,E();return}if(M){l=k,p.length||(c.length?q():E());return}if(w(),se(),!e.random){const v=e.resources.indexOf(d.resource);v!==-1&&v!==e.index&&(e.index=v)}a="completed",h.forEach(v=>{v(k)})}function q(){if(a!=="pending")return;w();const d=c.shift();if(d===void 0){if(p.length){f=setTimeout(()=>{w(),a==="pending"&&(se(),E())},e.timeout);return}E();return}const b={status:"pending",resource:d,callback:(k,M)=>{Be(b,k,M)}};p.push(b),u++,f=setTimeout(q,e.rotate),n(d,t,b.callback)}return setTimeout(q),g}function Te(e){const t={...ht,...e};let n=[];function o(){n=n.filter(c=>c().status==="pending")}function r(c,s,a){const u=pt(t,c,s,(l,f)=>{o(),a&&a(l,f)});return n.push(u),u}function i(c){return n.find(s=>c(s))||null}return{query:r,find:i,setIndex:c=>{t.index=c},getIndex:()=>t.index,cleanup:o}}function ne(e){let t;if(typeof e.resources=="string")t=[e.resources];else if(t=e.resources,!(t instanceof Array)||!t.length)return null;return{resources:t,path:e.path||"/",maxURL:e.maxURL||500,rotate:e.rotate||750,timeout:e.timeout||5e3,random:e.random===!0,index:e.index||0,dataAfterTimeout:e.dataAfterTimeout!==!1}}const z=Object.create(null),T=["https://api.simplesvg.com","https://api.unisvg.com"],V=[];for(;T.length>0;)T.length===1||Math.random()>.5?V.push(T.shift()):V.push(T.pop());z[""]=ne({resources:["https://api.iconify.design"].concat(V)});function fe(e,t){const n=ne(t);return n===null?!1:(z[e]=n,!0)}function Q(e){return z[e]}function gt(){return Object.keys(z)}function de(){}const J=Object.create(null);function bt(e){if(!J[e]){const t=Q(e);if(!t)return;const n=Te(t),o={config:t,redundancy:n};J[e]=o}return J[e]}function Fe(e,t,n){let o,r;if(typeof e=="string"){const i=K(e);if(!i)return n(void 0,424),de;r=i.send;const c=bt(e);c&&(o=c.redundancy)}else{const i=ne(e);if(i){o=Te(i);const c=e.resources?e.resources[0]:"",s=K(c);s&&(r=s.send)}}return!o||!r?(n(void 0,424),de):o.query(t,r,n)().abort}const he="iconify2",A="iconify",Pe=A+"-count",pe=A+"-version",Ne=36e5,mt=168;function W(e,t){try{return e.getItem(t)}catch(n){}}function re(e,t,n){try{return e.setItem(t,n),!0}catch(o){}}function ge(e,t){try{e.removeItem(t)}catch(n){}}function X(e,t){return re(e,Pe,t.toString())}function Y(e){return parseInt(W(e,Pe))||0}const x={local:!0,session:!0},Re={local:new Set,session:new Set};let oe=!1;function yt(e){oe=e}let F=typeof window>"u"?{}:window;function Le(e){const t=e+"Storage";try{if(F&&F[t]&&typeof F[t].length=="number")return F[t]}catch(n){}x[e]=!1}function ze(e,t){const n=Le(e);if(!n)return;const o=W(n,pe);if(o!==he){if(o){const s=Y(n);for(let a=0;a<s;a++)ge(n,A+a.toString())}re(n,pe,he),X(n,0);return}const r=Math.floor(Date.now()/Ne)-mt,i=s=>{const a=A+s.toString(),u=W(n,a);if(typeof u=="string"){try{const l=JSON.parse(u);if(typeof l=="object"&&typeof l.cached=="number"&&l.cached>r&&typeof l.provider=="string"&&typeof l.data=="object"&&typeof l.data.prefix=="string"&&t(l,s))return!0}catch(l){}ge(n,a)}};let c=Y(n);for(let s=c-1;s>=0;s--)i(s)||(s===c-1?(c--,X(n,c)):Re[e].add(s))}function Qe(){if(!oe){yt(!0);for(const e in x)ze(e,t=>{const n=t.data,o=t.provider,r=n.prefix,i=y(o,r);if(!te(i,n).length)return!1;const c=n.lastModified||-1;return i.lastModifiedCached=i.lastModifiedCached?Math.min(i.lastModifiedCached,c):c,!0})}}function vt(e,t){const n=e.lastModifiedCached;if(n&&n>=t)return n===t;if(e.lastModifiedCached=t,n)for(const o in x)ze(o,r=>{const i=r.data;return r.provider!==e.provider||i.prefix!==e.prefix||i.lastModified===t});return!0}function xt(e,t){oe||Qe();function n(o){let r;if(!x[o]||!(r=Le(o)))return;const i=Re[o];let c;if(i.size)i.delete(c=Array.from(i).shift());else if(c=Y(r),!X(r,c+1))return;const s={cached:Math.floor(Date.now()/Ne),provider:e.provider,data:t};return re(r,A+c.toString(),JSON.stringify(s))}t.lastModified&&!vt(e,t.lastModified)||!Object.keys(t.icons).length||(t.not_found&&(t=Object.assign({},t),delete t.not_found),n("local")||n("session"))}function be(){}function wt(e){e.iconsLoaderFlag||(e.iconsLoaderFlag=!0,setTimeout(()=>{e.iconsLoaderFlag=!1,ut(e)}))}function kt(e,t){e.iconsToLoad?e.iconsToLoad=e.iconsToLoad.concat(t).sort():e.iconsToLoad=t,e.iconsQueueFlag||(e.iconsQueueFlag=!0,setTimeout(()=>{e.iconsQueueFlag=!1;const{provider:n,prefix:o}=e,r=e.iconsToLoad;delete e.iconsToLoad;let i;!r||!(i=K(n))||i.prepare(n,o,r).forEach(c=>{Fe(n,c,(s,a)=>{if(typeof s!="object"){if(a!==404)return;c.icons.forEach(u=>{e.missing.add(u)})}else try{const u=te(e,s);if(!u.length)return;const l=e.pendingIcons;l&&u.forEach(f=>{l.delete(f)}),xt(e,s)}catch(u){console.error(u)}wt(e)})})}))}const ie=(e,t)=>{const n=dt(e,!0,Se()),o=at(n);if(!o.pending.length){let a=!0;return t&&setTimeout(()=>{a&&t(o.loaded,o.missing,o.pending,be)}),()=>{a=!1}}const r=Object.create(null),i=[];let c,s;return o.pending.forEach(a=>{const{provider:u,prefix:l}=a;if(l===s&&u===c)return;c=u,s=l,i.push(y(u,l));const f=r[u]||(r[u]=Object.create(null));f[l]||(f[l]=[])}),o.pending.forEach(a=>{const{provider:u,prefix:l,name:f}=a,p=y(u,l),h=p.pendingIcons||(p.pendingIcons=new Set);h.has(f)||(h.add(f),r[u][l].push(f))}),i.forEach(a=>{const{provider:u,prefix:l}=a;r[u][l].length&&kt(a,r[u][l])}),t?ft(t,o,i):be},It=e=>new Promise((t,n)=>{const o=typeof e=="string"?O(e,!0):e;if(!o){n(e);return}ie([o||e],r=>{if(r.length&&o){const i=C(o);if(i){t({..._,...i});return}}n(e)})});function jt(e){try{const t=typeof e=="string"?JSON.parse(e):e;if(typeof t.body=="string")return{...t}}catch(t){}}function Ct(e,t){const n=typeof e=="string"?O(e,!0,!0):null;if(!n){const i=jt(e);return{value:e,data:i}}const o=C(n);if(o!==void 0||!n.prefix)return{value:e,name:n,data:o};const r=ie([n],()=>t(e,n,C(n)));return{value:e,name:n,loading:r}}function $(e){return e.hasAttribute("inline")}let qe=!1;try{qe=navigator.vendor.indexOf("Apple")===0}catch(e){}function At(e,t){switch(t){case"svg":case"bg":case"mask":return t}return t!=="style"&&(qe||e.indexOf("<a")===-1)?"svg":e.indexOf("currentColor")===-1?"bg":"mask"}const _t=/(-?[0-9.]*[0-9]+[0-9.]*)/g,Ot=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function Z(e,t,n){if(t===1)return e;if(n=n||100,typeof e=="number")return Math.ceil(e*t*n)/n;if(typeof e!="string")return e;const o=e.split(_t);if(o===null||!o.length)return e;const r=[];let i=o.shift(),c=Ot.test(i);for(;;){if(c){const s=parseFloat(i);isNaN(s)?r.push(i):r.push(Math.ceil(s*t*n)/n)}else r.push(i);if(i=o.shift(),i===void 0)return r.join("");c=!c}}function De(e,t){const n={..._,...e},o={...Ce,...t},r={left:n.left,top:n.top,width:n.width,height:n.height};let i=n.body;[n,o].forEach(p=>{const h=[],w=p.hFlip,S=p.vFlip;let m=p.rotate;w?S?m+=2:(h.push("translate("+(r.width+r.left).toString()+" "+(0-r.top).toString()+")"),h.push("scale(-1 1)"),r.top=r.left=0):S&&(h.push("translate("+(0-r.left).toString()+" "+(r.height+r.top).toString()+")"),h.push("scale(1 -1)"),r.top=r.left=0);let g;switch(m<0&&(m-=Math.floor(m/4)*4),m=m%4,m){case 1:g=r.height/2+r.top,h.unshift("rotate(90 "+g.toString()+" "+g.toString()+")");break;case 2:h.unshift("rotate(180 "+(r.width/2+r.left).toString()+" "+(r.height/2+r.top).toString()+")");break;case 3:g=r.width/2+r.left,h.unshift("rotate(-90 "+g.toString()+" "+g.toString()+")");break}m%2===1&&(r.left!==r.top&&(g=r.left,r.left=r.top,r.top=g),r.width!==r.height&&(g=r.width,r.width=r.height,r.height=g)),h.length&&(i='<g transform="'+h.join(" ")+'">'+i+"</g>")});const c=o.width,s=o.height,a=r.width,u=r.height;let l,f;return c===null?(f=s===null?"1em":s==="auto"?u:s,l=Z(f,a/u)):(l=c==="auto"?a:c,f=s===null?Z(l,u/a):s==="auto"?u:s),{attributes:{width:l.toString(),height:f.toString(),viewBox:r.left.toString()+" "+r.top.toString()+" "+a.toString()+" "+u.toString()},body:i}}const St=()=>{let e;try{if(e=fetch,typeof e=="function")return e}catch(t){}};let L=St();function Et(e){L=e}function Mt(){return L}function Tt(e,t){const n=Q(e);if(!n)return 0;let o;if(!n.maxURL)o=0;else{let r=0;n.resources.forEach(c=>{r=Math.max(r,c.length)});const i=t+".json?icons=";o=n.maxURL-r-n.path.length-i.length}return o}function Ft(e){return e===404}const Pt=(e,t,n)=>{const o=[],r=Tt(e,t),i="icons";let c={type:i,provider:e,prefix:t,icons:[]},s=0;return n.forEach((a,u)=>{s+=a.length+1,s>=r&&u>0&&(o.push(c),c={type:i,provider:e,prefix:t,icons:[]},s=a.length),c.icons.push(a)}),o.push(c),o};function Nt(e){if(typeof e=="string"){const t=Q(e);if(t)return t.path}return"/"}const Rt=(e,t,n)=>{if(!L){n("abort",424);return}let o=Nt(t.provider);switch(t.type){case"icons":{const i=t.prefix,c=t.icons.join(","),s=new URLSearchParams({icons:c});o+=i+".json?"+s.toString();break}case"custom":{const i=t.uri;o+=i.slice(0,1)==="/"?i.slice(1):i;break}default:n("abort",400);return}let r=503;L(e+o).then(i=>{const c=i.status;if(c!==200){setTimeout(()=>{n(Ft(c)?"abort":"next",c)});return}return r=501,i.json()}).then(i=>{if(typeof i!="object"||i===null){setTimeout(()=>{n("next",r)});return}setTimeout(()=>{n("success",i)})}).catch(()=>{n("next",r)})},Lt={prepare:Pt,send:Rt};function me(e,t){switch(e){case"local":case"session":x[e]=t;break;case"all":for(const n in x)x[n]=t;break}}function Ue(){le("",Lt),Se(!0);let e;try{e=window}catch(t){}if(e){if(Qe(),e.IconifyPreload!==void 0){const t=e.IconifyPreload,n="Invalid IconifyPreload syntax.";typeof t=="object"&&t!==null&&(t instanceof Array?t:[t]).forEach(o=>{try{(typeof o!="object"||o===null||o instanceof Array||typeof o.icons!="object"||typeof o.prefix!="string"||!ue(o))&&console.error(n)}catch(r){console.error(n)}})}if(e.IconifyProviders!==void 0){const t=e.IconifyProviders;if(typeof t=="object"&&t!==null)for(const n in t){const o="IconifyProviders["+n+"] is invalid.";try{const r=t[n];if(typeof r!="object"||!r||r.resources===void 0)continue;fe(n,r)||console.error(o)}catch(r){console.error(o)}}}}return{enableCache:t=>me(t,!0),disableCache:t=>me(t,!1),iconExists:st,getIcon:ct,listIcons:it,addIcon:Ee,addCollection:ue,calculateSize:Z,buildIcon:De,loadIcons:ie,loadIcon:It,addAPIProvider:fe,_api:{getAPIConfig:Q,setAPIModule:le,sendAPIQuery:Fe,setFetch:Et,getFetch:Mt,listAPIProviders:gt}}}function Je(e,t){let n=e.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const o in t)n+=" "+o+'="'+t[o]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+n+">"+e+"</svg>"}function zt(e){return e.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function Qt(e){return'url("data:image/svg+xml,'+zt(e)+'")'}const ee={"background-color":"currentColor"},$e={"background-color":"transparent"},ye={image:"var(--svg)",repeat:"no-repeat",size:"100% 100%"},ve={"-webkit-mask":ee,mask:ee,background:$e};for(const e in ve){const t=ve[e];for(const n in ye)t[e+"-"+n]=ye[n]}function xe(e){return e+(e.match(/^[-0-9.]+$/)?"px":"")}function qt(e,t,n){const o=document.createElement("span");let r=e.body;r.indexOf("<a")!==-1&&(r+="<!-- "+Date.now()+" -->");const i=e.attributes,c=Je(r,{...i,width:t.width+"",height:t.height+""}),s=Qt(c),a=o.style,u={"--svg":s,width:xe(i.width),height:xe(i.height),...n?ee:$e};for(const l in u)a.setProperty(l,u[l]);return o}function Dt(e){const t=document.createElement("span");return t.innerHTML=Je(e.body,e.attributes),t.firstChild}function we(e,t){const n=t.icon.data,o=t.customisations,r=De(n,o);o.preserveAspectRatio&&(r.attributes.preserveAspectRatio=o.preserveAspectRatio);const i=t.renderedMode;let c;switch(i){case"svg":c=Dt(r);break;default:c=qt(r,{..._,...n},i==="mask")}const s=Array.from(e.childNodes).find(a=>{const u=a.tagName&&a.tagName.toUpperCase();return u==="SPAN"||u==="SVG"});s?c.tagName==="SPAN"&&s.tagName===c.tagName?s.setAttribute("style",c.getAttribute("style")):e.replaceChild(c,s):e.appendChild(c)}const B="data-style";function ke(e,t){let n=Array.from(e.childNodes).find(o=>o.hasAttribute&&o.hasAttribute(B));n||(n=document.createElement("style"),n.setAttribute(B,B),e.appendChild(n)),n.textContent=":host{display:inline-block;vertical-align:"+(t?"-0.125em":"0")+"}span,svg{display:block}"}function Ie(e,t,n){const o=n&&(n.rendered?n:n.lastRender);return{rendered:!1,inline:t,icon:e,lastRender:o}}function Ut(e="iconify-icon"){let t,n;try{t=window.customElements,n=window.HTMLElement}catch(s){return}if(!t||!n)return;const o=t.get(e);if(o)return o;const r=["icon","mode","inline","width","height","rotate","flip"],i=class extends n{constructor(){super(),D(this,"_shadowRoot"),D(this,"_state"),D(this,"_checkQueued",!1);const s=this._shadowRoot=this.attachShadow({mode:"open"}),a=$(this);ke(s,a),this._state=Ie({value:""},a),this._queueCheck()}static get observedAttributes(){return r.slice(0)}attributeChangedCallback(s){if(s==="inline"){const a=$(this),u=this._state;a!==u.inline&&(u.inline=a,ke(this._shadowRoot,a))}else this._queueCheck()}get icon(){const s=this.getAttribute("icon");if(s&&s.slice(0,1)==="{")try{return JSON.parse(s)}catch(a){}return s}set icon(s){typeof s=="object"&&(s=JSON.stringify(s)),this.setAttribute("icon",s)}get inline(){return $(this)}set inline(s){this.setAttribute("inline",s?"true":null)}restartAnimation(){const s=this._state;if(s.rendered){const a=this._shadowRoot;if(s.renderedMode==="svg")try{a.lastChild.setCurrentTime(0);return}catch(u){}we(a,s)}}get status(){const s=this._state;return s.rendered?"rendered":s.icon.data===null?"failed":"loading"}_queueCheck(){this._checkQueued||(this._checkQueued=!0,setTimeout(()=>{this._check()}))}_check(){if(!this._checkQueued)return;this._checkQueued=!1;const s=this._state,a=this.getAttribute("icon");if(a!==s.icon.value){this._iconChanged(a);return}if(!s.rendered)return;const u=this.getAttribute("mode"),l=ce(this);(s.attrMode!==u||Ye(s.customisations,l))&&this._renderIcon(s.icon,l,u)}_iconChanged(s){const a=Ct(s,(u,l,f)=>{const p=this._state;if(p.rendered||this.getAttribute("icon")!==u)return;const h={value:u,name:l,data:f};h.data?this._gotIconData(h):p.icon=h});a.data?this._gotIconData(a):this._state=Ie(a,this._state.inline,this._state)}_gotIconData(s){this._checkQueued=!1,this._renderIcon(s,ce(this),this.getAttribute("mode"))}_renderIcon(s,a,u){const l=At(s.data.body,u),f=this._state.inline;we(this._shadowRoot,this._state={rendered:!0,icon:s,inline:f,customisations:a,attrMode:u,renderedMode:l})}};r.forEach(s=>{s in i.prototype||Object.defineProperty(i.prototype,s,{get:function(){return this.getAttribute(s)},set:function(a){this.setAttribute(s,a)}})});const c=Ue();for(const s in c)i[s]=i.prototype[s]=c[s];return t.define(e,i),i}const Jt=Ut()||Ue(),{enableCache:$t,disableCache:Bt,iconExists:Ht,getIcon:Gt,listIcons:Kt,addIcon:Vt,addCollection:Wt,calculateSize:Xt,buildIcon:Yt,loadIcons:Zt,loadIcon:en,addAPIProvider:tn,_api:nn}=Jt;export{Jt as IconifyIconComponent,nn as _api,tn as addAPIProvider,Wt as addCollection,Vt as addIcon,Yt as buildIcon,Xt as calculateSize,Bt as disableCache,$t as enableCache,Gt as getIcon,Ht as iconExists,Kt as listIcons,en as loadIcon,Zt as loadIcons};
//# sourceMappingURL=iconify-icon.f0a3399f.ffd89cc4.js.map
