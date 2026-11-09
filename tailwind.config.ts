import type { Config } from "tailwindcss";
import { sinfoColors } from "./src/constants/colors";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        laptop: "1080px",
      },
      spacing: {
        navbar: "70px",
      },
      colors: {
        sinfo: sinfoColors,
      },
    },
  },
  plugins: [],
};

export default config satisfies Config;
