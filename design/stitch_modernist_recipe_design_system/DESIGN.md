---
name: Modernist Lab System
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#5e3f3a'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#926e69'
  outline-variant: '#e8bdb6'
  surface-tint: '#c00000'
  primary: '#9e0000'
  on-primary: '#ffffff'
  primary-container: '#cc0000'
  on-primary-container: '#ffdad4'
  inverse-primary: '#ffb4a8'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#941d20'
  on-tertiary: '#ffffff'
  tertiary-container: '#b63635'
  on-tertiary-container: '#ffdad6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#930000'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#8c171b'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.5'
    letterSpacing: 0.1em
  body-lg:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  data-table:
    fontFamily: Work Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
  caption:
    fontFamily: Newsreader
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
spacing:
  unit: 4px
  gutter: 24px
  margin: 48px
  table-row-height: 32px
  section-gap: 40px
---

## Brand & Style

This design system is rooted in the "Modernist Cuisine" aesthetic—a synthesis of culinary art and rigorous laboratory science. The brand personality is authoritative, precise, and uncompromisingly clinical. It treats food preparation not as a casual hobby, but as a technical discipline requiring exacting standards.

The visual style is a specialized form of **Minimalism** blended with **Scientific Industrialism**. It utilizes expansive white space to evoke the sterile cleanliness of a laboratory, while employing rigid, high-contrast structural elements to organize complex data. The emotional response is one of trust and expertise; the interface acts as a quiet, efficient instrument that prioritizes information density and clarity over decorative flair.

## Colors

The palette is strictly functional. The primary "Modernist Red" (#CC0000) is used sparingly for critical emphasis, category headers, and branding, mimicking the warning or focus colors found on technical equipment. 

The core of the interface is built on a stark White (#FFFFFF) base to maximize perceived "clinical" cleanliness. We utilize a range of neutral grays for structural borders and secondary data, while the Charcoal (#222222) provides high-contrast legibility for primary text. This high-contrast environment ensures that small-scale data remains readable under the intense lighting of a professional kitchen or lab.

## Typography

The typographic strategy balances academic authority with industrial utility. **Newsreader** is employed for main titles and editorial notes, providing a traditional, literary contrast to the technical data. Its high-contrast serifs evoke the feeling of a premium scientific journal.

**Work Sans** is used for all functional data, ingredient lists, and instructions. Its neutral, clean-cut glyphs ensure maximum legibility at small sizes. We use all-caps and increased letter spacing for table headers to establish a clear hierarchy without relying on heavy weights. Numeric data within tables should be set with tabular lining figures where possible to ensure columns of decimals align perfectly.

## Elevation & Depth

This system avoids traditional shadows and depth effects to maintain its clinical, "printed-page" aesthetic. Instead of using Z-axis elevation, hierarchy is established through **Low-contrast outlines** and **Tonal layers**.

Surfaces are predominantly flat. Separation between sections is achieved through ultra-fine 1px borders in light gray (#E0E0E0) or through the strategic use of white space. If a "callout" or "note" is required, it should be treated as a subtly tinted background block rather than a raised card. This maintains the "Modernist" commitment to a two-dimensional, information-first interface.

## Shapes

In keeping with the scientific and rigid nature of the system, the roundedness is set to **Sharp (0)**. Every element—from table cells to buttons and input fields—features 90-degree corners. This reinforces the precision and "engineered" feel of the system. There are no soft edges; every boundary is defined by a clean, hard line.

## Components

### Tables (The Core Component)
The central component of the system. Tables must have minimalist 1px horizontal dividers. Columns for "Quantity" and "Scaling %" are fixed-width and right-aligned. The "Procedure" column occupies the remaining flexible space.

### Buttons
Buttons are strictly rectangular with 1px borders. Primary buttons use the Modernist Red background with white text; secondary buttons use a white background with a thin gray border and black text. Interaction states should be a simple invert of colors.

### Input Fields
Used for scaling yields. These are simple underlines or 1px boxed rectangles with no shadows. Focus states are indicated by the border color changing to Modernist Red.

### Data Chips
Used for tags like "Sous Vide" or "Pressure Cooked." These are rectangular, small-scale text labels with a light gray background and no border.

### Procedure Numbers
Steps are indicated by circled numbers or bolded numerals in the body font, placed at the start of each procedure block to ensure the eye can quickly find the next action.