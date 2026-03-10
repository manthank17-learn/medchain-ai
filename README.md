<img width="100" height="100" alt="image" src="https://github.com/user-attachments/assets/2e64394d-a6b2-48a1-9774-20c4c2b6f6cd" />

## MedChain AI


> A secure, AI-powered digital health platform for managing and interacting with medical information.

**Status:** Prototyping (Active Development) &nbsp;|&nbsp; **Platform:** [medichainai.dev/login](https://medichainai.dev/login)

---

## Overview

MedChain AI is a digital health platform combining modern web technologies, blockchain-backed audit design, and AI systems to build a unified infrastructure for healthcare data management. The platform targets secure medical data access, intelligent record interaction, and AI-assisted clinical support across web and mobile.

---

## Goals

- Secure medical data access and storage
- AI-assisted medical information support
- Intelligent health record interaction
- Structured healthcare data management
- Patient–doctor digital interfaces

---

## AI Assistant

The core AI component will be built on models from **Sunbird AI**, specifically the **Sunflower model**.

**Capabilities:**
- Context-aware medical conversations
- Structured responses grounded in patient data
- Navigation and summarization of medical records and reports
- Patient education support
- Decision support tooling for healthcare professionals

The AI system will interface directly with platform-stored medical records while enforcing strict security and privacy constraints.

---

## Tech Direction

| Layer | Focus |
|---|---|
| Blockchain | Verifiable medical action trails and trust layer |
| AI/ML | Medical record understanding, structured + unstructured data |
| Backend | Secure API-based services, database connectivity |
| Infrastructure | Scalable cloud deployment |
| Frontend | Cross-platform web access |
| Mobile | Native Android application |

---

## Mobile Platform

A native **Android application** is in active development.

Features planned:
- Secure patient authentication
- AI chatbot interaction
- Medical record viewing
- Push notifications and alerts
- Mobile health data management

---

## Current Status

Core infrastructure — backend services, database connectivity, and AI integration pipelines — is under active construction. Features are being rolled out incrementally.

---

## Team Updates (PR-style)

Use this section to post short collaboration updates.

### 2026-03-07

- Added core project README structure for collaborators
- Clarified prototype status and blockchain direction
- Added Sunbird AI Sunflower local-model reference
- Fixed `.gitignore` rules for `.env` safety

---

## Next-Round Upgrade Checklist

This checklist is for the post-submission competition phase.

### Priority 1 — Demo Reliability (must-have)

- [ ] Lock one end-to-end patient demo flow (login → triage → result → doctor view)
- [ ] Prepare fixed seed/demo data so every run is predictable
- [ ] Add fallback behavior if AI service is unavailable
- [ ] Add clear error states on frontend for API/network failures

### Priority 2 — Security + Trust Story

- [ ] Keep PHI off-chain; store only hashed metadata on-chain
- [ ] Add auditable event logging for key record actions
- [ ] Add role-based route protection (patient/doctor/admin)
- [ ] Add basic input validation + rate limit protections on backend APIs

### Priority 3 — AI Quality (Sunbird Sunflower)

- [ ] Add structured triage output format (urgency, rationale, action)
- [ ] Add medical safety guardrails for emergency symptoms
- [ ] Log model version in responses for reproducibility
- [ ] Build 10 benchmark prompts for before/after scoring

### Priority 4 — Competition Presentation Pack

- [ ] Prepare “What changed since submission” slide (before vs after)
- [ ] Record a 2-minute updated product demo
- [ ] Add simple architecture diagram (web, API, AI, blockchain)
- [ ] Include 3 measurable improvements (latency, reliability, auditability)

### Suggested Ownership

- Product + demo script: Mariam
- Frontend auth/routes: Web team
- Backend validation + safety: API team
- Smart contract audit events: Blockchain team

---

## Roadmap

- [ ] AI-driven medical chat assistant
- [ ] Secure medical record storage
- [ ] Intelligent document processing
- [ ] Doctor–patient communication interfaces
- [ ] Android mobile application
- [ ] Advanced healthcare analytics

---

## Author

- TEAM VU

---

> **Note:** MedChain AI is an experimental, research-oriented project exploring the intersection of healthcare systems, artificial intelligence, and secure digital infrastructure.
