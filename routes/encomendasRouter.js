const { Router } = require('express');
const connection = require('../db');

const encomendasRoutes = Router();

const uuid=require('uuid');
console.log(uuid)

encomendasRoutes.post('/', async (req, res) => {
    
    const { id, companie_id } = req.body;
   

    try {
        const verificacao = await connection('companies').select('id').where('id', companie_id).first();


        if (!verificacao) {

            throw new MinhaExcessao(500, 'dado de empresa inexistente')
        }


        const insercaod = await connection('encomendas').insert({ id, companie_id,code:uuid.v4(),avaliable_at :new Date()});
        const buscacode=await connection('encomendas').select('code').where('id', insercaod)

        console.log(insercaod);


        console.log("olá");

        return res.status(200).json({ message: "tudo ok!", insercaod,buscacode});
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

encomendasRoutes.put('/criardatadeentrega/:companie_id', async (req, res) => {
    try {
        const { companie_id } = req.params;
        const verificacao = await connection('companies').select('id').where('id', companie_id).first()
      
        if (verificacao.length == 0) {

            throw new MinhaExcessao(500, 'erro interno no servidor')
        }
        const insercaod = await connection('encomendas').update(({ delivered_at :new Date()}));
        console.log(insercaod)
        return res.status(200).json({ message: "data de entrega feita", insercaod });
    } catch (error) {
        return res.status(error.status ? error.status : 500).send(error.message);
    }
})
encomendasRoutes.put('/criardisponibilidade/:companie_id', async (req, res) => {
    try {
        const { companie_id } = req.params;
        const verificacao = await connection('companies').select('id').where('id', companie_id).first()
      
        if (verificacao.length == 0) {

            throw new MinhaExcessao(500, 'erro interno no servidor')
        }
        const insercaod = await connection('encomendas').update(({ avaliable_at :new Date()}));
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

        const insercaod = await connection('encomendas').update(({ deleted_at :new Date()}));
        console.log(insercaod);
        console.log("deletado");
        res.json(insercaod);
    } catch (error) {
        return res.status(error.status ? error.status : 500).send(error.message);
    }

})
encomendasRoutes.get('/semdisponibilidade/:companie_id', async (req, res) => {
    try {
        const { companie_id } = req.params;
        const verificacao = await connection('companies').select('id').where('id', companie_id).first()
      
        if (companie_id==null) {

            throw new MinhaExcessao(500, 'erro interno no servidor')
        }
        const selecaod=await connection('encomendas').select('avaliable_at').where('id', companie_id).whereNull("avaliable_at")
        
            return res.status(204).json({ message: "data de entrega não disponivel", selecaod });

        
    } catch (error) {
        return res.status(error.status ? error.status : 500).send(error.message);
    }

})
encomendasRoutes.get('/entregapendente/:companie_id', async (req, res) => {
    try {
        const { companie_id } = req.params;
        const verificacao = await connection('companies').select('id').where('id', companie_id).first()
      
        if (companie_id == null) {

            throw new MinhaExcessao(500, 'erro interno no servidor')
        }
        const selecaod=await connection('encomendas').select('delivered_at').where('id', companie_id)
        if(selecaod.delivered_at==null){
            return res.status(200).json({ message: "entrega pendente", insercaod });

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