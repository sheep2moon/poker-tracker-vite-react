import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            includeAssets: ["icon.svg"],
            injectRegister: "auto",
            manifest: {
                name: "PokerSYFGG",
                short_name: "Moze Jopek",
                description: "Aplikacja pozwalająca śledzić stan rozgrywki pokerkowej"
            }
        })
    ]
});
