import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import { getMetrics } from '../controllers/metrics.controller.ts';

const router = new Router();

router.get('/metrics', getMetrics);

export default router;