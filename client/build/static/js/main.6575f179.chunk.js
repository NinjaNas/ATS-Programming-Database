(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{33:function(e,t,n){e.exports=n(49)},41:function(e,t,n){},43:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var a=n(1),l=n.n(a),c=n(28),u=n.n(c),r=(n(41),n(43),n(32)),o=n(0);var m=function(){return l.a.createElement("div",null,l.a.createElement("h1",null," Boomerang Staff, welcome to ATS"))};var i=function(){return l.a.createElement("div",null,l.a.createElement("h1",null," Student, welcome to ATS"))},s=n(4),E=n(23);var p=function(){var e=Object(a.useState)(""),t=Object(s.a)(e,2),n=t[0],c=t[1],u=Object(a.useState)(""),r=Object(s.a)(u,2),o=r[0],m=r[1],i=Object(a.useState)(""),p=Object(s.a)(i,2),f=p[0],g=p[1];return l.a.createElement("div",{className:"App"},l.a.createElement("div",{className:"information"},l.a.createElement("label",null,"First Name:"),l.a.createElement("input",{type:"text",onChange:function(e){c(e.target.value)}}),l.a.createElement("label",null,"Last Name:"),l.a.createElement("input",{type:"text",onChange:function(e){m(e.target.value)}}),l.a.createElement("label",null,"Email:"),l.a.createElement("input",{type:"text",onChange:function(e){g(e.target.value)}}),l.a.createElement("button",{onClick:function(){E.a.get("http://localhost:3000/insert",{fname:n,lname:o,email:f}).then(function(){console.log("succes")})}},"Sign-in")))};var f=function(){var e=Object(a.useState)(""),t=Object(s.a)(e,2),n=t[0],c=t[1],u=Object(a.useState)(""),r=Object(s.a)(u,2),o=r[0],m=r[1],i=Object(a.useState)(""),p=Object(s.a)(i,2),f=p[0],g=p[1];return l.a.createElement("div",{className:"App"},l.a.createElement("div",{className:"information"},l.a.createElement("label",null,"First Name:"),l.a.createElement("input",{type:"text",onChange:function(e){c(e.target.value)}}),l.a.createElement("label",null,"Last Name:"),l.a.createElement("input",{type:"text",onChange:function(e){m(e.target.value)}}),l.a.createElement("label",null,"Email:"),l.a.createElement("input",{type:"text",onChange:function(e){g(e.target.value)}}),l.a.createElement("button",{onClick:function(){E.a.post("http://localhost:3000/insert",{fname:n,lname:o,email:f}).then(function(){console.log("succes")})}},"Add Student")))};var g=function(){return l.a.createElement(r.a,null,l.a.createElement(o.c,null,l.a.createElement(o.a,{path:"/",element:l.a.createElement(p,null)}),l.a.createElement(o.a,{path:"/sign-up",element:l.a.createElement(f,null)}),l.a.createElement(o.a,{path:"/admin",element:l.a.createElement(m,null)}),l.a.createElement(o.a,{path:"/student",element:l.a.createElement(i,null)})))},b=function(e){e&&e instanceof Function&&n.e(1).then(n.bind(null,50)).then(function(t){var n=t.getCLS,a=t.getFID,l=t.getFCP,c=t.getLCP,u=t.getTTFB;n(e),a(e),l(e),c(e),u(e)})};u.a.createRoot(document.getElementById("root")).render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(g,null))),b()}},[[33,3,2]]]);
//# sourceMappingURL=main.6575f179.chunk.js.map