import * as HTML_ELEMENT_ID from '../const/htmlelementid'
import * as PATH from '../const/path'
const template = `
<div id="${HTML_ELEMENT_ID.INPUT_CONTAINER}">
    <div class="input-wrapper">
      <div class="input-label">Hãy chọn một tên</div>
      <input id="input" type="text" required />
      <svg width="300" height="100" version="1.1" viewBox="-450 50 300 125">
        <use xlink:href="#svg-input"></use>
      </svg>
      <button class="button" style="background-color: #f14e4e;" id="input-close-button">Đóng</button>
      <button class="button" id="input-submit-button">OK</button>
      <div style="color: red;" id="${HTML_ELEMENT_ID.INPUT_VALIDATION}"></div>
    </div>
</div>
`
export default template