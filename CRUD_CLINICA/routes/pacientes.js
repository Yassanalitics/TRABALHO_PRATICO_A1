const express = require("express");
const router = express.Router();

// Lista fixa de pacientes
let pacientes = [
  {
    id: 1,
    nome: "Gustavo Clay",
    CPF: "123.456.789-00",
    telefone: "(11) 98765-4321",
    historicoMedico: "Hipertensão controlada, acompanhamento cardiológico."
  },
  {
    id: 2,
    nome: "Taylor Swift",
    CPF: "987.654.321-11",
    telefone: "(21) 91234-5678",
    historicoMedico: "Transtorno de ansiedade, em acompanhamento psiquiátrico."
  },
  {
    id: 3,
    nome: "Mariana Oliveira Santos",
    CPF: "456.789.123-22",
    telefone: "(31) 99876-5432",
    historicoMedico: "Cálculos renais, em acompanhamento com urologia."
  },
  {
    id: 4,
    nome: "João Pedro Almeida",
    CPF: "321.654.987-33",
    telefone: "(41) 93456-7890",
    historicoMedico: "Histórico de fratura no fêmur, sem complicações recentes."
  },
  {
    id: 5,
    nome: "Bruno Henrique",
    CPF: "159.753.486-44",
    telefone: "(51) 97654-3210",
    historicoMedico: "Catarata, em acompanhamento dermatológico."
  }
];

// GET — retorna todos os pacientes
router.get("/pacientes", (req, res) => {
  res.json(pacientes);
});

// GET — retorna um paciente por ID
router.get("/pacientes/:id", (req, res) => {
  const paciente = pacientes.find(p => p.id === parseInt(req.params.id));
  if (!paciente) {
    return res.status(404).json({ error: "Paciente não encontrado" });
  }
  res.json(paciente);
});

// POST — adiciona novo paciente
router.post("/pacientes", (req, res) => {
  const novoPaciente = {
    id: pacientes.length ? pacientes[pacientes.length - 1].id + 1 : 1,
    ...req.body
  };
  pacientes.push(novoPaciente);
  res.status(201).json(novoPaciente);
});

// PUT — atualiza paciente existente
router.put("/pacientes/:id", (req, res) => {
  const index = pacientes.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Paciente não encontrado" });
  }
  pacientes[index] = { id: parseInt(req.params.id), ...req.body };
  res.json(pacientes[index]);
});

// DELETE — remove paciente
router.delete("/pacientes/:id", (req, res) => {
  const index = pacientes.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Paciente não encontrado" });
  }
  const removido = pacientes.splice(index, 1);
  res.json({ message: "Paciente removido com sucesso", removido });
});

module.exports = router;
