// constants and helper functions...
const operatorsigns = "+-*//×/g/÷/g"
const numbers = "0123456789"

export const is_operator = (value) => (value.length === 0 ? false : operatorsigns.includes(value))
export const is_number = (value) => (value.length === 0 ? false : numbers.includes(value))
export const lastchar = (value) => value[value.length-1]