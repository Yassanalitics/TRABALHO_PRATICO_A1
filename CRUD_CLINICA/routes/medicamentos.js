const express = require('express')
const Router = express.Router

let MedicamentosList = [
    {
        id:1,
        nome:"Paracetamol",
        uso:"Analgésico e antitérmico (para dor leve e febre)",
        dosagem:"500 mg a 1 g por dose",
        periodo:"A cada 6–8 horas"
    },
    {
        id:2,
        nome:"Amoxicilina",
        uso:"Antibiótico para infecções bacterianas",
        dosagem:"500 mg por dose.",
        periodo:"A cada 8 horas por 7 a 10 dias (dependendo da infecção)"
    },
    {
        id:3,
        nome:"Dipirona (Metamizol)",
        uso:"Analgésico e antitérmico (dor e febre).",
        dosagem:"500 mg a 1 g por dose.",
        periodo:"A cada 6–8 horas, máximo 4 g/dia."
    },
    {
        id:4,
        nome:"Ibuprofeno",
        uso:"Anti-inflamatório, analgésico e antitérmico.",
        dosagem:"400 mg por dose",
        periodo:"A cada 6–8 horas, conforme necessidade, máximo 3.200 mg/dia."
    },
    {
        id:5,
        nome:"Omeprazol",
        uso:"Reduz acidez gástrica (tratamento de gastrite, refluxo, úlcera).",
        dosagem:"20 mg por dia.",
        periodo:"1 vez ao dia, geralmente antes do café da manhã, por 4 a 8 semanas."
    },
]
//get medicamentos
router.get('/medicamentos', (req, res, next) =>{
    res.json(MedicamentosList)
})
//get medicamentos/:id
router.get('/medicamentos/:id', (req,re,next)=>{
    const id = req.params.id
    const medicamento = MedicamentosList.find(medicamento => medicamento.id == id)
    if(!medicamento){
        return res.status(404).json({error:"Medicamento não encontrado."})
    }
res.json(medicamento)
})
//POST 
router.post("/medicamentos", (req, res,next)=>{
    const {nome,uso,dosagem,periodo} = req.body
    if(!nome || !uso ||!dosagem ||!periodo){
        return res.status(400).json({error: "Todos os campos são obrigatórios."})
    }
    const NovoMedicamento ={
        id: Date.now(),
        nome,
        uso,
        dosagem,
        periodo
    }
    MedicamentosList.push(NovoMedicamento)
    res.status(201).json({message:"Medicamento cadastrado."})
})
//Put
router.put('/medicamentos/:nome', (req,res)=> {
 const nome = (res.params.nome)
    const index = MedicamentosList.findIndex(p => p.nome === nome)
    if (index === -1) return res.status(404).json({ error: "Medicamento não encontrado." })

      //  const {nome,uso,dosagem,periodo} = req.body
    if(!nome || !uso ||!dosagem ||!periodo){
        return res.status(400).json({error: "Todos os campos são obrigatórios."})
    }
    const updated = {id, nome, uso, dosagem, periodo}
    MedicamentosList[index] = updated
    res.json(updated)
})
//DELETE
router.delete('/medicamentos/:nome', (req,res) =>{
    const nome = (req.params.nome)
    if(!nome) 
        return res.status(404).json({error: "Nome de medicamento invalido."})
    const index = MedicamentosList.findIndex(p => p.nome === nome)
    if (index === -1) return res.status(404).json({ error: 'Medicamento não encontrado.' })
    MedicamentosList.splice(index,1)
res.status(204).send()
})
module.exports=router