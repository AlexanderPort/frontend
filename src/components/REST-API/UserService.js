import API from './settings'


export default class UserService {
    constructor(){}

    createUser(user){
        const url = `${API}/api/users/`;
        const params = {
            method: 'POST', 
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }};
        return fetch(url, params)
                .then(response => response.json())
                .then(result => { return result.pk; })
                .catch(error => console.error(error));
    }
    updateUser(user){
        const url = `${API}/api/users/`;
        const params = {
            method: 'PUT', 
            body: user,
        };
        return fetch(url, params)
                    .then(response => console.error(response))
                    .catch(error => console.error(error));
    }
    getUser(pk) {
        const url = `${API}/api/users/${pk}/`;
        const params = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        };
        return fetch(url, params)
                .then((response) => response.json())
                .then((user) => { return user.user; })
    }
    uploadUserImage(image) {
        const url = `${API}/api/users/images/`;
        const params = {
            method: 'POST',
            body: image,
        };
        fetch(url, params)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                })
                .catch((error) => {
                    console.error(error);
                });
    }
    getUserWithArticles(pk) {
        const url = `${API}/api/users/${pk}/articles/`;
        const params = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        };
        return fetch(url, params)
                .then(response => response.json())
                .then(data => { return {user: data.user, articles: data.articles}; })
    }
    signIn(login, password) {
        const url = `${API}/api/users/login/`;
        const params = {
            method: 'POST',
            body: JSON.stringify({
                login: login,
                password: password,
            }),
            headers: {
                'content-type': 'application/json',
            },
        };
        return fetch(url, params)
                .then((response) => response.json())
                .then(result => { return result.pk; });
    }
    addFollower(author, follower) {
        const url = `${API}/api/users/${author}/followers/${follower}/`;
        const params = {
            method: 'PUT', 
            headers: {
                'content-type': 'application/json',
            },
        };
        return fetch(url, params)
                    .then(response => response.json())
                    .then(data => { return data.follow; })
                    .catch(error => console.error(error));
    }
    isFollower(author, follower) {
        const url = `${API}/api/users/${author}/followers/${follower}/`;
        const params = {
            method: 'GET', 
            headers: {
                'content-type': 'application/json',
            },
        };
        return fetch(url, params)
                    .then(response => response.json())
                    .then(data => { return data.follow; })
                    .catch(error => console.error(error));
    }
    getFollowers(author) {
        const url = `${API}/api/users/${author}/followers/`;
        const params = {
            method: 'GET', 
            headers: {
                'content-type': 'application/json',
            },
        };
        return fetch(url, params)
                    .then(response => response.json())
                    .then(data => { return data.followers; })
                    .catch(error => console.error(error));
    }
}