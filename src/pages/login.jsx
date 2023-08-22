import React from "react";
import { withPublic } from "../hook/route";

function Login({ auth }) {
	const { user, loginWithGoogle, error } = auth;
	return (
		<div className='d-flex align-items-center justify-content-center login-wrapper'>
            <div>
                <h1>Log in or sign up to use this app</h1>
                <div className='btn-outline d-flex align-items-center justify-content-center mb-4' onClick={loginWithGoogle}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0"><g clip-path="url(#clip0_9_516)"><path d="M19.8052 10.2304C19.8052 9.55059 19.7501 8.86714 19.6325 8.19839H10.2002V12.0492H15.6016C15.3775 13.2912 14.6573 14.3898 13.6027 15.088V17.5866H16.8252C18.7176 15.8449 19.8052 13.2728 19.8052 10.2304Z" fill="#4285F4"></path><path d="M10.1999 20.0007C12.897 20.0007 15.1714 19.1151 16.8286 17.5866L13.6061 15.0879C12.7096 15.6979 11.5521 16.0433 10.2036 16.0433C7.59474 16.0433 5.38272 14.2832 4.58904 11.9169H1.26367V14.4927C2.96127 17.8695 6.41892 20.0007 10.1999 20.0007V20.0007Z" fill="#34A853"></path><path d="M4.58565 11.9169C4.16676 10.675 4.16676 9.33011 4.58565 8.08814V5.51236H1.26395C-0.154389 8.33801 -0.154389 11.6671 1.26395 14.4927L4.58565 11.9169V11.9169Z" fill="#FBBC04"></path><path d="M10.1999 3.95805C11.6256 3.936 13.0035 4.47247 14.036 5.45722L16.8911 2.60218C15.0833 0.904587 12.6838 -0.0287217 10.1999 0.000673888C6.41892 0.000673888 2.96127 2.13185 1.26367 5.51234L4.58537 8.08813C5.37538 5.71811 7.59107 3.95805 10.1999 3.95805V3.95805Z" fill="#EA4335"></path></g><defs><clipPath id="clip0_9_516"><rect width="20" height="20" fill="white"></rect></clipPath></defs></svg>
                    Continue with google
                </div>
                <div className='btn-outline d-flex align-items-center justify-content-center mt-4'>See other options</div>

                <div className='login-divider d-flex align-items-center justify-content-center'>
                    <div></div>
                    <div>or</div>
                    <div></div>
                </div>

                <div className='email-input-login'>
                    <span>Email</span>
                    <input className="mb-4" type='email' placeholder='Enter email address' />
                    <div className='btn-filled'>Continue with email</div>
                    <span className='mini-text'>By continuing, you acknowledge that you have read and understood, and agree to Mobbin's <a>Terms of Service</a> and <a>Privacy Policy</a>.</span>
                </div>
            </div>
        </div>
	);
}

export default withPublic(Login);
