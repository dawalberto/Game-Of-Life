document.onload=(()=>{function e(e,t="m"){this.num=e,this.type=t,this.life=[!1],this.neighbors=[],A.push(e)}const t={mode:"",sizeBoard:0,totalCells:0,heightAndWidthCell:0,iterationsNum:0,iterationTime:0,iterations:"",colorAliveCell:"",colorDeadCell:"",cells:[]},n=document.querySelector(".slider-board"),i=document.querySelector(".slider-board-value-selected"),o=document.querySelector(".flex-container-set-board"),r=document.querySelector("#button-set-board"),s=document.querySelector(".flex-container-board-and-settings"),a=document.querySelector(".grid-container-board"),l=document.querySelector(".information-board-size"),u=document.getElementsByClassName("cell-board"),d=document.querySelector(".input-color-cell-alive"),c=document.querySelector(".input-color-cell-dead"),m=document.querySelector("#slide-iteration-time"),b=document.querySelector(".slide-iteration-time-selected"),p=document.querySelector("#button-play-pause-game"),h=document.querySelector(".iterations-count"),g=document.querySelector(".game-mode"),v=document.querySelector("#buton-previus-iteration"),f=document.querySelector("#button-reset-game"),y=document.querySelector(".alert-resize-page"),z=document.querySelector(".instructions-page"),A=[],B=void 0!==window.orientation||-1!==navigator.userAgent.indexOf("IEMobile");t.mode="configure",t.iterationTime=Number(m.value),t.colorAliveCell=d.value,t.colorDeadCell=c.value;const C=new Event("boardSetted"),L=new Event("boardPrinted"),w=new Event("playGame"),E=new Event("pauseGame");function S(){t.cells.push(new e(1,"clu")),t.cells.push(new e(t.sizeBoard,"cru")),t.cells.push(new e(t.totalCells,"crb")),t.cells.push(new e(t.totalCells-(t.sizeBoard-1),"clb")),function(){let n=t.sizeBoard;for(let i=0;i<t.sizeBoard;i++)i>1&&i<t.sizeBoard&&t.cells.push(new e(i,"eu")),n>t.sizeBoard&&n<t.totalCells&&t.cells.push(new e(n,"er")),n+1<t.totalCells-t.sizeBoard&&t.cells.push(new e(n+1,"el")),t.totalCells-(i+1)>t.totalCells-(t.sizeBoard-1)&&t.cells.push(new e(t.totalCells-(i+1),"eb")),n+=t.sizeBoard}(),function(){for(let n=t.sizeBoard;n<t.totalCells-t.sizeBoard;n++)A.includes(n)||t.cells.push(new e(n))}(),t.cells.map(e=>(function(e){switch(e.type){case"eu":e.neighbors.push(e.num-1),e.neighbors.push(e.num+1),e.neighbors.push(e.num+(t.sizeBoard-1)),e.neighbors.push(e.num+t.sizeBoard),e.neighbors.push(e.num+(t.sizeBoard+1));break;case"er":e.neighbors.push(e.num-(t.sizeBoard+1)),e.neighbors.push(e.num-t.sizeBoard),e.neighbors.push(e.num-1),e.neighbors.push(e.num+(t.sizeBoard-1)),e.neighbors.push(e.num+t.sizeBoard);break;case"el":e.neighbors.push(e.num-t.sizeBoard),e.neighbors.push(e.num-(t.sizeBoard-1)),e.neighbors.push(e.num+1),e.neighbors.push(e.num+t.sizeBoard),e.neighbors.push(e.num+(t.sizeBoard+1));break;case"eb":e.neighbors.push(e.num-1),e.neighbors.push(e.num-(t.sizeBoard+1)),e.neighbors.push(e.num-t.sizeBoard),e.neighbors.push(e.num-(t.sizeBoard-1)),e.neighbors.push(e.num+1);break;case"clu":e.neighbors.push(e.num+1),e.neighbors.push(t.sizeBoard+1),e.neighbors.push(t.sizeBoard+2);break;case"cru":e.neighbors.push(e.num-1),e.neighbors.push(t.sizeBoard+t.sizeBoard-1),e.neighbors.push(t.sizeBoard+t.sizeBoard);break;case"crb":e.neighbors.push(e.num-t.sizeBoard),e.neighbors.push(e.num-(t.sizeBoard+1)),e.neighbors.push(e.num-1);break;case"clb":e.neighbors.push(e.num-t.sizeBoard),e.neighbors.push(e.num-(t.sizeBoard-1)),e.neighbors.push(e.num+1);break;case"m":e.neighbors.push(e.num-(t.sizeBoard+1)),e.neighbors.push(e.num-t.sizeBoard),e.neighbors.push(e.num-(t.sizeBoard-1)),e.neighbors.push(e.num-1),e.neighbors.push(e.num+1),e.neighbors.push(e.num+(t.sizeBoard-1)),e.neighbors.push(e.num+t.sizeBoard),e.neighbors.push(e.num+(t.sizeBoard+1))}})(e))}function T(e){let t=e.classList[0];return Number(t.substring(t.indexOf("l-")+2,t.length))}function k(e){t.cells.map(n=>{n.num!==e||(n.life[t.iterationsNum]=!n.life[t.iterationsNum])})}function N(e){return q(T(e)).life[t.iterationsNum]}function q(e){return t.cells.filter(t=>t.num===e)[0]}function M(){if(t.cells.map(e=>{!function(e){let n=e.neighbors.filter(e=>q(e).life[t.iterationsNum]).length;if(2===n||3===n){if(e.life[t.iterationsNum])return!0;if(3===n)return!0}return!1}(e)?e.life.push(!1):e.life.push(!0)}),t.iterationsNum+=1,t.cells.every(e=>e.life[t.iterationsNum]===e.life[t.iterationsNum-1]))return clearInterval(t.iterations),t.mode="end",g.innerHTML=`Game mode: <span class="information-game">${t.mode.toUpperCase()}</span>`,p.setAttribute("disabled",!0),f.removeAttribute("disabled"),f.removeAttribute("title"),v.removeAttribute("disabled"),void v.removeAttribute("title");H(),h.innerHTML=`Iterations: <span class="information-game">${t.iterationsNum}</span>`}function H(){for(let e=0;e<u.length;e++)N(u[e])?u[e].style.backgroundColor=t.colorAliveCell:u[e].style.backgroundColor=t.colorDeadCell}r.addEventListener("click",function(){t.sizeBoard=Number(n.value),t.totalCells=t.sizeBoard*t.sizeBoard,t.heightAndWidthCell=Math.round((window.innerHeight-50)/t.sizeBoard)<Math.round((window.innerWidth-50)/t.sizeBoard)?Math.round((window.innerHeight-50)/t.sizeBoard):Math.round((window.innerWidth-50)/t.sizeBoard),z.style.display="block",o.style.display="none",document.dispatchEvent(C)}),v.addEventListener("click",function(){t.iterationsNum>0&&("pause"===t.mode||"end"===t.mode)&&(p.removeAttribute("disabled"),t.iterationsNum-=1,t.cells.map(e=>e.life.pop()),h.innerHTML=`Iterations: <span class="information-game">${t.iterationsNum}</span>`,p.innerHTML="PLAY",H(),0===t.iterationsNum&&(v.setAttribute("disabled",!0),v.setAttribute("title","⚠️ Previus iteration only can do on pause mode")))}),f.addEventListener("click",function(){"pause"!==t.mode&&"configure"!==t.mode&&"end"!==t.mode||(t.mode="configure",t.iterationTime=200,t.colorAliveCell="#79dffe",t.colorDeadCell="#2d3436",t.iterationsNum=0,t.iterations="",t.cells=[],A.length=0,d.value=t.colorAliveCell,c.value=t.colorDeadCell,m.value=t.iterationTime,h.innerHTML=`Iterations: <span class="information-game">${t.iterationsNum}</span>`,g.innerHTML=`Game mode: <span class="information-game">${t.mode.toUpperCase()}</span>`,b.innerHTML=`⏱ Iteration time: <span class="information-game">${t.iterationTime}ms</span>`,m.removeAttribute("disabled"),m.removeAttribute("title"),d.removeAttribute("disabled"),d.removeAttribute("title"),c.removeAttribute("disabled"),c.removeAttribute("title"),v.setAttribute("disabled",!0),v.setAttribute("title","⚠️ Previus iteration only can do on pause mode"),p.innerHTML="PLAY",p.removeAttribute("disabled"),S(),H())}),n.addEventListener("input",()=>{i.innerHTML=`Board  <br> <span style="font-weight: 900;">${n.value}</span> x <span style="font-weight: 900;">${n.value}</span>`}),window.addEventListener("resize",()=>"none"!==o.style.display||B?"":y.style.display="block"),document.querySelector(".close-alert-resize").addEventListener("click",()=>y.style.display="none"),document.addEventListener("boardSetted",function(){l.innerHTML=`Board: <span class="information-game">${n.value} x ${n.value}</span>`;const e=document.createElement("style");e.innerHTML=`\n            .grid-container-board {\n                grid-template-columns: repeat(${t.sizeBoard}, ${t.heightAndWidthCell}px);\n                grid-template-rows: repeat(${t.sizeBoard}, ${t.heightAndWidthCell}px);\n            }\n        `,document.head.appendChild(e);for(let e=0;e<t.totalCells;e++){let t=document.createElement("span");t.classList.add(`cell-${e+1}`,"cell-board","cell-dead"),a.appendChild(t)}s.style.display="flex",function(){for(let e=0;e<u.length;e++)u[e].addEventListener("click",()=>{"configure"===t.mode&&(N(u[e])?u[e].style.backgroundColor=t.colorDeadCell:u[e].style.backgroundColor=t.colorAliveCell,k(T(u[e])))})}(),document.dispatchEvent(L)}),document.addEventListener("boardPrinted",S),d.addEventListener("change",()=>{("pause"===t.mode||"configure"===t.mode)&&(t.colorAliveCell=d.value,H())}),c.addEventListener("change",()=>{("pause"===t.mode||"configure"===t.mode)&&(t.colorDeadCell=c.value,H())}),m.addEventListener("input",()=>{"pause"!==t.mode&&"configure"!==t.mode||(t.iterationTime=Number(m.value),b.innerHTML=`⏱ Iteration time: <span class="information-game">${t.iterationTime}ms</span>`)}),p.addEventListener("click",function(){"play"===t.mode?document.dispatchEvent(E):document.dispatchEvent(w);g.innerHTML=`Game mode: <span class="information-game">${t.mode.toUpperCase()}</span>`,"play"===t.mode?(p.innerHTML="PAUSE",m.setAttribute("disabled",!0),m.setAttribute("title","⚠️ Iteration tame only can change in pause mode"),d.setAttribute("disabled",!0),d.setAttribute("title","⚠️ Alive cell color only can change in pause mode"),c.setAttribute("disabled",!0),c.setAttribute("title","⚠️ Dead cell color only can change in pause mode"),f.setAttribute("disabled",!0),f.setAttribute("title","⚠️ Reset game only can do on pause mode"),v.setAttribute("disabled",!0),v.setAttribute("title","⚠️ Previus iteration only can do on pause or end mode")):(p.innerHTML="PLAY",m.removeAttribute("disabled"),m.removeAttribute("title"),d.removeAttribute("disabled"),d.removeAttribute("title"),c.removeAttribute("disabled"),c.removeAttribute("title"),f.removeAttribute("disabled"),f.removeAttribute("title"),v.removeAttribute("disabled"),v.removeAttribute("title"))}),document.addEventListener("playGame",function(){t.mode="play",t.iterations=setInterval(M,t.iterationTime)}),document.addEventListener("pauseGame",function(){t.mode="pause",clearInterval(t.iterations)}),document.querySelector(".close-instructions").addEventListener("click",()=>{z.style.display="none"})})();