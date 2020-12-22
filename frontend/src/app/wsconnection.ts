import * as signalR from "@microsoft/signalr"
import * as ConfigConst from './const/config'

export var connection = new signalR.HubConnectionBuilder()
    .withUrl(ConfigConst.HOST_URL)
    .build();

export function startConnection() {
    connection.start()
}