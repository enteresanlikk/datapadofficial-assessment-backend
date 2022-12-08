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

export type MetricResponseData = {
    metric: string;
    dimensions: string[];
    aggregation: string;
    filter?: {
      date: {
        from: string;
        to: string;
      }
    };
    data: any | null;
};