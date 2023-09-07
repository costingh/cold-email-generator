import "../../styles/globals.css";
import "../config/firebase.config";
import { AuthProvider } from "@hook/auth";

import AuthStateChanged from "../layout/AuthStateChanged";
import AppLayout from "../layout/AppLayout";

import { wrapper } from "@store/store";

function ColdEmailGenerator({ Component, pageProps }) {
	return (
		<AuthProvider>
			<AppLayout>
				<AuthStateChanged>
					<Component {...pageProps} />
				</AuthStateChanged>
			</AppLayout>
		</AuthProvider>
	);
}

export default wrapper.withRedux(ColdEmailGenerator);