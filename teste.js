const forn = require('./fornecedores.json')

let num = [{
    id: 1218
},
{
    id: 252
}
]

num.map((item)=>{
    for(forns of forn){
        if(item.id == forns.id){
            item.name = forns.nome
        }
    }
})
console.log(num)