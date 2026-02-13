import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        navbar: "70px",
      },
      colors: {
        sinfo: {
          primary: "#1c2b70",
          secondary: "#bf2c21",
          tertiary: "#f1853a",
          quaternary: "#E0B485",
          light: "#F2F5FC",
          quinary: "#fcbd14",
          senary: "#c465a2",
          septenary: "#48c6e4",
        },
      },
    },
  },
  plugins: [],
};

export default config satisfies Config;
