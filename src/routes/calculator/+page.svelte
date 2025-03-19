<script>
    import Calculator from "$lib/Calculator.svelte";
    import CalculatorErle from "../../old calculators/Calculator_Erle.svelte";
    import CalculatorTerje from "../../old calculators/Calculator_Terje.svelte";

</script>

<div class="container">
    <Calculator />
    <!-- <CalculatorErle />
    <CalculatorTerje /> -->
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