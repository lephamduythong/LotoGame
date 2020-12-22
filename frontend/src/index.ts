import './styles/style.scss';
import { delay, randomInt, getPosition, parseStringToDOM } from './app/ulti'
import { getLotoTableArray} from './app/lototablegenerator'
import { compile as handlebarsCompile } from "handlebars";

let debugElement : HTMLDivElement

let gameContainerElement : HTMLElement

let svgHiddenLayerElement : HTMLElement

let audioThemeElement : HTMLAudioElement
let audioThemeToggleElement : HTMLElement, 
    audioThemeCrossElement : HTMLElement
let isAudioThemeDisabled : boolean = false

let joinButtonElement : HTMLElement

let inputContainerElement : HTMLElement
let inputElement : HTMLInputElement
let inputCloseButtonElement : HTMLElement
let inputSubmitButtonElement : HTMLElement
let inputValidationElement : HTMLElement

let loadingContainerParentElement : HTMLElement
let loadingContainerElement : HTMLElement
let startButton : HTMLButtonElement

let lotoTableContainerElement : HTMLElement
let playingContainerElement : HTMLElement
let randomedLotoArrayTable: number[][]
let markedLotoArrayTable: number[][] = []
let markedContainerElement : HTMLElement
let svgCellGroupElement : HTMLElement
let lotoTableFirstColumnRange : number[]

let resultContainer : HTMLElement

let clickSound : HTMLAudioElement = new Audio('/assets/click.wav')

function init() {
    for (let i = 0; i < 9; i++) {
        let temp: number[] = []
        for (let j = 0; j < 9; j++) {
            temp.push(0)
        }
        markedLotoArrayTable.push(temp)
    }
    // Error code below ?!
    // markedLotoArrayTable.fill((new Array(9).fill(0)))
    // console.log(markedLotoArrayTable)

    lotoTableFirstColumnRange = new Array(9)
    for (let i = 1; i <= 9; i++) {
        lotoTableFirstColumnRange[i - 1] = i
    }

    debugElement = document.getElementById('debug') as HTMLDivElement

    gameContainerElement = document.getElementById('game-container')

    svgHiddenLayerElement = document.getElementById('svg-hidden-layer')

    audioThemeElement = document.getElementById('audio-theme') as HTMLAudioElement
    audioThemeToggleElement = document.getElementById('svg-music-note')
    audioThemeCrossElement = document.getElementById('svg-music-note-cross')

    joinButtonElement = document.getElementById('svg-join-button')

    inputElement = document.getElementById('input') as HTMLInputElement
    inputContainerElement = document.getElementById('input-container')
    inputCloseButtonElement = document.getElementById('input-close-button')
    inputSubmitButtonElement = document.getElementById('input-submit-button')
    inputValidationElement = document.getElementById('input-validation')

    loadingContainerParentElement = document.getElementById('loading-container-parent')
    loadingContainerElement = document.getElementById('loading-container')

    lotoTableContainerElement = document.getElementById('loto-table-container')

    startButton = document.getElementById('start-button') as HTMLButtonElement

    playingContainerElement = document.getElementById('playing-container')

    markedContainerElement = document.getElementById('marked-container')

    svgCellGroupElement = document.getElementById('svg-cell-group')

    resultContainer = document.getElementById('result-container')
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
        let name = inputElement.value
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
        await delay(10)

        randomedLotoArrayTable = getLotoTableArray() // This table is not transposed

        for (let i = 0; i < 9; i++) {
            let newPlayingTableRowElement = document.createElement('div')
            newPlayingTableRowElement.classList.add('playing-table-row')
            for (let j = 0; j < 9; j++) {
                let newSVGCellGroupElement = document.createElement('svg')
                let isInFisrtColumnRange = (lotoTableFirstColumnRange.indexOf(randomedLotoArrayTable[j][i]) >= 0) ? true : false
                newSVGCellGroupElement.setAttribute('width', '37px')
                newSVGCellGroupElement.setAttribute('height', '60px')
                // newSVGCellGroupElement.setAttribute('viewBox', `-450 250 75 153`)
                newSVGCellGroupElement.setAttribute('viewBox', `${isInFisrtColumnRange ? -470 : -445} 250 75 153`)
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
    
        let colors = ['34BDF2', 'F15C2B', 'F4D226', '66C165', '643B4B']
        let pickedColor = "#" + colors[randomInt(0, colors.length - 1)]
        for (let i = 0; i < 9; i++) {
            let tempArray: string[] = []
            for (let j = 0; j < 9; j++) {
                let svgCellElement = document.getElementById('svg-cell-' + i + '-' + j)
                if (randomedLotoArrayTable[j][i] != -1) {
                    svgCellElement.children[1].children[0].innerHTML = randomedLotoArrayTable[j][i].toString()
                } else {
                    svgCellElement.children[1].children[0].innerHTML = ''
                    let rect = svgCellElement.children[0] as HTMLElement
                    rect.style.fill = pickedColor
                }
            }
        }

        let childrenOfPlayingContainerElement = lotoTableContainerElement.children
        let svgCellMarkedElement = document.getElementById('svg-cell-marked')
        for (let i = 0; i < 9; i++) {
            let childrenOfPlayingTableRowElement = childrenOfPlayingContainerElement[i].children
            for (let j = 0; j < 9; j++) {
                childrenOfPlayingTableRowElement[j].addEventListener('click', _ => {
                    if (randomedLotoArrayTable[j][i] != -1) {
                        let el = document.getElementById('svg-cell-' + i + '-' + j)
                        clickSound.play()
                        
                        // Mark
                        let isInFisrtColumnRange = (lotoTableFirstColumnRange.indexOf(randomedLotoArrayTable[j][i]) >= 0) ? true : false
                        let newSVGMarkElement = document.createElement('svg')
                        newSVGMarkElement.setAttribute('width', '37px')
                        newSVGMarkElement.setAttribute('height', '80px')
                        newSVGMarkElement.setAttribute('viewBox', `${isInFisrtColumnRange ? -450 : -490} 450 169 233`)
                        newSVGMarkElement.setAttribute('style', `position: absolute; z-index: 10; left: ${getPosition(el, 'top left').x}; top: ${getPosition(el, 'top left').y}`)
                        newSVGMarkElement.setAttribute('version', '1.1')
                        newSVGMarkElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
                        newSVGMarkElement.innerHTML += svgCellMarkedElement.outerHTML
                        newSVGMarkElement.children[0].removeAttribute('id')
                        markedContainerElement.innerHTML += newSVGMarkElement.outerHTML
                        markedLotoArrayTable[i][j] = 1

                        // Check win ?
                        let count = 0
                        // Scan vertical
                        for (let k = 0; k < 9; k++) {
                            if (markedLotoArrayTable[k][j] === 1) {
                                count++
                            }
                        }
                        if (count === 5) {
                            win()
                        }
                        count = 0
                        // Scan horizontal
                        for (let k = 0; k < 9; k++) {
                            if (markedLotoArrayTable[i][k] === 1) {
                                count++
                            }
                        }
                        if (count === 5) {
                            win()
                        }
                    }
                })
            }
        }
    })
}

function win() {
    playingContainerElement.style.display = 'none'
    markedContainerElement.style.display = 'none'
    resultContainer.style.display = 'flex'
}

function setup() {
    svgHiddenLayerElement.style.display = 'none'
    audioThemeCrossElement.style.display = 'none'

    addAudioThemeToggleEvent()
    addJoinEvent()
    addCloseAndSubmitInputButtonEvent()
    addStartGameEvent()

    document.getElementById('playing-exit-button').addEventListener('click', _ => {
        playingContainerElement.style.display = 'none'
        markedContainerElement.style.display = 'none'
        document.getElementById('result-container').style.display = 'flex'
    })
}

window.addEventListener("DOMContentLoaded", function() {
    init()
    setup()
})

// let autoPlayCheck = audioThemeElement.play()
// if (autoPlayCheck !== undefined) {
//     autoPlayCheck.then(_ => {
//         console.log('started')
//     }).catch(error => {
//         debugElement.innerText += 'autoplay prevented '
//     });
// }
