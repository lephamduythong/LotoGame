import * as HTML_ELEMENT_ID from '../const/htmlelementid'
import * as PATH from '../const/path'
const template = `
<div id="${HTML_ELEMENT_ID.CALLED_NUMBER_CHECK_CONTAINER_PARENT}" style="display: none;">
    <div id="${HTML_ELEMENT_ID.CALLED_NUMBER_CHECK_CONTAINER}">
        <div id="${HTML_ELEMENT_ID.CALLED_NUMBER_CHECK_CLOSE_BUTTON}" style="display: grid; grid-template-columns: 10% 1fr; grid-template-rows: 1fr;">
            <div style="position: absolute; left: 20px; top: 15px; cursor: pointer; color: black; font-weight: bold;">X</div>
        </div>
        <div id="${HTML_ELEMENT_ID.CALLED_NUMBER_CHECK_LIST}">
        </div>
    </div>
</div>
`
export default template