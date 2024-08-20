import credentialsProvider from 'next-auth/providers/credentials';
import { type SIWESession, verifySignature, getChainIdFromMessage, getAddressFromMessage } from '@web3modal/siwe';
import { db } from '@/lib/config/db';
import { adjectives, animals, colors, uniqueNamesGenerator } from 'unique-names-generator';
import { eq } from 'drizzle-orm';
import { users } from '@/database/schema';
import { env } from '@/lib/utils/env';
import type { NextAuthOptions } from 'next-auth';

const nextAuthSecret = env.NEXTAUTH_SECRET;
const projectId = env.NEXT_PUBLIC_PROJECT_ID;

declare module 'next-auth' {
    interface Session extends SIWESession {
        address: string;
        chainId: number;
    }
}

const providers = [
    credentialsProvider({
        name: 'Ethereum',
        credentials: {
            message: {
                label: 'Message',
                type: 'text',
                placeholder: '0x0'
            },
            signature: {
                label: 'Signature',
                type: 'text',
                placeholder: '0x0'
            }
        },
        async authorize(credentials) {
            try {
                if (!credentials?.message || !credentials?.signature) throw new Error('SiweMessage is undefined');

                const { message, signature } = credentials;
                const address = getAddressFromMessage(message);
                const chainId = getChainIdFromMessage(message);

                const isValid = await verifySignature({
                    address,
                    message,
                    signature,
                    chainId,
                    projectId
                });

                if (isValid) {
                    return {
                        id: `${chainId}:${address}`
                    };
                }

                return null;
            } catch (e) {
                return null;
            }
        }
    })
];

export const authOptions: NextAuthOptions = {
    secret: nextAuthSecret,
    providers,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/',
        signOut: '/',
        error: '/',
        verifyRequest: '/',
        newUser: '/'
    },
    callbacks: {
        session({ session, token }) {
            if (!token.sub) return session;

            const [, chainId, address] = token.sub.split(':');

            if (chainId && address) {
                session.address = address;
                session.chainId = parseInt(chainId, 10);
            }

            return session;
        },
        async signIn({ credentials }) {
            try {
                const address = getAddressFromMessage(credentials?.message as string);
                const check = await db.select().from(users).where(eq(users.address, address));

                if (check.length > 0) return true;

                const name = uniqueNamesGenerator({
                    dictionaries: [adjectives, colors, animals],
                    separator: ' ',
                    style: 'capital',
                    seed: address
                });

                const avatar = Math.floor(Math.random() * 12) + 1 + '.png';

                await db.insert(users).values({ name, address, avatar });

                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    }
};
