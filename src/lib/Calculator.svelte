<script>
    import { 
        is_operator, 
        is_number, 
        lastchar 
        } from "./utils.js";
    import { 
        reset_calculator, 
        backspace, 
        number_click, 
        operator_click, 
        calculate_result,
        handle_keypress 
        } from "./button_clicks.js"

	let equalstate = $state(false);
    let input_string = $state("");
</script>


<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="bordered calculator" onkeydown={() => ({input_string, equalstate} = handle_keypress(input_string, equalstate, event))}>
    <input class="bordered inputbox" style="color:black" readonly value={input_string}>	
    
    <div class="button-container">
        <button class="operator" onclick={() => {
            ({input_string, equalstate} = reset_calculator(input_string, equalstate))
            }}>C</button>
        <button aria-label="Backspace" class="operator" onclick={() => {
            ({input_string} = backspace(input_string, equalstate))
            }}><img alt="Backspace" src="images/backspace_25dp.svg"></button>
        <button class="operator" onclick={() => {
            ({input_string, equalstate} = operator_click(input_string, equalstate, "√"))
            }}>√</button>
        <button class="operator" onclick={() => {
            ({input_string, equalstate} = operator_click(input_string, equalstate, "÷"))
            }}>÷</button>

        <button class="number" onclick={() => {
            ({input_string, equalstate} = number_click(input_string, equalstate, 7))
            }}>7</button>
        <button class="number" onclick={() => {
            ({input_string, equalstate} = number_click(input_string, equalstate, 8))
            }}>8</button>
        <button class="number" onclick={() => {
            ({input_string, equalstate} = number_click(input_string, equalstate, 9))
            }}>9</button>
        <button class="operator" onclick={() => {
            ({input_string, equalstate} = operator_click(input_string, equalstate, "×"))
            }}>×</button>
        
        <button class="number" onclick={() => {
            ({input_string, equalstate} = number_click(input_string, equalstate, 4))
            }}>4</button>
        <button class="number" onclick={() => {
            ({input_string, equalstate} = number_click(input_string, equalstate, 5))
            }}>5</button>
        <button class="number" onclick={() => {
            ({input_string, equalstate} = number_click(input_string, equalstate, 6))
            }}>6</button>
        <button class="operator" onclick={() => {
            ({input_string, equalstate} = operator_click(input_string, equalstate, "-"))
            }}>-</button>
        
        <button class="number" onclick={() => {
            ({input_string, equalstate} = number_click(input_string, equalstate, 1))
            }}>1</button>
        <button class="number" onclick={() => {
            ({input_string, equalstate} = number_click(input_string, equalstate, 2))
            }}>2</button>
        <button class="number" onclick={() => {
            ({input_string, equalstate} = number_click(input_string, equalstate, 3))
            }}>3</button>
        <button class="operator" onclick={() => {
            ({input_string, equalstate} = operator_click(input_string, equalstate, "+"))
            }}>+</button>
        
        <button class="number zero" onclick={() => {
            ({input_string, equalstate} = number_click(input_string, equalstate, 0))
            }}>0</button>
        <button class="number" onclick={() => {
            ({input_string, equalstate} = operator_click(input_string, equalstate, ","))
            }}>,</button>
        <button class="equal" onclick={() => {
            ({input_string, equalstate} = calculate_result(input_string))
            }}>=</button>        
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
        --font-size: 25px;

        --border-color: black;
        --border: 2px solid var(--border-color);
        --border-radius: 0.5em;

        --color-number: #f0f0f0;
        --color-operator: lightgray;
        --color-equal: orange;

		background-color: darkgray;
		text-align: center;
        transform: scale(0.8);
        transform-origin: left;

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
        aspect-ratio: 2.05;  /* magic number */
    }

</style>