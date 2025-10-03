const express = require('express')
const router = express.Router()

let listaMedicos = [
  {
    id: 1,
    nome: "Davi Melo",
    especialidade: "Cardiologia",
    crm: "123456",
    horarioAtendimento: "Seg-Sex 08:00 - 12:00"
  },
  {
    id: 2,
    nome: "Yasmin Silva",
    especialidade: "Oftamologista",
    crm: "234567",
    horarioAtendimento: "Seg-Sex 13:00 - 17:00"
  },
  {
    id: 3,
    nome: "Ygor Farias",
    especialidade: "Ortopedia",
    crm: "345678",
    horarioAtendimento: "Ter-Qua 09:00 - 15:00"
  },
  {
    id: 4,
    nome: "Alex Ariel",
    especialidade: "Urologista",
    crm: "456789",
    horarioAtendimento: "Seg-Qua-Sex 14:00 - 19:00"
  },
  {
    id: 5,
    nome: "Karol  Silva",
    especialidade: "Psiquiatra",
    crm: "567890",
    horarioAtendimento: "Qui-Sex 08:00 - 16:00"
  }
]

router.get('/medicos', (req, res) => {
  res.json(listaMedicos)
})

router.get('/medicos/id/:id', (req, res) => {
  const id = req.params.id
  const medico = listaMedicos.find(m => m.id == id)
  if (!medico) {
    return res.status(404).json({ error: "Médico não encontrado!" })
  }
  res.json(medico)
})
router.get("/medicos/nome/:nome", (req, res) => {
  const nome = req.params.nome.toLowerCase();
  const medico = listaMedicos.find(m => m.nome.toLowerCase().includes(nome));

  if (!medico) {
    return res.status(404).json({ error: "Médico não encontrado" });
  }

  res.json(medico);
});

router.post('/medicos', (req, res) => {
  const { nome, especialidade, crm, horarioAtendimento } = req.body

  if (!nome || !especialidade || !crm || !horarioAtendimento) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" })
  }

  if (listaMedicos.some(m => m.crm == crm)) {
    return res.status(409).json({ error: "CRM já cadastrado!" })
  }

  const novoMedico = {
    id: Date.now(),
    nome,
    especialidade,
    crm,
    horarioAtendimento
  }

  listaMedicos.push(novoMedico)
  res.status(201).json({ message: "Médico cadastrado com sucesso!", novoMedico })
})

router.put('/medicos/id/:id', (req, res) => {
  const id = req.params.id
  const medico = listaMedicos.find(m => m.id == id)

  if (!medico) {
    return res.status(404).json({ error: "Médico não encontrado!" })
  }

  const { nome, especialidade, horarioAtendimento } = req.body
  if (!nome || !especialidade || !horarioAtendimento) {
    return res.status(400).json({ error: "nome, especialidade e horário de atendimento são obrigatórios!" })
  }

  medico.nome = nome
  medico.especialidade = especialidade
  medico.horarioAtendimento = horarioAtendimento

  res.json({ message: "Médico atualizado com sucesso!", medico })
})

router.delete('/medicos/id/:id', (req, res) => {
  const id = req.params.id
  const medico = listaMedicos.find(m => m.id == id)

  if (!medico) {
    return res.status(404).json({ error: "Médico não encontrado!" })
  }

  listaMedicos = listaMedicos.filter(m => m.id != id)
  res.json({ message: "Médico excluído com sucesso!" })
})

module.exports = router

