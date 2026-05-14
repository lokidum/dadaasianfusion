---
name: Dada Restaurant Design System
colors:
  surface: '#fcf8f7'
  surface-dim: '#ddd9d8'
  surface-bright: '#fcf8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f2'
  surface-container: '#f1edec'
  surface-container-high: '#ebe7e6'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#454743'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#767873'
  outline-variant: '#c6c7c1'
  surface-tint: '#5e5e5c'
  primary: '#5e5e5c'
  on-primary: '#ffffff'
  primary-container: '#ebe9e6'
  on-primary-container: '#696966'
  inverse-primary: '#c8c6c3'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2e2e2'
  on-secondary-container: '#646464'
  tertiary: '#615d5e'
  on-tertiary: '#ffffff'
  tertiary-container: '#efe8e8'
  on-tertiary-container: '#6c6868'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4e2df'
  primary-fixed-dim: '#c8c6c3'
  on-primary-fixed: '#1b1c1a'
  on-primary-fixed-variant: '#474745'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1b1b1b'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#e8e1e1'
  tertiary-fixed-dim: '#cbc5c5'
  on-tertiary-fixed: '#1d1b1b'
  on-tertiary-fixed-variant: '#494646'
  background: '#fcf8f7'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
  surface-white: '#ffffff'
  accent-olive: '#4d4232'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  button-text:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: '1.0'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  section-gap: 80px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

# Dada Restaurant - Technical Design Document

## 1. Brand Identity & Strategy
**Overview:** Dada Restaurant is a contemporary Asian-fusion eatery located in Phillip, ACT. The digital presence must reflect the physical experience: intimate, highly curated, and food-focused.
*   **Tagline:** Modern Asian-inspired dining and artisanal house-made treats.
*   **Brand Values:** Culinary Innovation, House-made Craftsmanship, Quality Sourcing.
*   **Aesthetic Keywords:** Minimalist, artisanal, tactile, sophisticated, gourmet.
*   **Tone of Voice:** Inviting, Professional, Food-focused.

## 2. Design System
### 2.1 Color Palette
The color palette relies on high contrast and earthy, natural tones to let the high-quality food photography stand out.
*   `#ebe9e6` (Bone/Warm Beige): Primary background color. Provides a soft, tactile canvas.
*   `#ffffff` (Pure White): Used for layered cards, modals, and menu item containers.
*   `#000000` (Pure Black): Primary typography, borders, and high-impact UI elements.
*   `#4d4232` (Olive Earth): Accent color for hover states, footer background, and subtle UI highlights.

### 2.2 Typography
*   **Headings (Primary):** `Recoleta`
    *   Usage: H1, H2, H3, prominent quotes, and primary navigation items. 
    *   Styling: Regular or Medium weight. Warm, editorial feel.
*   **Body & UI (Secondary):** `PT Sans`
    *   Usage: Paragraphs, menu descriptions, buttons, forms, and footer links.
    *   Styling: Clean, highly legible, modern spacing.

### 2.3 UI Components & Interactions
*   **Buttons:** Pill-shaped (`border-radius: 50px`). 
    *   *Primary:* Background `#000000`, Text `#ffffff`. Hover: Background `#4d4232`.
    *   *Secondary:* Transparent with `#000000` 1px solid border. Hover: Background `#ebe9e6`.
*   **Animations:** Utilize sophisticated, low-friction motion graphics. Elements should fade in gently moving upwards (`transform: translateY(10px)`) upon scrolling into the viewport.
*   **Imagery:** High-end, cinematic aesthetics. Focus on macro shots of textures (sauces, crusts, garnishes) with dramatic, moody lighting to contrast the light web palette.

## 3. Site Architecture (Sitemap)
1.  **Home (`/`)**
    *   Hero (Video/Image + CTAs)
    *   About/Ethos snippet
    *   Menu Highlights Carousel
    *   Testimonials/Review Grid
    *   Location & Footer
2.  **Menu (`/menu`)**
    *   Interactive, tabbed categories (Small Plates, Mains, Desserts, Drinks).
    *   Strict requirement: Clear visual tagging for dietaries (V, VG, GF, DF).
3.  **Reservations (`/reservations`)**
    *   Embedded booking widget.
    *   Information regarding group bookings and dietary notice requirements.
4.  **Order Online (`/order`)**
    *   Integrated digital cart for takeaway treats.

## 4. Functional Integrations
*   **Reservations Engine:** Connect via standard widget script (e.g., Resy, SevenRooms, or OpenTable). Must be styled to inherit the `PT Sans` font where API allows.
*   **Online Ordering System:** Seamless handoff to the POS provider's web portal, or an integrated GraphQL store if utilizing a headless e-commerce setup for the "artisanal house-made treats" and takeaway menu.
*   **SEO & Metadata:**
    *   *Title:* Dada | Modern Asian-Inspired Dining in Canberra
    *   *Description:* Experience culinary innovation at Dada, a contemporary Asian-fusion eatery in Phillip, ACT. Join us for dine-in or order artisanal takeaway treats.

## 5. Content Matrix (Derived from Customer Data)
*   **Hero Dishes to Feature:** Kimchi Fried Rice, Wombok Pancake, Korean Fried Chicken (with chili sauce), Beef Tartare, Sticky Date Pudding, Matcha Basque Cheesecake.
*   **Review Highlights (Social Proof):** Focus on quotes praising "dietary requirement accommodation", "attentive service", and "cutting edge flavour".
*   **Contact Data (Global Footer):**
    *   Address: G4/12 Furzer Street, Phillip, ACT 2606
    *   Phone: 0493 514 593
    *   URL: dadarestaurant.com.au