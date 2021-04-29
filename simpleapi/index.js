const http=require('http')

const fs = require('fs')
const server=http.createServer((req,res)=>{

    if(req.url=='/'){
        res.end('Home page')
    }else if(req.url=='/users'){
        fs.readFile(`${__dirname}/user.json`,'utf8',(err,data)=>{
            const userData=JSON.parse(data)
            res.end(data)
        })   
    }
    else{
        res.writeHead(404,{"content-type":"text"})
        res.end("404 page error")
    }
})

server.listen(8000,"localhost",()=>{
    console.log("Server is running...")
})