const username = 'GregorioFornetti';

const getUser = () => {
    fetch(`https://api.github.com/users/${username}/`, {
        headers: {'X-GitHub-Api-Version': '2022-11-28'}
    })
    .then(response => response.json()) 
    .then(data => console.log(data))
}

getUser();

