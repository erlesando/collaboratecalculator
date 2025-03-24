<script>
    import Calculator from "$lib/Calculator.svelte";
</script>

<div class="container" content="initial-scale=1, maximum-scale=1, user-scalable=no">
    <Calculator />
</div>

<style>
    .container {
        display: flex;
        touch-action: none;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
</style>