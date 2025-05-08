<script>
  import { onMount } from 'svelte';
  import { signIn } from './stores.js';
  import Modal from './Modal.svelte';
  import AddUser from './AddUser.svelte';
  import MessageModal from './MessageModal.svelte';

  let users = []; // Reactive variable to store the list of users
  let loading = true; // To show a loading state while fetching data
  let error = null; // To handle errors
  let showMessageModal = false;
  let message = '';
  let showModal = false;

  // Fetch users from the database
  async function fetchUsers() {
    try {
      const result = await window.electron.fetchUsers(); // Use Electron IPC to fetch users
      users = result; // Update the users list
    } catch (err) {
      error = 'Failed to fetch users: ' + err.message; // Handle errors
    } finally {
      loading = false; // Stop the loading state
    }
  }

  // Fetch users when the component is mounted
  onMount(() => {
    fetchUsers();
  });
  function openModal(){
    showModal = true;
  }
  function closeModal(){
    showModal = false;
    username = '';
    password = '';
    document.getElementById('username').focus();
  }
  function closeMessageModal() {
    showMessageModal = false;
    document.getElementById('username').focus();
  }
</script>

<main>
  <h1>List of Users</h1>

  {#if loading}
    <p>Loading users...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else if users.length === 0}
    <p>No users found.</p>
  {:else}
    <ul>
      {#each users as user}
        <li>{user.username}</li>
      {/each}
    </ul>
  {/if}
  <button on:click={openModal}>Add User</button>

  <Modal show={showModal} close={closeModal}>
    <AddUser />
  </Modal>
  <MessageModal show={showMessageModal} message={message} close={closeMessageModal} />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin: 0.5em 0;
  }

  .error {
    color: red;
    font-weight: bold;
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