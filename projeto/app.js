const express=require('express');
const app=express();
const mysql=require('mysql2');
const port=3000;

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'eugenio'
});

connection.connect(err=>{
    if(err) throw err;
    console.log('conectado ao mysql');
});

app.get("/",(req,res)=>{
    connection.query("SELECT * FROM FUNCIONARIOS",(err,results)=>{
      if(err) console.log('erro no SELECT');
      res.send(`
        <h1>Lista de Funcionários</h1>
        <ul>
          ${results.map(funcionario => `
            <li>${funcionario.nome} - ${funcionario.re}</li>
          `).join('')}
        </ul>
      `);
    });
});

app.listen(port,()=>{
    console.log(`rodando na porta ${port}`);
});