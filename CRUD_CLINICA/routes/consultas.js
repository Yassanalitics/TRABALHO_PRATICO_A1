const express = require("express");
const router = express.Router();
const Consulta = require("../models/Consulta");

// CREATE — criar nova consulta
router.post("/", async (req, res) => {
  try {
    const consulta = new Consulta(req.body);
    const saved = await consulta.save();
    // Optionally populate references for response
    const populated = await Consulta.findById(saved._id).populate('paciente medico');
    res.status(201).json(populated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// READ — listar todas as consultas
router.get("/", async (req, res) => {
  try {
    // Optional: Filter by query params, e.g., ?paciente=ID or ?data=YYYY-MM-DD
    const query = {};
    if (req.query.paciente) query.paciente = req.query.paciente;
    if (req.query.medico) query.medico = req.query.medico;
    if (req.query.data) query.data = { $gte: new Date(req.query.data) }; // Example date filter

    const consultas = await Consulta.find(query).populate('paciente medico').sort({ data: 1, horario: 1 });
    res.json(consultas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// READ (one) — obter uma consulta por id
router.get("/:id", async (req, res) => {
  try {
    const consulta = await Consulta.findById(req.params.id).populate('paciente medico');
    if (!consulta) return res.status(404).json({ error: "Consulta não encontrada" });
    res.json(consulta);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE — atualizar consulta existente
router.put("/:id", async (req, res) => {
  try {
    const updated = await Consulta.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('paciente medico');
    if (!updated) return res.status(404).json({ error: "Consulta não encontrada" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE — remover consulta
router.delete("/:id", async (req, res) => {
  try {
    const removed = await Consulta.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: "Consulta não encontrada" });
    res.json({ message: "Consulta removida com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
