/**
 * @fileoverview Capitalization Table Generator
 *
 * Creates a professional cap table document in .docx format showing equity ownership,
 * dilution scenarios, and funding rounds. Essential for investor due diligence.
 *
 * @module create-cap-table
 * @requires docx
 * @requires fs
 *
 * @author Fundraising Templates
 * @version 1.0
 */

const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType,
        HeadingLevel, WidthType, ShadingType, LevelFormat } = require('docx');

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
      new Paragraph({
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Cap Table Template", size: 40, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Capitalization Table for Tracking Equity Ownership", size: 24 })]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        children: [new TextRun({ text: "Instructions: ", bold: true }), new TextRun("Use this template in Excel/Google Sheets or transfer to Carta/Pulley for professional cap table management.")]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("What is a Cap Table?")]
      }),
      new Paragraph({
        children: [new TextRun("A "), new TextRun({ text: "Capitalization Table (Cap Table)", bold: true }), new TextRun(" tracks who owns what percentage of your company.")]
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [new TextRun({ text: "Tracks:", bold: true })]
      }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Founders")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Employees (with stock options)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Investors (angels, VCs)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Advisors")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("SAFEs / convertible notes (before conversion)")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Simple Cap Table Template")]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Current State (Pre-Investment)")]
      }),
      new Paragraph({ text: "" }),

      new Table({
        columnWidths: [3000, 2000, 2000, 1820, 1540],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Shareholder", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Share Class", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Shares Owned", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "% Ownership", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Value", bold: true })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun("[Founder Name]")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Common Stock")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("10,000,000")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("100.00%")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$0")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Total Outstanding", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "10,000,000", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "100.00%", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("")] })] })
            ]
          })
        ]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("After $100K SAFE at $2M Cap (Unconverted)")]
      }),
      new Paragraph({ text: "" }),

      new Table({
        columnWidths: [3500, 2000, 2000, 1860],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Shareholder", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Share Class", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Shares Owned", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "% Ownership", bold: true })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun("[Founder Name]")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Common Stock")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("10,000,000")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("100.00%")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Total Outstanding", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "10,000,000", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "100.00%", bold: true })] })] })
            ]
          })
        ]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        children: [new TextRun({ text: "SAFEs (Unconverted):", bold: true })]
      }),
      new Paragraph({ text: "" }),

      new Table({
        columnWidths: [2500, 1500, 1500, 1000, 1500, 1360],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Investor", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Investment", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Valuation Cap", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Discount", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Date", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Status", bold: true })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun("[Investor Name]")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$100,000")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$2,000,000")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("20%")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("10/27/2025")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Unconverted")] })] })
            ]
          })
        ]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("After Series A ($500K at $5M Pre-Money)")]
      }),
      new Paragraph({ text: "" }),

      new Table({
        columnWidths: [2500, 2000, 1800, 1500, 1200, 1360],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Shareholder", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Share Class", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Shares Owned", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "% Ownership", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Investment", bold: true })] })]
              }),
              new TableCell({
                shading: { fill: "D5E8F0" },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Value", bold: true })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Founder")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Common")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("10,000,000")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("83.33%")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$0")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$4,583,333")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun("SAFE Investor")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Series A Pref")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("600,000")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("5.00%")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$100,000")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$275,000")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Series A Lead")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Series A Pref")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("1,400,000")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("11.67%")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$500,000")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun("$641,667")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Total", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("")] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "12,000,000", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "100.00%", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$600,000", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "$5,500,000", bold: true })] })] })
            ]
          })
        ]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        children: [new TextRun({ text: "Dilution: ", bold: true }), new TextRun("Founder dilution: 100% → 83.33% (16.67% given up)")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Total capital raised: ", bold: true }), new TextRun("$600,000")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Post-money valuation: ", bold: true }), new TextRun("$5,500,000")]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Dilution Calculator")]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        children: [new TextRun({ text: "Formula:", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("New Ownership % = (Old Shares) / (Old Shares + New Shares Issued)")]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Example: Founder Dilution from Series A")]
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [new TextRun({ text: "Before Series A:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• Founder: 10,000,000 shares (100%)")] }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [new TextRun({ text: "Series A Investment:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• $500,000 at $5,000,000 pre-money")] }),
      new Paragraph({ children: [new TextRun("• Post-money: $5,500,000")] }),
      new Paragraph({ children: [new TextRun("• % sold: $500K / $5.5M = 9.09%")] }),
      new Paragraph({ children: [new TextRun("• New shares issued: 1,000,000")] }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [new TextRun({ text: "After Series A:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• Founder: 10,000,000 shares")] }),
      new Paragraph({ children: [new TextRun("• Total shares: 11,000,000")] }),
      new Paragraph({ children: [new TextRun("• Founder %: 10M / 11M = 90.91%")] }),
      new Paragraph({ children: [new TextRun("• Dilution: 100% → 90.91% = 9.09% dilution")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Cap Table Best Practices")]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1. Update After Every Transaction")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Update cap table when:", bold: true })]
      }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Issuing founder stock")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Closing investment round (SAFE, equity, etc.)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Granting employee stock options")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Options vest or are exercised")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Shares are transferred or sold")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2. Create Option Pool BEFORE Raising Money")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Why? ", bold: true }), new TextRun("Dilution from option pool hits founders, not investors")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Typical size:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• Pre-seed: 10% of fully diluted")] }),
      new Paragraph({ children: [new TextRun("• Series A: 15-20% of fully diluted")] }),
      new Paragraph({ children: [new TextRun("• Series B+: 10-15% top-up as needed")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3. Use Professional Tools (Eventually)")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Start: ", bold: true }), new TextRun("Excel/Google Sheets (free)")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Once you raise >$100K: ", bold: true }), new TextRun("Use Carta or Pulley")]
      }),
      new Paragraph({ children: [new TextRun("• Carta: https://carta.com ($2K-$5K/year, industry standard)")] }),
      new Paragraph({ children: [new TextRun("• Pulley: https://pulley.com ($500-$2K/year, simpler/cheaper)")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Resources")]
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [new TextRun({ text: "Cap Table Tools:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• Carta: https://carta.com")] }),
      new Paragraph({ children: [new TextRun("• Pulley: https://pulley.com")] }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [new TextRun({ text: "Learning:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• Carta's cap table 101: https://carta.com/equity/equity-101/")] }),
      new Paragraph({ children: [new TextRun("• YC cap table guide: https://www.ycombinator.com/library")] }),
      new Paragraph({ children: [new TextRun("• \"Venture Deals\" by Brad Feld (book)")] }),
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
  fs.writeFileSync("05-CAP-TABLE-TEMPLATE.docx", buffer);
  console.log("Created: 05-CAP-TABLE-TEMPLATE.docx");
});
