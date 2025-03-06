<script>
    import { beforeNavigate } from "$app/navigation";

    let title = "Kalkulator";

    let inputNO = $state(0);
    let inputJS = $state(0);
    let rotation = $state(0);
    let gridDisplay = $state("grid");
    let newInput= false;
    let varOperator = "";
    let varX = $state(0);
    let varY = $state(0);
    let xSet = $state(false);
    let inputFloat = $derived(parseFloat(inputJS));
    let inputString = $derived(inputNO);
      
    function closeCalc () {
        gridDisplay = "none";
    }

    function trykkTast(event) {
        const key = event.key;
        if (/^\d$/.test(key)) {
            handleClick (key, 'number');6
        } else if (/[+\-*/=]/.test(key)) {
            handleClick (key, 'operator');
        }else if (key === "," || key === ".") {
                handleClick (",", 'skilletegn');
        } else if (key === "Enter") {
            handleClick ('=', 'operator');
        } else if (key === "Escape") {
            handleClick ('C', 'operator');
        }
    }
    
    function resetInput() {
        inputNO = 0;
        inputJS = 0;
        varX = 0;
        varY = 0;
        xSet = false;
    }

    function setValues (e){
        varY = 0;
        inputJS = varX;
        inputNO = inputJS.toString().replace('.', ",");
        varOperator = e;
    }

    function doCalculate (e) {
        newInput = true;
        
        if (!xSet) {
            //Første nummer           
            varX = inputFloat;
            varOperator = e;
            xSet = true;
            
        } else if (xSet){
            //Andre nummer
            varY = inputFloat;
            switch (varOperator){
                //Addition + 
                case "+":
                    varX = varX + varY;
                    setValues(e);
                    break;
                //Subtraction - 
                case "-":
                    varX = varX - varY
                    setValues(e);
                    break;
                //Multiplication ×
                case "*":
                    varX = varX * varY
                    setValues(e);
                    break;
                //Devide ÷
                case "/":
                    if (varY === 0) {
                        inputNO = "Kan ikke dele på 0";
                    }else{
                        varX = varX / varY
                        setValues(e);
                    }
                    break;
                //Equal =
                case "=":
                    setValues(e);
                    xSet = true;
                    break;
                default:
                    break;                       
            }
        } 
    }

    const sunnySide = () => {
        if (inputNO === "58008" || inputNO === "7734") {
            rotation +=180;
        }
    };

    function handleClick(value, type) {

        switch (type) {
            case "number":

                // New number after = 
                if (varOperator === "="){
                    inputNO = 0;
                    inputJS = 0;
                    varOperator ="";
                    xSet = false;
                }

                // Reset if new input
                if (newInput) {
                    inputNO = 0;
                    inputJS = 0;
                }
               
                // Set input
                inputNO = inputNO + value;
                inputJS = inputNO.replace(',', ".");

                // Remove integers starting with 0
                if (inputNO.startsWith("0") && !inputNO.startsWith("0,")) {
                    inputNO = inputNO.slice(1);
                }

                // Continue input
                 newInput = false;

                break;

            case "skilletegn":
                // Comma if first input
                if(newInput){
                    inputNO = 0 + value;
                    inputJS = inputNO.replace(',', ".");
                    newInput = false;
                }

                // Add comma if no comma is present
                if (!inputNO.toString().includes(",")) {
                    inputNO = inputNO + value;
                    inputJS = inputNO.replace(',', ".");
                }

                // Comma, if after = 
                if (varOperator === "="){
                    inputNO = 0 + value;
                    inputJS = inputNO.replace(',', ".");
                    varOperator ="";
                    xSet = false;
                }

                break;

            case "operator":
                //RESET
                if (value === "C"){
                    resetInput();
                // x Squared
                }else if (value === "x2") {
                    inputJS = inputJS ** 2;
                    varX = inputJS;
                    inputNO = inputJS.toString().replace('.', ",");
                    newInput = true;
                    
                // square root
                }else if (value === "rot") {
                    inputJS = Math.sqrt(inputJS);
                    varX = inputJS;
                    inputNO = inputJS.toString().replace('.', ",");
                    newInput = true;
                } else {
                    // Binary operations
                    doCalculate(value);
                 }

            default:
            break;
        }
    }
</script>

<!-- Tastaturinput -->
<svelte:window onkeydown={trykkTast} />

<div class="grid-container" style="transform: rotate({rotation}deg); display: {gridDisplay};">
    
    <div class="title" onclick={sunnySide}>{title}</div>
    <div class="close" onclick={closeCalc}>×</div>
    <input type="text" class="input-field" readonly value={inputString}>
    
    <!-- Rader 3 til 7 med 4 kolonner -->
    <button class="button operator" onclick={() => handleClick("C", "operator")}>C</button>
    <button class="button operator" onclick={() => handleClick("rot", "operator")}>&radic;</button>
    <button class="button operator" onclick={() => handleClick("x2", "operator")}>x<sup>2</sup></button>
    <button class="button operator" onclick={() => handleClick("/", "operator")}>&divide;</button>

    <button class="button number" onclick={() => handleClick("7", "number")}>7</button>
    <button class="button number" onclick={() => handleClick("8", "number")}>8</button>
    <button class="button number"  onclick={() => handleClick("9", "number")}>9</button>
    <button class="button operator" onclick={() => handleClick("*", "operator")}>&times;</button>
    
    <button class="button number" onclick={() => handleClick("4", "number")}>4</button>
    <button class="button number" onclick={() => handleClick("5", "number")}>5</button>
    <button class="button number" onclick={() => handleClick("6", "number")}>6</button>
    <button class="button operator" onclick={() => handleClick("-", "operator")}>-</button>
    
    <button class="button number" onclick={() => handleClick("1", "number")}>1</button>
    <button class="button number" onclick={() => handleClick("2", "number")}>2</button>
    <button class="button number" onclick={() => handleClick("3", "number")}>3</button>
    <button class="button operator" onclick={() => handleClick("+", "operator")}>+</button>
    
    <button class="button number zero" onclick={() => handleClick("0", "number")}>0</button>
    <button class="button number" onclick={() => handleClick(",", "skilletegn")}>,</button>
    <button class="button operator equal" onclick={() => handleClick("=", "operator")}>=</button>
</div>


<style>

    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    
    .grid-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: auto auto repeat(5, 1fr);
            gap: 3px;
            width: 300px;
            margin: auto;
            text-align: center;
            background:#f6f6f6;
            padding:10px;
            padding-top:16px;
            padding-bottom:16px;
            border-radius:8px;
            font-family:roboto;
            caret-color:transparent;
            border:solid 1px rgb(212, 212, 212);  
            transition: transform 0.3s ease; 
          }
        .title {
            grid-column: span 3;
            font-size: 16px;
            text-align:left;
        }

        .close {
            text-align:right;
            font-size:40px;
            padding:0;
            margin-top:-15px;
        }

        .close:hover {
            color:red;
            cursor:default;
            
        }
        .input-field {
            grid-column: span 4;
            padding: 10px;
            font-size: 28px;
            text-align: right;
            background:transparent;
            border:0;
        }
        .button {
            padding: 15px;
            border: none;
            font-size: 22px;
            cursor: pointer;
            background:gray;
            border-radius:4px;
            border:solid 1px rgb(212, 212, 212);  
            
        }
        .zero {
            grid-column: span 2;
        }

        .operator {
            font-size:20px;
            background:#eaeaea;
        }

        .operator sup {
            font-size: 10px;
        }

        #equal {
            background-color: rgb(49, 49, 49);
            color:white;
        }

        .number{
            font-size:20px;
            background:rgb(255, 255, 255);
        }
        .button:hover {
            background-color: rgb(209, 209, 209);
        }
    
</style>

