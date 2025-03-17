// path: packages/grogui/vitest.config.js

import { sveltekit } from '@sveltejs/kit/vite';
/// <reference types="vitest/config" />
import {defineConfig} from 'vitest/config'


// import {svelteTesting} from '@testing-library/svelte/vite'


export default defineConfig(({mode}) => {
	return {
		plugins: [
			sveltekit(),
            // svelteTesting(),
	    ],
        resolve: {
            conditions: ['svelte']
        },
        test: {
            environment: 'jsdom',
            setupFiles: ['./vitest-setup.js'],
            include: ['src/**/*.test.{js,ts}'],
            coverage: {
                reporter: ['text', 'json', 'html'],
            },
            reporters: [
                ['default', {
                    summary: false,
                }],
                ['junit', {
                    outputFile: './coverage/junit.xml',
                }],
            ],
        }
    }
});