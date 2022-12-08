export enum Metric {
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

export enum Aggregate {
    Sum = 'sum',
    Avg = 'avg',
    Distinct = 'distinct',
}