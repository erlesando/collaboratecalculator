<script>

    function open_calculator() {
        // FIXME: find correct size for the popup
        let height = 450;
        let width = 320;
        const popup = window.open("/calculator", "Calculator", "popup, width="+ width + "px, height="+ height + "px");
        if (popup) popup.focus();
    }
</script>

<div class="container">
    <button onclick={open_calculator} class="fs-4">
        🧮 Kalkulator
    </button>
</div>

<style>
    .container {
        width: fit-content;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
    }

    .fs-4 {
        font-size: 2rem;
    }
</style>