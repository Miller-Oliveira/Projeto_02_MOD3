const express = require("express");  //chamando o express
const app = express();  //definindo o app como express

require('dotenv').config();
const Conn = require("./model/conn/index"); //importando a conexao

app.use(express.json()); //definindo o JSON no projeto

Conn (); //executa a func de conexao

const port = 3000; //porta do node

app.get("/", (req, res) => {
    res.status(200).json({message: "API RODANDO"})
});

const paisRouter = require("./routers/pais.routes");
app.use("/pais", paisRouter);

const estadoRouter = require("./routers/estado.routes");
app.use("/estado", estadoRouter);

const cidadeRouter = require("./routers/cidade.routes");
app.use("/cidade", cidadeRouter);

app.listen(port, () => {
    console.log(`Servidor rodando em: http://localhost:${port}`);
});