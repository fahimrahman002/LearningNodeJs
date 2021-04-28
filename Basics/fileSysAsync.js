const fs=require('fs')
fs.writeFile('async.txt',"This is created by async write file",(err)=>{
console.log("File has created.");
});
fs.readFile('async.txt',"utf8",(err,data)=>{
    console.log(data);
});
