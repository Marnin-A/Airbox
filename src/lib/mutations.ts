import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useCreateOrgProfile() {
	return useMutation({
		mutationKey: ["create-org-profile"],
		mutationFn: async ({
			userId,
			business_name,
			contact_email,
			phone,
		}: {
			userId: string;
			business_name: string;
			contact_email: string;
			phone: string;
		}) =>
			axios.post(
				`${import.meta.env.VITE_SERVER_URL}/create-org`,
				{
					userId,
					business_name: business_name,
					contact_email: contact_email,
					phone: phone,
				},
				{ withCredentials: true }
			),
	});
}

export function useForgotPassword() {
	return useMutation({
		mutationKey: ["forgot-password"],
		mutationFn: async ({ email }: { email: string }) =>
			axios.post(`${import.meta.env.VITE_SERVER_URL}/api/forgot-password`, {
				email,
			}),
	});
}
