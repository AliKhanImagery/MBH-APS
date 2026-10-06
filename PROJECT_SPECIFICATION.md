# APS — PROCESS AND AUTOMATION SYSTEMS
## Master Visual Design System & Production Specification (v1.0)
**Client:** APS – Process and Automation Systems  
**Format:** Enterprise Single-Page Brochure (Long-Scroll)  
**Reference Site:** Studiova (`studiova-nuxt.netlify.app`)  
**Status:** Approved for Build  
**Prepared by:** Antigravity UI/UX & Engineering Team  

---

## 01. Executive Summary & Design Philosophy
This project translates the avant-garde visual architecture of the **Studiova** reference site into the industrial, authoritative brand context of **APS**.

### The 3 Governing Master Principles
1. **Breathing Space is the Luxury Signal**: Industrial sites are notoriously cramped. APS commands authority through generous vertical rhythm (160px hero, 96px standard padding), strictly governed line lengths (max 65 characters), and expansive whitespace.
2. **Navy Dominates. Gold is Reserved**: `--aps-navy` (`#0D1E3D`) is the authoritative canvas. `--aps-gold` (`#B8962E`) is exclusively an accent signal (max 1–2 per viewport: active states, 1px rule lines, category badges, and primary CTA buttons). Gold is never used as a container fill.
3. **Negative Letter-Spacing is the Typographic Signature**: Display headings are tightly tracked (down to `-2px` on H1) to convey engineered mass and density. Small labels track outward (`+0.08em`) for legibility.

---

## 02. Color Token System

```css
:root {
  /* Primary Brand Tokens */
  --aps-navy: #0D1E3D;        /* Dominant dark surface (221°, 65%, 15%) */
  --aps-navy-tint: #132448;   /* Center hero panel subtle shift */
  --aps-gold: #B8962E;        /* Reserved signal accent (43°, 60%, 45%) */
  --aps-gold-hover: #A8882A;  /* Desaturated hover state */
  --aps-inox-white: #F5F5F3;  /* Brushed-steel light surface (60°, 4%, 96%) */
  --aps-charcoal: #1C2331;    /* Primary text on light surfaces (222°, 27%, 15%) */
  --aps-steel: #8A8E96;       /* Supporting copy & metadata (224°, 5%, 56%) */

  /* Functional Transparencies */
  --aps-gold-12: rgba(184, 150, 46, 0.12);
  --aps-gold-15: rgba(184, 150, 46, 0.15);
  --aps-gold-30: rgba(184, 150, 46, 0.30);
  --aps-navy-08: rgba(13, 30, 61, 0.08);
  --aps-navy-15: rgba(13, 30, 61, 0.15);
  --aps-navy-20: rgba(13, 30, 61, 0.20);
  --aps-inox-75: rgba(245, 245, 243, 0.75);
  --aps-inox-40: rgba(245, 245, 243, 0.40);
  --aps-inox-08: rgba(245, 245, 243, 0.08);
  --aps-inox-04: rgba(245, 245, 243, 0.04);
}
```

### Dark vs. Light Section Color Assignments
* **Dark Sections (`--aps-navy`)**:
  - Background: `#0D1E3D`
  - Headings (H1/H2/H3): `--aps-inox-white` (`#F5F5F3`)
  - Body: `rgba(245, 245, 243, 0.75)`
  - Number Badges: `--aps-gold` (`#B8962E`)
  - Pill Badges: Background `rgba(184, 150, 46, 0.12)`, Text `--aps-gold`
  - Rule Lines: `--aps-gold` at 30% opacity
* **Light Sections (`--aps-inox-white`)**:
  - Background: `#F5F5F3` (Never pure `#FFFFFF`)
  - Headings (H2/H3): `--aps-navy` (`#0D1E3D`)
  - Body: `--aps-charcoal` (`#1C2331`)
  - Number Badges: `--aps-navy`
  - Pill Badges: Background `rgba(13, 30, 61, 0.08)`, Text `--aps-navy`
  - Rule Lines: `--aps-navy` at 20% opacity
  - Cards on Light: `#FFFFFF` (Pure white card against Inox surface for depth)

---

## 03. Typography Architecture (Google Fonts: Manrope)
Single-family geometric system: `Manrope` (Weights: `400`, `500`, `700`, `800`).

### Complete Type Scale & Tracking Rules
* **The Rule**: *Large text tracks inward. Small text tracks outward.*

| Element | Size | Line Height | Weight | Tracking | Usage & Responsiveness |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display / H1** | `128px` | `128px` (1.0) | `700` | `-2px` | Hero headline only (1 per page). Scales: `72px` tablet, `40px` mobile. |
| **Section H2** | `48px` | `60px` (1.25) | `700` | `-0.4px` | Section primary headers. Scales: `36px` tablet, `28px` mobile. |
| **Statement H3** | `60px` | `90px` (1.5) | `700` | `0px` | Pull-quotes and key stat figures. Scales: `40px` tablet, `30px` mobile. |
| **Subheading H4** | `28px` | `36px` (1.28) | `700` | `+0.2px` | Card headers, feature titles. |
| **Nav / Label H5** | `18px` | `28px` (1.55) | `400` / `500` | `0px` | Navigation items, card eyebrows. |
| **Body Paragraph** | `18px` | `28px` (1.55) | `400` | `0px` | Section lead-in copy. Max line length: 65 characters (~540px). |
| **Card / Base Body** | `16px` | `24px` (1.5) | `400` | `0px` | Internal card text, fine print, metadata. |
| **Pill / Badge** | `13px` | `20px` | `700` | `+0.08em` | Uppercase category tag above H2 headers. |

---

## 04. Spacing System (Strict 4px Base Grid)

```css
:root {
  --space-1: 4px;    /* Micro adjustments */
  --space-2: 8px;    /* Tight internal gap */
  --space-3: 12px;   /* Pill horizontal inner unit */
  --space-4: 16px;   /* Base element gap */
  --space-5: 20px;   /* Nav vertical padding */
  --space-6: 24px;   /* Component gap, H2 to body gap */
  --space-8: 32px;   /* Card padding */
  --space-10: 40px;  /* Body to content gap, container gutters */
  --space-12: 48px;  /* Circle button diameter */
  --space-16: 64px;  /* Mobile section padding, tight section rhythm */
  --space-20: 80px;  /* Tablet section padding, footer padding */
  --space-24: 96px;  /* Desktop section vertical padding */
  --space-32: 128px; /* Extra breathing sections */
  --space-40: 160px; /* Hero top/bottom breathing */
}
```

### Layout Constraints
- **Container Max-Width**: `1280px` centered (`margin: 0 auto;`).
- **Container Gutters**: `40px` desktop, `24px` tablet, `16px` mobile.
- **Section Transitions**: Hard-edge stacked (no gradients, no overlapping parallax).

---

## 05. Component Specifications

### 05.1 Navigation Bar
- **Height**: `104px`
- **Default State**: Transparent over Hero.
- **Scrolled State**: Transitions smoothly (`0.3s ease`) to `--aps-navy` with subtle 1px bottom border at `60px` scroll depth.
- **Logo**: Precision geometric APS typographic monogram with gold accent.
- **Links**: `16px`, `Manrope 500`, `--aps-inox-white`, hover to `--aps-gold`.
- **CTA**: Right-aligned Gold Pill Button (`Request Quote`).

### 05.2 Buttons
- **Primary CTA (Gold Pill)**:
  - Background: `--aps-gold`
  - Text: `--aps-charcoal`, `Manrope 700`, `15px`
  - Padding: `16px 32px`, `border-radius: 999px`
  - Hover: Background desaturated 10% (`#A8882A`), active: `scale(0.98)`
- **Secondary CTA (Outline Pill)**:
  - Background: `transparent`
  - Border: `1.5px solid --aps-gold`
  - Text: `--aps-gold`, `Manrope 700`, `15px`
  - Padding: `15px 31px`, `border-radius: 999px`
  - Hover: Background `rgba(184, 150, 46, 0.08)`
- **Icon Circle Button**:
  - `48px × 48px`, `border-radius: 50%`
  - Border: `1px solid rgba(245,245,243,0.15)` on dark, `rgba(13,30,61,0.12)` on light.
  - Hover: Background `rgba(184,150,46,0.15)`, Border `--aps-gold`.

### 05.3 Cards & Containers
- **Dark Section Cards**: `background: rgba(245,245,243,0.04)`, `border: 1px solid rgba(245,245,243,0.08)`, `border-radius: 12px`, `padding: 32px`.
- **Light Section Cards**: `background: #FFFFFF`, `border: 1px solid rgba(13,30,61,0.08)`, `border-radius: 12px`, `padding: 32px`.
- **Hover State**: Border shifts to `rgba(184,150,46,0.25)` with subtle `0.25s` ease lift.

---

## 06. Complete Page Layout & Approved Content Blueprint

### 0. Header (Sticky 104px)
- **Brand**: `APS` | Process & Automation Systems
- **Nav Items**: Process Systems | Machines & Spares | OEM Sourcing | Contact
- **Action**: Gold Pill — `Request Quote`

---

### Above-The-Fold: 3-Panel Brochure Triptych (100vh)
*Desktop: 3 edge-to-edge columns divided by 1px subtle gold lines. Mobile: stacked (min 480px).*

#### Panel 1 — Brand Hero (Left | Navy `#0D1E3D`)
- **Headline (H1)**: `Precision Systems. Reliable Supply.` (128px, `-2px` tracking)
- **Divider**: 1px Gold rule line (`30% opacity`).
- **Body**: `Industrial automation and process solutions, sourced directly from verified OEM partners.`
- **CTA**: Primary Gold Pill — `Learn More ↓`

#### Panel 2 — Process & Automation Systems (Center | Tone Navy `#132448`)
- **Badge**: `01`
- **Pill**: `PROCESS & AUTOMATION`
- **Heading (H2)**: `End-to-End Process Automation` (48px, `-0.4px` tracking)
- **Body**: `Field instrumentation, control systems, and automation hardware — engineered and delivered to specification.`
- **CTA**: Outline Pill — `Explore Systems →`

#### Panel 3 — Machines & Spares (Right | Navy `#0D1E3D`)
- **Badge**: `02`
- **Pill**: `MACHINES & SPARES`
- **Heading (H2)**: `OEM Machinery and Spare Parts` (48px, `-0.4px` tracking)
- **Body**: `Genuine machinery and authentic replacement parts, maintaining plant continuity and uptime.`
- **CTA**: Outline Pill — `Explore Spares →`

---

### Section 01 — OEM Direct (Light | Inox White `#F5F5F3`)
- **Badge**: `01` (Navy)
- **Pill**: `OEM DIRECT`
- **Heading (H2)**: `Quality at the Source`
- **Body**: `APS sources directly through manufacturer-authorised channels, ensuring absolute traceability, technical compliance, and supply continuity for mission-critical operations.`
- **3 Provenance Metrics (Studiova Architectural Grid)**:
  1. **100% Genuine Provenance** — Sourced exclusively through verified manufacturer channels.
  2. **Specification Compliance** — Every item cross-referenced against exact engineering datasheets.
  3. **Guaranteed Traceability** — Full documentation and certificates of conformity provided.

---

### Section 02 — Process and Automation Systems (Dark | Navy `#0D1E3D`)
- **Badge**: `02` (Gold)
- **Pill**: `WHAT WE SUPPLY`
- **Heading (H2)**: `Process and Automation Systems`
- **Body**: `We deliver instrumentation, control architectures, and process packages across the energy, utility, and heavy manufacturing sectors.`
- **3 Service Cards (32px padding, 12px radius, gold geometric icon)**:
  1. **Field Instrumentation** — Pressure, flow, temperature, and level transmitters engineered for demanding operating envelopes.
  2. **Control Systems** — Industrial PLCs, DCS modules, and SCADA-ready hardware configured to project specifications.
  3. **Process Equipment** — Actuated valves, precision manifolds, and skids supplied as standalone units or turnkey assemblies.

---

### Section 03 — Machines & Spares (Light | Inox White `#F5F5F3`)
- **Badge**: `03` (Navy)
- **Pill**: `MACHINES & SPARES`
- **Heading (H2)**: `Machinery and Spare Parts Supply`
- **Body**: `We maintain dedicated supply channels for heavy equipment and verified spare parts, reducing operational downtime and lead times.`
- **3 Service Cards (Pure White cards on Inox surface)**:
  1. **OEM Machinery** — Heavy industrial equipment delivered through authorized distribution channels.
  2. **Genuine Spare Parts** — Factory-original components verified against OEM serial numbers to guarantee fit and lifespan.
  3. **Consolidated Procurement** — Single-source management for complex multi-line bill of materials and scheduled shutdowns.

---

### Section 04 — Enterprise Contact & RFQ (Dark | Navy `#0D1E3D`)
- **Badge**: `04` (Gold)
- **Pill**: `GET IN TOUCH`
- **Heading (H2)**: `Speak to Our Team`
- **Body**: `For technical enquiries, direct part lookups, or project procurement requirements, connect with our engineering desk.`
- **Dual Column Architecture (7/12 & 5/12 Split)**:
  - **Left (7 cols)**: Minimalist RFQ Enquiry Form (Single-line inputs, clean underline borders, Gold Pill `Submit Enquiry` button).
  - **Right (5 cols)**: Verified corporate coordinates:
    - **Entity**: `APS – Process and Automation Systems`
    - **Sales & Procurement Desk**: `sales@apsinox.com`
    - **Direct Line**: `+971 553 606698`
    - **Engineering Hub**: `Ajman, Dubai, United Arab Emirates`
    - **Service Level**: `Direct response within 24 hours on all RFQs`

---

### 05. Architectural Footer (Dark | Navy `#0D1E3D`)
- **Major Statement**: `Precision systems. Engineered for operational continuity.`
- **Columns**: Quick Links, Legal & Compliance, Back-to-Top circular button.

---

## 07. Animation & Interaction Specifications
- **Interactive State Transitions**: `0.2s, ease`
- **Card Hover Transitions**: `0.25s, ease` (No spring, bounce, or elastic easing).
- **Scroll Entrances**:
  - `transform: translateY(24px) -> translateY(0)`
  - `opacity: 0 -> 1`
  - `duration: 0.5s`, `ease-out`
  - Staggered `80ms` between Badge → Pill → Heading → Body → CTA.
- **Navbar Scroll Transition**: `transparent -> #0D1E3D` triggered at `60px` scroll (`0.3s ease`).

---

## 08. Strict Prohibitions ("What This Site Is NOT")
- ❌ No pure black (`#000000`) or pure white (`#FFFFFF`) section backgrounds.
- ❌ No gradients (except subtle ≤15% photo overlay).
- ❌ No text drop shadows or card glassmorphism blur filters.
- ❌ No animated counters (numbers ticking up).
- ❌ No video backgrounds.
- ❌ No generic stock photography (people in hard hats, handshakes, blue holograms).
- ❌ No non-pill CTA buttons.
- ❌ No font size below `13px`.

---

## 09. Implementation Staging Checklist
- [x] Manrope Google Font embedded (400, 500, 700, 800)
- [x] Exact negative tracking applied: H1 (`-2px`), H2 (`-0.4px`), Pill (`+0.08em`)
- [x] 4px grid audited across all margins and padding
- [x] Gold usage strictly capped (maximum 2 instances per viewport)
- [x] 100vh 3-panel Triptych responsive collapse on tablet/mobile verified
- [x] RFQ interactive validation and feedback working cleanly
