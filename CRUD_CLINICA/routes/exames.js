const express = Require('express');
const router = express.Router();

let exames = [
  {
    id: 1,
    Paciente: "João da Silva",
    Tipo: "Raio-X",
    Resultado: "Braço deslocado",
    Data: "30/09/2025"
  },
  {
    id: 2,
    Paciente: "Guilherme Araújo",
    Tipo: "Eletrocardiograma",
    Resultado: "Arritmia Cardiaca Moderada",
    Data: "28/09/2025"
  },
  {
    id: 3,
    Paciente: "Erick Oliveira",
    Tipo: "Tonometria",
    Resultado: "Pressão Ocular (glaucoma)",
    Data: "23/09/2025"
  },
  {
    id: 4,
    Paciente: "Vanessa Soares",
    Tipo: "Audiometria",
    Resultado: "Perda Auditiva",
    Data: "20/09/2025"
  },
  {
    id: 5,
    Paciente: "Cristina Ribeiro",
    Tipo: "Mamografia",
    Resultado: "Prevenção ao Câncer de Mama",
    Data: "12/09/2025"
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


router.post('/exames', (req, res) => {
  const { Paciente, Tipo, Resultado, Data } = req.body;

  if (!Paciente || !Tipo || !Resultado || !Data) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }

  if (exames.some(a => a.cpf === cpf)) {
    return res.status(409).json({ erro: 'Paciente já cadastrado !!!' });
  }

  const novoExame = {
    id: exames.length + 1,
    Paciente,
    Tipo,
    Resultado,
    Data,
  };

  alunos.push(novoExame);
  res.status(201).json(novoExame);
});


router.put('/exames:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = exames.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Paciente não encontrado' });
  }

  const { Paciente, Tipo, Resultado, Data} = req.body;

  if (!Paciente || !Tipo || !Resultado || !Data) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }

  exames[index] = { id, Paciente, Tipo, Resultado, Data };
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

Module.exports = router;