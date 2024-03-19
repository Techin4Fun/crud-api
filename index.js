const express = require("express");
const app = express();
const pool = require("./db");

const port = 8080;

// Middleware
app.use(express.json());


// Routes

// GET ALL TODOS
app.get("/", async function(req,res){
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } 
    catch (error) {
        console.error(error);
    }
});

// GET A TODO
app.get("/todo/:id", async function(req,res){
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = ($1)", [id]);

        res.json(todo.rows[0]);
    } 
    catch (error) {
        console.error(error);
    }
});

// CREATE A TODO
app.post("/todos", async function(req,res){
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1)", [description]);
        res.json(newTodo.rows[0]);
    } 
    catch (error) {
        console.error(error);
    }
});

// UPDATE A TODO
app.put("/todo/:id", async function(req,res){
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = ($1) WHERE todo_id = ($2)", [description, id]);
        
        res.json(`Todo ${id} has been successfully updated!`);
    } 
    catch (error) {
        console.error(error);
    }
});

app.delete("/todo/:id", async function(req,res){
    try {
        const {id} = req.params;
        const deleteTodo = pool.query("DELETE FROM todo WHERE todo_id = ($1)", [id]);

        res.json(`Todo ${id} has been successfully DELETED!`);
    } 
    catch (error) {
        console.error(error);
    }
});


// Server
app.listen(port, function(){
    console.log(`Server has started on PORT: ${port}`);
    // console.log(process.env.DB);
})