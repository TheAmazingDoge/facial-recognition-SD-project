<script>
  import { signOut } from './stores.js';

  let cameraFeed = '';

  const ws = new WebSocket('ws://172.20.10.12:8080');

  ws.onopen = () => {
    console.log('Connected to server');
  };

  ws.onmessage = (event) => {
    cameraFeed = event.data;
  };

  ws.onclose = () => {
    console.log('Disconnected from server');
  };

  function handleSignOut() {
    signOut();
  }
</script>

<main>
  <h1>Welcome to the Main Page</h1>
  <button on:click={handleSignOut}>Sign Out</button>
  <h2>Camera Feed</h2>
  <img id="camera-feed" src={cameraFeed} alt="Camera Feed" />
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

  h2 {
    color: #333;
    font-size: 1.5em;
    margin-top: 1em;
  }

  img {
    width: 100%;
    height: auto;
    margin-top: 1em;
  }

  button {
    padding: 0.5em 1em;
    background-color: #ff3e00;
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 0.5em;
  }
</style>