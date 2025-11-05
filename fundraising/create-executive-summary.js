/**
 * @fileoverview Executive Summary Generator
 *
 * Creates a concise executive summary document in .docx format for investor review.
 * Provides a high-level overview of the business, market opportunity, and financial projections.
 *
 * @module create-executive-summary
 * @requires docx
 * @requires fs
 *
 * @author Fundraising Templates
 * @version 1.0
 */

const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType,
        HeadingLevel, BorderStyle, WidthType, ShadingType, VerticalAlign, LevelFormat,
        ExternalHyperlink, PageBreak } = require('docx');

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
        paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal",
        run: { size: 24, bold: true, color: "000000", font: "Arial" },
        paragraph: { spacing: { before: 120, after: 80 }, outlineLevel: 2 } }
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
      // Title
      new Paragraph({
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Executive Summary", size: 40, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Multi-Tenant HOA Accounting System", size: 28, bold: true })]
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [new TextRun({ text: "Company: ", bold: true }), new TextRun("[Your Company Name]")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Project: ", bold: true }), new TextRun("saas202509")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Date: ", bold: true }), new TextRun("October 2025")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Confidential", bold: true, italics: true })]
      }),
      new Paragraph({ text: "" }),

      // The Opportunity
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("The Opportunity")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "We're building the first multi-tenant fund accounting platform designed specifically for Homeowners Associations (HOAs) ", bold: true }), new TextRun("that eliminates $70K+ in annual accounting costs while ensuring zero tolerance for financial errors.")]
      }),
      new Paragraph({ text: "" }),

      // The Problem
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("The Problem")]
      }),
      new Paragraph({
        children: [new TextRun("370,000 HOAs in the United States struggle with fragmented, error-prone accounting systems:")]
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "90% use spreadsheets ", bold: true }), new TextRun("or generic accounting software not designed for fund accounting")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Manual bank reconciliation ", bold: true }), new TextRun("takes 20-40 hours/month per property")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Delinquency tracking ", bold: true }), new TextRun("is reactive, costing HOAs $50K-$200K annually in lost revenue")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Audit preparation ", bold: true }), new TextRun("requires 60-120 hours of manual ledger reconstruction")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Zero tolerance for errors ", bold: true }), new TextRun("- financial mistakes can result in board liability and legal issues")]
      }),
      new Paragraph({ text: "" }),

      // Our Solution
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Our Solution")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "A multi-tenant SaaS platform with:", bold: true })]
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1. Fund Accounting (Core Differentiator)")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Separate accounting for Operating, Reserve, and Special Assessment funds")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Double-entry bookkeeping with zero error tolerance")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Event-sourced, immutable ledger for audit compliance")]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2. Bank Reconciliation (90%+ Auto-Match)")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Plaid integration for real-time bank feeds")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("AI-powered transaction matching")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Reduces 20-40 hours/month to 2-4 hours")]
      }),
      new Paragraph({ text: "" }),

      // Market Opportunity - Table
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Market Opportunity")]
      }),
      new Paragraph({ text: "" }),

      new Table({
        columnWidths: [4680, 4680],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                width: { size: 4680, type: WidthType.DXA },
                shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Metric", bold: true })] })]
              }),
              new TableCell({
                width: { size: 4680, type: WidthType.DXA },
                shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Value", bold: true })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                width: { size: 4680, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Total Addressable Market (TAM)", bold: true })] })]
              }),
              new TableCell({
                width: { size: 4680, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("370,000 HOAs × $5,000/yr = "), new TextRun({ text: "$1.85 billion", bold: true })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                width: { size: 4680, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Serviceable Available Market (SAM)", bold: true })] })]
              }),
              new TableCell({
                width: { size: 4680, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("100,000 HOAs (50+ units) = "), new TextRun({ text: "$500 million", bold: true })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                width: { size: 4680, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Serviceable Obtainable Market (SOM)", bold: true })] })]
              }),
              new TableCell({
                width: { size: 4680, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("1% in 5 years = "), new TextRun({ text: "$5 million ARR", bold: true })] })]
              })
            ]
          })
        ]
      }),
      new Paragraph({ text: "" }),

      // Business Model
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Business Model")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "SaaS Subscription:", bold: true })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Tier 1 (50-100 units): ", bold: true }), new TextRun("$400/month → $4,800/year")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Tier 2 (100-250 units): ", bold: true }), new TextRun("$600/month → $7,200/year")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Tier 3 (250-500 units): ", bold: true }), new TextRun("$800/month → $9,600/year")]
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [new TextRun({ text: "Customer Economics:", bold: true })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Current cost: ", bold: true }), new TextRun("$70K-$120K/year (outsourced CPA or internal bookkeeper)")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Our price: ", bold: true }), new TextRun("$4,800-$9,600/year")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Customer savings: ", bold: true }), new TextRun("$60K-$110K/year (85-92% cost reduction)")]
      }),
      new Paragraph({ text: "" }),

      // Funding Ask
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Funding Ask")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Round: ", bold: true }), new TextRun("Pre-Seed / Friends & Family")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Amount: ", bold: true }), new TextRun("$100,000 - $500,000")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Structure: ", bold: true }), new TextRun("SAFE note with $1.5M - $2M valuation cap, 20% discount")]
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [new TextRun({ text: "Milestones (Next 12 Months):", bold: true })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Month 3: MVP launched with 3 pilot customers")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Month 6: 10 paying customers, $50K ARR")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Month 9: 25 paying customers, $120K ARR")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Month 12: 40 paying customers, $200K ARR")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Month 12: Apply to Y Combinator (Winter 2026 batch)")]
      }),
      new Paragraph({ text: "" }),

      // Contact
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Contact")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "[Your Name]", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("Founder & CEO")]
      }),
      new Paragraph({
        children: [new TextRun("Email: [your.email@company.com]")]
      }),
      new Paragraph({
        children: [new TextRun("Phone: [Your Phone]")]
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "This is a confidential document intended solely for potential investors.", italics: true, size: 20 })]
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
  fs.writeFileSync("01-EXECUTIVE-SUMMARY.docx", buffer);
  console.log("Created: 01-EXECUTIVE-SUMMARY.docx");
});
