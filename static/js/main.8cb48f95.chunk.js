(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,function(e,t,n){e.exports=n(16)},,,,,function(e,t,n){},,function(e,t,n){},,function(e,t,n){},,function(e,t,n){},,function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),s=n(2),i=n.n(s);n(8),n(10);function o(e){var t=e.number,n=e.image;return t%2===0?React.createElement("div",{className:"tile black-tile"},n&&React.createElement("div",{style:{backgroundImage:"url(".concat(n,")")},className:"chess-piece"})):React.createElement("div",{className:"tile white-tile"},n&&React.createElement("div",{style:{backgroundImage:"url(".concat(n,")")},className:"chess-piece"}))}n(12);for(var r=["a","b","c","d","e","f","g","h"],u=["1","2","3","4","5","6","7","8"],l=[],g=0;g<8;g++)l.push({image:"assets/images/black-pawn.png",x:g,y:6});for(var p=0;p<8;p++)l.push({image:"assets/images/white-pawn.png",x:p,y:1});for(var f=0;f<2;f++){var m=0===f?"black":"white",h=0===f?7:0;l.push({image:"assets/images/".concat(m,"-rook.png"),x:0,y:h}),l.push({image:"assets/images/".concat(m,"-rook.png"),x:7,y:h}),l.push({image:"assets/images/".concat(m,"-knight.png"),x:1,y:h}),l.push({image:"assets/images/".concat(m,"-knight.png"),x:6,y:h}),l.push({image:"assets/images/".concat(m,"-bishop.png"),x:2,y:h}),l.push({image:"assets/images/".concat(m,"-bishop.png"),x:5,y:h}),l.push({image:"assets/images/".concat(m,"-queen.png"),x:3,y:h}),l.push({image:"assets/images/".concat(m,"-king.png"),x:4,y:h})}function v(){var e=Object(a.useRef)(null),t=null;for(var n=[],s=function(e){for(var t=function(t){var a=t+e,s=void 0;l.forEach(function(n){n.x===t&&n.y===e&&(s=n.image)}),n.push(c.a.createElement(o,{key:"".concat(e,",").concat(t),image:s,number:a}))},a=0;a<r.length;a++)t(a)},i=u.length-1;i>=0;i--)s(i);return c.a.createElement("div",{onMouseUp:function(e){t&&(t=null)},onMouseMove:function(n){return function(n){var a=e.current;if(t&&a){var c=a.offsetLeft-20,s=a.offsetTop-20,i=a.offsetLeft+a.clientWidth-60,o=a.offsetTop+a.clientHeight-65,r=n.clientX-40,u=n.clientY-40;t.style.position="absolute",t.style.left="".concat(r<c?c:r>i?i:r,"px"),t.style.top="".concat(u<s?s:u>o?o:u,"px")}}(n)},onMouseDown:function(e){return function(e){var n=e.target;if(n.classList.contains("chess-piece")){var a=e.clientX-40,c=e.clientY-40;n.style.position="absolute",n.style.left="".concat(a,"px"),n.style.top="".concat(c,"px"),t=n}}(e)},id:"chessboard",ref:e},n)}n(14);var d=function(){return c.a.createElement("div",{id:"app"},c.a.createElement(v,null))},y=function(e){e&&e instanceof Function&&n.e(1).then(n.bind(null,17)).then(function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),s(e),i(e)})};i.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(d,null)),document.getElementById("root")),y()}],[[3,3,2]]]);
//# sourceMappingURL=main.8cb48f95.chunk.js.map