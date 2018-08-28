/*
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
(function(A){if(typeof define==="function"&&define.amd){define(["jquery"],A)}else{A((typeof(jQuery)!="undefined")?jQuery:window.Zepto)}}(function(F){var A={};A.fileapi=F("<input type='file'/>").get(0).files!==undefined;A.formdata=window.FormData!==undefined;var E=!!F.fn.prop;F.fn.attr2=function(){if(!E){return this.attr.apply(this,arguments)}var G=this.prop.apply(this,arguments);if((G&&G.jquery)||typeof G==="string"){return G}return this.attr.apply(this,arguments)};F.fn.ajaxSubmit=function(Y){if(!this.length){D("ajaxSubmit: skipping submit process - no element selected");return this}var N,W,G,M=this;if(typeof Y=="function"){Y={success:Y}}else{if(Y===undefined){Y={}}}N=Y.type||this.attr2("method");W=Y.url||this.attr2("action");G=(typeof W==="string")?F.trim(W):"";G=G||window.location.href||"";if(G){G=(G.match(/^([^#]+)/)||[])[1]}Y=F.extend(true,{url:G,success:F.ajaxSettings.success,type:N||F.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},Y);var K={};this.trigger("form-pre-serialize",[this,Y,K]);if(K.veto){D("ajaxSubmit: submit vetoed via form-pre-serialize trigger");return this}if(Y.beforeSerialize&&Y.beforeSerialize(this,Y)===false){D("ajaxSubmit: submit aborted via beforeSerialize callback");return this}var U=Y.traditional;if(U===undefined){U=F.ajaxSettings.traditional}var O=[];var d,P=this.formToArray(Y.semantic,O);if(Y.data){Y.extraData=Y.data;d=F.param(Y.data,U)}if(Y.beforeSubmit&&Y.beforeSubmit(P,this,Y)===false){D("ajaxSubmit: submit aborted via beforeSubmit callback");return this}this.trigger("form-submit-validate",[P,this,Y,K]);if(K.veto){D("ajaxSubmit: submit vetoed via form-submit-validate trigger");return this}var H=F.param(P,U);if(d){H=(H?(H+"&"+d):d)}if(Y.type.toUpperCase()=="GET"){Y.url+=(Y.url.indexOf("?")>=0?"&":"?")+H;Y.data=null}else{Y.data=H}var e=[];if(Y.resetForm){e.push(function(){M.resetForm()})}if(Y.clearForm){e.push(function(){M.clearForm(Y.includeHidden)})}if(!Y.dataType&&Y.target){var R=Y.success||function(){};e.push(function(h){var a=Y.replaceTarget?"replaceWith":"html";F(Y.target)[a](h).each(R,arguments)})}else{if(Y.success){e.push(Y.success)}}Y.success=function(m,j,k){var a=Y.context||this;for(var h=0,l=e.length;h<l;h++){e[h].apply(a,[m,j,k||M,M])}};if(Y.error){var Z=Y.error;Y.error=function(i,h,j){var a=Y.context||this;Z.apply(a,[i,h,j,M])}}if(Y.complete){var b=Y.complete;Y.complete=function(i,h){var a=Y.context||this;b.apply(a,[i,h,M])}}var S=F("input[type=file]:enabled",this).filter(function(){return F(this).val()!==""});var I=S.length>0;var T="multipart/form-data";var f=(M.attr("enctype")==T||M.attr("encoding")==T);var X=A.fileapi&&A.formdata;D("fileAPI :"+X);var L=(I||f)&&!X;var c;if(Y.iframe!==false&&(Y.iframe||L)){if(Y.closeKeepAlive){F.get(Y.closeKeepAlive,function(){c=Q(P)})}else{c=Q(P)}}else{if((I||f)&&X){c=g(P)}else{c=F.ajax(Y)}}M.removeData("jqxhr").data("jqxhr",c);for(var J=0;J<O.length;J++){O[J]=null}this.trigger("form-submit-notify",[this,Y]);return this;function V(j){var k=F.param(j,Y.traditional).split("&");var l=k.length;var h=[];var a,m;for(a=0;a<l;a++){k[a]=k[a].replace(/\+/g," ");m=k[a].split("=");h.push([decodeURIComponent(m[0]),decodeURIComponent(m[1])])}return h}function g(n){var m=new FormData();for(var j=0;j<n.length;j++){m.append(n[j].name,n[j].value)}if(Y.extraData){var l=V(Y.extraData);for(j=0;j<l.length;j++){if(l[j]){m.append(l[j][0],l[j][1])}}}Y.data=null;var k=F.extend(true,{},F.ajaxSettings,Y,{contentType:false,processData:false,cache:false,type:N||"POST"});if(Y.uploadProgress){k.xhr=function(){var a=F.ajaxSettings.xhr();if(a.upload){a.upload.addEventListener("progress",function(q){var i=0;var p=q.loaded||q.position;var o=q.total;if(q.lengthComputable){i=Math.ceil(p/o*100)}Y.uploadProgress(q,p,o,i)},false)}return a}}k.data=null;var h=k.beforeSend;k.beforeSend=function(i,a){if(Y.formData){a.data=Y.formData}else{a.data=m}if(h){h.call(this,i,a)}};return F.ajax(k)}function Q(j){var Ae=M[0],Aj,o,h,w,Ad,Aa,m,v,y,Ai,q,Al;var r=F.Deferred();r.abort=function(a){v.abort(a)};if(j){for(o=0;o<O.length;o++){Aj=F(O[o]);if(E){Aj.prop("disabled",false)}else{Aj.removeAttr("disabled")}}}h=F.extend(true,{},F.ajaxSettings,Y);h.context=h.context||h;Ad="jqFormIO"+(new Date().getTime());if(h.iframeTarget){Aa=F(h.iframeTarget);Ai=Aa.attr2("name");if(!Ai){Aa.attr2("name",Ad)}else{Ad=Ai}}else{Aa=F('<iframe name="'+Ad+'" src="'+h.iframeSrc+'" />');Aa.css({position:"absolute",top:"-1000px",left:"-1000px"})}m=Aa[0];v={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(n){var a=(n==="timeout"?"timeout":"aborted");D("aborting upload... "+a);this.aborted=1;try{if(m.contentWindow.document.execCommand){m.contentWindow.document.execCommand("Stop")}}catch(i){}Aa.attr("src",h.iframeSrc);v.error=a;if(h.error){h.error.call(h.context,v,a,n)}if(w){F.event.trigger("ajaxError",[v,h,a])}if(h.complete){h.complete.call(h.context,v,a)}}};w=h.global;if(w&&0===F.active++){F.event.trigger("ajaxStart")}if(w){F.event.trigger("ajaxSend",[v,h])}if(h.beforeSend&&h.beforeSend.call(h.context,v,h)===false){if(h.global){F.active--}r.reject();return r}if(v.aborted){r.reject();return r}y=Ae.clk;if(y){Ai=y.name;if(Ai&&!y.disabled){h.extraData=h.extraData||{};h.extraData[Ai]=y.value;if(y.type=="image"){h.extraData[Ai+".x"]=Ae.clk_x;h.extraData[Ai+".y"]=Ae.clk_y}}}var p=1;var x=2;function Ac(i){var n=null;try{if(i.contentWindow){n=i.contentWindow.document}}catch(a){D("cannot get iframe.contentWindow document: "+a)}if(n){return n}try{n=i.contentDocument?i.contentDocument:i.document}catch(a){D("cannot get iframe.contentDocument: "+a);n=i.document}return n}var Ak=F("meta[name=csrf-token]").attr("content");var k=F("meta[name=csrf-param]").attr("content");if(k&&Ak){h.extraData=h.extraData||{};h.extraData[k]=Ak}function Ab(){var Ao=M.attr2("target"),Ar=M.attr2("action"),As="multipart/form-data",At=M.attr("enctype")||M.attr("encoding")||As;Ae.setAttribute("target",Ad);if(!N||/post/i.test(N)){Ae.setAttribute("method","POST")}if(Ar!=h.url){Ae.setAttribute("action",h.url)}if(!h.skipEncodingOverride&&(!N||/post/i.test(N))){M.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"})}if(h.timeout){Al=setTimeout(function(){q=true;Ag(p)},h.timeout)}function An(){try{var n=Ac(m).readyState;D("state = "+n);if(n&&n.toLowerCase()=="uninitialized"){setTimeout(An,50)}}catch(a){D("Server abort: ",a," (",a.name,")");Ag(x);if(Al){clearTimeout(Al)}Al=undefined}}var Ap=[];try{if(h.extraData){for(var Aq in h.extraData){if(h.extraData.hasOwnProperty(Aq)){if(F.isPlainObject(h.extraData[Aq])&&h.extraData[Aq].hasOwnProperty("name")&&h.extraData[Aq].hasOwnProperty("value")){Ap.push(F('<input type="hidden" name="'+h.extraData[Aq].name+'">').val(h.extraData[Aq].value).appendTo(Ae)[0])}else{Ap.push(F('<input type="hidden" name="'+Aq+'">').val(h.extraData[Aq]).appendTo(Ae)[0])}}}}if(!h.iframeTarget){Aa.appendTo("body")}if(m.attachEvent){m.attachEvent("onload",Ag)}else{m.addEventListener("load",Ag,false)}setTimeout(An,15);try{Ae.submit()}catch(i){var s=document.createElement("form").submit;s.apply(Ae)}}finally{Ae.setAttribute("action",Ar);Ae.setAttribute("enctype",At);if(Ao){Ae.setAttribute("target",Ao)}else{M.removeAttr("target")}F(Ap).remove()}}if(h.forceSync){Ab()}else{setTimeout(Ab,10)}var Af,z,l=50,u;function Ag(a){if(v.aborted||u){return}z=Ac(m);if(!z){D("cannot access response document");a=x}if(a===p&&v){v.abort("timeout");r.reject(v,"timeout");return}else{if(a==x&&v){v.abort("server abort");r.reject(v,"error","server abort");return}}if(!z||z.location.href==h.iframeSrc){if(!q){return}}if(m.detachEvent){m.detachEvent("onload",Ag)}else{m.removeEventListener("load",Ag,false)}var Aq="success",Ar;try{if(q){throw"timeout"}var At=h.dataType=="xml"||z.XMLDocument||F.isXMLDoc(z);D("isXml="+At);if(!At&&window.opera&&(z.body===null||!z.body.innerHTML)){if(--l){D("requeing onLoad callback, DOM not available");setTimeout(Ag,250);return}}var As=z.body?z.body:z.documentElement;v.responseText=As?As.innerHTML:null;v.responseXML=z.XMLDocument?z.XMLDocument:z;if(At){h.dataType="xml"}v.getResponseHeader=function(Av){var Au={"content-type":h.dataType};return Au[Av.toLowerCase()]};if(As){v.status=Number(As.getAttribute("status"))||v.status;v.statusText=As.getAttribute("statusText")||v.statusText}var s=(h.dataType||"").toLowerCase();var Ap=/(json|script|text)/.test(s);if(Ap||h.textarea){var Ao=z.getElementsByTagName("textarea")[0];if(Ao){v.responseText=Ao.value;v.status=Number(Ao.getAttribute("status"))||v.status;v.statusText=Ao.getAttribute("statusText")||v.statusText}else{if(Ap){var i=z.getElementsByTagName("pre")[0];var n=z.getElementsByTagName("body")[0];if(i){v.responseText=i.textContent?i.textContent:i.innerText}else{if(n){v.responseText=n.textContent?n.textContent:n.innerText}}}}}else{if(s=="xml"&&!v.responseXML&&v.responseText){v.responseXML=t(v.responseText)}}try{Af=Ah(v,s,h)}catch(An){Aq="parsererror";v.error=Ar=(An||Aq)}}catch(An){D("error caught: ",An);Aq="error";v.error=Ar=(An||Aq)}if(v.aborted){D("upload aborted");Aq=null}if(v.status){Aq=(v.status>=200&&v.status<300||v.status===304)?"success":"error"}if(Aq==="success"){if(h.success){h.success.call(h.context,Af,"success",v)}r.resolve(v.responseText,"success",v);if(w){F.event.trigger("ajaxSuccess",[v,h])}}else{if(Aq){if(Ar===undefined){Ar=v.statusText}if(h.error){h.error.call(h.context,v,Aq,Ar)}r.reject(v,"error",Ar);if(w){F.event.trigger("ajaxError",[v,h,Ar])}}}if(w){F.event.trigger("ajaxComplete",[v,h])}if(w&&!--F.active){F.event.trigger("ajaxStop")}if(h.complete){h.complete.call(h.context,v,Aq)}u=true;if(h.timeout){clearTimeout(Al)}setTimeout(function(){if(!h.iframeTarget){Aa.remove()}else{Aa.attr("src",h.iframeSrc)}v.responseXML=null},100)}var t=F.parseXML||function(a,i){if(window.ActiveXObject){i=new ActiveXObject("Microsoft.XMLDOM");i.async="false";i.loadXML(a)}else{i=(new DOMParser()).parseFromString(a,"text/xml")}return(i&&i.documentElement&&i.documentElement.nodeName!="parsererror")?i:null};var Am=F.parseJSON||function(a){return window["eval"]("("+a+")")};var Ah=function(An,a,i){var Ao=An.getResponseHeader("content-type")||"",n=a==="xml"||!a&&Ao.indexOf("xml")>=0,Ap=n?An.responseXML:An.responseText;if(n&&Ap.documentElement.nodeName==="parsererror"){if(F.error){F.error("parsererror")}}if(i&&i.dataFilter){Ap=i.dataFilter(Ap,a)}if(typeof Ap==="string"){if(a==="json"||!a&&Ao.indexOf("json")>=0){Ap=Am(Ap)}else{if(a==="script"||!a&&Ao.indexOf("javascript")>=0){F.globalEval(Ap)}}}return Ap};return r}};F.fn.ajaxForm=function(H){H=H||{};H.delegation=H.delegation&&F.isFunction(F.fn.on);if(!H.delegation&&this.length===0){var G={s:this.selector,c:this.context};if(!F.isReady&&G.s){D("DOM not ready, queuing ajaxForm");F(function(){F(G.s,G.c).ajaxForm(H)});return this}D("terminating; zero elements found by selector"+(F.isReady?"":" (DOM not ready)"));return this}if(H.delegation){F(document).off("submit.form-plugin",this.selector,C).off("click.form-plugin",this.selector,B).on("submit.form-plugin",this.selector,H,C).on("click.form-plugin",this.selector,H,B);return this}return this.ajaxFormUnbind().bind("submit.form-plugin",H,C).bind("click.form-plugin",H,B)};function C(G){var H=G.data;if(!G.isDefaultPrevented()){G.preventDefault();F(G.target).ajaxSubmit(H)}}function B(H){var K=H.target;var J=F(K);if(!(J.is("[type=submit],[type=image]"))){var L=J.closest("[type=submit]");if(L.length===0){return}K=L[0]}var I=this;I.clk=K;if(K.type=="image"){if(H.offsetX!==undefined){I.clk_x=H.offsetX;I.clk_y=H.offsetY}else{if(typeof F.fn.offset=="function"){var G=J.offset();I.clk_x=H.pageX-G.left;I.clk_y=H.pageY-G.top}else{I.clk_x=H.pageX-K.offsetLeft;I.clk_y=H.pageY-K.offsetTop}}}setTimeout(function(){I.clk=I.clk_x=I.clk_y=null},100)}F.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")};F.fn.formToArray=function(Q,O){var P=[];if(this.length===0){return P}var T=this[0];var I=this.attr("id");var G=Q?T.getElementsByTagName("*"):T.elements;var R;if(G&&!/MSIE [678]/.test(navigator.userAgent)){G=F(G).get()}if(I){R=F(':input[form="'+I+'"]').get();if(R.length){G=(G||[]).concat(R)}}if(!G||!G.length){return P}var M,K,N,H,V,U,S;for(M=0,U=G.length;M<U;M++){V=G[M];N=V.name;if(!N||V.disabled){continue}if(Q&&T.clk&&V.type=="image"){if(T.clk==V){P.push({name:N,value:F(V).val(),type:V.type});P.push({name:N+".x",value:T.clk_x},{name:N+".y",value:T.clk_y})}continue}H=F.fieldValue(V,true);if(H&&H.constructor==Array){if(O){O.push(V)}for(K=0,S=H.length;K<S;K++){P.push({name:N,value:H[K]})}}else{if(A.fileapi&&V.type=="file"){if(O){O.push(V)}var L=V.files;if(L.length){for(K=0;K<L.length;K++){P.push({name:N,value:L[K],type:V.type})}}else{P.push({name:N,value:"",type:V.type})}}else{if(H!==null&&typeof H!="undefined"){if(O){O.push(V)}P.push({name:N,value:H,type:V.type,required:V.required})}}}}if(!Q&&T.clk){var J=F(T.clk),W=J[0];N=W.name;if(N&&!W.disabled&&W.type=="image"){P.push({name:N,value:J.val()});P.push({name:N+".x",value:T.clk_x},{name:N+".y",value:T.clk_y})}}return P};F.fn.formSerialize=function(G){return F.param(this.formToArray(G))};F.fn.fieldSerialize=function(G){var H=[];this.each(function(){var J=this.name;if(!J){return}var K=F.fieldValue(this,G);if(K&&K.constructor==Array){for(var I=0,L=K.length;I<L;I++){H.push({name:J,value:K[I]})}}else{if(K!==null&&typeof K!="undefined"){H.push({name:this.name,value:K})}}});return F.param(H)};F.fn.fieldValue=function(G){for(var K=[],H=0,L=this.length;H<L;H++){var I=this[H];var J=F.fieldValue(I,G);if(J===null||typeof J=="undefined"||(J.constructor==Array&&!J.length)){continue}if(J.constructor==Array){F.merge(K,J)}else{K.push(J)}}return K};F.fieldValue=function(L,Q){var N=L.name,I=L.type,H=L.tagName.toLowerCase();if(Q===undefined){Q=true}if(Q&&(!N||L.disabled||I=="reset"||I=="button"||(I=="checkbox"||I=="radio")&&!L.checked||(I=="submit"||I=="image")&&L.form&&L.form.clk!=L||H=="select"&&L.selectedIndex==-1)){return null}if(H=="select"){var G=L.selectedIndex;if(G<0){return null}var R=[],K=L.options;var J=(I=="select-one");var S=(J?G+1:K.length);for(var M=(J?G:0);M<S;M++){var P=K[M];if(P.selected){var O=P.value;if(!O){O=(P.attributes&&P.attributes.value&&!(P.attributes.value.specified))?P.text:P.value}if(J){return O}R.push(O)}}return R}return F(L).val()};F.fn.clearForm=function(G){return this.each(function(){F("input,select,textarea",this).clearFields(G)})};F.fn.clearFields=F.fn.clearInputs=function(G){var H=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var J=this.type,I=this.tagName.toLowerCase();if(H.test(J)||I=="textarea"){this.value=""}else{if(J=="checkbox"||J=="radio"){this.checked=false}else{if(I=="select"){this.selectedIndex=-1}else{if(J=="file"){if(/MSIE/.test(navigator.userAgent)){F(this).replaceWith(F(this).clone(true))}else{F(this).val("")}}else{if(G){if((G===true&&/hidden/.test(J))||(typeof G=="string"&&F(this).is(G))){this.value=""}}}}}}})};F.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=="function"||(typeof this.reset=="object"&&!this.reset.nodeType)){this.reset()}})};F.fn.enable=function(G){if(G===undefined){G=true}return this.each(function(){this.disabled=!G})};F.fn.selected=function(G){if(G===undefined){G=true}return this.each(function(){var I=this.type;if(I=="checkbox"||I=="radio"){this.checked=G}else{if(this.tagName.toLowerCase()=="option"){var H=F(this).parent("select");if(G&&H[0]&&H[0].type=="select-one"){H.find("option").selected(false)}this.selected=G}}})};F.fn.ajaxSubmit.debug=false;function D(){if(!F.fn.ajaxSubmit.debug){return}var G="[jquery.form] "+Array.prototype.join.call(arguments,"");if(window.console&&window.console.log){window.console.log(G)}else{if(window.opera&&window.opera.postError){window.opera.postError(G)}}}}));