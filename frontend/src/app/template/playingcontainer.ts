import * as HTML_ELEMENT_ID from '../const/htmlelementid'
const template = `
<div id="${HTML_ELEMENT_ID.PLAYING_CONTAINER}" style="display: none;">
    <div id="${HTML_ELEMENT_ID.LOTO_TABLE_CONTAINER}"></div>
    <div id="${HTML_ELEMENT_ID.PLAYING_SETTINGS}">
        <div id="${HTML_ELEMENT_ID.PLAYING_BUTTON_CONTAINER}">
            <button class="button" id="${HTML_ELEMENT_ID.NEXT_NUMBER_BUTTON}">Gọi số</button>
            <button class="button" id="${HTML_ELEMENT_ID.CALLED_NUMBER_CHECK_BUTTON}">Danh sách</button>
        </div>
        <div id="${HTML_ELEMENT_ID.CALLED_NUMBER_LIST}">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</div>
`
export default template