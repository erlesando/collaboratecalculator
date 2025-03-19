// import the utils.js file
import { is_operator, is_number, lastchar } from "./utils.js";

// import calculate
import { calculate } from "./calculate.js";

export const reset_calculator = (input_string, equalstate) => {
    input_string = "";
    equalstate = false; 
    return {input_string, equalstate}
}

export const backspace = (input_string, equalstate) => {
    if (input_string.length > 0 && !equalstate){
        input_string = input_string.slice(0, -1);
    } else {
        input_string = "";
    }
    return {input_string}
}

export const number_click = (input_string, equalstate, value) => {

    // If Error reset input on next onclick
    if (input_string === "Error") {
        input_string = value;
    } else {
        input_string = (!equalstate ? input_string + value.toString() : value);
        equalstate = false;
    }
    return {input_string, equalstate}
}

export function operator_click(input_string, equalstate, value) {
    // If comma
    if (value === ",") {
        // If comma, dont add new comma
        if (!equalstate) {
            let split = (/[+-/×/g/÷/g]/.test(input_string) ? input_string.split(/[\+\-\/×/g\/÷/g]/) : "");
            if (/,/.test(lastchar(split)) || input_string === "" || (is_operator(lastchar(input_string))) ) {
                return {input_string, equalstate};
            }
        } else {
            return {input_string, equalstate};
        }
    }

    // Allow minus as first character and after operator
    if (input_string === "" && is_operator(value)) {
        if (value === "-") {
            input_string = input_string + value;
            return {input_string, equalstate};
        } else {
            return {input_string, equalstate};
        }
    }

    // Allow minus after operator except for minus
    if (value === "-" && is_operator(lastchar(input_string))) {
        if (lastchar(input_string) === "-") {
            return {input_string, equalstate};
        } else {
            input_string = input_string + value;
            return {input_string, equalstate};                        
        }
    }

    // Allow √ as first character
    if (input_string === "" && value === "√") {
        input_string = value;
        return {input_string, equalstate};
    }

    if (value !== "-" && (is_operator(lastchar(input_string.toString())) || lastchar(input_string) === "√") && is_operator(value) ) {
        // if last operator is same
        return {input_string, equalstate};
    }

    // If Error reset input on next onclick
    if (input_string === "Error" || input_string === "NaN") {
        input_string = "";
    } else {
        input_string = (!equalstate || is_operator(value) ? input_string + value.toString() : value);
        equalstate = false;
    }

    return {input_string, equalstate}
}

export function calculate_result(input_string) {
    let equalstate = false;
    // if input is empty or last character is operator, return
    if (input_string === "" || is_operator(lastchar(input_string))|| lastchar(input_string) === "√" || input_string === "Error" || input_string === "NaN") {
        return {input_string, equalstate};
    } else {
        try {
            let result = calculate(input_string)

            if ((result < 10000000 && result > 0.000001) || (result > -10000000 && result < -0.000001) || result === 0) {
                input_string = Math.round(result * 1000000) / 1000000;
            } else {
                input_string = result.toExponential(4);
            }

            input_string = input_string.toString().replace(".", ",");    
            equalstate = true
        } catch (e) {
            console.error(e)
            input_string = "Error"
        }
    }
    return {input_string, equalstate}
}

export function handle_keypress(input_string, equalstate, key) {
    if (/^\d$/.test(key)) {
        ({input_string, equalstate} = number_click(input_string, equalstate, key));
    } else if (/[+\-]/.test(key)) {
        ({input_string, equalstate} = operator_click(input_string, equalstate, key));
    } else if (key === "*") {
        ({input_string, equalstate} = operator_click(input_string,equalstate, "×"));
    } else if (key === "/") {
        ({input_string, equalstate} = operator_click(input_string, equalstate, "÷"));
    } else if (key === "," || key === ".") {
        ({input_string, equalstate} = operator_click(input_string, equalstate, ","));
    } else if (key === "Enter" || key === "=") {
        ({input_string, equalstate} = calculate_result(input_string));
    } else if (key === "Escape") {
        ({input_string, equalstate} = reset_calculator(input_string, equalstate));
    } else if (key === "Backspace") {
        ({input_string} = backspace(input_string, equalstate));
    }
    return {input_string, equalstate}
}

