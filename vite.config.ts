import devServer from '@hono/vite-dev-server';
import nodeAdapter from '@hono/vite-dev-server/node';
import {defineConfig} from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig(({isSsrBuild}) => {
	return {
		plugins: [
			solid({ssr: true}),
			devServer({
				entry: 'src/index.ts',
				adapter: nodeAdapter
			})
		],
		server: {
			warmup: {
				clientFiles: ['src/css/styles-entry.ts']
			}
		},
		build: {
			cssCodeSplit: false,
			rolldownOptions: {
				input: isSsrBuild
				? 'src/server.ts'
				: ['src/islands-entry.tsx', 'src/client-entry.ts', 'src/css/styles-entry.ts'],
				output: {
					minify: isSsrBuild
					? false
					: {
						compress: {
							dropConsole: true
						}
					}
				}
			},
			outDir: isSsrBuild ? 'dist/server' : 'dist/client',
			emptyOutDir: true,
			manifest: true,
			minify: isSsrBuild ? false : 'oxc'
		}
	};
});
