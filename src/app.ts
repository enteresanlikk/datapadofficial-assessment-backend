import { Application } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from 'https://deno.land/x/cors/mod.ts';

import { PORT } from './env.ts';
import routes from './routes/metrics.route.ts';

const app = new Application();

app.use(oakCors());
app.use(routes.routes());
app.use(routes.allowedMethods());

console.log(`App started at http://localhost:${PORT}`);
await app.listen({ port: PORT });