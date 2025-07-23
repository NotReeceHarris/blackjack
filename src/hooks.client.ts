import type { HandleClientError } from '@sveltejs/kit'
// To use Clerk components:
import { initializeClerkClient } from 'clerk-sveltekit/client'
// Or for headless mode:
// import { initializeClerkClient } from 'clerk-sveltekit/headless'
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public'

initializeClerkClient(PUBLIC_CLERK_PUBLISHABLE_KEY, {
	afterSignInUrl: '/auth/login/assign',
	afterSignUpUrl: '/auth/signup/onboard',
	signInUrl: '/auth/login',
	signUpUrl: '/auth/signup',
})

export const handleError: HandleClientError = async ({ error, event }) => {
	console.error(error, event)
}