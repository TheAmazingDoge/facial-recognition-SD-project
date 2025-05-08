<script>
  import { signOut } from './stores.js';

  let cameraFeed = '';
  let connectionStatus = 'Disconnected';

  const ws = new WebSocket('ws://172.20.10.12:8080');

  ws.onopen = () => {
    console.log('Connected to server');
    connectionStatus = 'Connected';
  };

  ws.onmessage = (event) => {
    cameraFeed = event.data;
  };

  ws.onclose = () => {
    console.log('Disconnected from server');
    connectionStatus = 'Disconnected';
  };

  ws.onerror = () => {
    console.log('Error connecting to server');
    connectionStatus = 'failed';
  };

  function handleSignOut() {
    signOut();
  }
</script>

<main>
  <h2>Camera Feed</h2>
  {#if connectionStatus === 'connecting'}
  <div id="status" class="connecting">Connecting...</div>
  {:else if connectionStatus === 'failed'}
  <div id="status" class="failed">Failed to connect</div>
  {:else if connectionStatus === 'connected'}
  <img id="camera-feed" src={cameraFeed} alt="Camera Feed" />
  {/if}
  <button class = "button" on:click={handleSignOut}>Sign Out</button>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 400px;
    margin: 0 auto;
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
    border: 2px solid #ccc;
    border-radius: 8px;
  }

  #status {
    width: 100%;
    height: 300px; /* Placeholder height for the feed */
    border: 2px solid #ccc;
    border-radius: 8px;
    margin-top: 1em;
    background-color: #f0f0f0; /* Default gray background */
  }

  .connecting {
    background-color: #e0e0e0; /* Light gray for connecting */
  }

  .failed {
    background-color: #d0d0d0; /* Slightly darker gray for failed */
  }
  .button {
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

  .button:hover {
    background-color: #1abc9c; /* Change color on hover */
    transform: scale(1.05); /* Slightly enlarge the button on hover */
  }

  .button:active {
      transform: scale(0.95); /* Slightly shrink the button when clicked */
  }

  .button:focus {
      outline: none; /* Remove the default focus outline */
      box-shadow: 0 0 0 3px rgba(26, 188, 156, 0.5); /* Add a custom focus outline */
  }
</style>