import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { signInWithEmailAndPassword, type Auth, type AuthError } from "firebase/auth";


export const login = defineAction({
    accept: 'form',
    input: z.object({
        email: z.string().email(),
        password: z.string().min(6),
        remember_me: z.boolean().optional(),
    }),
    handler: async ({ email, password, remember_me }) => {

        //conexion con base de datos
        try {

            const user = await signInWithEmailAndPassword( firebase.auth, email, password );

            // console.log(user);

            return JSON.stringify(user);
            
        } catch (error) {

            const firebaseError = error as AuthError;

            // console.log(firebaseError.code);

            if (firebaseError.code === 'auth/invalid-credential') {
                throw new Error('Credenciales incorrectas');
            }

            throw new Error('Ayuda!!! algo salio mal');
            
        }

    }

});