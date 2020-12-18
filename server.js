const fs = require('fs');

const Port = 4000

const express = require('express');

const app = express();

app.get('/',(req,resp) => {
    resp.sendFile('./views/index.html',{ root : __dirname })
})

app.get('/about',(req,resp) => {
    resp.sendFile('./views/about.html',{ root : __dirname })
})

let path = './views/'

//const extractor = path.substr(8,path.length).split('.')[0];

//onsole.log(extractor);

app.get('/',(req,resp) => {
    resp.sendFile('./views/index.html',{ root : __dirname });
})

app.get('/about',(req,resp) => {
    resp.sendFile('./views/about.html',{ root : __dirname });
})

app.use((req,resp) => {
    if(req.url.includes(extractor) && req.url !== `/${extractor}`){
        resp.redirect(`/${extractor}`)
    }
    resp.status(404).sendFile('/views/404.html', { root : __dirname })
})

app.listen(Port);

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