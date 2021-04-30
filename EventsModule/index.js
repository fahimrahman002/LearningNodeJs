const EventEmitter=require('events')
const event = new EventEmitter()

event.on("sayMyName",()=>{
    console.log("Your name is Fahim")
})
event.on("sayMyName",()=>{
    console.log("Rahman")
})
event.on("sayMyName",()=>{
    console.log("Pranto")
})
event.on("checkPage",(sc,msg)=>{
    console.log(`status code is ${sc} and the page is ${msg}`)
})
event.emit("sayMyName")
event.emit("checkPage",200,"ok")