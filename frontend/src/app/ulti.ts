import { type } from "os";

export function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * max) + min;
}

export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export enum GetPositionType {
    TopLeft,
    TopCenter,
    TopRight,
    CenterLeft,
    Center,
    CenterRight,
    BottomLeft,
    BottomCenter,
    BottomRight
}

export function getPosition(element: HTMLElement, position: string) {
    const { top, left, width, height } = element.getBoundingClientRect();
    let point;
    switch (position) {
        case "top left":
            point = {
                x: left + window.pageXOffset,
                y: top + window.pageYOffset
            };
            break;
        case "top center":
            point = {
                x: left + width / 2 + window.pageXOffset,
                y: top + window.pageYOffset
            };
            break;
        case "top right":
            point = {
                x: left + width + window.pageXOffset,
                y: top + window.pageYOffset
            };
            break;
        case "center left":
            point = {
                x: left + window.pageXOffset,
                y: top + height / 2 + window.pageYOffset
            };
            break;
        case "center":
            point = {
                x: left + width / 2 + window.pageXOffset,
                y: top + height / 2 + window.pageYOffset
            };
            break;
        case "center right":
            point = {
                x: left + width + window.pageXOffset,
                y: top + height / 2 + window.pageYOffset
            };
            break;
        case "bottom left":
            point = {
                x: left + window.pageXOffset,
                y: top + height + window.pageYOffset
            };
            break;
        case "bottom center":
            point = {
                x: left + width / 2 + window.pageXOffset,
                y: top + height + window.pageYOffset
            };
            break;
        case "bottom right":
            point = {
                x: left + width + window.pageXOffset,
                y: top + height + window.pageYOffset
            };
            break;
    }
    return point;
};