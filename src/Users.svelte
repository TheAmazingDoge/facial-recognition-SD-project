<script>
  import { onMount } from 'svelte';

  let users = []; // Reactive variable to store the list of users
  let loading = true; // To show a loading state while fetching data
  let error = null; // To handle errors

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
</style>