import { is_operator, is_number, lastchar } from "./utils.js";

// functionality...
export function calculate(expression) {
    const operatorsigns = "+-*/"

    // Replace ×, ÷ and comma
    expression = expression.replace(/×/g, "*").replace(/÷/g, "/");
    expression = expression.replace(/,/g, ".");

    // Replace √
    expression = expression.replace(/√(\d+(\.\d+)?)/g, (match, number) => {
        return "*" + Math.sqrt(parseFloat(number)); // Erstatt √9 med 3
    });

    // when large numbers
    if (expression.includes("e+")) {
        let coeff = expression.split("e+")[0];
        let exponent = expression.split(/([+\-*/])/)[2];
        let expnumber = Number(coeff) * 10**Number(exponent)
        let expstring = coeff + "e+" + exponent;
        expression = expression.replace(expstring, expnumber);
    }

    if (expression.includes("e-")) {
        let coeff = expression.split("e-")[0];
        console.log("coeff: ", coeff, "length:", coeff.length)
        let exponent = expression.split(/([+\-*/])/)[2];
        let expnumber = (Number(coeff) / 10**Number(exponent)).toFixed(Number(exponent)+4)
        let expstring = coeff + "e-" + exponent;
        expression = expression.replace(expstring, expnumber);
        
    }
    function split_expression(expression) {
        return expression.split(/([+\-*/])/).filter(item => item.trim() !== "");
    }

    let expressionarray = split_expression(expression);
    let numberofoperators = 0;
    let numberofnumbers = 0;
    let removeoperators = [];
    let changenumbers = [];


/*     numberofnumbers = expressionarray.filter((expression) => /[0-9+]/g.test(expression)}).length
    numberofoperators = expressionarray.length - numberofnumbers 
    console.log('numbers: ', numberofnumbers, 'ops', numberofoperators) */

    // Fjerning av * foran kvadratrot når flere * er tilstede
    if (expressionarray[0] === "*") {
        expressionarray.splice(0, 1);
    }
    if (expressionarray[0] === "-"){
        removeoperators.push(0)
        changenumbers.push(0)
    }
    for (let i = 0; i < expressionarray?.length; i++) {
        if (is_operator(expressionarray[i])) {
            numberofoperators++;
        } else {
            numberofnumbers++;
        }
        if (i > 0) {
            if ((is_operator(expressionarray[i-1]) && expressionarray[i] === "*")) {
                expressionarray.splice(i, 1);
            }
            
            if ((is_operator(expressionarray[i-1]) && expressionarray[i] === "-") || (expressionarray[0] === "-" && i === 0)) {
                    removeoperators.push(numberofoperators-1);
                    changenumbers.push(numberofnumbers);
            }              
        }
    }

    // Get numbers and operators
    let expression_string = expressionarray.join("")
    let numbers = expression_string.match(/\d+(\.\d+)?/g).map(Number)
    let operators = expression_string.match(/[+\-*/]/g)

    for (let i = 0; i < removeoperators.length; i++) {
        operators.splice(removeoperators[i], 1)
        removeoperators = removeoperators.map(x => x-1)
        numbers[changenumbers[i]] = -numbers[changenumbers[i]]
    }
    // Beregn resultatet trinnvis, først * og /, deretter + og -

    for (let i = 0; i <= operators?.length; i++) {
        if (operators[i] === "*") {
            let first_number = numbers[i]
            let next_number = numbers[i + 1]
            let temp_result = first_number * next_number
            numbers.splice(i, 2, temp_result)
            operators.splice(i, 1)
            i = i-1
        } else if (operators[i] === "/") {
            let first_number = numbers[i];
            let next_number = numbers[i + 1];
            if (next_number === 0) {
                throw new Error ("divide by zero");
            }
            let temp_result = first_number / next_number;
            numbers.splice(i, 2, temp_result);
            operators.splice(i, 1);
            i = i - 1
        }
    }

    let result = numbers[0];
    for (let i = 0; i < operators?.length; i++) {
        let next_number = numbers[i + 1];
        switch (operators[i]) {
            case "+": result += next_number; break;
            case "-": result -= next_number; break;
        }
    }    
    return result;
}