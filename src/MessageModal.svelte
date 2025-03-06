<script>
  export let show = false;
  export let message = '';
  export let close;

  function handleClose() {
    close();
  }
</script>

{#if show}
  <div class="modal-backdrop" on:click={handleClose} on:keydown={handleClose}></div>
  <div class="modal">
    <button class="close" on:click={handleClose}>X</button>
    <p>{message}</p>
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
</style>