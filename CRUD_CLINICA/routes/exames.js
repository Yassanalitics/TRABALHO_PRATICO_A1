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
    paciente: "Bruno henrique",
    tipo: "Ultrassonografia ocular",
    resultado: "Retina direita descolada",
    data: "28/09/2025"
  },
  {
    id: 3,
    paciente: "Mariana Oliveira Santos",
    tipo: "Tomografia Computadorizada de Abdômen e Pelve sem Contraste",
    resultado: "Cálculo no rim esquedo",
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


router.get('/exames', (req, res) => {
  res.json(exames);
});

router.get('/exames/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const exames = exames.find(a => a.id === id);

  if (!exames) {
    return res.status(404).json({ erro: 'Paciente não encontrado' });
  }

  res.json(exames);
});

router.get('/exames/:paciente', (req, res) => {
    const id = parseInt(req.params.id);
    const exames = exames.find(a => a.id === id);
  
    if (!exames) {
      return res.status(404).json({ erro: 'Paciente não encontrado' });
    }
  
    res.json(exames);
  });

router.post('/exames', (req, res) => {
  const { paciente, tipo, resultado, data } = req.body;

  if (!paciente || !tipo || !resultado || !data) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }

  if (exames.some(a => a.cpf === cpf)) {
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


router.put('/exames:id', (req, res) => {
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


router.delete('/exames:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = exames.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Paciente não encontrado !' });
  }

  exames.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
