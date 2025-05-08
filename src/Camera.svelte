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
</style>