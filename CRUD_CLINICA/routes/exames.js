const express = require('express');
const router = express.Router();

let exames = [
  {
    id: 1,
    paciente: "Taylor Swift",
    tipo: "Exame de sangue",
    resultado: "Níveis de hormônios baixo",
    data: "30/09/2025"
  },
  {
    id: 2,
    paciente: "Bruno Henrique",
    tipo: "Ultrassonografia ocular",
    resultado: "Retina direita descolada",
    data: "28/09/2025"
  },
  {
    id: 3,
    paciente: "Mariana Oliveira Santos",
    tipo: "Tomografia Computadorizada de Abdômen e Pelve sem Contraste",
    resultado: "Cálculo no rim esquerdo",
    data: "23/09/2025"
  },
  {
    id: 4,
    paciente: "João Pedro Almeida",
    tipo: "Tomografia Computadorizada",
    resultado: "Formação de calo ósseo sobre a fratura",
    data: "20/09/2025"
  },
  {
    id: 5,
    paciente: "Gustavo Clay",
    tipo: "Eletrocardiograma",
    resultado: "Hipertrofia ventricular esquerda",
    data: "12/09/2025"
  }
];
// GET
router.get('/exames', (req, res, next) => {
  res.json(exames);
});
// GEt por id ou nome
router.get('/exames/:param', (req, res, next) => {
  const param = req.params.param;
  let exame;
  if (!isNaN(param)) {
    const id = parseInt(param);
    exame = exames.find(a => a.id === id);
  } else {
    exame = exames.find(a => a.paciente.toLowerCase() === param.toLowerCase());
  }
  if (!exame) {
    return res.status(404).json({ erro: 'Exame não encontrado' });
  }
  res.json(exame);
});
// POST
router.post('/exames', (req, res, next) => {
  const { paciente, tipo, resultado, data } = req.body;
  if (!paciente || !tipo || !resultado || !data) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }
  if (exames.some(a => a.paciente.toLowerCase() === paciente.toLowerCase())) {
    return res.status(409).json({ erro: 'Paciente já cadastrado !!!' });
  }
  const novoExame = {
    id: exames.length + 1,
    paciente,
    tipo,
    resultado,
    data,
  };
  exames.push(novoExame);
  res.status(201).json(novoExame);
});
// PUT
router.put('/exames/:param', (req, res) => {
  const param = req.params.param;
  let index;
  if (!isNaN(param)) {
    const id = parseInt(param);
    index = exames.findIndex(a => a.id === id);
  } else {
    index = exames.findIndex(a => a.paciente.toLowerCase() === param.toLowerCase());
  }
  if (index === -1) {
    return res.status(404).json({ erro: 'Exame não encontrado' });
  }
  const { paciente, tipo, resultado, data } = req.body;
  if (!paciente || !tipo || !resultado || !data) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }
  exames[index] = { id: exames[index].id, paciente, tipo, resultado, data };
  res.json(exames[index]);
});
// DELETE
router.delete('/exames/:param', (req, res) => {
  const param = req.params.param;
  let index;
  if (!isNaN(param)) {
    const id = parseInt(param);
    index = exames.findIndex(a => a.id === id);
  } else {
    index = exames.findIndex(a => a.paciente.toLowerCase() === param.toLowerCase());
  }
  if (index === -1) {
    return res.status(404).json({ erro: 'Exame não encontrado!' });
  }
  exames.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
