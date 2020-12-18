const fs = require('fs');

const Port = 4000

const express = require('express');

const app = express();


app.listen(Port);

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