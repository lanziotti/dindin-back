const knex = require('../database/connection');
const bcrypt = require('bcrypt');

const userRegistration = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({mensagem: "Todos os campos são obrigatórios!"});
    }

    try {
        const user = await knex('usuarios').where({email}).first();

        if (user) {
            return res.status(400).json({mensagem: "Já existe usuário cadastrado com o e-mail informado."});
        }

        const encryptedPassword = await bcrypt.hash(senha, 10);

        const registeredUser = await knex('usuarios').insert({
            nome,
            email,
            senha: encryptedPassword
        }).returning(['id', 'nome', 'email']);

        if (!registeredUser[0]) {
            return res.status(500).json({mensagem: "Erro interno do servidor."});
        }

        return res.status(201).json(registeredUser[0]);

    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."});
    }
}

module.exports = {
    userRegistration
}