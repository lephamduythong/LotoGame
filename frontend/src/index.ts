import './styles/style.scss';
import { delay, randomInt } from './app/ulti'
import { getLotoTableArray } from './app/lototablegenerator'

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
let inputValidationElement : HTMLElement

let loadingContainerParentElement : HTMLElement
let loadingContainerElement : HTMLElement
let startButton : HTMLButtonElement

let lotoTableContainerElement : HTMLElement

let clickSound : HTMLAudioElement = new Audio('/assets/click.wav')

let playingContainerElement : HTMLElement

function init() {
    debugElement = document.getElementById('debug') as HTMLDivElement

    gameContainerElement = document.getElementById('game-container')

    svgHiddenLayerElement = document.getElementById('svg-hidden-layer')

    audioThemeElement = document.getElementById('audio-theme') as HTMLAudioElement
    audioThemeToggleElement = document.getElementById('svg-music-note')
    audioThemeCrossElement = document.getElementById('svg-music-note-cross')

    joinButtonElement = document.getElementById('svg-join-button')

    input = document.getElementById('input')
    inputContainerElement = document.getElementById('input-container')
    inputCloseButtonElement = document.getElementById('input-close-button')
    inputSubmitButtonElement = document.getElementById('input-submit-button')
    inputValidationElement = document.getElementById('input-validation')

    loadingContainerParentElement = document.getElementById('loading-container-parent')
    loadingContainerElement = document.getElementById('loading-container')

    lotoTableContainerElement = document.getElementById('loto-table-container')

    startButton = document.getElementById('start-button') as HTMLButtonElement

    playingContainerElement = document.getElementById('playing-container')
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
        inputContainerElement.style.top = '10px'
        gameContainerElement.style.opacity = '0.1'
        inputValidationElement.innerText = ''
    })
}

function addCloseAndSubmitInputButtonEvent() {
    inputCloseButtonElement.addEventListener('click', _ => {
        gameContainerElement.style.opacity = '1'
        inputContainerElement.style.display = 'flex'
        inputContainerElement.style.top = '-200px'
    })
    inputSubmitButtonElement.addEventListener('click', _=> {
        // Validate user's name
        let name = (document.getElementById('input') as HTMLInputElement).value
        if (!name || name === '') {
            inputValidationElement.innerText = "Không được bỏ trống"
            return
        }
        inputContainerElement.style.display = 'none'
        gameContainerElement.style.display = 'none'
        loadingContainerParentElement.style.display = 'flex'
    })
}

function addStartGameEvent() {
    startButton.addEventListener('click', async _ => {
        loadingContainerParentElement.style.display = "none"
        playingContainerElement.style.display = "grid"
        await delay(10)
        // playingContainerElement.style.transform = "scale(1)"
        playingContainerElement.style.opacity = "1"
        await delay(10)
        playingContainerElement.style.transform = "scale(1)"
    })
}

function setup() {
    svgHiddenLayerElement.style.display = 'none'
    audioThemeCrossElement.style.display = 'none'

    addAudioThemeToggleEvent()
    addJoinEvent()
    addCloseAndSubmitInputButtonEvent()
    addStartGameEvent()

    let svgCellGroupElement = document.getElementById('svg-cell-group')
    let lotoTableContainerElement = document.getElementById('loto-table-container')
    
    let randomedLotoArrayTable: number[][] = getLotoTableArray()
    console.log(randomedLotoArrayTable)

    for (let i = 0; i < 9; i++) {
        let newPlayingTableRowElement = document.createElement('div')
        newPlayingTableRowElement.classList.add('playing-table-row')
        for (let j = 0; j < 9; j++) {
            let newSVGCellGroupElement = document.createElement('svg')
            newSVGCellGroupElement.setAttribute('width', '37px')
            newSVGCellGroupElement.setAttribute('height', '60px')
            newSVGCellGroupElement.setAttribute('viewBox', '-450 250 75 153')
            if (randomedLotoArrayTable[j][i] != -1) {
                newSVGCellGroupElement.setAttribute('style', 'cursor: pointer')
            }
            newSVGCellGroupElement.setAttribute('version', '1.1')
            newSVGCellGroupElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
            newSVGCellGroupElement.innerHTML += svgCellGroupElement.outerHTML
            newSVGCellGroupElement.children[0].removeAttribute('id')
            newSVGCellGroupElement.children[0].setAttribute('id', 'svg-cell-' + i + '-' + j)
            newPlayingTableRowElement.appendChild(newSVGCellGroupElement)
        }
        lotoTableContainerElement.innerHTML += newPlayingTableRowElement.outerHTML
    }

    let childrenOfPlayingContainerElement = document.getElementById('loto-table-container').children
    for (let i = 0; i < childrenOfPlayingContainerElement.length; i++) {
        let childrenOfPlayingTableRowElement = childrenOfPlayingContainerElement[i].children
        for (let j = 0; j < childrenOfPlayingTableRowElement.length; j++) {
            childrenOfPlayingTableRowElement[j].addEventListener('click', _ => {
                if (randomedLotoArrayTable[j][i] != -1) {
                    clickSound.play()
                }
            })
        }
    }

    // getBoundingClientRect()
    let colors = ['34BDF2', 'F15C2B', 'F4D226', '66C165', '643B4B']
    let pickedColor = "#" + colors[randomInt(0, colors.length)]
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (randomedLotoArrayTable[j][i] != -1) {
                document.getElementById('svg-cell-' + i + '-' + j).children[1].children[0].innerHTML = randomedLotoArrayTable[j][i].toString()
            } else {
                document.getElementById('svg-cell-' + i + '-' + j).children[1].children[0].innerHTML = ''
                let rect = document.getElementById('svg-cell-' + i + '-' + j).children[0] as HTMLElement
                rect.style.fill = pickedColor
            }
        }
    }

    document.getElementById('win-trigger').addEventListener('click', _ => {
        playingContainerElement.style.display = 'none'
        document.getElementById('result-container').style.display = 'flex'
    })
    
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

