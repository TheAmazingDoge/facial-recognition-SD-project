<script>
  import MessageModal from "./MessageModal.svelte";

  let username = '';
  let password = '';
  let message = '';
  let showMessageModal = false;

  async function addUser() {
    const result = await window.electron.addUser({ username, password });
    if (result.success) {
      message = 'User added successfully';
    } else {
      message = 'Error adding user: ' + result.message;
    }
    showMessageModal = true;
  }
  function closeMessageModal() {
    showMessageModal = false;
  }
</script>

<main>
  <h1>Add User</h1>
  <input type="text" bind:value={username} placeholder="Username" />
  <input type="password" bind:value={password} placeholder="Password" />
  <button on:click={addUser}>Add User</button>
  <MessageModal show={showMessageModal} message={message} close={closeMessageModal} />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
  }

  input {
    display: block;
    margin: 0.5em 0;
    padding: 0.5em;
    width: 100%;
  }

  button {
    padding: 0.5em 1em;
    background-color: #ff3e00;
    color: white;
    border: none;
    cursor: pointer;
  }
</style>