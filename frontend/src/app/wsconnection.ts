import * as signalR from "@microsoft/signalr"
import * as ConfigConst from './const/path'

export var connection = new signalR.HubConnectionBuilder()
    .withUrl(ConfigConst.HOST_SIGNALR)
    .build();

export function startConnection() {
    connection.start()
}