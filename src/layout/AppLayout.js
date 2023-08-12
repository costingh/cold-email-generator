import { useRouter } from "next/dist/client/router";
import React from "react";
import useAuth from "../hook/auth";

export default function AppLayout({ children }) {
	const auth = useAuth();

	const router = useRouter();

	if (router.pathname !== "/login") {
		return (
			<div style={{height: '100%'}}>
				{children}
			</div>
		);
	} else {
		return children;
	}
}
