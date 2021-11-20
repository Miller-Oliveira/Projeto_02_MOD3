const express = require ('express');
const Pais = require('../model/pais');
const router = express.Router();
const Paises = require("../model/pais")

router.get("/", (req, res) => {
    res.status(200).json({message: 'País OK'});
});

router.get("/listall/", async (req, res) => {
    await Paises.find({}).then((Pais) => {
        console.log(Pais);
        res.status(200).json(Pais);
    }).catch((err) => {
        res.status(404).json({message:"Não foi encontrado"});
        console.error(err);
    });
});

router.get("/listname/:id", async (req, res) => {
    await Paises.findOne({_id:req.params.id}).then((Pais) =>{
        if (Pais == null) {
            res.status(204).json({message: "País não localizado."});
            return;
        }
        res.status(200).json(Pais);   
    }).catch((err) => {
        console.error(err);
    });
    
   
});

router.post("/add", async (req, res) => {

    if(!req.body.nome){
        res.status(404).json({message:"requisição está vazia"});
        return;
    };
    if(!req.body.populacao){
        res.status(404).json({message: "Populacao está vazia."});
        return;
    };
    if(!req.body.lingua){
        res.status(404).json({message: "lingua oficial está vazia"});
        return;
    };
    if(!req.body.pib){
        res.status(404).json({message: "PIB esta vazio."});
        return;
    };

    await Paises.create(req.body).then(() => {
        res.status(201).json({message: "País cadastrado com sucesso!"})
    }).catch((err) => {
        res.status(400).json({message: "Erro ao criar Pais"});
        console.error(err);
    });
});

router.put("/update/:id", async (req, res) => {

    if (req.params.id == null){
        res.status(404).json({message: "id não encontrado"})
        return;
    }else if (!req.body.nome){
        res.status(404).json({message: "Nome está vazio."})
        return;
    }else if (!req.body.populacao){
        res.status(404).json({message:"População não informada."})
        return;
    }else if (!req.body.lingua){
        res.status(404).json({message: "A lingua oficial não foi informada."})
        return;
    }else if (!req.body.pib){
        res.status(404).json({message: "O PIB não foi informado."})
        return;
    }

    await Paises.updateOne({_id:req.params.id}, req.body).then(() => {
        res.status(200).json({message: "País atualizado com sucesso!"});
    }).catch((err) => {
        console.error(err);
        res.status(400).json({message: "Erro ao atualizar o País."})
    })
    console.log(Pais);

});

router.delete("/delete/:id", async (req, res) => {
    if( req.params.id.length == 24){
        await Paises.deleteOne({_id:req.params.id}).then(() => {
            res.status(200).json({message: "país deletado com sucesso."});
        }).catch((err) => {
            console.error(err);
            res.status(400).json({message: "erro ao deletar País"});
        });
    }else{
        res.status(404).json({message: "id incorreto"});
    }
});

module.exports = router;            