export function getLotoTableArray() {
    function shuffleArray(array: number[]) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }
    
    function createRndArrayFromRange(start: number, stop: number) {
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
    
    function balanceArray(arr: number[][]) {
    
        function swap(arr: number[][], k: number, j: number, i: number) {
            let temp: number = arr[k][j]
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
    
            for (let j = 0; j < 9; j++) {
                if (countColArray[j] > 5) {
                    isDone = false
                    // Find col < 5 to move to
                    for (let i = j + 1; i < 9; i++) {
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
    
    function transpose(arr: number[][]) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < i; j++) {
               const tmp = arr[i][j];
               arr[i][j] = arr[j][i];
               arr[j][i] = tmp;
            };
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

    transpose(mainTableArray)

    return mainTableArray
}





