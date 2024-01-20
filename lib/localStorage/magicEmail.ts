const KEY = 'magicEmail'

export const setMagicEmail = (email: string) => window.localStorage.setItem(KEY, email)

export const getMagicEmail = () => window.localStorage.getItem(KEY)

export const clearMagicEmail = () => window.localStorage.removeItem(KEY)