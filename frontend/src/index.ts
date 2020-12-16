import './styles/style.scss';
import { startConnection } from './app/wsconnection'
import { activeListenersAsync } from './app/wsinvoke'
import { activeCallbacksAsync } from './app/wscallback'
import { delay } from './app/ulti'
import { Constant } from './app/const'

document.addEventListener("DOMContentLoaded", async () => {
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