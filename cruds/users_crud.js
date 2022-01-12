const fun = require('../utils/functions');


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


module.exports = { usersCreate }