define(function(e,t,n){return function(){function e(){var e={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"},t=/&(?!#?\w+;)|<|>|"|'|\//g;return function(){return this?this.replace(t,function(t){return e[t]||t}):this}}function t(e,n,r){return("string"==typeof n?n:n.toString()).replace(e.define||u,function(t,n,a,o){return 0===n.indexOf("def.")&&(n=n.substring(4)),n in r||(":"===a?(e.defineParams&&o.replace(e.defineParams,function(e,t,a){r[n]={arg:t,text:a}}),n in r||(r[n]=o)):new Function("def","def['"+n+"']="+o)(r)),""}).replace(e.use||u,function(n,a){e.useParams&&(a=a.replace(e.useParams,function(e,t,n,a){if(r[n]&&r[n].arg&&a){var o=(n+":"+a).replace(/'|\\/g,"_");return r.__exp=r.__exp||{},r.__exp[o]=r[n].text.replace(new RegExp("(^|[^\\w$])"+r[n].arg+"([^\\w$])","g"),"$1"+a+"$2"),t+"def.__exp['"+o+"']"}}));var o=new Function("def","return "+a)(r);return o?t(e,o,r):o})}function r(e){return e.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")}var a,o={version:"1.0.1",templateSettings:{evaluate:/(?:\{\{|<\%)([\s\S]+?\}?)(?:\}\}|\%\>)/g,interpolate:/(?:\{\{|<\%)=([\s\S]+?)(?:\}\}|\%\>)/g,encode:/(?:\{\{|<\%)!([\s\S]+?)(?:\}\}|\%\>)/g,use:/(?:\{\{|<\%)#([\s\S]+?)(?:\}\}|\%\>)/g,useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,define:/(?:\{\{|<\%)##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#(?:\}\}|\%\>)/g,defineParams:/^\s*([\w$]+):([\s\S]+)/,conditional:/(?:\{\{|<\%)\?(\?)?\s*([\s\S]*?)\s*(?:\}\}|\%\>)/g,iterate:/(?:\{\{|<\%)~\s*(?:(?:\}\}|\%\>)|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*(?:\}\}|\%\>))/g,varname:"it",strip:!0,append:!0,selfcontained:!1},template:void 0,compile:void 0};"undefined"!=typeof n&&n.exports?n.exports=o:"function"==typeof define&&define.amd?define(function(){return o}):(a=function(){return this||(0,eval)("this")}(),a.doT=o),String.prototype.encodeHTML=e();var i={append:{start:"'+(",end:")+'",endencode:"||'').toString().encodeHTML()+'"},split:{start:"';out+=(",end:");out+='",endencode:"||'').toString().encodeHTML();out+='"}},u=/$^/;o.template=function(n,a,c){a=a||o.templateSettings;var s,p,l=a.append?i.append:i.split,f=0,d=a.use||a.define?t(a,n,c||{}):n;d=("var out='"+(a.strip?d.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):d).replace(/'|\\/g,"\\$&").replace(a.interpolate||u,function(e,t){return l.start+r(t)+l.end}).replace(a.encode||u,function(e,t){return s=!0,l.start+r(t)+l.endencode}).replace(a.conditional||u,function(e,t,n){return t?n?"';}else if("+r(n)+"){out+='":"';}else{out+='":n?"';if("+r(n)+"){out+='":"';}out+='"}).replace(a.iterate||u,function(e,t,n,a){return t?(f+=1,p=a||"i"+f,t=r(t),"';var arr"+f+"="+t+";if(arr"+f+"){var "+n+","+p+"=-1,l"+f+"=arr"+f+".length-1;while("+p+"<l"+f+"){"+n+"=arr"+f+"["+p+"+=1];out+='"):"';} } out+='"}).replace(a.evaluate||u,function(e,t){return"';"+r(t)+"out+='"})+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|\}|^|\{)out\+='';/g,"$1").replace(/\+''/g,"").replace(/(\s|;|\}|^|\{)out\+=''\+/g,"$1out+="),s&&a.selfcontained&&(d="String.prototype.encodeHTML=("+e.toString()+"());"+d);try{return new Function(a.varname,d)}catch(e){throw"undefined"!=typeof console&&console.log("Could not create a template function: "+d),e}},o.compile=function(e,t){return o.template(e,null,t)}}()});