
const fs = require('fs');
const path = require('path');

// 1. Get State Names from Code (Hardcoded for simplicity based on what we saw)
const STATE_NAMES = {
    'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
    'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
    'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
    'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
    'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
    'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New_Hampshire': 'NH', 'New_Jersey': 'NJ',
    'New_Mexico': 'NM', 'New_York': 'NY', 'North_Carolina': 'NC', 'North_Dakota': 'ND', 'Ohio': 'OH',
    'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode_Island': 'RI', 'South_Carolina': 'SC',
    'South_Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
    'Virginia': 'VA', 'Washington': 'WA', 'West_Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
    'District_of_Columbia': 'DC'
};

// 2. Read SVG File
const svgPath = 'c:\\Users\\peaco\\OneDrive\\Desktop\\antigravity\\arrest-watch-dashboard\\app\\src\\assets\\Usa_counties_large.svg';
try {
    const svgContent = fs.readFileSync(svgPath, 'utf8');

    // 3. Extract IDs
    // Simple regex to find g id="..."
    const idRegex = /<g id="([^"]+)">/g;
    let match;
    const svgIds = new Set();

    while ((match = idRegex.exec(svgContent)) !== null) {
        svgIds.add(match[1]);
    }

    // 4. Compare
    console.log("Checking for missing SVG IDs...");
    const missingInSvg = [];
    Object.keys(STATE_NAMES).forEach(name => {
        if (!svgIds.has(name)) {
            missingInSvg.push(name);
        }
    });

    if (missingInSvg.length > 0) {
        console.log("Found mismatches! These states are in code but NOT in SVG (check for typos):");
        missingInSvg.forEach(m => console.log(`- ${m}`));
    } else {
        console.log("All state names in code matched an ID in the SVG!");
    }

} catch (err) {
    console.error("Error reading file:", err);
}
