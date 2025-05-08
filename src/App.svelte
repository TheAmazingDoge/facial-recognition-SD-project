<script>
	import { Router, Route, Link, useLocation } from 'svelte-routing';
	import { onMount } from 'svelte';
	import { isSignedIn } from './stores.js';
    import SignIn from './SignIn.svelte';
	import Camera from './Camera.svelte';
	import Users from './Users.svelte';
	import Home from './Home.svelte';
	import { navigate } from 'svelte-routing';


	let currentPage = 'signin'
	function navigateTo(page) {
        currentPage = page;
    }

	const location = useLocation();

	onMount(() => {
        console.log("App.svelte loaded");
        console.log('Current route:', $location.pathname); // Debugging
    });


	let signedIn;
	isSignedIn.subscribe(value => {
		signedIn = value;
		if (signedIn) {
			currentPage = 'home'; // Redirect to home if signed in
		} else {
			currentPage = 'signin'; // Redirect to sign in if not signed in
		}
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

{#if signedIn}
    <nav>
        <button on:click={() => navigateTo('home')}>Home</button>
        <button on:click={() => navigateTo('camera')}>Camera</button>
        <button on:click={() => navigateTo('users')}>Users</button>
    </nav>
{/if}

<main>
	{#if currentPage === 'signin' && !signedIn}
		<SignIn />
	{:else if currentPage === 'home' && signedIn}
		<Home />
	{:else if currentPage === 'camera' && signedIn}
		<Camera />
	{:else if currentPage === 'users' && signedIn}
		<Users />
	{/if}
</main>

<style>
    nav {
        display: flex;
        justify-content: center;
        gap: 1.5em; /* Increase spacing between buttons */
        background-color: #2c3e50; /* Darker background color */
        padding: 1em;
        border-radius: 8px; /* Rounded corners for the nav bar */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
    }

    nav button {
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

    nav button:hover {
        background-color: #1abc9c; /* Change color on hover */
        transform: scale(1.05); /* Slightly enlarge the button on hover */
    }

    nav button:active {
        transform: scale(0.95); /* Slightly shrink the button when clicked */
    }

    nav button:focus {
        outline: none; /* Remove the default focus outline */
        box-shadow: 0 0 0 3px rgba(26, 188, 156, 0.5); /* Add a custom focus outline */
    }
</style>