const fun = require('./functions');

async function userAutenticated(req, res, next) {
    try {
        const token = req.headers.authorization;
        const veriftoken = fun.verifyToken(token);
        if (veriftoken) {
            // Los tokens expiran en cada login, para evitar +1 sesion por user
            let user = await fun.verifyTokenLogin(token);
            if (user[0].id > 0) {
                return next();
            }
        }
    } catch (error) {
        res.json({ error: "Token Incorrecto/Vencido" });
    }
}

module.exports = {
    userAutenticated
}