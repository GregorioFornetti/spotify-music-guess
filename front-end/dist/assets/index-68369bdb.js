import{a as h,U as p}from"./addLoading-e404d122.js";const l="http://localhost:3000";async function u(a){const o=f(128),t=await g(o);localStorage.setItem("verifier",o);const e=new URLSearchParams;e.append("client_id",a),e.append("response_type","code"),e.append("redirect_uri",l),e.append("scope","user-read-private user-read-email user-modify-playback-state user-read-playback-state playlist-read-private playlist-read-collaborative user-library-read"),e.append("code_challenge_method","S256"),e.append("code_challenge",t),document.location=`https://accounts.spotify.com/authorize?${e.toString()}`}async function m(a,o){if(localStorage.getItem("acess_token")){const t=localStorage.getItem("refresh_token"),e=new URLSearchParams;e.append("client_id",a),e.append("grant_type","refresh_token"),e.append("refresh_token",t);const s=await fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:e}),{access_token:r,refresh_token:c}=await s.json();return r&&localStorage.setItem("acess_token",r),c&&localStorage.setItem("refresh_token",c),r}else{const t=localStorage.getItem("verifier"),e=new URLSearchParams;e.append("client_id",a),e.append("grant_type","authorization_code"),e.append("code",o),e.append("redirect_uri",l),e.append("code_verifier",t);const s=await fetch("https://accounts.spotify.com/api/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:e}),{access_token:r,refresh_token:c}=await s.json();return r&&localStorage.setItem("acess_token",r),c&&localStorage.setItem("refresh_token",c),r}}function f(a){let o="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let e=0;e<a;e++)o+=t.charAt(Math.floor(Math.random()*t.length));return o}async function g(a){const o=new TextEncoder().encode(a),t=await window.crypto.subtle.digest("SHA-256",o);return btoa(String.fromCharCode.apply(null,[...new Uint8Array(t)])).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function y(){return(await fetch("https://api.spotify.com/v1/me",{method:"GET",headers:p.accessTokenHeader}).then(o=>o.json())).country}async function w(a){return h(y,a)}const i="b3c2339a149d46afa94a39347466b623",n=new URLSearchParams(window.location.search),d=n.get("code");document.addEventListener("DOMContentLoaded",async()=>{if(d)try{const t=await m(i,d);p.accessToken=t;const e=await w();n.delete("code"),n.append("login","true"),n.append("acessToken",t),n.append("country",e),alert(t),alert(e),document.location=`home?${n.toString()}`}catch(t){console.log("Não foi possível carregar o home page",t)}const a=document.getElementById("login");a==null||a.addEventListener("click",()=>{u(i)});const o=document.getElementById("no-login");o==null||o.addEventListener("click",async()=>{const t=await fetch("/auth-without-login").then(e=>e.text());n.append("login","false"),n.append("acessToken",t),n.append("country","br"),document.location=`home?${n.toString()}`})});
