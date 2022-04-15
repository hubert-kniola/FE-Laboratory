<script>
    import {createEventDispatcher} from 'svelte';
    export let title;
    export let body;
    export let id;
    export let index;

    const dispatch = createEventDispatcher();

    const onRemove = () => {
        dispatch('remove', id);
    }
</script>

<h3>{title}</h3>
<div>{body}</div>

<textarea bind:value={body} />

<buton on:click={onRemove}>REMOVE</buton>