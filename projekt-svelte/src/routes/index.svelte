<script>
  import Tabs from "../lib/tabs/Tabs.svelte";

  // tabs
  let items = ["All", "ToDo", "Done"];
  let activeItem = "All";
  const tabChange = (e) => (activeItem = e.detail);
</script>

<main>
  <Tabs {activeItem} {items} on:tabChange={tabChange} />
  {#if activeItem === "All"}
    <p>poll list goes here</p>
  {:else if activeItem === "ToDo"}
    <p>poll list goes here</p>
  {:else if activeItem === "Done"}
    <p>poll list goes here</p>
  {/if}
</main>

<style>
  main {
    width: 100%;
    max-width: 960px;
    margin: 40px auto;
  }
</style>
