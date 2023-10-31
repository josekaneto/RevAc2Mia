const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/revAc2Mia',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS : 20000
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
    const cep = req.body.cep
    const nascimento = req.body.nascimento

    if(nome == null || email == null || endereco == null || numero ==  null || cep == null || nascimento == null){
        return res.status(400).json({error : "Preencha todos os campos coretamente"})
    }

    const emailExiste = await Pessoa.findOne({email:email})

    if(emailExiste){
        return res.status(400).json({error : "o Email cadastrado ja existe. Por favor insira um não cadastrado"})
    }

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

app.get("/cadastropessoa", async(req, res)=>{
    res.sendFile(__dirname + "/cadastropessoa.html")
})

app.get("/", async(req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})

