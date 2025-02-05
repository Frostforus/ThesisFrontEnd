<script lang="ts">
    import { goto } from "$app/navigation";
    import type { PageData } from "./$types";
    import { Button } from "$lib/components/ui/button";
    import { Card, CardHeader, CardTitle, CardContent } from "$lib/components/ui/card";
    import { Mic, FileText, PenTool } from "lucide-svelte";

    const data = $props<PageData>();

    // Using Svelte 5's state management
    let isNavigating = $state(false);

    // Svelte 5 action to handle navigation
    async function handleDashboardClick() {
        isNavigating = true;
        await goto('/dashboard');
        isNavigating = false;
    }
</script>

<div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
            <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                AI Therapy Journal Assistant
            </h1>
            <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Streamline your therapy session documentation with AI-powered transcription and journal generation.
            </p>

            <div class="mt-10">
                {#if data.user}
                    <Button
                            variant="default"
                            size="lg"
                            on:click={handleDashboardClick}
                            disabled={isNavigating}
                    >
                        {isNavigating ? 'Loading...' : 'Go to Dashboard'}
                    </Button>
                {:else}
                    <div class="space-x-4">
                        <Button variant="default" size="lg" asChild>
                            <a href="/login">Log In</a>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <a href="/signup">Sign Up</a>
                        </Button>
                    </div>
                {/if}
            </div>

            <!-- Feature highlights -->
            <div class="mt-20 grid grid-cols-1 gap-8  md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <div class="flex justify-center">
                            <div class="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                                <Mic class="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <CardTitle class="mt-4">Voice Recording</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p class="text-muted-foreground">
                            Record therapy sessions with high-quality audio capture.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div class="flex justify-center">
                            <div class="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                                <FileText class="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <CardTitle class="mt-4">AI Transcription</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p class="text-muted-foreground">
                            Automatically convert recordings into accurate text transcripts.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div class="flex justify-center">
                            <div class="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                                <PenTool class="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <CardTitle class="mt-4">Journal Generation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p class="text-muted-foreground">
                            Generate structured session journals with AI assistance.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
</div>