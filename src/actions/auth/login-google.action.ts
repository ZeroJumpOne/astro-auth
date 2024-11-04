import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";


export const loginGoogle = defineAction({
    accept: 'json',
    input: z.any(),
    handler: async (credentials) => {

        const credential = GoogleAuthProvider.credentialFromResult(credentials);

        if (!credential) {
            throw new Error('Google signin fallo');
        }

        await signInWithCredential(firebase.auth, credential!);

        return { ok: true };
    }
});