/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        anton: ["Anton SC", "sans-serif"],
        aref: ["Aref Ruqaa Ink", "serif"],
        bungee: ["Bungee Spice", "cursive"],
        "dm-serif": ["DM Serif Text", "serif"],
        days: ["Days One", "sans-serif"],
        maamli: ["Ga Maamli", "serif"],
        koulen: ["Koulen", "cursive"],
        lemon: ["Lemon", "cursive"],
        metal: ["Metal Mania", "cursive"],
        righteous: ["Righteous", "cursive"],
        rowdies: ["Rowdies", "cursive"],
        yatra: ["Yatra One", "cursive"],
        Roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
