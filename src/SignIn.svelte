<script>
import { signIn } from './stores.js';
import Modal from './Modal.svelte';
import AddUser from './AddUser.svelte';
import MessageModal from './MessageModal.svelte';

  let username = '';
  let password = '';
  let showMessageModal = false;
  let message = '';
  let showModal = false;

  async function handleSignIn() {
    const result = await window.electron.signin({ username, password });
    if (result.success) {
      message = 'Sign-in successful';
      signIn();
    } else {
      message = 'Sign-in failed: ' + result.message;
    }
    showMessageModal = true;
  }
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
  <h1>Sign In</h1>
  <input id = "username" type="text" bind:value={username} placeholder="Username" />
  <input type="password" bind:value={password} placeholder="Password" />
  <button on:click={handleSignIn}>Sign In</button>
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
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
  }

  input {
    display: block;
    margin: 0.5em 0;
    padding: 0.5em;
    width: 100%;
  }

  button {
    padding: 0.5em 1em;
    background-color: #ff3e00;
    color: white;
    border: none;
    cursor: pointer;
  }
</style>