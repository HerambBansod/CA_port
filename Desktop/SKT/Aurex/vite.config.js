import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        solutions: resolve(__dirname, 'solutions.html'),
        solutions_flood: resolve(__dirname, 'solutions-flood-warning.html'),
        projects: resolve(__dirname, 'projects.html'),
        about: resolve(__dirname, 'about.html'),
        insights: resolve(__dirname, 'insights.html'),
        contact: resolve(__dirname, 'contact.html'),
      }
    }
  }
});
