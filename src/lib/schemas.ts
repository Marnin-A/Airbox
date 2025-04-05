import * as z from "zod";

export const registerSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email address." }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters." })
		.refine((value) => /[A-Z]/.test(value), {
			message: "Password must contain at least one uppercase letter.",
		})
		.refine((value) => /[a-z]/.test(value), {
			message: "Password must contain at least one lowercase letter.",
		})
		.refine((value) => /[0-9]/.test(value), {
			message: "Password must contain at least one number.",
		})
		.refine((value) => /[$&+,:;=?@#|'<>.^*()%!-]/.test(value), {
			message: "Password must contain at least one special character.",
		}),
	businessName: z.string().min(1, { message: "Business name is required." }),
	phone: z.string().min(10, { message: "Please enter a valid phone number." }),
});

export const loginSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email address." }),
	password: z.string().min(1, { message: "Password is required." }),
});

export const profileSchema = z.object({
	business_name: z.string().nonempty({ message: "Business name is required" }),
	contact_email: z.string().email({ message: "Invalid email address" }),
	phone: z.string().nonempty({ message: "Phone number is required" }),
});
