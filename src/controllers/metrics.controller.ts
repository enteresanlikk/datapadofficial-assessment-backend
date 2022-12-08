import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";
import MetricService from '../services/metrics.service.ts';
import type { MetricResponseData } from '../types/mod.ts';
import { Metric, Dimension, Aggregate } from "../enums/mod.ts";

export const getMetrics = async (ctx: Context) => {
    const query = getQuery(ctx);
  
    const { id, dimensions, aggregate } = query;

    if (!id || !dimensions || !aggregate) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'bad request.' };
      return;
    }

    if (!Object.values(Metric).includes(id)) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'id parameter is not valid.' };
      return;
    }

    if (!Object.values(Dimension).includes(dimensions)) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'dimensions parameter is not valid.' };
      return;
    }

    if (!Object.values(Aggregate).includes(aggregate)) {
      ctx.response.status = 400;
      ctx.response.body = { message: 'aggregate parameter is not valid.' };
      return;
    }
  
    const responseBody = <MetricResponseData>{
      metric: id,
      dimensions: dimensions.split(','),
      aggregation: aggregate,
    };
  
    if (query['filter.date.from'] && query['filter.date.to']) {
      responseBody.filter = {
          date: {
            from: query['filter.date.from'],
            to: query['filter.date.to']
          }
      };
    }
  
    const metricService = new MetricService({...responseBody});
  
    const metrics = await metricService.getMetrics();
    const hasMetrics = Object.keys(metrics).length > 0;
    responseBody.data = hasMetrics ? metrics : null;
  
    ctx.response.body = responseBody;
  };