(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"+lvw":function(e,t,a){"use strict";a.r(t);a("9XZr"),a("bHtr"),a("xfY5"),a("FLlr"),a("91GP");var n=a("R/WZ"),r=a("hlFM"),o=a("ofer"),i=a("PsDL"),c=a("cVXz"),l=a("o4QW"),s=a("XX3T"),d=a("tRbT"),u=a("eD//"),m=a("tVbE"),p=a("56Ss"),b=a("VmPI"),f=a("IsqK"),h=a("1waj"),v=a.n(h),g=a("gLOz"),y=a.n(g),O=a("8q3U"),j=a.n(O),k=a("xSPK"),E=a.n(k),C=a("ax+9"),x=a.n(C),I=a("/h9T"),N=a("pl0G"),w=a("jIYg");var S=a("dndX"),T=a("/Tr7");function M(e,t){Object(w.a)(2,arguments);var a=Object(T.a)(e),n=Object(T.a)(t);return a.getTime()-n.getTime()}function z(e,t){Object(w.a)(2,arguments);var a=M(e,t)/36e5;return a>0?Math.floor(a):Math.ceil(a)}function P(e,t){Object(w.a)(2,arguments);var a=M(e,t)/6e4;return a>0?Math.floor(a):Math.ceil(a)}function B(e,t){Object(w.a)(2,arguments);var a=M(e,t)/1e3;return a>0?Math.floor(a):Math.ceil(a)}var A=a("Da6A"),V=a("q1tI"),q=a.n(V),F=a("soUV"),H=Object(n.a)((function(e){return{container:{textAlign:"center"},actions:{justifyContent:"center"},divider:{margin:e.spacing(0,2)},select:{fontSize:"2rem"},timerContainer:{margin:e.spacing(6,0)},timerName:{},rightIcon:{transform:"rotate(180deg)"}}}));t.default=Object(F.a)((function(){var e=H(),t=e.actions,a=e.container,n=e.timerContainer,h=e.divider,g=e.select,O=e.timerName,k=e.rightIcon,C=q.a.useState([{hours:0,minutes:5,seconds:5,status:"stopped"}]),T=C[0],M=C[1],V=q.a.useState({current:null,target:null}),F=V[0],R=V[1],D=q.a.useState({repeat:!1}),L=D[0],X=D[1],$=q.a.useState(0),G=$[0],_=$[1],K=q.a.useCallback((function(e){var t=e.hours,a=void 0===t?0:t,n=e.minutes,r=void 0===n?0:n,o=e.seconds,i=void 0===o?0:o;return function(e,t){Object(w.a)(2,arguments);var a=Object(I.a)(t);return Object(N.a)(e,1e3*a)}(function(e,t){Object(w.a)(2,arguments);var a=Object(I.a)(t);return Object(N.a)(e,6e4*a)}(Object(A.a)(new Date,a),r),i)}),[]),U=q.a.useMemo((function(){return T[G]}),[G,T]),W=q.a.useCallback((function(e){M((function(t){return t.map((function(t,a){return a===G?Object.assign({},t,{},e):t}))}))}),[G]),Q=q.a.useCallback((function(){R((function(e){return Object.assign({},e,{current:new Date})}))}),[]);q.a.useEffect((function(){"started"===U.status&&(console.log("a"),L.repeat&&F.current&&F.target&&Object(S.a)(F.current,F.target)&&_((function(e){return e<T.length-1?e+1:0})))}),[F,L.repeat,U.status,T.length]),q.a.useEffect((function(){if("started"===U.status){R({current:new Date,target:K(U)}),Q();var e=setInterval(Q,1e3);return function(){return clearInterval(e)}}}),[Q,U.status,U,K]);var J=q.a.useCallback((function(){M(T.concat(T.slice(-1))),_(T.length)}),[T]);return q.a.createElement(r.a,{className:a},q.a.createElement(r.a,{className:n},q.a.createElement(o.a,{className:O,variant:"h4",paragraph:!0},G+1),q.a.createElement(i.a,{color:"inherit",onClick:function(){G>0&&_(G-1)},disabled:0===G},q.a.createElement(y.a,null)),q.a.createElement(c.a,{native:!0,className:g,variant:"outlined",value:"stopped"===U.status?U.hours:z(F.target,F.current),onChange:function(e){return W({hours:Number(e.target.value)})},IconComponent:function(){return q.a.createElement(q.a.Fragment,null)}},Array(60).fill(0).map((function(e,t){return q.a.createElement("option",{key:t,value:t},String(t).padStart(2,"0"))}))),q.a.createElement(o.a,{display:"inline",className:h},":"),q.a.createElement(c.a,{native:!0,className:g,variant:"outlined",value:"stopped"===U.status?U.minutes:P(F.target,F.current)%60,onChange:function(e){return W({minutes:Number(e.target.value)})},IconComponent:function(){return q.a.createElement(q.a.Fragment,null)}},Array(60).fill(0).map((function(e,t){return q.a.createElement("option",{key:t,value:t},String(t).padStart(2,"0"))}))),q.a.createElement(o.a,{display:"inline",className:h},":"),q.a.createElement(c.a,{native:!0,className:g,variant:"outlined",value:"stopped"===U.status?U.seconds:B(F.target,F.current)%60,onChange:function(e){return W({seconds:Number(e.target.value)})},IconComponent:function(){return q.a.createElement(q.a.Fragment,null)}},Array(60).fill(0).map((function(e,t){return q.a.createElement("option",{key:t,value:t},String(t).padStart(2,"0"))}))),q.a.createElement(i.a,{color:"inherit",className:k,onClick:function(){G<T.length-1&&_(G+1)},disabled:G===T.length-1},q.a.createElement(y.a,null))),q.a.createElement(l.a,{className:t},"started"!==U.status&&q.a.createElement(s.a,{color:"primary",onClick:function(){U.status,W({status:"started"})}},q.a.createElement(E.a,null)),"started"===U.status&&q.a.createElement(s.a,{color:"primary",onClick:function(){return W({status:"stopped"})}},q.a.createElement(x.a,null)),q.a.createElement(s.a,{color:"primary",onClick:function(){return W({status:"paused"})},disabled:"started"!==U.status},q.a.createElement(j.a,null)),q.a.createElement(s.a,{color:"primary",onClick:J},q.a.createElement(v.a,null))),q.a.createElement(d.a,{container:!0,justify:"center"},q.a.createElement(d.a,{item:!0,xs:6},q.a.createElement(u.a,null,q.a.createElement(m.a,{button:!0,onClick:function(){return X(Object.assign({},L,{repeat:!L.repeat}))}},q.a.createElement(p.a,null,q.a.createElement(b.a,{disableRipple:!0,checked:L.repeat})),q.a.createElement(f.a,{primary:"Repeat"}))))))}),{title:"Timer"})},"1waj":function(e,t,a){"use strict";a("HAE/");var n=a("5NKs");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("q1tI")),o=(0,n(a("8/g6")).default)(r.default.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");t.default=o},"56Ss":function(e,t,a){"use strict";var n=a("k1TG"),r=a("aXB2"),o=a("q1tI"),i=(a("17x9"),a("iuhU")),c=a("H2TA"),l=a("MquD"),s=o.forwardRef((function(e,t){var a=e.classes,c=e.className,s=Object(r.a)(e,["classes","className"]),d=o.useContext(l.a);return o.createElement("div",Object(n.a)({className:Object(i.a)(a.root,c,"flex-start"===d.alignItems&&a.alignItemsFlexStart),ref:t},s))}));t.a=Object(c.a)((function(e){return{root:{minWidth:56,color:e.palette.action.active,flexShrink:0,display:"inline-flex"},alignItemsFlexStart:{marginTop:8}}}),{name:"MuiListItemIcon"})(s)},"8q3U":function(e,t,a){"use strict";a("HAE/");var n=a("5NKs");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("q1tI")),o=(0,n(a("8/g6")).default)(r.default.createElement("path",{d:"M6 19h4V5H6v14zm8-14v14h4V5h-4z"}),"Pause");t.default=o},IsqK:function(e,t,a){"use strict";var n=a("k1TG"),r=a("aXB2"),o=a("q1tI"),i=(a("17x9"),a("iuhU")),c=a("H2TA"),l=a("ofer"),s=a("MquD"),d=o.forwardRef((function(e,t){var a=e.children,c=e.classes,d=e.className,u=e.disableTypography,m=void 0!==u&&u,p=e.inset,b=void 0!==p&&p,f=e.primary,h=e.primaryTypographyProps,v=e.secondary,g=e.secondaryTypographyProps,y=Object(r.a)(e,["children","classes","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"]),O=o.useContext(s.a).dense,j=null!=f?f:a;null==j||j.type===l.a||m||(j=o.createElement(l.a,Object(n.a)({variant:O?"body2":"body1",className:c.primary,component:"span",display:"block"},h),j));var k=v;return null==k||k.type===l.a||m||(k=o.createElement(l.a,Object(n.a)({variant:"body2",className:c.secondary,color:"textSecondary",display:"block"},g),k)),o.createElement("div",Object(n.a)({className:Object(i.a)(c.root,d,O&&c.dense,b&&c.inset,j&&k&&c.multiline),ref:t},y),j,k)}));t.a=Object(c.a)({root:{flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},multiline:{marginTop:6,marginBottom:6},dense:{},inset:{paddingLeft:56},primary:{},secondary:{}},{name:"MuiListItemText"})(d)},VmPI:function(e,t,a){"use strict";var n=a("k1TG"),r=a("aXB2"),o=a("q1tI"),i=(a("17x9"),a("iuhU")),c=(a("f3/d"),a("8j0Q")),l=a("yCxk"),s=a("EHdT"),d=a("H2TA"),u=a("PsDL"),m=o.forwardRef((function(e,t){var a=e.autoFocus,d=e.checked,m=e.checkedIcon,p=e.classes,b=e.className,f=e.defaultChecked,h=e.disabled,v=e.icon,g=e.id,y=e.inputProps,O=e.inputRef,j=e.name,k=e.onBlur,E=e.onChange,C=e.onFocus,x=e.readOnly,I=e.required,N=e.tabIndex,w=e.type,S=e.value,T=Object(r.a)(e,["autoFocus","checked","checkedIcon","classes","className","defaultChecked","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"]),M=Object(l.a)({controlled:d,default:Boolean(f),name:"SwitchBase"}),z=Object(c.a)(M,2),P=z[0],B=z[1],A=Object(s.a)(),V=h;A&&void 0===V&&(V=A.disabled);var q="checkbox"===w||"radio"===w;return o.createElement(u.a,Object(n.a)({component:"span",className:Object(i.a)(p.root,b,P&&p.checked,V&&p.disabled),disabled:V,tabIndex:null,role:void 0,onFocus:function(e){C&&C(e),A&&A.onFocus&&A.onFocus(e)},onBlur:function(e){k&&k(e),A&&A.onBlur&&A.onBlur(e)},ref:t},T),o.createElement("input",Object(n.a)({autoFocus:a,checked:d,defaultChecked:f,className:p.input,disabled:V,id:q&&g,name:j,onChange:function(e){var t=e.target.checked;B(t),E&&E(e,t)},readOnly:x,ref:O,required:I,tabIndex:N,type:w,value:S},y)),P?m:v)})),p=Object(d.a)({root:{padding:9},checked:{},disabled:{},input:{cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}},{name:"PrivateSwitchBase"})(m),b=a("As0B"),f=Object(b.a)(o.createElement("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),h=Object(b.a)(o.createElement("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),v=a("ye/S"),g=Object(b.a)(o.createElement("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),y=a("NqtD"),O=o.createElement(h,null),j=o.createElement(f,null),k=o.createElement(g,null),E=o.forwardRef((function(e,t){var a=e.checkedIcon,c=void 0===a?O:a,l=e.classes,s=e.color,d=void 0===s?"secondary":s,u=e.icon,m=void 0===u?j:u,b=e.indeterminate,f=void 0!==b&&b,h=e.indeterminateIcon,v=void 0===h?k:h,g=e.inputProps,E=e.size,C=void 0===E?"medium":E,x=Object(r.a)(e,["checkedIcon","classes","color","icon","indeterminate","indeterminateIcon","inputProps","size"]);return o.createElement(p,Object(n.a)({type:"checkbox",classes:{root:Object(i.a)(l.root,l["color".concat(Object(y.a)(d))],f&&l.indeterminate),checked:l.checked,disabled:l.disabled},color:d,inputProps:Object(n.a)({"data-indeterminate":f},g),icon:o.cloneElement(f?v:m,{fontSize:"small"===C?"small":"default"}),checkedIcon:o.cloneElement(f?v:c,{fontSize:"small"===C?"small":"default"}),ref:t},x))}));t.a=Object(d.a)((function(e){return{root:{color:e.palette.text.secondary},checked:{},disabled:{},indeterminate:{},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(v.b)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(v.b)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}}}}),{name:"MuiCheckbox"})(E)},XX3T:function(e,t,a){"use strict";var n=a("aXB2"),r=a("k1TG"),o=a("q1tI"),i=(a("17x9"),a("iuhU")),c=a("H2TA"),l=a("VD++"),s=a("NqtD"),d=o.forwardRef((function(e,t){var a=e.children,c=e.classes,d=e.className,u=e.color,m=void 0===u?"default":u,p=e.component,b=void 0===p?"button":p,f=e.disabled,h=void 0!==f&&f,v=e.disableFocusRipple,g=void 0!==v&&v,y=e.focusVisibleClassName,O=e.size,j=void 0===O?"large":O,k=e.variant,E=void 0===k?"round":k,C=Object(n.a)(e,["children","classes","className","color","component","disabled","disableFocusRipple","focusVisibleClassName","size","variant"]);return o.createElement(l.a,Object(r.a)({className:Object(i.a)(c.root,d,"round"!==E&&c.extended,"large"!==j&&c["size".concat(Object(s.a)(j))],h&&c.disabled,{primary:c.primary,secondary:c.secondary,inherit:c.colorInherit}[m]),component:b,disabled:h,focusRipple:!g,focusVisibleClassName:Object(i.a)(c.focusVisible,y),ref:t},C),o.createElement("span",{className:c.label},a))}));t.a=Object(c.a)((function(e){return{root:Object(r.a)({},e.typography.button,{boxSizing:"border-box",minHeight:36,transition:e.transitions.create(["background-color","box-shadow","border"],{duration:e.transitions.duration.short}),borderRadius:"50%",padding:0,minWidth:0,width:56,height:56,boxShadow:e.shadows[6],"&:active":{boxShadow:e.shadows[12]},color:e.palette.getContrastText(e.palette.grey[300]),backgroundColor:e.palette.grey[300],"&:hover":{backgroundColor:e.palette.grey.A100,"@media (hover: none)":{backgroundColor:e.palette.grey[300]},"&$disabled":{backgroundColor:e.palette.action.disabledBackground},textDecoration:"none"},"&$focusVisible":{boxShadow:e.shadows[6]},"&$disabled":{color:e.palette.action.disabled,boxShadow:e.shadows[0],backgroundColor:e.palette.action.disabledBackground}}),label:{width:"100%",display:"inherit",alignItems:"inherit",justifyContent:"inherit"},primary:{color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.main,"&:hover":{backgroundColor:e.palette.primary.dark,"@media (hover: none)":{backgroundColor:e.palette.primary.main}}},secondary:{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.main,"&:hover":{backgroundColor:e.palette.secondary.dark,"@media (hover: none)":{backgroundColor:e.palette.secondary.main}}},extended:{borderRadius:24,padding:"0 16px",width:"auto",minHeight:"auto",minWidth:48,height:48,"&$sizeSmall":{width:"auto",padding:"0 8px",borderRadius:17,minWidth:34,height:34},"&$sizeMedium":{width:"auto",padding:"0 16px",borderRadius:20,minWidth:40,height:40}},focusVisible:{},disabled:{},colorInherit:{color:"inherit"},sizeSmall:{width:40,height:40},sizeMedium:{width:48,height:48}}}),{name:"MuiFab"})(d)},"ax+9":function(e,t,a){"use strict";a("HAE/");var n=a("5NKs");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("q1tI")),o=(0,n(a("8/g6")).default)(r.default.createElement("path",{d:"M6 6h12v12H6z"}),"Stop");t.default=o},gLOz:function(e,t,a){"use strict";a("HAE/");var n=a("5NKs");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("q1tI")),o=(0,n(a("8/g6")).default)(r.default.createElement("path",{d:"M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"}),"ArrowBackIos");t.default=o},o4QW:function(e,t,a){"use strict";var n=a("k1TG"),r=a("aXB2"),o=a("q1tI"),i=(a("17x9"),a("iuhU")),c=a("H2TA"),l=o.forwardRef((function(e,t){var a=e.disableSpacing,c=void 0!==a&&a,l=e.classes,s=e.className,d=Object(r.a)(e,["disableSpacing","classes","className"]);return o.createElement("div",Object(n.a)({className:Object(i.a)(l.root,s,!c&&l.spacing),ref:t},d))}));t.a=Object(c.a)({root:{display:"flex",alignItems:"center",padding:8},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiCardActions"})(l)},tVbE:function(e,t,a){"use strict";var n=a("k1TG"),r=a("aXB2"),o=a("q1tI"),i=(a("17x9"),a("iuhU")),c=a("H2TA"),l=a("VD++"),s=a("ucBr"),d=a("bfFb"),u=a("MquD"),m=a("i8i4"),p="undefined"==typeof window?o.useEffect:o.useLayoutEffect,b=o.forwardRef((function(e,t){var a=e.alignItems,c=void 0===a?"center":a,b=e.autoFocus,f=void 0!==b&&b,h=e.button,v=void 0!==h&&h,g=e.children,y=e.classes,O=e.className,j=e.component,k=e.ContainerComponent,E=void 0===k?"li":k,C=e.ContainerProps,x=(C=void 0===C?{}:C).className,I=Object(r.a)(C,["className"]),N=e.dense,w=void 0!==N&&N,S=e.disabled,T=void 0!==S&&S,M=e.disableGutters,z=void 0!==M&&M,P=e.divider,B=void 0!==P&&P,A=e.focusVisibleClassName,V=e.selected,q=void 0!==V&&V,F=Object(r.a)(e,["alignItems","autoFocus","button","children","classes","className","component","ContainerComponent","ContainerProps","dense","disabled","disableGutters","divider","focusVisibleClassName","selected"]),H=o.useContext(u.a),R={dense:w||H.dense||!1,alignItems:c},D=o.useRef(null);p((function(){f&&D.current&&D.current.focus()}),[f]);var L=o.Children.toArray(g),X=L.length&&Object(s.a)(L[L.length-1],["ListItemSecondaryAction"]),$=o.useCallback((function(e){D.current=m.findDOMNode(e)}),[]),G=Object(d.a)($,t),_=Object(n.a)({className:Object(i.a)(y.root,O,R.dense&&y.dense,!z&&y.gutters,B&&y.divider,T&&y.disabled,v&&y.button,"center"!==c&&y.alignItemsFlexStart,X&&y.secondaryAction,q&&y.selected),disabled:T},F),K=j||"li";return v&&(_.component=j||"div",_.focusVisibleClassName=Object(i.a)(y.focusVisible,A),K=l.a),X?(K=_.component||j?K:"div","li"===E&&("li"===K?K="div":"li"===_.component&&(_.component="div")),o.createElement(u.a.Provider,{value:R},o.createElement(E,Object(n.a)({className:Object(i.a)(y.container,x),ref:G},I),o.createElement(K,_,L),L.pop()))):o.createElement(u.a.Provider,{value:R},o.createElement(K,Object(n.a)({ref:G},_),L))}));t.a=Object(c.a)((function(e){return{root:{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,"&$focusVisible":{backgroundColor:e.palette.action.selected},"&$selected, &$selected:hover":{backgroundColor:e.palette.action.selected},"&$disabled":{opacity:.5}},container:{position:"relative"},focusVisible:{},dense:{paddingTop:4,paddingBottom:4},alignItemsFlexStart:{alignItems:"flex-start"},disabled:{},divider:{borderBottom:"1px solid ".concat(e.palette.divider),backgroundClip:"padding-box"},gutters:{paddingLeft:16,paddingRight:16},button:{transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:e.palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}},secondaryAction:{paddingRight:48},selected:{}}}),{name:"MuiListItem"})(b)},xSPK:function(e,t,a){"use strict";a("HAE/");var n=a("5NKs");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("q1tI")),o=(0,n(a("8/g6")).default)(r.default.createElement("path",{d:"M8 5v14l11-7z"}),"PlayArrow");t.default=o}}]);
//# sourceMappingURL=component---src-pages-timer-tsx-0817169c38b5c1a67bfc.js.map