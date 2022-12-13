import { axiod, path } from '../deps.ts';
import {
    SHEET_ID,
    DATA_SHEET_NAME,
    GOOGLE_API_KEY
} from '../env.ts';
import type { MetricRow } from '../types/mod.ts';
import { DataReadMode } from '../enums/mod.ts';
import { ISpreadsheetsService } from '../abstractions/mod.ts';

class SpreadsheetsService implements ISpreadsheetsService {
    private baseAPIUrl: string;
    private dataReadMode: DataReadMode;

    constructor(dataReadMode?: DataReadMode) {
        this.baseAPIUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
        this.dataReadMode = dataReadMode || DataReadMode.API;
    }

    private async getData(sheetId: string, sheetName: string) : Promise<string[][]> {
        const { data } = await axiod.get(`${this.baseAPIUrl}/${sheetId}/values/${sheetName}?key=${GOOGLE_API_KEY}`);

        data.values.shift();
        
        return data.values;
    }

    private async getMetricsByFile() : Promise<MetricRow[]> {
        const file = path.resolve(Deno.cwd(), 'src', 'data', 'metrics.json');
        
        const text = await Deno.readTextFile(file);

        const rows: MetricRow[] = JSON.parse(text);

        return rows;
    }

    private async getMetricsByAPI() : Promise<MetricRow[]> {        
        const data: string[][] = await this.getData(`${SHEET_ID}`, `${DATA_SHEET_NAME}`);

        const rows : MetricRow[] = data.map((row: string[]) => {
            return <MetricRow>{
                eventTime: row[0],
                eventType: row[1],
                productId: row[2],
                categoryId: row[3],
                categoryCode: row[4],
                brand: row[5],
                price: row[6],
                userId: row[7],
                userSession: row[8]
            };
        });

        return rows;
    }

    public async getMetrics() : Promise<MetricRow[] | null> {        
        if (this.dataReadMode === DataReadMode.API) {
            return await this.getMetricsByAPI();
        } else if (this.dataReadMode === DataReadMode.JSON_FILE) {
            return await this.getMetricsByFile();
        }
        return null;
    }
}

export default SpreadsheetsService;