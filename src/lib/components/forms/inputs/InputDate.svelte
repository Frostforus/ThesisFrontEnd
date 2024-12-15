<script lang="ts">
    import CalendarIcon from "lucide-svelte/icons/calendar";
    import {
        DateFormatter,
        type DateValue,
        getLocalTimeZone
    } from "@internationalized/date";
    import {cn} from "$lib/utils.js";
    import {buttonVariants} from "$lib/components/ui/button";
    import {Calendar} from "$lib/components/ui/calendar";
    import * as Popover from "$lib/components/ui/popover";
    import {Input} from "$lib/components/ui/input";

    const df = new DateFormatter("en-US", {
        dateStyle: "long"
    });
    let {name="date"} = $props();
    let value = $state<DateValue | undefined>();
    let contentRef = $state<HTMLElement | null>(null);

</script>
<Popover.Root>
    <Popover.Trigger
            class={cn(
   buttonVariants({
    variant: "outline",
    class: "w-full justify-start text-left font-normal"
   }),
   !value && "text-muted-foreground"
  )}
    >
        <CalendarIcon class="mr-2 size-4"/>
        {value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
    </Popover.Trigger>
    <Popover.Content bind:ref={contentRef} class="w-auto p-0">
        <Calendar type="single" bind:value/>
    </Popover.Content>
</Popover.Root>


<!--Makes sure it is passed -->
<div class="hidden">
    <Input
            id="date"
            {name}
            type="date"
            bind:value={value}
            required
    />
</div>