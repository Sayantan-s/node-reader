const Port = 5000

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const morgan = require('morgan');

const Blog = require('./models/blog');

/*app.get('/',(req,resp) => {
    resp.sendFile('./views/index.html',{ root : __dirname })
})

app.get('/about',(req,resp) => {
    resp.sendFile('./views/about.html',{ root : __dirname })
})*/

let path = './views/'

//const extractor = path.substr(8,path.length).split('.')[0];

//onsole.log(extractor);

const dbURI = `mongodb+srv://sayan_07:Sayantan123@nodeblog.zc13y.mongodb.net/sayansblog?retryWrites=true&w=majority`


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => {
        console.log('connected to db')
        app.listen(Port);
    })
    .catch(err => console.log(err));




app.set('view engine','ejs');

app.use(morgan('dev'));

app.use(express.static('styles'))

app.use(express.urlencoded({ extended : true }))


app.use(({path,url},resp,next) => {
    console.log(path === url); 
    morgan('dev');
    next();
})


app.get('/',(req,resp) => {
    //resp.sendFile('./views/index.html',{ root : __dirname });
    resp.redirect('/blog')
})

app.get('/create-blog',(req,resp) => {
    resp.render('createblog',{ title : 'createblog' })
})

app.get('/blog',(req,resp) => {
    Blog.find().sort({ createdAt : -1 }) 
        .then(result => {
            resp.render('index',{ title : 'Blogs',blogs : result });
            console.log(result);
        })
        .catch(err => console.log(err));
})

app.post('/blog',(req,resp) => {
    const blog = new Blog(req.body);

    blog.save()
        .then(result => {
            console.log(result);
            resp.redirect('/blog')
        })
        .catch(err => console.log(err));
})

app.get('/blog/:id',(req,resp) => {
    const { params : { id } } = req
    Blog.findById(id)
        .then(res => {
            resp.render('id',{ title : `blog ${id}`,blog : res })
            console.log(res);
        })
        .catch(err => console.log(err));
})


/*app.get('/blog-api',(req,res) => {
    const blogitem = new Blog({
        title : 'Drag scroll with locomotive scroll',
        subhead : 'Locomotive scroll',
        content : 'Hello folks,in this blog I am here to give a brief idea on how to build a scroll-x direction blog using Locomotive scroll.'
    })

    blogitem.save()
        .then(result => {
            res.send(result);
            console.log(result);
        })
        .catch(err => console.log(err));
})

app.get('/all-blogs',(req,resp) => {
    Blog.find()
        .then(result => {
            resp.send(result);
            console.log('Find all blogs')
        })
        .catch(err => console.log(err));
})

app.get('/blog-5fe1b1cc0c54265f0a60d4ac',(req,resp) => {
    Blog.findById('5fe1b1cc0c54265f0a60d4ac')
        .then(result  => {
            resp.send(result);
        })
        .catch(err => console.log(err));
})
*/
app.get('/about',(req,resp) => {
    //resp.sendFile('./views/about.html',{ root : __dirname });

    resp.render('about',{ title : 'about' }); 
})

app.use((req,resp) => {
    resp.status(404).render('404',{ title : '404'})
}) 

/*app.use((req,resp) => {
    if(req.url.includes(extractor) && req.url !== `/${extractor}`){
        resp.redirect(`/${extractor}`)
    }
})*/

/*const http = require('http');

const server = http.createServer((req,resp) => {
    console.log(req.url);
    resp.setHeader('Content-Type', 'text/html');
    let path = './views/';
    switch(req.url){
        case '/':
            resp.statusCode = 200
            path += 'index.html';
            break;
        case '/about':
            resp.statusCode = 200
            path += 'about.html';
            break;
        default : 
            if(req.url.includes('about') && req.url !== 'about'){
                resp.statusCode = 301;
                resp.setHeader('Location','about');
                resp.end();
            }
            resp.statusCode = 404
            path += '404.html';
            break;
    }
    fs.readFile(path,(err,data) => {
        if(err){
            console.log(err);
            resp.end();
        }
        else resp.end(data);
    })
})

server.listen(Port,'localhost',() => {
    console.log(`server running at localhost:${Port}`);
})*/   //USING NODE JS