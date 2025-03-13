// constants and helper functions...
const operatorsigns = "+-*//×/g/÷/g"
const numbers = "0123456789"

export const is_operator = (value) => operatorsigns.includes(value)
export const is_number = (value) => numbers.includes(value)
export const lastchar = (value) => value[value.length-1]