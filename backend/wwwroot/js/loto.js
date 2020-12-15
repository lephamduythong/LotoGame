"use strict";

let connection = new signalR.HubConnectionBuilder()
    .withUrl("/lotoHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
    })
    .build();

let isPlaying = false;
let isReady = false;
let isHost = false;

document.getElementById('connection-status').innerText = 'Chưa kết nối'
document.getElementById('room-status').innerText = 'Chưa tham gia'
document.getElementById('right-side').style.display = 'none'
document.getElementById('main-side').style.display = 'none'
document.getElementById('main-table').style.display = 'none'
document.getElementById('host-option').style.display = 'none'
document.getElementById('stop-button').style.display = 'none'

/* SignalR: JS -> C# */
document.getElementById("room-id-button-join").addEventListener("click", function (event) {
    connection.invoke("JoinRoom", document.getElementById('room-id-input').value, document.getElementById('name-input').value)

    document.getElementById('host-option').style.display = 'block'
});

document.getElementById("room-id-button-leave").addEventListener("click", function (event) {
    connection.invoke("LeaveRoom", document.getElementById('room-id-input').value)

    document.getElementById('player-count').innerText = ''
    document.getElementById('room-status').innerText = 'Chưa tham gia'
    document.getElementById('right-side').style.display = 'none'
    document.getElementById('main-side').style.display = 'none'
    document.getElementById('host-option').style.display = 'none'
});

document.getElementById("ready-button").addEventListener("click", function (event) {
    if (!isReady) {
        connection.invoke("Ready", document.getElementById('room-id-input').value)
        document.getElementById('main-side').style.display = 'block'
        document.getElementById('ready-button').innerText = 'Huỷ bỏ sẵn sàng'
        isReady = true;
    } else {
        connection.invoke("CancelReady", document.getElementById('room-id-input').value)
        document.getElementById('main-side').style.display = 'none'
        document.getElementById('ready-button').innerText = 'Sẵn sàng'
        isReady = false;
    }
});

document.getElementById("stop-button").addEventListener("click", function (event) {
    if (isPlaying) {
        console.log('Stop the game')
        connection.invoke("StopTheGame", document.getElementById('room-id-input').value)
        isPlaying = false;
    } else {
        console.log("Not ready all")
    }
});

document.getElementById('check-is-host').addEventListener('change', function(event) {
    if (this.checked) {
        connection.invoke("DefineHost", "yes", document.getElementById('room-id-input').value)
    } else {
        connection.invoke("DefineHost", "no", document.getElementById('room-id-input').value)
    }
})

let countPlayerInterval = setInterval(function () {
    connection.invoke("CountPlayer", document.getElementById('room-id-input').value)
}, 1000)

let checkReadyStateInterval = setInterval(function () {
    connection.invoke("CheckReadyState", document.getElementById('room-id-input').value)
}, 1000)

window.addEventListener("beforeunload", function (e) {
    e.preventDefault()
    connection.invoke("LeaveRoom", document.getElementById('room-id-input').value)
});
window.addEventListener("unload", function (e) {
    e.preventDefault()
    connection.invoke("LeaveRoom", document.getElementById('room-id-input').value)
});

/* SignalR: C# -> JS */
connection.on("NotifyNewJoin", function (name, playerHostName, isHostPlayer) {
    console.log("Other joined: " + name)

    document.getElementById('room-status').innerText = 'Đã tham gia'
    document.getElementById('right-side').style.display = 'block'
    document.getElementById("host-name").innerText = playerHostName
    if (isHostPlayer) {
        document.getElementById("check-is-host").checked = true
        isHost = true
    }
});

connection.on("NotifyJoinedState", function () {
    console.log("Joined, dont repeat")
});

connection.on("NotifyPlayerLeft", function (name) {
    console.log("Other left: " + name)
    document.getElementById('room-status').innerText = 'Chưa tham gia'
});

connection.on("CountPlayerResult", function (countResult) {
    document.getElementById('player-count').innerText = countResult
});

connection.on("StartGame", function (countResult) {
    console.log("START")
    isPlaying = true;
    clearInterval(checkReadyStateInterval)
    document.getElementById('main-table').style.display = 'block'
    document.getElementById('overlay-ready').style.display = 'none'
    if (isHost) {
        document.getElementById('stop-button').style.display = 'inline-block'
    }   
});

connection.on("NotifyPlayingRoom", function () {
    document.getElementById('room-status').innerText = 'Phòng này đang chơi'
});

connection.on("DefineHostResult", function (result, playerHostName) { 
    let definedHostRadio = document.getElementById('check-is-host');
    if (result === "defined") {
        console.log("defined")
        document.getElementById("host-name").innerText = playerHostName
        isHost = true
    } else if (result === "exist") {
        console.log("exist")
        definedHostRadio.checked = false;
        document.getElementById("host-name").innerText = playerHostName
        isHost = false
    } else if (result === "removed") {
        console.log("removed")
        document.getElementById("host-name").innerText = ''
        definedHostRadio.checked = false;
        isHost = false
    }
});

/* Start SignalR websocket */
connection.start().then(function () {
    document.getElementById('connection-status').innerText = 'Đã kết nối'
}).catch(function (err) {
    console.error(err.toString());
    document.getElementById('connection-status').innerText = 'Lỗi kết nối'
});

/* Loto table */
let mainTable = document.getElementById('main-table')

let clickSound = new Audio('audio/click.wav')
let bingSound = new Audio('audio/bing.wav')

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

function createRndArrayFromRange(start, stop) {
    let arr = []
    for (let i = start; i <= stop; i++) {
        arr.push(i)
    }
    shuffleArray(arr)
    return arr
}

function createRndArrayMask() {
    let arr = []
    for (let i = 1; i <= 5; i++) {
        arr.push(1)
    }
    for (let i = 1; i <= 4; i++) {
        arr.push(0)
    }
    shuffleArray(arr)
    return arr
}

function balanceArray(arr) {

    function swap(arr, k, j, i) {
        let temp = arr[k][j]
        arr[k][j] = arr[k][i]
        arr[k][i] = temp
    }

    let isDone = false
    while (!isDone) {
        // for (let x = 1; x < 100; x++) {
        let countColArray = []
        isDone = true

        for (let j = 0; j < 9; j++) {
            // Count every column to an temporary array
            let count = 0
            for (let i = 0; i < 9; i++) {
                if (arr[i][j] !== -1) {
                    count++
                }
            }
            countColArray.push(count)
        }

        // console.log(countColArray)

        for (let j = 0; j < 9; j++) {
            // console.log('j: ' + j)

            if (countColArray[j] > 5) {
                isDone = false
                // Find col < 5 to move to
                for (let i = j + 1; i < 9; i++) {
                    // console.log('   i: ' + i)
                    if (countColArray[i] < 5) {
                        // Find prober row to swap
                        for (let k = 0; k < 9; k++) {
                            if (arr[k][j] !== -1 && arr[k][i] === -1) {
                                swap(arr, k, j, i)
                                break
                            }
                        }
                        break
                    }
                }
            }
            else if (countColArray[j] < 5) {
                isDone = false
                // Find col > 5 to move back
                for (let i = j + 1; i < 9; i++) {
                    // console.log('   i: ' + i)
                    if (countColArray[i] > 5) {
                        // Find prober row to swap
                        for (let k = 0; k < 9; k++) {
                            if (arr[k][j] === -1 && arr[k][i] !== -1) {
                                swap(arr, k, j, i)
                                break
                            }
                        }
                        break
                    }
                }
            }

            if (isDone === false) {
                break
            }
        }
    }
}

let mainTableArray = []
let k = 1
for (let i = 1; i <= 9; i++) {
    let arr = createRndArrayFromRange(k, k + 8)
    let mask = createRndArrayMask()
    for (let j = 0; j < 9; j++) {
        arr[j] = mask[j] == 1 ? arr[j] : -1
    }
    mainTableArray.push(arr)
    k += 10
}
balanceArray(mainTableArray)

for (let i = 0; i < 9; i++) {
    let row = document.createElement('tr')
    for (let j = 0; j < 9; j++) {
        let cell = document.createElement('td')
        cell.innerText = mainTableArray[j][i] == -1 ? ' ' : mainTableArray[j][i]
        cell.addEventListener('click', () => {
            clickSound.play()
        })
        row.append(cell)
    }
    mainTable.append(row)
}

// let mainTableArray = [
//     [5, -1, -1, -1, 2, 1, 6, -1, 4],
//     [19, -1, -1, 16, -1, 15, 12, -1, 17],
//     [23, 27, -1, -1, 21, -1, -1, 22, 29],
//     [34, -1, -1, 38, 32, 33, 39, -1, -1],
//     [44, -1, 46, 48, 42, -1, -1, -1, 45],
//     [54, -1, 58, -1, -1, 55, -1, 52, 57],
//     [63, -1, -1, -1, 68, -1, 61, 66, 69],
//     [78, 75, 71, -1, 76, -1, -1, -1, 74],
//     [89, 82, 83, 84, -1, -1, -1, -1, 81],
// ]