import * as HTML_ELEMENT_ID from '../const/htmlelementid'
import * as PATH from '../const/path'
const template = `
    <div id="${HTML_ELEMENT_ID.RESULT_CONTAINER}" style="display: none;">
        <div>
            <img style="width: 95vw;" src="${PATH.STATIC}/win.gif" alt="Win" />
            <div style="text-align: center; font-size: 32px;">WIN</div>
            <div style="display: flex; justify-content: center;"><button id="${HTML_ELEMENT_ID.RESULT_BACK_BUTTON}" class="button" style="background-color: #f1bb4e;">Quay trở lại</button></div>
        </div>
    </div>
`
export default template