# Mahbub College Website — Static vs Supabase Architecture Specification

Based on our direct inspection of the [Mahbub College Figma Design](https://www.figma.com/design/XmsAOLmj4zTpgQDpLFh2xt/Mahbub-College-Final), all Supabase tables and storage folder names have been mapped 1:1 to the exact text in the Figma design.

---

## 1. High-Level Architecture

- **Frontend**: Next.js (App Router) + React + Tailwind CSS
- **Data Fetching Strategy**: Incremental Static Regeneration (ISR) with `revalidate = 60` for instantaneous CDN loading with background dynamic freshness
- **Backend & Database**: Supabase PostgreSQL
- **Media Storage**: Supabase Storage (`media` public bucket)
- **Admin Workflow**: Supabase Studio (manage all tables and view registrations directly with zero custom admin overhead)

---

## 2. Static Elements (Built in Next.js Code)

| Component / Section | Purpose & Content in Figma |
| :--- | :--- |
| **Site Navigation & Header** | Institution emblem/logo, nav links (*Home, History, Gallery, Leaders, News, Register*), responsive mobile menu. |
| **Hero Frame & Institutional Identity** | *"ESTABLISHED 1862"*, *"Honoring the past, celebrating the present, inspiring the future"* headline, core styling, CTA buttons. |
| **A Legacy of Excellence** (Vivekananda Section) | Dedicated memorial block honoring Swami Vivekananda's historic address on February 13, 1893 at Mahbub College before Chicago. |
| **Stat Badges / Metrics Bar** | 160+ Years of Heritage, Notable Alumni, Archival Collections. |
| **Legal & Policy Pages** | Static markdown/pages matching the Figma artboards: `Terms & Conditions`, `Privacy Policy`, `Data Security`, `Account Deletion Policy`. |
| **Alumni Registration & Contact UI** | Interactive form with client-side validation (Zod / React Hook Form), toast notifications, and submit handler to Supabase. |
| **Footer** | Address (Rashtrapati Road, Secunderabad, Telangana), contact phone, email, Google Maps link, social channels, copyright. |

---

## 3. Dynamic Elements (Stored in Supabase)

Table names and storage folders mapped directly to Figma section titles:

| Figma Section Title | Supabase Table Name | Supabase Storage Folder | Fields & Content |
| :--- | :--- | :--- | :--- |
| **"Former Students Who Made Us Proud"** | `former_students` | `media/former-students/` | `id`, `name`, `designation`, `batch_or_era`, `description`, `photo_url`, `display_order`, `is_active`, `created_at` |
| **"Our Heritage, Our Pride"** | `heritage` | `media/heritage/` | `id`, `title`, `year_or_era`, `caption`, `category`, `photo_url`, `display_order`, `is_active`, `created_at` |
| **"The People Who Built Our Legacy"** | `legacy_builders` | `media/legacy-builders/` | `id`, `name`, `title_role`, `period`, `description`, `photo_url`, `display_order`, `is_active`, `created_at` |
| **"The Leaders Who Shaped Our Institution"** | `leaders` | `media/leaders/` | `id`, `name`, `role`, `tenure_or_year`, `photo_url`, `display_order`, `is_active`, `created_at` |
| **"News and Updates"** | `news_and_updates` | `media/news-and-updates/` | `id`, `title`, `secondary_text`, `photo_url`, `published_date`, `external_link`, `display_order`, `is_active`, `created_at` |
| **"Gallery"** | `gallery` | `media/gallery/` | `id`, `title`, `caption`, `year_or_era`, `category`, `photo_url`, `display_order`, `is_active`, `created_at` |
| **"Reconnect. Relive. Support & Save."** (Registration) | `registrations` | *(N/A - Form Submissions)* | `id`, `full_name`, `email`, `phone`, `batch_year`, `profession`, `city`, `message`, `status`, `created_at` |

---

## 4. Next.js Route Structure

```
src/
├── app/
│   ├── layout.tsx             # Root layout with Header and Footer
│   ├── page.tsx               # Home page (Hero, Alumni, Heritage, Legacy, Leaders, News, Gallery, Form)
│   ├── gallery/
│   │   └── page.tsx           # Full Gallery artboard
│   ├── terms-and-conditions/
│   │   └── page.tsx           # Terms & Conditions artboard
│   ├── privacy-policy/
│   │   └── page.tsx           # Privacy Policy artboard
│   ├── data-security/
│   │   └── page.tsx           # Data Security artboard
│   ├── account-deletion/
│   │   └── page.tsx           # Account Deletion Policy artboard
│   └── api/
│       └── register/
│           └── route.ts       # Registration submission endpoint
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── VivekanandaSection.tsx
│   │   ├── FormerStudentsSection.tsx   # "Former Students Who Made Us Proud"
│   │   ├── HeritageSection.tsx         # "Our Heritage, Our Pride"
│   │   ├── LegacyBuildersSection.tsx   # "The People Who Built Our Legacy"
│   │   ├── LeadersSection.tsx          # "The Leaders Who Shaped Our Institution"
│   │   ├── NewsUpdatesSection.tsx      # "News and Updates"
│   │   ├── GalleryPreviewSection.tsx   # "Gallery"
│   │   └── RegistrationSection.tsx     # "Reconnect. Relive. Support & Save."
│   └── ui/
└── lib/
    ├── supabase.ts
    └── types.ts
```
