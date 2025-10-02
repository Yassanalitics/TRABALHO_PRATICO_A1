const express = require("express");
const router = express.Router();
const Paciente = require("../models/Paciente");

// CREATE — criar novo paciente
router.post("/", async (req, res) => {
  try {
    const paciente = new Paciente(req.body);
    const saved = await paciente.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// READ — listar todos os pacientes
router.get("/", async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// READ (one) — obter um paciente por id
router.get("/:id", async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id);
    if (!paciente) return res.status(404).json({ error: "Paciente não encontrado" });
    res.json(paciente);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE — atualizar paciente existente
router.put("/:id", async (req, res) => {
  try {
    const updated = await Paciente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Paciente não encontrado" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE — remover paciente
router.delete("/:id", async (req, res) => {
  try {
    const removed = await Paciente.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: "Paciente não encontrado" });
    res.json({ message: "Paciente removido com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
