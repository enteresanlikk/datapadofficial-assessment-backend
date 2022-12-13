//@ts-nocheck
import { Id, Dimension, Aggregation } from '../enums/mod.ts';

class Tools {
    public static isIdValid(id: string): boolean {
        return Object.values(Id).includes(id);
    }

    public static isDimensionValid(dimension: string): boolean {
        return Object.values(Dimension).includes(dimension);
    }

    public static isAggregationValid(aggregation: string): boolean {
        return Object.values(Aggregation).includes(aggregation);
    }
}

export default Tools;