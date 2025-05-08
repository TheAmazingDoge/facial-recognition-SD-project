<script>
  export let show = false;
  export let close;

  function handleClose() {
    close();
  }
</script>

{#if show}
  <div class="modal-backdrop" on:click={handleClose} on:keydown={handleClose}></div>
  <div class="modal">
    <button class="close" on:click={handleClose}>X</button>
    <slot></slot>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 1em;
    z-index: 20;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .close {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
  }
  button {
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

    button:hover {
        background-color: #1abc9c; /* Change color on hover */
        transform: scale(1.05); /* Slightly enlarge the button on hover */
    }

    button:active {
        transform: scale(0.95); /* Slightly shrink the button when clicked */
    }

    button:focus {
        outline: none; /* Remove the default focus outline */
        box-shadow: 0 0 0 3px rgba(26, 188, 156, 0.5); /* Add a custom focus outline */
    }
</style>