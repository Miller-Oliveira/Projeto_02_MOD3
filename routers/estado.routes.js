const express = require ('express');
const Estado = require('../model/estado');
const router = express.Router();
const Estados = require("../model/estado")

router.get("/", (req, res) => {
    res.status(200).json({message: 'Estado OK'});
});

router.get("/listall", async (req, res) => {
    await Estados.find({}).then((Estado) => {
        console.log(Estado);
        res.status(200).json(Estado);
    }).catch((err) => {
        res.status(404).json({message:"Nada foi encontrado em Estados"});
        console.error(err);
    });
});

router.get("/listname/:id", async (req, res) => {
    await Estados.findOne({_id:req.params.id}).then((Estado) =>{
        if (Estado == null) {
            res.status(204).json({message: "Estado não encontrado."});
            return;
        };
        res.status(200).json((Estado));
    }).catch((err) => {
        console.error(err);
    });
});

router.post("/add", async (req, res) => {

    if(!req.body.nome){
        res.status(404).json({message:"Nome da requisição estado está vazia"});
        return;
    };
    if(!req.body.regiao){
        res.status(404).json({message: "Regiao da requisição estado está vazia."});
        return;
    };
    if(!req.body.populacao){
        res.status(404).json({message: "Populacao da requisição estado está vazia."});
        return;
    };
      await Estados.create(req.body).then(() => {
        res.status(201).json({message: "Estado cadastrado com sucesso!"})
    }).catch((err) => {
        res.status(400).json({message: "Erro ao criar Estado"});
        console.error(err);
    });
});

router.put("/update/:id", async (req, res) => {

    if (req.params.id == null){
        res.status(404).json({message: "id não encontrado"})
        return;
    }else if (!req.body.nome){
        res.status(404).json({message: "Nome do estado está vazio está vazio."})
        return;
    }else if (!req.body.regiao){
        res.status(404).json({message:"Regiao do estado não informado."})
        return;
    }else if (!req.body.populacao){
        res.status(404).json({message: "A populacao do estado não foi informada."})
        return;   
     }

    await Estados.updateOne({_id:req.params.id}, req.body).then(() => {
        res.status(200).json({message: "Estado atualizado com sucesso!"});
    }).catch((err) => {
        console.log(err);
        res.status(400).json({message: "Algo deu errado ao atualizar o Estado."})
    })
    console.log(Estado);
});
router.delete("/delete/:id", async (req, res) => {
    if( req.params.id.length == 24){
        await Estados.deleteOne({_id:req.params.id}).then(() => {
            res.status(200).json({message: "Estado deletado com sucesso."});
        }).catch((err) => {
            console.error(err);
            res.status(400).json({message: "algo deu errado ao deletar Estado"});
        });
    }else{
        res.status(404).json({message: "id precisa ter 24 caracteres"});
    }
});
module.exports = router;            