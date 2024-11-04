import { firebase } from "@/firebase/config";
import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { signOut } from "firebase/auth";


export const logout = defineAction({
    accept: 'json',
    handler: async () => {

        return await signOut( firebase.auth );

        // firebase.auth.signOut().then( () => {
        //     console.log('Signed Out');
        // }, (error) => {
        //     console.error('Sign Out Error', error)
        // })

        // return {ok: true};
    }
})