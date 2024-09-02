(()=>{"use strict";var t={208:(t,e,n)=>{n.d(e,{A:()=>w});var r=n(601),i=n.n(r),a=n(314),s=n.n(a),o=n(417),d=n.n(o),c=new URL(n(313),n.b),h=new URL(n(123),n.b),l=new URL(n(490),n.b),p=new URL(n(486),n.b),u=new URL(n(90),n.b),m=new URL(n(395),n.b),f=new URL(n(646),n.b),g=s()(i());g.push([t.id,"@import url(https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css);"]);var b=d()(c),y=d()(h),v=d()(l),S=d()(p),k=d()(u),x=d()(m),A=d()(f);g.push([t.id,`@font-face {\n  font-family: MomsTypewriter;\n  src: url(${b});\n}\n\n@font-face {\n  font-family: MagedovMilitary;\n  src: url(${y});\n}\n\n@font-face {\n  font-family: Poppins;\n  src: url(${v});\n}\n\nhtml,\nbody {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  height: 100%;\n  font-family: Poppins, Arial, Helvetica, sans-serif;\n  color: rgba(255, 255, 255, 0.9);\n  background-image: url(${S});\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center;\n  background-attachment: fixed;\n}\n\nbutton {\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n\n  padding: 7px 11px;\n  background-color: transparent;\n  color: #ffffff;\n  border: 2px solid #f0f0f0;\n  border-radius: 6px;\n}\n\nbutton:hover {\n  background-color: rgba(240, 240, 240, 0.7);\n  color: rgb(0, 0, 0);\n}\n\n.modal {\n  max-width: 50ch;\n\n  border: none;\n  border-radius: 0.5rem;\n  box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.3);\n  background-color: rgba(255, 255, 255, 0.7);\n\n  padding: 2rem 2rem 1rem 2rem;\n}\n\n.modal::backdrop {\n  background-image: url(${k});\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center;\n  background-attachment: fixed;\n  background-color: rgba(0, 0, 0, 0.4);\n  background-blend-mode: overlay;\n}\n\nform {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.input-field {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\nlabel {\n  margin-right: 6px;\n}\n\ninput {\n  box-sizing: border-box;\n  padding: 6px;\n  border: none;\n  border-radius: 6px;\n  font-size: 1rem;\n  background-color: #f0f0f0;\n}\n\ninput:focus {\n  outline: none;\n  border-bottom: 2px solid black;\n}\n\n.submit-btn {\n  margin-top: 1.2rem;\n  margin-bottom: 1rem;\n  padding: 10px 14px;\n  color: black;\n  background-color: #f0f0f0;\n  border: none;\n}\n\n.submit-btn:hover {\n  background-color: #ffffff;\n  border: none;\n}\n\n.author {\n  text-align: center;\n  font-size: 0.7rem;\n}\n\n.title {\n  padding: 1rem 0;\n  font-size: 3.5rem;\n  font-family: MagedovMilitary, Arial, Helvetica, sans-serif;\n  text-align: center;\n  letter-spacing: 5px;\n}\n\n.game-cont {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: flex-start;\n}\n\n.player-name,\n.comp-name {\n  padding-bottom: 6px;\n  font-size: 2rem;\n  font-family: MomsTypewriter, Arial, Helvetica, sans-serif;\n  text-align: center;\n  text-decoration: underline;\n}\n\n.player-board {\n  width: 444px;\n}\n\n.board {\n  border: 2px solid rgba(210, 210, 211, 0.7);\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n}\n\n.cell {\n  width: 40px;\n  height: 40px;\n  background-color: rgba(240, 240, 240, 0.1);\n  border: 2px solid rgba(210, 210, 211, 0.7);\n}\n\n.cell.ship {\n  background-color: rgba(100, 74, 194, 0.8);\n}\n\n.cell.hit {\n  background-image: url(${x});\n  background-size: contain;\n  background-repeat: no-repeat;\n  background-position: center;\n  pointer-events: none;\n}\n\n.cell.hit.hit-ship {\n  background-image: url(${A});\n  background-color: red;\n  pointer-events: none;\n}\n\n.board.comp > .cell:hover {\n  background-color: rgba(210, 210, 211, 0.2);\n  cursor: pointer;\n}\n\n.highlight {\n  background-color: rgba(100, 74, 194, 0.8);\n}\n\n.ships-cont {\n  margin-top: 1rem;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-evenly;\n  align-items: flex-start;\n  gap: 10px;\n}\n\n.unplaced-ship {\n  display: flex;\n  flex-direction: row;\n  cursor: pointer;\n}\n\n.unplaced {\n  width: 35px;\n  height: 35px;\n  background-color: rgba(100, 74, 194, 0.8);\n  border: 2px solid rgba(210, 210, 211, 0.7);\n}\n\n.info-cont {\n  width: 300px;\n  height: 460px;\n  padding: 0 2rem;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.status-board {\n  margin: 3rem 0 5rem 0;\n  font-size: 1.4rem;\n  text-align: center;\n}\n\n.btn-cont {\n  display: flex;\n  flex-direction: column;\n}\n\n.start-btn {\n  margin-bottom: 5rem;\n  padding: 0.7rem;\n  font-size: 2rem;\n}\n\n.randomize-ships-btn,\n.change-dir-btn {\n  margin-bottom: 0.5rem;\n}\n\n.restart-btn {\n  margin-bottom: auto;\n  padding: 0.7rem;\n  font-size: 1.5rem;\n}\n`,""]);const w=g},314:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",r=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),r&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),r&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,r,i,a){"string"==typeof t&&(t=[[null,t,void 0]]);var s={};if(r)for(var o=0;o<this.length;o++){var d=this[o][0];null!=d&&(s[d]=!0)}for(var c=0;c<t.length;c++){var h=[].concat(t[c]);r&&s[h[0]]||(void 0!==a&&(void 0===h[5]||(h[1]="@layer".concat(h[5].length>0?" ".concat(h[5]):""," {").concat(h[1],"}")),h[5]=a),n&&(h[2]?(h[1]="@media ".concat(h[2]," {").concat(h[1],"}"),h[2]=n):h[2]=n),i&&(h[4]?(h[1]="@supports (".concat(h[4],") {").concat(h[1],"}"),h[4]=i):h[4]="".concat(i)),e.push(h))}},e}},417:t=>{t.exports=function(t,e){return e||(e={}),t?(t=String(t.__esModule?t.default:t),/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),e.hash&&(t+=e.hash),/["'() \t\n]|(%20)/.test(t)||e.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t):t}},601:t=>{t.exports=function(t){return t[1]}},72:t=>{var e=[];function n(t){for(var n=-1,r=0;r<e.length;r++)if(e[r].identifier===t){n=r;break}return n}function r(t,r){for(var a={},s=[],o=0;o<t.length;o++){var d=t[o],c=r.base?d[0]+r.base:d[0],h=a[c]||0,l="".concat(c," ").concat(h);a[c]=h+1;var p=n(l),u={css:d[1],media:d[2],sourceMap:d[3],supports:d[4],layer:d[5]};if(-1!==p)e[p].references++,e[p].updater(u);else{var m=i(u,r);r.byIndex=o,e.splice(o,0,{identifier:l,updater:m,references:1})}s.push(l)}return s}function i(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,i){var a=r(t=t||[],i=i||{});return function(t){t=t||[];for(var s=0;s<a.length;s++){var o=n(a[s]);e[o].references--}for(var d=r(t,i),c=0;c<a.length;c++){var h=n(a[c]);0===e[h].references&&(e[h].updater(),e.splice(h,1))}a=d}}},659:t=>{var e={};t.exports=function(t,n){var r=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},540:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},56:(t,e,n)=>{t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},825:t=>{t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,i&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(r,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},113:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}},123:(t,e,n)=>{t.exports=n.p+"06051b4f7fa18f88dc34.otf"},313:(t,e,n)=>{t.exports=n.p+"5df507d250664357937f.ttf"},490:(t,e,n)=>{t.exports=n.p+"7641a0f76ca9ef6c252c.ttf"},646:(t,e,n)=>{t.exports=n.p+"d6f140f8c1b48672beab.svg"},395:(t,e,n)=>{t.exports=n.p+"5f1dead81672352e597e.svg"},90:(t,e,n)=>{t.exports=n.p+"8178ccd6560d6ae0dac7.jpg"},486:(t,e,n)=>{t.exports=n.p+"84c1e56e0769a7b25706.jpg"}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var a=e[r]={id:r,exports:{}};return t[r](a,a.exports,n),a.exports}n.m=t,n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t;n.g.importScripts&&(t=n.g.location+"");var e=n.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var r=e.getElementsByTagName("script");if(r.length)for(var i=r.length-1;i>-1&&(!t||!/^http(s?):/.test(t));)t=r[i--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=t})(),n.b=document.baseURI||self.location.href,n.nc=void 0;var r=n(72),i=n.n(r),a=n(825),s=n.n(a),o=n(659),d=n.n(o),c=n(56),h=n.n(c),l=n(540),p=n.n(l),u=n(113),m=n.n(u),f=n(208),g={};g.styleTagTransform=m(),g.setAttributes=h(),g.insert=d().bind(null,"head"),g.domAPI=s(),g.insertStyleElement=p(),i()(f.A,g),f.A&&f.A.locals&&f.A.locals;class b{constructor(t,e){this.shipLength=t,this.name=e,this.numOfTimesHit=0,this.sunk=!1}get numOfHits(){return this.numOfTimesHit}get length(){return this.shipLength}hit(){this.numOfTimesHit+=1}isSunk(){return this.sunk=this.length===this.numOfTimesHit,this.sunk}}class y{constructor(t,e){this.xCoord=t,this.yCoord=e,this.shipPart=!1,this.shipType=null,this.hit=!1}get x(){return this.xCoord}get y(){return this.yCoord}get isShip(){return this.shipPart}set isShip(t){this.shipPart=t}get isHit(){return this.hit}set isHit(t){this.hit=t}get ship(){return this.shipType}set ship(t){this.shipType=t}}class v{constructor(){this.board=this.makeBoard(),this.misses=[],this.hits=[],this.dir="hor",this.ships=[new b(5,"carrier"),new b(4,"battleship"),new b(3,"destroyer"),new b(3,"submarine"),new b(2,"patrol")]}makeBoard(){const t=[];for(let e=1;e<=10;e++)for(let n=1;n<=10;n++)t.push(new y(n,e));return t}resetBoard(){this.board=this.makeBoard()}find(t,e){return this.board.find((n=>n.x===t&&n.y===e))}inBounds(t){return t>=1&&t<=10}overlap(t,e,n,r){for(let i=0;i<t.length;i++)if((r===e?this.find(e+i,n):this.find(e,n+i)).isShip)return!0;return!1}canPlaceShip(t,e,n){const r="hor"===this.dir?e:n;return!!this.inBounds(r+t.length-1)&&!this.overlap(t,e,n,r)}markShip(t,e,n){for(let r=0;r<t.length;r++){const i="hor"===this.dir?this.find(e+r,n):this.find(e,n+r);i.isShip=!0,i.ship=t}}placeShip(t,e,n){if("object"==typeof t&&(e||n)&&("hor"===this.dir||"vert"===this.dir))return!!this.canPlaceShip(t,e,n)&&(this.markShip(t,e,n),!0)}allShipsSunk(){return this.ships.every((t=>t.isSunk()))}checkRepeatAttack(t,e){const n=this.find(t,e);return!(!this.misses.includes(n)&&!this.hits.includes(n))}checkValidity(t,e){return this.inBounds(t)&&this.inBounds(e)&&!this.checkRepeatAttack(t,e)}receiveAttack(t,e){if(!this.checkValidity(t,e))return!1;const n=this.find(t,e);return n.isShip?(n.ship.hit(),n.isHit=!0,this.hits.push(n),!0):n.isShip?void 0:(n.isHit=!0,this.misses.push(n),!1)}randomizeCoord(){return Math.floor(10*Math.random())+1}randomizeShips(){this.ships.forEach((t=>{const e=Math.floor(2*Math.random());this.dir=0===e?"hor":"vert";let n=this.randomizeCoord(),r=this.randomizeCoord();for(;!this.canPlaceShip(t,n,r);)n=this.randomizeCoord(),r=this.randomizeCoord();this.placeShip(t,n,r)}))}}class S{constructor(t){this.name=t,this.board=new v}get gameboard(){return this.board.board}}class k{constructor(t){this.name="Computer",this.board=new v,this.playerBoard=t,this.attackMoves=this.shuffleMoves(this.addMoves()),this.attPerformed=!1,this.initHit=null,this.prevHit=!1,this.prevHitObj=null,this.shipFound=!1,this.horAttacks=[],this.vertAttacks=[],this.horShip=!1,this.vertShip=!1}get gameboard(){return this.board.board}resetAttacks(){this.attackMoves=this.shuffleMoves(this.addMoves())}addMoves(){const t=[];for(let e=1;e<=10;e++)for(let n=1;n<=10;n++)t.push([n,e]);return t}shuffleMoves(t){for(let e=t.length-1;e>0;e--){const n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}wasHitSuccessful(t,e){const n=this.playerBoard.find(t,e);return n.isShip?(this.prevHitObj=n,this.prevHit=!0,!0):(this.prevHit=!1,!1)}attRandom(){const t=this.attackMoves.shift();this.playerBoard.receiveAttack(t[0],t[1]),this.wasHitSuccessful(t[0],t[1])&&(this.initHit=this.prevHitObj)}addAttack(t,e,n,r){this.playerBoard.checkValidity(e,n)&&t.push({x:e,y:n,dir:r})}addAdjAttacks(){const t=this.initHit.x,e=this.initHit.y;this.addAttack(this.horAttacks,t-1,e,-1),this.addAttack(this.horAttacks,t+1,e,1),this.addAttack(this.vertAttacks,t,e-1,-1),this.addAttack(this.vertAttacks,t,e+1,1)}enqueueAttack(t,e,n,r){let i=e,a=n;this.horShip?i=e+1*r:a=n+1*r,this.addAttack(t,i,a,r)}attAdjacent(t,e){if(t.length){const n=t.shift();this.playerBoard.receiveAttack(n.x,n.y),this.delPerformedAtt(n.x,n.y),this.wasHitSuccessful(n.x,n.y)&&("hor"===e?this.horShip=!0:this.vertShip=!0,this.enqueueAttack(t,n.x,n.y,n.dir))}if((this.horShip||this.vertShip)&&!t.length)return this.shipFound=!1,this.prevHit=!1,this.horShip=!1,this.vertShip=!1,this.horAttacks=[],void(this.vertAttacks=[])}handleAdjAttacks(){this.horAttacks.length?this.attAdjacent(this.horAttacks,"hor"):this.attAdjacent(this.vertAttacks,"vert")}delPerformedAtt(t,e){const n=this.attackMoves.findIndex((n=>{let[r,i]=n;return t===r&&e===i}));-1!==n&&this.attackMoves.splice(n,1)}attack(){this.attPerformed=!1,this.horAttacks.length||this.vertAttacks.length||(this.shipFound=!1,this.horShip=!1,this.vertShip=!1),!this.shipFound&&this.prevHit&&(this.addAdjAttacks(),this.shipFound=!0),(this.horAttacks.length||this.vertAttacks.length)&&(this.handleAdjAttacks(),this.attPerformed=!0),this.prevHit||this.shipFound||this.attPerformed||this.attRandom()}}function x(t){const e=document.createElement("div");return e.classList.add("cell"),e.dataset.x=t.x,e.dataset.y=t.y,t.isHit&&e.classList.add("hit"),t.isHit&&t.isShip&&e.classList.add("hit-ship"),e}function A(t,e){const n=document.querySelector(".btn-cont"),r=document.createElement("button");return r.classList.add(t),r.textContent=e,n.append(r),r}class w{constructor(){}dispName(t){document.querySelector(".player-name").textContent=`Admiral ${t}`}dispBoard(t){const e=document.querySelector(".board-cont"),n=document.createElement("div");n.classList.add("board"),t.forEach((t=>{const e=x(t);t.isShip&&e.classList.add("ship"),n.append(e)})),e.append(n)}dispCompBoard(t){const e=document.querySelector(".comp-board-cont"),n=document.createElement("div");n.classList.add("board"),n.classList.add("comp"),t.forEach((t=>{const e=x(t);n.append(e)})),e.append(n)}delBoard(t){document.querySelector(`${t}`)&&document.querySelector(`${t}`).remove()}dispShips(t){const e=document.querySelector(".ships-cont");t.forEach((t=>{const n=function(t){const e=document.createElement("div");e.classList.add("unplaced-ship");for(let n=0;n<t.length;n++){const t=document.createElement("div");t.classList.add("unplaced"),e.append(t)}return e}(t);n.dataset.name=t.name,n.draggable=!0,e.append(n)}))}delShips(){document.querySelectorAll(".unplaced-ship").forEach((t=>t.remove()))}}class D{constructor(t,e,n){this.player=t,this.boardDisplay=e,this.gameStatus=n,this.dragged=null}initDragStart(){document.querySelectorAll(".unplaced-ship").forEach((t=>{t.addEventListener("dragstart",(e=>{this.handleDragStart(t,e)})),t.addEventListener("dragend",(()=>{this.dragged=null,t.classList.remove("dragging")}))}))}handleDragStart(t,e){const n=t.dataset.name;this.dragged=this.player.board.ships.find((t=>t.name===n)),e.dataTransfer.effectAllowed="move",e.target.classList.add("dragging")}initDragEnd(){const t=document.querySelector(".board");t.addEventListener("dragover",(t=>this.handleDragOver(t))),t.addEventListener("dragleave",(t=>this.handleDragLeave(t))),t.addEventListener("drop",(t=>this.handleDrop(t)))}handleDragOver(t){t.preventDefault(),document.querySelector(".unplaced-ship.dragging")?(t.dataTransfer.dropEffect="move",t.target.classList.add("highlight")):t.dataTransfer.dropEffect="none"}handleDragLeave(t){t.preventDefault(),t.target.classList.remove("highlight")}handleDrop(t){if(t.preventDefault(),t.target.classList.remove("highlight"),!document.querySelector(".unplaced-ship.dragging"))return;const e=Number(t.target.dataset.x),n=Number(t.target.dataset.y);this.handleShipPlacement(e,n)}handleShipPlacement(t,e){this.player.board.placeShip(this.dragged,t,e)&&(this.player.board.placeShip(this.dragged,t,e),this.boardDisplay.delBoard(".board"),this.boardDisplay.dispBoard(this.player.gameboard),this.initDragEnd(),document.querySelector(".dragging").remove(),this.gameStatus())}}class B{constructor(t,e,n){this.player=t,this.comp=e,this.playGame=n,this.boardDisplay=new w,this.dragAndDrop=new D(this.player,this.boardDisplay,this.updateGameStatus.bind(this)),this.init()}init(){this.boardDisplay.dispName(this.player.name),this.boardDisplay.dispBoard(this.player.gameboard),this.boardDisplay.dispCompBoard(this.comp.gameboard),this.boardDisplay.dispShips(this.player.board.ships),this.dragAndDrop.initDragStart(),this.dragAndDrop.initDragEnd(),this.initStartBtn(),this.initRandomizeShips(),this.initShipDir(),this.initShipReset(),this.updateGameStatus(),this.initBoardAttack()}initStartBtn(){A("start-btn","Start!").addEventListener("click",(()=>this.handleStartGame()))}initRandomizeShips(){A("randomize-ships-btn","Randomize ships").addEventListener("click",(()=>this.handleRandomizeShips()))}initShipDir(){A("change-dir-btn","Change direction").addEventListener("click",(()=>this.handleShipDir()))}initShipReset(){A("reset-ships-btn","Reset ships").addEventListener("click",(()=>this.handleShipReset()))}initBoardAttack(){document.querySelector(".board.comp").addEventListener("click",(t=>{this.playGame.handleBoardAttack(t)}))}handleStartGame(){const t=document.querySelector(".status-board"),e=document.querySelector(".btn-cont");this.comp.board.randomizeShips(),e.textContent="",t.textContent=`Good luck Admiral ${this.player.name}!`,this.playGame.gameActive=!0}handleRandomizeShips(){this.player.board.resetBoard(),this.player.board.randomizeShips(),this.boardDisplay.delBoard(".board"),this.boardDisplay.dispBoard(this.player.gameboard),this.boardDisplay.delShips(),this.updateGameStatus()}handleShipDir(){this.player.board.dir="hor"===this.player.board.dir?"vert":"hor",document.querySelectorAll(".unplaced-ship").forEach((t=>{const e=t.style.flexDirection||"row";t.style.flexDirection="row"===e?"column":"row"}))}handleShipReset(){this.player.board.resetBoard(),this.boardDisplay.delBoard(".board"),this.boardDisplay.delShips(),this.boardDisplay.dispBoard(this.player.gameboard),this.boardDisplay.dispShips(this.player.board.ships),this.dragAndDrop.initDragStart(),this.dragAndDrop.initDragEnd(),this.player.board.dir="hor",this.updateGameStatus()}allShipsPlaced(){return 0===document.querySelector(".ships-cont").children.length}updateGameStatus(){const t=document.querySelector(".status-board"),e=document.querySelector(".start-btn");if(!this.allShipsPlaced())return t.textContent=`Place your ships Admiral ${this.player.name}!`,void(e.disabled=!0);t.textContent=`Press start to begin, Admiral ${this.player.name}!`,e.disabled=!1}handleGameWin(t){const e=document.querySelector(".status-board"),n=document.querySelector(".board.comp");"Computer"===t.name?e.textContent=`You've lost, better luck next time Admiral ${this.player.name}.`:e.textContent=`Congrats Admiral ${this.player.name}! You're the victor!`,n.style.pointerEvents="none",this.playGame.gameActive=!1,this.initRestartBtn()}initRestartBtn(){A("restart-btn","Play Again!").addEventListener("click",(()=>this.handleRestart()))}handleRestart(){this.boardDisplay.delBoard(".board"),this.boardDisplay.delBoard(".board.comp"),new L(this.player.name),document.querySelector(".restart-btn").remove()}}class L{constructor(t){this.player=new S(t),this.comp=new k(this.player.board),this.ui=new B(this.player,this.comp,this),this.gameActive=!1}handleBoardAttack(t){const e=Number(t.target.dataset.x),n=Number(t.target.dataset.y);this.gameActive&&e&&n&&(this.playerAttack(e,n),this.gameActive&&setTimeout((()=>this.compAttack()),500))}playerAttack(t,e){this.comp.board.receiveAttack(t,e),this.ui.boardDisplay.delBoard(".board.comp"),this.ui.boardDisplay.dispCompBoard(this.comp.gameboard),this.ui.initBoardAttack(),this.checkWinCond()}compAttack(){this.comp.attack(),this.ui.boardDisplay.delBoard(".board"),this.ui.boardDisplay.dispBoard(this.player.gameboard),this.checkWinCond()}checkWinCond(){this.comp.board.allShipsSunk()?this.ui.handleGameWin(this.player):this.player.board.allShipsSunk()&&this.ui.handleGameWin(this.comp)}}!function(){const t=document.querySelector(".modal"),e=document.querySelector(".submit-btn"),n=document.querySelector("#username");t.showModal(),e.addEventListener("click",(e=>{e.preventDefault(),n.value&&(new L(n.value),t.close())}))}()})();