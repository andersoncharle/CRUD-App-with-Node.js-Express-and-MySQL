"use strict"
const express = require('express');
const path = require('path');
const mysql = require('mysql');
// init express
const app=express();

const expressLayouts = require('express-ejs-layouts');

// static files
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'public')));

//app.use('/css',express.static(__dirname + 'public/css'));


// set Template engine
app.use(expressLayouts);
// rename layout to home that can be used as default file now for handling our projects files
app.set('layout', './layouts/home');
app.set('view engine', 'ejs');

// Navigation/ROUTINGS
app.get('/', (req,res)=>{
    res.render('index',{title: "home page"});
    
})

app.get('/about', (req,res)=>{
    res.render('about',{ title: "About us page",layout: "./layouts/sidebar"});    

})

// create connection
// blackminick
const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "nodemysql"

})

// check connection      

db.connect((err)=>{

    if (err) {
        throw err;
    } else {
        console.log("mysql connected!!!!!!!");
    }
})


app.get('/',function(req,res) {
    // res.send() Send a response.to the browser
    res.send("<strong>another file anderson hacker and coder </strong>")
})

// routing of creating db
app.get('/createdb',(req,res)=>{
    let sql= 'CREATE DATABASE nodemysql';
    db.query(sql,(err,result)=>{
        
        if (err) throw err;
          console.log(`${result}`);
        res.send(`database created well!!!`);

    })
})


// create table
app.get('/table',(req,res)=>{
let sql = 'CREATE TABLE posts(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, body VARCHAR(255) NOT NULL)';
db.query(sql,(err,result)=>{
    if(err) throw err;
    alert(`${result}`);
        res.send(`table created successfully!!!`);


});


});


// insert data in a table
app.get('/insertData',(req,res)=>{
    let ourData = {title: "post one", body: "This is post one created by anderson hacker"};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql,ourData,(err,result)=>{
        if(err) throw err;
        console.log(`${result}`);
            res.send(`data one inserted successfully!!!`);
    
    
    });

    
    });

//  inserting another data in the table
app.get('/insertData2',(req,res)=>{
    let dataTwo = {title: "second post", body: "This is the second data in my body"};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql,dataTwo,(err,result)=>{
        if(err) throw err;
    console.log(`${result}`);
    res.send("another data is added on the table successfully!!!");


    });
})

//  select results (POSTS)
app.get('/getData',(req,res)=>{

    let sql = 'SELECT *FROM posts';
    let query = db.query(sql,(err,results)=>{
        if(err) throw err;
    console.log(results);
    res.send(`Loooohllhh!!!!, Congratuation  data fetched successfully!!!`);


    });
})


//  select single result (POSTS)
app.get('/getData/:id',(req,res)=>{

    let sql = `SELECT *FROM posts WHERE id = ${req.params.id}`;

    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
    console.log(result);
    res.send(`post fetched successfully!!!`);


    });
})


//  update result (POSTS)
app.get('/updateData/:id',(req,res)=>{
  let newTitle = "code with anderson`";
//    syntax of updating table is::: UPDATE TABLE tablenme SET COLUMN=new_column WHERE ID=id
    let sql = `UPDATE posts SET title='${newTitle}' WHERE id = ${req.params.id}`;

    let query = db.query(sql,(err,result)=>{
        if(err) throw err;
    console.log(result);
    res.send(`post updated successfully!!!`);


    });
})

//  delete result (POSTS)
app.get('/deletePost/:id',(req,res)=>{
    
      let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  
      let query = db.query(sql,(err,result)=>{
          if(err) throw err;
      console.log(result);
      res.send(`post Deleted successfully!!!`);
  
  
      });
  })
  
  


const port= process.env.PORT || 3030;
app.listen(port,()=>{
    console.log(`server started on port ${port}`);
})
