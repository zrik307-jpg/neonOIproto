/* Neon.io v54 — additional systems and compatibility fixes.
 * Loaded after core.js in original order.
 */

/* ---- Original script block 21: neon-addon ---- */
(function(g){"use strict";var G=g.NeonGame,R=g.NEON_RENDER,CONST=g.NEON_CONST;if(!G||!R||!CONST)return;var N=CONST.N,GRID=CONST.GRID_SIZE,TAU=Math.PI*2;function rd(k,f){try{var v=localStorage.getItem(k);return v??f}catch{return f}}function wr(k,v){try{localStorage.setItem(k,String(v))}catch{}}function game(){return g.game}function local(gm){return gm&&gm.getLocalActor&&gm.getLocalActor()}var perf=rd("neon-perf","1")!=="0";(function(){var P=CanvasRenderingContext2D.prototype,d=Object.getOwnPropertyDescriptor(P,"shadowBlur");d&&d.set&&Object.defineProperty(P,"shadowBlur",{configurable:!0,get:d.get,set:function(v){d.set.call(this,perf?0:v)}});var f=Object.getOwnPropertyDescriptor(P,"filter");f&&f.set&&Object.defineProperty(P,"filter",{configurable:!0,get:f.get,set:function(v){f.set.call(this,perf?"none":v)}})})();function setPerf(on){perf=!!on,wr("neon-perf",perf?"1":"0"),document.body.classList.toggle("perf",perf),R.setQuality&&perf&&R.setQuality("low")}setPerf(perf);var SHAPES=["◼ Куб","● Шар","◆ Ромб","⬢ Гекс","▲ Треугольник"],shape=Math.min(SHAPES.length-1,Math.max(0,parseInt(rd("neon-core","0"),10)||0)),SIDES=[0,0,4,6,3],PC=32,px=new Float32Array(PC),py=new Float32Array(PC),pl=new Float32Array(PC),pm=new Float32Array(PC),pHead=0,emitAcc=0;function emit(x,y){px[pHead]=x+(Math.random()-.5)*.3,py[pHead]=y+(Math.random()-.5)*.3,pm[pHead]=.55,pl[pHead]=.55,pHead=(pHead+1)%PC}function drawTrailParticles(ctx,color){var cv=R.canvas,dpr=cv.width/Math.max(1,cv.clientWidth||innerWidth),v=R.view,u=v.cell*dpr;ctx.save(),perf||(ctx.globalCompositeOperation="lighter"),ctx.fillStyle=color;for(var b=0;b<2;b++){var lo=b/2,hi=(b+1)/2,any=!1;ctx.globalAlpha=(lo+.125)*.8,ctx.beginPath();for(var i=0;i<PC;i++)if(!(pl[i]<=0)){var k=pl[i]/pm[i];if(!(k<lo||b<1&&k>=hi)){var s=u*.28*k+1,X=v.x+px[i]*u,Y=v.y+py[i]*u;any=!0,perf?ctx.rect(X-s,Y-s,s*2,s*2):(ctx.moveTo(X+s,Y),ctx.arc(X,Y,s,0,TAU))}}any&&ctx.fill()}ctx.restore()}function drawShape(ctx,x,y,s,color,ang,tm){ctx.save(),ctx.translate(x,y),ctx.rotate(ang);var r=s*.55;if(perf||(ctx.globalAlpha=.2,ctx.fillStyle=color,ctx.beginPath(),ctx.arc(0,0,r*1.6,0,TAU),ctx.fill(),ctx.globalAlpha=1),ctx.fillStyle=color,ctx.strokeStyle="rgba(255,255,255,.85)",ctx.lineWidth=Math.max(1.5,s*.07),ctx.beginPath(),shape===1)ctx.arc(0,0,r*.95,0,TAU);else{var n=SIDES[shape],i;for(i=0;i<n;i++){var a=i/n*TAU-Math.PI/2,xx=Math.cos(a)*r*1.1,yy=Math.sin(a)*r*1.1;i===0?ctx.moveTo(xx,yy):ctx.lineTo(xx,yy)}ctx.closePath()}ctx.fill(),ctx.shadowBlur=0,ctx.stroke(),ctx.fillStyle="rgba(255,255,255,.35)",ctx.beginPath(),ctx.arc(-r*.25,-r*.25,r*.28*(1+.08*Math.sin(tm*6)),0,TAU),ctx.fill(),ctx.restore()}g.NeonFX={drawCore:function(ctx,x,y,s,b,tm,gm){return b.id!==(gm.localIndex||0)+1||(drawTrailParticles(ctx,b.color),shape===0)?!1:(drawShape(ctx,x,y,s,b.color,b.angle,tm),!0)}};function st(gm){return gm._st||(gm._st={captures:0,powerups:0,deaths:0,revived:0,maxTrail:0})}var _cap=G.prototype.capture;G.prototype.capture=function(a){var r=_cap.apply(this,arguments);try{a===local(this)&&(st(this).captures++,navigator.vibrate&&navigator.vibrate(25))}catch{}return r};var _sp=G.prototype.spawnPowerup;G.prototype.spawnPowerup=function(){var n=this.powerups.length;_sp.apply(this,arguments),this.powerups.length>n&&this.random()<.25&&(this.powerups[this.powerups.length-1].type="autofill")};var _cp=G.prototype.collectPowerup;G.prototype.collectPowerup=function(a,p){var t=p.type;_cp.apply(this,arguments),a===local(this)&&(st(this).powerups++,t==="speed"?this._bonSpd=this.boostUntil:t==="freeze"?this._bonFrz=this.elapsed+CONST.FREEZE_DURATION:t==="autofill"&&(a.trail.length>=2&&this.capture(a),this.paintDisk(a.x,a.y,6,a.id),this.count(),this.version++,this.markDirty(a.id),this.options.onToast&&this.options.onToast("🌀 Авто-заливка"),navigator.vibrate&&navigator.vibrate(40)))};var NICKS=["Zephyr","Nyx","Blaze","Kiro","Echo","Pixel","Rogue","Volt","Mika","Drift","Ghost","Titan","Luna","Cyber","Flux","Arrow","Sonic","Hexa","Raven","Quark","Ion","Jett","Mono","Lynx"],_spawn=G.prototype.spawn;G.prototype.spawn=function(i,x,y){var a=_spawn.apply(this,arguments);return i!==0&&a&&a.id<100&&!this.mpRole&&(a.name=NICKS[Math.random()*NICKS.length|0]+(Math.random()*90+10|0),a.skin=Math.random()*24|0),a};var _upd=G.prototype.update;G.prototype.update=function(dt){_upd.call(this,dt);for(var i=0;i<PC;i++)pl[i]>0&&(pl[i]-=dt);var a=local(this);if(a&&a.alive&&this.mode==="playing"){emitAcc+=dt,emitAcc>.03&&(emitAcc=0,emit(a.x,a.y));var s=st(this);a.trail.length>s.maxTrail&&(s.maxTrail=a.trail.length)}};var bar=document.createElement("div");bar.id="bonus-bar";var chips={};["shield","speed","double","freeze"].forEach(function(k){var el=document.createElement("span");bar.appendChild(el),chips[k]=el}),document.body.appendChild(bar);var ICON={shield:"🛡",speed:"⚡",double:"✖",freeze:"❄"};setInterval(function(){var gm=game();if(document.hidden||!gm||!document.body.classList.contains("in-game"))return;var me=local(gm),t=gm.elapsed;set("shield",me&&me.shield>t?me.shield-t:0),set("speed",gm.boostUntil>t?gm.boostUntil-t:0),set("double",me&&me.doubleCapture>0?me.doubleCapture:0),set("freeze",gm._bonFrz>t?gm._bonFrz-t:0);function set(k,v){var c=chips[k];v>0?(c.className="on",c.textContent=ICON[k]+" "+v.toFixed(1)+"с"):c.className&&(c.className="")}},250);var _ss=g.showSettings;g.showSettings=function(){_ss.apply(g,arguments);var c=document.getElementById("modal-content");if(c){var done=c.querySelector("button.primary.done"),row=document.createElement("div");for(row.innerHTML='<div class="opt-row"><div><strong>⚡ Performance Mode</strong></div><div class="toggle'+(perf?" on":"")+'" id="nx-perf"></div></div><div class="opt-row"><div><strong>Форма ядра</strong></div><button class="secondary" type="button" id="nx-core" style="width:auto;padding:8px 16px;margin:0">'+SHAPES[shape]+"</button></div>";row.firstChild;)c.insertBefore(row.firstChild,done);document.getElementById("nx-perf").onclick=function(){setPerf(!perf),this.classList.toggle("on",perf)},document.getElementById("nx-core").onclick=function(){shape=(shape+1)%SHAPES.length,wr("neon-core",shape),this.textContent=SHAPES[shape]}}};function shareText(gm){var s=st(gm);return"Neon.io: "+gm.peak.toFixed(2)+"% территории, "+gm.kills+" убийств, "+g.formatTime(gm.elapsed)+". Сыграешь лучше?"}function copyFallback(t){try{var ta=document.createElement("textarea");ta.value=t,ta.style.position="fixed",ta.style.opacity="0",document.body.appendChild(ta),ta.select(),document.execCommand("copy"),document.body.removeChild(ta)}catch{}g.toast&&g.toast("Скопировано")}var mc=document.getElementById("modal-content");mc&&new MutationObserver(function(){var gm=game();if(!(!gm||!mc.querySelector(".win-screen")||mc.querySelector(".nx-extra")||mc.querySelector("#nx-rv-yes"))){var rb=document.getElementById("restart")||document.getElementById("back-home");if(rb){var s=st(gm),box=document.createElement("div");box.className="nx-extra",box.innerHTML='<div class="result-stats"><div><b>'+s.captures+"</b><span>ЗАХВАТОВ</span></div><div><b>"+s.powerups+"</b><span>БОНУСОВ</span></div><div><b>"+s.maxTrail+'</b><span>ДЛИНА СЛЕДА</span></div></div><button class="secondary nx-share" type="button" id="nx-share">📤 Поделиться</button>',rb.parentNode.insertBefore(box,rb),document.getElementById("nx-share").onclick=function(){var t=shareText(gm);navigator.share?navigator.share({title:"Neon.io",text:t,url:location.href.split("#")[0]}).catch(function(e){(!e||e.name!=="AbortError")&&copyFallback(t+" "+location.href)}):navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(t+" "+location.href).then(function(){g.toast&&g.toast("Скопировано")},function(){copyFallback(t)}):copyFallback(t)}}}}).observe(mc,{childList:!0,subtree:!0})})(window);


/* ---- Original script block 22: neon-retention ---- */
(function(){var K="neon-retention-v1",RW=[50,75,100,150,200,300,500],CH=3*3600*1e3;function di(){return Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5)}function ld(){var o={streak:0,last:-1,chest:0};try{var x=JSON.parse(localStorage.getItem(K)||"{}");for(var k in x)o[k]=x[k]}catch{}return o}function sv(s){try{localStorage.setItem(K,JSON.stringify(s))}catch{}}function nxt(s){return s.last===di()-1?s.streak%7+1:1}function can(s){return s.last!==di()||Date.now()>=s.chest}function give(n){var p=window.prefs;if(p){p.points=(p.points||0)+n;try{window.save&&window.save()}catch{}}try{window.NeonAudio&&window.NeonAudio.play("achievement")}catch{}window.toast&&window.toast("🎁 +"+n+" ✦")}function fmt(ms){var m=Math.ceil(ms/6e4);return m>=60?Math.floor(m/60)+" ч "+m%60+" мин":m+" мин"}function inner(){for(var s=ld(),got=s.last===di(),n=got?s.streak:nxt(s)-1,h='<p class="sub">Заходи каждый день: награда растёт, серия не сбрасывается. Серия: <b>'+(got||s.last===di()-1?s.streak:0)+'</b></p><div class="nx-days">',i=1;i<=7;i++)h+='<div class="nx-day'+(i<=n?" done":!got&&i===n+1?" now":"")+'"><b>'+(i<=n?"✓":RW[i-1])+"</b>день "+i+"</div>";h+='</div><button id="nx-claim" class="primary"'+(got?" disabled":"")+">"+(got?"Награда получена":"Забрать +"+RW[nxt(s)-1]+" ✦")+"</button>";var left=s.chest-Date.now();return h+='<div class="nx-box"><p>🎁 Бесплатный сундук раз в 3 часа</p><button id="nx-chest" class="secondary"'+(left>0?" disabled":"")+">"+(left>0?"Откроется через "+fmt(left):"Открыть сундук")+"</button></div>",h}function bind(){var c=document.getElementById("nx-claim"),k=document.getElementById("nx-chest"),x=document.getElementById("nx-bonus-exit"),w=document.getElementById("nx-bonus");x&&(x.onclick=function(){window.__neonCloseModal&&window.__neonCloseModal()}),c&&(c.onclick=function(){var s=ld();if(s.last!==di()){var n=nxt(s);s.streak=n,s.last=di(),sv(s),give(RW[n-1]),w.innerHTML=inner(),bind(),dot()}}),k&&(k.onclick=function(){var s=ld();if(!(Date.now()<s.chest)){s.chest=Date.now()+CH,sv(s);var r=Math.random();give(r<.6?25+(Math.random()*30|0):r<.9?60+(Math.random()*60|0):150+(Math.random()*100|0)),w.innerHTML=inner(),bind(),dot()}})}function open(){window.showModal&&(window.showModal("🎁 Бонусы",'<div id="nx-bonus">'+inner()+"</div>",!1),bind())}function dot(){var b=document.getElementById("bonus-btn");if(b){var d=b.querySelector(".nx-dot"),c=can(ld());c&&!d?(d=document.createElement("i"),d.className="nx-dot",b.appendChild(d)):!c&&d&&d.remove()}}function mk(){var d=document.getElementById("daily-btn");if(!(!d||document.getElementById("bonus-btn"))){var b=document.createElement("button");b.id="bonus-btn",b.className="wide",b.type="button",b.textContent="🎁 Бонусы",b.onclick=open,d.parentNode.insertBefore(b,d),dot(),setInterval(dot,3e4)}}function intro(){var b=document.body;if(!b.classList.contains("nx-intro")){for(var k=document.querySelectorAll("#menu .menu-panel>*"),i=0;i<k.length;i++)k[i].style.setProperty("--nxi",i);b.classList.add("nx-intro"),setTimeout(function(){b.classList.remove("nx-intro")},1800),can(ld())&&window.toast&&setTimeout(function(){window.toast("🎁 Тебя ждёт награда дня!")},1500)}}mk();var l=document.getElementById("loader");if(!l||l.classList.contains("done")||getComputedStyle(l).display==="none")intro();else{var fired=!1,f=function(){fired||(fired=!0,intro())};new MutationObserver(function(){(l.classList.contains("done")||getComputedStyle(l).display==="none"||l.style.display==="none")&&f()}).observe(l,{attributes:!0}),setTimeout(f,7e3)}})();


/* ---- Original script block 23: neon-profile-registration-system ---- */
(function(g){"use strict";var KEY="neon-v13-profile";function read(){try{var x=localStorage.getItem(KEY);return x?JSON.parse(x):null}catch{return null}}function write(v){try{return localStorage.setItem(KEY,JSON.stringify(v)),!0}catch{return!1}}function esc(v){return String(v??"").replace(/[&<>\"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}function cleanName(v){return String(v||"").replace(/[^\p{L}\p{N} ._!?-]/gu,"").trim().slice(0,16)}function show(title,html,lock){var m=document.getElementById("modal"),t=document.getElementById("modal-title"),c=document.getElementById("modal-content"),x=document.getElementById("close-modal");!m||!t||!c||(g.__neonProfileModalOpen=!0,m.classList.toggle("neon-register-modal",!!lock),t.textContent=title||"",t.style.display=title?"block":"none",c.innerHTML=html,lock?(document.body.classList.add("neon-register-lock"),x&&x.classList.add("hidden")):(document.body.classList.remove("neon-register-lock"),x&&x.classList.remove("hidden")),m.classList.remove("hidden"))}function close(){var m=document.getElementById("modal");m&&(m.classList.add("hidden"),m.classList.remove("neon-register-modal")),document.body.classList.remove("neon-register-lock"),g.__neonProfileModalOpen=!1}function setName(name){if(g.prefs){g.prefs.name=name,g.save&&g.save();var n=document.getElementById("nickname");n&&(n.value=name);var d=read();d&&d.registered&&d.name!==name&&(d.name=name,write(d))}}function currentAvatar(){var p=g.prefs||{},skins=g.NEON_SKINS||[],sk=skins[p.skin]||skins[0];return sk&&sk.emoji?sk.emoji:"◈"}function profile(){var p=g.prefs||{},lvl=p.level||1,rank=g.getRank?g.getRank(p.best||0):"Новичок",html='<div class="profile-card"><div class="profile-head"><div class="profile-avatar">'+esc(currentAvatar())+'</div><div class="profile-main"><div class="profile-name">'+esc(p.name||"Пилот")+'</div><div class="profile-sub">'+esc(rank)+" · Уровень "+lvl+'</div></div></div><div class="profile-stats"><div class="profile-stat"><strong>'+Number(p.games||0)+'</strong><span>Игр</span></div><div class="profile-stat"><strong>'+Number(p.kills||0)+'</strong><span>Убийств</span></div><div class="profile-stat"><strong>'+Number(p.best||0).toFixed(2)+'%</strong><span>Рекорд</span></div></div><div class="profile-note">Профиль хранится на этом устройстве. Имя можно изменить без повторной регистрации.</div><div class="profile-actions"><button class="secondary" type="button" id="profile-name-edit">Изменить ник</button><button class="primary" type="button" id="profile-close">Готово</button></div></div>';show("👤 Профиль",html,!1);var e=document.getElementById("profile-name-edit");e&&(e.onclick=function(){nameStep(!1)});var c=document.getElementById("profile-close");c&&(c.onclick=close)}function nameStep(first){var p=g.prefs||{},html='<div class="register-card"><div class="register-progress"><i class="on"></i><i></i></div><div class="register-icon">👤</div><div class="register-title">Введите ник</div><div class="register-text">Так другие игроки будут видеть тебя в игре.</div><input id="neon-reg-name" class="register-input" maxlength="16" autocomplete="nickname" spellcheck="false" placeholder="Твой ник" value="'+esc(first?"":p.name||"")+'"><div id="neon-reg-error" class="register-error"></div><button class="primary" type="button" id="neon-reg-next">Продолжить</button>'+(first?"":'<button class="secondary" type="button" id="neon-reg-cancel">Отмена</button>')+'<div class="register-legal">До 16 символов: буквы, цифры, пробел, . _ - ! ?</div></div>';show(first?"Добро пожаловать":"Изменение ника",html,!!first);var input=document.getElementById("neon-reg-name"),err=document.getElementById("neon-reg-error");input&&(setTimeout(function(){input.focus(),input.select()},60),input.addEventListener("keydown",function(e){e.key==="Enter"&&(e.preventDefault(),nextName(first))}));var b=document.getElementById("neon-reg-next");b&&(b.onclick=function(){nextName(first)});var cancel=document.getElementById("neon-reg-cancel");cancel&&(cancel.onclick=profile)}function nextName(first){var input=document.getElementById("neon-reg-name"),err=document.getElementById("neon-reg-error"),name=cleanName(input&&input.value);if(name.length<2){err&&(err.textContent="Ник должен содержать минимум 2 символа.");return}setName(name),first?finishRegistration():profile()}function finishRegistration(){var old=read()||{},ok=write({registered:!0,name:g.prefs&&g.prefs.name||"Пилот",createdAt:old.createdAt||Date.now()});ok&&(close(),setName(g.prefs&&g.prefs.name||"Пилот"),g.toast&&g.toast("Профиль создан"))}function ensure(){var data=read();if(data&&data.registered){if(g.prefs){var pn=cleanName(g.prefs.name),dn=cleanName(data.name);pn.length>=2&&pn!=="Пилот"?dn!==pn&&(data.name=pn,write(data)):dn.length>=2&&(g.prefs.name=dn,g.save&&g.save());var ni=document.getElementById("nickname");ni&&(ni.value=g.prefs.name)}return}var iv=setInterval(function(){var d=read();if(d&&d.registered){clearInterval(iv);return}var m=document.getElementById("modal");m&&m.classList.contains("hidden")&&!document.body.classList.contains("in-game")&&nameStep(!0)},400)}function bind(){var start=document.getElementById("start-btn");start&&!start._profileStartGuard&&(start._profileStartGuard=!0,start.addEventListener("click",function(e){var d=read();(!d||!d.registered)&&(e.preventDefault(),e.stopImmediatePropagation(),nameStep(!0))},{capture:!0}));var b=document.getElementById("profile-btn");b&&!b._profile&&(b._profile=!0,b.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),profile()},{passive:!1}));var n=document.getElementById("nickname");n&&n.addEventListener("change",function(){if(g.prefs&&!g.__neonProfileModalOpen){var v=cleanName(n.value);v&&(g.prefs.name=v,g.save&&g.save())}}),ensure()}g.showProfile=profile,g.showRegistration=function(){nameStep(!0)},g.NEON_PROFILE={read,registered:function(){var d=read();return!!(d&&d.registered)},show:profile},document.readyState==="loading"?document.addEventListener("DOMContentLoaded",bind,{once:!0}):setTimeout(bind,0)})(window);


/* ---- Original script block 24: neon-clean-runtime-v1 ---- */
(function(g){"use strict";function clean(){var ids=["orientation-toggle","fullscreen","nx-rv-yes","nx-rv-no","nx-rv-t"];for(var i=0;i<ids.length;i++){var e=document.getElementById(ids[i]);e&&e.remove()}document.body.classList.remove("orientation-changing")}clean();new MutationObserver(clean).observe(document.body,{childList:true,subtree:true});g.NEON_RUNTIME={version:"27-clean-core",revive:false,landscape:false,fullscreen:false}})(window);

/* ---- Original script block 25: neon-real-resource-loader ---- */
(function(){
"use strict";
var loader=document.getElementById("loader");
if(!loader)return;
var finished=false;
function finish(){
 if(finished)return;
 finished=true;
 loader.classList.add("done");
 loader.setAttribute("aria-hidden","true");
 loader.style.setProperty("display","none","important");
 loader.style.setProperty("visibility","hidden","important");
 loader.style.setProperty("opacity","0","important");
 document.documentElement.classList.remove("neon-page-hidden");
 document.body.classList.remove("neon-page-hidden");
 var fill=document.getElementById("loader-fill");
 if(fill)fill.style.width="100%";
 var tip=document.getElementById("loader-tip");
 if(tip)tip.textContent="Готово";
 try{document.dispatchEvent(new CustomEvent("neon:resources-ready"));}catch(e){}
 try{window.__neonYSDKMarkReady&&window.__neonYSDKMarkReady();}catch(e){}
}
function begin(){
 setTimeout(finish,900);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",begin,{once:true});else begin();
window.addEventListener("load",finish,{once:true});
window.addEventListener("error",function(){setTimeout(finish,100);});
setTimeout(finish,1800);
})();

/* ---- Original script block 26: neon-button-audit-v27 ---- */
(function(){
'use strict';
var placeholder=/^(?:скоро|в разработке|недоступно|не работает|coming soon|unavailable|not available|todo|заглушка)$/i;
function audit(){
 var nodes=document.querySelectorAll('button,a[role="button"],input[type="button"],input[type="submit"]');
 nodes.forEach(function(el){
  if(el.dataset.neonAuditDone)return;el.dataset.neonAuditDone='1';
  var label=(el.getAttribute('aria-label')||el.getAttribute('title')||el.innerText||el.value||'').replace(/[\s.…!]+/g,' ').trim();
  var href=(el.getAttribute('href')||'').trim().toLowerCase();
  var explicitPlaceholder=placeholder.test(label);
  var empty=!label&&!el.querySelector('svg,img,[aria-label],i,.icon,.emoji');
  var deadLink=el.tagName==='A'&&(!href||href==='#'||href==='javascript:void(0)')&&!el.hasAttribute('data-action')&&!el.onclick;
  if(explicitPlaceholder||empty||deadLink){el.remove();return;}
  el.addEventListener('click',function(){el.classList.add('neon-tapped');setTimeout(function(){el.classList.remove('neon-tapped')},120)},{passive:true});
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',audit,{once:true});else audit();
var mo=new MutationObserver(function(){audit()});
if(document.documentElement)mo.observe(document.documentElement,{childList:true,subtree:true});
})();

/* ---- Original script block 27: neon-bugfixes-v29 ---- */

(function(){
"use strict";
var g=window;
function activateMode(btn){
  if(!btn||!btn.matches(".mode-tab"))return;
  var mode=btn.getAttribute("data-mode");
  if(!mode)return;
  document.querySelectorAll(".mode-tabs .mode-tab").forEach(function(t){
    var on=t===btn;
    t.classList.toggle("active",on);
    t.setAttribute("aria-pressed",on?"true":"false");
  });
  if(typeof g.setGameMode==="function")g.setGameMode(mode);
  if(g.NeonAudio&&typeof g.NeonAudio.play==="function")g.NeonAudio.play("click");
}
document.addEventListener("click",function(e){
  var btn=e.target&&e.target.closest?e.target.closest(".mode-tab"):null;
  if(btn)activateMode(btn);
},true);
function initModeTabs(){
  var tabs=document.querySelectorAll(".mode-tabs .mode-tab");
  if(!tabs.length)return;
  var active=Array.from(tabs).find(function(t){return t.classList.contains("active")})||tabs[0];
  tabs.forEach(function(t){t.setAttribute("aria-pressed",t===active?"true":"false")});
  if(typeof g.setGameMode==="function")g.setGameMode(active.getAttribute("data-mode")||"classic");
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initModeTabs,{once:true});else initModeTabs();

var originalPick=g.__pickSkin;
function syncSkin(idx){
  var p=g.prefs||{},owned=p.unlockedSkins||[];
  document.querySelectorAll(".skin-grid .skin-option").forEach(function(node){
    var i=Number(node.getAttribute("data-skin-index")),has=i===0||owned.indexOf(i)>=0;
    node.classList.toggle("owned",has);
    node.classList.toggle("locked",!has);
    node.classList.toggle("selected",Number(p.skin)===i);
    var status=node.querySelector(".skin-status");
    if(status)status.textContent=Number(p.skin)===i?"✓ Выбран":has?"Куплено":"";
    if(i===Number(idx)&&has){node.classList.remove("just-purchased");void node.offsetWidth;node.classList.add("just-purchased");}
  });
  var bal=document.querySelector("#modal-content .skin-balance");
  if(bal)bal.textContent="💎 "+(Number(p.points)||0)+" кристаллов";
}
if(typeof originalPick==="function"){
  g.__pickSkin=function(idx){
    var p=g.prefs||{},before=(p.unlockedSkins||[]).indexOf(Number(idx))>=0;
    originalPick.call(this,idx);
    syncSkin(idx);
    requestAnimationFrame(function(){syncSkin(idx)});
    setTimeout(function(){syncSkin(idx)},80);
    var after=(p.unlockedSkins||[]).indexOf(Number(idx))>=0;
    if(!before&&after&&g.save)g.save();
  };
}

function addBonusExit(){
  var root=document.getElementById("nx-bonus");
  if(!root||root.querySelector("#nx-bonus-exit"))return;
  var exit=document.createElement("button");
  exit.id="nx-bonus-exit";exit.type="button";exit.textContent="← Вернуться в меню";
  exit.addEventListener("click",function(){
    if(typeof g.__neonCloseModal==="function")g.__neonCloseModal();
    else if(typeof g.hideModal==="function")g.hideModal();
    else {var m=document.getElementById("modal");if(m)m.classList.add("hidden");}
  });
  root.appendChild(exit);
}
var modalContent=document.getElementById("modal-content");
if(modalContent){
  new MutationObserver(function(){addBonusExit()}).observe(modalContent,{childList:true,subtree:true});
  addBonusExit();
}
document.addEventListener("click",function(e){
  if(e.target&&e.target.closest&&e.target.closest("#bonus-btn"))setTimeout(addBonusExit,0);
});
})();


/* ---- Original script block 28: neon-v49-telegram-runtime ---- */
(function(){"use strict";var g=window,wasHidden=document.hidden;function onVisibility(){var hidden=document.hidden;if(hidden===wasHidden)return;wasHidden=hidden;if(hidden){try{g.NeonInput&&g.NeonInput.held&&g.NeonInput.held.clear()}catch(e){}try{g.NEON_PARTICLE_POOL&&g.NEON_PARTICLE_POOL.clear&&g.NEON_PARTICLE_POOL.clear()}catch(e){}}else{try{g.NEON_RENDER&&g.NEON_RENDER.resize&&g.NEON_RENDER.resize()}catch(e){}try{g.NeonAudio&&g.NeonAudio.resume&&g.NeonAudio.resume()}catch(e){}}}document.addEventListener("visibilitychange",onVisibility,{passive:true});window.addEventListener("pageshow",function(){try{g.NEON_RENDER&&g.NEON_RENDER.resize&&g.NEON_RENDER.resize()}catch(e){}},{passive:true});})();
