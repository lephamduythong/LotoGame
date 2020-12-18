import './styles/style.scss';
import {delay} from './app/ulti'

let debugElement : HTMLDivElement

let svgHiddenLayerElement : HTMLElement

let audioThemeElement : HTMLAudioElement
let audioThemeToggleElement : HTMLElement, 
    audioThemeCross : HTMLElement
let isAudioThemeDisabled : boolean = false

let svgFrame : HTMLElement
let originalFrameWidth : string
let originalFrameHeight : string

let joinButtonElement : HTMLElement

function init() {
    debugElement = document.getElementById('debug') as HTMLDivElement

    svgHiddenLayerElement = document.getElementById('svg-hidden-layer') as HTMLElement

    audioThemeElement = document.getElementById('audio-theme') as HTMLAudioElement
    audioThemeToggleElement = document.getElementById('svg-music-note') as HTMLElement
    audioThemeCross = document.getElementById('svg-music-note-cross') as HTMLElement

    svgFrame = document.getElementById('svg-frame') as HTMLElement

    joinButtonElement = document.getElementById('svg-join-button') as HTMLElement
}

function addAudioThemeToggleEvent() {
    function handleClick() {
        if (!isAudioThemeDisabled) {
            audioThemeCross.style.removeProperty('display') // show
            isAudioThemeDisabled = true
            audioThemeElement.play()
        } else {
            audioThemeCross.style.display = 'none'
            isAudioThemeDisabled = false
            audioThemeElement.pause()
        }  
    }
    audioThemeToggleElement.addEventListener('click', _ => {
        handleClick()
    })
    audioThemeCross.addEventListener('click', _ => {
        handleClick()
    })
} 

function addJoinEvent() {
    joinButtonElement.addEventListener('click', async _ => {
        svgFrame.style.visibility = 'visible'
        // svgFrame.classList.add('effect')
        // svgFrame.style.transform = 'translateX(-287px)'
        await delay(10)
        let x = svgFrame.getAttribute('width')
        let y = svgFrame.getAttribute('height')
        svgFrame.setAttribute('width', originalFrameWidth)
        svgFrame.setAttribute('height', originalFrameHeight)
        console.log('Join')
    })
}

async function setup() {
    // svgHiddenLayerElement.style.display = 'none'
    audioThemeCross.style.display = 'none'
    svgFrame.style.visibility = 'hidden'
    originalFrameWidth = svgFrame.getAttribute('width')
    originalFrameHeight = svgFrame.getAttribute('height')
    svgFrame.setAttribute('width', '0')
    svgFrame.setAttribute('height', '0')

    addAudioThemeToggleEvent()
    addJoinEvent()

    // let autoPlayCheck = audioThemeElement.play()
    // if (autoPlayCheck !== undefined) {
    //     autoPlayCheck.then(_ => {
    //         console.log('started')
    //     }).catch(error => {
    //         debugElement.innerText += 'autoplay prevented '
    //     });
    // }
}

window.addEventListener("DOMContentLoaded", function() {
    init()
    setup()
    // setInterval(() => {
    //     loop()
    // }, 10)
})

