import { CLERK_SECRET_KEY, JWT_KEY } from '$env/static/private'
import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export async function load({ locals, cookies }) {
    const session = locals.session;

    if (!session) {
        return redirect(302, '/auth/login');
    }

    const user = await prisma.user.findUnique({
        where: {
            clerkId: session.userId
        }
    }).catch((err) => {
        console.error('Error fetching user from database:', err);
        return null;
    })

    if (!user) {
        redirect(302, '/auth/signup/onboard');
    }

    const request = await fetch(`https://api.clerk.com/v1/users/${session.userId}`, {
        headers: {
            'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
            'Content-Type': 'application/json'
        }
    })

    if (!request.ok) {
        return {
            success: false,
            error: 'Failed to fetch user data'
        };
    }

    const json = await request.json().catch((err) => {
        console.error('Error parsing JSON:', err);
        return null;
    })

    if (!json) {
        return {
            success: false,
            error: 'Invalid user data'
        };
    }

    if (json.id !== session.userId) {
        return {
            success: false,
            error: 'User ID mismatch'
        };
    }

    const username = json.username

    if (!username) {
        return {
            success: false,
            error: 'Username not found'
        };
    }

    const token = jwt.sign({ 
        userId: user.id,
        clerkId: user.clerkId,
        username: username
    }, JWT_KEY);

    cookies.set('token', token, {
        path: '/',
    })

    return redirect(302, '/');

}
