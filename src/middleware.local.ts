// No funciona por el nombre del archivo
// Demostracion

import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

const privateRoutes = ['/protected'];

export const onRequest = defineMiddleware((context, next) => {
    const { url, request } = context;
    
    return next();
});
