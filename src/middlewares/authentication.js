require('dotenv').config();
const knex = require('../database/connection');
const jwt = require('jsonwebtoken');

const authenticationFilter = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: "Não autorizado." });
    }

    try {
        const token = authorization.replace('Bearer', '').trim();

        const { id } = jwt.verify(token, process.env.HASH_JWT);

        const user = await knex('usuarios').where({ id });

        if (!user[0]) {
            return res.status(401).json({ mensagem: "Não autorizado." });
        }

        const { senha: _, ...userData } = user[0];

        req.user = userData;

        next();

    } catch (error) {
        return res.status(401).json({"mensagem": "Não autorizado."});
    }
}

module.exports = {
    authenticationFilter
}