const db = require('./mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtsign = 'FirM4_3j3mpl0_T3xt0!';
const saltRounds = 10;

/* TOKEN FUNCTIONS*/

function signToken(information) {
    let token = jwt.sign(information, jwtsign);
    return token;
}

function verifyToken(token) {
    let verify = jwt.verify(token, jwtsign);
    return verify;
}

async function updateTokenLogin(id_user, token) {
    let data = await insupdelDb("UPDATE `users` SET `token`='" + token + "', updated_at = NOW() WHERE  `id`= " + id_user + " and deleted = 'N';");
    return data;
}

async function verifyTokenLogin(token) {
    let data = await selectDb("SELECT id FROM users WHERE token = '" + token + "' AND deleted = 'N';");
    return data;
}


/* ENCRYPT FUNCTIONS*/

function encryptPassLogin(passplain) {
    pass = bcrypt.hashSync(passplain, saltRounds);
    return pass;
}

function decryptPassLogin(passplain, encryptpass) {
    pass_status = bcrypt.compareSync(passplain, encryptpass, saltRounds);
    return pass_status;
}


/* DB FUNCTIONS*/
async function selectDb(queryp) {
    const data = await db.query(queryp, { type: db.QueryTypes.SELECT });
    return data;
}

async function insupdelDb(queryp) {
    const data = await db.query(queryp);
    return data;
}

module.exports = {
    updateTokenLogin,
    encryptPassLogin,
    decryptPassLogin,
    signToken,
    verifyToken,
    selectDb,
    insupdelDb,
    verifyTokenLogin
}