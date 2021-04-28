const chalk=require('chalk')
const validator=require('validator')
// console.log(chalk.green.inverse('Success'));
const res=validator.isEmail('fahim@gmia.com')
console.log(res?chalk.green.inverse("Valid email"):chalk.red.inverse("Email not valid"))