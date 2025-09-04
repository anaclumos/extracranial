---
lang: 'en'
slug: '/4F0B05'
---

인기투표상 (Side Track, People's Choice Award) 수상

내가 한 일

- 최초 아이디어, 이름 (Pagemate & Pagebase)
- 초기 개발 환경 구축 (Moonrepo, UV)
- AI (Vectorizing and Storing, CosSim Search, RAG in FastAPI BE)
- 프론트엔드 Tenant 웹사이트 구축
  - 퀴즈 시스템 구축
- 프론트엔드 SDK에서 컴포넌트 하이라이트 및 질답 시스템 구축
  - 생으로 구축 (AI SDK 없이 OpenAI SDK 만으로)
- AI 모델 프롬프트 튜닝

---

Drop-in SDK that helps users complete complex tasks with intelligent guidance and automation.

## Overview

Pagemate is a JavaScript SDK that product teams install on their websites to dramatically improve user task completion. When users ask "How do I...?", Pagemate either:

- **Guides** them step-by-step with visual highlights and tooltips
- **Automates** the task with explicit consent (Autopilot mode)

### Key Features

- **Smart Guidance** -- Conversational UI with live step highlighting
- **Autopilot Mode** -- Agent executes tasks automatically with granular permissions
- **RAG + Fine-tuning** -- Converts documentation into executable flows
- **Analytics** -- Track completion rates, deflections, and ROI
- **Enterprise Ready** -- Audit logs, versioning, and governance controls

### Target Markets

- **Claims-heavy insurers** -- Multi-step claim submissions
- **Fintech apps** -- KYC and account management flows
- **E-commerce** -- Returns and subscription management
- **B2B SaaS** -- Complex admin panel setups

## Tech Stack

- **Frontend** -- Next.js 15, TypeScript, TailwindCSS
- **Backend** -- Python with UV package manager
- **Build System** -- Moon (task orchestration)
- **Package Managers** -- Bun (frontend), UV (backend)
