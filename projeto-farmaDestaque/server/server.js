const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://127.0.0.1:5500' // Permitir o frontend desse endereço
}));

app.use(express.json());

const db = mysql.createConnection({ //Conexão BD
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "FarmaciaDestaque"
});

db.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados.");
});


app.post("/api/usuarios", (req, res) => { //Caminho de cadastrar usuário
  const { nome, telefone, cpf } = req.body;

  const query = "INSERT INTO Usuarios (nome, telefone, cpf) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE nome = ?";
  const values = [nome, telefone, cpf, nome];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Erro ao inserir usuário:", err);
      return res.status(500).json({ message: "Erro ao cadastrar usuário." });
    }
    res.status(201).json({ message: "Usuário cadastrado com sucesso." });
  });
});

app.post("/api/avaliacoes", (req, res) => { //Enviar avaliação
    const { usuarioId, nota, feedback } = req.body;
  
    if (nota < 1 || nota > 5 || isNaN(nota)) { //Verificar avaliação
      return res.status(400).json({ message: "Nota inválida. Deve ser entre 1 e 5." });
    }
  
    const query = "INSERT INTO Avaliacoes (usuario_id, nota, feedback) VALUES (?, ?, ?)";
    const values = [usuarioId, nota, feedback];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Erro ao inserir avaliação:", err);
        return res.status(500).json({ message: "Erro ao salvar avaliação." });
      }
      res.status(201).json({ message: "Avaliação enviada com sucesso." });
    });
  });


app.use(express.static(path.join(__dirname, 'public'))); //Arquivos estáticos


app.listen(port, () => { //Incia servidor
  console.log(`Servidor rodando na porta ${port}`);
});
