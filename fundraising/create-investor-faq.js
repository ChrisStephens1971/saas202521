/**
 * @fileoverview Investor FAQ Generator
 *
 * Creates a comprehensive investor FAQ document in .docx format.
 * Addresses common investor questions about the business, market, team, and financials.
 *
 * @module create-investor-faq
 * @requires docx
 * @requires fs
 *
 * @author Fundraising Templates
 * @version 1.0
 */

const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } = require('docx');

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22 } }
    },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal",
        run: { size: 32, bold: true, color: "000000", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal",
        run: { size: 28, bold: true, color: "000000", font: "Arial" },
        paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 1 } }
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    children: [
      // Title
      new Paragraph({
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Investor FAQ", size: 40, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Frequently Asked Questions from Investors", size: 24 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Multi-Tenant HOA Accounting System (saas202509)", size: 20 })]
      }),
      new Paragraph({ text: "" }),

      // About the Opportunity
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("About the Opportunity")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Q: What problem are you solving?")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "A: ", bold: true }),
                   new TextRun("HOAs spend $70K-$120K annually on fragmented accounting systems that require manual bank reconciliation (20-40 hours/month) and lack proper fund accounting. 90% use spreadsheets or generic software not designed for HOA compliance needs.")]
      }),
      new Paragraph({
        children: [new TextRun("We're building the first multi-tenant fund accounting platform specifically for HOAs that eliminates manual work through AI-powered bank reconciliation and ensures zero tolerance for financial errors through event-sourced, immutable ledgers.")]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Q: How big is the market?")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "A:", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun({ text: "• TAM: ", bold: true }), new TextRun("370,000 HOAs in the US × $5,000/year = $1.85 billion")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "• SAM: ", bold: true }), new TextRun("100,000 HOAs (50+ units) = $500 million")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "• SOM: ", bold: true }), new TextRun("1% in 5 years = $5 million ARR")]
      }),
      new Paragraph({
        children: [new TextRun("The market is underserved: 90% of HOAs use spreadsheets or generic accounting software. No dominant player exists in HOA-specific fund accounting.")]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Q: Who are your customers?")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "A: ", bold: true }), new TextRun("HOAs with 50-500 units, $500K-$5M annual budgets. Two segments:")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "1. Self-managed HOAs (40%)", bold: true }), new TextRun(" - Board members handle accounting themselves, highest pain")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "2. Small property managers (35%)", bold: true }), new TextRun(" - Manage 1-10 HOAs, need specialized software")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Not targeting: ", bold: true }), new TextRun("Large property management companies (already use enterprise software like Yardi).")]
      }),
      new Paragraph({ text: "" }),

      // Competition
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Competition")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Q: What about AppFolio and Buildium?")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "A: ", bold: true }), new TextRun("They serve property managers, not HOAs directly. Key differences:")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "AppFolio/Buildium:", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("• Focus: Property management for rental properties")],
        indent: { left: 360 }
      }),
      new Paragraph({
        children: [new TextRun("• Accounting: Generic, not designed for fund accounting")],
        indent: { left: 360 }
      }),
      new Paragraph({
        children: [new TextRun("• Weakness: No separation of Operating/Reserve/Special Assessment funds")],
        indent: { left: 360 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "Us:", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("• Focus: HOA fund accounting exclusively")],
        indent: { left: 360 }
      }),
      new Paragraph({
        children: [new TextRun("• Accounting: Built-in fund separation, double-entry bookkeeping")],
        indent: { left: 360 }
      }),
      new Paragraph({
        children: [new TextRun("• Strength: Event-sourced ledger, immutable audit trail, zero error tolerance")],
        indent: { left: 360 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "Innovator's Dilemma: ", bold: true }), new TextRun("They won't rebuild their architecture for HOAs (would cannibalize existing product). We have 2-3 year head start.")]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Q: What about IronLedger and Palomma (YC W24)?")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "A: ", bold: true }), new TextRun("Both are general property accounting/management AI platforms:")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "IronLedger:", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("• Focus: AI accounting agents for property accounting (general)")],
        indent: { left: 360 }
      }),
      new Paragraph({
        children: [new TextRun("• Weakness: Not HOA-specific, no fund accounting expertise")],
        indent: { left: 360 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "Palomma:", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("• Focus: AI agents for property management (leasing, sales, collections)")],
        indent: { left: 360 }
      }),
      new Paragraph({
        children: [new TextRun("• Weakness: Not accounting-focused")],
        indent: { left: 360 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "Us:", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("• Vertical specialization: HOAs only")],
        indent: { left: 360 }
      }),
      new Paragraph({
        children: [new TextRun("• Deeper features: Fund accounting, compliance, audit trails")],
        indent: { left: 360 }
      }),
      new Paragraph({
        children: [new TextRun("• Higher barrier to entry: Complex domain requires years to master")],
        indent: { left: 360 }
      }),
      new Paragraph({
        children: [new TextRun({ text: "Market Validation: ", bold: true }), new TextRun("YC funding these competitors proves investor appetite for property accounting innovation.")]
      }),
      new Paragraph({ text: "" }),

      // Traction & Validation
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Traction & Validation")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Q: Do you have customers?")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "A: ", bold: true }), new TextRun("Pre-revenue, MVP in development. However:")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Completed:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• 50+ customer discovery interviews")] }),
      new Paragraph({ children: [new TextRun("• 90% cited bank reconciliation as #1 pain point")] }),
      new Paragraph({ children: [new TextRun("• Identified willingness to pay ($70K → $5K/year = 93% cost reduction)")] }),
      new Paragraph({
        children: [new TextRun({ text: "In Progress:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• MVP development (launching Month 3)")] }),
      new Paragraph({ children: [new TextRun("• Pilot program agreements (targeting 3-5 HOAs)")] }),
      new Paragraph({
        children: [new TextRun({ text: "Next 6 Months:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• Launch MVP with pilots")] }),
      new Paragraph({ children: [new TextRun("• Achieve $10K-$50K ARR")] }),
      new Paragraph({ children: [new TextRun("• Apply to Y Combinator (Winter 2026)")] }),
      new Paragraph({ text: "" }),

      // Fundraising
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Fundraising")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Q: How much are you raising?")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "A: ", bold: true }), new TextRun({ text: "$100K-$500K", bold: true }),
                   new TextRun(" on a SAFE with "), new TextRun({ text: "$1.5M-$2M valuation cap", bold: true }),
                   new TextRun(" and "), new TextRun({ text: "20% discount", bold: true }), new TextRun(".")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Use of funds (12-month runway):", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• Engineering: $180K (2 engineers × 6 months)")] }),
      new Paragraph({ children: [new TextRun("• Founder salary: $60K (6 months)")] }),
      new Paragraph({ children: [new TextRun("• Design: $45K (1 designer × 6 months)")] }),
      new Paragraph({ children: [new TextRun("• Infrastructure: $15K (AWS, Plaid, tools)")] }),
      new Paragraph({ children: [new TextRun("• Legal/accounting: $10K")] }),
      new Paragraph({ children: [new TextRun("• Sales/marketing: $40K")] }),
      new Paragraph({ children: [new TextRun("• Buffer (20%): $50K")] }),
      new Paragraph({ children: [new TextRun({ text: "• Total: $400K", bold: true })] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Q: What will you achieve with this capital?")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "A: ", bold: true }), new TextRun({ text: "Milestones (12 months):", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("✓ Month 3: MVP launched with 3 pilot customers")] }),
      new Paragraph({ children: [new TextRun("✓ Month 6: 10 paying customers, $50K ARR")] }),
      new Paragraph({ children: [new TextRun("✓ Month 9: 25 paying customers, $120K ARR")] }),
      new Paragraph({ children: [new TextRun("✓ Month 12: 40 paying customers, $200K ARR")] }),
      new Paragraph({ children: [new TextRun("✓ Month 12: Apply to Y Combinator (Winter 2026 batch)")] }),
      new Paragraph({
        children: [new TextRun({ text: "Goal: ", bold: true }), new TextRun("Prove product-market fit, position for Series A at $5M-$8M valuation.")]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Q: What's your valuation?")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "A: ", bold: true }), new TextRun("Pre-revenue, so using "),
                   new TextRun({ text: "SAFE with $1.5M-$2M valuation cap", bold: true }), new TextRun(".")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Rationale:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• Below average pre-seed ($5.7M per Pitchbook 2025)")] }),
      new Paragraph({ children: [new TextRun("• Fair for solo founder, pre-revenue")] }),
      new Paragraph({ children: [new TextRun("• YC-backed competitors (IronLedger, Palomma) at $10M+ post-YC")] }),
      new Paragraph({ children: [new TextRun("• We're asking 50-80% less to account for earlier stage")] }),
      new Paragraph({
        children: [new TextRun({ text: "Negotiable", italics: true }), new TextRun(" based on investor feedback and market conditions.")]
      }),
      new Paragraph({ text: "" }),

      // Exit Strategy
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Exit Strategy")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Q: What's your exit plan?")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "A: ", bold: true }), new TextRun({ text: "Acquisition in 5-7 years", bold: true }),
                   new TextRun(" at $50M-$150M valuation (10-20x ARR at $5M-$10M).")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Target acquirers:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("1. AppFolio ($1.5B market cap) - Add HOA fund accounting to portfolio")] }),
      new Paragraph({ children: [new TextRun("2. Buildium/RealPage - Expand property management suite")] }),
      new Paragraph({ children: [new TextRun("3. Yardi (private, $3B+ valuation) - Largest property management software")] }),
      new Paragraph({ children: [new TextRun("4. Intuit (QuickBooks) - Enter vertical accounting market")] }),
      new Paragraph({ children: [new TextRun("5. Private Equity - Roll-up play (consolidate HOA software)")] }),
      new Paragraph({
        children: [new TextRun({ text: "Comparable exits:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• Buildium acquired for $580M (2019)")] }),
      new Paragraph({ children: [new TextRun("• AppFolio IPO at $2.1B (2015)")] }),
      new Paragraph({
        children: [new TextRun({ text: "I'm building to sell, not to run forever.", italics: true })]
      }),
      new Paragraph({ text: "" }),

      // Closing
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Closing Thoughts")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Q: Why should I invest?")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "A: ", bold: true }), new TextRun("Five reasons:")]
      }),
      new Paragraph({ children: [new TextRun("1. Large, underserved market: $500M SAM, 90% using spreadsheets")] }),
      new Paragraph({ children: [new TextRun("2. Massive ROI for customers: 85-92% cost reduction ($60K-$110K savings/year)")] }),
      new Paragraph({ children: [new TextRun("3. Defensible: Vertical specialization + multi-tenant architecture = 2-3 year head start")] }),
      new Paragraph({ children: [new TextRun("4. Hot market validation: YC funding competitors (IronLedger, Palomma) = investor appetite")] }),
      new Paragraph({ children: [new TextRun("5. Clear exit path: Acquisition by AppFolio, Buildium, Yardi, or PE firm")] }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [new TextRun({ text: "This is a once-in-a-cycle opportunity to get in early on a category-defining company.", bold: true, italics: true })]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Ready to invest? Let's schedule a follow-up call and get the paperwork started.", size: 24, bold: true })]
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Last Updated: October 27, 2025", size: 20 })]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("07-INVESTOR-FAQ.docx", buffer);
  console.log("Created: 07-INVESTOR-FAQ.docx");
});
