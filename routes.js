const express = require('express')
const router = express.Router()
const axios = require('axios')
const fornecedores = require('./fornecedores.json')
axios.defaults.withCredentials = true

const baseUrl = 'https://supermercadoosarina.varejofacil.com/api'


router.get('/', function(req, res){
    res.json({string: "hello world"})
})

router.post('/login', async function(req, res){
    let user = req.body
    console.log(user)
    let {data, status} = await axios.post(`${baseUrl}/auth`, user)
    let token = data.accessToken
    if(status == 200){
        res.cookie('auth', token)
        return res.json({status})
    }else{
        return res.send("Usuario invalido")
    }
})

router.post('/logout', async function(req, res){
    res.cookie('auth', null)
    res.json({messege: "Token invalidado com sucesso"})
})



router.get('/produto/:id', async function(req, res){
    let token = req.cookies.auth
    token.toString()
    let {id} = req.params
    let {data} = await axios.get(`${baseUrl}/v1/produto/produtos/consulta/${id}`, {headers:{ 'Authorization': token}})
    let produto = {
        id: data.id,
        descricao: data.descricao,
        ean: id
    }
  /*   let auxCode = await axios.get(`${baseUrl}/v1/produto/produtos/${produto.id}/codigos-auxiliares`, {headers:{ 'Authorization': token}})
    if(auxCode.total !=0){
    for(cod of auxCode.data.items){
        if(cod.eanTributado == true){
            produto.ean = cod.id
        }
    }}else{
        produto.ean = produto.id
    } */
    providers = []
    let getProvider = await axios.get(`${baseUrl}/v1/produto/produtos/${produto.id}/fornecedores`, {headers:{ 'Authorization': token}})
    getProvider.data.items.map(item => providers.push({id: item.fornecedorId, nivel: item.nivel}))

   /* for(fornecedor of providers){
        if(fornecedor.id == fornecedores.id){
            fornecedor.descricao = fornecedores.descricao
        }
    }  

    for(let i = 0; i < providers.length; i++){
        if(providers[i].id == fornecedores.id){
            providers[i].descricao == fornecedores.descricao
        }
    }*/

    providers.map((item)=>{
        for(fornecedor of fornecedores){
            if(item.id == fornecedor.id){
                item.descricao = fornecedor.nome
            }
        }
    })

    produto.fornecedor = providers
    return res.json(produto)
})

module.exports = router