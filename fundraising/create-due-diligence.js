/**
 * @fileoverview Due Diligence Checklist Generator
 *
 * Creates a comprehensive due diligence checklist document in .docx format.
 * Covers legal, financial, technical, and business aspects for investor review.
 *
 * @module create-due-diligence
 * @requires docx
 * @requires fs
 *
 * @author Fundraising Templates
 * @version 1.0
 */

const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, LevelFormat } = require('docx');

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22 } }
    },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal",
        run: { size: 32, bold: true, color: "000000" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal",
        run: { size: 28, bold: true, color: "000000" },
        paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 1 } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "☐", alignment: AlignmentType.LEFT,
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
        children: [new TextRun({ text: "Due Diligence Checklist", size: 40, bold: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "What Investors Will Ask For", size: 24 })]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        children: [new TextRun({ text: "Purpose: ", bold: true }), new TextRun("Be prepared for investor due diligence by having these documents ready")]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("What is Due Diligence?")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Due diligence", bold: true }), new TextRun(" is the process where investors verify your claims and assess risks before investing.")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Typical timeline:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• Friends & Family: Minimal due diligence (1-2 days)")] }),
      new Paragraph({ children: [new TextRun("• Angels: Light due diligence (1-2 weeks)")] }),
      new Paragraph({ children: [new TextRun("• VCs: Thorough due diligence (2-8 weeks)")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Due Diligence Checklist")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1. Company Formation & Legal")]
      }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Certificate of Incorporation (Delaware C-Corp recommended)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Bylaws (company governance rules)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Stock Purchase Agreements (founder stock)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Board Consents (approving key decisions)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Cap Table (who owns what %)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("83(b) Elections (founders filed with IRS within 30 days)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Intellectual Property Assignment Agreements (founders assigned IP to company)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Founder Vesting Agreements (if applicable)")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("2. Intellectual Property")]
      }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Patents (if any filed or pending)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Trademarks (company name, logo, product name)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Copyright registrations (if applicable)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Domain names (list of all domains owned)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Open source licenses (list all open source software used)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("IP assignment from contractors (if hired any developers/designers)")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3. Financial Information")]
      }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Bank statements (last 6 months)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Financial projections (5-year model)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Burn rate (monthly expenses)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Runway (months of cash remaining)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Revenue (if any - ARR, MRR, customer list)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Unit economics (CAC, LTV, CAC payback, margins)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Existing cap table (before this investment)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Prior funding (any SAFEs, convertible notes, or equity rounds)")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4. Product & Technology")]
      }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Product demo (live or video)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Product roadmap (what you're building, when)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Technical architecture (system diagram)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("GitHub repository (code review - may be requested by technical investors)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Tech stack (languages, frameworks, infrastructure)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Security & compliance (GDPR, SOC 2, data protection)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Scalability plan (how product handles growth)")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5. Market & Customers")]
      }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Market size (TAM, SAM, SOM calculations)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Competitive analysis (who are competitors, how you differentiate)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Customer discovery (# of interviews, key learnings)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Letters of Intent (LOIs) (if any HOAs committed)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Pilot agreements (if any HOAs testing product)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Customer testimonials (if applicable)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Pricing strategy (how you determined $400-$800/month)")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("6. Team & Advisors")]
      }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Founder bio (LinkedIn, resume)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Team members (if any)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Advisor agreements (if any advisors involved)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Employment agreements (for any employees)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Contractor agreements (if hired any freelancers)")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("7. Fundraising History")]
      }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Term sheet (from this round, if applicable)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("SAFEs or convertible notes (from prior rounds)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Prior investor list (names, amounts, dates)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Use of funds (how you'll spend this raise)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Milestones (what you'll achieve with this capital)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Next round plan (when and how much you'll raise next)")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("8. Business Model & Strategy")]
      }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Business model canvas (or equivalent)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Go-to-market strategy (how you'll acquire customers)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Sales process (enterprise sales to HOA boards)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Marketing channels (direct outreach, partnerships, content)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Partnership strategy (property management companies)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Exit strategy (acquisition targets, IPO timeline)")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("9. References")]
      }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Customer references (HOA board members willing to vouch for you)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Industry references (CPAs, property managers who know the space)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Personal references (professional contacts who can vouch for founder)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Advisor references (if you have advisors investors can call)")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Preparation Action Plan")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Week 1: Legal & Formation")]
      }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Ensure Delaware C-Corp incorporated")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Confirm all founder stock issued")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("File 83(b) elections (if not already)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Get all IP assignment agreements signed")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Create cap table")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Week 2: Financial")]
      }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Build 5-year financial model")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Document current burn rate")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Calculate unit economics (CAC, LTV)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Gather bank statements")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Prepare use of funds breakdown")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Week 3: Product & Market")]
      }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Create product demo (video or live)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Document technical architecture")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Summarize customer discovery findings")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Calculate market size (TAM/SAM/SOM)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Analyze competitive landscape")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Week 4: Organize & Share")]
      }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Create Google Drive folder")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Upload all documents")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Create index/README")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Test sharing permissions")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Brief references (who investors might call)")] }),
      new Paragraph({ text: "" }),

      new Paragraph({
        children: [new TextRun({ text: "Total Prep Time: ", bold: true }), new TextRun("2-4 weeks (can do in parallel with fundraising)")]
      }),
      new Paragraph({ text: "" }),

      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Resources")]
      }),
      new Paragraph({
        children: [new TextRun({ text: "Due Diligence Tools:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• DocSend: https://www.docsend.com")] }),
      new Paragraph({ children: [new TextRun("• Carta: https://carta.com (includes data room)")] }),
      new Paragraph({ children: [new TextRun("• Google Drive: Free, good for early stage")] }),
      new Paragraph({ text: "" }),
      new Paragraph({
        children: [new TextRun({ text: "Legal:", bold: true })]
      }),
      new Paragraph({ children: [new TextRun("• Clerky: https://www.clerky.com (incorporation, SAFEs)")] }),
      new Paragraph({ children: [new TextRun("• Gust Launch: https://gust.com/launch (incorporation + legal)")] }),
      new Paragraph({ text: "" }),

      new Paragraph({ text: "" }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "REMEMBER: Investors expect gaps at pre-revenue stage. Be honest, organized, and responsive.", italics: true, bold: true, size: 24 })]
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
  fs.writeFileSync("06-DUE-DILIGENCE-CHECKLIST.docx", buffer);
  console.log("Created: 06-DUE-DILIGENCE-CHECKLIST.docx");
});
