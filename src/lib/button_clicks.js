// import the utils.js file
import { is_operator, is_number, lastchar } from "./utils.js";

// import calculate
import { calculate } from "./calculate.js";

// To remove everything in input, when clicking "C" button
export const reset_calculator = (input_string, equalstate) => {
    input_string = "";
    equalstate = false; 
    return {input_string, equalstate};
}

// To remove last item in input, when clicking backspace
export const backspace = (input_string, equalstate) => {
    
    if (input_string.length > 0 && !equalstate){
        input_string = input_string.slice(0, -1);
    } else {
        input_string = "";
        equalstate = false;
    }
    return {input_string, equalstate};
}

export const number_click = (input_string, equalstate, value) => {

    // If Error reset input on next onclick
    if (input_string === "Error") {
        input_string = value;
    } else {
        // If last number equals zero, do not add zeros (except after commas)
        let split = (/[+-/×/g/÷/g]/.test(input_string) ? input_string.split(/[\+\-\/×/g\/÷/g]/) : [input_string]);
        let res = (split.length !== 1 ? Number(lastchar(split)) : (split[0] === "" ? "NaN" : Number(split)));
        if (!is_operator(lastchar(input_string)) && res === 0 && value === "0" && !/,/.test(lastchar(split))) {
            // do not change input
        } else {
            input_string = (!equalstate ? input_string + value.toString() : value);
        }
    }
    equalstate = false;
    return {input_string, equalstate};
}

// When clicking +,-,*,/,√,. or ,
export function operator_click(input_string, equalstate, value) {
    let log = "";
    // If comma
    if (value === ",") {
        // If comma in number, dont add another comma
        if (!equalstate) {
            let split = (/[+-/×/g/÷/g]/.test(input_string) ? input_string.split(/[\+\-\/×/g\/÷/g]/) : "");

            // if comma is pressed first in empty input or first after an operator, add a zero in front
            if (input_string === "" || (is_operator(lastchar(input_string.toString())))) {
                input_string = input_string + "0,";
                return {input_string, equalstate, log};
            } else if (/,/.test(lastchar(split))) {
                return {input_string, equalstate, log};
            }
        } else {
            input_string = "0,"
            equalstate = false
            return {input_string, equalstate, log};
        }
    }

    // Allow minus as first character, do not allow other operators to start
    if (input_string === "" && is_operator(value)) {
        if (value === "-") {
            input_string = input_string + value;
            return {input_string, equalstate, log};
        } else {
            return {input_string, equalstate, log};
        }
    }

    // Allow minus after operator except for minus
    if (value === "-" && is_operator(lastchar(input_string.toString()))) {
        if (lastchar(input_string.toString()) === "-") {
            return {input_string, equalstate, log};
        } else {
            input_string = input_string + value;
            return {input_string, equalstate, log};                        
        }
    }

    // Avoid multiple operators right after eachother
    if (value !== "-" && (is_operator(lastchar(input_string.toString())) || lastchar(input_string.toString()) === "√") && (is_operator(value) || value === ",")) {
        if (value === ",") {
            input_string = input_string + "0,";
        }
        // if last operator is same
        return {input_string, equalstate, log};
    }    

    // calculate squareroot of number if equalstate
    if (equalstate && value === "√") {
        ({input_string, equalstate, log} = calculate_result("√"+input_string));
        return {input_string, equalstate, log};
    }

    // Allow √ as first character
    if (input_string === "" && value === "√") {
        input_string = value;
        return {input_string, equalstate, log};
    }

    // If Error reset input on next onclick
    if (input_string === "Error" || input_string === "NaN") {
        input_string = "";
    } else {
        input_string = (!equalstate || is_operator(value) ? input_string + value.toString() : value);
        equalstate = false;
    }
    return {input_string, equalstate, log};
}

// When hitting Enter or equal button
export function calculate_result(input_string) {
    let log = input_string;    
    let equalstate = false;
    // if input is empty or last character is operator, return
    if (input_string === "" || is_operator(lastchar(input_string))|| lastchar(input_string) === "√" || input_string === "Error" || input_string === "NaN") {
        return {input_string, equalstate, log};
    } else {
        try {
            let result = calculate(input_string);
            input_string = result.toString().replace(".", ",");    
            equalstate = true;
        } catch (e) {
            console.error(e);
            input_string = "Error";
        }
    }
    return {input_string, equalstate, log}
}

// To use keys
export function handle_keypress(input_string, equalstate, key) {
    document.getElementById("input").focus()
    let log = "";
    if (/^\d$/.test(key)) {
        ({input_string, equalstate} = number_click(input_string, equalstate, key));
    } else if (/[+\-]/.test(key)) {
        ({input_string, equalstate, log} = operator_click(input_string, equalstate, key));
    } else if (key === "*") {
        ({input_string, equalstate, log} = operator_click(input_string,equalstate, "×"));
    } else if (key === "/") {
        ({input_string, equalstate, log} = operator_click(input_string, equalstate, "÷"));
    } else if (key === "," || key === ".") {
        ({input_string, equalstate, log} = operator_click(input_string, equalstate, ","));
    } else if (key === "Enter" || key === "=") {
        ({input_string, equalstate, log} = calculate_result(input_string));
    } else if (key === "Escape") {
        ({input_string, equalstate} = reset_calculator(input_string, equalstate));
    } else if (key === "Backspace") {
        ({input_string} = backspace(input_string, equalstate));
    }
    return {input_string, equalstate, log}
}