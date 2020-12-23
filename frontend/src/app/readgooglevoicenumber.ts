import { GOOGLE_VOICE_NUMBER_PATH } from './const/audiopath'
import { delay } from './ulti'

const AUDIO_FILE_EXTENSION = 'mp3'
export async function googleVoiceCallNumber(num: number) {
    if (num >= 1 && num <= 9) {
        let voice : HTMLAudioElement = new Audio(GOOGLE_VOICE_NUMBER_PATH + `${num}.${AUDIO_FILE_EXTENSION}`)
        voice.play()
        return
    }
    let dozenPos = Math.floor(num / 10)
    let unitPos = num % 10
    googleVoiceCallNumber(dozenPos)
    await delay(600)
    googleVoiceCallNumber(unitPos)
}