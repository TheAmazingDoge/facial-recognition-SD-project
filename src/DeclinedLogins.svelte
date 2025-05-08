<script>
  export let declinedLogins = [];
</script>

<main>
  <h1>Declined Logins</h1>
  {#if declinedLogins.length > 0}
    <ul>
      {#each declinedLogins as login}
        <li>
          User: {login.userId}, Time: {login.time}
        </li>
      {/each}
    </ul>
  {:else}
    <p>No declined logins yet.</p>
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
</style>