import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetUserDetails(userId: string | undefined) {
	return useQuery({
		queryKey: ["get-user-details"],
		queryFn: async () =>
			(
				await axios.get(
					`${import.meta.env.VITE_SERVER_URL}/api/users/${userId}`,
					{ withCredentials: true }
				)
			).data,
		enabled: !!userId,
	});
}
