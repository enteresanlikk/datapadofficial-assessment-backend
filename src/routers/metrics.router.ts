import { oak } from '../deps.ts';
import MetricsController from '../controllers/MetricsController.ts';

const router = new oak.Router();

router.get('/metrics', MetricsController.getMetrics)
    .get('/metrics2', MetricsController.getMetrics2);

export default router;