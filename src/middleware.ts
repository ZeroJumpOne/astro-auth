import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";

const privateRoutes = ['/protected'];
const notAuthenticatedRoutes = ['/login', '/register'];

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {

    const { url, request, locals, redirect } = context;

    const authHeaders = request.headers.get('authorization') ?? '';
    const isLoggedIn = !!firebase.auth.currentUser;
    const user = firebase.auth.currentUser;

    locals.isLoggedIn = isLoggedIn;

    if (isLoggedIn) {
        locals.isLoggedIn = isLoggedIn;
        locals.user = {
            avatar: user?.photoURL ?? '',
            email: user?.email!,
            name: user?.displayName!,
            emailVerified: user?.emailVerified ?? false,
        }

    }

    if (!isLoggedIn && privateRoutes.includes(url.pathname)) {
        return redirect('/');
    }

    if (isLoggedIn && notAuthenticatedRoutes.includes(url.pathname)) {
        return redirect('/');
    }

    // console.log('Running in the middleware');


    return next();
});

const checkAuthLocal = (authHeaders: string, next: MiddlewareNext) => {

    if (authHeaders) {
        const authValue = authHeaders.split(' ').at(-1) ?? 'user::pass';
        const decodedValue = atob(authValue).split(':');
        const [user, passowrd] = decodedValue;
        // console.log({decodedValue});

        if (user === 'admin' && passowrd === 'admin') {
            return next();
        }
    }


    return new Response('Auth necesaria', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic real="Secure Area"',
        }
    })
}