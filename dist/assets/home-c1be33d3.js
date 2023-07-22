var Te=Object.defineProperty;var ke=(e,t,n)=>t in e?Te(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var c=(e,t,n)=>(ke(e,typeof t!="symbol"?t+"":t,n),n);import"./modulepreload-polyfill-3cfb730f.js";import{a as P,U as l,b as q}from"./addLoading-c08e133b.js";const we={"empty-page":"none","home-page":"flex","playlist-info-page":"block","rounds-mode-game-page":"block","credits-page":"block","tests-page":"block"};function L(e){var n;const t=(n=document.getElementById("main"))==null?void 0:n.children;if(t)for(let s=0;s<t.length;s++){const i=t[s];i.style.display="none",i.id===e&&(i.style.display=we[e])}}function xe(e,t){var s;const n=(s=document.getElementById(e))==null?void 0:s.children;if(n)for(let i=0;i<n.length;i++){const r=n[i];r.style.display="none",r.id===t&&(r.style.display="block")}}const Z="([A-Za-z0-9]{22})",Le=new RegExp(`^${Z}$`),me=new RegExp(`^spotify:playlist:${Z}$`),ue=new RegExp(`^https://open.spotify.com/playlist/${Z}(\\?si=.*)?$`);function Pe(e){return Le.test(e)}function Ie(e){return me.test(e)}function _e(e){return ue.test(e)}function Ne(e){return e.match(me)[1]}function Be(e){return e.match(ue)[1]}function Me(e){if(e=e.trim(),Ie(e))return Ne(e);if(_e(e))return Be(e);if(Pe(e))return e;throw new Error("URI, URL ou ID inválido.")}class a{static reset(){this.resetCorrectAnswerCount(),this.resetRoundNumber(),this.resetCurrentTime(),this.resetExtraTriesCount(),this.resetRoundsHistory()}static get playlist(){return this._playlist}static set playlist(t){this._playlist=t}static get playlistId(){return this._playlistId}static set playlistId(t){this._playlistId=t}static get roundNumber(){return this._roundNumber}static resetRoundNumber(){this._roundNumber=1}static increaseRoundNumber(){if(this._totalRounds<=this._roundNumber)throw new Error("Número do round não pode ser maior que o número total de rounds");this._roundNumber++}static get totalRounds(){return this._totalRounds}static set totalRounds(t){this._totalRounds=t}static get correctAnswersCount(){return this._correctAnswerCount}static resetCorrectAnswerCount(){this._correctAnswerCount=0}static increaseCorrectAnswerCount(){if(this._totalRounds<=this._correctAnswerCount)throw new Error("Número de acertos não pode ser maior que o número total de rounds");this._correctAnswerCount++}static get musicPos(){return this._musicPos}static set musicPos(t){this._musicPos=t}static get musicPlaytime(){return this._musicPlaytime}static set musicPlaytime(t){this._musicPlaytime=t}static get musicsQnt(){return this._musicsQnt}static set musicsQnt(t){this._musicsQnt=t}static get extraTries(){return this._extraTries}static set extraTries(t){this._extraTries=t}static get currentTime(){return this._currentTime}static resetCurrentTime(){this._currentTime=0,this.roundCurrentTime=0}static increaseCurrentTime(){this._currentTime++,this.roundCurrentTime++}static get extraTriesCount(){return this._extraTriesCount}static resetExtraTriesCount(){this._extraTriesCount=0,this.roundExtraTriesCount=0}static increaseExtraTriesCount(){this._extraTriesCount++,this.roundExtraTriesCount++}static get roundsHistory(){return this._roundsHistory}static resetRoundsHistory(){this._roundsHistory=[]}static addRoundHistory(t,n){this.extraTries?this._roundsHistory.push({timeSpent:this.roundCurrentTime,correctMusic:t,guessedMusic:n}):this._roundsHistory.push({timeSpent:this.roundCurrentTime,correctMusic:t,guessedMusic:n,extraTriesCount:this.roundExtraTriesCount}),this.roundCurrentTime=0,this.roundExtraTriesCount=0}static get score(){return Math.max(this._correctAnswerCount*500-(this._currentTime+this._extraTriesCount*25),50*this._correctAnswerCount)}static get incorrectAnswerCount(){return this._totalRounds-this._correctAnswerCount}static get isPremiumMode(){return this._isPremiumMode}static set isPremiumMode(t){this._isPremiumMode=t}}c(a,"_playlist"),c(a,"_playlistId"),c(a,"_roundNumber"),c(a,"_correctAnswerCount"),c(a,"_totalRounds"),c(a,"_musicPos"),c(a,"_musicPlaytime"),c(a,"_musicsQnt"),c(a,"_extraTries"),c(a,"_currentTime"),c(a,"_extraTriesCount"),c(a,"_roundsHistory"),c(a,"_isPremiumMode"),c(a,"roundCurrentTime"),c(a,"roundExtraTriesCount");function z(e){xe("rounds-mode-game-page",e)}function re(e){const t=document.createElement("div");t.classList.add("music");const n=document.createElement("img");n.classList.add("music-image");const s=document.createElement("p");s.classList.add("music-name"),s.innerText=e.name;const i=document.createElement("p");return i.classList.add("music-artist"),e.type==="track"?(e.album.images.length!==0&&n.setAttribute("src",e.album.images[0].url),i.innerText=e.artists[0].name):e.type==="episode"&&(e.images.length!==0&&n.setAttribute("src",e.images[0].url),i.innerText=e.show.name),t.appendChild(n),t.appendChild(s),t.appendChild(i),t}function V(e){const t=Math.floor(e/3600),n=Math.floor(e%(60*60)/60),s=e%60;return t?`${String(t).padStart(2,"0")}:${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}`:`${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}`}function oe(e){const t=document.createElement("div");t.classList.add("music-round-history");const n=document.createElement("img");n.classList.add("music-image-round-history");const s=document.createElement("p");s.classList.add("music-name-round-history"),s.innerText=e.name;const i=document.createElement("p");return i.classList.add("music-artist-round-history"),e.type==="track"?(e.album.images.length!==0&&n.setAttribute("src",e.album.images[0].url),i.innerText=e.artists[0].name):e.type==="episode"&&(e.images.length!==0&&n.setAttribute("src",e.images[0].url),i.innerText=e.show.name),t.appendChild(n),t.appendChild(s),t.appendChild(i),t}function Se(e){const t=document.createElement("div");t.appendChild(oe(e.guessedMusic)),t.appendChild(oe(e.correctMusic));const n=document.createElement("p");if(n.innerText=`Tempo gasto: ${V(e.timeSpent)}`,t.appendChild(n),e.extraTriesCount){const s=document.createElement("p");s.innerText=`Tentativas extras utilizadas: ${e.extraTriesCount}`,t.appendChild(s)}return t}function Ae(){document.getElementById("rounds-mode-score").innerText=a.score.toString(),document.getElementById("rounds-mode-correct-count").innerText=a.correctAnswersCount.toString(),document.getElementById("rounds-mode-incorrect-count").innerText=a.incorrectAnswerCount.toString(),document.getElementById("rounds-mode-total-rounds").innerText=a.totalRounds.toString(),document.getElementById("rounds-mode-total-time").innerText=V(a.currentTime),document.getElementById("rounds-mode-extra-tries-count").innerText=a.extraTriesCount.toString(),a.extraTries?document.getElementById("rounds-mode-extra-tries").style.display="block":document.getElementById("rounds-mode-extra-tries").style.display="none";const e=document.getElementById("rounds-mode-history");e.innerHTML="";for(let t of a.roundsHistory)e.appendChild(Se(t));z("final-result-rounds-subpage")}document.addEventListener("DOMContentLoaded",()=>{var e,t,n;(e=document.getElementById("final-result-return"))==null||e.addEventListener("click",()=>{L("home-page")}),(t=document.getElementById("play-again-rounds-mode-new-configs"))==null||t.addEventListener("click",()=>{a.reset(),fe()}),(n=document.getElementById("play-again-rounds-mode-same-configs"))==null||n.addEventListener("click",()=>{a.reset(),he()})});function De(e,t){a.addRoundHistory(e,t),e.id===t.id?(document.getElementById("song-result-message").innerText="Você acertou !",a.increaseCorrectAnswerCount()):document.getElementById("song-result-message").innerText="Você errou !",document.getElementById("song-result-current-round").innerText=a.roundNumber.toString(),document.getElementById("song-result-total-rounds").innerText=a.totalRounds.toString();const n=document.getElementById("song-result-correct-song");n.innerHTML="",n.appendChild(re(e));const s=document.getElementById("song-result-guessed-song");s.innerHTML="",s.appendChild(re(t)),z("song-result-rounds-subpage")}document.addEventListener("DOMContentLoaded",()=>{var e;(e=document.getElementById("song-result-next"))==null||e.addEventListener("click",()=>{a.roundNumber===a.totalRounds?Ae():(a.increaseRoundNumber(),ge())})});function K(e){let t=[...e];for(let n=t.length-1;n>0;n--){const s=Math.floor(Math.random()*(n+1));[t[n],t[s]]=[t[s],t[n]]}return t}async function He(){await fetch("https://api.spotify.com/v1/me/player/pause",{method:"PUT",headers:l.accessTokenHeader})}function pe(e){return P(He,e)}async function Re(e,t,n,s){let i=0;return s&&(i=s),await fetch("https://api.spotify.com/v1/me/player/play",{method:"PUT",headers:l.accessTokenHeader,body:JSON.stringify({context_uri:`spotify:playlist:${n}`,position_ms:i,offset:{position:e}})}),window.setTimeout(()=>{pe()},t*1e3)}async function $e(e,t,n,s,i){return P(Re,i,e,t,n,s)}class Y{constructor(t,n,s,i){c(this,"musicFullDuration");c(this,"playlistId");c(this,"musicNumber");c(this,"musicPlaytimes");c(this,"currentIndex");c(this,"musicPlaytime");c(this,"timeoutId");this.musicNumber=s,this.currentIndex=0,this.musicPlaytimes=[],this.musicFullDuration=t.tracks.items[this.musicNumber].track.duration_ms,this.playlistId=n,this.musicPlaytime=i,this.constructPlaytimes()}async play(){if(!this.finished){let t=this.musicPlaytime;this.musicPlaytimes[this.currentIndex]+t*1e3>this.musicFullDuration&&(t=(this.musicFullDuration-this.musicPlaytimes[this.currentIndex])/1e3-.01),this.timeoutId=await $e(this.musicNumber,t,this.playlistId,this.musicPlaytimes[this.currentIndex],!0),this.currentIndex+=1}}pause(){clearTimeout(this.timeoutId),pe(!0)}get finished(){return this.currentIndex>=this.musicPlaytimes.length}}class Fe extends Y{constructPlaytimes(){this.musicPlaytimes.push(0);let t=this.musicPlaytime*1e3;for(;t<this.musicFullDuration;)this.musicPlaytimes.push(t),t+=this.musicPlaytime*1e3;this.musicPlaytimes=K(this.musicPlaytimes)}close(){}}class Oe extends Y{constructPlaytimes(){this.musicPlaytimes.push(0);let t=this.musicPlaytime*1e3;for(;t<this.musicFullDuration;)this.musicPlaytimes.push(t),t+=this.musicPlaytime*1e3}close(){}}class Ue extends Y{constructor(n,s,i,r){super(n,s,i,r);c(this,"playerElement");this.playerElement=this.createPlayerElement(n),this.musicFullDuration=3e4}createPlayerElement(n){const s=n.tracks.items[this.musicNumber].track,i=document.createElement("audio");i.style.display="none";const r=document.createElement("source");return s.type==="track"?r.src=s.preview_url:s.type==="episode"&&(r.src=s.audio_preview_url),r.type="audio/mpeg",i.appendChild(r),document.body.appendChild(i),i}constructPlaytimes(){this.musicPlaytimes.push(0);let n=this.musicPlaytime*1e3;for(;n<this.musicFullDuration;)this.musicPlaytimes.push(n),n+=this.musicPlaytime*1e3}async play(){this.finished||(this.playerElement.play(),setTimeout(()=>{this.playerElement.pause()},this.musicPlaytime*1e3))}pause(){this.playerElement.pause()}close(){this.playerElement.remove()}}function qe(e,t){return t.filter(n=>n.track.name.toLowerCase().includes(e.toLowerCase()))}function Qe(e,t){return t.filter(n=>n.track.type==="episode"?n.track.show.name.toLowerCase().includes(e.toLowerCase()):n.track.type==="track"?n.track.artists[0].name.toLowerCase().includes(e.toLowerCase()):!1)}function je(e,t,n,s){return qe(e,ze(n,Qe(t,s)))}function ze(e,t){return t.filter(n=>n.track.type==="track"?n.track.album.name.toLowerCase().includes(e.toLowerCase()):n.track.type==="episode"?n.track.show.name.toLowerCase().includes(e.toLowerCase()):!1)}function ye(e,t){const n=document.createElement("div");n.className="playlist-container";const s=document.createElement("table");s.className="playlist-table";const i=document.createElement("thead");i.className="playlist-head";const r=document.createElement("tr");r.className="desktop",r.innerHTML=`
        <th></th>
        <th>Nome</th>
        <th>Artista</th>
        <th>Álbum</th>
    `,i.appendChild(r);const o=document.createElement("tr");o.className="desktop";const d=document.createElement("td"),m=document.createElement("input");m.placeholder="Nome",d.appendChild(m);const C=document.createElement("td"),I=document.createElement("input");I.placeholder="Artista",C.appendChild(I);const _=document.createElement("td"),u=document.createElement("input");u.placeholder="Álbum",_.appendChild(u),o.appendChild(document.createElement("td")),o.appendChild(d),o.appendChild(C),o.appendChild(_),i.appendChild(o);const v=document.createElement("tr");v.className="mobile";const b=document.createElement("td"),y=document.createElement("div");y.className="input-group mb-3";const p=document.createElement("button");p.className="playlist-dropdown-btn btn btn-outline-secondary dropdown-toggle",p.dataset.bsToggle="dropdown",p.ariaExpanded="false",p.innerHTML="Nome";const h=document.createElement("ul");h.className="dropdown-menu";const S=document.createElement("li"),w=document.createElement("a");w.className="playlist-dropdown-item dropdown-item",w.innerHTML="Nome",S.appendChild(w);const N=document.createElement("li"),T=document.createElement("a");T.className="playlist-dropdown-item dropdown-item",T.innerHTML="Artista",N.appendChild(T);const se=document.createElement("li"),R=document.createElement("a");R.className="playlist-dropdown-item dropdown-item",R.innerHTML="Álbum",se.appendChild(R),h.appendChild(S),h.appendChild(N),h.appendChild(se);const x=document.createElement("input");x.placeholder="Filtro",y.appendChild(p),y.appendChild(h),y.appendChild(x),b.appendChild(y),v.appendChild(b),i.appendChild(v);const $=document.createElement("tbody");$.className="playlist-body";let F,g=null;const ie=E=>{for(let k of E){let B=Ve(k.track);k.track===F&&(B.classList.add("selected"),g=B),t&&(B.classList.add("clickable"),B.addEventListener("click",()=>{if(t(k.track),F===k.track){g==null||g.classList.remove("selected"),g=null,F=null;return}g&&g.classList.remove("selected"),g=B,F=k.track,g.classList.add("selected")})),$.appendChild(B)}};let O="name";const f={name:{name:"Nome",value:"",input:m},artist:{name:"Artista",value:"",input:I},album:{name:"Album",value:"",input:u}},ae=()=>{$.innerHTML="",ie(je(f.name.value,f.artist.value,f.album.value,e.tracks.items))},be=()=>{f[O].value=x.value,f[O].input.value=x.value,ae()},G=E=>{const k=f[E].input.value;f[E].value=k,E===O&&(x.value=k),ae()},J=E=>{O=E,p.innerHTML=f[E].name,x.value=f[E].value};return ie(e.tracks.items),w.addEventListener("click",()=>{J("name")}),T.addEventListener("click",()=>{J("artist")}),R.addEventListener("click",()=>{J("album")}),m.addEventListener("input",()=>{G("name")}),I.addEventListener("input",()=>{G("artist")}),u.addEventListener("input",()=>{G("album")}),x.addEventListener("input",be),s.appendChild(i),s.appendChild($),n.appendChild(s),n}function Ve(e){const t=document.createElement("tr"),n=document.createElement("td");n.classList.add("album-img");const s=document.createElement("img");s.classList.add("playlist-img");const i=document.createElement("td");i.classList.add("name");const r=document.createElement("span");r.innerText=e.name;const o=document.createElement("td");o.classList.add("artist");const d=document.createElement("span"),m=document.createElement("td");m.classList.add("album");const C=document.createElement("span");return e.type==="track"?(e.album.images.length!==0&&s.setAttribute("src",e.album.images[0].url),d.innerText=e.artists[0].name,C.innerText=e.album.name):e.type==="episode"&&(e.images.length!==0&&s.setAttribute("src",e.images[0].url),d.innerText=e.show.name,C.innerText=e.show.publisher),n.appendChild(s),i.appendChild(r),o.appendChild(d),m.appendChild(C),t.appendChild(n),t.appendChild(i),t.appendChild(o),t.appendChild(m),t}var A=null,D,U,H,W,Q=-1;async function he(){D=K([...Array(a.playlist.tracks.items.length).keys()]),A=null;const e=document.getElementById("song-guess-hear-next");a.extraTries?e.disabled=!1:e.disabled=!0;const t=document.getElementById("rounds-mode-timer");t.innerHTML=V(0),Q!==-1&&clearInterval(Q),await ge()}async function ge(){const e=document.getElementById("song-guess-input"),t=document.getElementById("artist-guess-input");if(e.value="",t.value="",a.playlist.tracks.items.length===a.musicsQnt)W=a.playlist.tracks.items;else{let i=[D[a.roundNumber-1]],r=[...D];delete r[a.roundNumber-1],r=K(r);for(let o=0;o<a.musicsQnt-1;o++)i.push(r[o]);i.sort(),W=i.map(o=>a.playlist.tracks.items[o])}const n=a.playlist;n.tracks.items=W,Ge(a.playlist),a.isPremiumMode?a.musicPos==="random"?U=Fe:a.musicPos==="start"&&(U=Oe):U=Ue,H=new U(a.playlist,a.playlistId,D[a.roundNumber-1],a.musicPlaytime),await H.play();const s=document.getElementById("rounds-mode-timer");Q=window.setInterval(()=>{a.increaseCurrentTime(),s.innerHTML=V(a.currentTime)},1e3),z("song-guess-rounds-subpage")}function Ge(e){const t=document.getElementById("playlist-tracks-list-game");t.innerHTML="",t.appendChild(ye(e,n=>{A=n}))}document.addEventListener("DOMContentLoaded",()=>{var e,t;(e=document.getElementById("song-guess-submit"))==null||e.addEventListener("click",()=>{A&&(clearInterval(Q),De(a.playlist.tracks.items[D[a.roundNumber-1]].track,A),A=null,H.pause(),H.close())}),(t=document.getElementById("song-guess-hear-next"))==null||t.addEventListener("click",()=>{H.play()})});function fe(){Ee(document.getElementById("configs-rounds-form"));const e=a.playlist.tracks.items.length;document.getElementById("configs-rounds-rounds-number").setAttribute("max",e.toString());const n=document.getElementById("configs-rounds-music-qnt");n.setAttribute("max",e.toString()),n.setAttribute("value",e.toString()),z("configs-rounds-subpage")}function X(e){const t=document.getElementById("music-pos-init"),n=document.getElementById("music-pos-random");e?(t.disabled=!1,t.checked=!0,n.disabled=!1):(t.disabled=!0,t.checked=!1,n.disabled=!0,n.checked=!1)}function Ee(e){const t=document.getElementById("input-premium");e.reset(),l.isLogged?(t.checked=!0,t.disabled=!1,X(!0)):(t.checked=!1,t.disabled=!0,X(!1))}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("input-premium");e.addEventListener("input",()=>{X(e.checked)});const t=document.getElementById("configs-rounds-form");t.addEventListener("submit",async n=>{n.preventDefault();const s=new FormData(t);a.totalRounds=Number(s.get("rounds-number")),a.musicPos=s.get("music-pos"),a.musicPlaytime=Number(s.get("music-play-time")),a.musicsQnt=Number(s.get("music-qnt")),a.isPremiumMode=s.get("premium")==="on",a.extraTries=s.get("extra-tries")==="on",a.isPremiumMode||(a.playlist.tracks.items=a.playlist.tracks.items.filter(i=>{const r=i.track;return r.type==="track"?r.preview_url!==null:r.type==="episode"?r.audio_preview_url!==null:!1}),a.musicsQnt=Math.min(a.playlist.tracks.items.length,a.musicsQnt)),await he(),Ee(t)})});function Je(e,t){a.reset(),a.playlist=e,a.playlistId=t,fe(),L("rounds-mode-game-page")}function We(e,t){document.getElementById("playlist-image").setAttribute("src",e.images[0].url),document.getElementById("playlist-name").innerText=e.name,e.description?document.getElementById("playlist-description").innerText=e.description:document.getElementById("playlist-description").innerText="Sem descrição",e.owner.display_name?document.getElementById("playlist-owner").innerText=e.owner.display_name:document.getElementById("playlist-owner").innerText="",document.getElementById("playlist-tracks-count").innerText=String(e.tracks.total);const n=document.getElementById("playlist-tracks-list");n.innerHTML="",n.appendChild(ye(e)),document.getElementById("game-start").onclick=()=>{Je(e,t)},L("playlist-info-page")}document.addEventListener("DOMContentLoaded",()=>{var e;(e=document.getElementById("playlist-return"))==null||e.addEventListener("click",()=>{L("home-page")})});function ce(e){return e.track?e.track.is_playable:!1}async function Xe(e){return fetch(`https://api.spotify.com/v1/playlists/${e}?market=${l.country}&additional_types=episode`,{method:"GET",headers:l.accessTokenHeader}).then(t=>t.json()).then(async t=>{var n=t.tracks.next;for(t.tracks.items=t.tracks.items.filter(ce);n;)await fetch(n,{method:"GET",headers:l.accessTokenHeader}).then(s=>s.json()).then(s=>{t.tracks.items.push(...s.items.filter(ce)),n=s.next});return t})}async function Ce(e,t){return P(Xe,t,e)}async function Ze(){return fetch("https://api.spotify.com/v1/me/player/devices",{headers:l.accessTokenHeader,method:"GET"}).then(e=>e.json()).then(e=>e.devices)}async function Ke(e){return P(Ze,e)}function Ye(e){const t=document.createElement("div");t.classList.add("device");const n=document.createElement("div");n.classList.add("device-is-selected-container");const s=document.createElement("p");s.classList.add("device-is-selected-text"),e.is_active&&(t.classList.add("selected"),s.innerText="Dispositivo seleccionado"),n.appendChild(s),t.appendChild(n);const i=document.createElement("div");i.classList.add("device-icon-container");const r=document.createElement("i");e.type==="Computer"?r.className="bi bi-laptop":e.type==="Smartphone"?r.className="bi bi-phone":e.type==="Speaker"&&(r.className="bi bi-speaker"),i.appendChild(r),t.appendChild(i);const o=document.createElement("div");o.classList.add("device-name-container");const d=document.createElement("p");return d.classList.add("device-name"),d.innerText=e.name,o.appendChild(d),t.appendChild(o),t}function ve(e,t){const n=document.createElement("div");n.classList.add("simplified-playlist-container"),t&&n.classList.add("selectable");const s=document.createElement("img");s.classList.add("simplified-playlist-image"),e.images.length!==0&&s.setAttribute("src",e.images[0].url);const i=document.createElement("p");i.classList.add("simplified-playlist-name"),i.innerText=e.name;const r=document.createElement("p");return r.classList.add("simplified-playlist-description"),e.description?r.innerText=e.description:r.innerText=`De ${e.owner.display_name}`,n.appendChild(s),n.appendChild(i),n.appendChild(r),n}async function et(e){return fetch("https://api.spotify.com/v1/me/player",{headers:l.accessTokenHeader,method:"PUT",body:JSON.stringify({device_ids:[e]})})}async function tt(e,t){return P(et,t,e)}async function nt(){return fetch("https://api.spotify.com/v1/me/playlists?limit=8",{method:"GET",headers:l.accessTokenHeader}).then(e=>e.json())}async function st(e){return P(nt,e)}async function it(e){const n=["collaborative","description","external_urls","href","id","images","name","owner","public","snapshot_id","tracks(href,total)","type","uri"].join(",");return fetch(`https://api.spotify.com/v1/playlists/${e}?fields=${n}`,{method:"GET",headers:l.accessTokenHeader}).then(s=>s.json())}async function le(e,t){return P(it,t,e)}const ne=class{static savePlaylistId(t){const n=this.ids.indexOf(t);return n!==-1&&this.ids.splice(n,1),console.log(t),this.ids.unshift(t),console.log(this.ids),localStorage.setItem(this.storageName,JSON.stringify(this.ids)),n}static getPlaylistsIds(){return this.ids}};let M=ne;c(M,"storageName","play_again_playlists_ids"),c(M,"ids",JSON.parse(localStorage.getItem(ne.storageName)||"[]"));async function at(){return Ke().then(e=>{e||console.log("Não foi possível carregar os dispositivos");const t=document.getElementById("devices-list");for(const n of e){const s=Ye(n);s.addEventListener("click",async()=>{if(n.id){await tt(n.id);for(let i=0;i<t.children.length;i++){const r=t.children[i];r.classList.remove("selected"),r.getElementsByClassName("device-is-selected-text")[0].innerHTML=""}s.classList.add("selected"),s.getElementsByClassName("device-is-selected-text")[0].innerHTML="Dispositivo selecionado",document.getElementById("no-device-selected").style.display="none"}}),t.appendChild(s)}e.length===0?document.getElementById("no-devices-found").style.display="block":e.some(n=>n.is_active)||(document.getElementById("no-device-selected").style.display="block")})}function j(e,t){for(const n of e){const s=ve(n,!0);s.addEventListener("click",async()=>{const i=n.id,r=await Ce(i,!0);ee(r,i)}),t.appendChild(s)}}async function rt(){return st().then(e=>{const t=document.getElementById("user-playlists-list"),n=document.getElementById("user-playlists-load-more");j(e.items,t);let s=e.next;s?n.onclick=()=>{q(async()=>{await fetch(s,{method:"GET",headers:l.accessTokenHeader}).then(i=>i.json()).then(i=>{j(i.items,t),s=i.next,s||(n.style.display="none")})})}:n.style.display="none"})}async function de(){const e=M.getPlaylistsIds(),t=document.getElementById("play-again-list"),n=document.getElementById("play-again-load-more"),s=8;let i=0;return Promise.all(e.slice(i,i+s).map(async r=>le(r))).then(r=>{j(r,t),i+=s,i>=e.length?n.style.display="none":n.onclick=()=>{q(async()=>{await Promise.all(e.slice(i,i+s).map(async o=>le(o))).then(o=>{j(o,t),i+=s,i>=e.length&&(n.style.display="none")})})}})}async function ot(){l.isLogged?q(async()=>{await Promise.all([at(),rt(),de()])}):(document.getElementById("user-library").style.display="none",document.getElementById("devices-home-page").style.display="none",q(de))}function ee(e,t){const n=document.getElementById("play-again-list");We(e,t);const s=M.savePlaylistId(t);s!==-1&&n.children.length>s&&n.removeChild(n.children[s]);const i=ve(e,!0);i.addEventListener("click",async()=>{ee(e,t)}),n.insertBefore(i,n.children[0])}document.addEventListener("DOMContentLoaded",async()=>{var e;(e=document.getElementById("playlist-form"))==null||e.addEventListener("submit",async t=>{t.preventDefault();const n=document.getElementById("playlist-input").value;try{const s=Me(n),i=await Ce(s,!0);ee(i,s)}catch(s){console.log(s)}})});const te=new URLSearchParams(window.location.search),ct=te.get("login")==="true",lt=te.get("acessToken"),dt=te.get("country");document.addEventListener("DOMContentLoaded",async()=>{L("empty-page"),l.accessToken=lt,l.country=dt,l.isLogged=ct,await ot(),L("home-page")});async function mt(e){try{return await(await fetch(`https://api.github.com/users/${e}`,{headers:{"X-GitHub-Api-Version":"2022-11-28"}})).json()}catch(t){return console.log(t),null}}document.addEventListener("DOMContentLoaded",()=>{var e;(e=document.getElementById("credit"))==null||e.addEventListener("click",()=>{L("credits-page"),ut();const t=[{nickname:"A-nita",cargos:["Diretora de Artes","Desenvolvedora"],linkedin:"https://www.linkedin.com/in/anita-moura/"},{nickname:"caiopadovan",cargos:["Desenvolvedor"],linkedin:"https://www.linkedin.com/in/caio-padovan-b28a97262/"},{nickname:"Pandxra",cargos:["Faltou na reunião","Desenvolvedora"],linkedin:"https://www.linkedin.com/in/cinthiacosta98/"},{nickname:"GregorioFornetti",cargos:["Chefe","Desenvolvedor"],linkedin:"https://www.linkedin.com/in/greg%C3%B3rio-fornetti-azevedo-4a0193201/"},{nickname:"guilhermesdc",cargos:["Desenvolvedor"],linkedin:"https://www.linkedin.com/in/guilherme-silva-de-camargo-104618220/"},{nickname:"N4NiNi",cargos:["Analista"],linkedin:"https://www.linkedin.com/in/vinicius-nanini/"}],n=document.getElementById("credits_cards");for(let s of t)mt(s.nickname).then(r=>{const o=r.name,d=r.avatar_url,m=r.html_url,C=s.linkedin,I=s.cargos[0],_=document.createElement("div"),u=document.createElement("div"),v=document.createElement("div"),b=document.createElement("div"),y=document.createElement("h5"),p=document.createElement("p"),h=document.createElement("img"),S=document.createElement("i"),w=document.createElement("i"),N=document.createElement("a"),T=document.createElement("a");N.href=m,T.href=C,v.className="position-relative",_.className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch",u.className="zoomeffect cardborder mb-5 card",u.style.width="18rem",b.className="zoomeffect text-white cardcolor card-body d-flex align-items-start flex-column",y.className="cardnome h5 card-title mb-auto",p.className="cardcargo card-text my-3",h.className="p-2 card-img-top",h.setAttribute("src",d),S.className="social_icon bi bi-github fs-2 p-2",w.className="social_icon bi bi-linkedin fs-2 p-2",y.textContent=o,p.textContent=I,_.appendChild(u),u.appendChild(h),u.appendChild(b),b.appendChild(y),b.appendChild(p),b.appendChild(v),T.appendChild(w),v.appendChild(T),N.appendChild(S),v.appendChild(N),n.appendChild(_)})})});function ut(){const e=document.getElementById("credits_cards");e.innerHTML=""}
