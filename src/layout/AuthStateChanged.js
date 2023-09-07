import React, { useEffect, useState } from "react";
import useAuth from "../hook/auth";
import AuthService from "../service/AuthService.ts";
import UsersService from "@services/users.service";

export default function AuthStateChanged({ children }) {
	const { setUser, setError } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		AuthService.waitForUser((userToSave) => {
			if(userToSave) {
				UsersService.createUser(userToSave, (err, resp) => {
					if (err || resp?.error) {
						setError('Could not create account')
						setLoading(false);

						setTimeout(() => {
							setError('')
						}, 3000)
					}
					else {
						setUser(userToSave)
						setLoading(false);
					}
				})
			} else {
				setLoading(false);
			}
		});
		//eslint-disable-next-line
	}, []);

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return children;
}
