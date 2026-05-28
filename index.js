const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'sistema_agendamento'
});
db.connect((err) => {
    if (err) {
        console.log('Erro ao conectar no MySQL:', err);
    } else {
        console.log('Conectado ao MySQL');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/agendamentos', (req, res) => {
    db.query('SELECT * FROM agendamentos', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});
app.post('/agendar', (req, res) => {
    const { nome_cliente, servico, data_agendamento, hora_agendamento } =
        req.body;
    const sql = `
INSERT INTO agendamentos
(nome_cliente, servico, data_agendamento, hora_agendamento)
VALUES (?, ?, ?, ?)
`;
    db.query(sql, [nome_cliente, servico, data_agendamento, hora_agendamento], (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
});
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});