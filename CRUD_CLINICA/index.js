const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())


const MedicosRouter = require("./routes/medicos") 
app.use(MedicosRouter)

const PacientesRouter = require("./routes/pacientes")
app.use(PacientesRouter)

const ConsultasRouter = require("./routes/consultas")
app.use(ConsultasRouter)

const ExamesRouter = require("./routes/exames")
app.use(ExamesRouter)

const MedicamentosRouter = require("./routes/medicamentos")
app.use(MedicamentosRouter)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
