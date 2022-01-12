
const fun = require('../utils/functions');

async function articlesGet() {
    let data = await fun.selectDb("SELECT a.id AS 'id_article', a.content, a.tags,a.title ,a.published_at, a.created_at, a.updated_at,  u.id AS 'id_user',CONCAT (u.first_name, ' ' , u.last_name) AS 'article_user'  FROM articles AS a , users AS u WHERE a.user_id = u.id AND a.deleted = 'N' ORDER BY a.id DESC;");
    return data;
}

async function articlesCreate(req) {
    const article = req.body;
    const token = req.headers.authorization;
    const veriftoken = fun.verifyToken(token);
    let data;

    if (article.content && article.tags && article.title && veriftoken.privilege.includes('WRITE')) {
        data = await fun.insupdelDb("INSERT INTO `articles` (`user_id`, `content`, `tags`, `title`, `published_at`, `created_at`,`updated_at` ) VALUES (" + veriftoken.id_user + ", '" + article.content + "', '" + article.tags + "', '" + article.title + "', NOW(), NOW(), NOW());");
    } else {
        data = 'Enviar JSON Completo';
    }
    return data;
}

async function articlesDelete(req) {
    const id = req.body.id_article;
    let data = await fun.insupdelDb("UPDATE `articles` SET `updated_at`=NOW(), `deleted`='Y'  WHERE  `id`= " + id + ";");
    return data;
}

async function articleUpdate(req) {
    const article = req.body;
    const id = req.body.id_article;
    let data;

    if (article.content && article.tags && article.title) {
        data = await fun.insupdelDb("UPDATE `articles` SET `content`='" + article.content + "', `tags`='" + article.tags + "', `title`='" + article.title + "', `updated_at`= NOW() WHERE  `id`=" + id + ";");

    } else {
        data = 'Enviar completo json';
    }
    return data;
}

async function articleSearch(req) {
    const id = req.body.id_article;
    let data = await fun.selectDb("SELECT a.id AS 'id_article', a.content, a.tags,a.title ,a.published_at, a.created_at, a.updated_at,  u.id AS 'id_user',CONCAT (u.first_name, ' ' , u.last_name) AS 'article_user'  FROM articles AS a , users AS u WHERE a.user_id = u.id AND a.deleted = 'N' and a.id = " + id + "  ORDER BY a.id DESC;");
    return data;
}


module.exports = {
    articlesGet,
    articlesCreate,
    articlesDelete,
    articleUpdate,
    articleSearch,

}