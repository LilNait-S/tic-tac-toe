import { defineConfig } from "vite";  // https://vitejs.dev/config/
import react from '@vitejs/plugin-react'

export default defineConfig ({
    plugins : [react()],
})