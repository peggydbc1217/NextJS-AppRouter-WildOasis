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
    callbacks: {
        authorized: async ({ request, auth }) => {
            // if (request.nextUrl.pathname === '/') {
            //     return true;
            // }
            return !!auth?.user;
        },
        signIn: async ({ user, account, profile }) => {
            try {
                const existingGuest = await getGuest(user.email);
                if (!existingGuest) {
                    await createGuest({
                        email: user.email,
                        fullName: user.name,
                    });
                }
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
        //The session callback is called whenever a session is checked. It is used to add additional properties to the session object.
        session: async ({ session, token }) => {
            const guest = await getGuest(session.user.email);
            //把guest id 添加到session中, 好讓任何頁面都可以使用
            session.user.guestId = guest.id;
            return session;
        }
    },
    pages: {
        signIn: '/login',
    },
};

const authHandler = NextAuth(authConfig);

export { authHandler as GET, authHandler as POST };
