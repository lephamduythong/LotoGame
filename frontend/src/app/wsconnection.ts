import * as signalR from "@microsoft/signalr"
import { Constant } from './const'

export var connection = new signalR.HubConnectionBuilder()
    .withUrl(Constant.Config.HOST_URL)
    .build();

export function startConnection() {
    connection.start()
}