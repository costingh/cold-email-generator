import { FirebaseApp, getApp } from "firebase/app";
import {
	signInWithPopup,
	getAuth,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
	User,
} from "firebase/auth";

import { UserInterface } from '@interfaces/User.interface'
import UsersService from "@services/users.service";

class AuthService {
	auth: any;

	constructor(firebaseApp: FirebaseApp | undefined) {
		this.auth = getAuth(firebaseApp);
	}

	waitForUser(callback: (arg0: User | null) => void) {
		return onAuthStateChanged(this.auth, (userCred) => {
			callback(userCred);
		});
	}

	loginWithGoogle() {
		return signInWithPopup(this.auth, new GoogleAuthProvider())
			.then(async (userCred) => {

				if (userCred && userCred.user && userCred.user.providerData && userCred.user.providerData[0]) {
					const userToSave: UserInterface = {
						email: userCred.user.providerData[0].email || '',
						name: userCred.user.providerData[0].displayName || '',
						providerId: userCred.user.providerData[0].providerId || '',
						uid: userCred.user.providerData[0].uid || '',
						photoURL: userCred.user.providerData[0].photoURL || '',
						phoneNumber: userCred.user.providerData[0].phoneNumber || '',
					}
					return {
						error: null,
						user: userToSave
					}
				} else return {error: 'Could not create user', user: null};
			})
			.catch((error) => {
				return {
					error: error.message,
					user: null
				};
			});
	}
	async logout() {
		await signOut(this.auth);
	}
}

export default new AuthService(getApp());
