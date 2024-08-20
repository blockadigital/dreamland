import { getCsrfToken, signIn, signOut, getSession } from 'next-auth/react';
import type { SIWEVerifyMessageArgs, SIWECreateMessageArgs, SIWESession } from '@web3modal/siwe';
import { createSIWEConfig, formatMessage } from '@web3modal/siwe';
import { mainnet } from 'viem/chains';
import { toast } from 'sonner';

export const siweConfig = createSIWEConfig({
    getMessageParams: async () => ({
        domain: typeof window !== 'undefined' ? window.location.host : '',
        uri: typeof window !== 'undefined' ? window.location.origin : '',
        chains: [mainnet.id],
        statement: 'Please sign with your account'
    }),
    createMessage: ({ address, ...args }: SIWECreateMessageArgs) => formatMessage(args, address),
    getNonce: async () => {
        const nonce = await getCsrfToken();

        if (!nonce) throw new Error('Failed to get nonce!');

        return nonce;
    },
    getSession: async () => {
        const session = await getSession();

        if (!session) throw new Error('Failed to get session!');

        const { address, chainId } = session as unknown as SIWESession;

        return { address, chainId };
    },
    verifyMessage: async ({ message, signature }: SIWEVerifyMessageArgs) => {
        try {
            await signIn('credentials', {
                message,
                signature,
                redirect: false
            });

            return true;
        } catch (e) {
            toast.success('Failed to sign in! Please try again later.');
            console.log(e);
            return false;
        }
    },
    signOut: async () => {
        try {
            await signOut({
                redirect: false
            });
            return true;
        } catch (e) {
            toast.success('Failed to sign out! Please try again later.');
            console.log(e);
            return false;
        }
    }
});
