<script>
    let {onkeydown} = $props()
    import Calculator from "$lib/Calculator.svelte";
    //import {handle_keypress} from "$lib/button_clicks"; // want to use the keys when the calc opens
</script>

<div class="container" style="display:inline-block">
    <Calculator />
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100vh;
    }
</style>