import { type } from "os";

export function randomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function parseStringToDOM(str: string) {
    return new DOMParser().parseFromString(str, 'text/html').body.firstChild;
}

export function getPosition(element: HTMLElement, position: string) {
    let scrollLeftOffset = window.pageXOffset || document.documentElement.scrollLeft
    let scrollTopOffset = window.pageYOffset || document.documentElement.scrollTop
    const { top, left, width, height } = element.getBoundingClientRect();
    let point;
    switch (position) {
        case "top left":
            point = {
                x: left + scrollLeftOffset,
                y: top + scrollTopOffset
            };
            break;
        case "top center":
            point = {
                x: left + width / 2 + scrollLeftOffset,
                y: top + scrollTopOffset
            };
            break;
        case "top right":
            point = {
                x: left + width + scrollLeftOffset,
                y: top + scrollTopOffset
            };
            break;
        case "center left":
            point = {
                x: left + scrollLeftOffset,
                y: top + height / 2 + scrollTopOffset
            };
            break;
        case "center":
            point = {
                x: left + width / 2 + scrollLeftOffset,
                y: top + height / 2 + scrollTopOffset
            };
            break;
        case "center right":
            point = {
                x: left + width + scrollLeftOffset,
                y: top + height / 2 + scrollTopOffset
            };
            break;
        case "bottom left":
            point = {
                x: left + scrollLeftOffset,
                y: top + height + scrollTopOffset
            };
            break;
        case "bottom center":
            point = {
                x: left + width / 2 + scrollLeftOffset,
                y: top + height + scrollTopOffset
            };
            break;
        case "bottom right":
            point = {
                x: left + width + scrollLeftOffset,
                y: top + height + scrollTopOffset
            };
            break;
    }
    return point;
};