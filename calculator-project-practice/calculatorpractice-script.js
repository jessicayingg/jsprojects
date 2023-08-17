let exp = '';

function addToExp(str) {
    exp += str;

    document.querySelector('.js-display').innerHTML = exp;
}

function evalExp() {

    // Try catch!!!
    try {
        document.querySelector('.js-display').innerHTML = eval(exp);
        exp = document.querySelector('.js-display').innerHTML;
    }
    catch(err) {
        document.querySelector('.js-display').innerHTML = 'INVALID';
    }
}

function clearDisplay() {
    exp = '';
    document.querySelector('.js-display').innerHTML = '';
}