<script>
	let equalstate = $state(0);
    let inputString = $state("");
    let inputFloat = $state(0);

    function calculate(expression) {
        const operatorsigns = "+-*/"

        // Replace ×, ÷ and comma
        expression = expression.replace(/×/g, "*").replace(/÷/g, "/");
        expression = expression.replace(/,/g, ".");

        // Replace √
        expression = expression.replace(/√(\d+(\.\d+)?)/g, (match, number) => {
            return "*" + Math.sqrt(parseFloat(number)); // Erstatt √9 med 3
        });
        function splitExpression(expression) {
            return expression.split(/([+\-*/])/).filter(item => item.trim() !== "");
        }
        
        let expressionarray = splitExpression(expression);

        let numberofoperators = 0;
        let numberofnumbers = 0;
        let removeoperators = [];
        let changenumbers = [];

        // Fjerning av * foran kvadratrot når flere * er tilstede
        for (let i = 0; i < expressionarray?.length; i++) {
            if (operatorsigns.includes(expressionarray[i])) {
                numberofoperators++;
            } else {
                numberofnumbers++;
            }
            if ((operatorsigns.includes(expressionarray[i-1]) && expressionarray[i] === "*") || (expressionarray[0] === "*" && i === 0)) {
                expressionarray.splice(i, 1);
            }
            if ((operatorsigns.includes(expressionarray[i-1]) && expressionarray[i] === "-") || (expressionarray[0] === "-" && i === 0)) {
                    removeoperators.push(numberofoperators-1);
                    changenumbers.push(numberofnumbers);
            }
        }
        // Get numbers and operators
        let expressionString = expressionarray.join("");
        let numbers = expressionString.match(/\d+(\.\d+)?/g).map(Number);
        let operators = expressionString.match(/[+\-*/]/g);   

        for (let i = 0; i < removeoperators.length; i++) {
            operators.splice(removeoperators[i], 1);
            numbers[changenumbers] = -numbers[changenumbers[i]]
        }

        // Beregn resultatet trinnvis, først * og /, deretter + og -
        for (let i = 0; i < operators?.length; i++) {
            if (operators[i] === "*") {
                let firstNumber = numbers[i];
                let nextNumber = numbers[i + 1];
                let tempResult = firstNumber * nextNumber;
                numbers.splice(i, 2, tempResult);
                operators.splice(i, 1);
            }
        }
        for (let i = 0; i < operators?.length; i++) {
            if (operators[i] === "/") {
                let firstNumber = numbers[i];
                let nextNumber = numbers[i + 1];
                if (nextNumber === 0) {
                    inputString = "Error";
                    equalstate = 1;
                    return;
                }
                let tempResult = firstNumber / nextNumber;
                numbers.splice(i, 2, tempResult);
                operators.splice(i, 1);
            }
        }
        let result = numbers[0];
        for (let i = 0; i < operators?.length; i++) {
            let nextNumber = numbers[i + 1];
            switch (operators[i]) {
                case "+": result += nextNumber; break;
                case "-": result -= nextNumber; break;
            }
        }
        inputString = Math.round(result * 100000000) / 100000000;
        inputString = inputString.toString().replace(".", ",");
        return result;
    }

    function trykkTast(event) {
        const key = event.key;
        if (/^\d$/.test(key)) {
            onButtonClick (key, 'number');6
        } else if (/[+\-*/=]/.test(key)) {
            onButtonClick (key, 'operator');
        }else if (key === "," || key === ".") {
            onButtonClick (",", 'skilletegn');
        } else if (key === "Enter") {
            onButtonClick ('=', 'operator');
        } else if (key === "Escape") {
            onButtonClick ('C', 'operator');
        } else if (key === "Backspace") {
            onButtonClick ('backspace', 'operator');
        }
    }

    function onButtonClick(value) {
        const operatorsigns = "+-/×/g/÷/g"
        const numbers = "0123456789"

        //C - Reset calculator
        if (value === "C"){
            inputString = "";
            equalstate = 0;
        // Backspace, remove last character
        } else if (value === "backspace"){
            if (inputString.length > 0){
                inputString = inputString.slice(0,-1);
            } else {
                inputString = "";
            }
            equalstate = 0;
        } else {
            // If number
            if (numbers.includes(value)) {
                // If empty, dont add 0;
                if (inputString === "" && value === 0){
                    return;
                }
            // If not number
            } else {
                // If comma
                if(value === ",") {
                    // If comma, dont add new comma
                    if (equalstate === 0) {
                        let split = (/[+-/×/g/÷/g]/.test(inputString) ? inputString.split(/[\+\-\/×/g\/÷/g]/) : "");
                        if (/,/.test(split[split.length-1]) || (operatorsigns.includes(inputString[inputString.length-1]) && value === ",")) {
                            return;
                        }
                    } else {
                        return;
                    }
                }
                // Alow minus as first character and after operator
                if (inputString === "" && operatorsigns.includes(value)) {
                    if (value === "-") {
                        inputString = inputString + value;
                        return;
                    } else {
                        return;                        
                    }
                }

                // Allow minus after operator except for minus
                if (operatorsigns.includes(inputString[inputString.length-1]) && value === "-") {
                    if (inputString[inputString.length-1] === "-") {
                        return;
                    } else {
                        inputString = inputString + value;
                        return;                        
                    }
                }

                // Alow √ as first character
                if (inputString === "" && value === "√") {
                    inputString = value;
                    return;
                }
                //If equal 
                if (value === "=") {
                    calculate(inputString);
                    equalstate = 1;
                    return;
                }
                //If last operator is same
                else if (operatorsigns.includes(inputString[inputString.length-1]) && operatorsigns.includes(value) && value !== "-") {
                    return;
                }
            }
            if (inputString === "Error") {
                inputString = "";
            } else {
                inputString = (equalstate === 0 || operatorsigns.includes(value) ? inputString + value.toString() : value);
                equalstate = 0;
            }
        }
    }
</script>

<!-- Tastaturinput -->
<svelte:window on:keydown={trykkTast} />

<div class="box outer">
    <input class="box inputbox" style="color:black" readonly value={inputString}>	
    
    <div class="buttoncontainer">
        <!-- Rader 3 til 7 med 4 kolonner -->
        <button class="operator" onclick={() => onButtonClick("C")}>C</button>
        <button class="operator" onclick={() => onButtonClick("backspace")}><img src="images/backspace_25dp.svg"></button>
        <button class="operator" onclick={() => onButtonClick("√")}>√</button>
        <button class="operator" onclick={() => onButtonClick("÷")}>÷</button>

        <button class="number" onclick={() => onButtonClick(7)}>7</button>
        <button class="number" onclick={() => onButtonClick(8)}>8</button>
        <button class="number" onclick={() => onButtonClick(9)}>9</button>
        <button class="operator" onclick={() => onButtonClick("×")}>×</button>
        
        <button class="number" onclick={() => onButtonClick(4)}>4</button>
        <button class="number" onclick={() => onButtonClick(5)}>5</button>
        <button class="number" onclick={() => onButtonClick(6)}>6</button>
        <button class="operator" onclick={() => onButtonClick("-")}>-</button>
        
        <button class="number" onclick={() => onButtonClick(1)}>1</button>
        <button class="number" onclick={() => onButtonClick(2)}>2</button>
        <button class="number" onclick={() => onButtonClick(3)}>3</button>
        <button class="operator" onclick={() => onButtonClick("+")}>+</button>
        
        <button class="number zero" onclick={() => onButtonClick(0)}>0</button>
        <button class="number" onclick={() => onButtonClick(",")}>,</button>
        <button class="equal" onclick={() => onButtonClick("=")}>=</button>        
    </div>

</div>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=backspace');
    .buttoncontainer {
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

    .operator{
        font-size:20px;
        background:lightgray;
    }
    
    .operator:hover{
        background:rgb(173, 173, 173);
    }

    .number{
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
        margin-left: 5px;
		font-size:25px;
		background-color: white;
		text-align: right;
		padding: 5px 5px;
		position: relative;
        grid-column: span 4;
	}
</style>