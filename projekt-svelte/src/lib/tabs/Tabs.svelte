<script>
  import { createEventDispatcher } from "svelte";
  let dispatch = createEventDispatcher();

  export let items;
  export let activeItem;
</script>

<div class="tabs">
  <ul>
    {#each items as item}
      <li
        class:active={item === activeItem}
        on:click={() => dispatch("tabChange", item)}
      >
        {item}
      </li>
    {/each}
  </ul>
</div>

<style>
  .tabs {
    padding: 1rem;
    border: solid 2px #d91b42;
    border-radius: 12px;
    box-shadow: #d91b42 0px 6px 12px -2px, #d91b42 0px 3px 7px -3px;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
  }
  ul {
    display: flex;
    justify-content: center;
    padding: 0;
    list-style-type: none;
  }
  li {
    font-size: 16px;
    color: rgb(160, 160, 160);
    cursor: pointer;
    border: solid 2px #d91b42;
    border-radius: 12px;
    box-shadow: #545454 0px 4px 6px -2px, #545454 0px 3px 5px -3px;
    padding: 0.5rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  li:hover {
	box-shadow: #d91b42 0px 6px 12px -2px, #d91b42 0px 3px 7px -3px;
  }

  .active {
    color: #d91b42;
	box-shadow: #d91b42 0px 4px 6px -2px, #d91b42 0px 3px 5px -3px;
  }
</style>
