// let nav = HTMLElement
// nav.querySelector("a.navLink");

//All the global variables are present in window object

// const button = document.querySelector('button')
// button.addEventListener('velocity', ()=>{
//     console.log("Velocity event has been dispatched")
// })
// const velocityEvent = new Event('velocity')
// button.dispatchEvent(velocityEvent)

import DB from './services/DB.js'

window.todos = []
window.DB = DB

window.addEventListener("DOMContentLoaded", ()=>{
    DB.init()
})