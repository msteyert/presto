(this.webpackJsonpui=this.webpackJsonpui||[]).push([[0],{207:function(e,t,n){e.exports=n(360)},212:function(e,t,n){},304:function(e,t,n){},360:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(36),u=n.n(c),o=(n(212),n(193)),l=function(){return r.a.createElement(o.a,{secondary:!0,pointing:!0,style:{position:"sticky",top:0,backgroundColor:"white",zIndex:1}},r.a.createElement(o.a.Item,{name:"Home",active:!0}),r.a.createElement(o.a.Item,{name:"Instructions"}),r.a.createElement(o.a.Item,{name:"Examples"}))},s=n(194),i=(n(304),n(305),n(8)),p=n.n(i),m=n(15),h=n(14),f=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/rt"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a})});case 2:return r=e.sent,e.next=5,r.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),d=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/pbs"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a})});case 2:return r=e.sent,e.next=5,r.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),v=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/pe3"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a})});case 2:return r=e.sent,e.next=5,r.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),b=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/mutSeq"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a})});case 2:return r=e.sent,e.next=5,r.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),g=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/cleanWtSeq"),{method:"post",body:JSON.stringify({wtSeq:t,mut:n,spacer:a})});case 2:return r=e.sent,e.next=5,r.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),O=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/pegrna"),{method:"post",body:JSON.stringify({spacer:t,rtt:n,pbs:a})});case 2:return r=e.sent,e.next=5,r.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),E=function(){var e=Object(m.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("","/generate/sgrna"),{method:"post",body:JSON.stringify({pe3:t})});case 2:return n=e.sent,e.next=5,n.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=n(177),y=Object(S.a)({spacer:"",templateOptions:[],selectedTemplateOption:null,pbsOptions:[],selectedPbsOption:null,pe3bOptions:[],pe3Options:[],selectedPe3Option:null,cleanWtSeq:"",cleanMutSeq:"",step:0,pegRNA:"",sgRNA:""}),w=y.useGlobalState,x=y.getGlobalState;function j(){var e=w("templateOptions"),t=Object(h.a)(e,2),n=t[0],a=t[1],r=w("spacer"),c=Object(h.a)(r,2),u=c[0],o=c[1],l=w("pbsOptions"),s=Object(h.a)(l,2),i=s[0],b=s[1],g=w("pe3bOptions"),S=Object(h.a)(g,2),y=S[0],j=S[1],C=w("pe3Options"),q=Object(h.a)(C,2),k=q[0],R=q[1],P=w("pegRNA"),A=Object(h.a)(P,2),M=A[0],N=A[1],T=w("sgRNA"),I=Object(h.a)(T,2),G=I[0],B=I[1],J=w("selectedTemplateOption"),D=Object(h.a)(J,2),W=D[0],L=D[1],z=w("selectedPbsOption"),F=Object(h.a)(z,2),H=(F[0],F[1]),U=w("selectedPe3Option"),K=Object(h.a)(U,2),Q=K[0],V=K[1];function X(){return(X=Object(m.a)(p.a.mark((function e(t,n,r){var c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=a,e.next=3,f(t,n,r);case 3:return e.t1=e.sent,(0,e.t0)(e.t1),x("templateOptions").length>0&&L(x("templateOptions")[0].rt),e.t2=b,e.next=9,d(t,n,r);case 9:return e.t3=e.sent,(0,e.t2)(e.t3),x("pbsOptions").length>0&&H(x("pbsOptions")[0].pbs),e.next=14,v(t,n,r);case 14:c=e.sent,j(c.filter((function(e){return"pe3b"===e.type}))),x("pe3bOptions").length>0&&V(x("pe3bOptions")[0].secondGuide),R(c.filter((function(e){return"pe3"===e.type}))),x("pe3Options").length>0&&V(x("pe3Options")[0].secondGuide),Y();case 20:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Y(){return Z.apply(this,arguments)}function Z(){return(Z=Object(m.a)(p.a.mark((function e(){var t,n,a,r,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=x("spacer"),n=x("selectedTemplateOption"),a=x("selectedPbsOption"),console.log("update"),console.log(n),console.log(a),!n||!a){e.next=13;break}return console.log("inner"),e.next=10,O(t,n,a);case 10:r=e.sent,c=r.sequence,N(c);case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function $(){return($=Object(m.a)(p.a.mark((function e(){var t,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!Q){e.next=6;break}return e.next=3,E(Q);case 3:t=e.sent,n=t.sequence,B(n);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return{spacer:u,templateOptions:n,pbsOptions:i,pe3bOptions:y,pe3Options:k,pegRNA:M,sgRNA:G,setSpacer:o,selectedTemplateOption:W,updateSelectedTemplateOption:function(e){L(e),Y()},updateSelectedPbsOption:function(e){H(e),Y()},setSelectedPe3Option:V,updateSequencePredictions:function(e,t,n){return X.apply(this,arguments)},updatePegRNA:Y,updateSgRNA:function(){return $.apply(this,arguments)}}}function C(){var e=w("step"),t=Object(h.a)(e,2);return{step:t[0],setStep:t[1]}}var q=n(37),k=n(20),R=n(46),P=n(47),A=n(49),M=n(48),N=n(368),T=function(e){Object(A.a)(n,e);var t=Object(M.a)(n);function n(){var e;Object(R.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={wtSeq:"",mut:"",spacer:"",pam:"NGG",PBSmin:"8",PBSmax:"18",rtMin:"9",rtMax:"16",showAdvanced:!1},e.handleChange=function(t,n){var a=n.name,r=n.value;e.setState((function(t){var n=Object(k.a)(Object(k.a)({},t),{},Object(q.a)({},a,r));return e.calcRtRange(n),n}))},e.handleRTChange=function(t,n){var a=n.name,r=n.value;return e.setState((function(e){return Object(k.a)(Object(k.a)({},e),{},Object(q.a)({},a,r))}))},e.handleSubmit=Object(m.a)(p.a.mark((function t(){var n,a,r,c;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=e.state,a=n.wtSeq,r=n.mut,c=n.spacer,e.props.onSubmit(a,r,c);case 2:case"end":return t.stop()}}),t)}))),e.handleAdvancedToggle=function(t){t.preventDefault(),e.setState((function(e){return{showAdvanced:!e.showAdvanced}}))},e.calcRtRange=function(t){var n=t.mut.length,a=9,r=16;n>4&&(a=n+6,r=n+16),n>8&&(a=n+8,r=n+22),n>20&&(a=n+10,r=n+30),e.setState((function(){return{rtMin:a.toString(),rtMax:r.toString()}}))},e}return Object(P.a)(n,[{key:"render",value:function(){var e=this.state,t=e.wtSeq,n=e.mut,a=e.spacer,c=e.pam,u=e.rtMin,o=e.rtMax,l=e.PBSmin,s=e.PBSmax,i=e.showAdvanced;return r.a.createElement("div",null,r.a.createElement(N.a,{onSubmit:this.handleSubmit},r.a.createElement(N.a.Input,{label:"Wildtype sequence (parentheses around region to be mutated)",placeholder:"",name:"wtSeq",value:t,onChange:this.handleChange,required:!0}),r.a.createElement(N.a.Input,{label:"Mutation sequence (leave blank if performing deletion)",placeholder:"",name:"mut",value:n,onChange:this.handleChange}),r.a.createElement(N.a.Input,{label:"PE spacer sequence",placeholder:"",name:"spacer",value:a,onChange:this.handleChange,required:!0}),i&&r.a.createElement(N.a.Group,null,r.a.createElement(N.a.Input,{label:"PAM sequence (use IUPAC ambiguity as needed)",placeholder:"NGG",name:"pam",value:c,onChange:this.handleChange,required:!0}),r.a.createElement(N.a.Input,{label:"Min PBS length",placeholder:"8",name:"PBSmin",value:l,onChange:this.handleChange,required:!0}),r.a.createElement(N.a.Input,{label:"Max PBS length",placeholder:"18",name:"PBSmax",value:s,onChange:this.handleChange,required:!0}),r.a.createElement(N.a.Input,{label:"Min RT length",placeholder:"8",name:"rtMin",value:u,onChange:this.handleRTChange,required:!0}),r.a.createElement(N.a.Input,{label:"Max RT length",placeholder:"18",name:"rtMax",value:o,onChange:this.handleRTChange,required:!0})),r.a.createElement(N.a.Group,null,r.a.createElement(N.a.Button,{content:"Show Advanced Options",onClick:this.handleAdvancedToggle}),r.a.createElement(N.a.Button,{content:"Submit",primary:!0}))))}}]),n}(a.Component),I=function(){var e=j().updateSequencePredictions,t=function(){var e=w("cleanWtSeq"),t=Object(h.a)(e,2),n=t[0],a=t[1];function r(){return(r=Object(m.a)(p.a.mark((function e(t,n,r){var c,u;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g(t,n,r);case 2:c=e.sent,u=c.sequence,a(u);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return{cleanWtSeq:n,getCleanWtSeq:function(e,t,n){return r.apply(this,arguments)}}}().getCleanWtSeq,n=function(){var e=w("cleanMutSeq"),t=Object(h.a)(e,2),n=t[0],a=t[1];function r(){return(r=Object(m.a)(p.a.mark((function e(t,n,r){var c,u;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b(t,n,r);case 2:c=e.sent,u=c.sequence,a(u);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return{cleanMutSeq:n,getCleanMutSeq:function(e,t,n){return r.apply(this,arguments)}}}().getCleanMutSeq,a=C().setStep;function c(){return(c=Object(m.a)(p.a.mark((function r(c,u,o){return p.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t(c,u,o),n(c,u,o),r.next=4,e(c,u,o);case 4:a(1);case 5:case"end":return r.stop()}}),r)})))).apply(this,arguments)}return r.a.createElement(T,{onSubmit:function(e,t,n){return c.apply(this,arguments)}})},G=function(){return r.a.createElement(s.a.Row,null,r.a.createElement(s.a.Column,{width:14},r.a.createElement(I,null)))},B=n(371),J=n(369),D=function(e){Object(A.a)(n,e);var t=Object(M.a)(n);function n(){var e;Object(R.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={value:e.props.options.length>0?e.props.options[0]:""},e.handleChange=function(t,n){var a=n.value;e.setState({value:a}),e.props.onChange(a)},e}return Object(P.a)(n,[{key:"render",value:function(){var e=this.state.value;return r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},this.props.title,r.a.createElement(J.a,{onChange:this.handleChange,options:this.props.options.map((function(e){return{key:e,text:e,value:e}})),placeholder:"Choose an option",selection:!0,scrolling:!0,value:e}))}}]),n}(a.Component);D.defaultProps={options:[],onChange:function(e){}};var W=function(){var e=j(),t=e.templateOptions,n=e.updateSelectedTemplateOption;return r.a.createElement(D,{title:"RT templates:",options:t.map((function(e){return e.rt})),onChange:n})},L=function(){var e=j(),t=e.pbsOptions,n=e.updateSelectedPbsOption;return r.a.createElement(D,{title:"Primer binding sites:",options:t.map((function(e){return e.pbs})),onChange:n})},z=function(){var e=j().pe3bOptions;return r.a.createElement(D,{title:"PE3b Guides:",options:e.map((function(e){return e.secondGuide}))})},F=function(){var e=j().pe3Options;return r.a.createElement(D,{title:"PE3 Guides:",options:e.map((function(e){return e.secondGuide}))})},H=n(370),U=n(53),K=n(187),Q=n.n(K),V=function(e){Object(A.a)(n,e);var t=Object(M.a)(n);function n(){var e;Object(R.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={helpText:"click to copy",isOpen:!1},e.handleCopy=function(){Q()(e.props.value),e.setState((function(){return{helpText:"you're all set"}})),console.log("indicate"),setTimeout((function(){e.setState((function(){return{helpText:"click to copy"}}))}),1e3)},e.handleMouseOver=function(){e.setState((function(){return{isOpen:!0}}))},e.handleMouseLeave=function(){e.setState((function(){return{isOpen:!1}}))},e}return Object(P.a)(n,[{key:"render",value:function(){return r.a.createElement(H.a,{content:this.state.helpText,position:"top center",open:this.state.isOpen,trigger:r.a.createElement(U.a,{name:"copy",onClick:this.handleCopy,onMouseOver:this.handleMouseOver,onMouseLeave:this.handleMouseLeave,link:!0})})}}]),n}(a.Component),X=function(){var e=function(){var e=w("pegRNA"),t=Object(h.a)(e,2);return{pegRNA:t[0],setPegRNA:t[1]}}().pegRNA;return r.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},r.a.createElement("div",null,"Final pegRNA:",r.a.createElement(V,{value:e})),r.a.createElement("p",{style:{wordBreak:"break-word"}},e))},Y=[{menuItem:"pegRNA",textAlign:"left",render:function(){return r.a.createElement(B.a.Pane,null,r.a.createElement(s.a,null,r.a.createElement(s.a.Row,null,r.a.createElement(s.a.Column,{width:8},r.a.createElement(W,null)),r.a.createElement(s.a.Column,{width:8},r.a.createElement(L,null))),r.a.createElement(s.a.Row,null,r.a.createElement(s.a.Column,{width:16},r.a.createElement(X,null)))))}},{menuItem:"PE3",textAlign:"left",render:function(){return r.a.createElement(B.a.Pane,null,r.a.createElement(s.a,null,r.a.createElement(s.a.Row,null,r.a.createElement(s.a.Column,{width:7},r.a.createElement(z,null)),r.a.createElement(s.a.Column,{width:7},r.a.createElement(F,null)))))}}],Z=function(){return r.a.createElement(B.a,{panes:Y})},$=function(){return r.a.createElement(s.a.Row,null,r.a.createElement(s.a.Column,{width:14},r.a.createElement(Z,null)))},_=n(373),ee=function(e){var t=e.step,n=void 0===t?0:t;return r.a.createElement(_.a.Group,{ordered:!0,size:"small"},r.a.createElement(_.a,{completed:n>0,active:0===n},r.a.createElement(_.a.Content,null,r.a.createElement(_.a.Title,null,"Enter"),r.a.createElement(_.a.Description,null,"Enter Sequence information"))),r.a.createElement(_.a,{completed:n>1,active:1===n},r.a.createElement(_.a.Content,null,r.a.createElement(_.a.Title,null,"Design"),r.a.createElement(_.a.Description,null,"Design your pegRNA"))))},te=function(){var e=C().step;return r.a.createElement(s.a.Row,null,r.a.createElement(s.a.Column,{width:14},r.a.createElement("div",{style:{display:"flex",justifyContent:"center"}},r.a.createElement(ee,{step:e}))))};var ne=function(){var e=C().step;return r.a.createElement("div",{style:{position:"relative"}},r.a.createElement(l,null),r.a.createElement(s.a,{centered:!0},r.a.createElement(te,null),r.a.createElement(G,null),1===e&&r.a.createElement($,null)))};u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ne,null)),document.getElementById("root"))}},[[207,1,2]]]);
//# sourceMappingURL=main.29f7f0e6.chunk.js.map