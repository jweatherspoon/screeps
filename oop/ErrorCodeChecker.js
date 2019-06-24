/**
 * Check if a number is an error 
 * @param {number} num The code to check 
 * @param {Array | number } The error code(s) to check against 
 * @returns {bool} True if the number is a provided error code 
 */
function IsError(num, errors) {
    if (!(errors instanceof Array || errors instanceof number)) {
        return false;
    }

    for (let i = 0; i < errors.length; i++) {
        if (num == errors[i]) {
            return true;
        }
    }

    return false;
}

module.exports = IsError;