import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"

const handler = NextAuth({
    providers: [
        Discord({
            clientId: process.env.DISCORD_ID as string,
            clientSecret: process.env.DISCORD_SECRET as string,
            authorization: { params: { scope: 'identify'}},
        })
    ]
})

export { handler as GET, handler as POST}