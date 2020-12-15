import { connection } from './wsconnection'

export async function activeCallbacksAsync() {
    connection.on("TestCallback", (result) => {
        console.log(result)
    })
}

