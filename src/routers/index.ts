import { oak } from '../deps.ts';
import metricsRouter from './metrics.router.ts';

const router = new oak.Router();

router.use(metricsRouter.routes());
router.use(metricsRouter.allowedMethods());

export default router;