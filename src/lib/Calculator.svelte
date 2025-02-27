<script>
	let displayed = $state("");
	let equalstate = $state(0);
	let buttons = ["CE","bs", "sq", "&divide;", "7","8","9","x","4","5","6","-","1","2","3","+","0",".","="]
</script>

<div class="box outer">
    <input class="box inputbox" style="color:black">	
    
    <div class="buttoncontainer">
        <!-- Rader 3 til 7 med 4 kolonner -->
        <button class="operator">C</button>
        <button class="operator"><img src="images/backspace_25dp.svg"></button>
        <button class="operator">&radic;</button>
        <button class="operator">&divide;</button>

        <button class="number">7</button>
        <button class="number">8</button>
        <button class="number">9</button>
        <button class="operator">&times;</button>
        
        <button class="number">4</button>
        <button class="number">5</button>
        <button class="number">6</button>
        <button class="operator">-</button>
        
        <button class="number">1</button>
        <button class="number">2</button>
        <button class="number">3</button>
        <button class="operator">+</button>
        
        <button class="number zero">0</button>
        <button class="number">,</button>
        <button class="equal">=</button>        
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

    .number{
        font-size:20px;
    }

    .zero {
        grid-column: span 2;
    }

    .equal {
        background: orange;
    }    

	button {
		border: 1px solid black;
		xposition: relative;
		xtop: 20px;
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