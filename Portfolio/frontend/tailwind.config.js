/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Oswald', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
                script: ['"Dancing Script"', 'cursive'],
            },
            colors: {
                portfolio: {
                    pink: '#FFC5E5',
                    cream: '#FCFCEF',
                    lime: '#C2D245',
                    brown: '#401F18',
                    black: '#111111',
                }
            },
        },
    },
    plugins: [],
}
