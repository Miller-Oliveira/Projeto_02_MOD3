const mongoose = require("mongoose");

const cidadeModel = new mongoose.Schema({ 
    nome: { type: String, required: true },
    populacao: { type: String, required: true },
    dataCriacao: { type: Date, default: Date.now }
});

const Cidade = mongoose.model("Cidades", cidadeModel);

module.exports = Cidade;




