import cors from 'cors';
import express from 'express';


// const express = require('express');
const app = express();


// CORS middleware - place BEFORE your routes
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type']
}));


//middleware for json
app.use(express.json());

// Global studentData - declare at top level
const studentData = [
    {
        "id":0,
        "name": "Asela",
        "age": 25,
        "course": "Web Development"
    },{
        "id":1,
        "name": "Nimal",
        "age": 22,
        "course": "Data Science"
    }
];

app.get('/', (req, res) => {
    res.send('Hello, World!,,,,,,');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.post('/submit', (req, res) => {
    res.send('Form submitted successfully!');
});

app.get("/student", (req, res) => {
    const studentData1 = [
        {
            "name": "Asela",
            "age": 25,
            "course": "Web Development"
        },{
            "name": "Nimal",
            "age": 22,
            "course": "Data Science"
        }
    ]
    res.json(studentData);
});

app.get("/data", (req, res) => {
    const data = require('./data.json');
    res.json(data);
});

    app.post("/student1", (req, res) => {
    console.log(studentData)
    res.send(studentData);
});

app.post("/student", (req, res) => {
    const {name,age} = req.body;
    studentData.push({name,age});
    res.send("Student data added successfully");    

});

app.put("/student2/:name", (req, res) => {
    const name = req.params.name;
    const {name: newName} = req.body;
    const student = studentData.find(s => s.name === name);
    if(student){
        student.name = newName;    
        res.send("Student data updated successfully");
    } else {      
        res.status(404).send("Student not found");
    }
});

app.get("/student3/:name", (req, res) => {
    const id = req.params.id;
    const student = studentData.find(s => s.id === parseInt(id));
    if(student){
        res.json(student);
    } else {
        res.status(404).send("Student not found");
    }
});
    