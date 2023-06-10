import { Octokit, App } from "octokit";

export async function getUser() { 
    const octokit = new Octokit({
        auth: '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'
    });

    try {
        const response = await octokit.request('GET /users/{username}', {
            username: 'USERNAME',
            headers: {
            'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        const user = response.data;
        return user.name;
    
    } catch (error) {
        console.log(error);
        return null;
    }
}