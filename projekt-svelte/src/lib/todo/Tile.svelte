<script>
  import FaTrash from 'svelte-icons/fa/FaTrash.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  function handlePatch() {
    console.log("patch");
    dispatch('handle', {indexToOperate: index, method: "patch"})
  }

  function handleDelete() {
    console.log("delete");
    dispatch('handle', {indexToOperate: index, method: "delete"})
  }

  export let todo;
  export let index;
</script>

<div class="tile">
  <input type="checkbox" on:click={handlePatch} checked={todo.done}/>
  <span class="text">{todo.text}</span>
  <div class="trash" on:click={handleDelete}><FaTrash  color="white"/></div>
</div>

<style>
  .tile {
    display: flex;
    padding: 0.7rem;
    border: solid 2px #d91b42;
    border-radius: 12px;
    box-shadow: #8a122a 0px 3px 5px -2px, #8a122a 0px 3px 3px -3px;
    width: fit-content;
    margin-top: 0.5rem;
    color: white;
    flex-direction: row;
    min-width: 25rem;
  }

  .text{
    margin-left: 1rem;
  }

  .trash{
    display: flex;
    color:#d91b42;
    height: 15px;
    width: 15px;
    justify-content:right;
    text-align: right;
    margin-left: auto;
  }

  .trash:hover{
    color:#ffffff;
  }
</style>
