import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
 
const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        // CredentialProvider
    ],
};
 
const authHandler = NextAuth(authConfig);

export { authHandler as GET, authHandler as POST };