import { login, loginGoogle, logout, signup } from "./auth";

export const server = {
    // auth
    signup,
    logout,
    login,
    loginGoogle
}