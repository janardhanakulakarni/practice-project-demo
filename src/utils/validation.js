/* eslint-disable */
export function validateEmail(mail) {
    if (mail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,15}$/)) {
        return true;
    }
    return false;
}
export function validateName(str) {
    if (str.match(/^[a-zA-Z ]*$/)) {
        return true;
    }
    return false;
}
export function validatePhnum(str) {
    if (str.match(/^[0-9]+$/)) {
        return true;
    }
    return false;
}

