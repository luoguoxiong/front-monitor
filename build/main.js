!function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);function o(e){return function(e){return!!/\.(gif|jpg|jpeg|png|webp|svg)/i.test(e)}(e)?"image":function(e){return!!/\.(js)/i.test(e)}(e)?"javascript":function(e){return!!/\.(css)/i.test(e)}(e)?"css":/\.(mp4|rm|rmvb|mkv|avi|flv|ogv|webm)/i.test(name)?"video":"other"}function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}(new class{constructor(){n(this,"isRunInit",!1),n(this,"config",{})}init(e){return this.isRunInit=!0,this.caughtError(),this.getWebPerformance(),this.resetXmlHttp(),this.resetFetch(),this.config=e,this.userAgent=(()=>{const e=navigator.userAgent.toLowerCase(),t=t=>t.test(e),r=t=>(e.match(t)+"").replace(/[^0-9|_.]/gi,"").replace(/_/gi,".");let o="unknown";t(/windows|win32|win64|wow32|wow64/gi)?o="windows":t(/macintosh|macintel/gi)?o="osx":t(/x11/gi)?o="linux":t(/android|adr/gi)?o="android":t(/ios|iphone|ipad|ipod|iwatch/gi)&&(o="ios");let n="unknown";"windows"===o?t(/windows nt 5.0|windows 2000/gi)?n="2000":t(/windows nt 5.1|windows xp/gi)?n="xp":t(/windows nt 5.2|windows 2003/gi)?n="2003":t(/windows nt 6.0|windows vista/gi)?n="vista":t(/windows nt 6.1|windows 7/gi)?n="7":t(/windows nt 6.2|windows 8/gi)?n="8":t(/windows nt 6.3|windows 8.1/gi)?n="8.1":t(/windows nt 10.0|windows 10/gi)&&(n="10"):"osx"===o?n=r(/os x [\d._]+/gi):"android"===o?n=r(/android [\d._]+/gi):"ios"===o&&(n=r(/os [\d._]+/gi));let i="unknow";"windows"===o||"osx"===o||"linux"===o?i="desktop":("android"===o||"ios"===o||t(/mobile/gi))&&(i="mobile");let s="unknow",a="unknow";t(/applewebkit/gi)&&t(/safari/gi)?(s="webkit",a=t(/edge/gi)?"edge":t(/opr/gi)?"opera":t(/chrome/gi)?"chrome":"safari"):t(/gecko/gi)&&t(/firefox/gi)?(s="gecko",a="firefox"):t(/presto/gi)?(s="presto",a="opera"):t(/trident|compatible|msie/gi)&&(s="trident",a="iexplore");let d="unknow";"webkit"===s?d=r(/applewebkit\/[\d.]+/gi):"gecko"===s?d=r(/gecko\/[\d.]+/gi):"presto"===s?d=r(/presto\/[\d.]+/gi):"trident"===s&&(d=r(/trident\/[\d.]+/gi));let c="unknow";"chrome"===a?c=r(/chrome\/[\d.]+/gi):"safari"===a?c=r(/version\/[\d.]+/gi):"firefox"===a?c=r(/firefox\/[\d.]+/gi):"opera"===a?c=r(/opr\/[\d.]+/gi):"iexplore"===a?c=r(/(msie [\d.]+)|(rv:[\d.]+)/gi):"edge"===a&&(c=r(/edge\/[\d.]+/gi));let u="none",p="unknow";return t(/micromessenger/gi)?(u="wechat",p=r(/micromessenger\/[\d.]+/gi)):t(/qqbrowser/gi)?(u="qq",p=r(/qqbrowser\/[\d.]+/gi)):t(/ubrowser/gi)?(u="uc",p=r(/ubrowser\/[\d.]+/gi)):t(/2345explorer/gi)?(u="2345",p=r(/2345explorer\/[\d.]+/gi)):t(/metasr/gi)?u="sougou":t(/lbbrowser/gi)?u="liebao":t(/maxthon/gi)?(u="maxthon",p=r(/maxthon\/[\d.]+/gi)):t(/bidubrowser/gi)&&(u="baidu",p=r(/bidubrowser [\d.]+/gi)),Object.assign({engine:s,engineVs:d,platform:i,supporter:a,supporterVs:c,system:o,systemVs:n},"none"===u?{}:{shell:u,shellVs:p})})(),this}getWebPerformance(){this.isRunInit&&(window.onload=()=>{const e=setTimeout(()=>{clearTimeout(e),this.reportPerformance(this.getTiming(),this.getEnteries())},0)})}getTiming(){const e=window.performance.timing;return{dnst:e.domainLookupEnd-e.domainLookupStart||0,tcpt:e.connectEnd-e.connectStart||0,writet:e.responseStart-e.navigationStart||0,domt:e.domContentLoadedEventEnd-e.navigationStart||0,loadt:e.loadEventEnd-e.navigationStart||0,readyt:e.fetchStart-e.navigationStart||0,redt:e.redirectEnd-e.redirectStart||0,unloadt:e.unloadEventEnd-e.unloadEventStart||0,reqt:e.responseEnd-e.requestStart||0,andt:e.domComplete-e.domInteractive||0}}getEnteries(){const e=window.performance.getEntriesByType("resource"),t=[],r=[],n=[],i=[],s=[];return e.map(e=>{const a={name:e.name,tcpTime:e.connectEnd-e.connectStart,duration:e.duration};switch(o(e.name)){case"image":t.push(a);break;case"javascript":r.push(a);break;case"css":n.push(a);break;case"video":i.push(a);break;case"others":s.push(a)}}),{js:r,css:n,image:t,video:i,others:s}}caughtError(){window.addEventListener("error",e=>{switch(e.type){case"error":e instanceof ErrorEvent?this.reportCaughtError(e):this.reportResourceError(e)}},!0),window.addEventListener("unhandledrejection",e=>(e.preventDefault(),this.reportPromiseError(e),!0))}resetXmlHttp(){if(!window.XMLHttpRequest)return;const e=window.XMLHttpRequest,t=e.prototype.open,r=this;e.prototype.open=function(){const e={};e.method=arguments[0].toLocaleUpperCase();let o="";this.addEventListener("loadstart",()=>{o=(new Date).getTime()});const n=t=>{const n=(new Date).getTime();e.duration=n-o,e.statusCode=t.target.status,e.requestUrl=t.target.responseURL,e.type=t.type,r.reportRequest(e)};return this.addEventListener("error",n),this.addEventListener("load",n),t.apply(this,arguments)}}resetFetch(){let e=window.fetch;const t=this;window.fetch=function(){const r=(new Date).getTime(),o={};return o.requestUrl=arguments[0],o.method=arguments[1].method.toLocaleUpperCase(),console.log(arguments),e.apply(this,arguments).then(e=>{const n=(new Date).getTime();return o.duration=n-r,o.statusCode=e.status,o.requestUrl=e.url,o.type=e.type,t.reportRequest(o),e}).catch(e=>{const n=(new Date).getTime();return o.duration=n-r,o.statusCode=0,o.type="error",t.reportRequest(o),e})}}reportRequest(e){this.report({...e},"request")}reportPerformance(e,t){this.report({perfamce:e,resource:t},"performance")}reportCaughtError(e){const{message:t,filename:r,error:{stack:o}}=e;this.report({filename:r,message:t,stack:o},"jsError")}reportResourceError(e){const t=e.target.src;this.report({jsUrl:t,type:e.type},"resourceError")}reportPromiseError(e){this.report({rejContent:JSON.stringify(e.reason)},"prmiseReject")}report(e,t){const r={userAgent:this.userAgent,location:location,appId:this.config.appId,data:e,type:t};console.log(r)}}).init({appId:"wmzy"})}]);