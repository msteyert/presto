(this.webpackJsonpui=this.webpackJsonpui||[]).push([[0],{207:function(e,t,n){e.exports=n(360)},212:function(e,t,n){},304:function(e,t,n){},360:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(36),l=n.n(c),o=(n(212),n(193)),u=function(){return r.a.createElement(o.a,{secondary:!0,pointing:!0,style:{position:"sticky",top:0,backgroundColor:"white",zIndex:1}},r.a.createElement(o.a.Item,{name:"Home",active:!0}),r.a.createElement(o.a.Item,{name:"Instructions"}),r.a.createElement(o.a.Item,{name:"Examples"}))},s=n(194),i=(n(304),n(305),n(8)),p=n.n(i),m=n(15),d=n(9),f=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/rt"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a})});case 2:return r=e.sent,e.next=5,r.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),h=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/pbs"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a})});case 2:return r=e.sent,e.next=5,r.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),b=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/pe3"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a})});case 2:return r=e.sent,e.next=5,r.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),v=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/mutSeq"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a})});case 2:return r=e.sent,e.next=5,r.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),g=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/cleanWtSeq"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a})});case 2:return r=e.sent,e.next=5,r.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),E=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/pegrna"),{method:"post",body:JSON.stringify({spacer:t,rtt:n,pbs:a})});case 2:return r=e.sent,e.next=5,r.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),O=function(){var e=Object(m.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/sgrna"),{method:"post",body:JSON.stringify({pe3:t})});case 2:return n=e.sent,e.next=5,n.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){var r,c,l,o,u;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/csv"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a})});case 2:return r=e.sent,e.next=5,r.text();case 5:c=e.sent,l=window.URL.createObjectURL(new Blob([c])),(o=document.createElement("a")).id="download",o.href=l,o.setAttribute("download",r.headers.get("FileName")||"presto.csv"),document.body.appendChild(o),o.click(),(u=document.querySelector("#download"))&&u.parentNode&&u.parentNode.removeChild(u);case 15:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),y=n(177),C=Object(y.a)({wtSeq:"",mut:"",spacer:"",templateOptions:[],selectedTemplateOption:null,pbsOptions:[],selectedPbsOption:null,pe3bOptions:[],pe3Options:[],selectedPe3Option:null,selectedPe3bOption:null,cleanWtSeq:"",cleanMutSeq:"",step:0,pegRNA:"",pe3sgRNA:{sense:"",antisense:""},pe3bsgRNA:{sense:"",antisense:""}}),S=C.useGlobalState,x=C.getGlobalState;function j(){var e=S("templateOptions"),t=Object(d.a)(e,2),n=t[0],a=t[1],r=S("spacer"),c=Object(d.a)(r,2),l=c[0],o=c[1],u=S("spacer"),s=Object(d.a)(u,2),i=s[0],v=s[1],g=S("spacer"),w=Object(d.a)(g,2),y=w[0],C=w[1],j=S("pbsOptions"),R=Object(d.a)(j,2),A=R[0],k=R[1],q=S("pe3bOptions"),N=Object(d.a)(q,2),P=N[0],M=N[1],U=S("pe3Options"),T=Object(d.a)(U,2),I=T[0],B=T[1],G=S("pegRNA"),D=Object(d.a)(G,2),J=D[0],W=D[1],F=S("pe3sgRNA"),L=Object(d.a)(F,2),z=L[0],H=L[1],K=S("pe3bsgRNA"),Q=Object(d.a)(K,2),V=Q[0],X=Q[1],Y=S("selectedTemplateOption"),Z=Object(d.a)(Y,2),$=Z[0],_=Z[1],ee=S("selectedPbsOption"),te=Object(d.a)(ee,2),ne=(te[0],te[1]),ae=S("selectedPe3Option"),re=Object(d.a)(ae,2),ce=(re[0],re[1]),le=S("selectedPe3bOption"),oe=Object(d.a)(le,2),ue=(oe[0],oe[1]);function se(){return(se=Object(m.a)(p.a.mark((function e(t,n,r){var c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=a,e.next=3,f(t.toUpperCase(),n.toUpperCase(),r.toUpperCase());case 3:return e.t1=e.sent,(0,e.t0)(e.t1),o(t.toUpperCase()),v(n.toUpperCase()),C(r.toUpperCase()),x("templateOptions").length>0&&_(x("templateOptions")[0].rt),e.t2=k,e.next=12,h(t.toUpperCase(),n.toUpperCase(),r.toUpperCase());case 12:return e.t3=e.sent,(0,e.t2)(e.t3),x("pbsOptions").length>0&&ne(x("pbsOptions")[0].pbs),e.next=17,b(t.toUpperCase(),n.toUpperCase(),r.toUpperCase());case 17:c=e.sent,M(c.filter((function(e){return"pe3b"===e.type}))),x("pe3bOptions").length>0&&ue(x("pe3bOptions")[0].secondGuide),B(c.filter((function(e){return"pe3"===e.type}))),x("pe3Options").length>0&&ce(x("pe3Options")[0].secondGuide),ie(),me();case 24:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function ie(){return pe.apply(this,arguments)}function pe(){return(pe=Object(m.a)(p.a.mark((function e(){var t,n,a,r,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=x("spacer"),n=x("selectedTemplateOption"),a=x("selectedPbsOption"),!n||!a){e.next=9;break}return e.next=6,E(t.toUpperCase(),n.toUpperCase(),a.toUpperCase());case 6:r=e.sent,c=r.sequence,W(c);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function me(){return de.apply(this,arguments)}function de(){return(de=Object(m.a)(p.a.mark((function e(){var t,n,a,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=x("selectedPe3Option"),n=x("selectedPe3bOption"),!t){e.next=7;break}return e.next=5,O(t.toUpperCase());case 5:a=e.sent,H(a);case 7:if(!n){e.next=12;break}return e.next=10,O(n.toUpperCase());case 10:r=e.sent,X(r);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return{wtSeq:l,mut:i,spacer:y,templateOptions:n,pbsOptions:A,pe3bOptions:P,pe3Options:I,pegRNA:J,pe3sgRNA:z,pe3bsgRNA:V,setSpacer:C,selectedTemplateOption:$,updateSelectedTemplateOption:function(e){_(e),ie()},updateSelectedPbsOption:function(e){ne(e),ie()},updateSelectedPe3Option:function(e){ce(e),me()},updateSelectedPe3bOption:function(e){ue(e),me()},updateSequencePredictions:function(e,t,n){return se.apply(this,arguments)},updatePegRNA:ie,updateSgRNA:me}}function R(){var e=S("step"),t=Object(d.a)(e,2);return{step:t[0],setStep:t[1]}}var A=n(37),k=n(20),q=n(46),N=n(47),P=n(49),M=n(48),U=n(368),T=function(e){Object(P.a)(n,e);var t=Object(M.a)(n);function n(){var e;Object(q.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={wtSeq:"",mut:"",spacer:"",pam:"NGG",PBSmin:"8",PBSmax:"18",rtMin:"9",rtMax:"16",showAdvanced:!1},e.handleChange=function(t,n){var a=n.name,r=n.value;e.setState((function(t){var n=Object(k.a)(Object(k.a)({},t),{},Object(A.a)({},a,r));return e.calcRtRange(n),n}))},e.handleRTChange=function(t,n){var a=n.name,r=n.value;return e.setState((function(e){return Object(k.a)(Object(k.a)({},e),{},Object(A.a)({},a,r))}))},e.handleSubmit=Object(m.a)(p.a.mark((function t(){var n,a,r,c;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=e.state,a=n.wtSeq,r=n.mut,c=n.spacer,e.props.onSubmit(a,r,c);case 2:case"end":return t.stop()}}),t)}))),e.handleAdvancedToggle=function(t){t.preventDefault(),e.setState((function(e){return{showAdvanced:!e.showAdvanced}}))},e.calcRtRange=function(t){var n=t.mut.length,a=9,r=16;n>4&&(a=n+6,r=n+16),n>8&&(a=n+8,r=n+22),n>20&&(a=n+10,r=n+30),e.setState((function(){return{rtMin:a.toString(),rtMax:r.toString()}}))},e}return Object(N.a)(n,[{key:"render",value:function(){var e=this.state,t=e.wtSeq,n=e.mut,a=e.spacer,c=e.pam,l=e.rtMin,o=e.rtMax,u=e.PBSmin,s=e.PBSmax,i=e.showAdvanced;return r.a.createElement("div",null,r.a.createElement(U.a,{onSubmit:this.handleSubmit},r.a.createElement(U.a.Input,{label:"Wildtype sequence (parentheses around region to be mutated)",placeholder:"",name:"wtSeq",value:t,onChange:this.handleChange,required:!0}),r.a.createElement(U.a.Input,{label:"Mutation sequence (leave blank if performing deletion)",placeholder:"",name:"mut",value:n,onChange:this.handleChange}),r.a.createElement(U.a.Input,{label:"PE spacer sequence",placeholder:"",name:"spacer",value:a,onChange:this.handleChange,required:!0}),i&&r.a.createElement(U.a.Group,null,r.a.createElement(U.a.Input,{label:"PAM sequence (use IUPAC ambiguity as needed)",placeholder:"NGG",name:"pam",value:c,onChange:this.handleChange,required:!0}),r.a.createElement(U.a.Input,{label:"Min PBS length",placeholder:"8",name:"PBSmin",value:u,onChange:this.handleChange,required:!0}),r.a.createElement(U.a.Input,{label:"Max PBS length",placeholder:"18",name:"PBSmax",value:s,onChange:this.handleChange,required:!0}),r.a.createElement(U.a.Input,{label:"Min RT length",placeholder:"8",name:"rtMin",value:l,onChange:this.handleRTChange,required:!0}),r.a.createElement(U.a.Input,{label:"Max RT length",placeholder:"18",name:"rtMax",value:o,onChange:this.handleRTChange,required:!0})),r.a.createElement(U.a.Group,null,r.a.createElement(U.a.Button,{content:"Show Advanced Options",onClick:this.handleAdvancedToggle}),r.a.createElement(U.a.Button,{content:"Submit",primary:!0}))))}}]),n}(a.Component),I=function(){var e=j().updateSequencePredictions,t=function(){var e=S("cleanWtSeq"),t=Object(d.a)(e,2),n=t[0],a=t[1];function r(){return(r=Object(m.a)(p.a.mark((function e(t,n,r){var c,l;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g(t.toUpperCase(),n.toUpperCase(),r.toUpperCase());case 2:c=e.sent,l=c.sequence,a(l);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return{cleanWtSeq:n,getCleanWtSeq:function(e,t,n){return r.apply(this,arguments)}}}().getCleanWtSeq,n=function(){var e=S("cleanMutSeq"),t=Object(d.a)(e,2),n=t[0],a=t[1];function r(){return(r=Object(m.a)(p.a.mark((function e(t,n,r){var c,l;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v(t.toUpperCase(),n.toUpperCase(),r.toUpperCase());case 2:c=e.sent,l=c.sequence,a(l);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return{cleanMutSeq:n,getCleanMutSeq:function(e,t,n){return r.apply(this,arguments)}}}().getCleanMutSeq,a=R().setStep;function c(){return(c=Object(m.a)(p.a.mark((function r(c,l,o){return p.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t(c,l,o),n(c,l,o),r.next=4,e(c,l,o);case 4:a(1);case 5:case"end":return r.stop()}}),r)})))).apply(this,arguments)}return r.a.createElement(T,{onSubmit:function(e,t,n){return c.apply(this,arguments)}})},B=function(){return r.a.createElement(s.a.Row,null,r.a.createElement(s.a.Column,{width:14},r.a.createElement(I,null)))},G=n(371),D=n(369),J=function(e){Object(P.a)(n,e);var t=Object(M.a)(n);function n(){var e;Object(q.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={value:e.props.options.length>0?e.props.options[0]:""},e.handleChange=function(t,n){var a=n.value;e.setState({value:a}),e.props.onChange(a)},e}return Object(N.a)(n,[{key:"render",value:function(){var e=this.state.value;return r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},this.props.title,r.a.createElement(D.a,{onChange:this.handleChange,options:this.props.options.map((function(e){return{key:e,text:e,value:e}})),placeholder:"Choose an option",value:e,selection:!0,scrolling:!0}))}}]),n}(a.Component);J.defaultProps={options:[],onChange:function(e){}};var W=function(){var e=j(),t=e.templateOptions,n=e.updateSelectedTemplateOption;return r.a.createElement(J,{title:"RT templates:",options:t.map((function(e){return e.rt})),onChange:n})},F=function(){var e=j(),t=e.pbsOptions,n=e.updateSelectedPbsOption;return r.a.createElement(J,{title:"Primer binding sites:",options:t.map((function(e){return e.pbs})),onChange:n})},L=function(){var e=j(),t=e.pe3bOptions,n=e.updateSelectedPe3bOption;return r.a.createElement(J,{title:"PE3b Guides:",options:t.map((function(e){return e.secondGuide})),onChange:n})},z=function(){var e=j(),t=e.pe3Options,n=e.updateSelectedPe3Option;return r.a.createElement(J,{title:"PE3 Guides:",options:t.map((function(e){return e.secondGuide})),onChange:n})},H=n(370),K=n(53),Q=n(187),V=n.n(Q),X=function(e){Object(P.a)(n,e);var t=Object(M.a)(n);function n(){var e;Object(q.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={helpText:"click to copy",isOpen:!1},e.handleCopy=function(){V()(e.props.value),e.setState((function(){return{helpText:"you're all set"}})),console.log("indicate"),setTimeout((function(){e.setState((function(){return{helpText:"click to copy"}}))}),1e3)},e.handleMouseOver=function(){e.setState((function(){return{isOpen:!0}}))},e.handleMouseLeave=function(){e.setState((function(){return{isOpen:!1}}))},e}return Object(N.a)(n,[{key:"render",value:function(){return r.a.createElement(H.a,{content:this.state.helpText,position:"top center",open:this.state.isOpen,trigger:r.a.createElement(K.a,{name:"copy",onClick:this.handleCopy,onMouseOver:this.handleMouseOver,onMouseLeave:this.handleMouseLeave,link:!0})})}}]),n}(a.Component),Y=function(){var e=function(){var e=S("pegRNA"),t=Object(d.a)(e,2);return{pegRNA:t[0],setPegRNA:t[1]}}().pegRNA;return r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("div",null,"Final pegRNA:",r.a.createElement(X,{value:e})),r.a.createElement("p",{style:{wordBreak:"break-word"}},e))},Z=function(){var e=function(){var e=S("pe3sgRNA"),t=Object(d.a)(e,2);return{pe3sgRNA:t[0],setPe3SgRNA:t[1]}}().pe3sgRNA;return r.a.createElement(a.Fragment,null,r.a.createElement(s.a.Column,{width:8},r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("div",null,"sense sgRNA:",r.a.createElement(X,{value:e.sense})),r.a.createElement("p",{style:{wordBreak:"break-word"}},e.sense))),r.a.createElement(s.a.Column,{width:8},r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("div",null,"antisense sgRNA:",r.a.createElement(X,{value:e.antisense})),r.a.createElement("p",{style:{wordBreak:"break-word"}},e.antisense))))},$=function(){var e=function(){var e=S("pe3bsgRNA"),t=Object(d.a)(e,2);return{pe3bsgRNA:t[0],setPe3bSgRNA:t[1]}}().pe3bsgRNA;return r.a.createElement(a.Fragment,null,r.a.createElement(s.a.Column,{width:8},r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("div",null,"sense sgRNA:",r.a.createElement(X,{value:e.sense})),r.a.createElement("p",{style:{wordBreak:"break-word"}},e.sense))),r.a.createElement(s.a.Column,{width:8},r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("div",null,"antisense sgRNA:",r.a.createElement(X,{value:e.antisense})),r.a.createElement("p",{style:{wordBreak:"break-word"}},e.antisense))))},_=[{menuItem:"pegRNA",textAlign:"left",render:function(){return r.a.createElement(G.a.Pane,null,r.a.createElement(s.a,null,r.a.createElement(s.a.Row,null,r.a.createElement(s.a.Column,{width:8},r.a.createElement(W,null)),r.a.createElement(s.a.Column,{width:8},r.a.createElement(F,null))),r.a.createElement(s.a.Row,null,r.a.createElement(s.a.Column,{width:16},r.a.createElement(Y,null)))))}},{menuItem:"PE3",textAlign:"left",render:function(){return r.a.createElement(G.a.Pane,null,r.a.createElement(s.a,null,r.a.createElement(s.a.Row,null,r.a.createElement(s.a.Column,{width:16},r.a.createElement(z,null))),r.a.createElement(s.a.Row,null,r.a.createElement(Z,null))))}},{menuItem:"PE3b",textAlign:"left",render:function(){return r.a.createElement(G.a.Pane,null,r.a.createElement(s.a,null,r.a.createElement(s.a.Row,null,r.a.createElement(s.a.Column,{width:16},r.a.createElement(L,null))),r.a.createElement(s.a.Row,null,r.a.createElement($,null))))}}],ee=function(){return r.a.createElement(G.a,{panes:_})},te=n(374),ne=function(){var e=j(),t=e.wtSeq,n=e.mut,a=e.spacer;return r.a.createElement(te.a,{onClick:function(){return w(t,n,a)},primary:!0},"Donwnload Full Results")},ae=function(){return r.a.createElement(a.Fragment,null,r.a.createElement(s.a.Row,null,r.a.createElement(s.a.Column,{width:14},r.a.createElement(ee,null))),r.a.createElement(s.a.Row,null,r.a.createElement(s.a.Column,{width:14},r.a.createElement(ne,null))))},re=n(372),ce=function(e){var t=e.step,n=void 0===t?0:t;return r.a.createElement(re.a.Group,{ordered:!0,size:"small"},r.a.createElement(re.a,{completed:n>0,active:0===n},r.a.createElement(re.a.Content,null,r.a.createElement(re.a.Title,null,"Enter"),r.a.createElement(re.a.Description,null,"Enter Sequence information"))),r.a.createElement(re.a,{completed:n>1,active:1===n},r.a.createElement(re.a.Content,null,r.a.createElement(re.a.Title,null,"Design"),r.a.createElement(re.a.Description,null,"Design your pegRNA"))))},le=function(){var e=R().step;return r.a.createElement(s.a.Row,null,r.a.createElement(s.a.Column,{width:14},r.a.createElement("div",{style:{display:"flex",justifyContent:"center"}},r.a.createElement(ce,{step:e}))))};var oe=function(){var e=R().step;return r.a.createElement("div",{style:{position:"relative"}},r.a.createElement(u,null),r.a.createElement(s.a,{centered:!0},r.a.createElement(le,null),r.a.createElement(B,null),1===e&&r.a.createElement(ae,null)))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(oe,null)),document.getElementById("root"))}},[[207,1,2]]]);
//# sourceMappingURL=main.0f19b30b.chunk.js.map