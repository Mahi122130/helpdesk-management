import { z } from "zod";


export const createTicketSchema = z.object({

    title:z
    .string()
    .min(5,"Title must be at least 5 characters")
    .max(100),


    description:z
    .string()
    .min(10,"Description is too short"),


    category:z.enum([
        "IT_SUPPORT",
        "FACILITIES",
        "HR",
        "OTHER"
    ]),


    priority:z.enum([
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL"
    ])

});


export type CreateTicketInput =
z.infer<typeof createTicketSchema>;