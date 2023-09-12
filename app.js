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
import Router from './services/Router.js'

window.DB = DB
window.Router = Router

window.addEventListener("DOMContentLoaded", ()=>{
    DB.init()
})