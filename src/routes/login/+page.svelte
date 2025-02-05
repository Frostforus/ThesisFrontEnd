<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "$lib/components/ui/card";
    import {Button} from '$lib/components/ui/button';
    import {Input} from '$lib/components/ui/input';
    import {Label} from '$lib/components/ui/label';
    import { superForm } from "sveltekit-superforms/client";
    import type { PageData } from "./$types";

    const {data} = $props<PageData>();
    const { form, errors, enhance, delayed } = superForm(data.form, {
        multipleSubmits: 'prevent',
        taintedMessage: null,
    });

    let isLoading = $state(false);
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
    <Card class="w-full max-w-md">
        <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
            <form
                    method="POST"
                    use:enhance={() => {
                    isLoading = true;
                    return async ({ result }) => {
                        isLoading = false;
                    };
                }}
            >
                <div class="space-y-4">

                        <Label>Email</Label>
                        <Input
                                type="email"
                                name="email"
                                bind:value={$form.email}
                                placeholder="name@example.com"
                                autocomplete="email"
                        />



                        <Label>Password</Label>
                        <Input
                                type="password"
                                name="password"
                                bind:value={$form.password}
                                autocomplete="current-password"
                        />


                    {#if $errors._errors}
                        <p class="text-sm text-destructive">{$errors._errors}</p>
                    {/if}

                    <Button
                            type="submit"
                            class="w-full"
                            disabled={isLoading || $delayed}
                    >
                        {#if $delayed || isLoading}
                            Signing in...
                        {:else}
                            Sign in
                        {/if}
                    </Button>
                </div>
            </form>
        </CardContent>
        <CardFooter class="flex justify-center">
            <p class="text-sm text-muted-foreground">
                Don't have an account?
                <a href="/signup" class="text-primary hover:underline">Sign up</a>
            </p>
        </CardFooter>
    </Card>
</div>