const fun = require('./functions');

/* CRUD ARTICLES */

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

/* CRUD COMMENTS */

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

/* CRUD USERS */

async function usersCreate(req) {
    const user = req.body;
    let data;
    let privilege = user.privilege;
    let pass = fun.encryptPassLogin(user.pass);
    if (privilege && user.first_name && user.last_name && user.email_user && user.pass) {
        data = await fun.insupdelDb("INSERT INTO `users` (`privilege`, `first_name`, `last_name`, `email_user`, `pass`, `created_at`, `updated_at`) VALUES ('" + privilege + "','" + user.first_name + "', '" + user.last_name + "', '" + user.email_user + "', '" + pass + "', NOW(), NOW());");
    } else {
        data = 'Enviar completo json';
    }
    return data;
}

/* LOGIN */

async function login(req) {
    const username = req.body.username;
    const password = req.body.password;
    let result;
    let data = await fun.selectDb("SELECT u.id AS 'id_user', concat(u.first_name, ' ' , u.last_name) AS 'user_name' , u.privilege, u.pass  FROM users AS u WHERE email_user = '" + username + "' AND deleted = 'N';");
    let resultlenght = Object.getOwnPropertyNames(data);
    if (resultlenght.length > 1) {
        let id_userp = data[0].id_user;
        let user_namep = data[0].user_name;
        let privilegep = data[0].privilege;
        let pass = data[0].pass;
        const passdecrypt = fun.decryptPassLogin(password, pass);
        if (passdecrypt) {
            let token = fun.signToken({ id_user: id_userp, user_name: user_namep, privilege: privilegep });
            fun.updateTokenLogin(id_userp, token);
            result = { login_token: token };
        } else {
            result = { error: "Clave Incorrecta" };
        }
    } else {
        result = { error: "Usuario Incorrecto" };
    }
    return result;
}


module.exports = {
    articlesGet,
    articlesCreate,
    articlesDelete,
    articleUpdate,
    articleSearch,
    commentsGet,
    commentsCreate,
    commentsDelete,
    commentsUpdate,
    commentSearch,
    usersCreate,
    login
}