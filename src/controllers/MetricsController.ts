import { oak, oakHelpers } from '../deps.ts';
import MetricService from '../services/MetricsService.ts';
import MetricService2 from '../services/MetricsService2.ts';
import type { MetricResponse, MetricOptions } from '../types/mod.ts';
import Tools from '../utils/Tools.ts';

class MetricsController {
  public static async getMetrics(ctx: oak.Context) {
    const query = oakHelpers.getQuery(ctx);

    const { id, dimensions, aggregate } = query;

    if (!id || !dimensions || !aggregate) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'bad request.' };
      return;
    }

    if (!Tools.isIdValid(id)) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'id parameter is not valid.' };
      return;
    }

    if (!Tools.isDimensionValid(dimensions)) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'dimensions parameter is not valid.' };
      return;
    }

    if (!Tools.isAggregationValid(aggregate)) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'aggregate parameter is not valid.' };
      return;
    }

    const responseBody: MetricResponse = <MetricResponse>{
      metric: id,
      dimensions: dimensions.split(','),
      aggregation: aggregate
    };

    if (query['filter.date.from'] && query['filter.date.to']) {
      responseBody.filter = {
          date: {
            from: query['filter.date.from'],
            to: query['filter.date.to']
          }
      };
    }

    const metricOptions: MetricOptions = <MetricOptions>{
      metric: responseBody.metric,
      dimension: responseBody.dimensions.at(0),
      aggregation: responseBody.aggregation,
      filter: responseBody.filter
    };
    const metricService = new MetricService(metricOptions);
    const metrics = await metricService.getMetrics();
    responseBody.data = metrics;

    ctx.response.body = responseBody;
  }

  public static async getMetrics2(ctx: oak.Context) {
    const query = oakHelpers.getQuery(ctx);

    const { id, dimensions, aggregate } = query;

    if (!id || !dimensions || !aggregate) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'bad request.' };
      return;
    }

    const responseBody: MetricResponse = <MetricResponse>{
      metric: id,
      dimensions: dimensions.split(','),
      aggregation: aggregate
    };

    if (query['filter.date.from'] && query['filter.date.to']) {
      responseBody.filter = {
          date: {
            from: query['filter.date.from'],
            to: query['filter.date.to']
          }
      };
    }

    const metricOptions: MetricOptions = <MetricOptions>{
      metric: responseBody.metric,
      dimension: responseBody.dimensions.at(0),
      aggregation: responseBody.aggregation,
      filter: responseBody.filter
    };
    const metricService = new MetricService2(metricOptions);
    const metrics = await metricService.getMetrics();
    responseBody.data = metrics;

    ctx.response.body = responseBody;
  }
}

export default MetricsController;