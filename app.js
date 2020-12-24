const express = require('express');

const Users = require('./models/users.schema');

const port = 3000;

const app = express();

app.set('view engine','ejs')

const mongoose = require('mongoose');

const dbUri = `mongodb+srv://bnb_users:sayantan@nodeblog.zc13y.mongodb.net/mybnb?retryWrites=true&w=majority`

mongoose.connect(dbUri,{ useNewUrlParser : true,useUnifiedTopology : true })
    .then(_ => {
        console.log('connected to db');
        app.listen(port);
    })
    .catch(err  => console.log(err));


app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }))


app.get('/users-add',(req,resp) => {
    const newUsers = new Users({
        name : 'Ayudh Das',
        college : 'Calcutta Institute Of Technology',
        passOut : 2021,
    })

    newUsers.save()
        .then(result => {
            resp.send(result);
            console.log(result);
        })
        .catch(err  => console.log(err));
})

app.get('/users-api',(req,resp) => {
    Users.find().sort({ createdAt : -1 })
        .then(result => {
            resp.send(result);
        })
        .catch(err => console.log(err));
})
 

app.get('/',(req,res) => {
    res.redirect('/users')
})

app.get('/users',(req,res) => {
    Users.find().sort({ createdAt : -1 })
        .then(result =>{
            res.render('index',{
                header : 'List of Engineering/CS students',
                data : result
            });
        })
        .catch(err  => console.log(err));
})

app.get('/users/:id',(req,res) => {
    const { params : { id } } = req
    Users.findById(id)
        .then(result =>{
            res.render('user',{result}); 
        })
        .catch(err => console.log(err));
})