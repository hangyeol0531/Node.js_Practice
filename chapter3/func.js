const {odd, even} = require('./var');
//import {odd, even} from './var';

function checkOddOrEven(num){
    if(num % 2){
        return odd;
    }
    return even;
}

module.exports = checkOddOrEven;