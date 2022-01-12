const express = require('express');
const router = express.Router();
const md = require('../utils/middlewares');
const crud = require('../cruds/articles_crud');

router.use(md.userAutenticated)


router.get('/', async (req, res) => {
    let data = await crud.articlesGet();
    res.json(data);
})

router.post('/', async (req, res) => {
    let data = await crud.articlesCreate(req);
    res.json(data);
})

router.delete('/', async (req, res) => {
    let data = await crud.articlesDelete(req);
    res.json(data);
})


router.put('/', async (req, res) => {
    let data = await crud.articleUpdate(req);
    res.json(data);
})


router.get('/search', async (req, res) => {
    let data = await crud.articleSearch(req);
    res.json(data);
})




module.exports = router;
