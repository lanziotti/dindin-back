const knex = require('../database/connection');

const registerTransaction = async (req, res) => {
    const { user } = req;
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({mensagem: "Todos os campos são obrigatórios."});
    }

    if (tipo !== 'entrada' && tipo !== 'saida') {
        return res.status(400).json({mensagem: 'O tipo precisa ser: "entrada" ou "saida"'});
    }

    try {
        const categorie = await knex('categorias').where({id: categoria_id}).first();

        if (!categorie) {
            return res.status(404).json({mensagem: "A categoria não existe."});
        }

        const transactionUser = await knex('transacoes').insert({
            tipo,
            descricao,
            valor,
            data,
            usuario_id: user.id,
            categoria_id,
        }).returning(['id', 'tipo', 'descricao', 'valor', 'data', 'usuario_id', 'categoria_id']);

        const transaction = {...transactionUser[0], valor: Number(valor), categoria_nome: categorie.descricao};

        return res.status(201).json(transaction);

    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor."});
    }
}

module.exports = {
    registerTransaction
}