const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,"Site")));

const db = mysql.createConnection(process.env.MYSQL_URL ||{
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'catalogoMoveis'
});

db.connect((err) => {
    if (err) {
        console.log('Erro ao conectar no MySQL:', err);
    } else {
        console.log('Conectado ao MySQL');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Site/index.html'));
});

app.get('/catalogo', (req, res) => {
    db.query('SELECT * FROM catalogoMoveis', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.post('/postar', (req, res) => {
    const { nome_item, descricao, preco } = req.body;
    const sql = `
        INSERT INTO catalogoMoveis (nome_item, descricao, preco)
        VALUES (?, ?, ?)
    `;
    db.query(sql, [nome_item, descricao, preco], (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
});
app.delete('/excluir/:id', (req, res) => {
    const idItem = req.params.id;
    const sql = 'DELETE FROM catalogoMoveis WHERE id = ?';

    db.query(sql, [idItem], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).send('Móvel não encontrado.');
        }

        res.status(200).send('Móvel excluído com sucesso!');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});