import './styles/style.scss';
import { gsap, Linear  } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { delay } from './app/ulti'

gsap.registerPlugin(CustomEase)

CustomEase.create("clgtEase", "M0,0 C0.128,0.572 0.521,1.082 0.776,1.156 0.842,1.175 0.919,1.152 0.944,1.144 1.014,1.118 0.93,1 1,1 ")

let tl = gsap.timeline({repeat:1, yoyo: true})
document.getElementById('btn_timeline').addEventListener('click', _ => {
    tl.restart()
    tl.to('#clgt1', {duration: 0.5, x:500})
    tl.to('#clgt1', {duration: 0.5, delay:0.2 , y:100, rotation: "45deg"})
})

gsap.set('#sun', {
    transformOrigin: "50% 50%"
})
gsap.set('#group1', {
    transformOrigin: "50% 50%"
})

let sunTween = gsap.to('#sun', { 
    duration: 2,
    rotation: "360deg",
    repeat: -1
})
let groupTween = gsap.from('#group1', { 
    duration: 0.1, 
    rotation: "360",
    repeat: -1,
    ease: Linear.easeNone,
}) 
let rect2Tween = gsap.to('#rect2', { 
    duration: 10,
    x: "100"
}) 

document.getElementById('btn_start').addEventListener('click', _ => {
    sunTween.resume()
    groupTween.resume()
}) 

document.getElementById('btn_pause').addEventListener('click', _ => {
    sunTween.pause()
    groupTween.pause()
})

document.getElementById('btn_seek').addEventListener('click', _ => {
    rect2Tween.seek(1)
})

document.getElementById('btn_timescale').addEventListener('click', _ => {
    rect2Tween.timeScale(3)
})

async function test() {
    while (true) {
        await delay(2000)
        gsap.to('#rect1', { 
            duration: 1, 
            ease: Linear.easeNone,
            x : "random(-100, 100)",
            y : "random(-100, 100)",
        })
    }
}

test()


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