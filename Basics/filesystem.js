const fs=require('fs');
// fs.writeFileSync('read.txt',"File created by js code!")
// fs.appendFileSync('read.txt',"Hello Fahim, How are you?");
const buf_data=fs.readFileSync('read.txt');

org_data=buf_data.toString();

console.log(org_data)