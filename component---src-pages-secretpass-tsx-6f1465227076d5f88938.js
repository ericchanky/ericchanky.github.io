(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"7SZd":function(e,t,a){"use strict";var n=a("k1TG"),r=a("aXB2"),i=a("q1tI"),l=(a("17x9"),a("iuhU")),c=a("ofer"),o=a("H2TA"),s=a("4hqb"),u=i.forwardRef((function(e,t){var a=e.children,o=e.classes,u=e.className,d=e.component,m=void 0===d?"div":d,f=e.disablePointerEvents,h=void 0!==f&&f,v=e.disableTypography,p=void 0!==v&&v,b=e.position,g=e.variant,E=Object(r.a)(e,["children","classes","className","component","disablePointerEvents","disableTypography","position","variant"]),C=Object(s.b)()||{},j=g;return g&&C.variant,C&&!j&&(j=C.variant),i.createElement(s.a.Provider,{value:null},i.createElement(m,Object(n.a)({className:Object(l.a)(o.root,u,h&&o.disablePointerEvents,C.hiddenLabel&&o.hiddenLabel,"filled"===j&&o.filled,{start:o.positionStart,end:o.positionEnd}[b],"dense"===C.margin&&o.marginDense),ref:t},E),"string"!=typeof a||p?a:i.createElement(c.a,{color:"textSecondary"},a)))}));t.a=Object(o.a)({root:{display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap"},filled:{"&$positionStart:not($hiddenLabel)":{marginTop:16}},positionStart:{marginRight:8},positionEnd:{marginLeft:8},disablePointerEvents:{pointerEvents:"none"},hiddenLabel:{},marginDense:{}},{name:"MuiInputAdornment"})(u)},"7frF":function(e,t,a){"use strict";a("HAE/");var n=a("5NKs");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("q1tI")),i=(0,n(a("8/g6")).default)(r.default.createElement("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility");t.default=i},"CRf/":function(e,t,a){"use strict";a("HAE/");var n=a("5NKs");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("q1tI")),i=(0,n(a("8/g6")).default)(r.default.createElement("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff");t.default=i},j4o6:function(e,t,a){"use strict";a.r(t);var n=a("R/WZ"),r=a("tRbT"),i=a("ofer"),l=a("r9w1"),c=a("7SZd"),o=a("PsDL"),s=a("Z3vd"),u=a("7frF"),d=a.n(u),m=a("CRf/"),f=a.n(m),h=a("q1tI"),v=a.n(h),p=a("k0/U"),b=a("BJS0"),g=(a("xfY5"),a("Vd3H"),a("KKXr"),"ybfDNvPQJz5kTncAY2MWFs8ueiSw4BpLX6GqKx3h9trUZgVRdEC1am7H0"),E=function(e,t){void 0===t&&(t="");var a=e.split("").map((function(e){return e.charCodeAt(0)})).join(""),n=function e(t,a){void 0===a&&(a=g);var n=Math.floor(t/a.length);return 0===n?a[t%a.length]:""+a[t%a.length]+e(n,a)}(Number(a),function(e,t){if(void 0===t&&(t=g),!e)return t;var a=e.split("").reduce((function(e,t){return e+t.charCodeAt(0)}),0);return t.split("").sort((function(e,t){return e.charCodeAt(0)*t.charCodeAt(0)%a-e.charCodeAt(0)})).join("")}(t)),r=Math.floor(.618*n.length);return n.slice(0,r)+"."+n.slice(r)},C=Object(n.a)({fullHeihgt:{height:"100%"},center:{textAlign:"center"}});t.default=Object(b.a)((function(){var e=C(),t=Object(h.useState)(!1),a=t[0],n=t[1],u=Object(h.useState)(""),m=u[0],b=u[1],g=Object(h.useState)(""),j=g[0],y=g[1],O=function(){var e=Object(h.useRef)(null),t=Object(h.useCallback)((function(){e.current&&(e.current.select(),document.execCommand("copy"))}),[]);return[e,t]}(),x=O[0],S=O[1],w=Object(h.useMemo)((function(){return m?E(m,j):""}),[j,m]);return v.a.createElement(p.a,null,v.a.createElement(r.a,{container:!0,spacing:2,alignContent:"center",className:e.fullHeihgt},v.a.createElement(r.a,{item:!0,xs:12,className:e.center},v.a.createElement(i.a,{variant:"h4"},"Secret Pass")),v.a.createElement(r.a,{item:!0,xs:12},v.a.createElement(l.a,{fullWidth:!0,variant:"outlined",size:"small",placeholder:"Context",value:j,onChange:function(e){return y(e.target.value)}})),v.a.createElement(r.a,{item:!0,xs:12},v.a.createElement(l.a,{fullWidth:!0,variant:"outlined",size:"small",type:a?"text":"password",placeholder:"Passcode",value:m,onChange:function(e){return b(e.target.value)},InputProps:{endAdornment:v.a.createElement(c.a,{position:"end"},v.a.createElement(o.a,{color:"secondary",onClick:function(){return n((function(e){return!e}))}},a?v.a.createElement(f.a,null):v.a.createElement(d.a,null)))}})),v.a.createElement(r.a,{item:!0,xs:12},v.a.createElement(l.a,{fullWidth:!0,"aria-readonly":!0,inputRef:x,variant:"outlined",size:"small",placeholder:"Secret Code",value:w})),v.a.createElement(r.a,{item:!0,xs:12,className:e.center},v.a.createElement(s.a,{onClick:function(){S(),b("")}},"Copy"))))}),{title:"Secret Pass",disableHeader:!0,theme:"dark"})},"k0/U":function(e,t,a){"use strict";var n=a("R/WZ"),r=a("hlFM"),i=a("q1tI"),l=a.n(i),c=Object(n.a)({container:{maxWidth:960,margin:"auto",width:"90%",height:"100vh"}});t.a=function(e){var t=e.children,a=c();return l.a.createElement(r.a,{className:a.container},t)}}}]);
//# sourceMappingURL=component---src-pages-secretpass-tsx-6f1465227076d5f88938.js.map