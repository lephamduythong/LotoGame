import './styles/style.scss';
import firebase from 'firebase/app';
import 'firebase/database'
import { delay } from './app/ulti'

// Init
var app = firebase.initializeApp({
    databaseURL: "https://lotogame-deb16-default-rtdb.firebaseio.com",
    authDomain: "lotogame-deb16.firebaseapp.com",
    apiKey: "AIzaSyAZnuODonoFwHxdvDOH4FemCl1ZxNi0Hxs",
    storageBucket: "",
    messagingSenderId: "312217836160",
})

// Reference path
var dbRef = firebase.database(app).ref('/')

let createEl = document.getElementById('create') as HTMLButtonElement
let readEl = document.getElementById('read') as HTMLButtonElement
let updateEl = document.getElementById('update') as HTMLButtonElement
let deleteEl = document.getElementById('delete') as HTMLButtonElement

document.addEventListener('DOMContentLoaded', _ => {
    // CREATE
    createEl.addEventListener('click', async _ => {
        // Xoá mọi thứ ở nhánh con nào đó rồi set giá trị
        dbRef.child('a').set({
            fist_name: 'Le Pham Duy',
            last_name: 'Anh'
        }).then(_ => {
            console.log('create ok')
        }).catch((err) => {
            console.error('create error' + err)
        })
        // Append một giá trị vô nhánh child 'a'
        /* dbRef.child('a').push({
            fist_name: 'Le Pham Duy',
            last_name: 'Thong'
        }) */
    })

    readEl.addEventListener('click', _ => {
        // READ
        // Lấy 1 lần dựa trên thay đổi rồi thôi, ko listen  gì cả
        /* dbRef.once('value', (snapshot) => {
            console.log(i)
            i++
            console.log(snapshot.val())
        }) */

        // Lấy data có detect thay đổi
        /* Subscribe mode: 
            'value': phát hiện all change
            'child_added': khi có một node mới dc thêm, trả về giá trị node thêm đó
            'child_changed': khi value của node dc thay đổi
            'child_moved': khi node bị di chuyển 
            'child_removed': khi node bị xoá
        */

        // Gỡ bỏ listening khi dùng với .on
        /* let onDataChange = dbRef.on('value', (snapshot) => {
            console.log(snapshot.key)
            console.log(snapshot.val())
        }) */

        // Lấy data ở nhánh con
        dbRef.child('/a').once('value', (snapshot) => {
            console.log(snapshot.val())
        }).then(_ => {
            console.log('read ok')
        }).catch((err) => {
            console.error('read error: ' + err)
        })
    })

    updateEl.addEventListener('click', _ => {
        // UPDATE
        // Cập nhật, ko xoá toàn bộ như khởi tạo
        dbRef.child('/a').update({
            last_name: 'Thong'
        }).then(() => {
            console.log('update ok')
        }).catch((err) => {
            console.error('update error: ' + err)
        })
    })

    deleteEl.addEventListener('click', _ => {
        // DELETE
        // Xoá toàn bộ
        dbRef.child('/a').remove().then(() => {
            console.log('delete ok')
        }).catch((err) => {
            console.error('delete error: ' + err)
        })
    })
})




