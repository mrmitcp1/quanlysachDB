const mysql = require ('mysql');
const express = require ('express');
const bodyParser = require ('body-parser');
const e = require("express");

const app = express();
const PORT = 3333;

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.set('views', './views')
app.get('/books/create', (req,res)=>{
    res.render('create')
})
app.get('/books',(req, res)=>{
    const sql = 'SELECT * FROM books';
    connection.query(sql,(err,result)=>{
        if (err) throw err
        res.render('index',{books: result})
    })
})

app.get('/books/:id/delete', (req, res)=>{
    const idBook = req.params.id;
    const  sql = 'DELETE FROM books WHERE id = ' + idBook;
    connection.query(sql, (err, result)=>{
        if (err) throw err;
        res.redirect('/books')
    })
})

app.get("/books/:id/update", (req, res) => {
    const idBook = req.params.id;
    const sql = "SELECT * FROM books WHERE id = " + idBook;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.render('update', {book: results[0]});
    });
})

app.post('/books/:id/update', (req, res)=>{
    const idBook = req.params.id;
    const sql = 'UPDATE books SET name = ?, price= ?, status= ?, author= ? WHERE id=?'
    const {name,price,status,author}= req.body;
    const value = [name,price,status,author,idBook];
    connection.query(sql,value,(err, results)=>{
        if (err) throw err;
        res.redirect('/books');
    })
})
app.post("/books/create", (req, res) => {

    // get data form
    const { name, price, status, author } = req.body;
    // insert to database
    const sqlInsert = "INSERT INTO books (name, price, status, author) VALUES ?";
    const value = [
        [name, price, status, author]
    ];
    connection.query(sqlInsert, [value], function (err, result) {
        if (err) throw err;
        res.end("success");
    });
});


app.listen(PORT,()=>{
    console.log('sever running')
})

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123321',
    database: 'book_manager',
    charset: 'utf8_general_ci'
});

connection.connect(function (err) {
    if (err) {
        throw err.stack;
    }else {
        console.log('connect database successfully')
    }
});