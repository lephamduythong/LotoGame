import './styles/style.scss';
import { gsap, Linear } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(CustomEase)

// CustomEase.create("clgt", "M0,0 C0.128,0.572 0.521,1.082 0.776,1.156 0.842,1.175 0.919,1.152 0.944,1.144 1.014,1.118 0.93,1 1,1 ")

document.getElementById('btn').addEventListener('click', _ => {
    gsap.to('#sun', { 
        duration: 10, 
        rotation: "360",
        repeat: -1,
        ease: Linear.easeNone,
        transformOrigin:"50% 50%" 
    })
})


/*
import './styles/style.scss';
import { startConnection } from './app/wsconnection'
import { activeListenersAsync } from './app/wsinvoke'
import { activeCallbacksAsync } from './app/wscallback'
import { delay } from './app/ulti'
import { Constant } from './app/const'

function parseStyleClasses() {
    let html = document.documentElement.innerHTML.toString()
    html = html.replace(Constant.StyleClass.CLGT, 'red-text')
    html = html.replace('@@title@@', 'Vãi đái')
    let parser = new DOMParser()
    let parsedHTML = parser.parseFromString(html, 'text/html')
    document.body = parsedHTML.body
    document.head.innerHTML = parsedHTML.head.innerHTML.toString()
}

document.addEventListener("DOMContentLoaded", async () => {
    parseStyleClasses()
    let popupContainer = document.getElementsByClassName('tl-popup-container')
    let popup = document.getElementsByClassName('tl-popup')
    popupContainer[0].classList.remove('tl-hidden')
    await delay(10)
    popup[0].classList.add('tl-popup-open')
    popup[0].classList.remove('tl-popup-close')
    await delay(2000)
    let t1 = activeListenersAsync()
    let t2 = activeCallbacksAsync()
    await Promise.all([t1, t2])
    console.log('done')
    startConnection()
    popup[0].classList.remove('tl-popup-open')
    popup[0].classList.add('tl-popup-close')
    await delay(190)
    document.getElementsByClassName('tl-popup-container')[0].classList.add('tl-hidden')
});
*/

// let btn = document.getElementById('btn')

// btn.addEventListener('click', function () {
//   document.getElementsByClassName('tl-popup-container')[0].classList.remove('tl-hidden')
//   setTimeout(function () {
//     document.getElementsByClassName('tl-popup')[0].classList.add('tl-popup-open')
//     document.getElementsByClassName('tl-popup')[0].classList.remove('tl-popup-close')
//   }, 1)
// });

// document.getElementsByClassName('tl-close-popup-btn')[0].addEventListener('click', function (e) {
//   document.getElementsByClassName('tl-popup')[0].classList.remove('tl-popup-open')
//   document.getElementsByClassName('tl-popup')[0].classList.add('tl-popup-close')
//   setTimeout(function () {
//     document.getElementsByClassName('tl-popup-container')[0].classList.add('tl-hidden')
//   }, 190)
// })