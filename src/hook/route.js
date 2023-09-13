import { useRouter } from "next/router";
import React from "react";
import useAuth from "./auth";

export function withPublic(Component) {
	return function WithPublic(props) {
		const auth = useAuth();
		const router = useRouter();

		if (auth?.user) {
			router.replace("/dashboard?view=dashboard");
			return <h1>Loading...</h1>;
		}
		return <Component auth={auth} {...props} />;
	};
}

export function withProtected(Component) {
	return function WithProtected(props) {
		const auth = useAuth();
		const router = useRouter();

		if (!auth?.user) {
			router.push("/login");
			return <h1>Loading...</h1>;
		}
		return <Component auth={auth} {...props} />;
	};
}
