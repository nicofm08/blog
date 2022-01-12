const express = require('express');
const router = express.Router();
const md = require('../utils/middlewares');
const crud = require('../cruds/comments_crud');

router.use(md.userAutenticated)

router.get('/', async (req, res) => {
    let data = await crud.commentsGet(req);
    res.json(data);
})

router.post('/', async (req, res) => {
    let data = await crud.commentsCreate(req);
    res.json(data);
})


router.delete('/', async (req, res) => {
    let data = await crud.commentsDelete(req);
    res.json(data);
})

router.put('/', async (req, res) => {
    let data = await crud.commentsUpdate(req);
    res.json(data);
})

router.get('/search', async (req, res) => {
    let data = await crud.commentSearch(req);
    res.json(data);
})



module.exports = router;
