// Change "IS_MOBILE_APP_BUILD" to true when deploy production to mobile app
const IS_MOBILE_APP_BUILD = true

export const HOST_SIGNALR = "http://192.168.1.9:5000/lotohub"
export const STATIC = (IS_MOBILE_APP_BUILD) ? 'file:///android_asset/www/assets' : '/assets'
