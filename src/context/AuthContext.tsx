import { create } from "zustand";
import { useEffect } from "react";
import axios from "axios";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
	user: { _id: string; email: string } | null;
	loading: boolean;
	setUser: (user: { _id: string; email: string } | null) => void;
	setLoading: (loading: boolean) => void;
	initializeAuth: () => void;
}
export const useAuthStore = create<AuthState, [["zustand/persist", unknown]]>(
	persist(
		(set) => ({
			user: null,
			loading: true,
			setUser: (user) => set({ user }),
			setLoading: (loading) => set({ loading }),
			initializeAuth: async () => {
				try {
					// Fetch user from the API
					const response = await axios.get(
						`${import.meta.env.VITE_SERVER_URL}/api/user`,
						{ withCredentials: true }
					); // Update URL
					console.log(response);
					set({ user: response.data.user, loading: false });
				} catch (error) {
					set({ user: null, loading: false });
					console.error(error);
				}
			},
		}),
		{
			name: "auth",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);

export const useAuth = () => {
	const { initializeAuth, ...state } = useAuthStore();

	useEffect(() => {
		initializeAuth();
	}, [initializeAuth]);

	return { user: state.user, loading: state.loading };
};
