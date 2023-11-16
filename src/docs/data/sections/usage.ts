export const usageCode = `<script>
import { toast, Toaster } from 'sonner-svelte';
</script>

<Toaster />
<button on:click={() => toast('My first toast')}>
  Give me a toast
</button>`;
