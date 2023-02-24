const { Router } = require('express');
const express = require('express');

const connection = require('./db');
const encomendasRoutes = require('./routes/encomendasRouter');
const routes = express.Router();
const validacnpj = require('./utilitarios');
const validacpf = require('./utilitarios');


routes.post('/users', async (req, res) => {
    const { name, cpf, phone, sobrenome } = req.body;
    try {
        const pesquisa = await connection('users').select("*").where('cpf', cpf).first()
        if (validacpf.TestaCPF(cpf) == false) {
            return res.status(401).json({ message: "erro 400" });
        }

        if (pesquisa) {
            return res.status(409).json({ message: "erro 409" });
        }
        const insercao = await connection('users').insert({ name, cpf, phone, sobrenome });

        console.log(insercao);


        console.log("olá");

        res.json({ insercao });
    } catch (err) {
        console.log("erro", err);
    }

});
routes.get('/users', async (req, res) => {
    try {
        const selecao = await connection('users').select('*');
        console.log(selecao);
        console.log('aqui está');
        res.json(selecao);
    } catch (err) {
        console.log("selecao errada")
    }

})
routes.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, cpf, phone, sobrenome } = req.body;
        const selecao = await connection('users').select(name, cpf, phone, sobrenome).where('id', id);
        console.log(selecao);
        console.log('é essa tabela que você queria?');
        res.json(selecao);
    } catch (err) {
        console.log("selecao errada");
    }

})
routes.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, cpf, phone, sobrenome } = req.body;
        const update = await connection('users').where('id', id).update({ name, cpf, phone, sobrenome });
        console.log(update);
        console.log("update feito");
        res.json(update);

    } catch (err) {
        console.log(err);
        console.log('update falhou');

    }
})
routes.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;


        const del = await connection('users').where('id', id).del();
        console.log(del);
        console.log("deletado");
        res.json(del);
    } catch (err) {
        console.log("falha na remoção ")
    }

})
routes.post('/dispatch', async (req, res) => {
    const { type, subtype, area, dispatchgroup, user_id } = req.body
    try {
        const verificacao = await connection('users').select('id').where('id', user_id).first()
        const pesquisa = await connection('dispatch').select('dispatchgroup').where('dispatchgroup', dispatchgroup);
        if (pesquisa) {
            throw new Error("nome de grupo já inserido");
        }

        const insercaod = await connection('dispatch').insert({ type, subtype, area, dispatchgroup, user_id });

        console.log(verificacao);
        console.log(insercaod);


        console.log("olá");

        res.json({ insercaod });
    } catch (error) {
        return res.status(409).json("conflito de grupos");

    }

})
routes.get('/dispatch/', async (req, res) => {
    try {

        const selecaod = await connection('dispatch').select('*');

        console.log(selecaod);


        console.log("olá");

        res.json({ selecaod });
    } catch (err) {
        console.log("erro", err);
    }

})
routes.get('/dispatch/:id', async (req, res) => {
    const { id } = req.params

    try {

        const selecaod = await connection('dispatch')
            .join('users', 'dispatch.user_id', 'users.id')
            .select('*')
            .where('dispatch.id', id);

        console.log(selecaod);


        console.log("olá mundo e luis");

        res.json({ selecaod });
    } catch (err) {
        console.log("erro", err);
    }

})
routes.put('/dispatch/:id', async (req, res) => {
    const { id } = req.params;
    const { type, subtype, area, dispatchgroup } = req.body;
    try {

        console.log(id)
        const update = await connection('dispatch').update({ type, subtype, area, dispatchgroup }).where('id', id);
        console.log(update);
        console.log("update feito");
        res.json(update);


    } catch (err) {
        console.log(err);
        console.log('update falhou');

    }
})
routes.delete('/dispatch/:id', async (req, res) => {
    try {
        const { id } = req.params;


        const del = await connection('dispatch').where('id', id).del();
        console.log(del);
        console.log("deletado");
        res.json(del);
    } catch (err) {
        console.log("falha na remoção ")
    }

})

routes.get('/dispatch/test', async (req, res) => {
    const { id } = req.params
    const { type, subtype, area, dispatchgroup, user_id } = req.body
    try {
        const teste = 'test'

        res.json(teste);
    } catch (err) {
        console.log("erro", err);
    }

})
routes.post('/companies', async (req, res) => {
    const { title, sector, cnpj } = req.body;
    try {
        const pesquisa = await connection('companies').select("*").where('cnpj', cnpj).first()
        if (validacnpj.validarCNPJ(cnpj) == false) {
            return res.status(401).json({ message: "erro 400" });
        }

        if (pesquisa) {
            return res.status(409).json({ message: "erro 409" });
        }
        const insercao = await connection('companies').where(validacnpj.validarCNPJ(cnpj)).insert({ title, sector, cnpj });
        console.log(validacnpj.validarCNPJ(cnpj))
        console.log(pesquisa);
        console.log("olá");


        return res.status(200).json({ message: "tudo ok!" });

        // console.log(insercao);



    } catch (err) {
        return res.status(500).json({ message: "opa!estamos com problemas técnicos!" });
    }


})
routes.get('/companies', async (req, res) => {
    try {
        const selecao = await connection('companies').select('*');
        console.log(selecao);
        console.log('aqui está');
        res.json(selecao);
    } catch (err) {
        console.log("selecao errada")
    }

})
routes.get('/companies:/id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, sector, cnpj } = req.body;
        const selecao = await connection('companies').select(title, sector, cnpj).where('id', id);
        console.log(selecao);
        console.log('é essa tabela que você queria?');
        res.json(selecao);
    } catch (err) {
        console.log("selecao errada");
    }

})
routes.put('/companies/:id', async (req, res) => {
    const { id } = req.params;
    const { title, sector, cnpj } = req.body;
    try {

        console.log(id)
        const update = await connection('companies').update({ title, sector, cnpj }).where('id', id);
        console.log(update);
        console.log("update feito");
        res.json(update);


    } catch (err) {
        console.log(err);
        console.log('update falhou');

    }
})
routes.delete('/companies/:id', async (req, res) => {
    try {
        const { id } = req.params;


        const del = await connection('companies').where('id', id).del();
        console.log(del);
        console.log("deletado");
        res.json(del);
    } catch (err) {
        console.log("falha na remoção ")
    }

})
routes.use('/encomendas', encomendasRoutes)
function MinhaExcessao(status, message) {
    this.status = status;
    this.message = message;
}



module.exports = routes;

