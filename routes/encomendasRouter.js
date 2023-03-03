const { Router } = require('express');
const connection = require('../db');

const encomendasRoutes = Router();

const uuid = require('uuid');
console.log(uuid)

encomendasRoutes.post('/', async (req, res) => {

    const { user_id, companie_id } = req.body;

    const uidcode = uuid.v4();
    try {
        const verificacao = await connection('companies').select('id').where('id', companie_id).first();


        if (!verificacao) {

            throw new MinhaExcessao(500, 'dado de empresa inexistente')
        }


        const insercaod = await connection('encomendas').insert({ user_id, companie_id, code: uidcode, avaliable_at: new Date() });
        const buscacode = await connection('encomendas').select('code').where('id', insercaod)
        console.log(uidcode);
        console.log(buscacode)


        console.log(insercaod);


        console.log("olá");

        return res.status(200).json({ message: "tudo ok!", insercaod, buscacode });
    } catch (error) {
        console.log(JSON.stringify(error))

        return res.status(error.status ? error.status : 500).send(error.message);


    }

})

encomendasRoutes.get('/:companie_id/disponiveis', async (req, res) => {
    try {
        const { companie_id } = req.params;

        const selecao = await connection('encomendas').select('*').where('companie_id', companie_id).whereNotNull('avaliable_at');
        console.log(selecao)
        if (selecao.length == 0) {

            throw new MinhaExcessao(500, 'nenhum conteudo')
        }

        return res.status(200).json({ message: "disponiveis:", selecao });
    } catch (error) {
        return res.status(error.status ? error.status : 500).send(error.message);
    }
})
encomendasRoutes.get('/entregues/:companie_id', async (req, res) => {
    {
        try {
            const { companie_id } = req.params;


            const selecao = await connection('encomendas').select('*').where('companie_id', companie_id).whereNotNull('delivered_at');
            console.log(selecao)
            if (selecao.length == 0) {

                throw new MinhaExcessao(404, 'NOT FOUND')
            }

            return res.status(200).json({ message: "código de encomenda achado!está disponivel", selecao });
        } catch (error) {
            return res.status(error.status ? error.status : 404).send(error.message);
        }



    }
})

encomendasRoutes.put('/criardatadeentrega/:companie_id/:date?', async (req, res) => {
    try {
        const { companie_id, date } = req.params;
        const verificacao = await connection('companies').select('id').where('id', companie_id).first()

        if (verificacao.length == 0) {

            throw new MinhaExcessao(500, 'erro interno no servidor')
        }

        if (new Date(date) > new Date()) {
            throw new MinhaExcessao(500, 'erro interno no servidor na parte de data')
        }

        const realDate = date ?
            new Date(date) :
            new Date();

        if (isNaN(realDate.getTime())) {
            throw new MinhaExcessao(400, 'a data não é valida')
        }




        const insercaod = await connection('encomendas').update(({ delivered_at: realDate })).where('companie_id', companie_id);
        console.log(insercaod)
        return res.status(200).json({ message: "data de entrega feita", insercaod });
    } catch (error) {
        return res.status(error.status ? error.status : 500).send(error.message);
    }
})
encomendasRoutes.put('/criardisponibilidade/:companie_id/:date?', async (req, res) => {
    try {
        const { companie_id, date } = req.params;
        const verificacao = await connection('companies').select('id').where('id', companie_id).first()

        if (verificacao.length == 0) {

            throw new MinhaExcessao(500, 'erro interno no servidor')
        }
        if (new Date(date) > new Date()) {
            throw new MinhaExcessao(500, 'erro interno no servidor na parte de data')
        }

        const realDate = date ?
            new Date(date) :
            new Date();

        if (isNaN(realDate.getTime())) {
            throw new MinhaExcessao(400, 'a data não é valida')
        }

        const insercaod = await connection('encomendas').update(({ avaliable_at: realDate })).where('companie_id', companie_id);
        console.log(insercaod)
        return res.status(200).json({ message: "data de disponibilidade feita", insercaod });
    } catch (error) {
        return res.status(error.status ? error.status : 500).send(error.message);
    }
})
encomendasRoutes.delete('/delete/:id', async (req, res) => {
    try {
        const { companie_id } = req.params;
        const verificacao = await connection('companies').select('id').where('id', companie_id).first()

        if (verificacao.length == 0) {

            throw new MinhaExcessao(500, 'erro interno no servidor')
        }

        const insercaod = await connection('encomendas').update(({ deleted_at: new Date() }));
        console.log(insercaod);
        console.log("deletado");
        res.json(insercaod);
    } catch (error) {
        return res.status(error.status ? error.status : 500).send(error.message);
    }

})
encomendasRoutes.get('/semdisponibilidade/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (id == null) {

            throw new MinhaExcessao(500, 'erro interno no servidor')
        }
        const selecaod = await connection('encomendas').select('avaliable_at').where('id', id)
        console.log(selecaod)
        if (selecaod.avaliable_at != null) {
            return res.status(200).json({ message: "objeto disponivel", selecaod });

        }
        else {
            return res.status(200).json({ message: "data de entrega não disponivel,crie uma solicitação!", selecaod })
        }


    } catch (error) {
        return res.status(error.status ? error.status : 500).send(error.message);
    }

})
encomendasRoutes.put('/criardisponibilidade/:id/:date', async (req, res) => {
    try {
        const { id, date } = req.params;

        const verificacao = await connection('encomendas').select('id').where('id', id).first()

        if (verificacao.length == 0) {

            throw new MinhaExcessao(500, 'erro interno no servidor')
        }
        if (new Date(date) > new Date()) {
            throw new MinhaExcessao(500, 'erro interno no servidor na parte de data')
        }
        const insercaod = await connection('encomendas').update(({ avaliable_at: new Date(date) })).where("id", id);
        console.log(insercaod)
        return res.status(200).json({ message: "data de disponibilidade feita", insercaod });
    } catch (error) {
        return res.status(error.status ? error.status : 500).send(error.message);
    }
})
encomendasRoutes.put('/criardatadeentrega/:id/:date', async (req, res) => {
    try {
        const { id, date } = req.params;

        const verificacao = await connection('encomendas').select('id').where('id', id).first()

        if (verificacao.length == 0) {

            throw new MinhaExcessao(500, 'erro interno no servidor')
        }
        if (new Date(date) > new Date()) {
            throw new MinhaExcessao(422, 'a data inserida não é válida')
        }
        const insercaod = await connection('encomendas').update(({ delivered_at: new Date(date) })).where("id", id);
        console.log(insercaod)
        return res.status(200).json({ message: "data de entrega feita", insercaod });
    } catch (error) {
        return res.status(error.status ? error.status : 500).send(error.message);
    }
})

encomendasRoutes.get('/entregapendente/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (id == null) {

            throw new MinhaExcessao(500, 'erro interno no servidor')
        }
        const selecaod = await connection('encomendas').select('delivered_at').where('id', id)
        console.log(selecaod)
        if (selecaod.delivered_at != null) {
            return res.status(200).json({ message: "objeto disponivel", selecaod });

        }
        else {
            return res.status(200).json({ message: "data de entrega não disponivel", selecaod })
        }


    } catch (error) {
        return res.status(error.status ? error.status : 500).send(error.message);
    }


})
function MinhaExcessao(status, message) {
    this.status = status;
    this.message = message;
}


module.exports = encomendasRoutes;