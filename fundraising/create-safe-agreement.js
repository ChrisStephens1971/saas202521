/**
 * @fileoverview SAFE Agreement Generator
 *
 * Creates a Simple Agreement for Future Equity (SAFE) document in .docx format.
 * Based on Y Combinator's post-money SAFE template with customizable terms.
 *
 * @module create-safe-agreement
 * @requires docx
 * @requires fs
 *
 * @author Fundraising Templates
 * @version 1.0
 */

const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType,
        HeadingLevel, BorderStyle, WidthType, LevelFormat } = require('docx');

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
        children: [new TextRun({ text: "SAFE Agreement Template", size: 40, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Simple Agreement for Future Equity", size: 28, bold: true })]
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [new TextRun({ text: "IMPORTANT: ", bold: true, color: "FF0000" }),
                   new TextRun("This is a template for reference. Use Clerky.com ($799) or consult a lawyer for actual legal documents.")]
      }),
      new Paragraph({ text: "" }),

      // What is a SAFE?
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("What is a SAFE?")]
      }),
      new Paragraph({
        children: [new TextRun("A "), new TextRun({ text: "SAFE (Simple Agreement for Future Equity)", bold: true }),
                   new TextRun(" is an investment instrument created by Y Combinator that allows investors to invest money now and receive equity later (at a future priced round).")]
      }),
      new Paragraph({ text: "" }),

      // Key Benefits
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Key Benefits")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Fast: ", bold: true }), new TextRun("Close in days/weeks vs. months for priced equity")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Cheap: ", bold: true }), new TextRun("$500-$1K legal fees vs. $10K-$20K for priced round")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Simple: ", bold: true }), new TextRun("5-page document vs. 50+ pages for priced equity")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Founder-friendly: ", bold: true }), new TextRun("No interest, no maturity date, no board seats")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Standard: ", bold: true }), new TextRun("YC template, widely accepted by investors")]
      }),
      new Paragraph({ text: "" }),

      // SAFE Agreement Terms Table
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("SAFE Agreement Terms (For Your Deal)")]
      }),
      new Paragraph({ text: "" }),

      new Table({
        columnWidths: [3000, 3000, 3360],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                width: { size: 3000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Term", bold: true })] })]
              }),
              new TableCell({
                width: { size: 3000, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Value", bold: true })] })]
              }),
              new TableCell({
                width: { size: 3360, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Notes", bold: true })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Investor Name", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("[Investor Name]")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Person or entity investing")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Company Name", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("[Your Company Legal Name]")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Delaware C-Corp recommended")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Investment Amount", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("$10,000 - $500,000")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Amount investor is contributing")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "SAFE Type", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Valuation Cap + Discount")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Most investor-friendly option")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Valuation Cap", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("$1,500,000 - $2,000,000")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Maximum valuation for conversion")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Discount Rate", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("20%")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Discount at next priced round")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Pro Rata Rights", bold: true })] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Yes (optional)")] })] }),
              new TableCell({ children: [new Paragraph({ children: [new TextRun("Investor can maintain % in future rounds")] })] })
            ]
          })
        ]
      }),
      new Paragraph({ text: "" }),

      // How a SAFE Works
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("How a SAFE Works")]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Investment Today")]
      }),
      new Paragraph({
        children: [new TextRun("1. Investor gives you $100,000")]
      }),
      new Paragraph({
        children: [new TextRun("2. You give investor a SAFE note (not equity yet!)")]
      }),
      new Paragraph({
        children: [new TextRun("3. SAFE has two key terms:")]
      }),
      new Paragraph({
        children: [new TextRun("   • Valuation Cap: $2,000,000")],
        indent: { left: 720 }
      }),
      new Paragraph({
        children: [new TextRun("   • Discount: 20%")],
        indent: { left: 720 }
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Conversion at Next Round (Example)")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Scenario: ", bold: true }), new TextRun("18 months later, you raise Series A")]
      }),
      new Paragraph({
        children: [new TextRun("• Series A price: $10,000,000 pre-money valuation")]
      }),
      new Paragraph({
        children: [new TextRun("• Series A share price: $10.00/share")]
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [new TextRun({ text: "Investor's conversion options:", bold: true })]
      }),
      new Paragraph({
        children: [new TextRun("1. Use the cap: $100,000 / $2M cap = 5% of company (better for investor)")]
      }),
      new Paragraph({
        children: [new TextRun("2. Use the discount: $100,000 at 20% discount = $100,000 / $8.00/share (not as good)")]
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [new TextRun({ text: "Investor chooses: ", bold: true }), new TextRun("Option 1 (the cap), gets 5% equity")]
      }),
      new Paragraph({ text: "" }),

      // Four Types of SAFEs
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Four Types of SAFEs")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1. Valuation Cap ONLY (Most Common)")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Terms: ", bold: true }), new TextRun("Valuation cap: $2M, No discount")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Conversion: ", bold: true }), new TextRun("Investor converts at the cap OR the next round price, whichever is LOWER")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Use when: ", bold: true }), new TextRun("You want simplicity, willing to give cap but not discount")]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2. Discount ONLY")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Terms: ", bold: true }), new TextRun("No valuation cap, Discount: 20%")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Conversion: ", bold: true }), new TextRun("Investor converts at 20% discount to next round price")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Use when: ", bold: true }), new TextRun("Very early stage, can't estimate valuation yet")]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3. Valuation Cap + Discount (Recommended for You)")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Terms: ", bold: true }), new TextRun("Valuation cap: $2M, Discount: 20%")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Conversion: ", bold: true }), new TextRun("Investor uses whichever is BETTER for them (cap or discount)")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Use when: ", bold: true }), new TextRun("Investor taking significant risk, you want to reward them")]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4. MFN (Most Favored Nation)")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Terms: ", bold: true }), new TextRun("No cap, no discount - Investor gets same terms as next SAFE investor")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Use when: ", bold: true }), new TextRun("Friends & family, very early, uncertain terms")]
      }),
      new Paragraph({ text: "" }),

      // Recommended SAFE Terms
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Recommended SAFE Terms for Your Situation")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("For a $10,000 Investment")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Recommended Structure:", bold: true })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Type: ", bold: true }), new TextRun("Valuation Cap + Discount")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Valuation Cap: ", bold: true }), new TextRun("$1,500,000")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Discount: ", bold: true }), new TextRun("20%")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Pro Rata Rights: ", bold: true }), new TextRun("Yes (optional)")]
      }),
      new Paragraph({ text: "" }),

      // How to Issue a SAFE
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("How to Issue a SAFE (Step-by-Step)")]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Step 1: Decide on Terms")]
      }),
      new Paragraph({ children: [new TextRun("☐ Investment amount: $________")] }),
      new Paragraph({ children: [new TextRun("☐ Valuation cap: $________")] }),
      new Paragraph({ children: [new TextRun("☐ Discount rate: ____%")] }),
      new Paragraph({ children: [new TextRun("☐ Pro rata rights: Yes / No")] }),
      new Paragraph({ children: [new TextRun("☐ Type: Cap only / Discount only / Cap + Discount / MFN")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Step 2: Use Clerky or Lawyer")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Option A: Clerky.com (Recommended for <$500K)", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• Cost: $799 flat fee")] }),
      new Paragraph({ children: [new TextRun("• Time: 15-30 minutes to complete")] }),
      new Paragraph({ children: [new TextRun("• Includes: SAFE docs, board consent, stock ledger updates")] }),
      new Paragraph({ children: [new TextRun("• Link: https://www.clerky.com")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        children: [new TextRun({ text: "Option B: Law Firm", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• Cost: $2,000-$5,000")] }),
      new Paragraph({ children: [new TextRun("• Time: 1-2 weeks")] }),
      new Paragraph({ children: [new TextRun("• Use when: Investment >$500K, complex terms, need legal review")] }),
      new Paragraph({ text: "" }),

      // Resources
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Resources")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Official SAFE Documents:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• Y Combinator SAFE templates: https://www.ycombinator.com/documents")] }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [new TextRun({ text: "SAFE Issuance Services:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• Clerky: https://www.clerky.com ($799)")] }),
      new Paragraph({ children: [new TextRun("• Gust Launch: https://gust.com/launch ($300-$500)")] }),
      new Paragraph({ text: "" }),

      new Paragraph({ text: "" }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "DISCLAIMER: This is educational material only. Consult a lawyer before issuing SAFEs.", italics: true, size: 20 })]
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
  fs.writeFileSync("04-SAFE-AGREEMENT-TEMPLATE.docx", buffer);
  console.log("Created: 04-SAFE-AGREEMENT-TEMPLATE.docx");
});
