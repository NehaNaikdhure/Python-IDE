
function getCodeFromLocalStorage() {
    return localStorage.getItem('code');
}
function saveCodeToLocalStorage(code:string) {
    localStorage.setItem('code', code);
}

export { getCodeFromLocalStorage, saveCodeToLocalStorage }