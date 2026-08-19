import os from 'node:os';
import { defineConfig } from '@playwright/test';

const availableWorkers = typeof os.availableParallelism === 'function' ?
    os.availableParallelism() :
    os.cpus().length;

export default defineConfig({
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
        {
            name: 'firefox',
            use: { browserName: 'firefox' },
        },
        {
            name: 'webkit',
            use: { browserName: 'webkit' },
        },
    ],
    testDir: './test/specs',
    testMatch: '**/*.spec.js',
    workers: process.env.CI ?
        4 :
        Math.max(2, Math.min(4, Math.floor(availableWorkers / 2))),
    timeout: 30000,
    use: {
        baseURL: 'http://localhost:3001',
        headless: true,
        viewport: {
            height: 600,
            width: 800,
        },
    },
    webServer: {
        command: 'node test/support/server/static-server.js',
        reuseExistingServer: !process.env.CI,
        url: 'http://localhost:3001',
    },
});
