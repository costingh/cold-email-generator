import { createContext, useContext, useState } from "react";
import AuthService from "../service/AuthService.ts";

const authContext = createContext();

export default function useAuth() {
	return useContext(authContext);
}

export function AuthProvider(props) {
	const [user, setUser] = useState(null);
	const [error, setError] = useState("");

	const loginWithGoogle = async () => {
		const response = await AuthService.loginWithGoogle();
		if(response && response.user) setUser(user ?? null);
		if(response && response.error) setError(error ?? "");
	};

	const logout = async () => {
		await AuthService.logout();
		setUser(null);
	};
	const value = { user, error, loginWithGoogle, logout, setUser };

	return <authContext.Provider value={value} {...props} />;
}
