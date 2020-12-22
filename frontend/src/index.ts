import './styles/style.scss';
import { delay, randomInt, getPosition, parseStringToDOM } from './app/ulti'
import { getLotoTableArray} from './app/lototablegenerator'
import * as HTML_ELEMENT_CONST from './app/const/htmlelementid'
import * as OTHER_CONST from './app/const/other'
import * as AUDIO_PATH_CONST from './app/const/audiopath'

// Variables definition
let debugElement : HTMLDivElement
let gameContainerElement : HTMLElement
let svgHiddenLayerElement : HTMLElement
let audioThemeElement : HTMLAudioElement
let audioThemeToggleElement : HTMLElement, 
    audioThemeCrossElement : HTMLElement
let isAudioThemeDisabled : boolean
let joinButtonElement : HTMLElement
let inputContainerElement : HTMLElement,
    inputElement : HTMLInputElement,
    inputCloseButtonElement : HTMLElement,
    inputSubmitButtonElement : HTMLElement,
    inputValidationElement : HTMLElement
let loadingContainerParentElement : HTMLElement,
    loadingContainerElement : HTMLElement,
    startButtonElement : HTMLButtonElement
let lotoTableContainerElement : HTMLElement,
    playingContainerElement : HTMLElement,
    randomedLotoArrayTable: number[][],
    markedLotoArrayTable: number[][],
    markedContainerElement : HTMLElement,
    svgCellGroupElement : HTMLElement,
    lotoTableFirstColumnRange : number[]
let resultContainer : HTMLElement
let clickSound : HTMLAudioElement

function init() {
    markedLotoArrayTable = []
    isAudioThemeDisabled = false
    clickSound = new Audio(AUDIO_PATH_CONST.CLICK)
    
    for (let i = 0; i < 9; i++) {
        let temp: number[] = []
        for (let j = 0; j < 9; j++) {
            temp.push(0)
        }
        markedLotoArrayTable.push(temp)
    }

    lotoTableFirstColumnRange = new Array(9)
    for (let i = 1; i <= 9; i++) {
        lotoTableFirstColumnRange[i - 1] = i
    }

    debugElement = document.getElementById(HTML_ELEMENT_CONST.DEBUG) as HTMLDivElement
    gameContainerElement = document.getElementById(HTML_ELEMENT_CONST.GAME_CONTAINER)
    svgHiddenLayerElement = document.getElementById(HTML_ELEMENT_CONST.SVG_HIDDEN_LAYER)
    audioThemeElement = document.getElementById(HTML_ELEMENT_CONST.AUDIO_THEME) as HTMLAudioElement
    audioThemeToggleElement = document.getElementById(HTML_ELEMENT_CONST.SVG_MUSIC_NOTE)
    audioThemeCrossElement = document.getElementById(HTML_ELEMENT_CONST.SVG_MUSIC_NOTE_CROSS)
    joinButtonElement = document.getElementById(HTML_ELEMENT_CONST.SVG_JOIN_BUTTON)
    inputElement = document.getElementById('input') as HTMLInputElement
    inputContainerElement = document.getElementById(HTML_ELEMENT_CONST.INPUT_CONTAINER)
    inputCloseButtonElement = document.getElementById(HTML_ELEMENT_CONST.INPUT_CLOSE_BUTTON)
    inputSubmitButtonElement = document.getElementById(HTML_ELEMENT_CONST.INPUT_SUBMIT_BUTTON)
    inputValidationElement = document.getElementById(HTML_ELEMENT_CONST.INPUT_VALIDATION)
    loadingContainerParentElement = document.getElementById(HTML_ELEMENT_CONST.LOADING_CONTAINER_PARENT)
    loadingContainerElement = document.getElementById(HTML_ELEMENT_CONST.LOADING_CONTAINER)
    lotoTableContainerElement = document.getElementById(HTML_ELEMENT_CONST.LOTO_TABLE_CONTAINER)
    startButtonElement = document.getElementById(HTML_ELEMENT_CONST.START_BUTTON) as HTMLButtonElement
    playingContainerElement = document.getElementById(HTML_ELEMENT_CONST.PLAYING_CONTAINER)
    markedContainerElement = document.getElementById(HTML_ELEMENT_CONST.MARKED_CONTAINER)
    svgCellGroupElement = document.getElementById(HTML_ELEMENT_CONST.SVG_CELL_GROUP)
    resultContainer = document.getElementById(HTML_ELEMENT_CONST.RESULT_CONTAINER)
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
        await delay(50)
        startButtonElement.click()
        gameContainerElement.style.display = 'none'
    })
}

function addStartGameEvent() {
    startButtonElement.addEventListener('click', async _ => {
        loadingContainerParentElement.style.display = "none"
        playingContainerElement.style.display = "grid"
        await delay(10)
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
    
        let pickedColor = "#" + OTHER_CONST.RANDOM_CELL_COLORS[randomInt(0, OTHER_CONST.RANDOM_CELL_COLORS.length - 1)]
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
    addStartGameEvent()
}

window.addEventListener("DOMContentLoaded", function() {
    init()
    setup()
})
