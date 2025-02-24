/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,html}"],
  // Remove darkMode: "class" since we'll use DaisyUI's theme system
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
    darkTheme: "dark", // Explicitly set dark theme
    base: true, // Add base colors
    styled: true, // Include DaisyUI styling
    utils: true, // Include responsive utility classes
  },
};
