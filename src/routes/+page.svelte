<script>
    import {Button} from "$lib/components/ui/button";
    import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "$lib/components/ui/card";

    let recentTranscripts = [
        {patientName: "John Doe", date: "2024-11-04", duration: "45:30", status: "Completed"},
        {patientName: "Jane Smith", date: "2024-11-03", duration: "32:15", status: "Processing"}
    ];
</script>

<div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Audio Transcription Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
            <CardHeader>
                <CardTitle>Quick Upload</CardTitle>
                <CardDescription>Upload a new session recording</CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="default" class="w-full" href="/upload">
                    New Recording
                </Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Your transcription usage this month</CardDescription>
            </CardHeader>
            <CardContent>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p class="text-sm text-muted-foreground">Transcribed</p>
                        <p class="text-2xl font-bold">24</p>
                    </div>
                    <div>
                        <p class="text-sm text-muted-foreground">Hours Processed</p>
                        <p class="text-2xl font-bold">18.5</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>

    <Card>
        <CardHeader>
            <CardTitle>Recent Transcripts</CardTitle>
            <CardDescription>Your latest session transcriptions</CardDescription>
        </CardHeader>
        <CardContent>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left">
                    <thead class="text-xs uppercase bg-muted">
                    <tr>
                        <th class="px-6 py-3">Patient Name</th>
                        <th class="px-6 py-3">Date</th>
                        <th class="px-6 py-3">Duration</th>
                        <th class="px-6 py-3">Status</th>
                        <th class="px-6 py-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each recentTranscripts as transcript}
                        <tr class="border-b">
                            <td class="px-6 py-4">{transcript.patientName}</td>
                            <td class="px-6 py-4">{transcript.date}</td>
                            <td class="px-6 py-4">{transcript.duration}</td>
                            <td class="px-6 py-4">
                  <span class={transcript.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}>
                    {transcript.status}
                  </span>
                            </td>
                            <td class="px-6 py-4">
                                <Button variant="outline" size="sm">View</Button>
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>
        </CardContent>
    </Card>
</div>