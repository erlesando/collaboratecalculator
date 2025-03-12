<script>
	let equalstate = $state(0);
    let input_string = $state("");
    let input_float = $state(0);

    // constants and helper functions...

    const operatorsigns = "+-*//×/g/÷/g"
    const numbers = "0123456789"

    const is_operator = (value) => operatorsigns.includes(value)
    const is_number = (value) => numbers.includes(value)
    const lastchar = (value) => value[value.length-1]

    // functionality...

    function calculate(expression) {
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
            let exponent = expression.split(/([+\-*/])/)[2];
            let expnumber = Number(coeff) * 10**Number(exponent)
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

        // Fjerning av * foran kvadratrot når flere * er tilstede
        for (let i = 0; i < expressionarray?.length; i++) {
            if (is_operator(expressionarray[i])) {
                numberofoperators++;
            } else {
                numberofnumbers++;
            }

            if ((is_operator(expressionarray[i-1]) && expressionarray[i] === "*") || (expressionarray[0] === "*" && i === 0)) {
                expressionarray.splice(i, 1);
            }
            
            if ((is_operator(expressionarray[i-1]) && expressionarray[i] === "-") || (expressionarray[0] === "-" && i === 0)) {
                    removeoperators.push(numberofoperators-1);
                    changenumbers.push(numberofnumbers);
            }
        }

        // Get numbers and operators
        let expression_string = expressionarray.join("");
        let numbers = expression_string.match(/\d+(\.\d+)?/g).map(Number);
        let operators = expression_string.match(/[+\-*/]/g);   

        for (let i = 0; i < removeoperators.length; i++) {
            operators.splice(removeoperators[i], 1);
            numbers[changenumbers] = -numbers[changenumbers[i]]
        }

        // Beregn resultatet trinnvis, først * og /, deretter + og -
        for (let i = 0; i < operators?.length; i++) {
            if (operators[i] === "*") {
                let first_number = numbers[i];
                let next_number = numbers[i + 1];
                let temp_result = first_number * next_number;
                numbers.splice(i, 2, temp_result);
                operators.splice(i, 1);
            }
        }

        for (let i = 0; i < operators?.length; i++) {
            if (operators[i] === "/") {
                let first_number = numbers[i];
                let next_number = numbers[i + 1];
                if (next_number === 0) {
                    input_string = "Error";
                    equalstate = 1;
                    return;
                }
                let temp_result = first_number / next_number;
                numbers.splice(i, 2, temp_result);
                operators.splice(i, 1);
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

        if (Math.abs(result < 1000000) && Math.abs(result) > 0.000001) {
            input_string = Math.round(result * 1000000) / 1000000;
        } else {
            input_string = result.toExponential(4);
        }
        
        input_string = input_string.toString().replace(".", ",");
        
        return result;
    }

    // event handlers...

    function handle_keypress(event) {
        const key = event.key;
        if (/^\d$/.test(key)) {
            number_click(key);
        } else if (/[+\-]/.test(key)) {
            on_button_click(key);
        } else if (key === "*") {
            on_button_click("×");
        } else if (key === "/") {
            on_button_click("÷");
        } else if (key === "," || key === ".") {
            on_button_click(",");
        } else if (key === "Enter" || key === "=") {
            calculate_result(input_string);
        } else if (key === "Escape") {
            reset_calculator();
        } else if (key === "Backspace") {
            backspace();
        }
    }
    

    const reset_calculator = () => {
        input_string = "";
        equalstate = 0;
    }

    const backspace = () => {
        if (input_string.length > 0){
            input_string = input_string.slice(0, -1);
        } else {
            input_string = "";
        }
    }

    const calculate_result = (string) => {
        // if input is empty or last character is operator, return
        if (string === "" || is_operator(lastchar(string))) {
            return;
        } else {
            calculate(string);
            equalstate = 1;
        }
    }

    const number_click = (value) => {
        // If Error reset input on next onclick
        if (input_string === "Error") {
            input_string = "";
        } else {
            input_string = (equalstate === 0 || is_operator(value) ? input_string + value.toString() : value);
            equalstate = 0;
        }
    }

    function operator_click(value) {
        
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
            // f last operator is same
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
</script>


<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="calculator box outer" onkeydown={handle_keypress}>
    <input class="box inputbox" style="color:black" readonly value={input_string}>	
    
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

    .button-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(5, 1fr);
        gap: 5px;
        height:280px;
        width:90%;
        margin:auto;
        margin-top:10px;
    }

	.box {
		border: 2px solid black;
		border-radius: 0.5em;
	}

    .operator {
        font-size:20px;
        background:lightgray;
    }
    
    .operator:hover {
        background:rgb(173, 173, 173);
    }

    .number {
        font-size:20px;
        background:#f0f0f0;
    }

    .number:hover {
        background:#dbdbdb;
    }

    .zero {
        grid-column: span 2;
    }

    .equal {
        background: orange;
    }
    .equal:hover {
        background: rgb(241, 160, 9);
    }        
	button {
		border: 1px solid black;
		border-radius: 6px
	}
	.outer {
		width: 250px;
		height: 380px;
		background-color: darkgray;
		text-align: center;
		margin: 50px;
	}

	.inputbox {
		width: 225px;
		height: 40px;
		margin-top: 15px;
        margin-left: auto;
		font-size:25px;
		background-color: white;
		text-align: right;
		padding: 5px 5px;
		position: relative;
        grid-column: span 4;
	}
</style>