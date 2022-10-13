require('dotenv').config();
const knex = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: "E-mail e senha obrigatórios." });
    }

  try {
    const user = await knex('usuarios').where({ email }).first();

    if (!user) {
        return res.status(404).json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }

    const correctPassword = await bcrypt.compare(senha, user.senha);

    if (!correctPassword) {
        return res.status(404).json({ mensagem: "Usuário e/ou senha inválido(s)." });
    }

    const hashJwt = await bcrypt.hash(process.env.HASH_JWT, 10);

    const token = jwt.sign({ id: user.id }, hashJwt, { expiresIn: '8h' });

    const {senha: _, ...userData} = user;

    return res.json({
        usuario: userData,
        token
    });
    
  } catch (error) {
    return res.status(500).json({mensagem: "Erro interno do servidor."});
  }
}

module.exports = {
    login
}