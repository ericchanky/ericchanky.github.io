(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"+lvw":function(e,t,a){"use strict";a.r(t);a("9XZr"),a("bHtr"),a("xfY5"),a("FLlr"),a("91GP");var n=a("R/WZ"),r=a("hlFM"),c=a("ofer"),o=a("PsDL"),i=a("cVXz"),l=a("o4QW"),s=a("XX3T"),d=a("tRbT"),u=a("eD//"),m=a("tVbE"),p=a("56Ss"),f=a("VmPI"),b=a("IsqK"),v=a("1waj"),h=a.n(v),g=a("gLOz"),y=a.n(g),O=a("8q3U"),j=a.n(O),E=a("xSPK"),k=a.n(E),C=a("ax+9"),I=a.n(C),x=a("/h9T"),N=a("pl0G"),S=a("jIYg");var M=a("dndX"),T=a("/Tr7");function P(e,t){Object(S.a)(2,arguments);var a=Object(T.a)(e),n=Object(T.a)(t);return a.getTime()-n.getTime()}function w(e,t){Object(S.a)(2,arguments);var a=P(e,t)/36e5;return a>0?Math.floor(a):Math.ceil(a)}function B(e,t){Object(S.a)(2,arguments);var a=P(e,t)/6e4;return a>0?Math.floor(a):Math.ceil(a)}function A(e,t){Object(S.a)(2,arguments);var a=P(e,t)/1e3;return a>0?Math.floor(a):Math.ceil(a)}var q=a("Da6A"),z=a("q1tI"),F=a.n(z),H=a("BJS0"),V=Object(n.a)((function(e){return{container:{textAlign:"center"},actions:{justifyContent:"center"},divider:{margin:e.spacing(0,2)},select:{fontSize:"2rem"},timerContainer:{margin:e.spacing(6,0)},timerName:{},rightIcon:{transform:"rotate(180deg)"}}}));t.default=Object(H.a)((function(){var e=V(),t=e.actions,a=e.container,n=e.timerContainer,v=e.divider,g=e.select,O=e.timerName,E=e.rightIcon,C=F.a.useState([{hours:0,minutes:5,seconds:5,status:"stopped"}]),T=C[0],P=C[1],z=F.a.useState({current:null,target:null}),H=z[0],L=z[1],D=F.a.useState({repeat:!1}),R=D[0],X=D[1],_=F.a.useState(0),G=_[0],K=_[1],$=F.a.useCallback((function(e){var t=e.hours,a=void 0===t?0:t,n=e.minutes,r=void 0===n?0:n,c=e.seconds,o=void 0===c?0:c;return function(e,t){Object(S.a)(2,arguments);var a=Object(x.a)(t);return Object(N.a)(e,1e3*a)}(function(e,t){Object(S.a)(2,arguments);var a=Object(x.a)(t);return Object(N.a)(e,6e4*a)}(Object(q.a)(new Date,a),r),o)}),[]),U=F.a.useMemo((function(){return T[G]}),[G,T]),W=F.a.useCallback((function(e){P((function(t){return t.map((function(t,a){return a===G?Object.assign({},t,{},e):t}))}))}),[G]),J=F.a.useCallback((function(){L((function(e){return Object.assign({},e,{current:new Date})}))}),[]);F.a.useEffect((function(){"started"===U.status&&(console.log("a"),R.repeat&&H.current&&H.target&&Object(M.a)(H.current,H.target)&&K((function(e){return e<T.length-1?e+1:0})))}),[H,R.repeat,U.status,T.length]),F.a.useEffect((function(){if("started"===U.status){L({current:new Date,target:$(U)}),J();var e=setInterval(J,1e3);return function(){return clearInterval(e)}}}),[J,U.status,U,$]);var Q=F.a.useCallback((function(){P(T.concat(T.slice(-1))),K(T.length)}),[T]);return F.a.createElement(r.a,{className:a},F.a.createElement(r.a,{className:n},F.a.createElement(c.a,{className:O,variant:"h4",paragraph:!0},G+1),F.a.createElement(o.a,{color:"inherit",onClick:function(){G>0&&K(G-1)},disabled:0===G},F.a.createElement(y.a,null)),F.a.createElement(i.a,{native:!0,className:g,variant:"outlined",value:"stopped"===U.status?U.hours:w(H.target,H.current),onChange:function(e){return W({hours:Number(e.target.value)})},IconComponent:function(){return F.a.createElement(F.a.Fragment,null)}},Array(60).fill(0).map((function(e,t){return F.a.createElement("option",{key:t,value:t},String(t).padStart(2,"0"))}))),F.a.createElement(c.a,{display:"inline",className:v},":"),F.a.createElement(i.a,{native:!0,className:g,variant:"outlined",value:"stopped"===U.status?U.minutes:B(H.target,H.current)%60,onChange:function(e){return W({minutes:Number(e.target.value)})},IconComponent:function(){return F.a.createElement(F.a.Fragment,null)}},Array(60).fill(0).map((function(e,t){return F.a.createElement("option",{key:t,value:t},String(t).padStart(2,"0"))}))),F.a.createElement(c.a,{display:"inline",className:v},":"),F.a.createElement(i.a,{native:!0,className:g,variant:"outlined",value:"stopped"===U.status?U.seconds:A(H.target,H.current)%60,onChange:function(e){return W({seconds:Number(e.target.value)})},IconComponent:function(){return F.a.createElement(F.a.Fragment,null)}},Array(60).fill(0).map((function(e,t){return F.a.createElement("option",{key:t,value:t},String(t).padStart(2,"0"))}))),F.a.createElement(o.a,{color:"inherit",className:E,onClick:function(){G<T.length-1&&K(G+1)},disabled:G===T.length-1},F.a.createElement(y.a,null))),F.a.createElement(l.a,{className:t},"started"!==U.status&&F.a.createElement(s.a,{color:"primary",onClick:function(){U.status,W({status:"started"})}},F.a.createElement(k.a,null)),"started"===U.status&&F.a.createElement(s.a,{color:"primary",onClick:function(){return W({status:"stopped"})}},F.a.createElement(I.a,null)),F.a.createElement(s.a,{color:"primary",onClick:function(){return W({status:"paused"})},disabled:"started"!==U.status},F.a.createElement(j.a,null)),F.a.createElement(s.a,{color:"primary",onClick:Q},F.a.createElement(h.a,null))),F.a.createElement(d.a,{container:!0,justify:"center"},F.a.createElement(d.a,{item:!0,xs:6},F.a.createElement(u.a,null,F.a.createElement(m.a,{button:!0,onClick:function(){return X(Object.assign({},R,{repeat:!R.repeat}))}},F.a.createElement(p.a,null,F.a.createElement(f.a,{disableRipple:!0,checked:R.repeat})),F.a.createElement(b.a,{primary:"Repeat"}))))))}),{title:"Timer"})},"1waj":function(e,t,a){"use strict";a("HAE/");var n=a("5NKs");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("q1tI")),c=(0,n(a("8/g6")).default)(r.default.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");t.default=c},"56Ss":function(e,t,a){"use strict";var n=a("k1TG"),r=a("aXB2"),c=a("q1tI"),o=(a("17x9"),a("iuhU")),i=a("H2TA"),l=a("MquD"),s=c.forwardRef((function(e,t){var a=e.classes,i=e.className,s=Object(r.a)(e,["classes","className"]),d=c.useContext(l.a);return c.createElement("div",Object(n.a)({className:Object(o.a)(a.root,i,"flex-start"===d.alignItems&&a.alignItemsFlexStart),ref:t},s))}));t.a=Object(i.a)((function(e){return{root:{minWidth:56,color:e.palette.action.active,flexShrink:0,display:"inline-flex"},alignItemsFlexStart:{marginTop:8}}}),{name:"MuiListItemIcon"})(s)},"8q3U":function(e,t,a){"use strict";a("HAE/");var n=a("5NKs");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("q1tI")),c=(0,n(a("8/g6")).default)(r.default.createElement("path",{d:"M6 19h4V5H6v14zm8-14v14h4V5h-4z"}),"Pause");t.default=c},IsqK:function(e,t,a){"use strict";var n=a("k1TG"),r=a("aXB2"),c=a("q1tI"),o=(a("17x9"),a("iuhU")),i=a("H2TA"),l=a("ofer"),s=a("MquD"),d=c.forwardRef((function(e,t){var a=e.children,i=e.classes,d=e.className,u=e.disableTypography,m=void 0!==u&&u,p=e.inset,f=void 0!==p&&p,b=e.primary,v=e.primaryTypographyProps,h=e.secondary,g=e.secondaryTypographyProps,y=Object(r.a)(e,["children","classes","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"]),O=c.useContext(s.a).dense,j=null!=b?b:a;null==j||j.type===l.a||m||(j=c.createElement(l.a,Object(n.a)({variant:O?"body2":"body1",className:i.primary,component:"span",display:"block"},v),j));var E=h;return null==E||E.type===l.a||m||(E=c.createElement(l.a,Object(n.a)({variant:"body2",className:i.secondary,color:"textSecondary",display:"block"},g),E)),c.createElement("div",Object(n.a)({className:Object(o.a)(i.root,d,O&&i.dense,f&&i.inset,j&&E&&i.multiline),ref:t},y),j,E)}));t.a=Object(i.a)({root:{flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},multiline:{marginTop:6,marginBottom:6},dense:{},inset:{paddingLeft:56},primary:{},secondary:{}},{name:"MuiListItemText"})(d)},VmPI:function(e,t,a){"use strict";var n=a("k1TG"),r=a("aXB2"),c=a("q1tI"),o=(a("17x9"),a("iuhU")),i=(a("f3/d"),a("8j0Q")),l=a("yCxk"),s=a("EHdT"),d=a("H2TA"),u=a("PsDL"),m=c.forwardRef((function(e,t){var a=e.autoFocus,d=e.checked,m=e.checkedIcon,p=e.classes,f=e.className,b=e.defaultChecked,v=e.disabled,h=e.icon,g=e.id,y=e.inputProps,O=e.inputRef,j=e.name,E=e.onBlur,k=e.onChange,C=e.onFocus,I=e.readOnly,x=e.required,N=e.tabIndex,S=e.type,M=e.value,T=Object(r.a)(e,["autoFocus","checked","checkedIcon","classes","className","defaultChecked","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"]),P=Object(l.a)({controlled:d,default:Boolean(b),name:"SwitchBase"}),w=Object(i.a)(P,2),B=w[0],A=w[1],q=Object(s.a)(),z=v;q&&void 0===z&&(z=q.disabled);var F="checkbox"===S||"radio"===S;return c.createElement(u.a,Object(n.a)({component:"span",className:Object(o.a)(p.root,f,B&&p.checked,z&&p.disabled),disabled:z,tabIndex:null,role:void 0,onFocus:function(e){C&&C(e),q&&q.onFocus&&q.onFocus(e)},onBlur:function(e){E&&E(e),q&&q.onBlur&&q.onBlur(e)},ref:t},T),c.createElement("input",Object(n.a)({autoFocus:a,checked:d,defaultChecked:b,className:p.input,disabled:z,id:F&&g,name:j,onChange:function(e){var t=e.target.checked;A(t),k&&k(e,t)},readOnly:I,ref:O,required:x,tabIndex:N,type:S,value:M},y)),B?m:h)})),p=Object(d.a)({root:{padding:9},checked:{},disabled:{},input:{cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}},{name:"PrivateSwitchBase"})(m),f=a("As0B"),b=Object(f.a)(c.createElement("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),v=Object(f.a)(c.createElement("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),h=a("ye/S"),g=Object(f.a)(c.createElement("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),y=a("NqtD"),O=c.createElement(v,null),j=c.createElement(b,null),E=c.createElement(g,null),k=c.forwardRef((function(e,t){var a=e.checkedIcon,i=void 0===a?O:a,l=e.classes,s=e.color,d=void 0===s?"secondary":s,u=e.icon,m=void 0===u?j:u,f=e.indeterminate,b=void 0!==f&&f,v=e.indeterminateIcon,h=void 0===v?E:v,g=e.inputProps,k=e.size,C=void 0===k?"medium":k,I=Object(r.a)(e,["checkedIcon","classes","color","icon","indeterminate","indeterminateIcon","inputProps","size"]);return c.createElement(p,Object(n.a)({type:"checkbox",classes:{root:Object(o.a)(l.root,l["color".concat(Object(y.a)(d))],b&&l.indeterminate),checked:l.checked,disabled:l.disabled},color:d,inputProps:Object(n.a)({"data-indeterminate":b},g),icon:c.cloneElement(b?h:m,{fontSize:"small"===C?"small":"default"}),checkedIcon:c.cloneElement(b?h:i,{fontSize:"small"===C?"small":"default"}),ref:t},I))}));t.a=Object(d.a)((function(e){return{root:{color:e.palette.text.secondary},checked:{},disabled:{},indeterminate:{},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(h.b)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(h.b)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}}}}),{name:"MuiCheckbox"})(k)},"ax+9":function(e,t,a){"use strict";a("HAE/");var n=a("5NKs");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("q1tI")),c=(0,n(a("8/g6")).default)(r.default.createElement("path",{d:"M6 6h12v12H6z"}),"Stop");t.default=c},gLOz:function(e,t,a){"use strict";a("HAE/");var n=a("5NKs");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("q1tI")),c=(0,n(a("8/g6")).default)(r.default.createElement("path",{d:"M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"}),"ArrowBackIos");t.default=c},o4QW:function(e,t,a){"use strict";var n=a("k1TG"),r=a("aXB2"),c=a("q1tI"),o=(a("17x9"),a("iuhU")),i=a("H2TA"),l=c.forwardRef((function(e,t){var a=e.disableSpacing,i=void 0!==a&&a,l=e.classes,s=e.className,d=Object(r.a)(e,["disableSpacing","classes","className"]);return c.createElement("div",Object(n.a)({className:Object(o.a)(l.root,s,!i&&l.spacing),ref:t},d))}));t.a=Object(i.a)({root:{display:"flex",alignItems:"center",padding:8},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiCardActions"})(l)},tVbE:function(e,t,a){"use strict";var n=a("k1TG"),r=a("aXB2"),c=a("q1tI"),o=(a("17x9"),a("iuhU")),i=a("H2TA"),l=a("VD++"),s=a("ucBr"),d=a("bfFb"),u=a("MquD"),m=a("i8i4"),p="undefined"==typeof window?c.useEffect:c.useLayoutEffect,f=c.forwardRef((function(e,t){var a=e.alignItems,i=void 0===a?"center":a,f=e.autoFocus,b=void 0!==f&&f,v=e.button,h=void 0!==v&&v,g=e.children,y=e.classes,O=e.className,j=e.component,E=e.ContainerComponent,k=void 0===E?"li":E,C=e.ContainerProps,I=(C=void 0===C?{}:C).className,x=Object(r.a)(C,["className"]),N=e.dense,S=void 0!==N&&N,M=e.disabled,T=void 0!==M&&M,P=e.disableGutters,w=void 0!==P&&P,B=e.divider,A=void 0!==B&&B,q=e.focusVisibleClassName,z=e.selected,F=void 0!==z&&z,H=Object(r.a)(e,["alignItems","autoFocus","button","children","classes","className","component","ContainerComponent","ContainerProps","dense","disabled","disableGutters","divider","focusVisibleClassName","selected"]),V=c.useContext(u.a),L={dense:S||V.dense||!1,alignItems:i},D=c.useRef(null);p((function(){b&&D.current&&D.current.focus()}),[b]);var R=c.Children.toArray(g),X=R.length&&Object(s.a)(R[R.length-1],["ListItemSecondaryAction"]),_=c.useCallback((function(e){D.current=m.findDOMNode(e)}),[]),G=Object(d.a)(_,t),K=Object(n.a)({className:Object(o.a)(y.root,O,L.dense&&y.dense,!w&&y.gutters,A&&y.divider,T&&y.disabled,h&&y.button,"center"!==i&&y.alignItemsFlexStart,X&&y.secondaryAction,F&&y.selected),disabled:T},H),$=j||"li";return h&&(K.component=j||"div",K.focusVisibleClassName=Object(o.a)(y.focusVisible,q),$=l.a),X?($=K.component||j?$:"div","li"===k&&("li"===$?$="div":"li"===K.component&&(K.component="div")),c.createElement(u.a.Provider,{value:L},c.createElement(k,Object(n.a)({className:Object(o.a)(y.container,I),ref:G},x),c.createElement($,K,R),R.pop()))):c.createElement(u.a.Provider,{value:L},c.createElement($,Object(n.a)({ref:G},K),R))}));t.a=Object(i.a)((function(e){return{root:{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,"&$focusVisible":{backgroundColor:e.palette.action.selected},"&$selected, &$selected:hover":{backgroundColor:e.palette.action.selected},"&$disabled":{opacity:.5}},container:{position:"relative"},focusVisible:{},dense:{paddingTop:4,paddingBottom:4},alignItemsFlexStart:{alignItems:"flex-start"},disabled:{},divider:{borderBottom:"1px solid ".concat(e.palette.divider),backgroundClip:"padding-box"},gutters:{paddingLeft:16,paddingRight:16},button:{transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:e.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},secondaryAction:{paddingRight:48},selected:{}}}),{name:"MuiListItem"})(f)},xSPK:function(e,t,a){"use strict";a("HAE/");var n=a("5NKs");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("q1tI")),c=(0,n(a("8/g6")).default)(r.default.createElement("path",{d:"M8 5v14l11-7z"}),"PlayArrow");t.default=c}}]);
//# sourceMappingURL=component---src-pages-timer-tsx-2046830f4778b1b58c7a.js.map