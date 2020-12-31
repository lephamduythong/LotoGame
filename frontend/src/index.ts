import './index.scss';
import anime from 'animejs';

/*
Modifier (flag):
    g: global match, match toàn bộ không chỉ first
    i: case-insensitive, không phân biệt hoa hay thường
    m: multiline matching, dùng khi str có kí tự \n phân cách
*/

/* 
Method:
str
    .search(pattern): true or false
    .match(pattern): trả về chuỗi khớp với pattern !importaint
    .test(): 
    .exec():
    .replace(pattern, str_to_replace)
*/

// Named group: ?<name>

let str = `<img data-visualcompletion="media-vc-image" alt="Hình ảnh có thể có: văn bản" class="ji94ytn4 r9f5tntg d2edcug0 r0294ipz" src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/135012986_2678251229154814_3233954408280557016_n.jpg?_nc_cat=101&amp;ccb=2&amp;_nc_sid=825194&amp;_nc_ohc=GhBuBnV9ju8AX-RV7HH&amp;_nc_ht=scontent.fsgn2-4.fna&amp;oh=a816f2141f9d0b64fcd15cddc5c31c42&amp;oe=601227A8">`

const imgLinkGroup = 'imgLink'
let regex = new RegExp(`src="(?<${imgLinkGroup}>https://\\S+)"`, "i")
let result = str.match(regex).groups
console.log(result)
