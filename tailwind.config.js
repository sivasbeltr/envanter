/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./Views/**/*.cshtml",
        "./wwwroot/js/**/*.js"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'primary': '#3b82f6',  // blue-500
                'primary-dark': '#1d4ed8',  // blue-700
                'secondary': '#6b7280',  // gray-500
                'secondary-dark': '#4b5563',  // gray-600
            },
            zIndex: {
                '60': '60',
                '70': '70',
            },
        },
    },
    plugins: [],
}
