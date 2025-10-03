const express = require('express'); 
const router = express.Router();

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

// GET todos medicamentos
router.get('/medicamentos', (req, res) =>{
    res.json(MedicamentosList)
})

// GET por id
router.get('/medicamentos/id/:id', (req,res)=>{
    const id = parseInt(req.params.id)
    const medicamento = MedicamentosList.find(m => m.id === id)
    if(!medicamento){
        return res.status(404).json({error:"Medicamento não encontrado."})
    }
    res.json(medicamento)
})

// GET por nome
router.get("/medicamentos/nome/:nome", (req, res) => {
    const nome = req.params.nome.toLowerCase();
    const medicamento = MedicamentosList.find(p => p.nome.toLowerCase().includes(nome));
    if (!medicamento) {
        return res.status(404).json({ error: "Medicamento não encontrado" });
    }
    res.json(medicamento);
});

// POST
router.post("/medicamentos", (req, res)=>{
    const {nome,uso,dosagem,periodo} = req.body
    if(!nome || !uso ||!dosagem ||!periodo){
        return res.status(400).json({error: "Todos os campos são obrigatórios."})
    }
    const novoID = MedicamentosList.length ? MedicamentosList[MedicamentosList.length - 1].id + 1 : 1;
    const NovoMedicamento = { id: novoID, nome, uso, dosagem, periodo }
    MedicamentosList.push(NovoMedicamento)
    res.status(201).json({message:"Medicamento cadastrado.", NovoMedicamento})
})

// PUT por nome
router.put('/medicamentos/nome/:nome', (req,res)=> {
    const nome = req.params.nome
    const index = MedicamentosList.findIndex(p => p.nome.toLowerCase() === nome.toLowerCase())
    if (index === -1) return res.status(404).json({ error: "Medicamento não encontrado." })

    const { uso, dosagem, periodo } = req.body
    if(!req.body.nome || !uso ||!dosagem ||!periodo){
        return res.status(400).json({error: "Todos os campos são obrigatórios."})
    }
    
    MedicamentosList[index] = { 
        id: MedicamentosList[index].id, 
        nome: req.body.nome, 
        uso, 
        dosagem, 
        periodo 
    }
    res.json({message: "Medicamento atualizado.", Medicamento: MedicamentosList[index]})
})

// DELETE por nome
router.delete('/medicamentos/nome/:nome', (req,res) =>{
    const nome = req.params.nome
    const index = MedicamentosList.findIndex(p => p.nome.toLowerCase() === nome.toLowerCase())
    if (index === -1) return res.status(404).json({ error: 'Medicamento não encontrado.' })
    
    const removido = MedicamentosList.splice(index,1)
    res.json({message: `Medicamento '${removido[0].nome}' deletado com sucesso.`})
})

module.exports = router
