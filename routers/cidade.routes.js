const express = require ('express');
const Cidade = require('../model/cidade');
const router = express.Router();
const Cidades = require("../model/cidade")

router.get("/", (req, res) => {
    res.status(200).json({message: 'Cidade OK'});
});

router.get("/listall", async (req, res) => {
    await Cidades.find({}).then((Cidade) => {
        console.log(Cidade);
        res.status(200).json(Cidade);
    }).catch((err) => {
        res.status(404).json({message:"Nada foi encontrado em Cidades"});
        console.error(err);
    });
});

router.get("/listname/:id", async (req, res) => {
    await Cidades.findOne({_id:req.params.id}).then((Cidade) =>{
        if (Cidade == null) {
            res.status(204).json({message: "Cidade não localizada."});
            return;
        };
        res.status(200).json((Cidade));
    }).catch((err) => {
        console.error(err);
    });
});

router.post("/add", async (req, res) => {

    if(!req.body.nome){
        res.status(404).json({message:"Nome da requisição cidade está vazia"});
        return;
    };
    if(!req.body.populacao){
        res.status(404).json({message: "Populacao da requisição cidade está vazia."});
        return;
    };

    await Cidades.create(req.body).then(() => {
        res.status(201).json({message: "Cidade cadastrada com sucesso!"})
    }).catch((err) => {
        res.status(400).json({message: "Erro ao criar Cidade"});
        console.error(err);
    });
});
router.put("/update/:id", async (req, res) => {

    if (req.params.id == null){
        res.status(404).json({message: "id não encontrado"})
        return;
    }else if (!req.body.nome){
        res.status(404).json({message: "Nome da cidade está vazio está vazio."})
        return;
    }else if (!req.body.populacao){
        res.status(404).json({message: "A populacao da cidade não foi informada."})
        return;
    }
    await Cidades.updateOne({_id:req.params.id}, req.body).then(() => {
        res.status(200).json({message: "Cidade atualizada com sucesso!"});
    }).catch((err) => {
        console.log(err);
        res.status(400).json({message: `Algo deu errado ao atualizar a cidade ${req.params.id}.`})
    })
    console.log(Cidade);

});
router.delete("/delete/:id", async (req, res) => {
    if( req.params.id.length == 24){
        await Cidades.deleteOne({_id:req.params.id}).then(() => {
            res.status(200).json({message: "Cidade deletada com sucesso."});
        }).catch((err) => {
            console.error(err);
            res.status(400).json({message: "algo deu errado ao deletar Cidade"});
        });
    }else{
        res.status(404).json({message: "id precisa ter 24 caracteres"});
    }
});
module.exports = router;            