const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Conexão ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

const app = express();
app.use(express.json());

// Rota para cadastrar o nome
app.post('/cadastrar', (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: 'Nome é obrigatório' });
    }

    const query = 'INSERT INTO nomes (nome) VALUES (?)';
    connection.query(query, [nome], (err, results) => {
        if (err) {
            console.error('Erro ao salvar no banco de dados:', err);
            return res.status(500).json({ mensagem: 'Erro ao salvar o nome' });
        }
        res.status(200).json({ mensagem: `Nome ${nome} salvo com sucesso!` });
    });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
