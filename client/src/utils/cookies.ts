import Cookies from 'js-cookie'

function setRefreshToken(token: string) {
    return Cookies.set('refresh_token', token)
}

function getRefreshToken() {
    return Cookies.get('refresh_token')
}

function clearRefreshToken() {
    return Cookies.remove('refresh_token')
}

export {
    getRefreshToken,
    setRefreshToken,
    clearRefreshToken
}