//@ts-nocheck
import { datetime } from '../deps.ts';
import SpreadsheetsService from './SpreadsheetsService.ts';
import { IMetricsService } from '../abstractions/mod.ts';
import { Id, Dimension, Aggregation, EventType } from '../enums/mod.ts';
import type { MetricRow, MetricOptions, MetricFilter, Metric } from '../types/mod.ts';

class MetricService2 implements IMetricsService {
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

    private capitalize(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    public async getMetrics(): Promise<Metric[] | null> {
        const metrics = await this.spreadsheetsService.getMetrics();
        
        //data
        let list = metrics;

        //distinct data
        if(this.aggregation === Aggregation.Distinct) {
            list = [...new Map(list.map(item => [item.userSession, item])).values()];
        }

        //filter data by metric
        if(this.metric === Id.Revenue) {
            list = list.filter(item => item.eventType === EventType.Purchase);
        } else if(this.metric === Id.NetRevenue) {    
            list = list.filter(item => {
                return item.eventType === EventType.Purchase || item.eventType === EventType.Refund;
            });
        }

        //filter data by filter date
        if(this?.filter?.date?.from && this?.filter?.date?.to) {
            const from = new Date(this.filter.date.from);
            const to = new Date(this.filter.date.to);

            list = list.filter(item => {
                const date = new Date(item.eventTime);
                return date >= from && date <= to;
            });
        }

        //group by dimension
        let groupedData = <Metric[]>{};
        if(this.dimension === Dimension.Brand) {
            groupedData = list.reduce((acc, item) => {
                const key = item.brand;
                if (key) {
                    if(!acc[key]) {
                        acc[key] = [];
                    }
                    acc[key].push(item);
                }
                return acc;
            }, <Metric[]>{});
        } else if(this.dimension === Dimension.DateWeeknum) {
            groupedData = list.reduce((acc, item) => {
                const date = datetime.parse(item.eventTime, 'M/d/yyyy H:mm:ss');
                const key= datetime.weekOfYear(date).toString();
                if (key) {
                    if(!acc[key]) {
                        acc[key] = [];
                    }
                    acc[key].push(item);
                }
                return acc;
            }, <Metric[]>{});
        } else if(this.dimension === Dimension.Date) {
            groupedData = list.reduce((acc, item) => {
                const key = datetime.format(datetime.parse(item.eventTime, 'M/d/yyyy H:mm:ss'), 'yyyy-MM-dd');
                if (key) {
                    if(!acc[key]) {
                        acc[key] = [];
                    }
                    acc[key].push(item);
                }
                return acc;
            }, <Metric[]>{});
        } else if(this.dimension === Dimension.Customer) {
            groupedData = list.reduce((acc, item) => {
                const key = item.userId;
                if (key) {
                    if(!acc[key]) {
                        acc[key] = [];
                    }
                    acc[key].push(item);
                }
                return acc;
            }, <Metric[]>{});
        }

        //aggregate data
        const retVal: Metric[] = <Metric[]>{};
        if(this.aggregation === Aggregation.Avg) {
            Object.keys(groupedData).map(key => {
                const items = groupedData[key];
                const total = items.reduce((acc: number, item: MetricRow) => acc + parseFloat(item.price), 0);
                retVal[this.capitalize(key)] = [
                    {
                        value: (total / items.length).toFixed(2),
                    }
                ];
            });
        }

        if(this.metric === Id.Sessions) {
            Object.keys(groupedData).map(key => {
                const items = groupedData[key];
                retVal[this.capitalize(key)] = [
                    {
                        value: (items.length).toFixed(0),
                    }
                ];
            });
        }

        if(this.metric === Id.Conversion) {
            Object.keys(groupedData).map(key => {
                const items = groupedData[key];
                const purchases = items.filter((item: MetricRow) => item.eventType === EventType.Purchase);

                retVal[this.capitalize(key)] = [
                    {
                        sessions: items.length,
                        purchases: purchases.length,
                        value: ((purchases.length / items.length) * 100).toFixed(2),
                    }
                ];
            });
        }

        if(this.metric === Id.NetRevenue && this.aggregation === Aggregation.Sum) {
            Object.keys(groupedData).map(key => {
                const items = groupedData[key];
    
                const purchases = items.filter((item: MetricRow) => item.eventType === EventType.Purchase);
                const refunds = items.filter((item: MetricRow) => item.eventType === EventType.Refund);
    
                const totalPurchases = purchases.reduce((acc: number, item: MetricRow) => acc + parseFloat(item.price), 0);
                const totalRefunds = refunds.reduce((acc: number, item: MetricRow) => acc + parseFloat(item.price), 0);
    
                retVal[this.capitalize(key)] = [
                    {
                        value: (totalPurchases - totalRefunds).toFixed(2),
                    }
                ];
            });
        }

        return Object.keys(retVal).length > 0 ? retVal : null;
    }
}

export default MetricService2;