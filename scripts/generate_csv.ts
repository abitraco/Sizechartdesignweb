
import fs from 'fs';
import path from 'path';
import { BRAND_SIZE_DATA } from '../src/data/brandSizeData';

// Helper to escape CSV fields
const escapeCsv = (field: any) => {
    if (field === null || field === undefined) return '';
    const stringField = String(field);
    if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
        return `"${stringField.replace(/"/g, '""')}"`;
    }
    return stringField;
};

// Collect all unique keys across all data to build the header
const allKeys = new Set<string>();
const standardKeys = ['brand', 'category', 'table_title', 'display_order'];

// Traverse to find all keys
Object.entries(BRAND_SIZE_DATA).forEach(([brand, brandData]: [string, any]) => {
    if (!brandData.tabs) return;
    brandData.tabs.forEach((tab: string) => {
        const tables = brandData[tab];
        if (!tables) return;
        tables.forEach((table: any) => {
            if (table.data) {
                table.data.forEach((row: any) => {
                    Object.keys(row).forEach(k => allKeys.add(k));
                });
            }
        });
    });
});

// Sort keys to have common ones first
const priorityKeys = ['size', 'eu', 'kr', 'num', 'age', 'height', 'weight', 'chest', 'bust', 'waist', 'hip', 'arm', 'footLen', 'cm'];
const sortedDataKeys = Array.from(allKeys).sort((a, b) => {
    const idxA = priorityKeys.indexOf(a);
    const idxB = priorityKeys.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
});

const header = [...standardKeys, ...sortedDataKeys];
const rows: string[] = [];
rows.push(header.join(','));

// Traverse again to build rows
Object.entries(BRAND_SIZE_DATA).forEach(([brand, brandData]: [string, any]) => {
    if (!brandData.tabs) return;
    brandData.tabs.forEach((tab: string) => {
        const tables = brandData[tab];
        if (!tables) return;
        tables.forEach((table: any, tableIdx: number) => {
            if (table.data) {
                table.data.forEach((row: any) => {
                    const rowData = header.map(key => {
                        if (key === 'brand') return brand;
                        if (key === 'category') return tab;
                        if (key === 'table_title') return table.title;
                        if (key === 'display_order') return tableIdx + 1;
                        return row[key];
                    });
                    rows.push(rowData.map(escapeCsv).join(','));
                });
            }
        });
    });
});

const outputPath = path.resolve(__dirname, '../public/size_chart_template.csv');
// Add BOM for Excel compatibility
fs.writeFileSync(outputPath, '\uFEFF' + rows.join('\n'), 'utf-8');
console.log(`CSV template generated at: ${outputPath}`);
