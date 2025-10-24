import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        primary: '#E50914',     // червоний Netflix-style
        accent: '#FFD700',      // золотий для преміуму
        bgDark: '#0F0F0F',      // головний фон
        surface: '#1C1C1C',     // картки, панелі
        textPrimary: '#F5F5F5', // основний текст
        textSecondary: '#A1A1AA', // допоміжний текст
      },
    },
  },
} satisfies Config;