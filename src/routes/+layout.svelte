<script lang="ts">
    import '../app.css';
    import {fly} from 'svelte/transition';

    let {data, children} = $props();
</script>
<main>
    {#key data.url}
        <div
                in:fly={{x:100, duration: 300,delay: 100}}
                out:fly={{x:-100, duration: 100}}
        >
            {@render children()}
        </div>
    {/key}
</main>
