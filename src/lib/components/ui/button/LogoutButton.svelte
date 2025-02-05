<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { pb } from '$lib/pocketbase';
    import { goto, invalidateAll } from '$app/navigation';

    const {
        variant = "outline",
        size = "sm",
        class: className = "",
    } = $props<{
        variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
        size?: "default" | "sm" | "lg" | "icon";
        class?: string;
    }>();

    let isLoggingOut = $state(false);

    async function handleClick() {
        isLoggingOut = true;
        try {
            // Clear PocketBase auth store
            pb.authStore.clear();

            // Call server endpoint to clear cookies using FormData
            const formData = new FormData();
            formData.append('logout', 'true');

            await fetch('/logout', {
                method: 'POST',
                body: formData
            });

            // Invalidate all data and navigate to login
            await invalidateAll();
            await goto('/', { invalidateAll: true });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            isLoggingOut = false;
        }
    }
</script>

<Button
        {variant}
        {size}
        class={className}
        disabled={isLoggingOut}
        onclick={handleClick}
>
    {isLoggingOut ? 'Logging out...' : 'Log Out'}
</Button>