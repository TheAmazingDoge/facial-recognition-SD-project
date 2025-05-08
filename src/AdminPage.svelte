<script>
    import { onMount } from 'svelte';

    let deniedLogs = [];

    async function fetchDeniedLogs() {
        const response = await window.electron.invoke('get-denied-logs');
        deniedLogs = response.logs;

    }

    onMount(() => {
        fetchDeniedLogs();
    });
</script>

<main>
    <h1>Denied Logs</h1>
    <table>
        <thead>
            <tr>
                <th>Time</th>
            </tr>
        </thead>
        <tbody>
            {#each deniedLogs as log}
                <tr>
                    <td>{log.time}</td>
                </tr>
            {/each}
        </tbody>
    </table>

    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 8px;
        }

        th {
            background-color: #f2f2f2;
        }
    </style>
</main>