
import Papa from 'papaparse';
import { BRAND_SIZE_DATA as FALLBACK_DATA } from '../data/brandSizeData';

export interface SizeDataRow {
    brand: string;
    category: string;
    table_title: string;
    display_order: string;
    [key: string]: string;
}

const KEY_TO_LABEL: Record<string, string> = {
    size: '사이즈',
    eu: 'EU',
    kr: '한국',
    num: '숫자',
    chest: '가슴(cm)',
    bust: '가슴(cm)',
    waist: '허리(cm)',
    hip: '힙(cm)',
    arm: '팔길이(cm)',
    height: '신장(cm)',
    weight: '몸무게(kg)',
    footLen: '발길이(cm)',
    cm: '발길이(cm)',
    age: '나이/개월',
    collar: '목둘레(cm)',
    seat: '엉덩이(cm)',
    leg: '다리길이(cm)',
    ageSize: '나이/사이즈',
    krLen: '한국(mm)',
    size2: '사이즈2',
    krLen2: '한국(mm)2',
    sizeLen: '사이즈/길이'
};

// Priority for column ordering
const COLUMN_PRIORITY = ['size', 'eu', 'kr', 'num', 'age', 'height', 'weight', 'chest', 'bust', 'waist', 'hip', 'arm', 'footLen', 'cm'];

export const fetchSizeData = async (sheetUrl?: string) => {
    if (!sheetUrl) {
        console.warn("No Google Sheet URL provided, using fallback data.");
        return FALLBACK_DATA;
    }

    try {
        const response = await fetch(sheetUrl);
        const arrayBuffer = await response.arrayBuffer();
        const decoder = new TextDecoder('utf-8');
        const csvText = decoder.decode(arrayBuffer);

        // Check if response is HTML (e.g. Google Login page or 404)
        if (csvText.trim().toLowerCase().startsWith('<!doctype html') || csvText.trim().toLowerCase().startsWith('<html')) {
            console.error("Fetched content appears to be HTML, not CSV. Check if the Google Sheet is public (Anyone with the link).");
            return FALLBACK_DATA;
        }

        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const rows = results.data as SizeDataRow[];
                    const processedData = processCsvRows(rows);
                    resolve(processedData);
                },
                error: (error: any) => {
                    console.error("CSV Parse Error:", error);
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error("Fetch Error:", error);
        return FALLBACK_DATA;
    }
};

const processCsvRows = (rows: SizeDataRow[]) => {
    const result: any = {};

    // Group by Brand
    const brandGroups: Record<string, SizeDataRow[]> = {};
    rows.forEach(row => {
        if (!row.brand) return;
        const brand = row.brand.toLowerCase();
        if (!brandGroups[brand]) brandGroups[brand] = [];
        brandGroups[brand].push(row);
    });

    Object.keys(brandGroups).forEach(brand => {
        const brandRows = brandGroups[brand];
        result[brand] = { tabs: [] };

        // Group by Category (Tab)
        const tabGroups: Record<string, SizeDataRow[]> = {};
        const tabsSet = new Set<string>();

        brandRows.forEach(row => {
            if (!row.category) return;
            const tab = row.category.toLowerCase();
            tabsSet.add(tab);
            if (!tabGroups[tab]) tabGroups[tab] = [];
            tabGroups[tab].push(row);
        });

        // Sort tabs if needed (women, men, shoes, kids)
        const sortedTabs = Array.from(tabsSet).sort((a, b) => {
            const order = ['women', 'men', 'shoes', 'kids'];
            return order.indexOf(a) - order.indexOf(b);
        });

        result[brand].tabs = sortedTabs;

        sortedTabs.forEach(tab => {
            const tabRows = tabGroups[tab];
            result[brand][tab] = [];

            // Group by Table Title
            const tableGroups: Record<string, SizeDataRow[]> = {};
            // Keep track of order
            const tableOrder: string[] = [];

            tabRows.forEach(row => {
                const title = row.table_title || 'General';
                if (!tableGroups[title]) {
                    tableGroups[title] = [];
                    tableOrder.push(title);
                }
                tableGroups[title].push(row);
            });

            // Sort tables by display_order if available
            tableOrder.sort((a, b) => {
                const orderA = parseInt(tableGroups[a][0].display_order || '0');
                const orderB = parseInt(tableGroups[b][0].display_order || '0');
                return orderA - orderB;
            });

            tableOrder.forEach(title => {
                const tableRows = tableGroups[title];

                // Determine keys for this table (exclude metadata keys)
                const keysSet = new Set<string>();
                tableRows.forEach(row => {
                    Object.keys(row).forEach(k => {
                        if (['brand', 'category', 'table_title', 'display_order'].includes(k)) return;
                        if (row[k] && row[k].trim() !== '') {
                            keysSet.add(k);
                        }
                    });
                });

                // Sort keys
                const keys = Array.from(keysSet).sort((a, b) => {
                    const idxA = COLUMN_PRIORITY.indexOf(a);
                    const idxB = COLUMN_PRIORITY.indexOf(b);
                    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                    if (idxA !== -1) return -1;
                    if (idxB !== -1) return 1;
                    return a.localeCompare(b);
                });

                const columns = keys.map(k => KEY_TO_LABEL[k] || k.toUpperCase());

                // Clean data rows
                const cleanData = tableRows.map(row => {
                    const newRow: any = {};
                    keys.forEach(k => {
                        newRow[k] = row[k];
                    });
                    return newRow;
                });

                result[brand][tab].push({
                    title,
                    columns,
                    keys,
                    data: cleanData
                });
            });
        });
    });

    return result;
};
