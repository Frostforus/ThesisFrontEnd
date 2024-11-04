<script>
    import {Button} from "$lib/components/ui/button";
    import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "$lib/components/ui/card";
    import {Input} from "$lib/components/ui/input";
    import {Label} from "$lib/components/ui/label";
    import {goto} from "$app/navigation";

    // TODO calendar dropdown like this: https://next.shadcn-svelte.com/docs/components/calendar
    //TODO: buggy dragand drop
    let files = $state([]);
    let patientName = $state('');
    let sessionDate = $state('');
    let uploading = $state(false);
    let dragActive = $state(false);

    // Derived state for form validation
    // $derived.isValid = () => {
    //     return patientName.trim() !== '' &&
    //         sessionDate !== '' &&
    //         files.length > 0;
    // };

    // File handling functions
    function handleFileSelect(event) {
        const fileList = event.target.files;
        if (fileList?.[0]) {
            files = Array.from(fileList);
        }
    }

    function handleDragOver(event) {
        event.preventDefault();
        dragActive = true;
    }

    function handleDragLeave() {
        dragActive = false;
    }

    function handleDrop(event) {
        event.preventDefault();
        dragActive = false;

        const fileList = event.dataTransfer?.files;
        if (fileList?.[0]) {
            files = Array.from(fileList);
        }
    }

    // async function handleSubmit(event) {
    //     event.preventDefault();
    //     if (!$derived.isValid()) return;
    //
    //     uploading = true;
    //     try {
    //         const formData = new FormData();
    //         formData.append('audio', files[0]);
    //         formData.append('patientName', patientName);
    //         formData.append('sessionDate', sessionDate);
    //
    //         // Replace with your actual API endpoint
    //         const response = await fetch('/api/upload', {
    //             method: 'POST',
    //             body: formData
    //         });
    //
    //         if (!response.ok) throw new Error('Upload failed');
    //
    //         // Redirect to dashboard on success
    //         goto('/');
    //     } catch (error) {
    //         console.error('Upload error:', error);
    //         // Add error handling here
    //     } finally {
    //         uploading = false;
    //     }
    // }
</script>

<div class="container mx-auto p-6 max-w-2xl">
    <div class="mb-6 flex justify-between items-center">
        <h1 class="text-3xl font-bold">Upload Recording</h1>
        <Button variant="outline" href="/">
            Back to Dashboard
        </Button>
    </div>

    <Card>
        <CardHeader>
            <CardTitle>Upload Session Recording</CardTitle>
            <CardDescription>Upload an audio file for transcription</CardDescription>
        </CardHeader>
        <CardContent>
            <form class="space-y-6">
                <div class="space-y-2">
                    <Label for="patient">Patient Name</Label>
                    <Input
                            id="patient"
                            type="text"
                            bind:value={patientName}
                            placeholder="Enter patient name"
                            required
                    />
                </div>

                <div class="space-y-2">
                    <Label for="date">Session Date</Label>
                    <Input
                            id="date"
                            type="date"
                            bind:value={sessionDate}
                            required
                    />
                </div>

                <div class="space-y-2">
                    <Label>Audio File</Label>
                    <div
                            class="border-2 border-dashed rounded-lg p-6 text-center transition-colors"
                            class:border-primary={dragActive}
                            ondragover={handleDragOver}
                            ondragleave={handleDragLeave}
                            ondrop={handleDrop}
                            role="button"
                            aria-label="Upload audio file"
                            tabindex="0"
                    >
                        <Input
                                id="audio"
                                type="file"
                                accept="audio/*"
                                on:change={handleFileSelect}
                                class="hidden"
                        />
                        <Label for="audio" class="cursor-pointer block">
                            <div class="space-y-2">
                                <div class="text-muted-foreground">
                                    {#if files.length === 0}
                                        Drop your audio file here or click to browse
                                    {:else}
                                        Selected: {files[0].name}
                                        <Button
                                                variant="ghost"
                                                size="sm"
                                                class="ml-2"
                                                onclick={() => files = []}
                                        >
                                            Remove
                                        </Button>
                                    {/if}
                                </div>
                                {#if dragActive}
                                    <div class="text-primary">Drop to upload</div>
                                {/if}
                            </div>
                        </Label>
                    </div>
                </div>

                <Button
                        type="submit"
                        class="w-full"
                        disabled={uploading }
                >
                    {#if uploading}
                        <div class="animate-spin mr-2">↻</div>
                        Uploading...
                    {:else}
                        Upload and Transcribe
                    {/if}
                </Button>
            </form>
        </CardContent>
    </Card>
</div>