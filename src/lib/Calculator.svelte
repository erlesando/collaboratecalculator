<script>
    import { calculate } from "./calculate.js";
    import { is_operator, is_number, lastchar } from "./utils.js";

	let equalstate = $state(false);
    let input_string = $state("");

    function handle_keypress(event) {
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

    // lagt inn i input_handlers
    const reset_calculator = () => {
        input_string = "";
        equalstate = false; 
    }

    // lagt inn i input_handlers
    const backspace = () => {
        if (input_string.length > 0){
            input_string = input_string.slice(0, -1);
        } else {
            input_string = "";
        }
    }

    // lagt inn i handle_clicks
    const calculate_result = (string) => {

        // if input is empty or last character is operator, return
        if (string === "" || is_operator(lastchar(string))) {
            return;
        } else {
            try {
                let result = calculate(string)

                if ((result < 10000000 && result > 0.0000001) || (result > -10000000 && result < -0.0000001) || result === 0) {
                    input_string = Math.round(result * 1000000) / 1000000;
                } else {
                    input_string = result.toExponential(4);
                }

                input_string = input_string.toString().replace(".", ",");    

            } catch (e) {
                input_string = "Error"
                equalstate = true
            }

            equalstate = true
        }
    }

    // lagt inn i input_handlers
    const number_click = (value) => {
        // If Error reset input on next onclick
        if (input_string === "Error") {
            input_string = "";
        } else {
            input_string = (!equalstate || is_operator(value) ? input_string + value.toString() : value);
            equalstate = false;
        }
    }

    // lagt inn i input_handlers
    function operator_click(value) {
        
        // If comma
        if (value === ",") {
            // If comma, dont add new comma
            if (!equalstate) {
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
            input_string = (!equalstate || is_operator(value) ? input_string + value.toString() : value);
            equalstate = false;
        }
    }
</script>


<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="bordered calculator" onkeydown={() => handle_keypress(event)}>
    <input class="bordered inputbox" style="color:black" readonly value={input_string}>	
    
    <div class="button-container">
        <button class="operator" onclick={reset_calculator}>C</button>
        <button aria-label="Backspace" class="operator" onclick={backspace}><img alt="Backspace" src="images/backspace_25dp.svg"></button>
        <button class="operator" onclick={() => operator_click("√")}>√</button>
        <button class="operator" onclick={() => operator_click("÷")}>÷</button>

        <button class="number" onclick={() => number_click(7)}>7</button>
        <button class="number" onclick={() => number_click(8)}>8</button>
        <button class="number" onclick={() => number_click(9)}>9</button>
        <button class="operator" onclick={() => operator_click("×")}>×</button>
        
        <button class="number" onclick={() => number_click(4)}>4</button>
        <button class="number" onclick={() => number_click(5)}>5</button>
        <button class="number" onclick={() => number_click(6)}>6</button>
        <button class="operator" onclick={() => operator_click("-")}>-</button>
        
        <button class="number" onclick={() => number_click(1)}>1</button>
        <button class="number" onclick={() => number_click(2)}>2</button>
        <button class="number" onclick={() => number_click(3)}>3</button>
        <button class="operator" onclick={() => operator_click("+")}>+</button>
        
        <button class="number zero" onclick={() => number_click(0)}>0</button>
        <button class="number" onclick={() => operator_click(",")}>,</button>
        <button class="equal" onclick={() => calculate_result(input_string)}>=</button>        
    </div>

</div>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=backspace');

    /*
        Variables can be used to store values that can be reused throughout the component.
        They are declared with two dashes (--) and can be used in the style block.

        It is also useful to define the top-level entity (in this case, the calculator) 
        at the top of the style block.
    */
    .calculator {
        --space: 1rem;   /* general space between elements */
        --font-size: 20px;
        --button-height: 50px;
        --button-width: 50px;

        --border-color: black;
        --border: 2px solid var(--border-color);
        --border-radius: 0.5em;

        --color-number: #f0f0f0;
        --color-operator: lightgray;
        --color-equal: orange;

		background-color: darkgray;
		text-align: center;

        /* space between calculator innards and edge of calculator */
        padding: var(--space);
    }

    /*
        Utility classes (classes that add one property to an item) can be very useful
        when styling components.
    */
    .bordered {
        border: var(--border);
		border-radius: var(--border-radius);        
    }

    button {
        border: 1px solid var(--border-color);
		border-radius: 6px;
        background-color: var(--button-background);  /* --button-background is defined in the operator, number, and equal classes */
        font-size: var(--font-size);
        aspect-ratio: 1/1;

        &:hover {
            background: color-mix(in srgb, var(--button-background), black 4%);
        }
	}

	.inputbox {
        /* padding inside inputbox (make it relative to 1 character ~ 1ch) */
        padding-block: 1ch;
        padding-inline: 1ch;

        /* space between inputbox and button-container */
        margin-bottom: var(--space);

        font-size: 25px;
		background-color: white;
		text-align: right;
	}

    .button-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(5, 1fr);
        gap: 5px;
    }

    .operator { --button-background: var(--color-operator); }
    .number { --button-background: var(--color-number); }
    .equal { --button-background: var(--color-equal); }

    .zero {
        grid-column: span 2;
        grid-row: span 1;
        aspect-ratio: 2.1;  /* magic number */
    }

</style>