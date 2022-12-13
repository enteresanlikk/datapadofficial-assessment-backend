import type { MetricRow, Metric } from '../types/mod.ts';

export interface IService { } 

export interface IMetricsService {
    getMetrics(): Promise<Metric[] | null>;
}

export interface ISpreadsheetsService {
    getMetrics(): Promise<MetricRow[]>;
}

export interface IController { }