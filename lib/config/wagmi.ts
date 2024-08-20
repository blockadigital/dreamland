import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

import { cookieStorage, createStorage } from 'wagmi';
import { mainnet } from 'wagmi/chains';

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error('Project ID is not defined');

export const metadata = {
    name: 'Dreamland.works',
    description: 'Dreamland.works is a web3 social network',
    url: 'https://dreamland.works',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet] as const;
export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    }),
    auth: {
        email: false
    }
});
