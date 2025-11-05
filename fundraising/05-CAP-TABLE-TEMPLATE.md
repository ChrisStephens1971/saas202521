# Cap Table Template
## Capitalization Table for Tracking Equity Ownership

**Project:** saas202509
**Date:** October 2025

**Instructions:** Use this template in Excel/Google Sheets or transfer to Carta/Pulley for professional cap table management.

---

## What is a Cap Table?

A **Capitalization Table (Cap Table)** tracks who owns what percentage of your company.

**Tracks:**
- Founders
- Employees (with stock options)
- Investors (angels, VCs)
- Advisors
- SAFEs / convertible notes (before conversion)

**Why it matters:**
- Know who owns what % at any time
- Calculate dilution from new investments
- Required for fundraising (investors want to see it)
- Legal requirement for issuing equity

---

## Simple Cap Table Template

### Current State (Pre-Investment)

| Shareholder | Share Class | Shares Owned | % Ownership | Value (if valued) |
|-------------|-------------|--------------|-------------|-------------------|
| [Founder Name] | Common Stock | 10,000,000 | 100.00% | $0 (pre-revenue) |
| **Total Outstanding** | | **10,000,000** | **100.00%** | |

**Notes:**
- Single founder holds all shares
- No investors yet
- No employee options issued yet

---

### After $100K SAFE at $2M Cap (Unconverted)

**SAFEs don't convert until priced round, so cap table shows them separately:**

#### Outstanding Equity

| Shareholder | Share Class | Shares Owned | % Ownership |
|-------------|-------------|--------------|-------------|
| [Founder Name] | Common Stock | 10,000,000 | 100.00% |
| **Total Outstanding** | | **10,000,000** | **100.00%** |

#### SAFEs (Unconverted)

| Investor | Investment | Valuation Cap | Discount | Date | Status |
|----------|------------|---------------|----------|------|--------|
| [Investor Name] | $100,000 | $2,000,000 | 20% | 10/27/2025 | Unconverted |

**Estimated Post-Conversion Ownership (at Series A @ $5M):**

| Shareholder | Estimated % | Notes |
|-------------|-------------|-------|
| Founder | ~83-85% | Depends on Series A terms |
| SAFE Investor | ~5% | Converts at $2M cap |
| Series A Investor | ~10-12% | Assuming $500K-$750K raise |

---

### After Series A ($500K at $5M Pre-Money)

**SAFEs convert, Series A closes:**

| Shareholder | Share Class | Shares Owned | % Ownership | Investment | Value @ $5.5M Post |
|-------------|-------------|--------------|-------------|------------|--------------------|
| Founder | Common | 10,000,000 | 83.33% | $0 | $4,583,333 |
| SAFE Investor | Series A Preferred | 600,000 | 5.00% | $100,000 | $275,000 |
| Series A Lead | Series A Preferred | 1,400,000 | 11.67% | $500,000 | $641,667 |
| **Total** | | **12,000,000** | **100.00%** | **$600,000** | **$5,500,000** |

**Dilution:**
- Founder dilution: 100% → 83.33% (16.67% given up)
- Total capital raised: $600,000
- Post-money valuation: $5,500,000

---

## Detailed Cap Table Template (Copy to Excel)

### Sheet 1: Equity Ownership

| Name | Investor Type | Share Class | Shares Owned | % Fully Diluted | Investment | Value | Date Invested |
|------|---------------|-------------|--------------|-----------------|------------|-------|---------------|
| [Founder] | Founder | Common | 10,000,000 | 83.33% | $0 | $4,583,333 | [Date] |
| [SAFE Investor] | Angel | Series A Preferred | 600,000 | 5.00% | $100,000 | $275,000 | 10/27/2025 |
| [Series A Lead] | VC | Series A Preferred | 1,400,000 | 11.67% | $500,000 | $641,667 | [Date] |
| | | | | | | | |
| **Total Outstanding** | | | **12,000,000** | **100.00%** | **$600,000** | **$5,500,000** | |

---

### Sheet 2: Option Pool

**Employee Stock Option Pool (10% of fully diluted):**

| Option Holder | Title | Options Granted | Vested | Unvested | Exercise Price | Grant Date | Vesting Schedule |
|---------------|-------|-----------------|--------|----------|----------------|------------|------------------|
| [Employee 1] | CTO | 500,000 | 0 | 500,000 | $0.01 | [Date] | 4yr, 1yr cliff |
| [Employee 2] | Engineer | 200,000 | 0 | 200,000 | $0.01 | [Date] | 4yr, 1yr cliff |
| [Advisor 1] | Advisor | 50,000 | 12,500 | 37,500 | $0.01 | [Date] | 2yr, no cliff |
| | | | | | | | |
| **Total Options** | | **750,000** | **12,500** | **737,500** | | | |
| **Remaining Pool** | | **450,000** | | | | | |
| **Total Pool (10%)** | | **1,200,000** | | | | | |

**Note:** Option pool is typically 10-15% of fully diluted shares, created BEFORE investors come in (so dilution hits founders, not investors).

---

### Sheet 3: SAFEs & Convertible Notes

| Investor | Type | Amount | Valuation Cap | Discount | Interest Rate | Maturity Date | Status | Conversion Event |
|----------|------|--------|---------------|----------|---------------|---------------|--------|------------------|
| [Investor 1] | SAFE | $100,000 | $2,000,000 | 20% | - | - | Unconverted | Series A |
| [Investor 2] | Convertible Note | $50,000 | $1,500,000 | 15% | 5% | 10/27/2027 | Unconverted | Series A |
| | | | | | | | | |
| **Total Unconverted** | | **$150,000** | | | | | | |

---

### Sheet 4: Funding Rounds History

| Round | Date | Amount Raised | Pre-Money Valuation | Post-Money Valuation | Lead Investor | % Sold | Founder % After |
|-------|------|---------------|---------------------|----------------------|---------------|--------|-----------------|
| Incorporation | [Date] | $0 | $0 | $0 | - | 0% | 100% |
| SAFE | 10/27/2025 | $100,000 | $2,000,000 | $2,100,000 | [Investor] | ~5% | ~95% |
| Series A | [Date] | $500,000 | $5,000,000 | $5,500,000 | [VC Fund] | ~12% | ~83% |
| Series B | [Future] | TBD | TBD | TBD | TBD | TBD | TBD |

---

### Sheet 5: Dilution Analysis

**Scenario: Raising $500K at Different Valuations**

| Pre-Money Valuation | Investment | Post-Money | % Sold | Founder % (start 100%) | Founder % After |
|---------------------|------------|------------|--------|------------------------|-----------------|
| $2,000,000 | $500,000 | $2,500,000 | 20.0% | 100% | 80.0% |
| $3,000,000 | $500,000 | $3,500,000 | 14.3% | 100% | 85.7% |
| $4,000,000 | $500,000 | $4,500,000 | 11.1% | 100% | 88.9% |
| $5,000,000 | $500,000 | $5,500,000 | 9.1% | 100% | 90.9% |

**Key Insight:** Higher valuation = less dilution

---

### Sheet 6: Exit Scenarios

**What happens at different exit valuations (with current ownership):**

| Shareholder | % Owned | Exit @ $10M | Exit @ $50M | Exit @ $100M |
|-------------|---------|-------------|-------------|--------------|
| Founder | 83.33% | $8,333,333 | $41,666,667 | $83,333,333 |
| SAFE Investor | 5.00% | $500,000 | $2,500,000 | $5,000,000 |
| Series A | 11.67% | $1,166,667 | $5,833,333 | $11,666,667 |
| **Total** | **100%** | **$10M** | **$50M** | **$100M** |

**Investor Returns:**

| Investor | Investment | Exit @ $10M | Exit @ $50M | Exit @ $100M | Return Multiple |
|----------|------------|-------------|-------------|--------------|-----------------|
| SAFE Investor | $100,000 | $500,000 | $2,500,000 | $5,000,000 | 5x / 25x / 50x |
| Series A | $500,000 | $1,166,667 | $5,833,333 | $11,666,667 | 2.3x / 11.7x / 23.3x |

---

## Cap Table Best Practices

### 1. Update After Every Transaction

**Update cap table when:**
- Issuing founder stock
- Closing investment round (SAFE, equity, etc.)
- Granting employee stock options
- Options vest or are exercised
- Shares are transferred or sold

---

### 2. Track Vesting Schedules

**For founders:**
- Implement founder vesting (4 years, 1-year cliff)
- Protects company if founder leaves early

**For employees:**
- Standard: 4-year vesting, 1-year cliff
- Options vest monthly after cliff

**For advisors:**
- Typically: 2-year vesting, no cliff or 3-month cliff

---

### 3. Create Option Pool BEFORE Raising Money

**Why?**
- Dilution from option pool hits founders, not investors
- Shows investors you've planned for hiring

**Typical size:**
- Pre-seed: 10% of fully diluted
- Series A: 15-20% of fully diluted
- Series B+: 10-15% top-up as needed

---

### 4. Use Professional Tools (Eventually)

**Start:** Excel/Google Sheets (free)

**Once you raise >$100K:** Use Carta or Pulley
- Carta: https://carta.com ($2K-$5K/year, industry standard)
- Pulley: https://pulley.com ($500-$2K/year, simpler/cheaper)
- Shareworks: https://www.shareworks.com (enterprise, expensive)

**Benefits:**
- Automated 409A valuations
- Employee option grants
- Compliance (IRS reporting)
- Investor portal
- Electronic signatures

---

## Common Cap Table Mistakes

### Mistake 1: Not Implementing Founder Vesting

**Problem:** Founder leaves after 6 months, still owns 50% of company

**Solution:** All founders vest over 4 years with 1-year cliff

**Implementation:**
- Stock Restriction Agreement
- Company has right to repurchase unvested shares if founder leaves

---

### Mistake 2: Forgetting to Create Option Pool

**Problem:** Raise money, then realize you need to create 10% option pool, which dilutes you further

**Solution:** Create option pool BEFORE raising, so dilution from pool hits pre-money valuation

**Example:**
- **Wrong:** Raise at $5M pre-money, then create 10% pool → you get diluted
- **Right:** Create 10% pool, then raise at $5M pre-money → investors absorb dilution

---

### Mistake 3: Not Tracking SAFEs Properly

**Problem:** Forget you have 3 outstanding SAFEs with different caps, chaos at Series A

**Solution:** Maintain SAFE register (Sheet 3 above)

**Track:**
- Investor name, amount, cap, discount, date
- Conversion trigger event
- Status (unconverted / converted)

---

### Mistake 4: Using Wrong Share Price for 409A

**Problem:** Grant employees options at $0.01/share when fair market value is $2.00/share → IRS penalties

**Solution:** Get 409A valuation every 12 months (or when you raise money)

**Cost:** $2,000-$5,000 via Carta or independent valuation firm

---

### Mistake 5: Not Keeping Cap Table Updated

**Problem:** New investor asks for cap table, it's 6 months out of date

**Solution:** Update immediately after any equity event

**Best practice:**
- Date each version
- Track changes in changelog
- Store securely (Google Drive, Dropbox, Carta)

---

## Dilution Calculator

### Formula

```
New Ownership % = (Old Shares) / (Old Shares + New Shares Issued)
```

### Example: Founder Dilution from Series A

**Before Series A:**
- Founder: 10,000,000 shares (100%)

**Series A Investment:**
- $500,000 at $5,000,000 pre-money
- Post-money: $5,500,000
- % sold: $500K / $5.5M = 9.09%
- New shares issued: 1,000,000

**After Series A:**
- Founder: 10,000,000 shares
- Total shares: 11,000,000
- Founder %: 10M / 11M = **90.91%**
- Dilution: 100% → 90.91% = **9.09% dilution**

---

## Valuation Calculator

### Pre-Money vs. Post-Money

| Metric | Formula | Example |
|--------|---------|---------|
| **Pre-Money Valuation** | What company is worth before investment | $5,000,000 |
| **Investment Amount** | Cash invested | $500,000 |
| **Post-Money Valuation** | Pre-money + Investment | $5,500,000 |
| **% Sold to Investor** | Investment / Post-Money | $500K / $5.5M = 9.09% |

---

### Share Price Calculation

| Metric | Formula | Example |
|--------|---------|---------|
| **Shares Outstanding (before)** | Total shares | 10,000,000 |
| **Pre-Money Valuation** | Valuation before investment | $5,000,000 |
| **Share Price** | Pre-Money / Shares Outstanding | $5M / 10M = **$0.50/share** |
| | | |
| **Investment Amount** | Cash invested | $500,000 |
| **New Shares Issued** | Investment / Share Price | $500K / $0.50 = 1,000,000 |
| | | |
| **Shares Outstanding (after)** | Old + New Shares | 11,000,000 |
| **Post-Money Valuation** | Share Price × Total Shares | $0.50 × 11M = $5,500,000 |

---

## Template Download Instructions

**To create this in Google Sheets:**

1. Create new Google Sheet
2. Create 6 tabs:
   - "Equity Ownership"
   - "Option Pool"
   - "SAFEs & Notes"
   - "Funding Rounds"
   - "Dilution Analysis"
   - "Exit Scenarios"

3. Copy tables from each section above into respective tabs

4. Add formulas:
   - % Ownership = (Shares Owned / Total Shares)
   - Value = (% Ownership × Company Valuation)
   - Dilution = (1 - New % / Old %)

5. Format:
   - Currency: $0,000,000
   - Percentages: 0.00%
   - Numbers: 0,000,000

6. Share with co-founders and advisors (view only)

7. Update monthly or after any equity transaction

---

## When to Upgrade to Professional Cap Table Software

**Stay with spreadsheet if:**
- <5 shareholders
- No employee options yet
- Pre-seed stage
- <$100K raised

**Upgrade to Carta/Pulley when:**
- >5 shareholders
- Granting employee options
- Raised >$100K
- Multiple investment rounds
- Need 409A valuations
- Want investor portal
- Planning exit or IPO

**Cost:**
- Carta: $2,000-$5,000/year
- Pulley: $500-$2,000/year

**Worth it when:** Time saved > cost (usually at Series A)

---

## Resources

**Cap Table Tools:**
- Carta: https://carta.com
- Pulley: https://pulley.com
- Capshare: https://www.capshare.com
- Eqvista: https://eqvista.com

**Cap Table Templates:**
- Carta free template: https://carta.com/cap-table-template/
- Pulley free template: https://pulley.com/cap-table-template
- Google "cap table template" for many options

**Learning:**
- Carta's cap table 101: https://carta.com/equity/equity-101/
- YC cap table guide: https://www.ycombinator.com/library
- "Venture Deals" by Brad Feld (book)

---

**Last Updated:** October 27, 2025
**Version:** 1.0
