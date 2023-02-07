/* eslint-disable */
export function setItems(obj) {
    console.log(obj);
    Object.keys(obj).forEach(key => {
        localStorage.setItem(key, obj[key]);
    })
}
export function getToken() {
    return localStorage.token;
}
export function clearStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
}