# AGENTS.md

## Scope

These instructions apply to the entire repository.

## Product

This is Inam Ul Haq's personal portfolio and a working demonstration of
production-minded DevOps, cloud infrastructure, automation, and software
engineering.

The experience should help hiring managers, engineering leads, collaborators,
and clients understand:

- who Inam is;
- which systems he has built or operated;
- how he approaches delivery, infrastructure, reliability, and automation;
- what practical value he can provide;
- where to find deeper proof or contact him.

Read `PRODUCT.md` before making product, content, information-architecture, or
visual decisions.

## Creative Direction

The creative north star is an immersive operations observatory: a portfolio
that behaves like a production control plane.

Preserve the strongest parts of the directions explored previously:

- terminal clarity and recruiter-friendly hierarchy;
- a restrained Matrix atmosphere;
- cloud control-room architecture and system mapping;
- scroll-driven 3D artifacts that explain delivery lifecycles;
- cinematic depth without becoming a generic neon dashboard.

The visual world is a tactile near-black field with restrained green/cyan
signals, editorial white type, monospace operational detail, subtle grain, and
sparse controls. Matrix green is a signal color, not a background fill to use
everywhere.

The intended narrative is:

`identity -> terminal handshake -> systems -> lifecycle -> field record -> contact`

Use motion to explain sequence, state, architecture, and cause-and-effect. Do
not add spinning objects or animation that exists only as decoration. Prefer
one excellent, legible artifact over many competing effects.

## Sources of Truth

- `PRODUCT.md`: product purpose, audience, positioning, constraints, and
  evidence policy.
- `src/`: active application code.
- `src/components/artifacts/devops-infinity/`: the current scroll-controlled 3D
  lifecycle artifact.
- `src_legacy/`: evidence for project, experience, education, diagram, contact,
  and social content. Treat it as reference material, not active application
  code.
- `public/InamUlHaq_CV.pdf`: CV evidence.
- `README.md`: development, infrastructure, deployment, and monitoring
  overview.

Do not invent employers, qualifications, project claims, testimonials,
customer logos, performance numbers, or business outcomes. Every professional
claim must be traceable to repository evidence.

## Stack and Structure

- React 19 and TypeScript
- Vite 6
- Tailwind CSS 3 plus the authored styles in `src/index.css`
- Framer Motion
- Three.js
- npm

Important paths:

- `src/App.tsx`: page composition and narrative order
- `src/components/`: active UI sections and interactions
- `src/components/artifacts/`: expensive or immersive visual artifacts
- `src/motion.ts`: shared motion tokens
- `src/index.css`: global tokens, responsive behavior, and component styling
- `public/`: static assets
- `docker/`, `docker-compose.yml`: container/runtime configuration
- `terraform/`, `ansible/`, `monitoring/`, `.github/workflows/`: deployment and
  operations infrastructure

Do not edit generated `dist/` output or dependencies in `node_modules/`.
Do not modify `src_legacy/` unless the task explicitly concerns legacy code.
Keep unrelated infrastructure changes out of frontend work.

## Implementation Rules

- Use TypeScript with explicit component and data types. Do not introduce
  `any`.
- Follow the existing functional-component and named-export style.
- Keep data separate from presentation when content is reused or substantial.
- Reuse existing CSS variables and `motionTokens`; avoid scattering new magic
  colors, durations, and easing curves through components.
- Preserve the current section story unless a requested product change
  justifies restructuring it.
- Keep components focused. Place a substantial artifact in its own directory
  with its scene, data, and section shell separated.
- Lazy-load heavy Three.js experiences and retain an inexpensive fallback.
  Reuse `ArtifactBoundary` for below-the-fold artifacts.
- Clean up animation frames, event listeners, observers, and WebGL resources.
- Avoid adding dependencies when the existing stack can solve the problem.
- Keep new interactive controls semantic and keyboard operable.

## Motion and 3D

- Scroll-driven behavior must work both forward and backward.
- Phase navigation must remain usable without precise scrolling.
- Respect `prefers-reduced-motion` in JavaScript and CSS. Reduced-motion users
  must still receive the complete information and a coherent state.
- Avoid continuous React state updates on every scroll frame. Prefer motion
  values or refs for high-frequency progress and update React state only when a
  meaningful phase changes.
- Keep canvas work lazy, bounded, and responsive. Do not allow a WebGL failure
  to remove the surrounding content.
- Animation timing should use `src/motion.ts` unless a scene has a documented
  technical reason to differ.
- Preserve readable copy above visual effects at every viewport.

## Design and Accessibility

- Maintain visible focus states, semantic landmarks, useful headings, and
  accessible names for icon-only controls.
- Decorative canvases and visual noise should be hidden from assistive
  technology. Meaningful interactive phases need equivalent textual content.
- Maintain a minimum supported viewport width of 320px.
- Do not introduce horizontal page overflow.
- Keep touch targets practical on mobile and do not make hover the only way to
  access information.
- Preserve strong contrast and legibility over atmospheric backgrounds.
- If a custom cursor is introduced again, enable it only on fine-pointer
  devices and never remove the native cursor for touch or accessibility users.

## Content and Encoding

- Position Inam consistently as a DevOps/cloud/automation engineer; do not
  regress metadata or copy to generic "full-stack developer" positioning.
- Describe tools through systems, decisions, and outcomes rather than isolated
  skill inventories.
- Preserve the Japanese/kana characters used intentionally by Matrix-rain
  effects.
- Treat broken encoding around copyright symbols, dashes, arrows, and check
  marks in ordinary visible copy as mojibake to fix, not as part of the visual
  language.
- Keep links, contact details, dates, project descriptions, and CV references
  consistent with repository evidence.

## Verification

For application changes, run:

```bash
npm run lint
npm run build
```

For meaningful visual or interaction changes, also verify in a real browser:

- desktop around 1440px wide;
- mobile around 390px wide;
- narrow mobile at 320px wide;
- no horizontal overflow;
- keyboard navigation and visible focus;
- reduced-motion behavior;
- forward and reverse scroll state;
- nonblank canvas rendering and a graceful artifact fallback.

Do not report a check as passing unless it was actually run. If a check cannot
run because of the environment, state that explicitly.

## Change Discipline

- Preserve user changes and avoid unrelated rewrites.
- Prefer the smallest cohesive change that satisfies the request.
- Update `README.md` or `PRODUCT.md` when a change materially alters setup,
  architecture, product behavior, or evidence.
- Never commit secrets, generated credentials, private keys, or local
  environment files.
- Treat deployment, DNS, certificate, and infrastructure edits as
  production-sensitive. Inspect the relevant configuration and explain the
  operational impact before changing it.
