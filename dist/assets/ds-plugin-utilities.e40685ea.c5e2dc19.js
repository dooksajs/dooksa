let i=t=>crypto.getRandomValues(new Uint8Array(t)),d=(t,e,a)=>{let n=(2<<Math.log(t.length-1)/Math.LN2)-1,l=-~(1.6*n*e/t.length);return(s=e)=>{let r="";for(;;){let h=a(l),o=l;for(;o--;)if(r+=t[h[o]&n]||"",r.length===s)return r}}},g=(t,e=21)=>d(t,e,i);const u="123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_$",f=g(u,22),m={name:"dsUtilities",version:1,methods:{generateId(){return"_"+f()}}};export{m as default};
//# sourceMappingURL=ds-plugin-utilities.e40685ea.c5e2dc19.js.map
