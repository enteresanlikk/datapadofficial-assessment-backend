import { Id, Aggregation, Dimension } from '../enums/mod.ts';

export type MetricRow = {
    eventTime: string;
    eventType: string;
    productId: string;
    categoryId: string;
    categoryCode: string;
    brand: string;
    price: string;
    userId: string;
    userSession: string;
};

export type MetricResponse = {
    metric: Id;
    dimensions: Dimension[];
    aggregation: Aggregation;
    filter: MetricFilter | null;
    data: Metric[] | null;
};

export type MetricFilter = {
  date: MetricFilterDate;
};

export type MetricFilterDate = {
  from: string;
  to: string;
};

export type Metric = Record<string, MetricItem[]>;

export type MetricItem = Record<string, string | number>;

export type MetricOptions = {
  metric: Id;
  dimension: Dimension;
  aggregation: Aggregation;
  filter: MetricFilter;
};