import {serveStatic} from '@hono/node-server/serve-static'
import {Hono} from 'hono';
import {compress} from 'hono/compress';
import {renderSolidPage} from './middleware.tsx';
import about from './pages/about.tsx';
import home from './pages/home.tsx';

const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

const app = new Hono();

app.use('*', renderSolidPage);

if (isProd) {
	app.use('*', compress());
	app.use('/assets/*', serveStatic({root: './dist/client'}));

	// add a short lived cache time for link preloads on mouseover
	app.use(async (context, next) => {
		await next();
		const contentTypeHeader = context.res.headers.get('Content-Type');
		const isHtmlResponse = contentTypeHeader && contentTypeHeader.includes('text/html');
		if (isHtmlResponse) context.res.headers.set('Cache-Control', 'max-age=3');
	});
}

app.get('/', home);
app.get('/about', about);

export default app;
