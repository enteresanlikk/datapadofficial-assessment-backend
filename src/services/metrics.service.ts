import SpreadsheetsService from './spreadsheets.service.ts';

class MetricService {
    private spreadsheetsService: SpreadsheetsService;
    private metric: string;
    private dimensions: string[];
    private aggregation: string;
    private filter?: { date: { from: string, to: string } };

    constructor({ metric, dimensions, aggregation, filter }: { metric: string, dimensions: string[], aggregation: string, filter?: { date: { from: string, to: string } } }) {
        this.spreadsheetsService = new SpreadsheetsService();

        this.metric = metric;
        this.dimensions = dimensions;
        this.aggregation = aggregation;
        this.filter = filter;
    }

    public async getMetrics() {
        const metrics = await this.spreadsheetsService.getMetrics();
        return metrics.slice(0, 1);
    }
}

export default MetricService;