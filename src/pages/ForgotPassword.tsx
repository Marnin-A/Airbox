import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/lib/mutations";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import zod from "zod";

export default function ForgotPassword() {
	const [email, setEmail] = useState<string>("");
	const { isPending, mutateAsync } = useForgotPassword();

	function handleSubmit() {
		// Validate the email using zod
		const emailSchema = zod.string().email();
		const result = emailSchema.safeParse(email);
		if (!result.success) {
			console.error(result.error.format()._errors[0]);
			toast.error(result.error.format()._errors[0]);
			return;
		}
		// Send email address if it's valid
		try {
			mutateAsync({ email }).then((res) => {
				if (res.data.success) {
					toast.success("Password reset email sent successfully.");
				} else {
					toast.error(res.data.message);
				}
			});
		} catch (error) {
			console.error(error);
			toast.error("An error occurred. Please try again later.");
		}
	}
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<Card className="px-6 py-10">
				<CardHeader className="space-y-1 hidden">
					<CardTitle className="text-2xl text-center">
						Enter your email address
					</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4">
					<CardDescription className="text-center font-bold text-lg">
						Enter your email to recover your password
					</CardDescription>
					<Input
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Button
						variant="outline"
						onClick={handleSubmit}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSubmit();
							}
							if (e.key === "Escape") {
								setEmail("");
							}
						}}
						disabled={isPending}
						className="w-full flex justify-center items-center bg-primary-green text-primary-dark-green shadow-xs hover:bg-primary-green/70"
					>
						{isPending ? (
							<>
								<Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
								Sending email...
							</>
						) : (
							"Send Password Reset Email"
						)}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
