const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Target path for artifact
const outputPath = 'C:\\Users\\peaco\\.gemini\\antigravity\\brain\\b4320429-7010-45be-b61e-c6e2f34625c7\\investor_pack.pdf';

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Good for some environments
    });
    const page = await browser.newPage();

    // High res viewport for better rendering quality
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

    try {
        console.log('Navigating to page...');
        await page.goto('http://localhost:5174/investor', { waitUntil: 'networkidle0' });

        console.log('Injecting print styles...');
        await page.addStyleTag({
            content: `
        @media print {
            @page { 
                size: landscape;
                margin: 0; 
            }
            body {
                overflow: visible !important;
                background-color: #000000 !important;
                color: #ffffff !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                height: auto !important;
                width: 100% !important;
            }
            
            /* Break the horizontal scroll */
            .brand-scroll-container {
                display: block !important;
                overflow: visible !important;
                height: auto !important;
                width: 100% !important;
                position: static !important;
            }
            
            /* Each section takes a full page */
            .brand-section {
                height: 100vh !important;
                width: 100% !important;
                page-break-after: always !important;
                page-break-inside: avoid !important;
                display: flex !important;
                position: relative !important;
                border: none !important;
                left: 0 !important; /* Ensure no scroll offset remains */
                transform: none !important;
            }

            /* Fix backgrounds of panels in print */
            .panel {
                backdrop-filter: none !important;
                background: rgba(26, 26, 26, 1) !important;
                 -webkit-print-color-adjust: exact !important;
                 print-color-adjust: exact !important;
            }
            
            .dash-header, .dash-sidebar {
                 background: rgba(26, 26, 26, 1) !important;
            }

            /* Hide UI elements */
            .nav-indicators, 
            .back-link, 
            .nav-arrow {
                display: none !important;
            }
            
            /* Hide scrollbars */
            ::-webkit-scrollbar {
                display: none !important;
            }
        }
      `
        });

        // Wait for animations/rendering
        await new Promise(r => setTimeout(r, 2000));

        // Ensure directory exists (it should, but good practice)
        // Actually we assume it exists as per instructions.

        console.log(`Generating PDF to ${outputPath}...`);
        await page.pdf({
            path: outputPath,
            format: 'A4',
            landscape: true,
            printBackground: true,
            margin: { top: '0cm', right: '0cm', bottom: '0cm', left: '0cm' }
        });

        console.log('PDF generated successfully.');
    } catch (e) {
        console.error('Error generating PDF:', e);
        process.exit(1);
    } finally {
        await browser.close();
        process.exit(0);
    }
})();
