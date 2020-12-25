import * as HTML_ELEMENT_ID from '../const/htmlelementid'
import * as PATH from '../const/path'
const template = `
<div id="${HTML_ELEMENT_ID.LOADING_CONTAINER_PARENT}" style="display: none;">
    <div id="${HTML_ELEMENT_ID.LOADING_CONTAINER}">
        <img style="display: block; margin: 0 auto;" src="${PATH.STATIC}/loading.gif" alt="Loading" />
        <div>Đã có 5 người tham gia</div>
        <div>Danh sách người chơi: A, B, C, X, Y, Z</div>
        <button id="${HTML_ELEMENT_ID.START_BUTTON}" class="button">Bắt đầu ngay</button>
        <div>Game sẽ bắt đầu trong 5 giây...</div>
    </div>
</div>
`
export default template