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
    color: #34495e;
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
        color: white;
        background-color: #34495e; /* Slightly lighter than the nav background */
        border: none;
        padding: 0.7em 1.5em; /* Add more padding for a better button size */
        cursor: pointer;
        font-weight: bold;
        font-size: 1em; /* Increase font size */
        border-radius: 5px; /* Rounded corners for buttons */
        transition: background-color 0.3s ease, transform 0.2s ease; /* Smooth transitions */
    }

    button:hover {
        background-color: #1abc9c; /* Change color on hover */
        transform: scale(1.05); /* Slightly enlarge the button on hover */
    }

    button:active {
        transform: scale(0.95); /* Slightly shrink the button when clicked */
    }

    button:focus {
        outline: none; /* Remove the default focus outline */
        box-shadow: 0 0 0 3px rgba(26, 188, 156, 0.5); /* Add a custom focus outline */
    }
</style>