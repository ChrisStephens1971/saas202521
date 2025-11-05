/**
 * @fileoverview Financial Projections Generator
 *
 * Creates detailed 5-year financial projections document in .docx format.
 * Includes revenue model, unit economics, P&L statements, and key metrics for SaaS business.
 *
 * @module create-financial-projections
 * @requires docx
 * @requires fs
 *
 * @author Fundraising Templates
 * @version 1.0
 */

const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType,
        HeadingLevel, WidthType, ShadingType } = require('docx');

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 20 } }
    },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal",
        run: { size: 32, bold: true, color: "000000" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal",
        run: { size: 26, bold: true, color: "000000" },
        paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 1 } }
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    children: [
      new Paragraph({
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Financial Projections", size: 40, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "5-Year Model (2025-2030)", size: 28, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Multi-Tenant HOA Accounting System", size: 24 })]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Summary Table (5-Year Overview)")]
      }),
      new Paragraph({ text: "" }),

      new Table({
        columnWidths: [2400, 1200, 1200, 1200, 1200, 1200, 1200],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Metric", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2025 (Y0)", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2026 (Y1)", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2027 (Y2)", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2028 (Y3)", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2029 (Y4)", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2030 (Y5)", bold: true })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "ARR", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$0")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$200K")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$600K")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$1.5M")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$3.2M")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$5.5M")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Customers", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("0")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("40")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("100")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("225")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("450")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("780")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "YoY Growth", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("-")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("-")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("200%")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("150%")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("113%")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("72%")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Headcount", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("1")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("3")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("5")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("8")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("12")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("18")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Monthly Burn", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("-$15K")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("-$25K")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("-$35K")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("-$50K")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("-$75K")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$0", bold: true })] })] })
            ]
          })
        ]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Unit Economics")]
      }),
      new Paragraph({ text: "" }),

      new Table({
        columnWidths: [4000, 3000, 2360],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Metric", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Value", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Notes", bold: true })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Average MRR per Customer", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$500")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Blended across all tiers")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Customer Lifetime (years)", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("5 years")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("High switching costs")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "LTV (Lifetime Value)", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$25,500", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("$500/mo × 60 months × 85%")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "CAC (Customer Acquisition Cost)", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$3,000", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("60-90 day sales cycle")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "LTV/CAC Ratio", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "8.5x", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Excellent (target > 3x)")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "CAC Payback Period", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "7 months", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Industry: 12-18 months")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Gross Margin", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("85%")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Standard SaaS")] })] })
            ]
          })
        ]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Funding Requirements")]
      }),
      new Paragraph({ text: "" }),

      new Table({
        columnWidths: [4000, 2680, 2680],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Period", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Capital Required", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Use", bold: true })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Pre-Seed (Year 0-1)", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$400,000", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("MVP development, initial customers")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Seed (Year 2-3)", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$1,000,000")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Scale to $1M ARR, 8-person team")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Series A (Year 3-4)", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$2,000,000")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Scale to $3M ARR, profitability")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Total", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$3,400,000", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Cumulative through profitability")] })] })
            ]
          })
        ]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Pre-Seed Round (Current Ask)")]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Use of Funds: $400,000 (12-month runway)")]
      }),
      new Paragraph({ text: "" }),

      new Table({
        columnWidths: [5000, 2180, 2180],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Category", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Amount", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "% of Total", bold: true })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Engineering (2 engineers × 6 months)")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$180,000")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("45%")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Founder Salary (6 months)")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$60,000")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("15%")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Product/Design (1 designer × 6 months)")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$45,000")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("11%")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Infrastructure (AWS, Plaid, tools)")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$15,000")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("4%")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Legal/Accounting")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$10,000")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("3%")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Sales/Marketing")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$40,000")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("10%")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Buffer/Contingency (20%)")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$50,000")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("13%")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Total", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$400,000", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "100%", bold: true })] })] })
            ]
          })
        ]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Runway: 12 months to reach $200K ARR")]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Key Assumptions")]
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [new TextRun({ text: "Revenue Assumptions:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• Average MRR per customer: $400-$600 (varies by HOA size)")] }),
      new Paragraph({ children: [new TextRun("• Customer lifetime: 5-7 years (high switching costs)")] }),
      new Paragraph({ children: [new TextRun("• Churn rate: 0% (Y1-2), 3-6% (Y3-5), 8-10% (steady state)")] }),
      new Paragraph({ children: [new TextRun("• Sales cycle: 60-90 days (enterprise sales to HOA boards)")] }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [new TextRun({ text: "Cost Assumptions:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• Engineering salaries: $120K-$140K (mid-senior level)")] }),
      new Paragraph({ children: [new TextRun("• Sales/marketing: 25-35% of revenue (Year 1-3), 15-20% (Year 4-5)")] }),
      new Paragraph({ children: [new TextRun("• Infrastructure: $30-$50 per customer per year")] }),
      new Paragraph({ children: [new TextRun("• Gross margin: 85% (standard SaaS benchmark)")] }),
      new Paragraph({ text: "" }),

      new Paragraph({ text: "" }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Last Updated: October 27, 2025", size: 20 })]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("03-FINANCIAL-PROJECTIONS.docx", buffer);
  console.log("Created: 03-FINANCIAL-PROJECTIONS.docx");
});
