const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const users = [
    {id: 1, name: 'habib', email:'habib@gmail.com'},
    {id: 2, name: 'shagor', email:'shagor@gmail.com'},
    {id: 3, name: 'masum', email:'masum@gmail.com'},
    {id: 4, name: 'sihab', email:'sihab@gmail.com'},
    {id: 5, name: 'nadir', email:'nadir@gmail.com'}
];

app.get('/', (req, res)=>{
    res.send('Welcome from express.js express')
});

app.get('/users', (req, res)=>{
    if (req.query.name) {
        const search = req.query.name.toLowerCase();
        const matched = users.filter(user=>user.name.toLocaleLowerCase().includes(search))
        res.send(matched);
    }
    else{
        res.send(users)
    }
});

app.get('/user/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    res.send(user);
});

app.post('/user', (req, res)=>{
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    res.send(user);
});

app.listen(port, ()=>{
    console.log('Listening to port', port)
});