const fs = require('fs');
const pdf = require('pdf-parse');

async function extractText(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        return;
    }
    let dataBuffer = fs.readFileSync(filePath);
    try {
        const data = await pdf(dataBuffer);
        console.log(`--- TEXT START: ${filePath} ---`);
        console.log(data.text);
        console.log(`--- TEXT END: ${filePath} ---`);
    } catch (error) {
        console.error(`Error parsing ${filePath}:`, error);
    }
}

const files = [
    'docs/20260123_Tyler Rasch Partnership Proposal (English).pptx.pdf',
    'docs/20260123_타일러 라쉬 미디어 협업.pptx(Korean).pdf'
];

(async () => {
    for (const file of files) {
        await extractText(file);
    }
})();
