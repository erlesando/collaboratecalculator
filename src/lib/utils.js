// constants and helper functions...
const operatorsigns = "+-*//×/g/÷/g"
const numbers = "0123456789"

export function is_operator(value) {
    if (value=""){
        return false;
    } else if (operatorsigns.includes(value)){
        return true;
    } else {
        return false;
    }
}
export const is_number = (value) => numbers.includes(value)
export const lastchar = (value) => value[value.length-1]