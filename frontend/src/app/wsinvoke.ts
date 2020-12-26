import { connection } from './wsconnection'

export async function activeListenersAsync() {
    document.getElementById('btn').addEventListener('click', () => {
        connection.invoke("Test")
    })
}