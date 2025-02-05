import { z } from "zod";

export const uploadSchema = z.object({
    patientName: z.string().min(1, "Patient name is required"),
    sessionDate: z.date({
        required_error: "Session date is required",
    }),
    audioFile: z.instanceof(File, { message: "Audio file is required" }).optional(),
});
export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
    })
        .email({
            message: "Please enter a valid email address"
        }).default('konrad@healper.dk'),
    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string"
    })
        .min(6, {
            message: "Password must be at least 6 characters long"
        }).default('hello123'),
});

export type LoginSchema = typeof loginSchema;
export type UploadSchema = typeof uploadSchema;
