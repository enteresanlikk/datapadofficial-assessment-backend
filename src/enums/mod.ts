export enum Id {
    Revenue = 'revenue',
    Sessions = 'sessions',
    Conversion = 'conversion',
    NetRevenue = 'net-revenue',
}

export enum Dimension {
    Brand = 'brand',
    DateWeeknum = 'date.weeknum',
    Date = 'date',
    Customer = 'customer',
}

export enum Aggregation {
    Sum = 'sum',
    Avg = 'avg',
    Distinct = 'distinct',
}

export enum EventType {
    Cart = 'cart',
    Purchase = 'purchase',
    Refund = 'refund',
    View = 'view',
}