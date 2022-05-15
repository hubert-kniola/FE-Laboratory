<script>
  import Tabs from "../lib/tabs/Tabs.svelte";

  // tabs
  let items = ["All", "ToDo", "Done"];
  let activeItem = "All";
  const tabChange = (e) => (activeItem = e.detail);

  const handleClick = () => {};
</script>

<main>
  <div class="app">
    <Tabs {activeItem} {items} on:tabChange={tabChange} />
    {#if activeItem === "All"}
      <p>poll list goes here 1</p>
    {:else if activeItem === "ToDo"}
      <p>poll list goes here 2</p>
    {:else if activeItem === "Done"}
      <p>poll list goes here 3</p>
    {/if}

    <div class="button--container">
      <input class="button--input" type="text" />
      <button class="button" on:click|once={handleClick}>CREATE</button>
    </div>
  </div>
</main>

<style>
  main {
    width: 100%;
    max-width: 960px;
    margin: 40px auto;
  }

  p {
    color: white;
  }

  .app {
    border: solid 2px #d91b42;
    border-radius: 12px;
    box-shadow: #d91b42 0px 6px 12px -2px, #d91b42 0px 3px 7px -3px;
  }

  .button--container {
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
  }

  .button--input {
    background-color: transparent;
    border-radius: 12px;
    outline: none;
    border: solid 2px white;
    color: #d91b42;
    padding: 0.3rem;
  }

  .button {
    color: #d91b42;
  }
  
  .button:hover {
    color: white;
  }
</style>
