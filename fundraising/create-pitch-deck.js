/**
 * @fileoverview Pitch Deck Generator
 *
 * Creates a professional investor pitch deck in .docx format for SaaS fundraising.
 * Generates a complete pitch deck with problem, solution, market, traction, team,
 * financials, and ask sections tailored for HOA fund accounting SaaS.
 *
 * @module create-pitch-deck
 * @requires docx
 * @requires fs
 *
 * @author Fundraising Templates
 * @version 1.0
 */

const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, PageBreak, AlignmentType, HeadingLevel, LevelFormat } = require('docx');

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22 } }
    },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal",
        run: { size: 36, bold: true, color: "000000" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal",
        run: { size: 28, bold: true, color: "000000" },
        paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 1 } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    children: [
      // Slide 1: Cover
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 2000 },
        children: [new TextRun({ text: "[COMPANY NAME]", size: 48, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 400 },
        children: [new TextRun({ text: "Multi-Tenant Fund Accounting for HOAs", size: 36, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 800 },
        children: [new TextRun({ text: "Eliminating $70K+ in annual accounting costs", size: 28 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Zero tolerance for financial errors", size: 28 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 1200 },
        children: [new TextRun({ text: "[Your Name], Founder & CEO", size: 24 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "[your.email@company.com]", size: 24 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 400 },
        children: [new TextRun({ text: "CONFIDENTIAL", size: 24, bold: true, italics: true })]
      }),

      // Slide 2: The Problem
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        children: [new TextRun("The Problem")]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        children: [new TextRun("HOAs Struggle with Broken Accounting")]
      }),
      new Paragraph({ text: "", spacing: { before: 400 } }),
      new Paragraph({
        children: [new TextRun({ text: "370,000 HOAs in the US face:", bold: true, size: 24 })]
      }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "90% Use Spreadsheets - ", bold: true }), new TextRun("Generic accounting software not designed for fund accounting")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "20-40 Hours/Month on Bank Reconciliation - ", bold: true }), new TextRun("Manual, error-prone process")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "$50K-$200K Lost Revenue Annually - ", bold: true }), new TextRun("Reactive delinquency tracking")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "60-120 Hours for Audit Prep - ", bold: true }), new TextRun("Manual ledger reconstruction")] }),
      new Paragraph({ text: "", spacing: { before: 400 } }),
      new Paragraph({
        children: [new TextRun({ text: "Result: ", bold: true }), new TextRun("Board liability, legal issues, expensive outsourced CPAs")]
      }),

      // Slide 3: The Solution
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        children: [new TextRun("The Solution")]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        children: [new TextRun("Multi-Tenant SaaS Platform for HOA Fund Accounting")]
      }),
      new Paragraph({ text: "", spacing: { before: 400 } }),
      new Paragraph({
        children: [new TextRun({ text: "1. Fund Accounting (Core)", bold: true, size: 26 })]
      }),
      new Paragraph({ children: [new TextRun("• Operating, Reserve, Special Assessment funds")] }),
      new Paragraph({ children: [new TextRun("• Zero error tolerance (immutable ledger)")] }),
      new Paragraph({ children: [new TextRun("• Event-sourced for audit compliance")] }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [new TextRun({ text: "2. Bank Reconciliation (90%+ Auto-Match)", bold: true, size: 26 })]
      }),
      new Paragraph({ children: [new TextRun("• Plaid integration (real-time bank feeds)")] }),
      new Paragraph({ children: [new TextRun("• AI-powered transaction matching")] }),
      new Paragraph({ children: [new TextRun("• 20-40 hours/month → 2-4 hours")] }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [new TextRun({ text: "3. AR/Collections Automation", bold: true, size: 26 })]
      }),
      new Paragraph({ children: [new TextRun("• Automated delinquency detection")] }),
      new Paragraph({ children: [new TextRun("• Certified notice tracking")] }),
      new Paragraph({ children: [new TextRun("• Lien filing preparation")] }),

      // Slide 4: Market Opportunity
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        children: [new TextRun("Market Opportunity")]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        children: [new TextRun("$1.85 Billion Total Addressable Market")]
      }),
      new Paragraph({ text: "", spacing: { before: 600 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "TAM: 370,000 HOAs × $5,000/yr = $1.85B", size: 28, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200 },
        children: [new TextRun({ text: "SAM: 100,000 HOAs (50+ units) = $500M", size: 28, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200 },
        children: [new TextRun({ text: "SOM: 1% in 5 years = $5M ARR", size: 28, bold: true })]
      }),
      new Paragraph({ text: "", spacing: { before: 600 } }),
      new Paragraph({
        children: [new TextRun({ text: "Underserved Market:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• 90% use spreadsheets or generic software")] }),
      new Paragraph({ children: [new TextRun("• No dominant player in HOA-specific fund accounting")] }),
      new Paragraph({ children: [new TextRun("• High willingness to pay: Current cost $70K-$120K/year, our price $5K-$10K/year")] }),

      // Slide 5: Business Model
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        children: [new TextRun("Business Model")]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        children: [new TextRun("SaaS Subscription with Massive Cost Savings")]
      }),
      new Paragraph({ text: "", spacing: { before: 400 } }),
      new Paragraph({
        children: [new TextRun({ text: "Pricing Tiers:", bold: true, size: 26 })]
      }),
      new Paragraph({ children: [new TextRun({ text: "• Tier 1 (50-100 units): ", bold: true }), new TextRun("$400/mo → $4,800/year")] }),
      new Paragraph({ children: [new TextRun({ text: "• Tier 2 (100-250 units): ", bold: true }), new TextRun("$600/mo → $7,200/year")] }),
      new Paragraph({ children: [new TextRun({ text: "• Tier 3 (250-500 units): ", bold: true }), new TextRun("$800/mo → $9,600/year")] }),
      new Paragraph({ text: "", spacing: { before: 400 } }),
      new Paragraph({
        children: [new TextRun({ text: "Customer Saves 85-92%:", bold: true, size: 26 })]
      }),
      new Paragraph({ children: [new TextRun("• Current cost: $70K-$120K/year (outsourced CPA)")] }),
      new Paragraph({ children: [new TextRun("• Our price: $5K-$10K/year")] }),
      new Paragraph({ children: [new TextRun("• Savings: $60K-$110K/year")] }),
      new Paragraph({ text: "", spacing: { before: 400 } }),
      new Paragraph({
        children: [new TextRun({ text: "Unit Economics:", bold: true, size: 26 })]
      }),
      new Paragraph({ children: [new TextRun("• LTV: $24K-$48K (5-year retention)")] }),
      new Paragraph({ children: [new TextRun("• CAC: $3K-$5K (sales cycle 60-90 days)")] }),
      new Paragraph({ children: [new TextRun("• LTV/CAC: 5-10x (healthy SaaS)")] }),

      // Slide 6: Financial Projections
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        children: [new TextRun("Financial Projections (5-Year)")]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        children: [new TextRun("Path to $5.5M ARR by Year 5")]
      }),
      new Paragraph({ text: "", spacing: { before: 600 } }),
      new Paragraph({
        children: [new TextRun({ text: "Year 1 (2026): ", bold: true }), new TextRun("$200K ARR, 40 customers, 3 headcount")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Year 2 (2027): ", bold: true }), new TextRun("$600K ARR, 100 customers, 5 headcount (200% growth)")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Year 3 (2028): ", bold: true }), new TextRun("$1.5M ARR, 225 customers, 8 headcount (150% growth)")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Year 4 (2029): ", bold: true }), new TextRun("$3.2M ARR, 450 customers, 12 headcount (113% growth)")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Year 5 (2030): ", bold: true }), new TextRun("$5.5M ARR, 780 customers, 18 headcount (Profitable!)")]
      }),
      new Paragraph({ text: "", spacing: { before: 400 } }),
      new Paragraph({
        children: [new TextRun({ text: "Key Assumptions:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• Average MRR per customer: $400-$600")] }),
      new Paragraph({ children: [new TextRun("• Churn rate: 10-15% annually (high switching costs)")] }),
      new Paragraph({ children: [new TextRun("• Sales cycle: 60-90 days (enterprise sales to boards)")] }),
      new Paragraph({ children: [new TextRun("• CAC payback: 12-18 months")] }),

      // Slide 7: Competition
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        children: [new TextRun("Competition & Differentiation")]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        children: [new TextRun("We Win Through Vertical Specialization")]
      }),
      new Paragraph({ text: "", spacing: { before: 400 } }),
      new Paragraph({
        children: [new TextRun({ text: "AppFolio ($1.5B): ", bold: true }), new TextRun("Property mgmt (rentals), not for HOAs → We have HOA fund accounting")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Buildium: ", bold: true }), new TextRun("Generic accounting → We have fund separation")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "IronLedger (YC): ", bold: true }), new TextRun("General properties → We're HOA-specific")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Palomma (YC): ", bold: true }), new TextRun("Leasing/sales focus → We're compliance")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Spreadsheets (90%): ", bold: true }), new TextRun("Error-prone → We're automated")]
      }),
      new Paragraph({ text: "", spacing: { before: 400 } }),
      new Paragraph({
        children: [new TextRun({ text: "Our Moat:", bold: true, size: 26 })]
      }),
      new Paragraph({ children: [new TextRun("✓ Vertical specialization: HOAs only")] }),
      new Paragraph({ children: [new TextRun("✓ Fund accounting expertise: Operating, Reserve, Special Assessment")] }),
      new Paragraph({ children: [new TextRun("✓ Zero error tolerance: Immutable ledger, event sourcing")] }),
      new Paragraph({ children: [new TextRun("✓ Multi-tenant architecture: Schema-per-tenant data isolation")] }),
      new Paragraph({ children: [new TextRun("✓ 2-3 year head start: Complex domain, high barrier to entry")] }),

      // Slide 8: The Ask
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        children: [new TextRun("The Ask")]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        children: [new TextRun("Raising $400K to Reach $200K ARR in 12 Months")]
      }),
      new Paragraph({ text: "", spacing: { before: 600 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Round: Pre-Seed / Friends & Family", size: 26, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200 },
        children: [new TextRun({ text: "Amount: $100K - $500K", size: 26, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200 },
        children: [new TextRun({ text: "Structure: SAFE note", size: 26, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "$1.5M-$2M valuation cap, 20% discount", size: 26, bold: true })]
      }),
      new Paragraph({ text: "", spacing: { before: 600 } }),
      new Paragraph({
        children: [new TextRun({ text: "Use of Funds (12-Month Runway):", bold: true, size: 24 })]
      }),
      new Paragraph({ children: [new TextRun("• Engineering: $180K (2 engineers × 6 months)")] }),
      new Paragraph({ children: [new TextRun("• Founder Salary: $60K")] }),
      new Paragraph({ children: [new TextRun("• Design: $45K")] }),
      new Paragraph({ children: [new TextRun("• Infrastructure: $15K (AWS, Plaid, tools)")] }),
      new Paragraph({ children: [new TextRun("• Legal/Accounting: $10K")] }),
      new Paragraph({ children: [new TextRun("• Sales/Marketing: $40K")] }),
      new Paragraph({ children: [new TextRun("• Buffer (20%): $50K")] }),
      new Paragraph({
        children: [new TextRun({ text: "Total: $400K", bold: true, size: 26 })]
      }),

      // Slide 9: Milestones
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        children: [new TextRun("Milestones (Next 12 Months)")]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        children: [new TextRun("Clear Path to Product-Market Fit")]
      }),
      new Paragraph({ text: "", spacing: { before: 800 } }),
      new Paragraph({
        children: [new TextRun({ text: "Month 3: MVP Launch", bold: true, size: 28 })]
      }),
      new Paragraph({ children: [new TextRun({ text: "✓ 3 pilot customers onboarded", size: 24 })] }),
      new Paragraph({ children: [new TextRun({ text: "✓ Core features: fund accounting, bank reconciliation, basic AR", size: 24 })] }),
      new Paragraph({ text: "", spacing: { before: 400 } }),
      new Paragraph({
        children: [new TextRun({ text: "Month 6: Early Traction", bold: true, size: 28 })]
      }),
      new Paragraph({ children: [new TextRun({ text: "✓ 10 paying customers ($50K ARR)", size: 24 })] }),
      new Paragraph({ children: [new TextRun({ text: "✓ Product refinements based on pilot feedback", size: 24 })] }),
      new Paragraph({ text: "", spacing: { before: 400 } }),
      new Paragraph({
        children: [new TextRun({ text: "Month 9: Scaling", bold: true, size: 28 })]
      }),
      new Paragraph({ children: [new TextRun({ text: "✓ 25 paying customers ($120K ARR)", size: 24 })] }),
      new Paragraph({ children: [new TextRun({ text: "✓ First partnership signed", size: 24 })] }),
      new Paragraph({ text: "", spacing: { before: 400 } }),
      new Paragraph({
        children: [new TextRun({ text: "Month 12: Product-Market Fit", bold: true, size: 28 })]
      }),
      new Paragraph({ children: [new TextRun({ text: "✓ 40 paying customers ($200K ARR)", size: 24 })] }),
      new Paragraph({ children: [new TextRun({ text: "✓ Apply to Y Combinator (Winter 2026 batch)", size: 24 })] }),

      // Slide 10: Exit Strategy
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        children: [new TextRun("Exit Strategy")]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        children: [new TextRun("Clear Path to Acquisition or IPO")]
      }),
      new Paragraph({ text: "", spacing: { before: 600 } }),
      new Paragraph({
        children: [new TextRun({ text: "Target Acquirers:", bold: true, size: 26 })]
      }),
      new Paragraph({ children: [new TextRun("1. AppFolio ($1.5B market cap) - Add HOA fund accounting to portfolio")] }),
      new Paragraph({ children: [new TextRun("2. Buildium/RealPage - Expand property management suite")] }),
      new Paragraph({ children: [new TextRun("3. Yardi (largest property management software)")] }),
      new Paragraph({ children: [new TextRun("4. Intuit (QuickBooks) - Enter vertical accounting market")] }),
      new Paragraph({ children: [new TextRun("5. Private Equity - Roll-up play")] }),
      new Paragraph({ text: "", spacing: { before: 400 } }),
      new Paragraph({
        children: [new TextRun({ text: "Comparable Exits:", bold: true, size: 26 })]
      }),
      new Paragraph({ children: [new TextRun("• Buildium acquired for $580M (2019)")] }),
      new Paragraph({ children: [new TextRun("• AppFolio IPO at $2.1B (2015)")] }),
      new Paragraph({ text: "", spacing: { before: 400 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Target Exit: $50M-$150M in 5-7 years", bold: true, size: 30 })]
      }),

      // Final Slide: Closing
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 1000 },
        children: [new TextRun({ text: "Let's Build the Future of HOA Accounting Together", size: 40, bold: true })]
      }),
      new Paragraph({ text: "", spacing: { before: 800 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Next Steps:", size: 28, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200 },
        children: [new TextRun({ text: "1. Schedule follow-up call (30 minutes)", size: 24 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "2. Review detailed financial model", size: 24 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "3. Connect with reference customers", size: 24 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "4. Sign SAFE agreement and wire funds", size: 24 })]
      }),
      new Paragraph({ text: "", spacing: { before: 800 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "[Your Name], Founder & CEO", size: 26, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "[your.email@company.com]", size: 24 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "[Your Phone]", size: 24 })]
      }),
      new Paragraph({ text: "", spacing: { before: 600 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Thank you for your time and consideration.", size: 26, italics: true })]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("02-PITCH-DECK.docx", buffer);
  console.log("Created: 02-PITCH-DECK.docx");
});
