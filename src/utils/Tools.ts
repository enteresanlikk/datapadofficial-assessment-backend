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

    public static groupByKey(list: MetricRow[], groupKey: string) {        
        return list.reduce((acc, item) => {
            const groupValue = item[groupKey];
            if (groupValue) {
                if(!acc[groupValue]) {
                    acc[groupValue] = [];
                }
                acc[groupValue].push(item);
            }
            return acc;
        }, {});
    }

    public static capitalize(text: string) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    public static orderByObjectKey(obj: any, order: string) {
        const keys = Object.keys(obj);
        const sortedKeys = keys.sort((a, b) => {
            if (a < b) {
                return  -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        });

        const retVal = {};
        sortedKeys.forEach(key => {
            retVal[key] = obj[key];
        });

        return retVal;
    }
}

export default Tools;