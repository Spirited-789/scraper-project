# 📊 Data Analyst — Fresher Interview Prep Syllabus

> **Your Current Stack:** Python (Pandas, NumPy, Matplotlib, Seaborn), SQL, Excel, Tableau, ADF ETL experience
> **Goal:** Clear fresher Data Analyst interviews with confidence
> **Estimated Prep Time:** ~4–6 weeks (you already know most tools — this is about depth & interview-readiness)

---

## Phase 1: Excel — Interview Depth (Week 1, ~4 days)

> [!IMPORTANT]
> Excel is tested in **every** DA interview. Companies expect you to be fast and confident, not just "aware."

### What's Tested vs What's Not

| Tested Heavily ⚡ | Tested Sometimes 🟡 | Rarely Tested ❌ |
|---|---|---|
| VLOOKUP / XLOOKUP | INDEX-MATCH (combo) | VBA / Macros |
| Pivot Tables & Pivot Charts | Data Validation & Dropdowns | Power Pivot (unless JD mentions it) |
| IF, SUMIF, COUNTIF, AVERAGEIF | TEXT functions (LEFT, RIGHT, MID, TRIM) | Solver |
| Conditional Formatting | IFERROR, ISBLANK | Recording Macros |
| Charts (Bar, Line, Pie, Combo) | Named Ranges | Power Map |
| Data Sorting & Filtering | Remove Duplicates, Flash Fill | |
| Freeze Panes, Split View | Power Query (ETL in Excel) | |
| Basic Formatting & Presentation | What-If Analysis (Goal Seek) | |

### Topic Breakdown

| Topic | Depth Required | Time | What Interviewers Ask |
|-------|---------------|------|----------------------|
| **VLOOKUP / XLOOKUP** | 🔴 Deep | 0.5 day | "What's the difference?", "When does VLOOKUP fail?", approximate vs exact match, common errors (#N/A) |
| **INDEX-MATCH** | 🟡 Medium | 0.25 day | "Why is INDEX-MATCH better than VLOOKUP?" — left-lookup capability, dynamic ranges |
| **Pivot Tables** | 🔴 Deep | 0.5 day | Live task: "Summarize this sales data by region and product" — grouping, calculated fields, slicers, pivot charts |
| **IF / Nested IF** | 🔴 Deep | 0.25 day | Nested logic, combining with AND/OR, IFS function |
| **SUMIF / COUNTIF family** | 🔴 Deep | 0.25 day | SUMIFS with multiple criteria, wildcards in criteria |
| **Conditional Formatting** | 🟡 Medium | 0.25 day | Highlight top/bottom N, data bars, color scales, custom formula rules |
| **Charts** | 🟡 Medium | 0.5 day | "Which chart type would you use for X?" — choosing the right visualization, formatting best practices |
| **TEXT Functions** | 🟡 Medium | 0.25 day | LEFT, RIGHT, MID, CONCATENATE/TEXTJOIN, TRIM, LEN, SUBSTITUTE |
| **DATE Functions** | 🟡 Medium | 0.25 day | YEAR, MONTH, DAY, DATEDIF, EOMONTH, NETWORKDAYS |
| **Power Query** | 🟡 Medium | 0.5 day | Basic ETL: import → clean → transform → load. Append vs merge queries |
| **Data Cleaning** | 🔴 Deep | 0.25 day | Remove duplicates, handle blanks, TRIM, CLEAN, find & replace patterns |

### 🎯 Excel Practice Tasks

1. Given a sales dataset → create a Pivot Table showing revenue by region, quarter, and product
2. Use VLOOKUP to merge two sheets (orders + customer details)
3. Build a dashboard with 3 charts, slicers, and conditional formatting
4. Clean a messy dataset (duplicates, extra spaces, mixed date formats, blanks)

---

## Phase 2: SQL — Interview Depth (Week 1–2, ~4 days)

> [!TIP]
> You already know SQL well from DA prep. This phase is about **interview patterns** and **speed**, not learning from scratch.

### What's Tested at Each Level

| Level | Topics | Your Status |
|-------|--------|-------------|
| 🟢 **Basic** (every interview) | SELECT, WHERE, ORDER BY, LIMIT, DISTINCT, basic aggregations | ✅ You know this |
| 🟡 **Intermediate** (most interviews) | JOINs (all types), GROUP BY + HAVING, subqueries, CASE WHEN | ✅ You know this |
| 🔴 **Advanced** (good companies) | Window functions, CTEs, self-joins, correlated subqueries | 🟡 Review |
| ⚫ **Expert** (rare for freshers) | Query optimization, execution plans, indexing theory | 🟡 Know conceptually |

### Must-Practice SQL Patterns

| Pattern | Example Question | Frequency |
|---------|-----------------|-----------|
| **Second highest salary** | "Find the 2nd highest salary without LIMIT" — use window functions or subquery | Very common |
| **Duplicate detection** | "Find duplicate emails in a table" — GROUP BY + HAVING COUNT > 1 | Very common |
| **Running totals** | "Show cumulative revenue by month" — SUM() OVER (ORDER BY) | Common |
| **Rank / Dense Rank** | "Rank employees by salary within each department" — RANK() vs DENSE_RANK() vs ROW_NUMBER() | Common |
| **Self-join** | "Find employees who earn more than their manager" | Common |
| **Date filtering** | "Get orders from last 30 days" — DATE functions, BETWEEN | Common |
| **NULL handling** | "What's the difference between WHERE x != 5 and WHERE x != 5 OR x IS NULL?" | Tricky favorite |
| **CASE WHEN pivoting** | "Convert rows to columns" — conditional aggregation | Medium |
| **Correlated subquery** | "Find departments where avg salary > company avg" | Medium |
| **CTE + recursion** | "Show org hierarchy" — WITH RECURSIVE | Rare but impressive |

### 📝 Practice Plan
- Solve **30 LeetCode SQL problems** (15 Easy + 15 Medium) — aim for 2–3 per day
- Time yourself: you should solve Easy in <5 min, Medium in <15 min

---

## Phase 3: Python for Analytics (Week 2–3, ~5 days)

> [!NOTE]
> Focus is on **Pandas fluency** and **data wrangling**, not DSA. DA interviews test your ability to manipulate data, not solve algorithms.

### Pandas — What's Tested

| Topic | Depth | Time | Interview Context |
|-------|-------|------|------------------|
| **DataFrame basics** | 🔴 Deep | 0.5 day | Creating, reading (csv/excel/json), `.head()`, `.info()`, `.describe()`, `.shape` |
| **Selection & Filtering** | 🔴 Deep | 0.5 day | `.loc[]`, `.iloc[]`, boolean indexing, `.query()`, multiple conditions |
| **GroupBy & Aggregation** | 🔴 Deep | 0.5 day | `.groupby()`, `.agg()`, named aggregations, transform vs apply |
| **Merging & Joining** | 🔴 Deep | 0.5 day | `pd.merge()`, `pd.concat()`, join types, handling duplicates after merge |
| **Data Cleaning** | 🔴 Deep | 0.5 day | `.isna()`, `.fillna()`, `.dropna()`, `.duplicated()`, `.drop_duplicates()`, string methods |
| **Pivot & Reshape** | 🟡 Medium | 0.25 day | `.pivot_table()`, `.melt()`, `.stack()/.unstack()` |
| **DateTime handling** | 🟡 Medium | 0.25 day | `pd.to_datetime()`, `.dt` accessor, resampling, period extraction |
| **Apply & Lambda** | 🟡 Medium | 0.25 day | `.apply()`, row-wise vs column-wise, when to avoid apply |
| **Window functions** | 🟡 Medium | 0.25 day | `.rolling()`, `.expanding()`, `.shift()`, `.pct_change()` |
| **String operations** | 🟡 Medium | 0.25 day | `.str.contains()`, `.str.split()`, `.str.replace()`, regex basics |

### Visualization — Where & How It's Tested (India Freshers)

> [!IMPORTANT]
> **Both Tableau AND Python viz matter** — but they're tested in different contexts. Don't skip either.

**Who asks what (Indian companies):**

| Company Type | Tableau or Python Viz? |
|---|---|
| Analytics firms (MuSigma, Fractal, LatentView, Tiger) | **Tableau heavy** — portfolio + live build |
| Product cos (Amazon, Flipkart, Swiggy, Zepto) | **Python viz heavy** — Jupyter coding rounds |
| Consulting (Deloitte, EY, KPMG analytics) | **Tableau/Power BI** — presentation focus |
| Service cos (TCS, Wipro, Infosys) | **Excel charts** mostly |
| Startups | **Either/both** — depends on their stack |

**Depth needed per tool:**

| Tool | Depth | How It's Tested |
|------|-------|----------------|
| **Tableau** | 🔴 Deep | Portfolio review + live dashboard build + "why this chart?" |
| **Matplotlib** | 🟡 Medium | Coding round — "visualize this data" (know basic syntax) |
| **Seaborn** | 🟡 Medium | Same — `sns.heatmap()`, `sns.boxplot()`, `sns.barplot()` |
| **Chart Selection** (tool-agnostic) | 🔴 Deep | Verbal — "What chart would you use for X?" |

**Chart Selection Cheat Sheet** — memorize this:

| Data Scenario | Chart Type |
|---|---|
| Trend over time | **Line chart** |
| Comparison across categories | **Bar chart** |
| Distribution | **Histogram / Box plot** |
| Relationship between 2 variables | **Scatter plot** |
| Composition / part-of-whole | **Pie chart** (≤5 categories) / **Stacked bar** |
| Correlation matrix | **Heatmap** |
| Geographic data | **Map / Filled map** |
| Ranked items | **Horizontal bar chart** |

---

## Phase 4: Tableau / BI Tools (Week 3–4, ~4 days)

### What's Tested

| Topic | Depth | Time | Notes |
|-------|-------|------|-------|
| **Connecting to data** | 🟢 Basic | 0.25 day | Live vs Extract, joining tables in Tableau |
| **Chart types** | 🔴 Deep | 0.5 day | Build any chart type quickly — bar, line, scatter, map, heatmap, treemap, dual-axis |
| **Filters** | 🔴 Deep | 0.5 day | Dimension vs measure filters, context filters, filter order of operations |
| **Calculated Fields** | 🔴 Deep | 0.5 day | IF/CASE, string calcs, date calcs, table calculations (RUNNING_SUM, RANK) |
| **LOD Expressions** | 🟡 Medium | 0.5 day | FIXED, INCLUDE, EXCLUDE — interviewers love asking "What's a LOD expression?" |
| **Dashboard Design** | 🔴 Deep | 0.5 day | Layout, interactivity (actions, filters), containers, device layouts |
| **Parameters** | 🟡 Medium | 0.25 day | Dynamic filtering, top N analysis, reference lines |
| **Sets & Groups** | 🟡 Medium | 0.25 day | Combined sets, dynamic sets, ad hoc grouping |
| **Data Storytelling** | 🔴 Deep | 0.25 day | Story points, presenting insights, not just charts |
| **Performance** | 🟢 Basic | 0.25 day | Extract optimization, reducing marks, using context filters |

### 🎯 Tableau Portfolio Pieces (have 2–3 ready)

1. **Sales Dashboard** — KPI cards + trend line + regional heatmap + filterable
2. **Customer Segmentation** — scatter plot with clustering, parameter-driven N selection
3. **Your ETL Project Dashboard** — the Tableau dashboards you already built on medallion data ✅

---

## 📖 Business Terms Cheat Sheet (No MBA Needed)

> [!TIP]
> You don't need domain experience. Memorize these **15 terms** and you can handle 90% of business questions in DA interviews.

| Term | What It Means | One-line Example |
|------|--------------|------------------|
| **Revenue** | Total money earned | Monthly revenue = units sold × price |
| **Churn Rate** | % customers who leave | 10% churn = 10 out of 100 users left |
| **Retention Rate** | % customers who stay | 90% retention = opposite of 10% churn |
| **Conversion Rate** | % who take desired action | 5% conversion = 5 of 100 visitors bought |
| **DAU / MAU** | Daily/Monthly Active Users | DAU÷MAU ratio shows app stickiness |
| **ARPU** | Avg Revenue Per User | Revenue ÷ total users |
| **CAC** | Customer Acquisition Cost | How much it costs to get 1 new customer |
| **LTV** | Lifetime Value | Total revenue from a customer over their lifetime |
| **KPI** | Key Performance Indicator | The one number your team tracks for success |
| **YoY / MoM / QoQ** | Year/Month/Quarter over comparison | "Revenue grew 15% YoY" |
| **Funnel** | Steps user takes to a goal | Visit → Sign up → Purchase |
| **Cohort** | Group of users by shared trait | "Jan 2025 cohort = users who signed up in Jan" |
| **Outlier** | Unusual data point | One customer spent ₹50L when avg is ₹500 |
| **Segment** | Dividing users into groups | High-value vs low-value customers |
| **A/B Test** | Comparing two versions | Version A (blue button) vs Version B (green button) |

### 🧠 The CHAR Framework (Answer ANY Business Case Question)

When they ask *"Revenue dropped 15%. How would you investigate?"*:

```
C — CLARIFY    → "Which product/region? Over what time period?"
H — HYPOTHESIZE → "Could be fewer orders, lower order value, or seasonal drop"
A — ANALYZE     → Break down by dimensions (region, product, channel, segment)
R — RECOMMEND   → "I'd investigate X first because it has the largest impact"
```

> You don't need the "right" answer. Interviewers want **structured thinking**, not domain expertise.

### 🎯 Make Your "Copy-Paste" Dashboards Interview-Ready

For **each dashboard** you've built, write down answers to these 3 questions:

1. **What question does this dashboard answer?** → "Which regions drive the most revenue?"
2. **Why this chart type?** → "Bar chart because I'm comparing categories, not showing a trend"
3. **One insight from looking at it?** → "Region X has 2× revenue but 3× returns — needs investigation"

If you can answer these 3 questions per dashboard, you've converted "copy-paste" into **"I built this with purpose."**

---

## Phase 5: Statistics & Business Sense (Week 4–5, ~5 days)

> [!IMPORTANT]
> This is the phase most freshers skip and then bomb in interviews. Statistics + business thinking separates "I know tools" from "I can analyze."

### Statistics — What's Tested

| Topic | Depth | Time | Common Questions |
|-------|-------|------|-----------------|
| **Mean, Median, Mode** | 🔴 Deep | 0.25 day | "When would you use median instead of mean?" → skewed data |
| **Standard Deviation & Variance** | 🟡 Medium | 0.25 day | "What does a high std dev tell you?" |
| **Percentiles & Quartiles** | 🟡 Medium | 0.25 day | IQR, box plot interpretation, outlier detection (1.5×IQR rule) |
| **Probability Basics** | 🟡 Medium | 0.5 day | Independent vs dependent events, Bayes' theorem (conceptual), conditional probability |
| **Distributions** | 🟡 Medium | 0.5 day | Normal distribution, Central Limit Theorem, skewness, kurtosis |
| **Hypothesis Testing** | 🔴 Deep | 1 day | Null/alternative hypothesis, p-value, Type I/II errors, t-test, chi-square — framework, not math |
| **Correlation vs Causation** | 🔴 Deep | 0.25 day | "Does correlation imply causation?" — always asked, have good examples |
| **A/B Testing** | 🔴 Deep | 0.5 day | Design an A/B test, sample size, significance, practical vs statistical significance |
| **Regression basics** | 🟡 Medium | 0.5 day | Linear regression concept, R², interpreting coefficients — not derivation |

### Business Sense & Analytical Thinking

| Topic | What to Know | Time |
|-------|-------------|------|
| **KPIs & Metrics** | Revenue, DAU/MAU, churn rate, retention, conversion funnel, ARPU, LTV, CAC | 0.5 day |
| **Problem-Solving Framework** | Clarify → Hypothesize → Analyze → Recommend (CHAR framework) | 0.25 day |
| **Root Cause Analysis** | "Revenue dropped 20% last month. How would you investigate?" — break into dimensions | 0.25 day |
| **Metric Design** | "How would you measure the success of feature X?" | 0.25 day |
| **Data Quality** | Missing data strategies, bias detection, "garbage in garbage out" | 0.25 day |

---

## Phase 6: Interview Prep & Common Questions (Week 5–6)

### 📋 Top 50 DA Interview Questions by Category

#### Excel Questions
1. What's the difference between VLOOKUP and INDEX-MATCH?
2. How do you handle #N/A errors in VLOOKUP?
3. Explain Pivot Tables — when and why would you use one?
4. How would you remove duplicates from a large dataset?
5. What's the difference between a Pivot Table and a regular table?
6. How do you create a dynamic chart that updates with new data?
7. What's Power Query and when would you use it?

#### SQL Questions
8. Explain different types of JOINs with examples
9. What's the difference between WHERE and HAVING?
10. Find the second highest salary in a table (write the query)
11. What are window functions? Give an example
12. Difference between RANK(), DENSE_RANK(), and ROW_NUMBER()
13. What is a CTE and why use it instead of a subquery?
14. How would you optimize a slow query?
15. What's the difference between DELETE, TRUNCATE, and DROP?
16. Explain normalization — what are 1NF, 2NF, 3NF?

#### Python / Pandas Questions
17. How do you handle missing values in a dataset?
18. What's the difference between `loc` and `iloc`?
19. How do you merge two DataFrames? What join types are available?
20. What does `groupby()` do? How is `transform` different from `agg`?
21. How would you find and remove duplicate rows?
22. What's the difference between `apply()` and `map()`?
23. How do you read a CSV file and check its basic statistics?

#### Tableau Questions
24. What's the difference between a dimension and a measure?
25. What are LOD expressions? When would you use FIXED?
26. How do you create a dual-axis chart?
27. What's the order of operations in Tableau (filter order)?
28. Explain the difference between Live and Extract connections
29. How would you optimize a slow Tableau dashboard?
30. What are table calculations? Give an example

#### Statistics Questions
31. What's the difference between mean, median, and mode? When use which?
32. Explain p-value in simple terms
33. What is a Type I error vs Type II error?
34. Does correlation imply causation? Give an example
35. How would you design an A/B test?
36. What is the Central Limit Theorem?
37. How do you detect outliers?
38. What's the difference between population and sample?

#### Business / Case Study Questions
39. "Revenue dropped 15% this month. How would you investigate?"
40. "How would you measure the success of a new app feature?"
41. "We have 1M rows of customer data. Walk me through your analysis approach"
42. "What's the difference between a vanity metric and an actionable metric?"
43. "How would you prioritize which analysis to do first?"
44. "Explain a project you worked on — what was the business impact?"

#### Behavioral Questions
45. Tell me about yourself (90-second pitch)
46. Walk me through a project you're proud of (STAR format)
47. How do you handle conflicting priorities?
48. Tell me about a time you found an insight others missed
49. How do you communicate technical findings to non-technical stakeholders?
50. Why data analytics? Why this company?

---

### 🗣️ The "Tell Me About Yourself" Template for DA

```
"Hi, I'm [Name], a final-year B.Tech student at VIT Bhopal.

I'm passionate about turning raw data into actionable insights. I'm proficient
in Python with Pandas and Seaborn for data analysis, SQL for querying databases,
Tableau for building interactive dashboards, and Excel for quick ad-hoc analysis.

One project I'm most proud of is [ETL pipeline project] — I built a full
medallion architecture using Azure Data Factory and created Tableau dashboards
that visualized [specific insights]. This taught me end-to-end data workflow
from ingestion to insight delivery.

I'm looking for a Data Analyst role where I can apply my analytical skills
to solve real business problems and grow with a data-driven team."
```

---

## 📅 Adjusted Schedule (Given Your Existing Skills)

```
Week 1  → Excel practice tasks (speed up, not learn) + SQL patterns (LeetCode 30)
Week 2  → Pandas deep practice + chart selection mastery
Week 3  → Tableau portfolio dashboards (polish existing + build 1 new)
Week 4  → Statistics (hypothesis testing, A/B testing, probability)
Week 5  → Business case studies + interview question practice
Week 6  → Mock interviews + pitch practice + portfolio polish
```

> [!TIP]
> **Speed-run (3–4 weeks):** Merge Weeks 1–2 (you know Excel+SQL, just practice speed), merge Weeks 5–6. Doable at 4–5 hrs/day.

---

## ✅ DA Interview Readiness Checklist

- [ ] Can build a Pivot Table with calculated fields in < 5 min
- [ ] Can write VLOOKUP, INDEX-MATCH, SUMIFS without Googling
- [ ] Can solve any Medium SQL problem on LeetCode in < 15 min
- [ ] Can explain window functions (RANK, LAG, RUNNING_SUM) with examples
- [ ] Can clean a messy dataset in Pandas in < 20 min
- [ ] Know which chart to use for any data scenario instantly
- [ ] Can explain LOD expressions and Tableau filter order
- [ ] Have 2–3 polished Tableau dashboards in portfolio
- [ ] Can explain hypothesis testing, p-value, A/B testing without notes
- [ ] Can answer "revenue dropped 15%" case study structured and calmly
- [ ] Can deliver "tell me about yourself" in 90 seconds flat
- [ ] Have STAR stories ready for 3 projects

---

## 📚 Recommended Resources

| Resource | What For |
|----------|----------|
| [Chandoo Excel Blog](https://chandoo.org/) | Excel tutorials & practice files |
| [LeetCode SQL Study Plan](https://leetcode.com/studyplan/top-sql-50/) | Structured SQL practice |
| [Kaggle Pandas Course](https://www.kaggle.com/learn/pandas) | Interactive Pandas exercises |
| [Storytelling with Data (book)](https://www.storytellingwithdata.com/) | Data viz best practices |
| [StatQuest YouTube](https://www.youtube.com/@statquest) | Statistics explained simply |
| [Tableau Public Gallery](https://public.tableau.com/app/discover) | Dashboard inspiration |

---

## 🔥 Your Competitive Edge (What Sets You Apart)

> [!IMPORTANT]
> Most DA freshers know the **same tools**. Your differentiators are:

1. **ETL Pipeline Experience** — You built a medallion architecture in ADF. Most freshers have never touched data engineering
2. **End-to-End Data Flow** — From raw data → bronze → silver → gold → Tableau insights. You understand the full lifecycle
3. **Delta Live Tables** — You know modern data lakehouse concepts that even some mid-level analysts don't
4. **Backend API Knowledge** — Your Scraper project shows you can work with APIs and databases, not just CSVs
5. **Multiple Tool Proficiency** — Python + SQL + Excel + Tableau is the complete DA toolkit

Frame yourself as: *"I don't just analyze data — I understand where the data comes from, how it's transformed, and how to deliver insights."*
