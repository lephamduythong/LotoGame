export function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * max) + min;
}

export function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}