// Change "IS_MOBILE_APP_BUILD" to true when deploy production to mobile app
const IS_MOBILE_APP_BUILD = true

export const HOST_SIGNALR = "http://localhost:5000/lotohub"
export const STATIC = (IS_MOBILE_APP_BUILD) ? 'file:///android_asset/www/assets' : '/assets'