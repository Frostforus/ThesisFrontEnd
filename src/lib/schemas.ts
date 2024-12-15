import { z } from "zod";

export const uploadSchema = z.object({
    patientName: z.string().min(1, "Patient name is required"),
    sessionDate: z.date({
        required_error: "Session date is required",
    }),
    audioFile: z.instanceof(File, { message: "Audio file is required" }).optional(),
});

export type UploadSchema = typeof uploadSchema;
