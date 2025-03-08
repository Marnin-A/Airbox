import * as z from "zod";

export const registerSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email address." }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters." }),
	businessName: z.string().min(1, { message: "Business name is required." }),
	phone: z.string().min(10, { message: "Please enter a valid phone number." }),
});

export const loginSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email address." }),
	password: z.string().min(1, { message: "Password is required." }),
});
