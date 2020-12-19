import './styles/style.scss';
import {delay} from './app/ulti'

let debugElement : HTMLDivElement

let gameContainerElement : HTMLElement

let svgHiddenLayerElement : HTMLElement

let audioThemeElement : HTMLAudioElement
let audioThemeToggleElement : HTMLElement, 
    audioThemeCrossElement : HTMLElement
let isAudioThemeDisabled : boolean = false

let joinButtonElement : HTMLElement

let inputContainerElement : HTMLElement
let input : HTMLElement
let inputCloseButtonElement : HTMLElement
let inputSubmitButtonElement : HTMLElement

function init() {
    debugElement = document.getElementById('debug') as HTMLDivElement

    gameContainerElement = document.getElementById('game-container') as HTMLElement

    svgHiddenLayerElement = document.getElementById('svg-hidden-layer') as HTMLElement

    audioThemeElement = document.getElementById('audio-theme') as HTMLAudioElement
    audioThemeToggleElement = document.getElementById('svg-music-note') as HTMLElement
    audioThemeCrossElement = document.getElementById('svg-music-note-cross') as HTMLElement

    joinButtonElement = document.getElementById('svg-join-button') as HTMLElement

    inputContainerElement = document.getElementById('input-container') as HTMLElement
    input = document.getElementById('input') as HTMLElement
    inputCloseButtonElement = document.getElementById('input-close-button')
    inputSubmitButtonElement = document.getElementById('input-submit-button')
}

function addAudioThemeToggleEvent() {
    function handleClick() {
        if (!isAudioThemeDisabled) {
            audioThemeCrossElement.style.removeProperty('display') // show
            isAudioThemeDisabled = true
            audioThemeElement.play()
        } else {
            audioThemeCrossElement.style.display = 'none'
            isAudioThemeDisabled = false
            audioThemeElement.pause()
        }  
    }
    audioThemeToggleElement.addEventListener('click', _ => {
        handleClick()
    })
    audioThemeCrossElement.addEventListener('click', _ => {
        handleClick()
    })
} 

function addJoinEvent() {
    joinButtonElement.addEventListener('click', async _ => {
        inputContainerElement.style.top = "10px"
        gameContainerElement.style.opacity = "0.1"
    })
}

function addCloseAndSubmitInputButtonEvent() {
    inputCloseButtonElement.addEventListener('click', _ => {
        gameContainerElement.style.opacity = '1'
        inputContainerElement.style.display = 'flex'
        inputContainerElement.style.top = '-200px'
    })
    inputSubmitButtonElement.addEventListener('click', _=> {
        
    })
}

async function setup() {
    svgHiddenLayerElement.style.display = 'none'
    audioThemeCrossElement.style.display = 'none'

    addAudioThemeToggleEvent()
    addJoinEvent()
    addCloseAndSubmitInputButtonEvent()

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
})

