<script>
    import Button from "./Button.svelte";
    import { onMount } from "svelte"

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
        calculate_result
        } from "./button_clicks.js"

    // Prevent doucle click zooming
    onMount(() => {
        const preventDoubleClickZoom = (event) => {
            event.preventDefault(); // Block double-click zoom
        };

        document.getElementById("input").focus(); // Automatically focuses the calculator div
        document.addEventListener("dblclick", preventDoubleClickZoom, { passive: false });
    });

    function handle_keypress(input_string, equalstate, key) {
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

	let equalstate = $state(false);
    let input_string = $state("");
    let log = $state("");
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="bordered calculator" onkeydown={() => ({input_string, equalstate, log} = handle_keypress(input_string, equalstate, event.key))}>
    <div class="bordered inputbox" style="color:black">
        <input class="invisible_input log" readonly value={(equalstate ? log : "")}/> <br>
        <input id="input" class="invisible_input calc" readonly value={input_string}/>	
    </div>
    
    <div class="button-container">
        <Button type={"operator"} onclick={() => {
            ({input_string, equalstate} = reset_calculator(input_string, equalstate))
            }} sign={"C"}/>
        <Button type={"operator"} onclick={() => {
            ({input_string, equalstate} = backspace(input_string, equalstate))
            }} sign="Backspace"/>
        <Button type={"operator"} onclick={() => {
            ({input_string, equalstate, log} = operator_click(input_string, equalstate, "√"))
            }} sign={"√"}/>
        <Button type={"operator"} onclick={() => {
            ({input_string, equalstate, log} = operator_click(input_string, equalstate, "÷"))
            }} sign="÷"/>

        <Button type={"number"} onclick={() => {
            ({input_string, equalstate} = number_click(input_string, equalstate, "7"))
            }} sign="7"/>
        <Button type={"number"} onclick={() => {
            ({input_string, equalstate} = number_click(input_string, equalstate, "8"))
            }} sign="8"/>
        <Button type={"number"} onclick={() => {
            ({input_string, equalstate} = number_click(input_string, equalstate, "9"))
            }} sign="9"/>
        <Button type={"operator"} onclick={() => {
            ({input_string, equalstate, log} = operator_click(input_string, equalstate, "×"))
            }} sign="×"/>

        <Button type={"number"} onclick={() => {
            ({input_string, equalstate} = number_click(input_string, equalstate, "4"))
            }} sign="4"/>
        <Button type={"number"} onclick={() => {
            ({input_string, equalstate} = number_click(input_string, equalstate, "5"))
            }} sign="5"/>
        <Button type={"number"} onclick={() => {
            ({input_string, equalstate} = number_click(input_string, equalstate, "6"))
            }} sign="6"/>
        <Button type={"operator"} onclick={() => {
            ({input_string, equalstate, log} = operator_click(input_string, equalstate, "-"))
            }} sign="-"/>

        <Button type={"number"} onclick={() => {
            ({input_string, equalstate} = number_click(input_string, equalstate, "1"))
            }} sign="1"/>
        <Button type={"number"} onclick={() => {
            ({input_string, equalstate} = number_click(input_string, equalstate, "2"))
            }} sign="2"/>
        <Button type={"number"} onclick={() => {
            ({input_string, equalstate} = number_click(input_string, equalstate, "3"))
            }} sign="3"/>
        <Button type={"operator"} onclick={() => {
            ({input_string, equalstate, log} = operator_click(input_string, equalstate, "+"))
            }} sign="+"/>

        <Button type={"number zero"} onclick={() => {
            ({input_string, equalstate} = number_click(input_string, equalstate, "0"))
            }} sign="0"/>
        <Button type={"number"} onclick={() => {
            ({input_string, equalstate, log} = operator_click(input_string, equalstate, ","))
            }} sign=","/>
        <Button type={"equal"} onclick={() => {
            ({input_string, equalstate, log} = calculate_result(input_string))
            }} sign="="/>
    </div>
</div>


<style>
    /*
        Variables can be used to store values that can be reused throughout the component.
        They are declared with two dashes (--) and can be used in the style block.

        It is also useful to define the top-level entity (in this case, the calculator) 
        at the top of the style block.
    */
    .calculator {
        --space: 4vw;   /* general space between elements */
        --font-size: 7vw;

        --border-color: black;
        --border: 2px solid var(--border-color);
        --border-radius: 0.5em;

		background-color: darkgray;
		text-align: center;

        /* space between calculator innards and edge of calculator */
        margin-left: auto;
        margin-top: auto;
        padding: var(--space);
        width: 90%;
    }

    /*
        Utility classes (classes that add one property to an item) can be very useful
        when styling components.
    */
    .bordered {
        border: var(--border);
		border-radius: var(--border-radius);      
    }

    .invisible_input {
        width: 90%;
        caret-color: transparent;

        /* padding inside inputbox (make it relative to 1 character ~ 1ch) */
        padding-block: 0.5ch;
        padding-inline: 0.5ch;

		background-color: white;
		text-align: right;
        border: none;
        outline: none;
	}

    .log {
        color: gray;
        font-size: calc(2*var(--font-size) / 3);
	}

    .calc {
        color: black;
        font-size: var(--font-size);
    }

	.inputbox {
        /* padding inside inputbox (make it relative to 1 character ~ 1ch) */
        padding-block: 1ch;
        padding-inline: 1ch;

        /* space between inputbox and button-container */
        margin-bottom: var(--space);

		background-color: white;
		text-align: right;
	}

    .button-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(5, 1fr);
        gap: 1vw;
    }
</style>