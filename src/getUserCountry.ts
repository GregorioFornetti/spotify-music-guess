
import User from "./User"

export default async function getUserCountry(): Promise<string> {
    const response = await fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: User.accessTokenHeader
    }).then(response => response.json())

    return response.country
}