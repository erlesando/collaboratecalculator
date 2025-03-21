<script>
    let {type, onclick, sign} = $props();
</script>

{#if sign==="Backspace"}
    <button class="{type}" {onclick} aria-label="Backspace">
        <img alt="Backspace" src="images/backspace.svg">
    </button>
{:else}
    <button tabindex="-1" class="{type}" {onclick}>
        {sign}
    </button>
{/if}

<style>
    button {
        border: 1px solid var(--border-color);
		border-radius: 6px;
        background-color: var(--button-background);  /* --button-background is defined in the operator, number, and equal classes */
        font-size: var(--font-size);
        aspect-ratio: 1/1;

        --color-number: #f0f0f0;
        --color-operator: lightgray;
        --color-equal: orange;

        &:hover {
            background: color-mix(in srgb, var(--button-background), black 4%);
        }
	}

    .operator { --button-background: var(--color-operator); }
    .number { --button-background: var(--color-number); }
    .equal { --button-background: var(--color-equal); }

    .zero {
        grid-column: span 2;
        grid-row: span 1;
        aspect-ratio: 2.05;  /* magic number */
    }

    img {
        display: block;
        margin: auto;
        width: 50%;
    }
</style>