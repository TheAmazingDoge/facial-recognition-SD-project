<script>
	import { onMount } from 'svelte';
    import SignIn from './SignIn.svelte';
	import { isSignedIn } from './stores.js';
	import MainPage from './MainPage.svelte';

	let signedIn;
	isSignedIn.subscribe(value => {
		signedIn = value;
	});

	let portName = 'COM3';
	let videoFeed = '';
	let aiResult = '';

	function connectSerial() {
		console.log('Connecting to serial port:', portName);
		window.electron.send('connect-serial', portName);
	}

	onMount(() => {
		window.electron.receive('serial-data', (data) => {
			console.log('Received data:', data);
		});
		window.electron.receive('serial-error', (error) => {
			console.log('Serial error:', error);
		});
		window.electron.receive('ai-result', (result) => {
			//This is in case it is not the original person to set up the
			//device. It can be an error if we need it to be
			console.log('AI Result:', result);
		});
		window.electron.receive('open-door', (feed) => {
			//This is in case it is the original person to set up the
			//device. It can be whatever we want it to be. This will be if the AI
			//detects the correct person.
			console.log('open door or sum');
		});
	})
</script>

<main>
	{#if signedIn}
		<MainPage />
	{:else}
		<SignIn />
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>