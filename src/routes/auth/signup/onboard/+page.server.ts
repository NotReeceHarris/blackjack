import { CLERK_SECRET_KEY } from '$env/static/private'
import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';

export async function load({locals}) {
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

    if (user) {
        return redirect(302, '/auth/login/assign');
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

    // Create user in database
    return await prisma.user.create({
        data: {
            clerkId: session.userId,
            username: username,
        }
    }).then(()=>{
        return redirect(302, '/auth/login/assign');
    }).catch((err) => {
        console.error('Error creating user in database:', err);
        return {
            success: false,
            error: 'Failed to create user in database'
        };
    });

}
