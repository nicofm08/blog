const fun = require('../utils/functions');


async function commentsGet() {
    let data = await fun.selectDb(`SELECT c.id_article, c.id AS 'id_comment', c.id_user AS 'id_user',CONCAT (u.first_name, ' ' , u.last_name) AS 'comment_user', c.content , c.created_at, c.updated_at FROM comments AS c, users AS u , articles AS a WHERE c.id_user = u.id AND c.id_article = a.id AND a.deleted = 'N' AND c.deleted = 'N' ORDER BY a.id DESC;`);
    return data;
}

async function commentsCreate(req) {
    const comment = req.body;
    const token = req.headers.authorization;
    const veriftoken = jwt.verifyToken(token);
    let data;
    if (comment.content && veriftoken.privilege.includes('WRITE')) {
        data = await fun.insupdelDb("INSERT INTO `comments` (`id_article`, `id_user`, `content`, `created_at`, `updated_at`) VALUES ('" + comment.id_article + "', '" + veriftoken.id_user + "', '" + comment.content + "', NOW(), NOW());");
    } else {
        data = 'Enviar completo json';
    }
    return data;
}

async function commentsDelete(req) {
    const id = req.body.id_comment;
    let data = await fun.insupdelDb("UPDATE `comments` SET `updated_at`=NOW(), `deleted`='Y' WHERE  `id`= " + id + ";");
    return data;
}

async function commentsUpdate(req) {
    const comment = req.body;
    const id = req.body.id_comment;
    let data;
    if (comment.content) {
        data = await fun.insupdelDb("UPDATE `comments` SET `content`='" + comment.content + "', `updated_at`= NOW() WHERE  `id`=" + id + ";");
    } else {
        data = 'Enviar completo json';
    }
    return data;
}

async function commentSearch(req) {
    const id = req.body.id_comment;
    let data = await fun.selectDb("SELECT c.id_article, c.id AS 'id_comment', c.id_user AS 'id_user',CONCAT (u.first_name, ' ' , u.last_name) AS 'comment_user', c.content , c.created_at, c.updated_at FROM comments AS c, users AS u , articles AS a WHERE c.id_user = u.id AND c.id_article = a.id AND a.deleted = 'N' AND c.deleted = 'N' and c.id = " + id + "  ORDER BY a.id DESC;");
    return data;
}

module.exports = {
    commentsGet,
    commentsCreate,
    commentsDelete,
    commentsUpdate,
    commentSearch
}

