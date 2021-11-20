const mongoose = require("mongoose");

const paisModel = new mongoose.Schema({ 
    nome: { type: String, required: true },
    populacao: { type: String, required: true },
    lingua: { type: String, required: true },
    pib: { type: String, required: true },
    dataCriacao: { type: Date, default: Date.now }
});

const Pais = mongoose.model("Pais", paisModel);

module.exports = Pais;