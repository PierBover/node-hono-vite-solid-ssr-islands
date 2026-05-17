// we only need this entry point in production
// during dev we use the vite dev server

import { serve } from '@hono/node-server';
import app from './index.ts';

serve({
	fetch: app.fetch,
	port: 3000
});

console.log('server started at http://localhost:3000');
