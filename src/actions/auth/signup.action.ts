import { firebase } from "@/firebase/config";
import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, type AuthError } from "firebase/auth";


export const signup = defineAction({
    accept: 'form',
    input: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        remember_me: z.boolean().optional(),
    }),
    handler: async ({ name, email, password, remember_me }, { cookies }) => {

        // console.log(name, email, password, remember_me);

        // if ( remember_me ) {
        //     cookies.set('email', email, {
        //         expires: new Date( Date.now() + 1000 * 60 * 60 * 24 * 365), //un año
        //         path: '/',
        //     });            
        // } else {
        //     cookies.delete('email', {
        //         path: '/',
        //     });
        // }

        // Creacion de usuario
        try {

            const user = await createUserWithEmailAndPassword(firebase.auth, email, password);
            console.log(user);

            // Actualizar el nombre (displayName)
            updateProfile(firebase.auth.currentUser!, {
                displayName: name,
            })

            // Verificar el correo electronico
            await sendEmailVerification(firebase.auth.currentUser!, {
                // url: 'http://localhost:4321/protected?emailVerified=true',
                url: `${import.meta.env.WEBSITE_URL}/protected?emailVerified=true`,
            });


            return JSON.stringify(user);

        } catch (error) {
            // console.log(error);

            const firebaseError = error as AuthError;

            // console.log(firebaseError.code);

            if (firebaseError.code === 'auth/email-already-in-use') {
                throw new Error('El correo ya esta en uso');
            }

            throw new Error('Ayuda!!! algo salio mal.');
        }

    }

});