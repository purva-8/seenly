# Seenly — Landing Page

Done-for-you web design studio. AI-built in days or custom-coded from scratch.

## Stack

- Plain HTML / CSS / JS — no framework, no build step
- Google Fonts: Inter, Plus Jakarta Sans, Caveat
- Calendly popup widget for bookings
- Dark mode via `localStorage` + `data-theme` on `<html>`

## Structure

```
seenly/
├── index.html       # Single-page site
├── css/
│   └── style.css    # All styles (CSS custom properties)
└── js/
    └── main.js      # Dark mode, nav, FAQ accordion, scroll animations
```

## Sections

| Section | ID |
|---|---|
| Hero | — |
| Who We Serve | `#niches` |
| Why Seenly | `#why` |
| Compare | `#compare` |
| Pricing | `#packages` |
| How It Works | `#how` |
| FAQ | `#faq` |
| CTA / Contact | `#contact` |

## Pricing

| Plan | Build mode | Price |
|---|---|---|
| Starter | AI-built | $599 one-time |
| Pro | Coded from scratch | $1,499 one-time |
| Enterprise | Bespoke | Custom |

Add-ons: Growth Bundle ($499) · Monthly Retainer ($149/mo)

## Calendly

All CTAs point to `https://calendly.com/purvahk08/15mins` via the Calendly popup widget.

## Brand colours

| Token | Value |
|---|---|
| `--teal` | `#0D6E6E` |
| `--teal-light` | `#14918E` |
| `--teal-bg` | `#E8F6F5` |
| `--dark` | `#111827` |

## Dev

Open `index.html` directly in a browser — no server required.
