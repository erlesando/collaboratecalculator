import { is_operator, is_number, lastchar } from "./utils.js";

// event handlers...
export function handle_keypress(event) {
    const key = event.key;
    if (/^\d$/.test(key)) {
        number_click(key);
    } else if (/[+\-]/.test(key)) {
        operator_click(key);
    } else if (key === "*") {
        operator_click("×");
    } else if (key === "/") {
        operator_click("÷");
    } else if (key === "," || key === ".") {
        operator_click(",");
    } else if (key === "Enter" || key === "=") {
        calculate_result(input_string);
    } else if (key === "Escape") {
        reset_calculator();
    } else if (key === "Backspace") {
        backspace();
    }
}

export function operator_click(value) {
        
    // If comma
    if (value === ",") {
        // If comma, dont add new comma
        if (equalstate === 0) {
            let split = (/[+-/×/g/÷/g]/.test(input_string) ? input_string.split(/[\+\-\/×/g\/÷/g]/) : "");
            if (/,/.test(split[split.length-1]) || (is_operator(lastchar(input_string)) && value === ",")) {
                return;
            }
        } else {
            return;
        }
    }

    // Allow minus as first character and after operator
    if (input_string === "" && is_operator(value)) {
        if (value === "-") {
            input_string = input_string + value;
            return;
        } else {
            return;                        
        }
    }

    // Allow minus after operator except for minus
    if (is_operator(lastchar(input_string)) && value === "-") {
        if (lastchar(input_string) === "-") {
            return;
        } else {
            input_string = input_string + value;
            return;                        
        }
    }

    // Allow √ as first character
    if (input_string === "" && value === "√") {
        input_string = value;
        return;
    }

    if (is_operator(input_string[input_string.length-1]) && is_operator(value) && value !== "-") {
        // if last operator is same
        return;
    }

    // If Error reset input on next onclick
    if (input_string === "Error") {
        input_string = "";
    } else {
        input_string = (equalstate === 0 || is_operator(value) ? input_string + value.toString() : value);
        equalstate = 0;
    }
}

export const number_click = (value) => {
    // If Error reset input on next onclick
    if (input_string === "Error") {
        input_string = "";
    } else {
        input_string = (equalstate === 0 || is_operator(value) ? input_string + value.toString() : value);
        equalstate = 0;
    }
}

export const reset_calculator = () => {
    input_string = "";
    equalstate = 0;
}

export const backspace = () => {
    if (input_string.length > 0){
        input_string = input_string.slice(0, -1);
    } else {
        input_string = "";
    }
}

export const calculate_result = (string) => {
    // if input is empty or last character is operator, return
    if (string === "" || is_operator(lastchar(string))) {
        return;
    } else {
        throw new error("calculate result")
        calculate(string);
        equalstate = 1;
    }
}