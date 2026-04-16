# PMS 2025 Website - Setup & Customization Guide

## Overview

This is a silly, interactive website for Persatuan Mahasiswa Sakit (PMS) 2025. It includes:
- Interactive hero section with parallax effects
- Sambutan Ketua (Chairman's greeting) with photo
- Yang Kami Lakukan (Our Activities) with 6 activity cards
- Interactive masonry gallery
- Markas Besar (Headquarters location) with map
- Temukan Kami (Find Us) social media section with footer

## How to Customize

### 1. Replace Images

All editable images are in `/public/images/`. Simply replace them with your own:

#### Logo
- **File**: `/public/images/logo.png`
- **Current**: PMS logo provided
- **Replace with**: Your organization's logo

#### Chairman Photo
- **File**: `/public/images/ketua-placeholder.png`
- **Current**: Generated placeholder
- **Replace with**: Actual chairman photo
- **Recommended size**: 600x800px or similar portrait ratio

#### Gallery Images
- **File**: `/public/images/gallery-*.png` (create these files)
- **Current**: Gradient placeholders in-app
- **How to add**: 
  1. Replace the gradient placeholders in `/components/gallery.tsx`
  2. Update the Image component to point to real images
  3. Add images to `/public/images/`

### 2. Edit Text Content

#### Hero Section
- **File**: `/components/hero-section.tsx`
- **Customize**:
  - Main title: "PMS 2025"
  - Subtitle text
  - Button text

#### Sambutan Ketua (Chairman's Section)
- **File**: `/components/sambutan-ketua.tsx`
- **Customize**:
  - Chairman name (change "Nama Ketua")
  - Title/position
  - Message text
  - Statistics (500+ members, 50+ events)

#### Yang Kami Lakukan (Activities)
- **File**: `/components/yang-kami-lakukan.tsx`
- **Customize**:
  - Add/remove activities in the `activities` array
  - Change icons (using emoji or Unicode characters)
  - Edit titles and descriptions

#### Contact Information
- **File**: `/components/markas-besar.tsx`
- **Customize**:
  - Address
  - Phone number
  - Email
  - Operating hours
  - Map location (replace with Google Maps embed)

#### Social Media Links
- **File**: `/components/temukan-kami.tsx`
- **Customize**:
  - Social media handles
  - Links in the `socialMedia` array
  - Add/remove platforms

### 3. Customize Colors

The website uses a blue-orange color scheme inspired by the PMS logo.

**Color System** (in `/tailwind.config.ts`):
- **Primary**: `#0A66CC` (Blue)
- **Secondary**: `#FF8C42` (Orange)
- **Accent**: `#FFD700` (Gold)
- **Navy**: `#0A3D7A` (Dark Blue)
- **Sky**: `#3DB8E8` (Sky Blue)

To change colors:
1. Edit the color values in `/tailwind.config.ts`
2. Update any custom CSS in `/app/globals.css`
3. The website uses Tailwind utility classes, so most updates happen automatically

### 4. Typography

**Fonts**: 
- **Headings**: Outfit (Google Font)
- **Body**: Inter (Google Font)

To change fonts:
1. Edit `/app/layout.tsx`
2. Import different fonts from `next/font/google`
3. Update the `tailwind.config.ts` fontFamily section

### 5. Google Maps Integration

Currently, the Markas Besar section has a placeholder map.

**To add real Google Maps:**
1. Get a Google Maps API key
2. Replace the placeholder div in `/components/markas-besar.tsx` with:
```html
<iframe
  width="100%"
  height="100%"
  frameborder="0"
  src="https://www.google.com/maps/embed?pb=YOUR_GOOGLE_MAPS_EMBED_CODE"
  allowfullscreen=""
  loading="lazy"
></iframe>
```

### 6. Newsletter Signup

The email subscription form is in `/components/temukan-kami.tsx`.

**To connect to email service:**
- Connect to Mailchimp, Brevo, or similar service
- Update the form to submit to your email service endpoint

### 7. Animations

Custom animations are defined in `/app/globals.css`:
- `float`: Floating motion
- `pulse-glow`: Pulsing glow effect
- `slide-up`: Slide up entrance
- `fade-in`: Fade in effect

Adjust animation durations or create new ones as needed.

## Project Structure

```
app/
  layout.tsx          # Root layout with fonts
  page.tsx           # Main page combining all sections
  globals.css        # Custom animations and styles

components/
  hero-section.tsx        # Interactive hero with logo
  sambutan-ketua.tsx      # Chairman greeting
  yang-kami-lakukan.tsx   # Activities list
  gallery.tsx             # Interactive photo gallery
  markas-besar.tsx        # Location/contact section
  temukan-kami.tsx        # Social media + footer

public/
  images/
    logo.png                    # PMS logo
    ketua-placeholder.png       # Chairman photo
    [other images]              # Add your gallery images here

tailwind.config.ts      # Tailwind configuration with custom colors
```

## Quick Customization Checklist

- [ ] Replace logo in `/public/images/logo.png`
- [ ] Add chairman photo and update text in `sambutan-ketua.tsx`
- [ ] Update activities list in `yang-kami-lakukan.tsx`
- [ ] Add gallery images and update gallery.tsx
- [ ] Update contact info in `markas-besar.tsx`
- [ ] Add social media links in `temukan-kami.tsx`
- [ ] Replace colors if desired in `tailwind.config.ts`
- [ ] Add Google Maps embed
- [ ] Connect newsletter email service
- [ ] Test all links and interactions

## Build & Deploy

### Local Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm run start
```

### Deploy to Vercel
1. Push to GitHub
2. Import project to Vercel
3. Deploy with one click

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Smooth scroll animations

## Notes

- All images are editable via file replacement
- Text content is easily changeable
- Color scheme is flexible
- Fully responsive design
- Animations work on desktop, simplified on mobile

Enjoy your silly, interactive PMS website! 🎉
