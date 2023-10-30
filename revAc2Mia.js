const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/teste',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
    //serverSelectiontTimeoutMS: 30000
})

const PessoaSchema =  new mongoose.Schema({
    nome : {type : String},
    email : {type : String, reuqired : true},
    endereco : {type : String},
    numero : {type : Number},
    cep : {type : String, reuqired : true},
    nascimento : {type : Date, reuqired : true}
})

const Pessoa = mongoose.model("Pessoa", PessoaSchema)

app.post("/cadastropessoa", async(req, res) => {
    const nome = req.body.nome
    const email = req.body.email
    const endereco = req.body.endereco
    const numero = req.body.numero
    const cep = req.body.ce
    const nascimento = req.body.nascimento

    const pessoa = new Pessoa({
        nome : nome,
        email : email,
        endereco : endereco,
        numero : numero,
        cep : cep,
        nascimento : nascimento

    })

    try{
        const newPessoa = await pessoa.save()

        res.json({error: null, msg : "Cadastro ok", pessoaId : newPessoa._id})
    }
    catch(error){
        res.status(400).json({error})
    }

})

app.get("/", async(req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})