(function(){var e,t;t="keyframeTimer";e="animation-play-state";$.frameCollection=[];$.keyframe={browserCode:function(){var e;e=navigator.userAgent;return e.indexOf("Opera")!==-1?"-o-":e.indexOf("MSIE")!==-1?"-ms-":e.indexOf("WebKit")!==-1?"-webkit-":navigator.product==="Gecko"?"-moz-":""},isSupported:function(){var e,t,n,r,i;n=document.getElementsByTagName("body")[0];t="animation";r="";i=this.browserCode();e=!1;if(n.style.animationName)e=!0;else{i=i.slice(1,-1);n.style[i+"AnimationName"]!==undefined&&(e=!0)}return e},generate:function(e){var t,n,r,i,s;t=$("<style>").attr({"class":"keyframe-style",id:e,type:"text/css"}).appendTo("head");n=this.browserCode();r="@"+n+"keyframes "+e+"{";for(s in $.frameCollection[e].data)if(s!=="name"){r+=s+"{";i=$.frameCollection[e].data;r+=i[s]+"}"}r+="}\n";return t.append(r)},add:function(e){var t,n,r,i,s,o;if(typeof e===Array){o=[];for(n=i=0,s=e.length;i<s;n=++i){t=e[n];r=t.name;t.name="";$.frameCollection[r]={data:t};o.push($.keyframe.generate(r))}return o}r=e.name;e.name="";$.frameCollection[r]={data:e};return $.keyframe.generate(r)}};$.fn.resetKeyframe=function(n){var r,i;i=$.keyframe.browserCode();r=$(this).css(i+e,"running");r.css(i+"animation","none");r.data("keyframe",!1);clearInterval(r.data(t));clearTimeout(r.data(t));if(n)return setTimeout(n,1)};$.fn.pauseKeyframe=function(){var n;n=$(this).css($.keyframe.browserCode()+e,"paused");clearInterval(n.data(t));return clearTimeout(n.data(t))};$.fn.resumeKeyframe=function(){return $(this).css($.keyframe.browserCode()+e,"running")};$.fn.extend({playKeyframe:function(n){var r,i,s,o,u,a,f,l;o={duration:0,timingFunction:"ease",delay:0,repeat:1,direction:"normal",fillMode:"forwards",complete:null};n=$.extend(o,n);f=n.name;a=n.duration;u=n.delay;l=n.repeat;typeof a!="string"&&(n.duration=n.duration+"ms");typeof u!="string"&&(n.delay=n.delay+"ms");r=""+f+" "+n.duration+" "+n.timingFunction+" "+n.delay+" "+l+" "+n.direction+" "+n.fillMode;s=n.complete;i=$.keyframe.browserCode()+"animation";return this.each(function(){var n,o=this;n=$(this).addClass("boostKeyframe");n.css($.keyframe.browserCode()+e,"running");n.data("keyframe",f);n.css(i,r);if(l!=="infinite"){s&&n.data(t,setTimeout(s,(a+u)*l));return setTimeout(function(){return n.data("keyframe",!1)},(a+u)*l)}if(s!=null)return n.data(t,setTimeout(function(){s();return n.data(t,setInterval(s,a))},a+u))})}});$("<style>").attr({"class":"keyframe-style",id:"boost-keyframe",type:"text/css"}).appendTo("head").append(" .boostKeyframe{"+browserType+"transform:scale3d(1,1,1);}")}).call(this);