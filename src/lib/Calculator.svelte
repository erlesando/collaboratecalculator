<script>
	let displayed = $state("");
	let equalstate = $state(0);
	let buttons = ["CE","bs", "sq", "&divide;", "7","8","9","x","4","5","6","-","1","2","3","+","0",".","="]
    let inputString = $state("");


    function onButtonClick(value) {
        //C - Restet Calc
        if (value ==="C"){
            inputString ="";
        // Back - Bacspace, remove last character
        } else if (value === "backspace"){
            inputString = inputString.slice(0,-1);
        } else {
            inputString = inputString + value;
        }
    }



</script>

<div class="box outer">
    <input class="box inputbox" style="color:black" readonly value={inputString}>	
    
    <div class="buttoncontainer">
        <!-- Rader 3 til 7 med 4 kolonner -->
        <button class="operator" on:click={() => onButtonClick("C")}>C</button>
        <button class="operator" on:click={() => onButtonClick("backspace")}><img src="images/backspace_25dp.svg"></button>
        <button class="operator" on:click={() => onButtonClick("√")}>√</button>
        <button class="operator" on:click={() => onButtonClick("÷")}>÷</button>

        <button class="number" on:click={() => onButtonClick(7)}>7</button>
        <button class="number" on:click={() => onButtonClick(8)}>8</button>
        <button class="number" on:click={() => onButtonClick(9)}>9</button>
        <button class="operator" on:click={() => onButtonClick("×")}>×</button>
        
        <button class="number" on:click={() => onButtonClick(4)}>4</button>
        <button class="number" on:click={() => onButtonClick(5)}>5</button>
        <button class="number" on:click={() => onButtonClick(6)}>6</button>
        <button class="operator" on:click={() => onButtonClick("-")}>-</button>
        
        <button class="number" on:click={() => onButtonClick(1)}>1</button>
        <button class="number" on:click={() => onButtonClick(2)}>2</button>
        <button class="number" on:click={() => onButtonClick(3)}>3</button>
        <button class="operator" on:click={() => onButtonClick("+")}>+</button>
        
        <button class="number zero" on:click={() => onButtonClick(0)}>0</button>
        <button class="number" on:click={() => onButtonClick(",")}>,</button>
        <button class="equal" on:click={() => onButtonClick("=")}>=</button>        
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
		margin: 0px;
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