(this.webpackJsonpui=this.webpackJsonpui||[]).push([[0],{211:function(e,t,n){e.exports=n(364)},216:function(e,t,n){},308:function(e,t,n){},364:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(36),l=n.n(c),s=(n(216),n(197)),u=function(){return r.a.createElement(s.a,{secondary:!0,pointing:!0,style:{position:"sticky",top:0,backgroundColor:"white",zIndex:1}},r.a.createElement(s.a.Item,{name:"Home",active:!0}),r.a.createElement(s.a.Item,{name:"Instructions"}),r.a.createElement(s.a.Item,{name:"Examples"}))},o=n(198),i=(n(308),n(309),n(8)),p=n.n(i),m=n(11),d=n(9),f=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a,r,c,l,s,u){var o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/rt"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a,pam:r,minPbs:c,maxPbs:l,minRt:s,maxRt:u})});case 2:return o=e.sent,e.next=5,o.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a,r,c,l,s,u){return e.apply(this,arguments)}}(),h=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a,r,c,l,s,u){var o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/pbs"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a,pam:r,minPbs:c,maxPbs:l,minRt:s,maxRt:u})});case 2:return o=e.sent,e.next=5,o.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a,r,c,l,s,u){return e.apply(this,arguments)}}(),b=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a,r,c,l,s,u){var o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/pe3"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a,pam:r,minPbs:c,maxPbs:l,minRt:s,maxRt:u})});case 2:return o=e.sent,e.next=5,o.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a,r,c,l,s,u){return e.apply(this,arguments)}}(),g=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a,r,c,l,s,u){var o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/mutSeq"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a,pam:r,minPbs:c,maxPbs:l,minRt:s,maxRt:u})});case 2:return o=e.sent,e.next=5,o.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a,r,c,l,s,u){return e.apply(this,arguments)}}(),v=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a,r,c,l,s,u){var o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/cleanWtSeq"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a,pam:r,minPbs:c,maxPbs:l,minRt:s,maxRt:u})});case 2:return o=e.sent,e.next=5,o.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a,r,c,l,s,u){return e.apply(this,arguments)}}(),E=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/pegrna"),{method:"post",body:JSON.stringify({spacer:t,rtt:n,pbs:a})});case 2:return r=e.sent,e.next=5,r.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),O=function(){var e=Object(m.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/sgrna"),{method:"post",body:JSON.stringify({pe3:t})});case 2:return n=e.sent,e.next=5,n.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a,r,c,l,s,u){var o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/warnings"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a,pam:r,minPbs:c,maxPbs:l,minRt:s,maxRt:u})});case 2:return o=e.sent,e.next=5,o.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a,r,c,l,s,u){return e.apply(this,arguments)}}(),x=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a,r,c,l,s,u){var o,i,m,d,f;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/csv"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a,pam:r,minPbs:c,maxPbs:l,minRt:s,maxRt:u})});case 2:return o=e.sent,e.next=5,o.text();case 5:i=e.sent,m=window.URL.createObjectURL(new Blob([i])),(d=document.createElement("a")).id="download",d.href=m,d.setAttribute("download",o.headers.get("FileName")||"presto.csv"),document.body.appendChild(d),d.click(),(f=document.querySelector("#download"))&&f.parentNode&&f.parentNode.removeChild(f);case 15:case"end":return e.stop()}}),e)})));return function(t,n,a,r,c,l,s,u){return e.apply(this,arguments)}}(),C=n(181),y=Object(C.a)({wtSeq:"",mut:"",spacer:"",pam:"NGG",minPbs:8,maxPbs:18,minRt:9,maxRt:16,templateOptions:[],selectedTemplateOption:null,pbsOptions:[],selectedPbsOption:null,pe3bOptions:[],pe3Options:[],selectedPe3Option:null,selectedPe3bOption:null,cleanWtSeq:"",cleanMutSeq:"",step:0,pegRNA:"",pe3sgRNA:{sense:"",antisense:""},pe3bsgRNA:{sense:"",antisense:""},warnings:{general:[],pegRna:[],pe3:[]}}),R=y.useGlobalState,S=y.getGlobalState;function j(){var e=R("templateOptions"),t=Object(d.a)(e,2),n=t[0],a=t[1],r=R("wtSeq"),c=Object(d.a)(r,2),l=c[0],s=c[1],u=R("mut"),o=Object(d.a)(u,2),i=o[0],g=o[1],v=R("spacer"),x=Object(d.a)(v,2),C=x[0],y=x[1],j=R("pam"),P=Object(d.a)(j,2),k=P[0],A=P[1],q=R("minPbs"),N=Object(d.a)(q,2),U=N[0],I=N[1],T=R("maxPbs"),M=Object(d.a)(T,2),G=M[0],F=M[1],D=R("minRt"),B=Object(d.a)(D,2),J=B[0],W=B[1],L=R("maxRt"),z=Object(d.a)(L,2),H=z[0],K=z[1],Q=R("pbsOptions"),V=Object(d.a)(Q,2),X=V[0],Y=V[1],Z=R("pe3bOptions"),$=Object(d.a)(Z,2),_=$[0],ee=$[1],te=R("pe3Options"),ne=Object(d.a)(te,2),ae=ne[0],re=ne[1],ce=R("pegRNA"),le=Object(d.a)(ce,2),se=le[0],ue=le[1],oe=R("pe3sgRNA"),ie=Object(d.a)(oe,2),pe=ie[0],me=ie[1],de=R("pe3bsgRNA"),fe=Object(d.a)(de,2),he=fe[0],be=fe[1],ge=R("selectedTemplateOption"),ve=Object(d.a)(ge,2),Ee=ve[0],Oe=ve[1],we=R("selectedPbsOption"),xe=Object(d.a)(we,2),Ce=(xe[0],xe[1]),ye=R("selectedPe3Option"),Re=Object(d.a)(ye,2),Se=(Re[0],Re[1]),je=R("selectedPe3bOption"),Pe=Object(d.a)(je,2),ke=(Pe[0],Pe[1]),Ae=R("warnings"),qe=Object(d.a)(Ae,2),Ne=qe[0],Ue=qe[1];function Ie(){return(Ie=Object(m.a)(p.a.mark((function e(t,n,r,c,l,u,o,i){var m;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=a,e.next=3,f(t.toUpperCase(),n.toUpperCase(),r.toUpperCase(),c.toUpperCase(),l,u,o,i);case 3:return e.t1=e.sent,(0,e.t0)(e.t1),e.t2=Ue,e.next=8,w(t.toUpperCase(),n.toUpperCase(),r.toUpperCase(),c.toUpperCase(),l,u,o,i);case 8:return e.t3=e.sent,(0,e.t2)(e.t3),s(t.toUpperCase()),g(n.toUpperCase()),y(r.toUpperCase()),A(c.toUpperCase()),I(l),F(u),W(o),K(i),S("templateOptions").length>0&&Oe(S("templateOptions")[0].rt),e.t4=Y,e.next=22,h(t.toUpperCase(),n.toUpperCase(),r.toUpperCase(),c.toUpperCase(),l,u,o,i);case 22:return e.t5=e.sent,(0,e.t4)(e.t5),S("pbsOptions").length>0&&Ce(S("pbsOptions")[0].pbs),e.next=27,b(t.toUpperCase(),n.toUpperCase(),r.toUpperCase(),c.toUpperCase(),l,u,o,i);case 27:m=e.sent,ee(m.filter((function(e){return"pe3b"===e.type}))),S("pe3bOptions").length>0&&ke(S("pe3bOptions")[0].secondGuide),re(m.filter((function(e){return"pe3"===e.type}))),S("pe3Options").length>0&&Se(S("pe3Options")[0].secondGuide),Te(),Ge();case 34:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Te(){return Me.apply(this,arguments)}function Me(){return(Me=Object(m.a)(p.a.mark((function e(){var t,n,a,r,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=S("spacer"),n=S("selectedTemplateOption"),a=S("selectedPbsOption"),!n||!a){e.next=9;break}return e.next=6,E(t.toUpperCase(),n.toUpperCase(),a.toUpperCase());case 6:r=e.sent,c=r.sequence,ue(c);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Ge(){return Fe.apply(this,arguments)}function Fe(){return(Fe=Object(m.a)(p.a.mark((function e(){var t,n,a,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=S("selectedPe3Option"),n=S("selectedPe3bOption"),!t){e.next=7;break}return e.next=5,O(t.toUpperCase());case 5:a=e.sent,me(a);case 7:if(!n){e.next=12;break}return e.next=10,O(n.toUpperCase());case 10:r=e.sent,be(r);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return{wtSeq:l,mut:i,spacer:C,pam:k,minPbs:U,maxPbs:G,minRt:J,maxRt:H,templateOptions:n,pbsOptions:X,pe3bOptions:_,pe3Options:ae,pegRNA:se,pe3sgRNA:pe,pe3bsgRNA:he,warnings:Ne,setSpacer:y,selectedTemplateOption:Ee,updateSelectedTemplateOption:function(e){Oe(e),Te()},updateSelectedPbsOption:function(e){Ce(e),Te()},updateSelectedPe3Option:function(e){Se(e),Ge()},updateSelectedPe3bOption:function(e){ke(e),Ge()},updateSequencePredictions:function(e,t,n,a,r,c,l,s){return Ie.apply(this,arguments)},updatePegRNA:Te,updateSgRNA:Ge}}function P(){var e=R("step"),t=Object(d.a)(e,2);return{step:t[0],setStep:t[1]}}var k=n(37),A=n(21),q=n(47),N=n(48),U=n(50),I=n(49),T=n(372),M=function(e){Object(U.a)(n,e);var t=Object(I.a)(n);function n(){var e;Object(q.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={wtSeq:"",mut:"",spacer:"",pam:"NGG",minPbs:"8",maxPbs:"18",minRt:"9",maxRt:"16",showAdvanced:!1},e.handleChange=function(t,n){var a=n.name,r=n.value;e.setState((function(t){var n=Object(A.a)(Object(A.a)({},t),{},Object(k.a)({},a,r));return e.calcRtRange(n),n}))},e.handleRTChange=function(t,n){var a=n.name,r=n.value;return e.setState((function(e){return Object(A.a)(Object(A.a)({},e),{},Object(k.a)({},a,r))}))},e.handleSubmit=Object(m.a)(p.a.mark((function t(){var n,a,r,c,l,s,u,o,i;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=e.state,a=n.wtSeq,r=n.mut,c=n.spacer,l=n.pam,s=n.minPbs,u=n.maxPbs,o=n.minRt,i=n.maxRt,e.props.onSubmit(a,r,c,l,parseInt(s),parseInt(u),parseInt(o),parseInt(i));case 2:case"end":return t.stop()}}),t)}))),e.handleAdvancedToggle=function(t){t.preventDefault(),e.setState((function(e){return{showAdvanced:!e.showAdvanced}}))},e.calcRtRange=function(t){var n=t.mut.length,a=9,r=16;n>4&&(a=n+6,r=n+16),n>8&&(a=n+8,r=n+22),n>20&&(a=n+10,r=n+30),e.setState((function(){return{minRt:a.toString(),maxRt:r.toString()}}))},e}return Object(N.a)(n,[{key:"render",value:function(){var e=this.state,t=e.wtSeq,n=e.mut,a=e.spacer,c=e.pam,l=e.minRt,s=e.maxRt,u=e.minPbs,o=e.maxPbs,i=e.showAdvanced;return r.a.createElement("div",null,r.a.createElement(T.a,{onSubmit:this.handleSubmit},r.a.createElement(T.a.Input,{label:"Wildtype sequence (parentheses around region to be mutated)",placeholder:"",name:"wtSeq",value:t,onChange:this.handleChange,required:!0}),r.a.createElement(T.a.Input,{label:"Mutation sequence (leave blank if performing deletion)",placeholder:"",name:"mut",value:n,onChange:this.handleChange}),r.a.createElement(T.a.Input,{label:"PE spacer sequence",placeholder:"",name:"spacer",value:a,onChange:this.handleChange,required:!0}),i&&r.a.createElement(T.a.Group,null,r.a.createElement(T.a.Input,{label:"PAM sequence (use IUPAC ambiguity as needed)",placeholder:"NGG",name:"pam",value:c,onChange:this.handleChange,required:!0}),r.a.createElement(T.a.Input,{label:"Min PBS length",placeholder:"8",name:"minPbs",value:u,onChange:this.handleChange,required:!0}),r.a.createElement(T.a.Input,{label:"Max PBS length",placeholder:"18",name:"maxPbs",value:o,onChange:this.handleChange,required:!0}),r.a.createElement(T.a.Input,{label:"Min RT length",placeholder:"8",name:"minRt",value:l,onChange:this.handleRTChange,required:!0}),r.a.createElement(T.a.Input,{label:"Max RT length",placeholder:"18",name:"maxRt",value:s,onChange:this.handleRTChange,required:!0})),r.a.createElement(T.a.Group,null,r.a.createElement(T.a.Button,{content:"Show Advanced Options",onClick:this.handleAdvancedToggle}),r.a.createElement(T.a.Button,{content:"Submit",primary:!0}))))}}]),n}(a.Component),G=function(){var e=j().updateSequencePredictions,t=function(){var e=R("cleanWtSeq"),t=Object(d.a)(e,2),n=t[0],a=t[1];function r(){return(r=Object(m.a)(p.a.mark((function e(t,n,r,c,l,s,u,o){var i,m;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v(t.toUpperCase(),n.toUpperCase(),r.toUpperCase(),c.toUpperCase(),l,s,u,o);case 2:i=e.sent,m=i.sequence,a(m);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return{cleanWtSeq:n,getCleanWtSeq:function(e,t,n,a,c,l,s,u){return r.apply(this,arguments)}}}().getCleanWtSeq,n=function(){var e=R("cleanMutSeq"),t=Object(d.a)(e,2),n=t[0],a=t[1];function r(){return(r=Object(m.a)(p.a.mark((function e(t,n,r,c,l,s,u,o){var i,m;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g(t.toUpperCase(),n.toUpperCase(),r.toUpperCase(),c.toUpperCase(),l,s,u,o);case 2:i=e.sent,m=i.sequence,a(m);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return{cleanMutSeq:n,getCleanMutSeq:function(e,t,n,a,c,l,s,u){return r.apply(this,arguments)}}}().getCleanMutSeq,a=P().setStep;function c(){return(c=Object(m.a)(p.a.mark((function r(c,l,s,u,o,i,m,d){return p.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t(c,l,s,u,o,i,m,d),n(c,l,s,u,o,i,m,d),r.next=4,e(c,l,s,u,o,i,m,d);case 4:a(1);case 5:case"end":return r.stop()}}),r)})))).apply(this,arguments)}return r.a.createElement(M,{onSubmit:function(e,t,n,a,r,l,s,u){return c.apply(this,arguments)}})},F=function(){return r.a.createElement(o.a.Row,null,r.a.createElement(o.a.Column,{width:14},r.a.createElement(G,null)))},D=n(375),B=n(54),J=n(378),W=n(121),L=function(){var e=j().warnings,t=e.general,n=e.pegRna,c=[].concat(Object(B.a)(t),Object(B.a)(n));return r.a.createElement(a.Fragment,null,c.length>0&&r.a.createElement(J.a,{warning:!0},r.a.createElement(W.a,null,"Warning!"),c.map((function(e,t){return r.a.createElement("p",{key:"warning-".concat(t)},e)}))))},z=function(){var e=j().warnings,t=e.general,n=e.pe3,c=[].concat(Object(B.a)(t),Object(B.a)(n));return r.a.createElement(a.Fragment,null,c.length>0&&r.a.createElement(J.a,{warning:!0},r.a.createElement(W.a,null,"Warning!"),c.map((function(e,t){return r.a.createElement("p",{key:"warning-".concat(t)},e)}))))},H=n(373),K=function(e){Object(U.a)(n,e);var t=Object(I.a)(n);function n(){var e;Object(q.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={value:e.props.options.length>0?e.props.options[0]:""},e.handleChange=function(t,n){var a=n.value;e.setState({value:a}),e.props.onChange(a)},e}return Object(N.a)(n,[{key:"render",value:function(){var e=this.state.value;return r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},this.props.title,r.a.createElement(H.a,{onChange:this.handleChange,options:this.props.options.map((function(e){return{key:e,text:e,value:e}})),placeholder:"Choose an option",value:e,selection:!0,scrolling:!0}))}}]),n}(a.Component);K.defaultProps={options:[],onChange:function(e){}};var Q=function(){var e=j(),t=e.templateOptions,n=e.updateSelectedTemplateOption;return r.a.createElement(a.Fragment,null,t.length>0&&r.a.createElement(K,{title:"RT templates:",options:t.map((function(e){return e.rt})),onChange:n}))},V=function(){var e=j(),t=e.pbsOptions,n=e.updateSelectedPbsOption;return r.a.createElement(a.Fragment,null,t.length>0&&r.a.createElement(K,{title:"Primer binding sites:",options:t.map((function(e){return e.pbs})),onChange:n}))},X=function(){var e=j(),t=e.pe3bOptions,n=e.updateSelectedPe3bOption;return r.a.createElement(a.Fragment,null,t.length>0&&r.a.createElement(K,{title:"PE3b Guides:",options:t.map((function(e){return e.secondGuide})),onChange:n}))},Y=function(){var e=j(),t=e.pe3Options,n=e.updateSelectedPe3Option;return r.a.createElement(a.Fragment,null,t.length>0&&r.a.createElement(K,{title:"PE3 Guides:",options:t.map((function(e){return e.secondGuide})),onChange:n}))},Z=n(374),$=n(55),_=n(191),ee=n.n(_),te=function(e){Object(U.a)(n,e);var t=Object(I.a)(n);function n(){var e;Object(q.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={helpText:"click to copy",isOpen:!1},e.handleCopy=function(){ee()(e.props.value),e.setState((function(){return{helpText:"you're all set"}})),console.log("indicate"),setTimeout((function(){e.setState((function(){return{helpText:"click to copy"}}))}),1e3)},e.handleMouseOver=function(){e.setState((function(){return{isOpen:!0}}))},e.handleMouseLeave=function(){e.setState((function(){return{isOpen:!1}}))},e}return Object(N.a)(n,[{key:"render",value:function(){return r.a.createElement(Z.a,{content:this.state.helpText,position:"top center",open:this.state.isOpen,trigger:r.a.createElement($.a,{name:"copy",onClick:this.handleCopy,onMouseOver:this.handleMouseOver,onMouseLeave:this.handleMouseLeave,link:!0})})}}]),n}(a.Component),ne=function(){var e=function(){var e=R("pegRNA"),t=Object(d.a)(e,2);return{pegRNA:t[0],setPegRNA:t[1]}}().pegRNA;return r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("div",null,"Final pegRNA:",r.a.createElement(te,{value:e})),r.a.createElement("p",{style:{wordBreak:"break-word"}},e))},ae=function(){var e=j().pe3Options,t=function(){var e=R("pe3sgRNA"),t=Object(d.a)(e,2);return{pe3sgRNA:t[0],setPe3SgRNA:t[1]}}().pe3sgRNA;return r.a.createElement(a.Fragment,null,e.length>0&&r.a.createElement(a.Fragment,null,r.a.createElement(o.a.Column,{width:8},r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("div",null,"sense sgRNA:",r.a.createElement(te,{value:t.sense})),r.a.createElement("p",{style:{wordBreak:"break-word"}},t.sense))),r.a.createElement(o.a.Column,{width:8},r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("div",null,"antisense sgRNA:",r.a.createElement(te,{value:t.antisense})),r.a.createElement("p",{style:{wordBreak:"break-word"}},t.antisense)))))},re=function(){var e=j().pe3bOptions,t=function(){var e=R("pe3bsgRNA"),t=Object(d.a)(e,2);return{pe3bsgRNA:t[0],setPe3bSgRNA:t[1]}}().pe3bsgRNA;return r.a.createElement(a.Fragment,null,e.length>0&&r.a.createElement(a.Fragment,null,r.a.createElement(o.a.Column,{width:8},r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("div",null,"sense sgRNA:",r.a.createElement(te,{value:t.sense})),r.a.createElement("p",{style:{wordBreak:"break-word"}},t.sense))),r.a.createElement(o.a.Column,{width:8},r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("div",null,"antisense sgRNA:",r.a.createElement(te,{value:t.antisense})),r.a.createElement("p",{style:{wordBreak:"break-word"}},t.antisense)))))},ce=[{menuItem:"pegRNA",textAlign:"left",render:function(){return r.a.createElement(D.a.Pane,null,r.a.createElement(L,null),r.a.createElement(o.a,null,r.a.createElement(o.a.Row,null,r.a.createElement(o.a.Column,{width:8},r.a.createElement(Q,null)),r.a.createElement(o.a.Column,{width:8},r.a.createElement(V,null))),r.a.createElement(o.a.Row,null,r.a.createElement(o.a.Column,{width:16},r.a.createElement(ne,null)))))}},{menuItem:"PE3",textAlign:"left",render:function(){return r.a.createElement(D.a.Pane,null,r.a.createElement(z,null),r.a.createElement(o.a,null,r.a.createElement(o.a.Row,null,r.a.createElement(o.a.Column,{width:16},r.a.createElement(Y,null))),r.a.createElement(o.a.Row,null,r.a.createElement(ae,null))))}},{menuItem:"PE3b",textAlign:"left",render:function(){return r.a.createElement(D.a.Pane,null,r.a.createElement(z,null),r.a.createElement(o.a,null,r.a.createElement(o.a.Row,null,r.a.createElement(o.a.Column,{width:16},r.a.createElement(X,null))),r.a.createElement(o.a.Row,null,r.a.createElement(re,null))))}}],le=function(){return r.a.createElement(D.a,{panes:ce})},se=n(379),ue=function(){var e=j(),t=e.wtSeq,n=e.mut,a=e.spacer,c=e.pam,l=e.minPbs,s=e.maxPbs,u=e.minRt,o=e.maxRt;return r.a.createElement(se.a,{onClick:function(){return x(t,n,a,c,l,s,u,o)},primary:!0},"Donwnload Full Results")},oe=function(){return r.a.createElement(a.Fragment,null,r.a.createElement(o.a.Row,null,r.a.createElement(o.a.Column,{width:14},r.a.createElement(le,null))),r.a.createElement(o.a.Row,null,r.a.createElement(o.a.Column,{width:14},r.a.createElement(ue,null))))},ie=n(376),pe=function(e){var t=e.step,n=void 0===t?0:t;return r.a.createElement(ie.a.Group,{ordered:!0,size:"small"},r.a.createElement(ie.a,{completed:n>0,active:0===n},r.a.createElement(ie.a.Content,null,r.a.createElement(ie.a.Title,null,"Enter"),r.a.createElement(ie.a.Description,null,"Enter Sequence information"))),r.a.createElement(ie.a,{completed:n>1,active:1===n},r.a.createElement(ie.a.Content,null,r.a.createElement(ie.a.Title,null,"Design"),r.a.createElement(ie.a.Description,null,"Design your pegRNA"))))},me=function(){var e=P().step;return r.a.createElement(o.a.Row,null,r.a.createElement(o.a.Column,{width:14},r.a.createElement("div",{style:{display:"flex",justifyContent:"center"}},r.a.createElement(pe,{step:e}))))};var de=function(){var e=P().step;return r.a.createElement("div",{style:{position:"relative"}},r.a.createElement(u,null),r.a.createElement(o.a,{centered:!0},r.a.createElement(me,null),r.a.createElement(F,null),1===e&&r.a.createElement(oe,null)))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(de,null)),document.getElementById("root"))}},[[211,1,2]]]);
//# sourceMappingURL=main.daf9280d.chunk.js.map