# Osteon — 206 Bones NFT PRD

## Original Problem Statement
Responsive dark futuristic Web3 site for Osteon (NFT project inspired by 206 human bones): landing hero, project concept, task section (Twitter + wallet), qualification test (10 quiz x 5pts + 5 bone-guess x 10pts = 100, pass ≥70), wallet-based identity, score tracking, attempt rules, referral system granting extra attempts, leaderboard, admin panel.

## User Choices
- Wallet-based identity (paste EVM address + twitter)
- Self-declared Twitter tasks (no points)
- 1 attempt + 1 per referral, 24h cooldown
- Admin login via env credentials
- Style: catchy, cyberpunk anatomical

## Architecture
- Backend: FastAPI + MongoDB (motor). 15 questions seeded on startup.
- Frontend: React 19, react-router, shadcn/ui, Tailwind, sonner toasts. Rajdhani + Outfit + JetBrains Mono fonts.
- State: React Context + localStorage (wallet).
- Design system: cyan #00f0ff + emerald #00ff66 accents on void #07080c, clip-path terminal cuts, cyber corners, grid bg.

## Implemented (Feb 2026)
- Landing hero with 206 visual, live stats
- Bento concept grid (Axial/Appendicular/Rarity/DNA)
- Tasks with self-declared Twitter checkboxes
- Full Qualification Test flow with prev/next, progress, result screen (WL / not qualified)
- Referral link + copy + tweet
- Live leaderboard sorted by refs then score
- Admin panel at /admin (login, user table, question CRUD, CSV export)

## Test Credentials
See /app/memory/test_credentials.md

## Backlog (P1)
- Real anatomical bone diagrams for bone-guess questions
- Referral qualification gating (only count referrals who scored ≥30)
- Wallet signature verification for anti-cheat
- NFT mint integration (Solana / EVM)
- Email/Discord notifications on WL

## Backlog (P2)
- Real Twitter API verification for tasks
- MetaMask connect button
- Advanced admin analytics (attempt heatmap, funnel)
