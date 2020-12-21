import './styles/style.scss';
import { compile, registerHelper, registerPartial, escapeExpression, SafeString } from 'handlebars'

// 1. Expression
// 1.1 Basic
// let template1 = compile(`<p>{{text1}} - {{text2}}</p>`)
// let data1 = {
//     text1: 'a',
//     text2: 'b'
// }
// let result1 = template1(data1) 
// console.log(result1)

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

// Partials

// Block helpers

// Built-in helpers

// Hooks
