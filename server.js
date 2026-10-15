const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();
const cors = require("cors");

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));


const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS,
    database: process.env.DB_NAME || 'quitanda_bairro'
});

db.connect(function(erro){
    if (erro) {
        console.log('Erro ao conectar ao banco:', erro);
        return;
    }

    console.log('Conectado ao banco de dados!');
});



app.get('/', (req, res) => {
    res.send('API da Quitanda funcionando!');
});

app.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM produtos';

    db.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ mensagem: 'Erro ao listar produtos' });
        }

        res.json(resultados);
    });
});

app.get('/produtos/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'SELECT * FROM produtos WHERE id = ?';

    db.query(sql, [id], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ mensagem: 'Erro ao buscar produto' });
        }

        if (resultados.length === 0) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }

        res.json(resultados[0]);
    });
});

app.post('/produtos', (req, res) => {
    const { nome, categoria, preco, quantidade, unidade } = req.body;

    const sql = `
        INSERT INTO produtos (nome, categoria, preco, quantidade, unidade)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [nome, categoria, preco, quantidade, unidade], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ mensagem: 'Erro ao cadastrar produto' });
        }

        res.status(201).json({
            mensagem: 'Produto cadastrado com sucesso',
            id: resultado.insertId
        });
    });
});

app.put('/produtos/:id', (req, res) => {
    const id = req.params.id;
    const { nome, categoria, preco, quantidade, unidade } = req.body;

    const sql = `
        UPDATE produtos
        SET nome = ?, categoria = ?, preco = ?, quantidade = ?, unidade = ?
        WHERE id = ?
    `;

    db.query(sql, [nome, categoria, preco, quantidade, unidade, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ mensagem: 'Erro ao atualizar produto' });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }

        res.json({ mensagem: 'Produto atualizado com sucesso' });
    });
});

app.patch('/produtos/:id', (req, res) => {
    const id = req.params.id;
    const { nome, categoria, preco, quantidade, unidade } = req.body;

    const sql = `UPDATE produtos SET 
    nome = ifnull(?,nome), 
    categoria = ifnull(?,categoria), 
    preco = ifnull(?,preco), 
    quantidade = ifnull(?,quantidade), 
    unidade = ifnull(?,unidade) 
    WHERE id = ?`;

    db.query(sql, [nome, categoria, preco, quantidade, unidade, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ mensagem: 'Erro ao atualizar produto' });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }

        res.json({ mensagem: 'Produto atualizado com sucesso' });
    });
});

app.delete('/produtos/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM produtos WHERE id = ?';

    db.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ mensagem: 'Erro ao excluir produto' });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }

        res.json({ mensagem: 'Produto excluído com sucesso' });
    });
});

app.listen(PORT, function(){
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});