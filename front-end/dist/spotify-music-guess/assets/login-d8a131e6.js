import{r as p,l as f}from"./configs-0ede03f3.js";import{b as h,U as l}from"./addLoading-ff09a8db.js";async function m(t){const a=g(128),o=await y(a);localStorage.setItem("verifier",a);const e=new URLSearchParams;e.append("client_id",t),e.append("response_type","code"),e.append("redirect_uri",p),e.append("scope","user-read-private user-read-email user-modify-playback-state user-read-playback-state playlist-read-private playlist-read-collaborative user-library-read"),e.append("code_challenge_method","S256"),e.append("code_challenge",o),document.location=`https://accounts.spotify.com/authorize?${e.toString()}`}async function u(t,a){if(localStorage.getItem("acess_token")){const o=localStorage.getItem("refresh_token"),e=new URLSearchParams;e.append("client_id",t),e.append("grant_type","refresh_token"),e.append("refresh_token",o);const s=await fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:e}),{access_token:n,refresh_token:c}=await s.json();return n&&localStorage.setItem("acess_token",n),c&&localStorage.setItem("refresh_token",c),n}else{const o=localStorage.getItem("verifier"),e=new URLSearchParams;e.append("client_id",t),e.append("grant_type","authorization_code"),e.append("code",a),e.append("redirect_uri",p),e.append("code_verifier",o);const s=await fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:e}),{access_token:n,refresh_token:c}=await s.json();return n&&localStorage.setItem("acess_token",n),c&&localStorage.setItem("refresh_token",c),n}}function g(t){let a="",o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let e=0;e<t;e++)a+=o.charAt(Math.floor(Math.random()*o.length));return a}async function y(t){const a=new TextEncoder().encode(t),o=await window.crypto.subtle.digest("SHA-256",a);return btoa(String.fromCharCode.apply(null,[...new Uint8Array(o)])).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function w(){return(await fetch("https://api.spotify.com/v1/me",{method:"GET",headers:l.accessTokenHeader}).then(a=>a.json())).country}async function _(t){return h(w,t)}const i="b3c2339a149d46afa94a39347466b623",r=new URLSearchParams(window.location.search),d=r.get("code");document.addEventListener("DOMContentLoaded",async()=>{if(d)try{const t=await u(i,d);l.accessToken=t;const a=await _();r.delete("code"),r.append("login","true"),r.append("acessToken",t),r.append("country",a),document.location=`${f}?${r.toString()}`}catch(t){console.log("Não foi possível carregar o home page",t)}else m(i)});
