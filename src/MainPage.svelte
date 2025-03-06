<script>
  // Add your main page logic here
  import { signOut } from './stores.js';

  function handleSignOut() {
    signOut();
  }
</script>

<main>
    <h1>Welcome to the Main Page</h1>
    <!-- Add your main page content here -->
    <button on:click={handleSignOut}>Sign Out</button>
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
</style>