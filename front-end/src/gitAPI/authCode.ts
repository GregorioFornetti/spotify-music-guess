export async function getInfo(username: string) { 
    try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
            headers: {'X-GitHub-Api-Version': '2022-11-28'}
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}