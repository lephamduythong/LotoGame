import './styles/style.scss';
import './styles/constant.scss'
import { compile, registerHelper, registerPartial, escapeExpression, SafeString } from 'handlebars'

console.log(window.getComputedStyle(document.body).getPropertyValue('----myCustomVariable'))

// 1. Expression
// 1.1 Basic
// let template = compile(`<p>{{text1}} - {{text2}}</p>`)
// let data = {
//     text1: 'a',
//     text2: 'b'
// }
// let result1 = template(data) 
// console.log(result)

// 1.2 Path expression "/"
// let template = compile(`<p>{{obj1/a}} - {{obj1/b}}</p>`)
// let data = {
//     obj1: {
//         a: 1,
//         b: 2
//     }
// }
// let result = template(data) 
// console.log(result)

// 1.3 Changing the context
// let template = compile(`
//     {{#each arr}}
//         {{../parent}} -- {{a}} -- {{b}}
//     {{/each}}
// `)
// let data = {
//     arr: [
//         {a: 1, b: 2},
//         {a: 10, b: 20}
//     ],
//     parent: 'test'
// }
// let result = template(data) 
// console.log(result)

// 1.4 Literal segments
// Whitespace ! " # % & ' ( ) * + , . / ; < = > @ [ \ ] ^ ` { | } ~
// true, false, null, undefined

// {{!-- wrong: {{array.0.item}} --}}
// {{!-- wrong: {{array.[0].item-class}} --}}
// {{!-- wrong: {{./true}}--}}

// let template = compile(`
//     array.[0].item: {{array.[0].item}}
//     array.[0].[item-class]: {{array.[0].[item-class]}}
//     ./[true]: {{./[true]}}
// `)
// let data = {
//     array: [
//         {
//             item: "item1",
//             "item-class": "class1",
//         },
//     ],
//     true: "yes",
// }
// let result = template(data)
// console.log(result)

// 1.5 HTML-escaping
// let template = compile(`
//     raw: {{{specialChars}}}
//     html-escaped: {{specialChars}}
// `)
// let data = {
//     specialChars: ["& < > \" ' ` ="]
// }
// let result = template(data)
// console.log(result)

// 1.6 Helpers
// 1.6.1 Basic
// let template = compile(`{{lowerCase x}} -- {{upperCase y}}`)
// let data = {
//     x: 'AAAA',
//     y: 'bbbb'
// }
// registerHelper('lowerCase', (str) => {
//     return (str as string).toLowerCase()
// })
// registerHelper('upperCase', (str) => {
//     return (str as string).toUpperCase()
// })
// let result = template(data)
// console.log(result) 

// 1.6.2 Prevent HTML-escaping of helper return values
// Use {{}} instead of {{{}}}
// let template = compile(`{{peepeebooboo text}}`)
// let data = {
//     text: "Isn't this great? \" ! \# % & ' ( ) * + , . / ; < = > @ [ \ ] ^ ` { | } ~"
// }
// registerHelper("peepeebooboo", function (text) {
//     console.log(text)
//     let result = "<b>" + escapeExpression(text) + "</b>";
//     console.log(result)
//     return new SafeString(result);
// });
// let result = template(data)
// console.log(result) // <b>Isn&#x27;t this great? &quot; ! # % &amp; &#x27; ( ) * + , . / ; &lt; &#x3D; &gt; @ [  ] ^ &#x60; { | } ~</b>

// 1.6.3 Helpers with Multiple Parameters
/* let template = compile(`{{link "See Website" url}}`)
let data = {
    url: "https://www.hihi.com"
}
registerHelper("link", function (text, url) {
    let urlEscaped = escapeExpression(url),
        textEscaped = escapeExpression(text)

    return new SafeString("<a href='" + urlEscaped + "'>" + textEscaped + "</a>");
});
let result = template(data)
console.log(result) */

// 1.6.4 Literal arguments
/* let template = compile(`{{peepeebooboo 10 true null "hahaha"}}`)
let data = {}
registerHelper("peepeebooboo", function (num, isTrueFalse, wtf, str) {
    if (num === 10) {
        console.log('OK 1')
    }
    if (isTrueFalse) {
        console.log('OK 2')
    }
    if (!wtf) {
        console.log('OK 3')
    }
    if (str === "hahaha") {
        console.log('OK 4')
    }
});
let result = template(data) */

// 1.6.5 Helpers with Hash arguments
// {{link "See Website" href=person.url class="person"}}
// https://handlebarsjs.com/examples/helper-hash-arguments.html

// 1.6.6 Disambiguating helpers calls and property lookup
// Cùng object name và cùng helper name
/* let template = compile(`
    Helper: {{name}}
    Data: {{./name}} or {{this/name}} or {{this.name}}
`)
let data = {
    name: 'Tokuda'
}
registerHelper("name", function (num, isTrueFalse, wtf, str) {
    return 'Shigeo'
});
let result = template(data)
console.log(result) */

// 1.7 Subexpressions
/* let template = compile(`
    {{outer-helper (inner-helper 'abc') 'Shigeo'}}
`)
let data = {}
registerHelper("inner-helper", function (innerHelper, str) {
    return 'Tokuda'
});
registerHelper("outer-helper", function (innerHelper, str) {
    return innerHelper + " " + str
});
let result = template(data)
console.log(result) */

// 1.8 Whitespace Control
// Gỡ bỏ các khoảng trắng bên trong chuỗi dc template
// 1.7 Subexpressions
/* let templateOld = compile(`
    {{#each nav}}
    <a href="{{url}}">
    {{#if test}}
        {{title}}
    {{^}}
        Empty
    {{/if}}
    </a>
    {{~/each}}
`)
let templateNew = compile(`
    {{#each nav ~}}
    <a href="{{url}}">
    {{~#if test}}
        {{~title}}
    {{~^~}}
        Empty
    {{~/if~}}
    </a>
    {{~/each}}
`)
let data = {
    nav: [
        { url: "foo", test: true, title: "bar" },
        { url: "bar" }
    ]
}
let resultOld = templateOld(data)
let resultNew = templateNew(data)
console.log(resultOld)
console.log(resultNew)
document.getElementById('debug1').innerHTML += resultOld
document.getElementById('debug2').innerHTML += resultNew */

// 1.9 Escaping Handlebars expressions
/* let template = compile(`
    \{{escaped}}
    {{{{raw}}}}
        {{escaped}}
    {{{{/raw}}}}
`)
let data = {
    escaped: 1
}
let result = template(data) 
console.log(result) */

// 2.Partials
// Định nghĩa một template mẫu và có thể tái sử dụng (reuse) template
// 2.1 Basic
/* registerPartial('myPartial', '{{prefix}}')
registerPartial('myPartial2', '{{prefix2}}')
let template = compile(`{{> myPartial}} -- {{> myPartial2}} -- {{> myPartial}}`)
let data = {
    prefix: 'Hello',
    prefix2: 'Hello 2'
}
let result = template(data) 
console.log(result) */


// 2.2 Dynamic Partials
/* registerPartial('dynamicPartial', '{{prefix}}')
registerHelper('whichPartial', function(context) { return context });
let template = compile(`{{> (whichPartial "dynamicPartial") }}`)
let data = {
    prefix: 'Hahaha'
}
let result = template(data) 
console.log(result) */

// 2.3 Partial Contexts
/* registerPartial('myPartial', '{{information}}')
let template = compile(`{{> myPartial myOtherContext }}`)
let data = {
    myOtherContext: {
        information: "Interesting!",
    },
}
let result = template(data)
console.log(result) */

// 2.4 Partial Parameters **
/* registerPartial('myPartial', 'The result is {{parameter}}')
let template = compile(`{{> myPartial parameter=favoriteNumber }}`)
let data = {
    favoriteNumber: 113
}
let result = template(data)
console.log(result) */

// 2.5 Partial Blocks
// Case 1: Sử dụng nếu partial đó chưa dc register
/* let template = compile(`
    {{#>myPartial}}
        Failover content 
    {{/myPartial}}
`)
let data = {
    x: 123
}
let result = template(data)
console.log(result) */

// Case 2: @partial-block, pass ngược patial block trong main template vào partial
/* registerPartial('myPartial', 'Site Content {{> @partial-block }} -- {{x}}')
let template = compile(`
    {{#>myPartial}}
        Hahahaha
    {{/myPartial}}
`)
let data = {
    x: 123
}
let result = template(data)
console.log(result) */

// 2.6 Inline Partials
// Sử dụng "*inline" decorator để define partial ngay trong template, khỏi register
/* let template = compile(`
    {{#*inline "myPartial"}}
        My Content
    {{/inline}}
    
    {{#each shit}}
        {{> myPartial}}
    {{/each}}
`)
let data = {
    shit: [1, 2]
}
let result = template(data)
console.log(result) */

// 3 Block helpers
// 3.1 Basic 


// Built-in helpers

// Hooks
