import { JWT_KEY } from '$env/static/private'
import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export async function load({ locals, cookies }) {
  if (!locals.session) {
    return
  };

  const token = cookies.get('token');

  if (!token) {
    return redirect(302, '/auth/login/assign');
  }

  let decoded = null
  try {
    decoded = jwt.verify(token, JWT_KEY)
  } catch(err) {
    console.error('JWT verification failed:', err);
  }

  if (!decoded) {
    cookies.delete('token', {path: '/'})
    return redirect(302, '/auth/login/assign');
  }

  if (decoded.clerkId !== locals.session.userId) {
    cookies.delete('token', {path: '/'})
    return redirect(302, '/auth/login/assign');
  }

  return {
    username: decoded.username,
  }
}
