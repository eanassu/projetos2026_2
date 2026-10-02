const express=require('express');
const app=express();
const mysql=require('mysql2');
const path=require('path');
const port=3000;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));

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
    res.render('inicio');
});


app.get("/lista",(req,res)=>{
    connection.query("SELECT * FROM FUNCIONARIOS",(err,results)=>{
      if(err) console.log('erro no SELECT');
      res.render('lista',{funcionarios:results});
    });
});

app.listen(port,()=>{
    console.log(`rodando na porta ${port}`);
});