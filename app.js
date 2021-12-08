const express = require('express');
const md = require('./middlewares');
const crud = require('./cruds');
const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.listen(8000, () => {
    console.log('Escuchando puerto 8000');
})

/* ROUTES ARTICLES */

app.get('/articles', md.userAutenticated, async (req, res) => {
    let data = await crud.articlesGet();
    res.json(data);
})

app.post('/articles', md.userAutenticated, async (req, res) => {
    let data = await crud.articlesCreate(req);
    res.json(data);
})

app.delete('/articles', md.userAutenticated, async (req, res) => {
    let data = await crud.articlesDelete(req);
    res.json(data);
})

app.put('/articles', md.userAutenticated, async (req, res) => {
    let data = await crud.articleUpdate(req);
    res.json(data);
})

app.get('/search/articles', md.userAutenticated, async (req, res) => {
    let data = await crud.articleSearch(req);
    res.json(data);
})


/* ROUTES COMMENTS */

app.get('/comments', md.userAutenticated, async (req, res) => {
    let data = await crud.commentsGet(req);
    res.json(data);

})

app.post('/comments', md.userAutenticated, async (req, res) => {
    let data = await crud.commentsCreate(req);
    res.json(data);
})

app.delete('/comments', md.userAutenticated, async (req, res) => {
    let data = await crud.commentsDelete(req);
    res.json(data);

})

app.put('/comments', md.userAutenticated, async (req, res) => {
    let data = await crud.commentsUpdate(req);
    res.json(data);
})

app.get('/search/comments', md.userAutenticated, async (req, res) => {
    let data = await crud.commentSearch(req);
    res.json(data);

})

/*ROUTES USERS */

app.post('/users', async (req, res) => {
    let data = await crud.usersCreate(req);
    res.json(data);
})


/* ROUTES LOGIN */

app.post('/login', async (req, res) => {
    let data = await crud.login(req);
    res.json(data);
})


/* ERROR HANDLER - RESET APP */

process.on('uncaughtException', function(err) {
    console.log('Error General: ' + err);
    resetApp();
  });
