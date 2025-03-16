import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, Mail, Loader2, Eye, EyeOffIcon } from "lucide-react";
import toast from "react-hot-toast";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas";
import * as z from "zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";

const Register = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [googleLoading, setGoogleLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			password: "",
			businessName: "",
			phone: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof registerSchema>) => {
		setLoading(true);

		try {
			// Register user using MongoDB
			const response = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}/api/register`,
				values
			);
			console.log(response);

			if (response.data.success) {
				toast.success(
					"Registration successful! Please check your email to verify your account."
				);
				// navigate("/");
			} else {
				if (response.data.message.includes("E11000")) {
					toast.error("Email already exists");
				} else {
					toast.error(`Registration failed: ${response.data.message}`);
				}
			}
		} catch (error: unknown) {
			toast.error(
				`Registration failed. Please try again.\n ${(error as Error).message}`
			);
			console.error("Registration error:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSignIn = () => {
		setGoogleLoading(true);
		window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`;
		setGoogleLoading(false);
	};

	const handleShowPassword = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			setShowPassword(!showPassword);
		},
		[showPassword]
	);

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Register your business
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
					Join Airbox and start managing your appointments today
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<Card className="px-6 py-10">
					<CardHeader className="space-y-1 hidden">
						<CardTitle className="text-2xl text-center">
							Register your business
						</CardTitle>
						<CardDescription className="text-center">
							Join Airbox and start managing your appointments today
						</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4">
						<Button
							variant="outline"
							onClick={handleGoogleSignIn}
							disabled={googleLoading}
							className="w-full flex justify-center items-center"
						>
							{googleLoading ? (
								<>
									<Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
									Connecting...
								</>
							) : (
								<>
									<svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
										<path
											d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
											fill="#4285F4"
										/>
										<path
											d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
											fill="#34A853"
										/>
										<path
											d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
											fill="#FBBC05"
										/>
										<path
											d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
											fill="#EA4335"
										/>
									</svg>
									Continue with Google
								</>
							)}
						</Button>

						<Separator>
							<span className="px-2">Or continue with email</span>
						</Separator>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="grid gap-4 mt-4"
							>
								<FormField
									control={form.control}
									name="businessName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Business Name</FormLabel>
											<div className="relative">
												<Store className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
												<FormControl>
													<Input
														type="text"
														placeholder="Your Business Name"
														autoComplete="name"
														className="pl-10"
														{...field}
													/>
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email Address</FormLabel>
											<div className="relative">
												<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
												<FormControl>
													<Input
														type="email"
														placeholder="you@example.com"
														className="pl-10"
														{...field}
													/>
												</FormControl>
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="relative">
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													type={showPassword ? "text" : "password"}
													placeholder="••••••••"
													minLength={8}
													autoComplete="new-password"
													{...field}
												/>
											</FormControl>
											<FormMessage />
											<Button
												className="absolute cursor-pointer hover:bg-transparent right-0 top-5.5"
												variant="ghost"
												onClick={handleShowPassword}
											>
												{showPassword ? <Eye /> : <EyeOffIcon />}
											</Button>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone Number</FormLabel>

											{/* <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /> */}
											<FormControl>
												<PhoneInput
													defaultCountry="NG"
													type="tel"
													autoComplete="phone"
													placeholder="+1 (555) 123-4567"
													className="w-full p-1 pl-2 border rounded-md"
													{...field}
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<Button type="submit" disabled={loading}>
									{loading ? (
										<>
											<Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
											Registering...
										</>
									) : (
										"Register with Email"
									)}
								</Button>
								<div className="text-sm">
									Already have an account?{" "}
									<Link to="/login" className="font-semibold text-primary">
										Login
									</Link>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Register;
