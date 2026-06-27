# Bedaya – From Idea to First Business Step

## Tatweer Hackathon 2026

### Challenge 1 – Taking the First Entrepreneurial Step

---

## Project Overview

Bedaya is a lightweight web application that helps first-time founders transform a skill or business idea into a practical, evidence-based startup plan.

Many people in rural communities have valuable skills but struggle to answer simple questions:

- Is my idea realistic?
- Who should be my first customer?
- How much money do I need?
- Where do I begin?
- Which government resources should I use?
- Should I launch now or validate first?

Rather than simply suggesting ideas, Bedaya guides founders through opportunity discovery, startup planning, customer validation, financial estimation, and official business resources.

The application was designed specifically around the needs of **Al Qua'a**, while remaining adaptable to similar rural communities throughout the UAE.

---

# Challenge Statement

## Challenge Chosen

**Challenge 1 – Taking the First Entrepreneurial Step**

The challenge asks teams to help first-time founders move from an idea to a concrete first action.

Many potential entrepreneurs never begin because they lack clear guidance rather than motivation.

Common barriers include:

- choosing an appropriate business
- identifying first customers
- understanding startup costs
- knowing official licensing resources
- validating demand before investing
- turning an idea into an actionable roadmap

Bedaya directly addresses these barriers by converting a founder's information into a personalized startup plan with measurable recommendations.

---

# Community Context

Bedaya was designed with **Al Qua'a** in mind.

Al Qua'a is a rural community in the Al Ain region known for:

- camel farming
- small family businesses
- agriculture
- handicrafts
- extremely low light pollution
- stargazing tourism

These characteristics influenced the opportunity dataset and the community guidance produced by the application.

The current prototype also supports:

- Al Qua'a
- Al Ain
- Abu Dhabi
- General UAE communities

Additional community profiles can easily be added without changing the application architecture.

---

# Target Users

Bedaya is intended for:

- first-time entrepreneurs
- rural UAE residents
- women operating home businesses
- students
- farmers
- livestock owners
- artisans
- food entrepreneurs
- tourism entrepreneurs
- freelancers

Although inspired by Al Qua'a, the workflow is designed so that it can support founders across the UAE.

---

# Project Objectives

Bedaya aims to help founders:

- discover realistic business opportunities
- understand why a business suits them
- identify their first customers
- estimate startup costs
- evaluate business readiness
- validate demand before investing
- calculate basic financial viability
- locate official government resources
- generate an actionable startup roadmap

---

# Solution Overview

Bedaya provides two user journeys.

---

## Journey 1 – I Already Have a Business Idea

The founder enters:

- business idea
- location
- skills
- target customer
- startup budget
- experience level
- biggest challenge

Bedaya generates:

- readiness score
- founder profile
- location-specific guidance
- startup checklist
- seven-day plan
- thirty-day roadmap
- financial estimates
- validation tracker
- official UAE resources
- downloadable PDF

---

## Journey 2 – Help Me Discover a Business Idea

The founder selects:

- skills
- startup budget
- available time
- preferred location

The recommendation engine evaluates available opportunities and ranks them according to suitability.

Each recommendation explains **why** it was selected instead of behaving like a black-box recommendation system.

---

# Key Features

## Opportunity Discovery

- Skill-based recommendations
- Explainable recommendation engine
- Business match score
- Confidence score
- Match breakdown
- Recommendation reasons

---

## Founder Planning

- Founder profile
- Business readiness assessment
- Startup checklist
- Seven-day launch plan
- Thirty-day roadmap

---

## Financial Planning

- Startup budget planner
- Revenue estimator
- Monthly profit estimation
- Break-even calculator
- Profit margin calculation
- Startup payback estimation

---

## Validation

- Customer validation tracker
- Launch recommendation
- Progress tracking
- Readiness improvement suggestions

---

## Location Intelligence

- GPS detection
- Manual community selection
- OpenStreetMap integration
- Community profiles
- Local strengths
- First customer suggestions
- Marketing channel suggestions

---

## Official Resources

- UAE Government Business Portal
- TAMM Abu Dhabi
- Business permit guidance
- Licensing research links

---

## Export

- PDF Startup Plan
- Printable roadmap
- Founder report

# System Architecture

Bedaya is built as a modular React application.

The user interface collects founder information and sends it to independent business engines responsible for recommendation, planning, readiness assessment, and location guidance.

```
                     User
                       │
                       ▼
                React User Interface
                       │
     ┌─────────────────┼─────────────────┐
     ▼                 ▼                 ▼
Recommendation     Readiness       Business Plan
Engine             Engine          Generator
     │                 │                 │
     └──────────────┬──┴──────────────┐
                    ▼                 ▼
          Location Intelligence   PDF Export
```

Each engine is independent, making the system easier to maintain and extend.

---

# Folder Structure

```
src
│
├── data
│     opportunities.js
│
├── engine
│     recommendation.js
│     readiness.js
│     businessPlans.js
│     locationInsights.js
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

# Recommendation Engine

The recommendation engine is responsible for matching founders with suitable business opportunities.

Instead of randomly suggesting ideas, each opportunity receives a calculated score.

The score considers:

- selected skills
- startup budget
- business difficulty
- market demand
- community suitability

The highest scoring opportunities are recommended to the founder.

---

## Explainable Recommendations

Every recommendation answers **"Why?"**

Instead of simply saying:

```
Home Bakery
```

Bedaya explains:

```
Opportunity Score
95/100

Confidence
High

Why Recommended

✔ Matches Cooking

✔ Matches Baking

✔ Fits selected budget

✔ Beginner friendly

✔ High demand

✔ Suitable for families
```

This makes the recommendation transparent and easy to understand.

---

## Business Match Breakdown

Each recommendation is broken into measurable components.

Example:

| Factor | Weight |
|---------|---------|
| Skill Match | ★★★★★ |
| Budget Fit | ★★★★☆ |
| Demand | ★★★★★ |
| Difficulty | ★★★★☆ |

This allows founders to understand which factors influenced the recommendation.

---

# Readiness Engine

Starting a business requires more than having an idea.

The readiness engine evaluates whether the founder is actually prepared to begin.

It considers:

- business idea
- target customer
- startup budget
- location
- experience
- available time
- selected skills
- challenge definition
- customer interviews
- marketing preparation

Each category contributes to the overall readiness score.

---

## Progress Tracking

The readiness score updates dynamically.

For example:

Before customer interviews

```
72/100
```

After completing customer interviews

```
77/100
```

After preparing marketing

```
82/100
```

This encourages founders to complete practical tasks before launching.

---

# Location Intelligence Engine

Bedaya does **not** claim to predict business demand using GPS.

Instead, location is used as **community context**.

The application supports:

- Al Qua'a
- Al Ain
- Abu Dhabi
- Other UAE Communities

Each community profile contains:

- local strengths
- common industries
- recommended first customers
- suitable marketing channels
- startup advice

Example:

## Al Qua'a

Strengths

- Camel farming
- Rural tourism
- Agriculture

Suggested First Customers

- Camel farm owners
- Tourists
- Local families

Marketing Channels

- WhatsApp
- Local markets
- Community events

This helps founders start in environments where they already understand local needs.

---

# Business Plan Generator

Once a founder selects an idea, Bedaya automatically generates:

- Business summary
- Founder profile
- Seven-day action plan
- Thirty-day roadmap
- Startup checklist
- Estimated startup costs
- Customer discovery questions
- Risk assessment
- Government resources
- PDF export

Every generated plan is customized using:

- selected business
- founder information
- community profile
- experience level
- target customer

---

# Customer Validation Engine

Many new businesses fail because founders assume demand exists.

Bedaya encourages evidence-based entrepreneurship.

The founder records feedback from five potential customers.

Each interview records:

- Interested (Yes/No)
- Comments
- Objections

The application automatically recommends:

- Proceed
- Improve
- Validate Further

This helps founders make decisions using customer evidence instead of assumptions.

---

# Financial Estimator

The financial estimator helps founders understand whether the business can become financially sustainable.

Inputs include:

- selling price
- variable cost
- monthly customers
- fixed monthly expenses
- startup investment

The application automatically calculates:

- Monthly revenue
- Variable costs
- Operating costs
- Monthly profit
- Break-even customers
- Profit margin
- Startup payback period

This allows founders to estimate basic financial viability before investing money.

---

# PDF Report Generator

After completing the planning process, Bedaya generates a downloadable PDF containing:

- founder information
- readiness score
- roadmap
- validation results
- financial estimates
- startup checklist
- official resources

The PDF can be shared, printed, or used as a personal startup action plan.

---

# Technology Stack

| Component | Technology |
|------------|------------|
| Frontend | React |
| Build Tool | Vite |
| Language | JavaScript |
| Styling | CSS |
| Maps | React Leaflet |
| Mapping Data | OpenStreetMap |
| PDF Export | jsPDF |
| Screenshot Rendering | html2canvas |

---

# Design Principles

Bedaya was designed around five principles.

1. Simplicity

The application should be usable by first-time founders without technical knowledge.

2. Explainability

Every recommendation explains why it was generated.

3. Evidence-Based Entrepreneurship

Founders are encouraged to validate ideas before investing.

4. Practicality

Every recommendation ends with an actionable next step.

5. Scalability

Community profiles and business datasets can be expanded without changing the application architecture.

# Testing, Validation and Evidence

Bedaya was tested using realistic founder scenarios covering the complete user journey from opportunity discovery to startup planning and PDF generation.

All major functionality demonstrated in this repository is shown in the accompanying demo video.

---

# Test Environment

| Item | Value |
|------|------|
| Application | Bedaya |
| Framework | React + Vite |
| Browser | Google Chrome |
| Operating System | Windows 11 |
| Mapping | OpenStreetMap + React Leaflet |
| PDF Generation | jsPDF |
| Screenshot Rendering | html2canvas |

---

# Test Scenario

A realistic founder profile was used throughout testing.

| Item | Value |
|------|------|
| Business Idea | Camel Milk Soap |
| Community | Al Qua'a |
| Skills | Livestock, Crafts |
| Budget | AED 1,500 |
| Experience | Beginner |
| Target Customer | Tourists and Local Families |
| Main Challenge | Finding first customers |

This scenario reflects the rural context of Al Qua'a and demonstrates how Bedaya supports first-time entrepreneurs.

---

# Functional Test Cases

| ID | Feature | Expected Behaviour | Result |
|----|----------|------------------|--------|
| TC01 | Landing Page | Application loads successfully | ✅ Pass |
| TC02 | Journey Selection | User chooses either founder journey | ✅ Pass |
| TC03 | Empty Skill Validation | User must select at least one skill before recommendations | ✅ Pass |
| TC04 | Opportunity Discovery | Suitable businesses are recommended | ✅ Pass |
| TC05 | Explainable Recommendation | Recommendation includes score, confidence and reasons | ✅ Pass |
| TC06 | Business Match Breakdown | Skill, budget, demand and difficulty are displayed | ✅ Pass |
| TC07 | Founder Form | Founder information is collected successfully | ✅ Pass |
| TC08 | Startup Plan Generation | Personalized startup plan is generated | ✅ Pass |
| TC09 | Readiness Engine | Readiness score updates correctly | ✅ Pass |
| TC10 | Location Engine | Community-specific guidance is displayed | ✅ Pass |
| TC11 | Seven-Day Plan | Personalized first-week roadmap generated | ✅ Pass |
| TC12 | Thirty-Day Roadmap | Startup milestones displayed | ✅ Pass |
| TC13 | Customer Validation | Recommendation changes according to interview results | ✅ Pass |
| TC14 | Budget Planner | Startup costs calculated correctly | ✅ Pass |
| TC15 | Revenue Estimator | Financial calculations update automatically | ✅ Pass |
| TC16 | Official Resources | Government resource links open correctly | ✅ Pass |
| TC17 | PDF Export | Startup report exported successfully | ✅ Pass |
| TC18 | Navigation | Back and Clear buttons function correctly | ✅ Pass |

---

# Financial Validation

The financial estimator was verified using the following values.

## Inputs

| Parameter | Value |
|-----------|------|
| Selling Price | AED 45 |
| Variable Cost | AED 18 |
| Monthly Customers | 60 |
| Fixed Monthly Expenses | AED 900 |
| Startup Investment | AED 5,000 |

### Expected Calculations

Monthly Revenue

```
45 × 60 = AED 2,700
```

Variable Cost

```
18 × 60 = AED 1,080
```

Operating Cost

```
1080 + 900 = AED 1,980
```

Monthly Profit

```
2700 − 1980 = AED 720
```

Profit Margin

```
720 / 2700 = 26.7%
```

Break-even Customers

```
900 ÷ (45 − 18)

≈ 34 customers
```

Payback Period

```
5000 ÷ 720

≈ 7 months
```

### Actual Result

The application produced the expected values.

**Status**

✅ Pass

---

# Customer Validation Example

The customer validation tracker was tested using five simulated interviews.

| Customer | Interested | Comment |
|-----------|------------|---------|
| Customer 1 | Yes | Useful local product |
| Customer 2 | Yes | Good tourist souvenir |
| Customer 3 | Yes | Would recommend |
| Customer 4 | No | Price slightly high |
| Customer 5 | Yes | Would purchase again |

Application Result

```
Interested Customers : 4

Not Interested : 1

Recommendation

Proceed
```

This demonstrates that launch recommendations are based on measurable customer feedback rather than assumptions.

---

# Testable Claims

Bedaya makes specific claims that can be verified.

| Claim | Verification Method | Evidence |
|--------|--------------------|----------|
| Different skills produce different recommendations | Select different skills and compare results | Demo Video |
| Different budgets change recommendation rankings | Repeat recommendations using different budgets | Demo Video |
| Readiness score updates dynamically | Complete progress tasks | Demo Video |
| Customer validation changes launch recommendation | Modify interview responses | Demo Video |
| Financial estimates respond to user inputs | Change prices and costs | Demo Video |
| Community selection changes guidance | Select Al Qua'a, Al Ain and Abu Dhabi | Demo Video |
| PDF export generates a complete startup report | Download generated report | Demo Video |

Every claim can be reproduced by following the verification steps below.

---

# How to Verify

## Flow 1 – Existing Business Idea

1. Open Bedaya.
2. Click **Get Started**.
3. Choose **I Already Have a Business Idea**.
4. Enter:

```
Business Idea:
Camel Milk Soap
```

5. Select:

```
Location:
Al Qua'a
```

6. Select Skills

- Livestock
- Crafts

7. Budget

```
AED 1,500
```

8. Experience

```
Beginner
```

9. Generate Startup Plan.

10. Verify:

- Readiness Score
- Founder Profile
- Seven-Day Plan
- Thirty-Day Roadmap
- Location Guidance
- Budget Planner
- Revenue Estimator
- Validation Tracker
- PDF Export

---

## Flow 2 – Opportunity Discovery

1. Choose

```
Help Me Discover a Business Idea
```

2. Select

- Livestock
- Crafts

3. Budget

```
AED 1,500
```

4. Location

```
Al Qua'a
```

5. Click

```
Find Business Opportunities
```

Verify that:

- Opportunity score appears.
- Confidence level appears.
- Match breakdown appears.
- Recommendation reasons appear.

---

# Data Transparency

Bedaya is a decision-support application.

The recommendation engine **does not claim to predict market demand**.

Instead it combines:

- founder skills
- startup budget
- business difficulty
- community profile
- location context
- curated opportunity dataset

Demand must be validated through customer interviews before investment.

---

# Evidence Included in Repository

The repository contains:

- Complete source code
- Complete README
- Demo video
- Testing and validation report
- Startup recommendation engine
- Financial estimator
- Customer validation workflow
- PDF export functionality

# Feasibility

Bedaya was intentionally designed as a lightweight web application so that it can be deployed in rural communities without requiring expensive infrastructure.

## Why it is feasible

- Runs entirely in a web browser
- No paid APIs are required
- Uses OpenStreetMap, an open-source mapping platform
- Can be deployed on GitHub Pages, Netlify or Vercel
- Uses a modular architecture that is easy to maintain
- Opportunity datasets can be updated without changing the application logic
- Community profiles can be expanded independently

The application is therefore practical for universities, entrepreneurship programs, incubators and community organizations.

---

# Scalability

Although Bedaya currently focuses on Al Qua'a, the architecture was designed so that additional communities can easily be added.

Future expansion may include:

- Additional UAE communities
- GCC community datasets
- Arabic language support
- AI-assisted business coaching
- User accounts
- Cloud storage
- Mentor matching
- Entrepreneurship incubator integration
- Government licensing API integration
- Local business directory integration

Because recommendation, readiness, planning and location are implemented as separate engines, each component can evolve independently.

---

# Future Improvements

The current prototype demonstrates the complete founder workflow.

Future versions may include:

- Arabic and English bilingual interface
- Personalized AI business coaching
- Business Model Canvas generation
- SWOT analysis generation
- Real licensing APIs
- Saved founder accounts
- Business progress dashboard
- Mentor matching
- Startup funding resources
- Community marketplace integration
- AI-powered customer interview analysis
- Real business registration guidance

---

# Repository Contents

```
README.md
src/
public/
package.json
vite.config.js
```

The repository includes:

- Complete React source code
- Recommendation engine
- Readiness engine
- Business planning engine
- Location intelligence engine
- Financial estimator
- Customer validation tracker
- PDF export functionality
- Demo video
- Complete documentation

---

# Installation

Clone the repository.

```bash
git clone <repository-url>
```

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

Open the local development URL shown by Vite.

Usually:

```
http://localhost:5173
```

---

# Demo Video

The repository includes a demonstration video showing the complete workflow.

The demonstration covers:

- Problem statement
- Community context
- Opportunity discovery
- Explainable recommendation engine
- Location intelligence
- Readiness assessment
- Customer validation
- Budget planner
- Revenue estimator
- Startup roadmap
- PDF export

The video demonstrates every feature used during testing.

---

# Repository Checklist

The repository contains everything required to understand and verify the project.

| Item | Status |
|-------|--------|
| Complete README | ✅ |
| Source Code | ✅ |
| React Project | ✅ |
| Recommendation Engine | ✅ |
| Readiness Engine | ✅ |
| Business Planning Engine | ✅ |
| Location Intelligence | ✅ |
| Financial Estimator | ✅ |
| Validation Tracker | ✅ |
| PDF Export | ✅ |
| Demo Video | ✅ |
| Testing & Validation | ✅ |

---

# Judging Criteria Mapping

| Judging Criterion | Where Addressed |
|-------------------|-----------------|
| Impact and Community Value | Project Overview, Community Context |
| Relevance to Challenge | Challenge Statement |
| Feasibility | Feasibility Section |
| Readiness | Working Application, Demo Video, Testing |
| Scalability | Scalability Section |
| Evidence | Testing & Validation |
| Repository Completeness | Complete README, Source Code, Demo Video |

---

# Limitations

The current version is a decision-support prototype.

It does **not**:

- predict future business success
- estimate live market demand
- replace professional legal or financial advice
- automatically register businesses

Instead, Bedaya helps first-time founders make informed, evidence-based decisions before investing time and money.

---

# Conclusion

Bedaya demonstrates how a lightweight, explainable decision-support application can lower the barrier for first-time entrepreneurs in rural communities.

Instead of providing generic advice, it guides founders through a structured journey:

1. Discover an opportunity.
2. Understand why it fits.
3. Evaluate readiness.
4. Validate customer demand.
5. Estimate financial viability.
6. Generate a practical startup roadmap.
7. Export a personalized action plan.

The application aligns directly with the goals of **Tatweer Hackathon 2026 – Challenge 1** by helping first-time founders move from an idea to a concrete first entrepreneurial action.

---

# Team

**Project:** Bedaya

**Hackathon:** Tatweer Hackathon 2026

**Challenge:** Challenge 1 – Taking the First Entrepreneurial Step

---

# License

This project was developed for submission to **Tatweer Hackathon 2026**.

It is intended for educational and demonstration purposes.