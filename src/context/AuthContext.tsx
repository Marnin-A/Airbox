import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { useEffect } from "react";

interface AuthState {
	user: User | null;
	loading: boolean;
	setUser: (user: User | null) => void;
	setLoading: (loading: boolean) => void;
	initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	loading: true,
	setUser: (user) => set({ user }),
	setLoading: (loading) => set({ loading }),
	initializeAuth: () => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			set({ user: session?.user ?? null, loading: false });
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			set({ user: session?.user ?? null, loading: false });
		});
	},
}));

export const useAuth = () => {
	const { initializeAuth, ...state } = useAuthStore();

	useEffect(() => {
		initializeAuth();
	}, [initializeAuth]);

	return state;
};
