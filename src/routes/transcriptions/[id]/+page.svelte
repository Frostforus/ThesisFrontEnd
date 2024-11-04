<script>
    import { Button } from "$lib/components/ui/button";
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card";

    export let data; // populated by +page.ts

    let transcript = {
        patientName: "John Doe",
        sessionDate: "2024-11-04",
        duration: "45:30",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    };
</script>

<div class="container mx-auto p-6">
    <Card>
        <CardHeader>
            <div class="flex justify-between items-start">
                <div>
                    <CardTitle>{transcript.patientName}</CardTitle>
                    <CardDescription>
                        Session Date: {transcript.sessionDate} • Duration: {transcript.duration}
                    </CardDescription>
                </div>
                <div class="space-x-2">
                    <Button variant="outline">Download</Button>
                    <Button variant="outline">Share</Button>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <div class="prose max-w-none">
                <p class="whitespace-pre-wrap">{transcript.text}</p>
            </div>
        </CardContent>
    </Card>
</div>