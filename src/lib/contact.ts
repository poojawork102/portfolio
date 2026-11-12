import { z } from "zod";

/** Shared rules for the contact form, used by both the browser and the server. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Add your name.").max(100, "Keep your name under 100 characters."),
  email: z.string().trim().email("Add a valid email so I can reply.").max(200),
  message: z.string().trim().min(10, "Write at least a sentence.").max(2000, "Keep the message under 2,000 characters."),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot: real people leave this empty
  turnstile: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
