const express = require('express')
const router = express.Router()

let listaConsultas = [
  {
    id: 1,
    paciente: "João Silva",
    medico: "Davi Melo",
    data: "2023-10-15",
    horario: "10:00",
    diagnostico: "Hipertensão controlada"
  },
  {
    id: 2,
    paciente: "Maria Oliveira",
    medico: "Yasmin Silva",
    data: "2023-10-16",
    horario: "14:30",
    diagnostico: "Dor de Cabeça"
  },
  {
    id: 3,
    paciente: "Pedro Santos",
    medico: "Ygor Farias",
    data: "2023-10-17",
    horario: "11:00",
    diagnostico: "Fratura no braço tratada"
  },
  {
    id: 4,
    paciente: "Ana Costa",
    medico: "Alex Ariel",
    data: "2023-10-18",
    horario: "15:45",
    diagnostico: "Infecção urinária diagnosticada"
  },
  {
    id: 5,
    paciente: "Lucas Ferreira",
    medico: "Karol Silva",
    data: "2023-10-19",
    horario: "09:30",
    diagnostico: "Ansiedade moderada, prescrição de terapia"
  }
]

router.get('/consultas', (req, res) => {
  res.json(listaConsultas)
})
router.get("/consultas/:id", (req, res) => {
  const consulta = consultas.find(p => p.id === parseInt(req.params.id));
  if (!consulta) {
    return res.status(404).json({ error: "Consulta não encontrada." });
  }
  res.json(consulta);
});
router.get("/consultas/:paciente", (req, res) => {
  const consulta = consultas.find(p => p.paciente === parseInt(req.params.paciente));
  if (!consulta) {
    return res.status(404).json({ error: "consulta não encontrada" });
  }
  res.json(consulta);
});

router.post('/consultas', (req, res) => {
  const { paciente, medico, data, horario, diagnostico } = req.body

  if (!paciente || !medico || !data || !horario || !diagnostico) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" })
  }

  // Verificação simples de duplicata (mesmo médico, data e horário)
  if (listaConsultas.some(c => c.medico === medico && c.data === data && c.horario === horario)) {
    return res.status(409).json({ error: "Consulta já agendada para este médico, data e horário!" })
  }

  const novaConsulta = {
    id: Date.now(),
    paciente,
    medico,
    data,
    horario,
    diagnostico
  }

  listaConsultas.push(novaConsulta)
  res.status(201).json({ message: "Consulta cadastrada com sucesso!", novaConsulta })
})

router.put('/consultas/:id', (req, res) => {
  const id = req.params.id
  const consulta = listaConsultas.find(c => c.id == id)

  if (!consulta) {
    return res.status(404).json({ error: "Consulta não encontrada!" })
  }

  const { paciente, medico, data, horario, diagnostico } = req.body
  if (!paciente || !medico || !data || !horario || !diagnostico) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" })
  }

  // Verificação de duplicata após atualização (excluindo a própria consulta)
  if (listaConsultas.some(c => c.id != id && c.medico === medico && c.data === data && c.horario === horario)) {
    return res.status(409).json({ error: "Já existe outra consulta para este médico, data e horário!" })
  }

  consulta.paciente = paciente
  consulta.medico = medico
  consulta.data = data
  consulta.horario = horario
  consulta.diagnostico = diagnostico

  res.json({ message: "Consulta atualizada com sucesso!", consulta })
})

router.delete('/consultas/:id', (req, res) => {
  const id = req.params.id
  const consulta = listaConsultas.find(c => c.id == id)

  if (!consulta) {
    return res.status(404).json({ error: "Consulta não encontrada!" })
  }

  listaConsultas = listaConsultas.filter(c => c.id != id)
  res.json({ message: "Consulta excluída com sucesso!" })
})

module.exports = router
