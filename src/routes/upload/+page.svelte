<script lang="ts">
    import {superForm} from 'sveltekit-superforms/client';
    import type {PageData} from './$types';
    import {Button} from '$lib/components/ui/button';
    import {Input} from '$lib/components/ui/input';
    import {Label} from '$lib/components/ui/label';
    import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "$lib/components/ui/card";
    import InputDate from "$lib/components/forms/inputs/InputDate.svelte";

    export let data: PageData;

    const {form, errors, enhance, delayed} = superForm(data.form, {
        multipleSubmits: 'prevent',
        taintedMessage: null,
    });
    console.log(data.form)
    let dragActive = false;
    let files: File[] = [];

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        dragActive = true;
    };

    const handleDragLeave = () => {
        dragActive = false;
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        dragActive = false;

        if (e.dataTransfer?.files) {
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('audio/')) {
                files = [file];
                $form.audioFile = file;
            }
        }
    };

    const handleFileSelect = (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target.files?.length) {
            files = [target.files[0]];
            $form.audioFile = target.files[0];
        }
    };
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


            <form class="space-y-6" use:enhance method="POST" enctype="multipart/form-data">
                <div class="space-y-2">
                    <Label for="patientName">Patient Name</Label>
                    <Input
                            id="patientName"
                            type="text"
                            bind:value={$form.patientName}
                            placeholder="Enter patient name"
                            aria-invalid={$errors.patientName ? 'true' : undefined}
                    />
                    {#if $errors.patientName}
                        <p class="text-sm text-destructive">{$errors.patientName}</p>
                    {/if}
                </div>

                <div class="space-y-2">
                    <Label for="sessionDate">Session Date</Label>
                    <!--                    <InputDate-->
                    <!--                            bind:value={$form.sessionDate}-->
                    <!--                            aria-invalid={$errors.sessionDate ? 'true' : undefined}-->
                    <!--                    />-->
                    {#if $errors.sessionDate}
                        <p class="text-sm text-destructive">{$errors.sessionDate}</p>
                    {/if}
                </div>

                <div class="space-y-2">
                    <Label>Audio File</Label>
                    <div
                            class="border-2 border-dashed rounded-lg p-6 text-center transition-colors"
                            class:border-primary={dragActive}
                            on:dragover={handleDragOver}
                            on:dragleave={handleDragLeave}
                            on:drop={handleDrop}
                            role="button"
                            aria-label="Upload audio file"
                            tabindex="0"
                    >
                        <Input
                                id="audio"
                                type="file"
                                accept="audio/*"
                                onchange={handleFileSelect}
                                class="hidden"
                        />
                        <Label for="audio" class="cursor-pointer block">
                            <div class="space-y-2">
                                <div class="text-muted-foreground">
                                    {#if files.length === 0}
                                        Drop your audio file here or click to browse
                                    {:else}
                                        Selected: {files[0].name}
                                        <!--                                        <Button-->
                                        <!--                                                variant="ghost"-->
                                        <!--                                                size="sm"-->
                                        <!--                                                class="ml-2"-->
                                        <!--                                                on:click|preventDefault={() => {-->
                                        <!--                                    files = [];-->
                                        <!--                                    $form.audioFile = undefined;-->
                                        <!--                                }}-->
                                        <!--                                        >-->
                                        <!--                                            Remove-->
                                        <!--                                        </Button>-->
                                    {/if}
                                </div>
                                {#if dragActive}
                                    <div class="text-primary">Drop to upload</div>
                                {/if}
                            </div>
                        </Label>
                        {#if $errors.audioFile}
                            <p class="text-sm text-destructive mt-2">{$errors.audioFile}</p>
                        {/if}
                    </div>
                </div>

                <Button
                        type="submit"
                        class="w-full"
                        disabled={$delayed}
                >
                    {#if $delayed}
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