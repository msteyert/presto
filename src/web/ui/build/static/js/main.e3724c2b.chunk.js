(this.webpackJsonpui=this.webpackJsonpui||[]).push([[0],{212:function(e,t,n){e.exports=n(365)},217:function(e,t,n){},309:function(e,t,n){},365:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(37),l=n.n(c),o=(n(217),n(198)),s=function(){return r.a.createElement(o.a,{secondary:!0,pointing:!0,style:{position:"sticky",top:0,backgroundColor:"#f3f4f5",zIndex:2,marginBottom:0}},r.a.createElement(o.a.Item,{name:"Home",active:!0}),r.a.createElement(o.a.Item,{name:"Instructions"}),r.a.createElement(o.a.Item,{name:"Examples"}))},u=n(199),i=(n(309),n(310),n(9)),p=n.n(i),m=n(11),d=n(8),f=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a,r,c,l,o,s){var u;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/rt"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a,pam:r,minPbs:c,maxPbs:l,minRt:o,maxRt:s})});case 2:return u=e.sent,e.next=5,u.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a,r,c,l,o,s){return e.apply(this,arguments)}}(),b=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a,r,c,l,o,s){var u;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/pbs"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a,pam:r,minPbs:c,maxPbs:l,minRt:o,maxRt:s})});case 2:return u=e.sent,e.next=5,u.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a,r,c,l,o,s){return e.apply(this,arguments)}}(),h=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a,r,c,l,o,s){var u;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/pe3"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a,pam:r,minPbs:c,maxPbs:l,minRt:o,maxRt:s})});case 2:return u=e.sent,e.next=5,u.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a,r,c,l,o,s){return e.apply(this,arguments)}}(),g=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a,r,c,l,o,s){var u;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/mutSeq"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a,pam:r,minPbs:c,maxPbs:l,minRt:o,maxRt:s})});case 2:return u=e.sent,e.next=5,u.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a,r,c,l,o,s){return e.apply(this,arguments)}}(),v=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a,r,c,l,o,s){var u;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/cleanWtSeq"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a,pam:r,minPbs:c,maxPbs:l,minRt:o,maxRt:s})});case 2:return u=e.sent,e.next=5,u.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a,r,c,l,o,s){return e.apply(this,arguments)}}(),E=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/pegrna"),{method:"post",body:JSON.stringify({spacer:t,rtt:n,pbs:a})});case 2:return r=e.sent,e.next=5,r.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),O=function(){var e=Object(m.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/sgrna"),{method:"post",body:JSON.stringify({pe3:t})});case 2:return n=e.sent,e.next=5,n.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),x=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){var r,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/spacers"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:"",pam:a})});case 2:return r=e.sent,e.next=5,r.json();case 5:return c=e.sent,e.abrupt("return",c);case 7:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),w=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a,r,c,l,o,s){var u;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/warnings"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a,pam:r,minPbs:c,maxPbs:l,minRt:o,maxRt:s})});case 2:return u=e.sent,e.next=5,u.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a,r,c,l,o,s){return e.apply(this,arguments)}}(),S=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a,r,c,l,o,s){var u,i,m,d,f;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/csv"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a,pam:r,minPbs:c,maxPbs:l,minRt:o,maxRt:s})});case 2:return u=e.sent,e.next=5,u.text();case 5:i=e.sent,m=window.URL.createObjectURL(new Blob([i])),(d=document.createElement("a")).id="download",d.href=m,d.setAttribute("download",u.headers.get("FileName")||"presto.csv"),document.body.appendChild(d),d.click(),(f=document.querySelector("#download"))&&f.parentNode&&f.parentNode.removeChild(f);case 15:case"end":return e.stop()}}),e)})));return function(t,n,a,r,c,l,o,s){return e.apply(this,arguments)}}(),C=n(182),y=Object(C.a)({wtSeq:"",mut:"",spacer:"",customSpacer:"",pam:"NGG",minPbs:8,maxPbs:18,minRt:9,maxRt:16,templateOptions:[],selectedTemplateOption:null,spacerOptions:[],selectedSpacerOption:null,pbsOptions:[],selectedPbsOption:null,pe3bOptions:[],pe3Options:[],selectedPe3Option:null,selectedPe3bOption:null,cleanWtSeq:"",cleanMutSeq:"",step:0,pegRNA:"",pe3sgRNA:{sense:"",antisense:""},pe3bsgRNA:{sense:"",antisense:""},warnings:{general:[],pegRna:[],pe3:[]},step2Loading:!1,step3Loading:!1}),R=y.useGlobalState,j=y.getGlobalState;function P(){var e=R("templateOptions"),t=Object(d.a)(e,2),n=t[0],a=t[1],r=R("wtSeq"),c=Object(d.a)(r,2),l=c[0],o=c[1],s=R("mut"),u=Object(d.a)(s,2),i=u[0],g=u[1],v=R("spacer"),x=Object(d.a)(v,2),S=x[0],C=x[1],y=R("pam"),P=Object(d.a)(y,2),k=P[0],q=P[1],N=R("minPbs"),A=Object(d.a)(N,2),U=A[0],I=A[1],M=R("maxPbs"),T=Object(d.a)(M,2),B=T[0],G=T[1],L=R("minRt"),F=Object(d.a)(L,2),D=F[0],J=F[1],W=R("maxRt"),z=Object(d.a)(W,2),V=z[0],H=z[1],K=R("pbsOptions"),Q=Object(d.a)(K,2),X=Q[0],Y=Q[1],Z=R("pe3bOptions"),$=Object(d.a)(Z,2),_=$[0],ee=$[1],te=R("pe3Options"),ne=Object(d.a)(te,2),ae=ne[0],re=ne[1],ce=R("pegRNA"),le=Object(d.a)(ce,2),oe=le[0],se=le[1],ue=R("pe3sgRNA"),ie=Object(d.a)(ue,2),pe=ie[0],me=ie[1],de=R("pe3bsgRNA"),fe=Object(d.a)(de,2),be=fe[0],he=fe[1],ge=R("selectedSpacerOption"),ve=Object(d.a)(ge,2),Ee=ve[0],Oe=ve[1],xe=R("selectedTemplateOption"),we=Object(d.a)(xe,2),Se=we[0],Ce=we[1],ye=R("selectedPbsOption"),Re=Object(d.a)(ye,2),je=(Re[0],Re[1]),Pe=R("selectedPe3Option"),ke=Object(d.a)(Pe,2),qe=(ke[0],ke[1]),Ne=R("selectedPe3bOption"),Ae=Object(d.a)(Ne,2),Ue=(Ae[0],Ae[1]),Ie=R("warnings"),Me=Object(d.a)(Ie,2),Te=Me[0],Be=Me[1];function Ge(){return(Ge=Object(m.a)(p.a.mark((function e(t,n,r,c,l,s,u,i){var m;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=a,e.next=3,f(t.toUpperCase(),n.toUpperCase(),r.toUpperCase(),c.toUpperCase(),l,s,u,i);case 3:return e.t1=e.sent,(0,e.t0)(e.t1),e.t2=Be,e.next=8,w(t.toUpperCase(),n.toUpperCase(),r.toUpperCase(),c.toUpperCase(),l,s,u,i);case 8:return e.t3=e.sent,(0,e.t2)(e.t3),o(t.toUpperCase()),g(n.toUpperCase()),C(r.toUpperCase()),q(c.toUpperCase()),I(l),G(s),J(u),H(i),j("templateOptions").length>0&&Ce(j("templateOptions")[0].rt),e.t4=Y,e.next=22,b(t.toUpperCase(),n.toUpperCase(),r.toUpperCase(),c.toUpperCase(),l,s,u,i);case 22:return e.t5=e.sent,(0,e.t4)(e.t5),j("pbsOptions").length>0&&je(j("pbsOptions")[0].pbs),e.next=27,h(t.toUpperCase(),n.toUpperCase(),r.toUpperCase(),c.toUpperCase(),l,s,u,i);case 27:m=e.sent,ee(m.filter((function(e){return"pe3b"===e.type}))),j("pe3bOptions").length>0&&Ue(j("pe3bOptions")[0].secondGuide),re(m.filter((function(e){return"pe3"===e.type}))),j("pe3Options").length>0&&qe(j("pe3Options")[0].secondGuide),Le(),De();case 34:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Le(){return Fe.apply(this,arguments)}function Fe(){return(Fe=Object(m.a)(p.a.mark((function e(){var t,n,a,r,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=j("spacer"),n=j("selectedTemplateOption"),a=j("selectedPbsOption"),!n||!a){e.next=9;break}return e.next=6,E(t.toUpperCase(),n.toUpperCase(),a.toUpperCase());case 6:r=e.sent,c=r.sequence,se(c);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function De(){return Je.apply(this,arguments)}function Je(){return(Je=Object(m.a)(p.a.mark((function e(){var t,n,a,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=j("selectedPe3Option"),n=j("selectedPe3bOption"),!t){e.next=7;break}return e.next=5,O(t.toUpperCase());case 5:a=e.sent,me(a);case 7:if(!n){e.next=12;break}return e.next=10,O(n.toUpperCase());case 10:r=e.sent,he(r);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return{wtSeq:l,mut:i,spacer:S,pam:k,minPbs:U,maxPbs:B,minRt:D,maxRt:V,templateOptions:n,pbsOptions:X,pe3bOptions:_,pe3Options:ae,pegRNA:oe,pe3sgRNA:pe,pe3bsgRNA:be,warnings:Te,setSpacer:C,selectedTemplateOption:Se,updateSelectedTemplateOption:function(e){Ce(e),Le()},updateSelectedPbsOption:function(e){je(e),Le()},updateSelectedPe3Option:function(e){qe(e),De()},updateSelectedPe3bOption:function(e){Ue(e),De()},updateSequencePredictions:function(e,t,n,a,r,c,l,o){return Ge.apply(this,arguments)},updatePegRNA:Le,updateSgRNA:De,selectedSpacerOption:Ee,setSelectedSpacerOption:Oe}}function k(){var e=R("wtSeq"),t=Object(d.a)(e,2);return{wtSeq:t[0],setWtSeq:t[1]}}function q(){var e=R("mut"),t=Object(d.a)(e,2);return{mut:t[0],setMut:t[1]}}function N(){var e=R("pam"),t=Object(d.a)(e,2);return{pam:t[0],setPam:t[1]}}function A(){var e=R("minPbs"),t=Object(d.a)(e,2);return{minPbs:t[0],setMinPbs:t[1]}}function U(){var e=R("maxPbs"),t=Object(d.a)(e,2);return{maxPbs:t[0],setMaxPbs:t[1]}}function I(){var e=R("minRt"),t=Object(d.a)(e,2);return{minRt:t[0],setMinRt:t[1]}}function M(){var e=R("maxRt"),t=Object(d.a)(e,2);return{maxRt:t[0],setMaxRt:t[1]}}function T(){var e=R("spacerOptions"),t=Object(d.a)(e,2);return{spacerOptions:t[0],setSpacerOptions:t[1]}}function B(){var e=R("step"),t=Object(d.a)(e,2);return{step:t[0],setStep:t[1]}}function G(){var e=R("step3Loading"),t=Object(d.a)(e,2);return{step3Loading:t[0],setStep3Loading:t[1]}}var L=n(124),F=n(31),D=n(38),J=n(21),W=n(48),z=n(49),V=n(51),H=n(50),K=n(374),Q=n(373),X=function(e){Object(V.a)(n,e);var t=Object(H.a)(n);function n(){var e;Object(W.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={wtSeq:"",mut:"",customSpacer:"",pam:"NGG",minPbs:"8",maxPbs:"18",minRt:"9",maxRt:"16",showAdvanced:!1},e.handleChange=function(t,n){var a=n.name,r=n.value;e.setState((function(t){var n=Object(J.a)(Object(J.a)({},t),{},Object(D.a)({},a,r));return e.calcRtRange(n),n}))},e.handleRTChange=function(t,n){var a=n.name,r=n.value;return e.setState((function(e){return Object(J.a)(Object(J.a)({},e),{},Object(D.a)({},a,r))}))},e.handleSubmit=Object(m.a)(p.a.mark((function t(){var n,a,r,c,l,o,s,u,i;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=e.state,a=n.wtSeq,r=n.mut,c=n.customSpacer,l=n.pam,o=n.minPbs,s=n.maxPbs,u=n.minRt,i=n.maxRt,e.props.onSubmit(a,r,c,l,parseInt(o),parseInt(s),parseInt(u),parseInt(i));case 2:case"end":return t.stop()}}),t)}))),e.handleAdvancedToggle=function(t){t.preventDefault(),e.setState((function(e){return{showAdvanced:!e.showAdvanced}}))},e.calcRtRange=function(t){var n=t.mut.length,a=9,r=16;n>4&&(a=n+6,r=n+16),n>8&&(a=n+8,r=n+22),n>20&&(a=n+10,r=n+30),e.setState((function(){return{minRt:a.toString(),maxRt:r.toString()}}))},e}return Object(z.a)(n,[{key:"render",value:function(){var e=this.state,t=e.wtSeq,n=e.mut,c=e.customSpacer,l=e.pam,o=e.minRt,s=e.maxRt,u=e.minPbs,i=e.maxPbs,p=e.showAdvanced;return r.a.createElement("div",null,r.a.createElement(K.a,{onSubmit:this.handleSubmit},r.a.createElement(K.a.Input,{label:"Wildtype sequence (parentheses around region to be mutated)",placeholder:"",name:"wtSeq",value:t,onChange:this.handleChange,required:!0}),r.a.createElement(K.a.Input,{label:"Mutation sequence (leave blank if performing deletion)",placeholder:"",name:"mut",value:n,onChange:this.handleChange}),p&&r.a.createElement(a.Fragment,null,r.a.createElement("h3",null,"Advanced Options"),r.a.createElement(Q.a,null),r.a.createElement(K.a.Input,{label:"Custom PE spacer sequence",placeholder:"",name:"customSpacer",value:c,onChange:this.handleChange}),r.a.createElement(K.a.Group,null,r.a.createElement(K.a.Input,{label:"PAM sequence (use IUPAC ambiguity as needed)",placeholder:"NGG",name:"pam",value:l,onChange:this.handleChange,required:!0}),r.a.createElement(K.a.Input,{label:"Min PBS length",placeholder:"8",name:"minPbs",value:u,onChange:this.handleChange,required:!0}),r.a.createElement(K.a.Input,{label:"Max PBS length",placeholder:"18",name:"maxPbs",value:i,onChange:this.handleChange,required:!0}),r.a.createElement(K.a.Input,{label:"Min RT length",placeholder:"8",name:"minRt",value:o,onChange:this.handleRTChange,required:!0}),r.a.createElement(K.a.Input,{label:"Max RT length",placeholder:"18",name:"maxRt",value:s,onChange:this.handleRTChange,required:!0}))),r.a.createElement(K.a.Group,null,r.a.createElement(K.a.Button,{content:"Next",loading:this.props.loading,primary:!0}),r.a.createElement(K.a.Button,{content:"".concat(p?"Hide":"Show"," Advanced Options"),onClick:this.handleAdvancedToggle}))))}}]),n}(a.Component),Y=function(){var e=P(),t=e.setSpacer,n=e.setSelectedSpacerOption,a=k().setWtSeq,c=q().setMut,l=function(){var e=R("customSpacer"),t=Object(d.a)(e,2);return{customSpacer:t[0],setCustomSpacer:t[1]}}().setCustomSpacer,o=N().setPam,s=A().setMinPbs,u=U().setMaxPbs,i=I().setMinRt,f=M().setMaxRt,b=B().setStep,h=T(),g=h.spacerOptions,v=h.setSpacerOptions,E=function(){var e=R("step2Loading"),t=Object(d.a)(e,2);return{step2Loading:t[0],setStep2Loading:t[1]}}(),O=E.setStep2Loading,w=E.step2Loading;function S(){return(S=Object(m.a)(p.a.mark((function e(r,m,d,h,E,w,S,C){var y,R,j;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return O(!0),""!==d&&(t(d.toUpperCase()),y={spacer:d.toUpperCase(),cutToMut:null,quality:null},n(y),v([y])),e.next=4,x(r,m,h);case 4:R=e.sent,j=[].concat(Object(F.a)(g),Object(F.a)(R)),v(j),n(j[0]),a(r),c(m),l(d),t(j[0].spacer),o(h),s(E),u(w),i(S),f(C),b(1),setTimeout((function(){var e=document.getElementById("step-2-container");e&&e.scrollIntoView({behavior:"smooth"}),O(!1)}),0);case 19:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return r.a.createElement(X,{onSubmit:function(e,t,n,a,r,c,l,o){return S.apply(this,arguments)},loading:w})},Z=function(){var e=B().step;return r.a.createElement(a.Fragment,null,r.a.createElement("div",{style:{height:40}}),r.a.createElement(u.a.Row,null,r.a.createElement(u.a.Column,{width:14},r.a.createElement("div",{id:"step-1-container"},r.a.createElement(L.a,{color:0===e?"grey":void 0},r.a.createElement("h2",null,"Start"),r.a.createElement(Y,null))))))},$=n(375),_=function(e){Object(V.a)(n,e);var t=Object(H.a)(n);function n(){var e;Object(W.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={value:e.props.options.length>0?e.props.options[0]:""},e.handleChange=function(t,n){var a=n.value;e.setState({value:a}),e.props.onChange(a)},e}return Object(z.a)(n,[{key:"render",value:function(){var e=this.state.value;return r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},this.props.title,r.a.createElement($.a,{onChange:this.handleChange,options:this.props.options.map((function(e){return{key:e,text:e,value:e}})),placeholder:"Choose an option",value:e,selection:!0,scrolling:!0}))}}]),n}(a.Component);_.defaultProps={options:[],onChange:function(e){}};var ee=function(e,t,n,a){return function(r){e(r),a>=2&&(t(1),setTimeout((function(){n()}),0))}},te=function(e){var t=e.onSubmit,n=T().spacerOptions,a=P().setSpacer,c=G().step3Loading,l=B(),o=l.step,s=l.setStep;return r.a.createElement("div",null,r.a.createElement(K.a,{onSubmit:t},r.a.createElement(_,{title:"",options:n.map((function(e){return e.spacer})),onChange:ee(a,s,t,o)}),r.a.createElement("div",{style:{height:15}}),r.a.createElement(K.a.Button,{content:"Next",loading:c,primary:!0})))},ne=function(){var e=P().updateSequencePredictions,t=function(){var e=R("cleanWtSeq"),t=Object(d.a)(e,2),n=t[0],a=t[1];function r(){return(r=Object(m.a)(p.a.mark((function e(t,n,r,c,l,o,s,u){var i,m;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v(t.toUpperCase(),n.toUpperCase(),r.toUpperCase(),c.toUpperCase(),l,o,s,u);case 2:i=e.sent,m=i.sequence,a(m);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return{cleanWtSeq:n,getCleanWtSeq:function(e,t,n,a,c,l,o,s){return r.apply(this,arguments)}}}().getCleanWtSeq,n=function(){var e=R("cleanMutSeq"),t=Object(d.a)(e,2),n=t[0],a=t[1];function r(){return(r=Object(m.a)(p.a.mark((function e(t,n,r,c,l,o,s,u){var i,m;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g(t.toUpperCase(),n.toUpperCase(),r.toUpperCase(),c.toUpperCase(),l,o,s,u);case 2:i=e.sent,m=i.sequence,a(m);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return{cleanMutSeq:n,getCleanMutSeq:function(e,t,n,a,c,l,o,s){return r.apply(this,arguments)}}}().getCleanMutSeq,a=B().setStep,c=k().wtSeq,l=q().mut,o=P().spacer,s=N().pam,u=A().minPbs,i=U().maxPbs,f=I().minRt,b=M().maxRt,h=G().setStep3Loading;function E(){return(E=Object(m.a)(p.a.mark((function r(){return p.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return h(!0),t(c,l,o,s,u,i,f,b),n(c,l,o,s,u,i,f,b),r.next=5,e(c,l,o,s,u,i,f,b);case 5:a(2),setTimeout((function(){var e=document.getElementById("step-3-container");e&&e.scrollIntoView({behavior:"smooth"}),h(!1)}),0);case 7:case"end":return r.stop()}}),r)})))).apply(this,arguments)}return r.a.createElement(te,{onSubmit:function(){return E.apply(this,arguments)}})},ae=function(){var e=B().step;return r.a.createElement(u.a.Row,null,r.a.createElement(u.a.Column,{width:14},r.a.createElement("div",{id:"step-2-container"},r.a.createElement(L.a,{color:1===e?"grey":void 0},r.a.createElement("h2",null,"Spacer"),r.a.createElement(ne,null)))))},re=n(381),ce=n(379),le=n(121),oe=function(){var e=P().warnings,t=e.general,n=e.pegRna,c=[].concat(Object(F.a)(t),Object(F.a)(n));return r.a.createElement(a.Fragment,null,c.length>0&&r.a.createElement(ce.a,{warning:!0},r.a.createElement(le.a,null,"Warning!"),c.map((function(e,t){return r.a.createElement("p",{key:"warning-".concat(t)},e)}))))},se=function(){var e=P().warnings,t=e.general,n=e.pe3,c=[].concat(Object(F.a)(t),Object(F.a)(n));return r.a.createElement(a.Fragment,null,c.length>0&&r.a.createElement(ce.a,{warning:!0},r.a.createElement(le.a,null,"Warning!"),c.map((function(e,t){return r.a.createElement("p",{key:"warning-".concat(t)},e)}))))},ue=function(){var e=P(),t=e.templateOptions,n=e.updateSelectedTemplateOption;return r.a.createElement(a.Fragment,null,t.length>0&&r.a.createElement(_,{title:"RT templates:",options:t.map((function(e){return e.rt})),onChange:n}))},ie=function(){var e=P(),t=e.pbsOptions,n=e.updateSelectedPbsOption;return r.a.createElement(a.Fragment,null,t.length>0&&r.a.createElement(_,{title:"Primer binding sites:",options:t.map((function(e){return e.pbs})),onChange:n}))},pe=function(){var e=P(),t=e.pe3bOptions,n=e.updateSelectedPe3bOption;return r.a.createElement(a.Fragment,null,t.length>0&&r.a.createElement(_,{title:"PE3b Guides:",options:t.map((function(e){return e.secondGuide})),onChange:n}))},me=function(){var e=P(),t=e.pe3Options,n=e.updateSelectedPe3Option;return r.a.createElement(a.Fragment,null,t.length>0&&r.a.createElement(_,{title:"PE3 Guides:",options:t.map((function(e){return e.secondGuide})),onChange:n}))},de=n(376),fe=n(55),be=n(192),he=n.n(be),ge=function(e){Object(V.a)(n,e);var t=Object(H.a)(n);function n(){var e;Object(W.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={helpText:"click to copy",isOpen:!1},e.handleCopy=function(){he()(e.props.value),e.setState((function(){return{helpText:"you're all set"}})),console.log("indicate"),setTimeout((function(){e.setState((function(){return{helpText:"click to copy"}}))}),1e3)},e.handleMouseOver=function(){e.setState((function(){return{isOpen:!0}}))},e.handleMouseLeave=function(){e.setState((function(){return{isOpen:!1}}))},e}return Object(z.a)(n,[{key:"render",value:function(){return r.a.createElement(de.a,{content:this.state.helpText,position:"top center",open:this.state.isOpen,trigger:r.a.createElement(fe.a,{name:"copy",onClick:this.handleCopy,onMouseOver:this.handleMouseOver,onMouseLeave:this.handleMouseLeave,link:!0})})}}]),n}(a.Component),ve=function(){var e=function(){var e=R("pegRNA"),t=Object(d.a)(e,2);return{pegRNA:t[0],setPegRNA:t[1]}}().pegRNA;return r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("div",null,"Final pegRNA:",r.a.createElement(ge,{value:e})),r.a.createElement("p",{style:{wordBreak:"break-word"}},e))},Ee=function(){var e=P().pe3Options,t=function(){var e=R("pe3sgRNA"),t=Object(d.a)(e,2);return{pe3sgRNA:t[0],setPe3SgRNA:t[1]}}().pe3sgRNA;return r.a.createElement(a.Fragment,null,e.length>0&&r.a.createElement(a.Fragment,null,r.a.createElement(u.a.Column,{width:8},r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("div",null,"sense sgRNA:",r.a.createElement(ge,{value:t.sense})),r.a.createElement("p",{style:{wordBreak:"break-word"}},t.sense))),r.a.createElement(u.a.Column,{width:8},r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("div",null,"antisense sgRNA:",r.a.createElement(ge,{value:t.antisense})),r.a.createElement("p",{style:{wordBreak:"break-word"}},t.antisense)))))},Oe=function(){var e=P().pe3bOptions,t=function(){var e=R("pe3bsgRNA"),t=Object(d.a)(e,2);return{pe3bsgRNA:t[0],setPe3bSgRNA:t[1]}}().pe3bsgRNA;return r.a.createElement(a.Fragment,null,e.length>0&&r.a.createElement(a.Fragment,null,r.a.createElement(u.a.Column,{width:8},r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("div",null,"sense sgRNA:",r.a.createElement(ge,{value:t.sense})),r.a.createElement("p",{style:{wordBreak:"break-word"}},t.sense))),r.a.createElement(u.a.Column,{width:8},r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("div",null,"antisense sgRNA:",r.a.createElement(ge,{value:t.antisense})),r.a.createElement("p",{style:{wordBreak:"break-word"}},t.antisense)))))},xe=[{menuItem:"pegRNA",textAlign:"left",render:function(){return r.a.createElement(re.a.Pane,null,r.a.createElement(oe,null),r.a.createElement(u.a,null,r.a.createElement(u.a.Row,null,r.a.createElement(u.a.Column,{width:8},r.a.createElement(ue,null)),r.a.createElement(u.a.Column,{width:8},r.a.createElement(ie,null))),r.a.createElement(u.a.Row,null,r.a.createElement(u.a.Column,{width:16},r.a.createElement(ve,null)))))}},{menuItem:"PE3",textAlign:"left",render:function(){return r.a.createElement(re.a.Pane,null,r.a.createElement(se,null),r.a.createElement(u.a,null,r.a.createElement(u.a.Row,null,r.a.createElement(u.a.Column,{width:16},r.a.createElement(me,null))),r.a.createElement(u.a.Row,null,r.a.createElement(Ee,null))))}},{menuItem:"PE3b",textAlign:"left",render:function(){return r.a.createElement(re.a.Pane,null,r.a.createElement(se,null),r.a.createElement(u.a,null,r.a.createElement(u.a.Row,null,r.a.createElement(u.a.Column,{width:16},r.a.createElement(pe,null))),r.a.createElement(u.a.Row,null,r.a.createElement(Oe,null))))}}],we=function(){return r.a.createElement(re.a,{panes:xe})},Se=n(380),Ce=function(){var e=P(),t=e.wtSeq,n=e.mut,a=e.spacer,c=e.pam,l=e.minPbs,o=e.maxPbs,s=e.minRt,u=e.maxRt;return r.a.createElement(Se.a,{onClick:function(){return S(t,n,a,c,l,o,s,u)},primary:!0},"Donwnload Full Results")},ye=function(){var e=B().step;return r.a.createElement(a.Fragment,null,r.a.createElement(u.a.Row,null,r.a.createElement(u.a.Column,{width:14},r.a.createElement("div",{id:"step-3-container"},r.a.createElement(L.a,{color:2===e?"grey":void 0},r.a.createElement("h2",null,"pegRNA"),r.a.createElement(we,null))))),r.a.createElement(u.a.Row,null,r.a.createElement(u.a.Column,{width:14},r.a.createElement(Ce,null))))},Re=n(378),je=function(e){return function(){var t=document.getElementById("step-".concat(e,"-container"));t&&t.scrollIntoView({block:"end",behavior:"smooth"})}},Pe=function(e){var t=e.step,n=void 0===t?0:t;return r.a.createElement(Re.a.Group,{ordered:!0,size:"small"},r.a.createElement(Re.a,{completed:n>0,active:0===n,onClick:je(1)},r.a.createElement(Re.a.Content,null,r.a.createElement(Re.a.Title,null,"Start"),r.a.createElement(Re.a.Description,null,"Enter Sequence information"))),r.a.createElement(Re.a,{completed:n>1,active:1===n,onClick:je(2)},r.a.createElement(Re.a.Content,null,r.a.createElement(Re.a.Title,null,"Spacer"),r.a.createElement(Re.a.Description,null,"Select your spacer"))),r.a.createElement(Re.a,{completed:n>2,active:2===n,onClick:je(3)},r.a.createElement(Re.a.Content,null,r.a.createElement(Re.a.Title,null,"pegRNA"),r.a.createElement(Re.a.Description,null,"Design your pegRNA"))),r.a.createElement(Re.a,{completed:n>3,active:3===n,onClick:je(4)},r.a.createElement(Re.a.Content,null,r.a.createElement(Re.a.Title,null,"PE3"),r.a.createElement(Re.a.Description,null,"Choose a PE3 sequence"))),r.a.createElement(Re.a,{completed:n>4,active:4===n,onClick:je(5)},r.a.createElement(Re.a.Content,null,r.a.createElement(Re.a.Title,null,"Cloning"),r.a.createElement(Re.a.Description,null,"Choose your cloning strategy"))))},ke=function(){var e=B().step;return r.a.createElement("div",{style:{position:"sticky",top:40,backgroundColor:"white",zIndex:1,borderBottom:"1px solid rgba(34,36,38,.15)"}},r.a.createElement(u.a.Row,null,r.a.createElement(u.a.Column,{width:14},r.a.createElement("div",{style:{display:"flex",justifyContent:"center"}},r.a.createElement(Pe,{step:e})))))};var qe=function(){var e=B().step;return r.a.createElement("div",{style:{position:"relative"}},r.a.createElement(s,null),r.a.createElement(ke,null),r.a.createElement(u.a,{centered:!0},r.a.createElement(Z,null),e>=1&&r.a.createElement(ae,null),e>=2&&r.a.createElement(ye,null)))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(qe,null)),document.getElementById("root"))}},[[212,1,2]]]);
//# sourceMappingURL=main.e3724c2b.chunk.js.map