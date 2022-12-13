//@ts-nocheck
import { datetime } from '../deps.ts';
import SpreadsheetsService from './SpreadsheetsService.ts';
import { IMetricsService } from '../abstractions/mod.ts';
import { Id, Dimension, Aggregation, EventType } from '../enums/mod.ts';
import type { MetricRow, MetricOptions, MetricFilter, Metric } from '../types/mod.ts';
import Tools from '../utils/Tools.ts';

class MetricService implements IMetricsService {
    private spreadsheetsService: SpreadsheetsService;
    private metric: Id;
    private dimension: Dimension;
    private aggregation: Aggregation;
    private filter: MetricFilter;

    constructor(options: MetricOptions) {
        this.spreadsheetsService = new SpreadsheetsService();

        this.metric = options.metric;
        this.dimension = options.dimension;
        this.aggregation = options.aggregation;
        this.filter = options.filter;
    }

    public async getMetrics(): Promise<Metric[] | null> {
        const metrics = await this.spreadsheetsService.getMetrics();

        let retVal = <Metric[]>{};
        switch (this.metric) {
            case Id.Revenue:
                retVal = this.getAvgRevenueByBrand(metrics);
                break;
            case Id.Sessions:
                retVal = this.getWeeklySessions(metrics);
                break;
            case Id.Conversion:
                retVal = this.getDailyConversionDate(metrics);
                break;
            case Id.NetRevenue:
                retVal = this.getNetRevenueOfEachCustomer(metrics,this.filter);
                break;
        }

        return Object.keys(retVal).length > 0 ? Tools.orderByObjectKey(retVal) : null;
    }

    private getAvgRevenueByBrand(data: MetricRow[]): Metric[] {
        const list = data.filter(item => item.eventType === EventType.Purchase);
        
        const groupedByBrand = Tools.groupByKey(list, 'brand');

        const retVal: Metric[] = <Metric[]>{};
        Object.keys(groupedByBrand).map(key => {
            const items = groupedByBrand[key];
            const total = items.reduce((acc: number, item: MetricRow) => acc + parseFloat(item.price), 0);
            retVal[Tools.capitalize(key)] = [
                {
                    value: (total / items.length).toFixed(2),
                }
            ];
        });
        return retVal;
    }

    private getWeeklySessions(data: MetricRow[]): Metric[] {
        const list = [...new Map(data.map(item => [item.userSession, item])).values()];
        
        const groupedByWeek = list.reduce((acc, item) => {
            const date = datetime.parse(item.eventTime, 'M/d/yyyy H:mm:ss');
            const key= datetime.weekOfYear(date).toString();
            if (key) {
                if(!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(item);
            }
            return acc;
        }, {});

        const retVal: Metric[] = <Metric[]>{};
        Object.keys(groupedByWeek).map(key => {
            const items = groupedByWeek[key];
            retVal[Tools.capitalize(key)] = [
                {
                    value: (items.length).toFixed(0),
                }
            ];
        });
        return retVal;
    }

    private getDailyConversionDate(data: MetricRow[]): Metric[] {
        const list: MetricRow[] = [...new Map(data.map(item => [item.userSession, item])).values()];

        const groupedByDate = list.reduce((acc, item) => {
            const key = datetime.format(datetime.parse(item.eventTime, 'M/d/yyyy H:mm:ss'), 'yyyy-MM-dd');
            if (key) {
                if(!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(item);
            }
            return acc;
        }, {});

        const retVal: Metric[] = <Metric[]>{};
        Object.keys(groupedByDate).map(key => {
            const items = groupedByDate[key];
            const purchases = items.filter((item: MetricRow) => item.eventType === EventType.Purchase);
            retVal[Tools.capitalize(key)] = [
                {
                    sessions: items.length,
                    purchases: purchases.length,
                    value: ((purchases.length / items.length) * 100).toFixed(2),
                }
            ];
        });
        return retVal;
    }

    private getNetRevenueOfEachCustomer(data: MetricRow[], filter: MetricFilter): Metric[] {
        const from = new Date(filter.date.from);
        const to = new Date(filter.date.to);

        const list = data.filter(item => {
            const date = new Date(item.eventTime);
            return (item.eventType === EventType.Purchase || item.eventType === EventType.Refund) && date >= from && date <= to;
        });

        const groupedByCustomer = Tools.groupByKey(list, 'userId');

        const retVal: Metric[] = <Metric[]>{};
        Object.keys(groupedByCustomer).map(key => {
            const items = groupedByCustomer[key];

            const purchases = items.filter((item: MetricRow) => item.eventType === EventType.Purchase);
            const refunds = items.filter((item: MetricRow) => item.eventType === EventType.Refund);

            const totalPurchases = purchases.reduce((acc: number, item: MetricRow) => acc + parseFloat(item.price), 0);
            const totalRefunds = refunds.reduce((acc: number, item: MetricRow) => acc + parseFloat(item.price), 0);

            retVal[Tools.capitalize(key)] = [
                {
                    value: (totalPurchases - totalRefunds).toFixed(2),
                }
            ];
        });
        return retVal;
    }
}

export default MetricService;