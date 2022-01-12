const fun = require('../utils/functions');

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

module.exports = { login }