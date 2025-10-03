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
router.get("/exames/id/:id", (req, res) => {
  const exame = exames.find(p => p.id === parseInt(req.params.id));
  if (!exame) {
    return res.status(404).json({ error: "exame nao encontrado" });
  }
  res.json(exame);
});

router.get("/exames/nome/:nome", (req, res) => {
  const nome = req.params.nome.toLowerCase();

  const exame = exames.find(p => p.paciente.toLowerCase().includes(nome));
  if (!exame) {
    return res.status(404).json({ error: "Exame não encontrado" });
  }
  res.json(exame);
});

// POST
router.post('/exames', (req, res) => {
  const { paciente, tipo, resultado, data } = req.body;
  if (!paciente || !tipo || !resultado || !data) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }
  if (exames.some(a => a.paciente === paciente)) {
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
  res.status(201).json({message: "Exame cadastrado"});
});

//PUT
router.put('/exames/id/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = exames.findIndex(a => a.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: 'Paciente não encontrado' });
  }
  const { paciente, tipo, resultado, data} = req.body;
  if (!paciente || !tipo || !resultado || !data) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }
  exames[index] = { id, paciente, tipo, resultado, data };
  res.json(exames[index]);
});
//DELETE
router.delete('/exames/id/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = exames.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Paciente não encontrado !' });
  }

  exames.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
