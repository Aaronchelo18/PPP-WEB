// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), react()],
    server: {
        host: true // Permite conexiones desde cualquier IP
    }
});
