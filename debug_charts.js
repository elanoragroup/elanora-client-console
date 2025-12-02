const fs = require('fs');
const path = 'k:\\elanora\\client console\\app\\reports\\page.tsx';

try {
    const content = fs.readFileSync(path, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, index) => {
        if (line.includes('ComplianceChart') || line.includes('ServicePieChart') || line.includes('PaymentLineChart')) {
            console.log(`${index + 1}: ${line}`);
        }
    });
} catch (err) {
    console.error('Error reading file:', err);
}
