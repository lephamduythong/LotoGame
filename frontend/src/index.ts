// Style
import '../node_modules/normalize.css/normalize.css'
import './index.scss';

// Lib
import { compile } from 'handlebars'
import 'firebase/database'

// App function
import { delay, randomInt, getPosition, parseStringToDOM } from './app/ulti'
import { getLotoTableArray} from './app/lototablegenerator'
import { googleVoiceCallNumber } from './app/readgooglevoicenumber';

// Constant
import * as HTML_ELEMENT_ID from './app/const/htmlelementid'
import * as OTHER from './app/const/other'
import * as AUDIO_PATH from './app/const/audiopath'
import * as PATH from './app/const/path'

// Variables definition
let debugElement : HTMLDivElement
let isHost : boolean
let gameContainerElement : HTMLElement
let svgHiddenLayerElement : HTMLElement
let audioThemeElement : HTMLAudioElement
let audioThemeToggleElement : HTMLElement, 
    audioThemeCrossElement : HTMLElement
let isAudioThemeDisabled : boolean
let joinButtonElement : HTMLElement
let loadingContainerParentElement : HTMLElement,
    startButtonElement : HTMLButtonElement
let lotoTableContainerElement : HTMLElement,
    playingContainerElement : HTMLElement,
    randomedLotoArrayTable: number[][],
    markedLotoArrayTable: number[][],
    markedContainerElement : HTMLElement,
    svgCellGroupElement : HTMLElement,
    svgCellMarkedElement : HTMLElement,
    lotoTableFirstColumnRange : number[]
let resultContainerElement : HTMLElement
let clickSound : HTMLAudioElement
let nextNumberCallButtonElement: HTMLButtonElement
let resultBackButtonElement: HTMLElement,
    resultWinPointList : string[]
let notCalledNumberList : number[],
    exceptCallNumberList : number[],
    calledNumberListElement : HTMLElement,
    calledNumberList : number[],
    calledNumberCheckButtonElement : HTMLButtonElement,
    calledNumberCheckContainerParentElement : HTMLElement,
    calledNumberCheckContainerElement : HTMLElement,
    calledNumberCheckCloseButtonElement : HTMLElement,
    calledNumberCheckListElement : HTMLElement
let yaySound : HTMLAudioElement

function init() {    
    isHost = false
    markedLotoArrayTable = []
    isAudioThemeDisabled = false
    clickSound = new Audio(AUDIO_PATH.CLICK)
    yaySound = new Audio(AUDIO_PATH.YAY)
    
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

    calledNumberList = []
    notCalledNumberList = []
    resultWinPointList = []
    exceptCallNumberList = [10, 20, 30, 40, 50, 60, 70, 80]
    for (let i = 1; i <= 89; i++) {
        if (exceptCallNumberList.indexOf(i) >= 0) {
            continue
        }
        notCalledNumberList.push(i)
    }

    debugElement = document.getElementById(HTML_ELEMENT_ID.DEBUG) as HTMLDivElement
    gameContainerElement = document.getElementById(HTML_ELEMENT_ID.GAME_CONTAINER)
    svgHiddenLayerElement = document.getElementById(HTML_ELEMENT_ID.SVG_HIDDEN_LAYER)
    audioThemeElement = document.getElementById(HTML_ELEMENT_ID.AUDIO_THEME) as HTMLAudioElement
    audioThemeToggleElement = document.getElementById(HTML_ELEMENT_ID.SVG_MUSIC_NOTE)
    audioThemeCrossElement = document.getElementById(HTML_ELEMENT_ID.SVG_MUSIC_NOTE_CROSS)
    joinButtonElement = document.getElementById(HTML_ELEMENT_ID.SVG_JOIN_BUTTON)
    loadingContainerParentElement = document.getElementById(HTML_ELEMENT_ID.LOADING_CONTAINER_PARENT)
    lotoTableContainerElement = document.getElementById(HTML_ELEMENT_ID.LOTO_TABLE_CONTAINER)
    startButtonElement = document.getElementById(HTML_ELEMENT_ID.START_BUTTON) as HTMLButtonElement
    playingContainerElement = document.getElementById(HTML_ELEMENT_ID.PLAYING_CONTAINER)
    markedContainerElement = document.getElementById(HTML_ELEMENT_ID.MARKED_CONTAINER)
    svgCellGroupElement = document.getElementById(HTML_ELEMENT_ID.SVG_CELL_GROUP)
    svgCellMarkedElement = document.getElementById(HTML_ELEMENT_ID.SVG_CELL_MARKED)
    resultContainerElement = document.getElementById(HTML_ELEMENT_ID.RESULT_CONTAINER)
    nextNumberCallButtonElement = document.getElementById(HTML_ELEMENT_ID.NEXT_NUMBER_BUTTON) as HTMLButtonElement
    calledNumberListElement = document.getElementById(HTML_ELEMENT_ID.CALLED_NUMBER_LIST)
    resultBackButtonElement = document.getElementById(HTML_ELEMENT_ID.RESULT_BACK_BUTTON)
    calledNumberCheckButtonElement = document.getElementById(HTML_ELEMENT_ID.CALLED_NUMBER_CHECK_BUTTON) as HTMLButtonElement
    calledNumberCheckContainerParentElement = document.getElementById(HTML_ELEMENT_ID.CALLED_NUMBER_CHECK_CONTAINER_PARENT)
    calledNumberCheckContainerElement = document.getElementById(HTML_ELEMENT_ID.CALLED_NUMBER_CHECK_CONTAINER)
    calledNumberCheckCloseButtonElement = document.getElementById(HTML_ELEMENT_ID.CALLED_NUMBER_CHECK_CLOSE_BUTTON)
    calledNumberCheckListElement = document.getElementById(HTML_ELEMENT_ID.CALLED_NUMBER_CHECK_LIST)
}

function setup() {
    svgHiddenLayerElement.style.display = 'none'
    audioThemeCrossElement.style.display = 'none'

    addAudioThemeToggleEvent()
    addJoinEvent()
    addStartGameEvent()
    addNextNumberCallButtonEvent()
    addResultBackButtonEvent()
    addCalledNumberCheckButtonEvent()
}

function loop() {

}

// Template
import loadingContainerParentTemplate from './app/template/loadingcontainerparent'
import playingContainerTemplate from './app/template/playingcontainer'
import resultContainerTemplate from './app/template/resultcontainer'
import calledNumberCheckContainerParentTemplate from './app/template/callednumbercheckcontainerparent'
import markedContainerTemplate from "./app/template/markedContainer";

function renderDocumentTemplate() {
    let templateHead = compile(document.head.innerHTML)
    let dataHead = {
        staticPath: PATH.STATIC,
    }
    document.head.innerHTML = templateHead(dataHead)

    let template = compile(document.body.innerHTML)
    let data = {
        loadingContainerParent: loadingContainerParentTemplate,
        playingContainer: playingContainerTemplate,
        resultContainer: resultContainerTemplate,
        calledNumberCheckContainerParent: calledNumberCheckContainerParentTemplate,
        markedContainer: markedContainerTemplate
    }
    document.body.innerHTML = template(data)
}

window.addEventListener("DOMContentLoaded", function() {
    renderDocumentTemplate()
    init()
    setup()
    loop()
    document.body.style.removeProperty('display')
})

function addCalledNumberCheckButtonEvent() {
    calledNumberCheckButtonElement.addEventListener('click', async _ => {
        calledNumberCheckContainerParentElement.style.display = 'grid'
        await delay(10)
        calledNumberCheckContainerElement.style.transform = 'scale(1)'
        calledNumberCheckContainerElement.style.opacity = '0.98'
    })
    calledNumberCheckCloseButtonElement.addEventListener('click', async _ => {
        calledNumberCheckContainerElement.style.transform = 'scale(0.1)'
        calledNumberCheckContainerElement.style.opacity = '0.1'
        await delay(550)
        calledNumberCheckContainerParentElement.style.display = 'none'
    })
}

function addResultBackButtonEvent() {
    resultBackButtonElement.addEventListener('click', _ => {
        markedContainerElement.style.removeProperty('display')
        resultContainerElement.style.display = 'none'
        playingContainerElement.style.display = 'grid'
        for (let i = 0; i < resultWinPointList.length; i++) {
            let point = resultWinPointList[i].split(',') 
            document.getElementById(`svg-cell-${point[0]}-${point[1]}`).children[0].classList.add('highlight-win-called-number')
        }
        let lotoTableContainerClonedElement = lotoTableContainerElement.cloneNode(true)
        lotoTableContainerElement.remove()
        playingContainerElement.prepend(lotoTableContainerClonedElement)
        let markedContainerClonedElement = markedContainerElement.cloneNode(true) as HTMLElement
        markedContainerElement.innerHTML = markedContainerClonedElement.innerHTML
        nextNumberCallButtonElement.outerHTML = (nextNumberCallButtonElement.cloneNode(true) as HTMLElement).outerHTML
        nextNumberCallButtonElement = document.getElementById(HTML_ELEMENT_ID.NEXT_NUMBER_BUTTON) as HTMLButtonElement
        nextNumberCallButtonElement.style.background = "#C70039"
        nextNumberCallButtonElement.innerText = "Chơi lại"
        nextNumberCallButtonElement.addEventListener('click', _ => {
            location.reload()
        })
    })
}

function addNextNumberCallButtonEvent() {
    nextNumberCallButtonElement.addEventListener('click', async _ => {  
        let randomedNumberForCallIndex = randomInt(0, notCalledNumberList.length - 1)
        let randomedNumberForCall = notCalledNumberList[randomedNumberForCallIndex]
        googleVoiceCallNumber(randomedNumberForCall)
        calledNumberList.push(randomedNumberForCall)
        calledNumberList = calledNumberList.sort((a, b) => a - b)
        calledNumberCheckListElement.innerText = (() : string => {
            let temp : string = ''
            for (let i = 0; i < calledNumberList.length; i++) {
                temp += calledNumberList[i] + " "
            }
            return temp
        })()
        notCalledNumberList.splice(randomedNumberForCallIndex, 1)
        calledNumberListElement.lastElementChild.remove()
        let calledNumberContainerElement = document.createElement('div')
        let innerDivElement = document.createElement("div")
        innerDivElement.style.transform = `translate(${randomInt(-200, 200)}px, ${randomInt(-200, 200)}px) rotate(${randomInt(-360, 360)}deg)`
        innerDivElement.innerText = randomedNumberForCall.toString()
        calledNumberContainerElement.append(innerDivElement)
        calledNumberListElement.prepend(calledNumberContainerElement)
        let nextSiblingOfCalledNumberContainerElement = calledNumberContainerElement.nextSibling as HTMLElement
        if (nextSiblingOfCalledNumberContainerElement.style) {
            nextSiblingOfCalledNumberContainerElement.style.backgroundColor = "#0E1113"
        }
        await delay(10)
        innerDivElement.style.transform = "translate(0, 0) rotate(0)"
        calledNumberContainerElement.style.backgroundColor = "rgba(50, 207, 235, 0.521)"
    })
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
                let newSVGCellGroupElement = document.createElementNS('http://www.w3.org/2000/svg','svg')
                let isInFisrtColumnRange = (lotoTableFirstColumnRange.indexOf(randomedLotoArrayTable[i][j]) >= 0) ? true : false
                newSVGCellGroupElement.setAttribute('width', '37px')
                newSVGCellGroupElement.setAttribute('height', '60px')
                newSVGCellGroupElement.setAttribute('viewBox', `${isInFisrtColumnRange ? -470 : -445} 250 75 153`)
                if (randomedLotoArrayTable[i][j] != -1) {
                    newSVGCellGroupElement.setAttribute('style', 'cursor: pointer')
                }
                newSVGCellGroupElement.setAttribute('version', '1.1')
                newSVGCellGroupElement.innerHTML += svgCellGroupElement.outerHTML
                newSVGCellGroupElement.children[0].removeAttribute('id')
                newSVGCellGroupElement.children[0].setAttribute('id', `${OTHER.SVG_CELL_PREFIX}-` + i + '-' + j)
                newPlayingTableRowElement.appendChild(newSVGCellGroupElement)
            }
            lotoTableContainerElement.innerHTML += newPlayingTableRowElement.outerHTML
        }
    
        let pickedColor = "#" + OTHER.RANDOM_CELL_COLORS[randomInt(0, OTHER.RANDOM_CELL_COLORS.length - 1)]
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let svgCellElement = document.getElementById(`${OTHER.SVG_CELL_PREFIX}-` + i + '-' + j)
                if (randomedLotoArrayTable[i][j] != -1) {
                    svgCellElement.children[1].children[0].innerHTML = randomedLotoArrayTable[i][j].toString()
                } else {
                    svgCellElement.children[1].children[0].innerHTML = ''
                    let rect = svgCellElement.children[0] as HTMLElement
                    rect.style.fill = pickedColor
                }
            }
        }

        let childrenOfPlayingContainerElement = lotoTableContainerElement.children
        for (let i = 0; i < 9; i++) {
            let childrenOfPlayingTableRowElement = childrenOfPlayingContainerElement[i].children
            for (let j = 0; j < 9; j++) {
                childrenOfPlayingTableRowElement[j].addEventListener('click', _ => {
                    if (randomedLotoArrayTable[i][j] != -1) {
                        let el = document.getElementById('svg-cell-' + i + '-' + j)
                        clickSound.play()
                        
                        // Mark
                        let isInFisrtColumnRange = (lotoTableFirstColumnRange.indexOf(randomedLotoArrayTable[i][j]) >= 0) ? true : false
                        let newSVGMarkElement = document.createElementNS('http://www.w3.org/2000/svg','svg')
                        newSVGMarkElement.setAttribute('version', '1.1')
                        newSVGMarkElement.setAttribute('id', `${OTHER.SVG_MARKED_PREFIX}-${i}-${j}`)                       
                        newSVGMarkElement.setAttribute('width', '37px')
                        newSVGMarkElement.setAttribute('height', '80px')
                        newSVGMarkElement.setAttribute('viewBox', `${isInFisrtColumnRange ? -450 : -490} 450 175 233`)
                        newSVGMarkElement.setAttribute('style', `position: absolute; z-index: 10; left: ${getPosition(el, 'top left').x}px; top: ${getPosition(el, 'top left').y}px; cursor: pointer`)
                        newSVGMarkElement.innerHTML += svgCellMarkedElement.outerHTML
                        newSVGMarkElement.children[0].removeAttribute('id')
                        markedContainerElement.appendChild(newSVGMarkElement)
                        document.getElementById(`${OTHER.SVG_MARKED_PREFIX}-${i}-${j}`).addEventListener('click', e => {
                            let currentSVGMarked = e.currentTarget as HTMLElement
                            currentSVGMarked.remove()
                            markedLotoArrayTable[i][j] = 0
                        })
                        
                        markedLotoArrayTable[i][j] = 1

                        // Check win ?
                        let count = 0
                        // Scan vertical
                        for (let k = 0; k < 9; k++) {
                            if (markedLotoArrayTable[k][j] === 1) {
                                count++
                                resultWinPointList.push(k.toString() + ',' + j.toString())
                            }
                        }
                        if (count === 5) {
                            win()
                            return
                        }
                        resultWinPointList = []
                        count = 0
                        // Scan horizontal
                        for (let k = 0; k < 9; k++) {
                            if (markedLotoArrayTable[i][k] === 1) {
                                count++
                                resultWinPointList.push(i.toString() + ',' + k.toString())
                            }
                        }
                        if (count === 5) {
                            win()
                            return
                        }
                        resultWinPointList = []
                    }
                })
            }
        }
    })
}

function win() {
    playingContainerElement.style.display = 'none'
    markedContainerElement.style.display = 'none'
    resultContainerElement.style.display = 'flex'
    yaySound.play()
}