// function sayHello(name) {
//     console.log('Hello ' + name);
// }
// // sayHello('Fahim');
// console.log(window);//global

// console.log(module);
// const logger = require('./logger');

// logger('Message')
const add=(a,b)=>{
    return a+b;
};
const sub=(a,b)=>{
    return a-b;
};

const name="Fahim"
// module.exports.add=add;
// module.exports.sub=sub;
module.exports={add,sub,name}