import { is_operator, is_number, lastchar } from "./utils.js";

// functionality
export function calculate(expression) {
    const operatorsigns = "+-*/"

    // Replace ×, ÷ and comma
    expression = expression.replace(/×/g, "*").replace(/÷/g, "/");
    expression = expression.replace(/,/g, ".");

    // Replace √
    if (expression.includes("√")) {
        while (expression.includes("√")) {
            expression = expression.replace(/√(\d+(\.\d+)?)/g, (match, number) => {
                return "*" + Math.sqrt(parseFloat(number)); // Erstatt √9 med 3
            });

            expression = expression.replace(/√\*(\d+(\.\d+)?)/g, (match, number) => {
                return "*" + Math.sqrt(parseFloat(number)); // Erstatt √9 med 3
            });
        }
    }

    function split_expression(expression) {
        return expression.split(/([+\-*/])/).filter(item => item.trim() !== "");
    }


    let expressionarray = split_expression(expression);

    // make sure exponential numbers count as one number
    if (expressionarray[0].includes("e")) {
        if (expressionarray.length <= 3) {
            expressionarray = [expressionarray.join("")];  // If there are 3 or fewer elements, just join all
        } else {
            expressionarray = [expressionarray.slice(0, 3).join(""), ...expressionarray.slice(3)];
        }
    }
    let numberofoperators = 0;
    let numberofnumbers = 0;
    let removeoperators = [];
    let changenumbers = [];

    // Remove * in front of squareroot when multiple * have been added, plus let - be first in string
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

    // make sure exponential numbers count as one number
    if (expression_string.includes("e")) {
        let plus_or_minus = (expression[0] === "-" ? operators[1] : operators[0])
        numbers[0] = Number(numbers[0] + "e" + plus_or_minus + numbers[1])
        numbers.splice(1,1)
        operators.splice(0,1)
    }

    // use minus operator to make negative numbers where its supposed to
    for (let i = 0; i < removeoperators?.length; i++) {
        operators.splice(removeoperators[i], 1)
        removeoperators = removeoperators.map(x => x-1)
        numbers[changenumbers[i]] = -numbers[changenumbers[i]]
    }

    // Calculate first * and /, then + and -
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

    if ((result < 10000000 && result > 0.000001) || (result > -10000000 && result < -0.000001) || result === 0) {
        result = Math.round(result * 1000000) / 1000000;
    } else {
        result = result.toExponential(4);
    }
    return result;
}