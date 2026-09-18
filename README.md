# 🛡️ ReturnGuard AI

**Automated E-Commerce Returns Processing with AI-Powered Fraud Detection**

Built with Opus for the 2025 Hackathon

[⚙️ Live Opus Workflow](https://app.opus.com/app/workflow/share/fe873583-86d3-4d0c-9ba9-61cdd778928f) | [📊 Presentation](./presentation/)

---

## 📖 Overview

ReturnGuard AI automates e-commerce return processing using AI-powered fraud detection, reducing processing time from 15 minutes to 3 seconds while maintaining 100% audit traceability.

### Key Impact
- ⚡ **95% Faster**: 15 minutes → 3 seconds per return
- 🛡️ **$103B Problem**: Addresses returns fraud crisis ($103B annually, 15% of all returns)
- 📊 **100% Traceable**: Complete audit trail via Google Sheets
- 🤖 **AI-Powered**: Vision analysis catches claim-photo mismatches

---

## 🎯 The Problem

E-commerce returns face mounting challenges:
- **15+ minutes** per return request (manual data entry)
- **$103 billion** lost to fraud annually (15% of all returns are fraudulent)
- **Zero audit trail** - no decision history creates compliance risks
- **Inconsistent policy** - human error in enforcement

---

## 💡 Our Solution

Three intelligent decision paths powered by Opus AI workflows:

### 1. 🟢 Auto-Approve (Legitimate Returns)
- **Conditions**: Value < $75, severe damage confirmed, within 90-day window
- **Action**: Instant approval in 3 seconds
- **Result**: Maximum efficiency for legitimate claims

### 2. 🟡 Fraud Detection → Human Review
- **Conditions**: Claim-photo mismatch, high-value items, serial returners
- **Action**: Escalate to manager with evidence
- **Result**: Protect revenue while maintaining customer trust

### 3. 🔴 Auto-Reject (Policy Violations)
- **Conditions**: Purchase > 90 days old, clear policy non-compliance
- **Action**: Automatic rejection with policy citation
- **Result**: Consistent enforcement, zero human time wasted

---

## 🏗️ Workflow Architecture

**5-Step Process: Intake → Understand → Decide → Review → Deliver**

```
Customer Form → Email Parsing → AI Analysis → 3-Path Routing → Decision Logging
                                      ↓
                            [Auto-Approve | Human Review | Auto-Reject]
                                      ↓
                              Google Sheets Audit Trail
```

### Opus Nodes Utilized
- 🤖 **AI Agent Nodes**: Email extraction, photo vision analysis, fraud pattern detection
- ⚙️ **Decision Nodes**: Three-path conditional routing, policy compliance checks
- 👤 **Human Review**: Manager escalation workflow for fraud cases
- 🐍 **Python Code**: Mock order API lookup, data transformation
- 📊 **Export Data**: Google Sheets real-time audit logging

---

## 🧪 Test Cases

### Case 1: Broken Ceramic Mug ✅
**Location**: `/cases/case_01/`
- **Order**: ORD-2025-001 ($35, 15 days old)
- **Claim**: "Arrived completely shattered"
- **Photo**: Shattered ceramic pieces
- **AI Analysis**: SEVERE damage detected
- **Result**: ✅ AUTO-APPROVED (3 seconds)

### Case 2: Fraud Detection - Headphones ⚠️
**Location**: `/cases/case_02/`
- **Order**: ORD-2025-006 ($199, 27 days old)
- **Claim**: "COMPLETELY DESTROYED"
- **Photo**: Minor cosmetic scratch only
- **AI Detection**: Significant claim-photo mismatch
- **Result**: ⚠️ HUMAN REVIEW → Manager REJECTED

### Case 3: Policy Violation - Water Bottle ❌
**Location**: `/cases/case_03/`
- **Order**: ORD-2025-011 ($25, 128 days old)
- **Policy**: 90-day return window
- **Result**: ❌ AUTO-REJECTED (policy violation, no human review needed)

---

## 🚀 Quick Start

### Prerequisites
- Opus account ([workflow.opus.com](https://workflow.opus.com))
- Google account (for Sheets export)

### Try It Yourself

1. **Access the Workflow**
   - Open: [ReturnGuard AI Workflow](https://app.opus.com/app/workflow/share/fe873583-86d3-4d0c-9ba9-61cdd778928f)
   - Click "Import to My Workspace"

2. **Configure Google Sheets**
   - Create new spreadsheet: "Returns Dashboard"
   - Add tab: "Returns Log"
   - Connect in Opus Export Data node

3. **Run Test Cases**
   - Use emails from `/cases/case_01/`, `/cases/case_02/`, `/cases/case_03/`
   - Upload corresponding product photos
   - Watch the three-path decision logic in action

4. **Try the Customer Form**
   - Open `index.html` in browser
   - Experience the customer-facing interface
   - See how returns are submitted

---

## 📂 Repository Structure

```
ReturnGuard - AI Genesis/
├── cases/                      # Test data for all 3 scenarios
│   ├── case_01/               # Broken mug (auto-approve)
│   │   ├── case_01_broken_mug.png
│   │   └── case_01_email.txt
│   ├── case_02/               # Fraud headphones (human review)
│   │   ├── case_02_headphones_scratch.jpg
│   │   └── case_02_email.txt
│   └── case_03/               # Old water bottle (auto-reject)
│       ├── case_3_water_bottle.jpg
│       └── case_03_email.txt
├── presentation/              # Slide deck
├── index.html                 # Customer return form
└── README.md                  # This file
```

---

## 📊 Business Impact

| Metric | Result | Notes |
|--------|--------|-------|
| **Processing Speed** | 95% faster | 15 minutes → 15 seconds |
| **Annual Savings** | $50,000+ | At 1,000 returns/month |
| **Fraud Detection** | 15% of returns | Catches claim-photo mismatches |
| **Audit Compliance** | 100% | Every decision logged & traceable |

*Estimates based on 1,000 monthly returns at industry-standard processing costs and fraud rates*

---

## 🛠️ Technology Stack

- **Workflow Engine**: Opus (AI-native workflow automation)
- **AI Vision**: Claude Opus 4 (product photo damage analysis)
- **Data Export**: Google Sheets API (audit logging)
- **Frontend**: HTML/CSS (customer-facing form)
- **Backend Logic**: Python (mock order database, data transformation)

---

## 🔮 Production Roadmap

### Current Demo Status ✅
- ✅ Core decision logic operational
- ✅ AI fraud detection functional
- ✅ Human review workflow complete
- ✅ Google Sheets audit logging active
- ✅ Mock API demonstrates integration pattern

## Production Enhancements
The following production-grade features are in the roadmap:
- Error Handling & Resilience:
- Order lookup timeout handling
- Photo analysis quality thresholds
- Google Sheets export retry logic
- Network failure recovery
- Input validation and sanitization


---

## 🎥 Demo

**Explore the workflow**: [Open in Opus](https://app.opus.com/app/workflow/share/fe873583-86d3-4d0c-9ba9-61cdd778928f)

---

## 🙏 Acknowledgments

Built for the **Opus Hackathon 2025**

Special thanks to the Opus team for creating an incredible AI-native workflow platform that makes building intelligent automation accessible and powerful.

---

<div align="center">

**ReturnGuard AI** - Transforming returns from cost center to competitive advantage

⚡ Built with [Opus](https://opus.com) | 🤖 Powered by AI | 🛡️ Secure & Compliant

</div>

---

**Ready to see it in action?** [Import the workflow](https://app.opus.com/app/workflow/share/fe873583-86d3-4d0c-9ba9-61cdd778928f) and try the test cases!