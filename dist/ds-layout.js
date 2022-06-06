(()=>{var e={705:e=>{e.exports=function e(t,n,r){function o(u,s){if(!n[u]){if(!t[u]){if(i)return i(u,!0);throw new Error("Cannot find module '"+u+"'")}s=n[u]={exports:{}},t[u][0].call(s.exports,(function(e){return o(t[u][1][e]||e)}),s,s.exports,e,t,n,r)}return n[u].exports}for(var i=void 0,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,t,n){(function(r,o,i,u,s,a,f,l,c){"use strict";var d=e("crypto");function h(e,t){var n;return void 0===(n="passthrough"!==(t=y(e,t)).algorithm?d.createHash(t.algorithm):new m).write&&(n.write=n.update,n.end=n.update),b(t,n).dispatch(e),n.update||n.end(""),n.digest?n.digest("buffer"===t.encoding?void 0:t.encoding):(e=n.read(),"buffer"!==t.encoding?e.toString(t.encoding):e)}(n=t.exports=h).sha1=function(e){return h(e)},n.keys=function(e){return h(e,{excludeValues:!0,algorithm:"sha1",encoding:"hex"})},n.MD5=function(e){return h(e,{algorithm:"md5",encoding:"hex"})},n.keysMD5=function(e){return h(e,{algorithm:"md5",encoding:"hex",excludeValues:!0})};var p=d.getHashes?d.getHashes().slice():["sha1","md5"],g=(p.push("passthrough"),["buffer","hex","binary","base64"]);function y(e,t){var n={};if(n.algorithm=(t=t||{}).algorithm||"sha1",n.encoding=t.encoding||"hex",n.excludeValues=!!t.excludeValues,n.algorithm=n.algorithm.toLowerCase(),n.encoding=n.encoding.toLowerCase(),n.ignoreUnknown=!0===t.ignoreUnknown,n.respectType=!1!==t.respectType,n.respectFunctionNames=!1!==t.respectFunctionNames,n.respectFunctionProperties=!1!==t.respectFunctionProperties,n.unorderedArrays=!0===t.unorderedArrays,n.unorderedSets=!1!==t.unorderedSets,n.unorderedObjects=!1!==t.unorderedObjects,n.replacer=t.replacer||void 0,n.excludeKeys=t.excludeKeys||void 0,void 0===e)throw new Error("Object argument required.");for(var r=0;r<p.length;++r)p[r].toLowerCase()===n.algorithm.toLowerCase()&&(n.algorithm=p[r]);if(-1===p.indexOf(n.algorithm))throw new Error('Algorithm "'+n.algorithm+'"  not supported. supported values: '+p.join(", "));if(-1===g.indexOf(n.encoding)&&"passthrough"!==n.algorithm)throw new Error('Encoding "'+n.encoding+'"  not supported. supported values: '+g.join(", "));return n}function w(e){if("function"==typeof e)return null!=/^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(e))}function b(e,t,n){function r(e){return t.update?t.update(e,"utf8"):t.write(e,"utf8")}return n=n||[],{dispatch:function(t){return this["_"+(null===(t=e.replacer?e.replacer(t):t)?"null":typeof t)](t)},_object:function(t){var o,u=Object.prototype.toString.call(t),s=/\[object (.*)\]/i.exec(u);if(s=(s=s?s[1]:"unknown:["+u+"]").toLowerCase(),0<=(u=n.indexOf(t)))return this.dispatch("[CIRCULAR:"+u+"]");if(n.push(t),void 0!==i&&i.isBuffer&&i.isBuffer(t))return r("buffer:"),r(t);if("object"===s||"function"===s||"asyncfunction"===s)return u=Object.keys(t),e.unorderedObjects&&(u=u.sort()),!1===e.respectType||w(t)||u.splice(0,0,"prototype","__proto__","constructor"),e.excludeKeys&&(u=u.filter((function(t){return!e.excludeKeys(t)}))),r("object:"+u.length+":"),o=this,u.forEach((function(n){o.dispatch(n),r(":"),e.excludeValues||o.dispatch(t[n]),r(",")}));if(!this["_"+s]){if(e.ignoreUnknown)return r("["+s+"]");throw new Error('Unknown object type "'+s+'"')}this["_"+s](t)},_array:function(t,o){o=void 0!==o?o:!1!==e.unorderedArrays;var i=this;if(r("array:"+t.length+":"),!o||t.length<=1)return t.forEach((function(e){return i.dispatch(e)}));var u=[];return o=t.map((function(t){var r=new m,o=n.slice();return b(e,r,o).dispatch(t),u=u.concat(o.slice(n.length)),r.read().toString()})),n=n.concat(u),o.sort(),this._array(o,!1)},_date:function(e){return r("date:"+e.toJSON())},_symbol:function(e){return r("symbol:"+e.toString())},_error:function(e){return r("error:"+e.toString())},_boolean:function(e){return r("bool:"+e.toString())},_string:function(e){r("string:"+e.length+":"),r(e.toString())},_function:function(t){r("fn:"),w(t)?this.dispatch("[native]"):this.dispatch(t.toString()),!1!==e.respectFunctionNames&&this.dispatch("function-name:"+String(t.name)),e.respectFunctionProperties&&this._object(t)},_number:function(e){return r("number:"+e.toString())},_xml:function(e){return r("xml:"+e.toString())},_null:function(){return r("Null")},_undefined:function(){return r("Undefined")},_regexp:function(e){return r("regex:"+e.toString())},_uint8array:function(e){return r("uint8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint8clampedarray:function(e){return r("uint8clampedarray:"),this.dispatch(Array.prototype.slice.call(e))},_int8array:function(e){return r("int8array:"),this.dispatch(Array.prototype.slice.call(e))},_uint16array:function(e){return r("uint16array:"),this.dispatch(Array.prototype.slice.call(e))},_int16array:function(e){return r("int16array:"),this.dispatch(Array.prototype.slice.call(e))},_uint32array:function(e){return r("uint32array:"),this.dispatch(Array.prototype.slice.call(e))},_int32array:function(e){return r("int32array:"),this.dispatch(Array.prototype.slice.call(e))},_float32array:function(e){return r("float32array:"),this.dispatch(Array.prototype.slice.call(e))},_float64array:function(e){return r("float64array:"),this.dispatch(Array.prototype.slice.call(e))},_arraybuffer:function(e){return r("arraybuffer:"),this.dispatch(new Uint8Array(e))},_url:function(e){return r("url:"+e.toString())},_map:function(t){return r("map:"),t=Array.from(t),this._array(t,!1!==e.unorderedSets)},_set:function(t){return r("set:"),t=Array.from(t),this._array(t,!1!==e.unorderedSets)},_file:function(e){return r("file:"),this.dispatch([e.name,e.size,e.type,e.lastModfied])},_blob:function(){if(e.ignoreUnknown)return r("[blob]");throw Error('Hashing Blob objects is currently not supported\n(see https://github.com/puleos/object-hash/issues/26)\nUse "options.replacer" or "options.ignoreUnknown"\n')},_domwindow:function(){return r("domwindow")},_bigint:function(e){return r("bigint:"+e.toString())},_process:function(){return r("process")},_timer:function(){return r("timer")},_pipe:function(){return r("pipe")},_tcp:function(){return r("tcp")},_udp:function(){return r("udp")},_tty:function(){return r("tty")},_statwatcher:function(){return r("statwatcher")},_securecontext:function(){return r("securecontext")},_connection:function(){return r("connection")},_zlib:function(){return r("zlib")},_context:function(){return r("context")},_nodescript:function(){return r("nodescript")},_httpparser:function(){return r("httpparser")},_dataview:function(){return r("dataview")},_signal:function(){return r("signal")},_fsevent:function(){return r("fsevent")},_tlswrap:function(){return r("tlswrap")}}}function m(){return{buf:"",write:function(e){this.buf+=e},end:function(e){this.buf+=e},read:function(){return this.buf}}}n.writeToStream=function(e,t,n){return void 0===n&&(n=t,t={}),b(t=y(e,t),n).dispatch(e)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_9a5aa49d.js","/")},{buffer:3,crypto:5,lYpoI2:11}],2:[function(e,t,n){(function(e,t,r,o,i,u,s,a,f){!function(e){"use strict";var t="undefined"!=typeof Uint8Array?Uint8Array:Array,n="+".charCodeAt(0),r="/".charCodeAt(0),o="0".charCodeAt(0),i="a".charCodeAt(0),u="A".charCodeAt(0),s="-".charCodeAt(0),a="_".charCodeAt(0);function f(e){return(e=e.charCodeAt(0))===n||e===s?62:e===r||e===a?63:e<o?-1:e<o+10?e-o+26+26:e<u+26?e-u:e<i+26?e-i+26:void 0}e.toByteArray=function(e){var n,r;if(0<e.length%4)throw new Error("Invalid string. Length must be a multiple of 4");var o=e.length,i=(o="="===e.charAt(o-2)?2:"="===e.charAt(o-1)?1:0,new t(3*e.length/4-o)),u=0<o?e.length-4:e.length,s=0;function a(e){i[s++]=e}for(n=0;n<u;n+=4,0)a((16711680&(r=f(e.charAt(n))<<18|f(e.charAt(n+1))<<12|f(e.charAt(n+2))<<6|f(e.charAt(n+3))))>>16),a((65280&r)>>8),a(255&r);return 2==o?a(255&(r=f(e.charAt(n))<<2|f(e.charAt(n+1))>>4)):1==o&&(a((r=f(e.charAt(n))<<10|f(e.charAt(n+1))<<4|f(e.charAt(n+2))>>2)>>8&255),a(255&r)),i},e.fromByteArray=function(e){var t,n,r,o,i=e.length%3,u="";function s(e){return"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)}for(t=0,r=e.length-i;t<r;t+=3)u+=s((o=n=(e[t]<<16)+(e[t+1]<<8)+e[t+2])>>18&63)+s(o>>12&63)+s(o>>6&63)+s(63&o);switch(i){case 1:u=(u+=s((n=e[e.length-1])>>2))+s(n<<4&63)+"==";break;case 2:u=(u=(u+=s((n=(e[e.length-2]<<8)+e[e.length-1])>>10))+s(n>>4&63))+s(n<<2&63)+"="}return u}}(void 0===n?this.base64js={}:n)}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js","/node_modules/gulp-browserify/node_modules/base64-js/lib")},{buffer:3,lYpoI2:11}],3:[function(e,t,n){(function(t,r,o,i,u,s,a,f,l){var c=e("base64-js"),d=e("ieee754");function o(e,t,n){if(!(this instanceof o))return new o(e,t,n);var r,i,u,s,a=typeof e;if("base64"===t&&"string"==a)for(e=(s=e).trim?s.trim():s.replace(/^\s+|\s+$/g,"");e.length%4!=0;)e+="=";if("number"==a)r=j(e);else if("string"==a)r=o.byteLength(e,t);else{if("object"!=a)throw new Error("First argument needs to be a number, array or string.");r=j(e.length)}if(o._useTypedArrays?i=o._augment(new Uint8Array(r)):((i=this).length=r,i._isBuffer=!0),o._useTypedArrays&&"number"==typeof e.byteLength)i._set(e);else if(C(s=e)||o.isBuffer(s)||s&&"object"==typeof s&&"number"==typeof s.length)for(u=0;u<r;u++)o.isBuffer(e)?i[u]=e.readUInt8(u):i[u]=e[u];else if("string"==a)i.write(e,0,t);else if("number"==a&&!o._useTypedArrays&&!n)for(u=0;u<r;u++)i[u]=0;return i}function h(e,t,n,r){return o._charsWritten=M(function(e){for(var t=[],n=0;n<e.length;n++)t.push(255&e.charCodeAt(n));return t}(t),e,n,r)}function p(e,t,n,r){return o._charsWritten=M(function(e){for(var t,n,r=[],o=0;o<e.length;o++)t=(n=e.charCodeAt(o))>>8,n%=256,r.push(n),r.push(t);return r}(t),e,n,r)}function g(e,t,n){var r="";n=Math.min(e.length,n);for(var o=t;o<n;o++)r+=String.fromCharCode(e[o]);return r}function y(e,t,n,r){var o;if(r||(P("boolean"==typeof n,"missing or invalid endian"),P(null!=t,"missing offset"),P(t+1<e.length,"Trying to read beyond buffer length")),!((r=e.length)<=t))return n?(o=e[t],t+1<r&&(o|=e[t+1]<<8)):(o=e[t]<<8,t+1<r&&(o|=e[t+1])),o}function w(e,t,n,r){var o;if(r||(P("boolean"==typeof n,"missing or invalid endian"),P(null!=t,"missing offset"),P(t+3<e.length,"Trying to read beyond buffer length")),!((r=e.length)<=t))return n?(t+2<r&&(o=e[t+2]<<16),t+1<r&&(o|=e[t+1]<<8),o|=e[t],t+3<r&&(o+=e[t+3]<<24>>>0)):(t+1<r&&(o=e[t+1]<<16),t+2<r&&(o|=e[t+2]<<8),t+3<r&&(o|=e[t+3]),o+=e[t]<<24>>>0),o}function b(e,t,n,r){if(r||(P("boolean"==typeof n,"missing or invalid endian"),P(null!=t,"missing offset"),P(t+1<e.length,"Trying to read beyond buffer length")),!(e.length<=t))return 32768&(r=y(e,t,n,!0))?-1*(65535-r+1):r}function m(e,t,n,r){if(r||(P("boolean"==typeof n,"missing or invalid endian"),P(null!=t,"missing offset"),P(t+3<e.length,"Trying to read beyond buffer length")),!(e.length<=t))return 2147483648&(r=w(e,t,n,!0))?-1*(4294967295-r+1):r}function v(e,t,n,r){return r||(P("boolean"==typeof n,"missing or invalid endian"),P(t+3<e.length,"Trying to read beyond buffer length")),d.read(e,t,n,23,4)}function _(e,t,n,r){return r||(P("boolean"==typeof n,"missing or invalid endian"),P(t+7<e.length,"Trying to read beyond buffer length")),d.read(e,t,n,52,8)}function I(e,t,n,r,o){if(o||(P(null!=t,"missing value"),P("boolean"==typeof r,"missing or invalid endian"),P(null!=n,"missing offset"),P(n+1<e.length,"trying to write beyond buffer length"),F(t,65535)),!((o=e.length)<=n))for(var i=0,u=Math.min(o-n,2);i<u;i++)e[n+i]=(t&255<<8*(r?i:1-i))>>>8*(r?i:1-i)}function E(e,t,n,r,o){if(o||(P(null!=t,"missing value"),P("boolean"==typeof r,"missing or invalid endian"),P(null!=n,"missing offset"),P(n+3<e.length,"trying to write beyond buffer length"),F(t,4294967295)),!((o=e.length)<=n))for(var i=0,u=Math.min(o-n,4);i<u;i++)e[n+i]=t>>>8*(r?i:3-i)&255}function A(e,t,n,r,o){o||(P(null!=t,"missing value"),P("boolean"==typeof r,"missing or invalid endian"),P(null!=n,"missing offset"),P(n+1<e.length,"Trying to write beyond buffer length"),O(t,32767,-32768)),e.length<=n||I(e,0<=t?t:65535+t+1,n,r,o)}function B(e,t,n,r,o){o||(P(null!=t,"missing value"),P("boolean"==typeof r,"missing or invalid endian"),P(null!=n,"missing offset"),P(n+3<e.length,"Trying to write beyond buffer length"),O(t,2147483647,-2147483648)),e.length<=n||E(e,0<=t?t:4294967295+t+1,n,r,o)}function L(e,t,n,r,o){o||(P(null!=t,"missing value"),P("boolean"==typeof r,"missing or invalid endian"),P(null!=n,"missing offset"),P(n+3<e.length,"Trying to write beyond buffer length"),D(t,34028234663852886e22,-34028234663852886e22)),e.length<=n||d.write(e,t,n,r,23,4)}function x(e,t,n,r,o){o||(P(null!=t,"missing value"),P("boolean"==typeof r,"missing or invalid endian"),P(null!=n,"missing offset"),P(n+7<e.length,"Trying to write beyond buffer length"),D(t,17976931348623157e292,-17976931348623157e292)),e.length<=n||d.write(e,t,n,r,52,8)}n.Buffer=o,n.SlowBuffer=o,n.INSPECT_MAX_BYTES=50,o.poolSize=8192,o._useTypedArrays=function(){try{var e=new ArrayBuffer(0),t=new Uint8Array(e);return t.foo=function(){return 42},42===t.foo()&&"function"==typeof t.subarray}catch(e){return!1}}(),o.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},o.isBuffer=function(e){return!(null==e||!e._isBuffer)},o.byteLength=function(e,t){var n;switch(e+="",t||"utf8"){case"hex":n=e.length/2;break;case"utf8":case"utf-8":n=N(e).length;break;case"ascii":case"binary":case"raw":n=e.length;break;case"base64":n=T(e).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":n=2*e.length;break;default:throw new Error("Unknown encoding")}return n},o.concat=function(e,t){if(P(C(e),"Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),0===e.length)return new o(0);if(1===e.length)return e[0];if("number"!=typeof t)for(i=t=0;i<e.length;i++)t+=e[i].length;for(var n=new o(t),r=0,i=0;i<e.length;i++){var u=e[i];u.copy(n,r),r+=u.length}return n},o.prototype.write=function(e,t,n,r){isFinite(t)?isFinite(n)||(r=n,n=void 0):(f=r,r=t,t=n,n=f),t=Number(t)||0;var i,u,s,a,f=this.length-t;switch((!n||f<(n=Number(n)))&&(n=f),r=String(r||"utf8").toLowerCase()){case"hex":i=function(e,t,n,r){n=Number(n)||0;var i=e.length-n;(!r||i<(r=Number(r)))&&(r=i),P((i=t.length)%2==0,"Invalid hex string"),i/2<r&&(r=i/2);for(var u=0;u<r;u++){var s=parseInt(t.substr(2*u,2),16);P(!isNaN(s),"Invalid hex string"),e[n+u]=s}return o._charsWritten=2*u,u}(this,e,t,n);break;case"utf8":case"utf-8":u=this,s=t,a=n,i=o._charsWritten=M(N(e),u,s,a);break;case"ascii":case"binary":i=h(this,e,t,n);break;case"base64":u=this,s=t,a=n,i=o._charsWritten=M(T(e),u,s,a);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":i=p(this,e,t,n);break;default:throw new Error("Unknown encoding")}return i},o.prototype.toString=function(e,t,n){var r,o,i,u,s=this;if(e=String(e||"utf8").toLowerCase(),t=Number(t)||0,(n=void 0!==n?Number(n):s.length)===t)return"";switch(e){case"hex":r=function(e,t,n){var r=e.length;(!t||t<0)&&(t=0),(!n||n<0||r<n)&&(n=r);for(var o="",i=t;i<n;i++)o+=k(e[i]);return o}(s,t,n);break;case"utf8":case"utf-8":r=function(e,t,n){var r="",o="";n=Math.min(e.length,n);for(var i=t;i<n;i++)e[i]<=127?(r+=Y(o)+String.fromCharCode(e[i]),o=""):o+="%"+e[i].toString(16);return r+Y(o)}(s,t,n);break;case"ascii":case"binary":r=g(s,t,n);break;case"base64":o=s,u=n,r=0===(i=t)&&u===o.length?c.fromByteArray(o):c.fromByteArray(o.slice(i,u));break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":r=function(e,t,n){for(var r=e.slice(t,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}(s,t,n);break;default:throw new Error("Unknown encoding")}return r},o.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},o.prototype.copy=function(e,t,n,r){if(t=t||0,(r=r||0===r?r:this.length)!==(n=n||0)&&0!==e.length&&0!==this.length){P(n<=r,"sourceEnd < sourceStart"),P(0<=t&&t<e.length,"targetStart out of bounds"),P(0<=n&&n<this.length,"sourceStart out of bounds"),P(0<=r&&r<=this.length,"sourceEnd out of bounds"),r>this.length&&(r=this.length);var i=(r=e.length-t<r-n?e.length-t+n:r)-n;if(i<100||!o._useTypedArrays)for(var u=0;u<i;u++)e[u+t]=this[u+n];else e._set(this.subarray(n,n+i),t)}},o.prototype.slice=function(e,t){var n=this.length;if(e=S(e,n,0),t=S(t,n,n),o._useTypedArrays)return o._augment(this.subarray(e,t));for(var r=t-e,i=new o(r,void 0,!0),u=0;u<r;u++)i[u]=this[u+e];return i},o.prototype.get=function(e){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(e)},o.prototype.set=function(e,t){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(e,t)},o.prototype.readUInt8=function(e,t){if(t||(P(null!=e,"missing offset"),P(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length))return this[e]},o.prototype.readUInt16LE=function(e,t){return y(this,e,!0,t)},o.prototype.readUInt16BE=function(e,t){return y(this,e,!1,t)},o.prototype.readUInt32LE=function(e,t){return w(this,e,!0,t)},o.prototype.readUInt32BE=function(e,t){return w(this,e,!1,t)},o.prototype.readInt8=function(e,t){if(t||(P(null!=e,"missing offset"),P(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length))return 128&this[e]?-1*(255-this[e]+1):this[e]},o.prototype.readInt16LE=function(e,t){return b(this,e,!0,t)},o.prototype.readInt16BE=function(e,t){return b(this,e,!1,t)},o.prototype.readInt32LE=function(e,t){return m(this,e,!0,t)},o.prototype.readInt32BE=function(e,t){return m(this,e,!1,t)},o.prototype.readFloatLE=function(e,t){return v(this,e,!0,t)},o.prototype.readFloatBE=function(e,t){return v(this,e,!1,t)},o.prototype.readDoubleLE=function(e,t){return _(this,e,!0,t)},o.prototype.readDoubleBE=function(e,t){return _(this,e,!1,t)},o.prototype.writeUInt8=function(e,t,n){n||(P(null!=e,"missing value"),P(null!=t,"missing offset"),P(t<this.length,"trying to write beyond buffer length"),F(e,255)),t>=this.length||(this[t]=e)},o.prototype.writeUInt16LE=function(e,t,n){I(this,e,t,!0,n)},o.prototype.writeUInt16BE=function(e,t,n){I(this,e,t,!1,n)},o.prototype.writeUInt32LE=function(e,t,n){E(this,e,t,!0,n)},o.prototype.writeUInt32BE=function(e,t,n){E(this,e,t,!1,n)},o.prototype.writeInt8=function(e,t,n){n||(P(null!=e,"missing value"),P(null!=t,"missing offset"),P(t<this.length,"Trying to write beyond buffer length"),O(e,127,-128)),t>=this.length||(0<=e?this.writeUInt8(e,t,n):this.writeUInt8(255+e+1,t,n))},o.prototype.writeInt16LE=function(e,t,n){A(this,e,t,!0,n)},o.prototype.writeInt16BE=function(e,t,n){A(this,e,t,!1,n)},o.prototype.writeInt32LE=function(e,t,n){B(this,e,t,!0,n)},o.prototype.writeInt32BE=function(e,t,n){B(this,e,t,!1,n)},o.prototype.writeFloatLE=function(e,t,n){L(this,e,t,!0,n)},o.prototype.writeFloatBE=function(e,t,n){L(this,e,t,!1,n)},o.prototype.writeDoubleLE=function(e,t,n){x(this,e,t,!0,n)},o.prototype.writeDoubleBE=function(e,t,n){x(this,e,t,!1,n)},o.prototype.fill=function(e,t,n){if(t=t||0,n=n||this.length,P("number"==typeof(e="string"==typeof(e=e||0)?e.charCodeAt(0):e)&&!isNaN(e),"value is not a number"),P(t<=n,"end < start"),n!==t&&0!==this.length){P(0<=t&&t<this.length,"start out of bounds"),P(0<=n&&n<=this.length,"end out of bounds");for(var r=t;r<n;r++)this[r]=e}},o.prototype.inspect=function(){for(var e=[],t=this.length,r=0;r<t;r++)if(e[r]=k(this[r]),r===n.INSPECT_MAX_BYTES){e[r+1]="...";break}return"<Buffer "+e.join(" ")+">"},o.prototype.toArrayBuffer=function(){if("undefined"==typeof Uint8Array)throw new Error("Buffer.toArrayBuffer not supported in this browser");if(o._useTypedArrays)return new o(this).buffer;for(var e=new Uint8Array(this.length),t=0,n=e.length;t<n;t+=1)e[t]=this[t];return e.buffer};var U=o.prototype;function S(e,t,n){return"number"!=typeof e?n:t<=(e=~~e)?t:0<=e||0<=(e+=t)?e:0}function j(e){return(e=~~Math.ceil(+e))<0?0:e}function C(e){return(Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)})(e)}function k(e){return e<16?"0"+e.toString(16):e.toString(16)}function N(e){for(var t=[],n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<=127)t.push(e.charCodeAt(n));else for(var o=n,i=(55296<=r&&r<=57343&&n++,encodeURIComponent(e.slice(o,n+1)).substr(1).split("%")),u=0;u<i.length;u++)t.push(parseInt(i[u],16))}return t}function T(e){return c.toByteArray(e)}function M(e,t,n,r){for(var o=0;o<r&&!(o+n>=t.length||o>=e.length);o++)t[o+n]=e[o];return o}function Y(e){try{return decodeURIComponent(e)}catch(e){return String.fromCharCode(65533)}}function F(e,t){P("number"==typeof e,"cannot write a non-number as a number"),P(0<=e,"specified a negative value for writing an unsigned value"),P(e<=t,"value is larger than maximum value for type"),P(Math.floor(e)===e,"value has a fractional component")}function O(e,t,n){P("number"==typeof e,"cannot write a non-number as a number"),P(e<=t,"value larger than maximum allowed value"),P(n<=e,"value smaller than minimum allowed value"),P(Math.floor(e)===e,"value has a fractional component")}function D(e,t,n){P("number"==typeof e,"cannot write a non-number as a number"),P(e<=t,"value larger than maximum allowed value"),P(n<=e,"value smaller than minimum allowed value")}function P(e,t){if(!e)throw new Error(t||"Failed assertion")}o._augment=function(e){return e._isBuffer=!0,e._get=e.get,e._set=e.set,e.get=U.get,e.set=U.set,e.write=U.write,e.toString=U.toString,e.toLocaleString=U.toString,e.toJSON=U.toJSON,e.copy=U.copy,e.slice=U.slice,e.readUInt8=U.readUInt8,e.readUInt16LE=U.readUInt16LE,e.readUInt16BE=U.readUInt16BE,e.readUInt32LE=U.readUInt32LE,e.readUInt32BE=U.readUInt32BE,e.readInt8=U.readInt8,e.readInt16LE=U.readInt16LE,e.readInt16BE=U.readInt16BE,e.readInt32LE=U.readInt32LE,e.readInt32BE=U.readInt32BE,e.readFloatLE=U.readFloatLE,e.readFloatBE=U.readFloatBE,e.readDoubleLE=U.readDoubleLE,e.readDoubleBE=U.readDoubleBE,e.writeUInt8=U.writeUInt8,e.writeUInt16LE=U.writeUInt16LE,e.writeUInt16BE=U.writeUInt16BE,e.writeUInt32LE=U.writeUInt32LE,e.writeUInt32BE=U.writeUInt32BE,e.writeInt8=U.writeInt8,e.writeInt16LE=U.writeInt16LE,e.writeInt16BE=U.writeInt16BE,e.writeInt32LE=U.writeInt32LE,e.writeInt32BE=U.writeInt32BE,e.writeFloatLE=U.writeFloatLE,e.writeFloatBE=U.writeFloatBE,e.writeDoubleLE=U.writeDoubleLE,e.writeDoubleBE=U.writeDoubleBE,e.fill=U.fill,e.inspect=U.inspect,e.toArrayBuffer=U.toArrayBuffer,e}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/buffer/index.js","/node_modules/gulp-browserify/node_modules/buffer")},{"base64-js":2,buffer:3,ieee754:10,lYpoI2:11}],4:[function(e,t,n){(function(n,r,o,i,u,s,a,f,l){o=e("buffer").Buffer;var c=4,d=new o(c);d.fill(0),t.exports={hash:function(e,t,n,r){for(var i=t(function(e,t){e.length%c!=0&&(n=e.length+(c-e.length%c),e=o.concat([e,d],n));for(var n,r=[],i=t?e.readInt32BE:e.readInt32LE,u=0;u<e.length;u+=c)r.push(i.call(e,u));return r}(e=o.isBuffer(e)?e:new o(e),r),8*e.length),u=(t=r,new o(n)),s=t?u.writeInt32BE:u.writeInt32LE,a=0;a<i.length;a++)s.call(u,i[a],4*a,!0);return u}}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:11}],5:[function(e,t,n){(function(t,r,o,i,u,s,a,f,l){o=e("buffer").Buffer;var c=e("./sha"),d=e("./sha256"),h=e("./rng"),p={sha1:c,sha256:d,md5:e("./md5")},g=64,y=new o(g);function w(e,t){var n=p[e=e||"sha1"],r=[];return n||b("algorithm:",e,"is not yet supported"),{update:function(e){return o.isBuffer(e)||(e=new o(e)),r.push(e),e.length,this},digest:function(e){var i=o.concat(r);return i=t?function(e,t,n){o.isBuffer(t)||(t=new o(t)),o.isBuffer(n)||(n=new o(n)),t.length>g?t=e(t):t.length<g&&(t=o.concat([t,y],g));for(var r=new o(g),i=new o(g),u=0;u<g;u++)r[u]=54^t[u],i[u]=92^t[u];return n=e(o.concat([r,n])),e(o.concat([i,n]))}(n,t,i):n(i),r=null,e?i.toString(e):i}}}function b(){var e=[].slice.call(arguments).join(" ");throw new Error([e,"we accept pull requests","http://github.com/dominictarr/crypto-browserify"].join("\n"))}y.fill(0),n.createHash=function(e){return w(e)},n.createHmac=w,n.randomBytes=function(e,t){if(!t||!t.call)return new o(h(e));try{t.call(this,void 0,new o(h(e)))}catch(e){t(e)}};var m,v=["createCredentials","createCipher","createCipheriv","createDecipher","createDecipheriv","createSign","createVerify","createDiffieHellman","pbkdf2"],_=function(e){n[e]=function(){b("sorry,",e,"is not implemented yet")}};for(m in v)_(v[m],m)}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./md5":6,"./rng":7,"./sha":8,"./sha256":9,buffer:3,lYpoI2:11}],6:[function(e,t,n){(function(n,r,o,i,u,s,a,f,l){var c=e("./helpers");function d(e,t){e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;for(var n=1732584193,r=-271733879,o=-1732584194,i=271733878,u=0;u<e.length;u+=16){var s=n,a=r,f=o,l=i;n=p(n,r,o,i,e[u+0],7,-680876936),i=p(i,n,r,o,e[u+1],12,-389564586),o=p(o,i,n,r,e[u+2],17,606105819),r=p(r,o,i,n,e[u+3],22,-1044525330),n=p(n,r,o,i,e[u+4],7,-176418897),i=p(i,n,r,o,e[u+5],12,1200080426),o=p(o,i,n,r,e[u+6],17,-1473231341),r=p(r,o,i,n,e[u+7],22,-45705983),n=p(n,r,o,i,e[u+8],7,1770035416),i=p(i,n,r,o,e[u+9],12,-1958414417),o=p(o,i,n,r,e[u+10],17,-42063),r=p(r,o,i,n,e[u+11],22,-1990404162),n=p(n,r,o,i,e[u+12],7,1804603682),i=p(i,n,r,o,e[u+13],12,-40341101),o=p(o,i,n,r,e[u+14],17,-1502002290),n=g(n,r=p(r,o,i,n,e[u+15],22,1236535329),o,i,e[u+1],5,-165796510),i=g(i,n,r,o,e[u+6],9,-1069501632),o=g(o,i,n,r,e[u+11],14,643717713),r=g(r,o,i,n,e[u+0],20,-373897302),n=g(n,r,o,i,e[u+5],5,-701558691),i=g(i,n,r,o,e[u+10],9,38016083),o=g(o,i,n,r,e[u+15],14,-660478335),r=g(r,o,i,n,e[u+4],20,-405537848),n=g(n,r,o,i,e[u+9],5,568446438),i=g(i,n,r,o,e[u+14],9,-1019803690),o=g(o,i,n,r,e[u+3],14,-187363961),r=g(r,o,i,n,e[u+8],20,1163531501),n=g(n,r,o,i,e[u+13],5,-1444681467),i=g(i,n,r,o,e[u+2],9,-51403784),o=g(o,i,n,r,e[u+7],14,1735328473),n=y(n,r=g(r,o,i,n,e[u+12],20,-1926607734),o,i,e[u+5],4,-378558),i=y(i,n,r,o,e[u+8],11,-2022574463),o=y(o,i,n,r,e[u+11],16,1839030562),r=y(r,o,i,n,e[u+14],23,-35309556),n=y(n,r,o,i,e[u+1],4,-1530992060),i=y(i,n,r,o,e[u+4],11,1272893353),o=y(o,i,n,r,e[u+7],16,-155497632),r=y(r,o,i,n,e[u+10],23,-1094730640),n=y(n,r,o,i,e[u+13],4,681279174),i=y(i,n,r,o,e[u+0],11,-358537222),o=y(o,i,n,r,e[u+3],16,-722521979),r=y(r,o,i,n,e[u+6],23,76029189),n=y(n,r,o,i,e[u+9],4,-640364487),i=y(i,n,r,o,e[u+12],11,-421815835),o=y(o,i,n,r,e[u+15],16,530742520),n=w(n,r=y(r,o,i,n,e[u+2],23,-995338651),o,i,e[u+0],6,-198630844),i=w(i,n,r,o,e[u+7],10,1126891415),o=w(o,i,n,r,e[u+14],15,-1416354905),r=w(r,o,i,n,e[u+5],21,-57434055),n=w(n,r,o,i,e[u+12],6,1700485571),i=w(i,n,r,o,e[u+3],10,-1894986606),o=w(o,i,n,r,e[u+10],15,-1051523),r=w(r,o,i,n,e[u+1],21,-2054922799),n=w(n,r,o,i,e[u+8],6,1873313359),i=w(i,n,r,o,e[u+15],10,-30611744),o=w(o,i,n,r,e[u+6],15,-1560198380),r=w(r,o,i,n,e[u+13],21,1309151649),n=w(n,r,o,i,e[u+4],6,-145523070),i=w(i,n,r,o,e[u+11],10,-1120210379),o=w(o,i,n,r,e[u+2],15,718787259),r=w(r,o,i,n,e[u+9],21,-343485551),n=b(n,s),r=b(r,a),o=b(o,f),i=b(i,l)}return Array(n,r,o,i)}function h(e,t,n,r,o,i){return b((t=b(b(t,e),b(r,i)))<<o|t>>>32-o,n)}function p(e,t,n,r,o,i,u){return h(t&n|~t&r,e,t,o,i,u)}function g(e,t,n,r,o,i,u){return h(t&r|n&~r,e,t,o,i,u)}function y(e,t,n,r,o,i,u){return h(t^n^r,e,t,o,i,u)}function w(e,t,n,r,o,i,u){return h(n^(t|~r),e,t,o,i,u)}function b(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}t.exports=function(e){return c.hash(e,d,16)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:11}],7:[function(e,t,n){(function(e,n,r,o,i,u,s,a,f){var l;t.exports=l||function(e){for(var t,n=new Array(e),r=0;r<e;r++)0==(3&r)&&(t=4294967296*Math.random()),n[r]=t>>>((3&r)<<3)&255;return n}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{buffer:3,lYpoI2:11}],8:[function(e,t,n){(function(n,r,o,i,u,s,a,f,l){var c=e("./helpers");function d(e,t){e[t>>5]|=128<<24-t%32,e[15+(t+64>>9<<4)]=t;for(var n,r,o,i=Array(80),u=1732584193,s=-271733879,a=-1732584194,f=271733878,l=-1009589776,c=0;c<e.length;c+=16){for(var d=u,g=s,y=a,w=f,b=l,m=0;m<80;m++){i[m]=m<16?e[c+m]:p(i[m-3]^i[m-8]^i[m-14]^i[m-16],1);var v=h(h(p(u,5),(v=s,r=a,o=f,(n=m)<20?v&r|~v&o:!(n<40)&&n<60?v&r|v&o|r&o:v^r^o)),h(h(l,i[m]),(n=m)<20?1518500249:n<40?1859775393:n<60?-1894007588:-899497514));l=f,f=a,a=p(s,30),s=u,u=v}u=h(u,d),s=h(s,g),a=h(a,y),f=h(f,w),l=h(l,b)}return Array(u,s,a,f,l)}function h(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function p(e,t){return e<<t|e>>>32-t}t.exports=function(e){return c.hash(e,d,20,!0)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:11}],9:[function(e,t,n){(function(n,r,o,i,u,s,a,f,l){function c(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function d(e,t){var n,r=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298),o=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225),i=new Array(64);e[t>>5]|=128<<24-t%32,e[15+(t+64>>9<<4)]=t;for(var u,s,a=0;a<e.length;a+=16){for(var f=o[0],l=o[1],d=o[2],h=o[3],y=o[4],w=o[5],b=o[6],m=o[7],v=0;v<64;v++)i[v]=v<16?e[v+a]:c(c(c((s=i[v-2],p(s,17)^p(s,19)^g(s,10)),i[v-7]),(s=i[v-15],p(s,7)^p(s,18)^g(s,3))),i[v-16]),n=c(c(c(c(m,p(s=y,6)^p(s,11)^p(s,25)),y&w^~y&b),r[v]),i[v]),u=c(p(u=f,2)^p(u,13)^p(u,22),f&l^f&d^l&d),m=b,b=w,w=y,y=c(h,n),h=d,d=l,l=f,f=c(n,u);o[0]=c(f,o[0]),o[1]=c(l,o[1]),o[2]=c(d,o[2]),o[3]=c(h,o[3]),o[4]=c(y,o[4]),o[5]=c(w,o[5]),o[6]=c(b,o[6]),o[7]=c(m,o[7])}return o}var h=e("./helpers"),p=function(e,t){return e>>>t|e<<32-t},g=function(e,t){return e>>>t};t.exports=function(e){return h.hash(e,d,32,!0)}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js","/node_modules/gulp-browserify/node_modules/crypto-browserify")},{"./helpers":4,buffer:3,lYpoI2:11}],10:[function(e,t,n){(function(e,t,r,o,i,u,s,a,f){n.read=function(e,t,n,r,o){var i,u,s=8*o-r-1,a=(1<<s)-1,f=a>>1,l=-7,c=n?o-1:0,d=n?-1:1;for(o=e[t+c],c+=d,i=o&(1<<-l)-1,o>>=-l,l+=s;0<l;i=256*i+e[t+c],c+=d,l-=8);for(u=i&(1<<-l)-1,i>>=-l,l+=r;0<l;u=256*u+e[t+c],c+=d,l-=8);if(0===i)i=1-f;else{if(i===a)return u?NaN:1/0*(o?-1:1);u+=Math.pow(2,r),i-=f}return(o?-1:1)*u*Math.pow(2,i-r)},n.write=function(e,t,n,r,o,i){var u,s,a=8*i-o-1,f=(1<<a)-1,l=f>>1,c=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,d=r?0:i-1,h=r?1:-1;for(i=t<0||0===t&&1/t<0?1:0,t=Math.abs(t),isNaN(t)||t===1/0?(s=isNaN(t)?1:0,u=f):(u=Math.floor(Math.log(t)/Math.LN2),t*(r=Math.pow(2,-u))<1&&(u--,r*=2),2<=(t+=1<=u+l?c/r:c*Math.pow(2,1-l))*r&&(u++,r/=2),f<=u+l?(s=0,u=f):1<=u+l?(s=(t*r-1)*Math.pow(2,o),u+=l):(s=t*Math.pow(2,l-1)*Math.pow(2,o),u=0));8<=o;e[n+d]=255&s,d+=h,s/=256,o-=8);for(u=u<<o|s,a+=o;0<a;e[n+d]=255&u,d+=h,u/=256,a-=8);e[n+d-h]|=128*i}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/ieee754/index.js","/node_modules/gulp-browserify/node_modules/ieee754")},{buffer:3,lYpoI2:11}],11:[function(e,t,n){(function(e,n,r,o,i,u,s,a,f){var l,c,d;function h(){}(e=t.exports={}).nextTick=(c="undefined"!=typeof window&&window.setImmediate,d="undefined"!=typeof window&&window.postMessage&&window.addEventListener,c?function(e){return window.setImmediate(e)}:d?(l=[],window.addEventListener("message",(function(e){var t=e.source;t!==window&&null!==t||"process-tick"!==e.data||(e.stopPropagation(),0<l.length&&l.shift()())}),!0),function(e){l.push(e),window.postMessage("process-tick","*")}):function(e){setTimeout(e,0)}),e.title="browser",e.browser=!0,e.env={},e.argv=[],e.on=h,e.addListener=h,e.once=h,e.off=h,e.removeListener=h,e.removeAllListeners=h,e.emit=h,e.binding=function(e){throw new Error("process.binding is not supported")},e.cwd=function(){return"/"},e.chdir=function(e){throw new Error("process.chdir is not supported")}}).call(this,e("lYpoI2"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{},e("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/gulp-browserify/node_modules/process/browser.js","/node_modules/gulp-browserify/node_modules/process")},{buffer:3,lYpoI2:11}]},{},[1])(1)}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};(()=>{"use strict";n(705);r.default={name:"dsLayout",version:1,data:{allowedAttributes:{class:"className",type:"type",alt:"alt",width:"width",height:"height"}},setup({html:e}){console.log(this.parse({},e))},methods:{parse(e,t){const n=[];for(let r=0;r<t.childNodes.length;r++){const e=t.childNodes[r];if(!e.nodeValue){const t={id:this._nodeNameToId(e.nodeName),attributes:{}};let r;for(let n=0;n<e.attributes.length;n++){const o=e.attributes[n],i=this.allowedAttributes[o.name];i&&(t.attributes[i]=o.value,r=!0)}r||delete t.attributes,n.push(t)}}return n},_nodeNameToId:e=>"ds"+e.charAt(0)+e.substring(1).toLowerCase()}}})(),Object(window.dsApp.plugins).dsLayout=r.default})();