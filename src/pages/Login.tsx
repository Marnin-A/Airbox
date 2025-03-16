import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Mail, Loader2 } from "lucide-react";
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
import { loginSchema } from "@/lib/schemas";
import * as z from "zod";
import axios from "axios";

const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";
	console.log(from);

	const [loading, setLoading] = useState(false);
	const [googleLoading, setGoogleLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		setLoading(true);

		try {
			const response = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}/api/login`,
				values,
				{
					withCredentials: true,
				}
			);

			if (response.data.success) {
				toast.success("Login successful!");
				navigate(from, { replace: true });
			} else {
				toast.error(`Login failed: ${response.data.message}`);
			}
		} catch (error: unknown) {
			toast.error(
				`Login failed. Please check your credentials.\n ${
					(error as Error).message
				}`
			);
			console.error("Login error:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSignIn = () => {
		setGoogleLoading(true);
		window.location.href = `${import.meta.env.VITE_SERVER_URL}/auth/google`; // Redirect to Google OAuth route
		setGoogleLoading(false);
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Sign in to your account
				</h2>
				<p className="mt-2 text-center text-sm text-gray-600">
					Or{" "}
					<Link
						to="/register"
						className="font-medium text-indigo-600 hover:text-indigo-500"
					>
						register your business
					</Link>
				</p>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<Card className="px-6 py-10">
					<CardHeader className="space-y-1 hidden">
						<CardTitle className="text-2xl text-center">
							Sign in to your account
						</CardTitle>
						<CardDescription className="text-center">
							Or{" "}
							<Link
								to="/register"
								className="font-medium text-indigo-600 hover:text-indigo-500"
							>
								register your business
							</Link>
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
							<span className="px-2 mt-2">Or continue with email</span>
						</Separator>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="grid gap-4 mt-4"
							>
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
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													type="password"
													placeholder="••••••••"
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
											Signing in...
										</>
									) : (
										"Sign in"
									)}
								</Button>
							</form>
							<div className="text-sm">
								Don't have an account?{" "}
								<Link to="/register" className="font-semibold text-primary">
									Register
								</Link>
							</div>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Login;
