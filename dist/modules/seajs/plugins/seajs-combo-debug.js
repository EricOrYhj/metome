!function(){function r(r){var n=r.length;if(!(n<2)){b.comboSyntax&&(m=b.comboSyntax),b.comboMaxLength&&(x=b.comboMaxLength),b.comboSuffix&&(g=b.comboSuffix),v=b.comboExcludes;for(var t=[],o=0;o<n;o++){var a=r[o];if(!S[a]){var f=_.get(a);f.status<p&&!c(a)&&!l(a)&&t.push(a)}}t.length>1&&s(e(t))}}function n(r){r.requestUri=S[r.uri]||r.uri}function e(r){return o(t(r))}function t(r){for(var n={__KEYS:[]},e=0,t=r.length;e<t;e++)for(var o=r[e].replace("://","__").split("/"),a=n,s=0,f=o.length;s<f;s++){var u=o[s];a[u]||(a[u]={__KEYS:[]},a.__KEYS.push(u)),a=a[u]}return n}function o(r){for(var n=[],e=r.__KEYS,t=0,o=e.length;t<o;t++){for(var s=e[t],f=s,u=r[s],h=u.__KEYS;1===h.length;)f+="/"+h[0],u=u[h[0]],h=u.__KEYS;h.length&&n.push([f.replace("__","://"),a(u)])}return n}function a(r){for(var n=[],e=r.__KEYS,t=0,o=e.length;t<o;t++){var s=e[t],f=a(r[s]),u=f.length;if(u)for(var h=0;h<u;h++)n.push(s+"/"+f[h]);else n.push(s)}return n}function s(r){for(var n=0,e=r.length;n<e;n++)for(var t=r[n],o=t[0]+"/",a=h(t[1]),s=0,u=a.length;s<u;s++)f(o,a[s]);return S}function f(r,n){for(var e=[],t=0,o=n.length;t<o;t++)e[t]=n[t].replace(/\?.*$/,"");var a=r+m[0]+e.join(m[1]);g&&(a+=g);var s=a.length>x;if(n.length>1&&s){var h=u(n,x-(r+m[0]).length);f(r,h[0]),f(r,h[1])}else{if(s)throw new Error("The combo url is too long: "+a);for(var t=0,o=n.length;t<o;t++)S[r+n[t]]=a}}function u(r,n){for(var e=m[1],t=r[0],o=1,a=r.length;o<a;o++)if(t+=e+r[o],t.length>n)return[r.splice(0,o),r]}function h(r){for(var n=[],e={},t=0,o=r.length;t<o;t++){var a=r[t],s=i(a);s&&(e[s]||(e[s]=[])).push(a)}for(var f in e)e.hasOwnProperty(f)&&n.push(e[f]);return n}function i(r){var n=r.lastIndexOf(".");return n>=0?r.substring(n):""}function c(r){if(v)return v.test?v.test(r):v(r)}function l(r){var n=b.comboSyntax||["??",","],e=n[0],t=n[1];return e&&r.indexOf(e)>0||t&&r.indexOf(t)>0}var v,g,_=seajs.Module,p=_.STATUS.FETCHING,b=seajs.data,S=b.comboHash={},m=["??",","],x=2e3;if(seajs.on("load",r),seajs.on("fetch",n),b.test){var j=seajs.test||(seajs.test={});j.uris2paths=e,j.paths2hash=s}define("seajs/seajs-combo/1.0.1/seajs-combo-debug",[],{})}();