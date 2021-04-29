const fs=require('fs')
const bioData={
    name:"Fahim Rahman",
    age:22,
    occupation:"Student"
}
// const jsonData=JSON.stringify(bioData);
// fs.writeFile('json1.json',jsonData,(err)=>{
//     console.log("File created.")
// })
fs.readFile('json1.json','utf8',(err,data)=>{
const myData=JSON.parse(data);
console.log(myData)
})



// const jsonData=JSON.stringify(bioData);
// console.log(jsonData)