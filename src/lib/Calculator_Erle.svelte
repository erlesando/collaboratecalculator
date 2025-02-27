<script>
	let displayed = $state("");
	let equalstate = $state(0);
	let buttons = ["CE","C", "(", ")", "7","8","9","/","4","5","6","x","1","2","3","-","0",".","+","="]

	
	function checkIfAllowed(key) {
		const allowedKeys = "0123456789+-*/()=.";
		const allowedKeys2 = ["Enter", "Backspace", "Shift", "ArrowRight", "ArrowLeft"]
		if (allowedKeys.includes(key) || allowedKeys2.includes(event.key)) {
			return key;
		} else {
			return alert("Not allowed key")
		}
	}
	function dotAllowed(str) {
		let allowed = true;
		const parts = str.split(".");
		const lastPart = parts[parts.length - 1]; 
		
		if (!str.includes(".")){
			return allowed = true
		} else {
			return isNaN(lastPart);
		}
	}

	function endParaAllowed(str) {
		let allowed = true;
		const startPara = str.split("("); 
		const endPara = str.split(")"); 
		const numberOfstartPara = startPara.length - 1;
		const numberOfendPara = endPara.length - 1;
		return numberOfstartPara > numberOfendPara
	}

	function checkPara(str) {
		let allowed = true;
		const startPara = str.split("("); 
		const endPara = str.split(")"); 
		const numberOfstartPara = startPara.length - 1;
		const numberOfendPara = endPara.length - 1;
		return numberOfstartPara === numberOfendPara;
	}

	function checkAllowedEval(str) {
		let allowed = true;
		let alertMessage = "";
		const allowedChars = "0123456789+-*/()."
		const signs = "+-*/."
		if (!isNaN(displayed)) {
			alertMessage = "Input do not contain any operators";
			allowed = false;
		} else if (!checkPara(str)) {
			alertMessage = "Input does not contain equal amount of start and end paranthesis";
			allowed = false;
		} else if (![...str].every(char => allowedChars.includes(char))) {
			alertMessage = "Input contains characters that is not allowed";
			allowed = false;
		} else if (signs.includes(str[str.length-1])) {
			alertMessage = "Input ends with an operator";
			allowed = false;
		}
		return [allowed, alertMessage];
	}

	function evaluate(str) {
		const parts = str.match(/\d+\.\d+|\d+|[+\-*/()]/g);
		let paraStart = parts.indexOf("(")
		let paraEnd = parts.lastIndexOf(")")
		let insidePara;

		while (paraStart !== -1) {
			insidePara = parts.slice(paraStart+1,paraEnd)
			let paraStart = insidePara.indexOf("(");
			let paraEnd = insidePara.lastIndexOf(")");
		}
	}

	function appendToDisplay(event) {
		const numbers = "0123456789";
		if (event instanceof KeyboardEvent) {
			event.preventDefault();
		}
		
		if (event instanceof KeyboardEvent && checkIfAllowed(event.key)) {
			event = event.key;
		} else if (event === "x") {
			event = "*";
		}

		switch (true) {
			case numbers.includes(event):	
				displayed = (equalstate === 1 ? event :  (displayed[displayed.length-1] === ")" ? displayed.toString() : displayed.toString() + event.toString()));
				equalstate = 0;
				break;
			case event === "*" || event === "/":
				const notAllowed1 = "+-*/.(";
				displayed = (notAllowed1.includes(displayed[displayed.length-1]) || displayed === "" ?  displayed : displayed + event);
				equalstate = 0;
				break;
			case  event === ".":
				const notAllowed2 = "+-*/.(";
				displayed = (equalstate === 1 ? event : (notAllowed2.includes(displayed[displayed.length-1]) || !dotAllowed(displayed) ?  displayed : displayed + event));
				equalstate = 0;
				break;
			case event === "+" || event === "-":
				const notAllowed3 = "+-*/.";
				displayed = (notAllowed3.includes(displayed[displayed.length-1]) ?  displayed : displayed + event);
				equalstate = 0;
				break;
			case event === "(":
				const notAllowed4 = "0123456789.)";
				displayed = (equalstate === 1 ? event : (notAllowed4.includes(displayed[displayed.length-1]) ? displayed : displayed + event));
				equalstate = 0;
				break;
			case event ===")":
				const notAllowed5 = "(./*+-";
				if (equalstate === 0 && endParaAllowed(displayed)) {
					displayed = (notAllowed5.includes(displayed[displayed.length-1]) || displayed === "" ? displayed : displayed + event)
					equalstate = 0;
				} 
				break;
			case event === "CE":
				displayed = "";
				equalstate = 0;
				break;
			case event === "C" || event === "Backspace":
				displayed = (equalstate === 1 ? "" :  displayed.slice(0, -1));
				equalstate = 0;
				break;
			case event === "=" || event === "Enter":
				if (checkAllowedEval(displayed)[0]) {
					displayed = eval(displayed);
					equalstate = 1;
				} else {
					console.log(checkAllowedEval(displayed)[1]);
				}
				break;
		}
	return(displayed)
    }
</script>

<div class="box outer">
	<input class="box inputbox" style="color:black" bind:value={displayed} onkeydown={appendToDisplay}>	
	{#each buttons as button}
		<button onclick={() => appendToDisplay(button) } style="font-weight: bold" style:background-color={(button === "=" ? 'orange' : 'darkwhite')}>{button}</button>
	{/each}
</div>
<style>
	.box {
		border: 2px solid black;
		border-radius: 0.5em;
	}

	button {
		width:50px;
		height:50px;
		border: 1px solid black;
		position: relative;
		top: 20px;
		margin: 2.5px;
		border-radius: 6px
	}

	.outer {
		width: 250px;
		height: 380px;
		background-color: darkgray;
		text-align: center;
		margin: 100px;
	}

	.inputbox {
		width: 225px;
		height: 40px;
		margin-top: 15px;
		font-size:25px;
		background-color: white;
		text-align: right;
		padding: 5px 5px;
		position: relative;
	}
</style>