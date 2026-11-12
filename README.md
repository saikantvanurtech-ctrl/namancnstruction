# Naman Construction Solutions – Website Re-creation

This repository is a complete, pixel-perfect, responsive re-creation of **Naman Construction Solutions** (target website: [https://namanconstructionsolutions.in/](https://namanconstructionsolutions.in/)).

It accurately mirrors the original architecture, styling, typography, color palette, animations, and content across all 16 pages.

---

## 📑 Complete 16+ Page Inventory

| # | Page Name | HTML File | Corresponding Original URL | Description |
|---|---|---|---|---|
| 1 | **Homepage** | [`index.html`](index.html) | `/` | Hero banner with pulse CTA, about section, 8-service grid, 8-member team roster, milestone counters, testimonials carousel, contact form & Google Maps footer |
| 2 | **About Us** | [`about.html`](about.html) (also `about-1.html`) | `/about-1/` | Corporate overview, "Turning House Dreams Into Reality", 8-member team roster, milestone counters, and reviews |
| 3 | **Our Services** | [`services.html`](services.html) (also `service.html`) | `/service/` | Master archive of all 8 core services with feature breakdowns, consultation CTA, counters, and reviews |
| 4 | **Building Construction** | [`building-construction.html`](building-construction.html) | `/building-construction/` | Detailed service page: Turnkey contracting, IS-certified standards, 4-stage workflow, all-services menu, and quick booking widget |
| 5 | **Removation (Renovation)** | [`renovation.html`](renovation.html) | `/renovation/` | Detailed service page: Structural repair, space reconfiguration, kitchen/bath remodeling, 4-stage workflow, and quick booking widget |
| 6 | **3D Plan** | [`3d-plan.html`](3d-plan.html) | `/3d-plan/` | Detailed service page: CAD modeling, isometric cutaways, daylight simulations, 4-stage workflow, and quick booking widget |
| 7 | **Elevation Design** | [`elevation-design.html`](elevation-design.html) | `/elevation-design/` | Detailed service page: Contemporary/classical facades, weather-resistant cladding, day/night lighting, and quick booking widget |
| 8 | **Estimatation (Estimation)**| [`estimation.html`](estimation.html) | `/estimation/` | Detailed service page: BOQ calculation, steel/cement quantification, cashflow scheduling, bank-loan ready reports, and quick booking widget |
| 9 | **Vaastu (Vastu)** | [`vaastu.html`](vaastu.html) | `/vaastu/` | Detailed service page: Vedic 16-zone energy mapping, Ishanya entrance, Agneya kitchen, non-destructive remedies, and quick booking widget |
| 10 | **Building Approval** | [`building-approval.html`](building-approval.html) | `/building-approval/` | Detailed service page: Municipal sanction plans in Odisha, ODA & NBC bylaws, structural stability certification, and quick booking widget |
| 11 | **Interior Design** | [`interior-design.html`](interior-design.html) | `/interior-design/` | Detailed service page: Modular kitchens, false ceilings, TV units, sliding wardrobes, and quick booking widget |
| 12 | **Gallery** | [`gallery.html`](gallery.html) | `/gallery/` | Interactive portfolio gallery with category filter tabs (Residential, Commercial, Elevation, 3D Plans) and fullscreen lightbox preview |
| 13 | **Projects** | [`projects.html`](projects.html) | `/projects/` | 3×3 grid of 9 project cards, each linking to its own detail page: `project-near-law-college`, `project-near-sridham-bargarh`, `project-plumber`, `project-steel-frame`, `project-project-engineer`, `project-estimator`, `project-superintendent`, `project-inspector`, `project-journeyman-electrician`. Full page captures live in `images/projects/pages/` |
| 14 | **Book Appointment** | [`book-appointment.html`](book-appointment.html) | `/book-appointment/` | Interactive 5-step wizard (Bookly-style): Service -> Date & Time Slot -> Client Details -> Summary Review -> Booking Confirmation with Reference ID |
| 15 | **Contact Us** | [`contact.html`](contact.html) (also `contact-1.html`) | `/contact-1/` | Contact details, office address in Bargarh, working hours, interactive inquiry form with validation, and embedded Google Map |
| 16 | **Our Team** | [`team.html`](team.html) (also `our-team.html`, `our-team-2.html`) | `/our-team-2/` | Dedicated leadership showcase featuring all 8 members and departmental teams |
| 17 | **FAQs** | [`faq.html`](faq.html) | `/faq/` | Interactive accordion answering questions on timelines, estimations, approvals, materials, and Vastu |
| 18 | **Privacy Policy** | [`privacy-policy.html`](privacy-policy.html) (also `privacy-policy-2.html`) | `/privacy-policy-2/` | Corporate privacy policy covering client data confidentiality and blueprint protection |

---

## 🎨 Visual Identity & Styling

- **Primary Colors:**
  - Navy Brand Blue: `#003B95`
  - Midnight Dark (Header topbar / Footer): `#0A1428` / `#0B1B3D`
  - Accent Gold / Roof Yellow: `#F5B800` / `#FFC107`
  - Dark Neutral / Headings: `#1A1A1A`
  - Body Text: `#555555`
  - Clean Background: `#FFFFFF` / `#F8F9FA`
- **Typography:**
  - Headings: `Rubik` (weights: 400, 500, 600, 700, 800)
  - Body & Secondary: `Heebo` (weights: 300, 400, 500, 700)
  - Accents: `Roboto`
- **Interactive Animations & Features:**
  - Sticky navigation bar with shadow transitions on scroll
  - Mobile responsive drawer with collapsible submenus
  - Real-time animated number count-up odometer for milestone stats (`214+`, `200+`, `28+`, `7+`)
  - Testimonial carousel with auto-play, pause-on-hover, previous/next controls, pagination indicators, and touch swipe
  - Filterable gallery with responsive masonry-like layout and full-screen lightbox modal
  - Multi-step Book Appointment wizard with live summary generation and unique Reference ID issuance
  - Floating Bit Assist support bubble in bottom right with quick WhatsApp and phone call triggers
  - Smooth scroll-to-top button
  - Ajax form submission handling with real-time feedback

---

## 🚀 How to Preview and Run

You can open any `.html` file directly in any modern browser:

### Option 1: Direct File Opening
Double-click `index.html` to open it directly in Chrome, Edge, Safari, or Firefox.

### Option 2: Local HTTP Server (Recommended)
Using Python:
```bash
python -m http.server 8000
```
Then navigate to:
```
http://localhost:8000
```

Using Node.js:
```bash
npx serve .
```
