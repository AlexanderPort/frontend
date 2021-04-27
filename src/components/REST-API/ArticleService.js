import API from './settings'


export default class ArticleService {
    constructor(){}

    createArticle(article){
        const url = `${API}/api/articles/`;
        const params = {
            method: 'POST', 
            body: article,
        };
        return fetch(url, params)
                .then(response => response.json())
                .then((result) => {
                    console.log(result);
                })
                .catch((error) => {
                    console.error(error);
                });
    }
    updateArticle(article){
        const url = `${API}/api/articles/${article.pk}/`;
        const params = {
            method: 'PUT', 
            body: JSON.stringify(article),
            headers: {
                'content-type': 'application/json'
            }};
        return fetch(url, params)
                .then(response => response.json())
                .then((result) => {
                    console.log(result);
                })
                .catch((error) => {
                    console.error(error);
                });
    }
    getArticle(pk) {
        const url = `${API}/api/articles/${pk}/`;
        const params = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        };
        return fetch(url, params)
                .then(response => response.json())
                .then((article) => { return article.article; })
    }
    uploadArticleImage(image) {
        const url = `${API}/api/articles/image/`;
        const params = {
            method: 'POST',
            body: image,
        };
        fetch(url, params)
            .then(response => response.json())
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    getArticlesByAuthor(pk) {
        const url = `${API}/api/users/${pk}/articles/`;
        const params = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        };
        return fetch(url, params)
                .then(response => response.json())
                .then((articles) => { return articles.articles; })
    }
    getArticles(pk) {
        const url = `${API}/api/users/${pk}/articles/`;
        const params = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        };
        return fetch(url, params)
                .then(response => response.json())
                .then((articles) => { return articles.articles; });
    }
    getMostPopular() {
        const url = `${API}/api/articles/popular/`;
        const params = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        };
        return fetch(url, params)
                .then(response => response.json())
                .then((articles) => { return articles.articles; });
    }
}