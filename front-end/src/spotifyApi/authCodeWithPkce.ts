// Códigos do tutorial do spotify: https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow

import { redirectUri } from "./configs"

export async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", redirectUri)
    params.append("scope", "user-read-private user-read-email user-modify-playback-state user-read-playback-state playlist-read-private playlist-read-collaborative user-library-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function getAccessToken(clientId: string, code: string) {
    if (!localStorage.getItem('acess_token')) {
        // Primeiro acesso
        const verifier = localStorage.getItem("verifier");

        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", redirectUri);
        params.append("code_verifier", verifier!);

        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });

        const { access_token, refresh_token } = await result.json()
        if (access_token) {
            localStorage.setItem('acess_token', access_token)
        }
        if (refresh_token) {
            localStorage.setItem('refresh_token', refresh_token)
        }
        return access_token;
    } else {
        // Refresh token
        const refreshToken = localStorage.getItem('refresh_token')

        const params = new URLSearchParams()
        params.append("client_id", clientId)
        params.append("grant_type", "refresh_token")
        params.append("refresh_token", refreshToken!)

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params
        })
        
        const { access_token, refresh_token } = await result.json()
        if (access_token) {
            localStorage.setItem('acess_token', access_token)
        }
        if (refresh_token) {
            localStorage.setItem('refresh_token', refresh_token)
        }
        return access_token
    }
}

function generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}
