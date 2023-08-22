import fs from 'fs';
import csvParser from 'csv-parser';

async function readCSVFile(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];

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

export async function importContactsFromCSV(filePath) {

    try {
        const csvData = await readCSVFile(filePath);
        const contacts = csvData.map((rowData) => ({
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
