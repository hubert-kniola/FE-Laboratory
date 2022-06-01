<script>
  import Tabs from "../lib/tabs/Tabs.svelte";
  import Tile from "../lib/todo/Tile.svelte";
  import { onMount } from "svelte";
  const URL = "http://localhost:4000";
  let data = [];
  let isEmpty = false;
  let inputField;
  let inputValue = "";
  let title = "All Elements of TODO List:";

  onMount(async function () {
    const response = await fetch(URL + "/api/todos");
    data = await response.json();
    console.log(data);
  });

  const handleChangeTabs = async (activeItem) => {
    let fetchElement = "";
    switch (activeItem) {
      case "All":
        fetchElement = "/api/todos";
        title = "All Elements of TODO List:";
        break;
      case "ToDo":
        fetchElement = "/api/todo";
        title = "Elements to do:";
        break;
      case "Done":
        fetchElement = "/api/done";
        title = "Elements which are done:";
        break;
      default:
        break;
    }
    const response = await fetch(URL + fetchElement);
    data = await response.json();
  };

  const handleCreate = async (activeItem) => {
    let temp;
    if (inputValue !== "") {
      isEmpty = false;
      console.log(inputValue);
      const response = await fetch(URL + "/api/todos", {
        method: "POST",
        body: JSON.stringify({
          text: inputValue,
          done: false,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      switch (activeItem) {
        case "All":
          data = await response.json();
          break;
        case "ToDo":
          temp = await response.json();
          data = temp.filter((todo) => todo.done === false);
          break;
        case "Done":
          temp = await response.json();
          data = temp.filter((todo) => todo.done === true);
          break;
        default:
          break;
      }
      inputField.value = "";
    } else {
      isEmpty = true;
      setTimeout(function () {
        isEmpty = false;
      }, 1000);
    }
  };

  const handleClickTile = async (event) => {
    let fetchElement = "";
    const item = data.filter(
      (_, index) => index === event.detail.indexToOperate
    );
    switch (activeItem) {
      case "All":
        fetchElement = "/api/todos/";
        break;
      case "ToDo":
        fetchElement = "/api/todo/";
        break;
      case "Done":
        fetchElement = "/api/done/";
        break;
      default:
        break;
    }
    let response;
    switch (event.detail.method) {
      case "patch":
        response = await fetch(URL + fetchElement + item[0]._id, {
          method: "PATCH",
          body: JSON.stringify({
            done: !item[0].done,
          }),
          headers: {
            "content-type": "application/json",
          },
        });
        break;
      case "delete":
        response = await fetch(URL + fetchElement + item[0]._id, {
          method: "DELETE",
        });
        break;
      default:
        break;
    }
    data = response ? await response.json() : {};
  };

  // tabs
  let items = ["All", "ToDo", "Done"];
  let activeItem = "All";
  const tabChange = (e) => {
    activeItem = e.detail;
    handleChangeTabs(activeItem);
  };

  const inputChange = (e) => {
    inputValue = e.target.value;
  };
</script>

<main>
  <div class="app">
    <Tabs {activeItem} {items} on:tabChange={tabChange} />
    <div class="todos">
      <h4>{title}</h4>
      {#each data as todo, index}
        <Tile on:handle={handleClickTile} {index} {todo} />
      {/each}
    </div>

    <div class="button--container">
      <input
        class="button--input"
        type="text"
        value={inputValue}
        on:input={inputChange}
        bind:this={inputField}
      />
      <button class="button" on:click={() => handleCreate(activeItem)}
        >CREATE</button
      >
    </div>
    {#if isEmpty}
      <div class="error">Text is empty!</div>
    {/if}
  </div>
</main>

<style>
  main {
    width: 100%;
    max-width: 960px;
    margin: 40px auto;
  }

  p {
    margin-left: auto;
    margin-right: auto;
    color: white;
  }

  h4 {
    color: white;
    font-weight: 600;
    font-size: large;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .app {
    display: flex;
    flex-direction: column;
    border: solid 2px #d91b42;
    border-radius: 12px;
    box-shadow: #d91b42 0px 6px 12px -2px, #d91b42 0px 3px 7px -3px;
    padding: 1rem;
  }

  .todos {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    justify-content: left;
    align-content: left;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }

  .button--container {
    flex-direction: row;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
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

  .error {
    text-align: center;
    margin-top: 1rem;
    font-weight: bold;
    font-size: large;
    color: white;
  }
</style>
