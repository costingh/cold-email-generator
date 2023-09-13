import fs from 'fs';
import csvParser from 'csv-parser';

async function readCSVFile(filePath : string) {
    return new Promise((resolve, reject) => {
        const results : any = [];

        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (data) => {
                results.push(data);
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

export async function importContactsFromCSV(filePath : string) {

    try {
        const csvData : any = await readCSVFile(filePath);
        const contacts = csvData.map((rowData: any) => ({
            name: rowData.Name,
            email: rowData.Email,
            phoneNumber: rowData['Phone Number'],
            // Map other attributes based on your CSV columns
        }));

        return contacts;
    } catch (error) {
        console.error('Error importing contacts:', error);
        return [];
    }
}
