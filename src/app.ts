import { oak, cors } from './deps.ts';
import { PORT } from './env.ts';
import routes from './routers/index.ts';

const app = new oak.Application();

app.use(cors.oakCors());
app.use(routes.routes());
app.use(routes.allowedMethods());

console.log(`App started at http://localhost:${PORT}`);
await app.listen({ port: +PORT });