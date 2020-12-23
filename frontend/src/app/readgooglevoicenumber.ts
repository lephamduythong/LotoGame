import { GOOGLE_VOICE_NUMBER_PATH } from './const/audiopath'
import { delay } from './ulti'

const AUDIO_FILE_EXTENSION = 'mp3'

const AUDIO_NUMBER_1_ELEMENT : HTMLAudioElement = new Audio(GOOGLE_VOICE_NUMBER_PATH + '1.' + AUDIO_FILE_EXTENSION)
const AUDIO_NUMBER_2_ELEMENT : HTMLAudioElement = new Audio(GOOGLE_VOICE_NUMBER_PATH + '2.' + AUDIO_FILE_EXTENSION)
const AUDIO_NUMBER_3_ELEMENT : HTMLAudioElement = new Audio(GOOGLE_VOICE_NUMBER_PATH + '3.' + AUDIO_FILE_EXTENSION)
const AUDIO_NUMBER_4_ELEMENT : HTMLAudioElement = new Audio(GOOGLE_VOICE_NUMBER_PATH + '4.' + AUDIO_FILE_EXTENSION)
const AUDIO_NUMBER_5_ELEMENT : HTMLAudioElement = new Audio(GOOGLE_VOICE_NUMBER_PATH + '5.' + AUDIO_FILE_EXTENSION)
const AUDIO_NUMBER_6_ELEMENT : HTMLAudioElement = new Audio(GOOGLE_VOICE_NUMBER_PATH + '6.' + AUDIO_FILE_EXTENSION)
const AUDIO_NUMBER_7_ELEMENT : HTMLAudioElement = new Audio(GOOGLE_VOICE_NUMBER_PATH + '7.' + AUDIO_FILE_EXTENSION)
const AUDIO_NUMBER_8_ELEMENT : HTMLAudioElement = new Audio(GOOGLE_VOICE_NUMBER_PATH + '8.' + AUDIO_FILE_EXTENSION)
const AUDIO_NUMBER_9_ELEMENT : HTMLAudioElement = new Audio(GOOGLE_VOICE_NUMBER_PATH + '9.' + AUDIO_FILE_EXTENSION)

export async function googleVoiceCallNumber(num: number) {
    if (num >= 1 && num <= 9) {
        let audioElement : HTMLAudioElement
        switch (num) {
            case 1:
                audioElement = AUDIO_NUMBER_1_ELEMENT
                stopAudio(audioElement)
                break
            case 2:
                audioElement = AUDIO_NUMBER_2_ELEMENT
                stopAudio(audioElement)
                break
            case 3:
                audioElement = AUDIO_NUMBER_3_ELEMENT
                stopAudio(audioElement)
                break
            case 4:
                audioElement = AUDIO_NUMBER_4_ELEMENT
                stopAudio(audioElement)
                break
            case 5:
                audioElement = AUDIO_NUMBER_5_ELEMENT
                stopAudio(audioElement)
                break
            case 6:
                audioElement = AUDIO_NUMBER_6_ELEMENT
                stopAudio(audioElement)
                break
            case 7:
                audioElement = AUDIO_NUMBER_7_ELEMENT
                stopAudio(audioElement)
                break
            case 8:
                audioElement = AUDIO_NUMBER_8_ELEMENT
                stopAudio(audioElement)
                break
            case 9:
                audioElement = AUDIO_NUMBER_9_ELEMENT
                stopAudio(audioElement)
                break
        }
        audioElement.play()
        return
    }
    let dozenPos = Math.floor(num / 10)
    let unitPos = num % 10
    googleVoiceCallNumber(dozenPos)
    await delay(600)
    googleVoiceCallNumber(unitPos)
}

function stopAudio(el: HTMLAudioElement) {
    el.pause()
    el.currentTime = 0
}