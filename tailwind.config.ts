import type { Config } from 'tailwindcss';
import colors, { black, current } from 'tailwindcss/colors';

const config: Config = {
    content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                primary: colors.slate,
                danger: colors.rose,
                success: colors.emerald,
                warning: colors.amber,
                info: colors.blue,
                gray: colors.zinc
            },
            fontFamily: {
                sans: ['var(--font-sans)']
            }
        }
    },
    plugins: []
};
export default config;
