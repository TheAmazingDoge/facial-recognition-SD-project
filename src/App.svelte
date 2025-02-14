<script>
	import { onMount } from 'svelte';

	let portName = 'COm3';

	function connectSerial() {
		window.electron.send('connect-serial', portName);
	}
	function startBluetoothScan() {
		window.electron.send('start-bluetooth-scan');
	}
	function stopBluetoothScan() {
		window.electron.send('stop-bluetooth-scan');
	}

	onMount(() => {
		window.electron.on('serial-data', (data) => {
			console.log('Received data:', data);
		});
		window.electron.on('bluetooth-devices', (devices) => {
			console.log('Bluetooth devices:', devices);
		});
	})
</script>

<main>
	<h1>Facial Recognition Software UI</h1>
  	<button on:click={connectSerial}>Connect Serial</button>
  	<button on:click={startBluetoothScan}>Start Bluetooth Scan</button>
  	<button on:click={stopBluetoothScan}>Stop Bluetooth Scan</button>
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
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>