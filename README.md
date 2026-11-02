# Sector 9 Detailing - Luton concept

A responsive, mobile-first HTML, CSS and JavaScript landing page. This is an **unofficial concept demo**, not an official business website. It does not imply affiliation or verify business services, availability or coverage.

## Files

```text
index.html
css/
  style.css
js/
  main.js
assets/
  images/
    .gitkeep
    hero-automotive-640.webp
    hero-automotive-960.webp
    hero-automotive-1440.webp
    service-exterior-640.webp
    service-exterior-960.webp
    service-interior-640.webp
    service-interior-960.webp
    service-paint-640.webp
    service-paint-960.webp
    service-protection-640.webp
    service-protection-960.webp
    automotive-lifestyle-640.webp
    automotive-lifestyle-1280.webp
    README.md
README.md
```

There is no build step or application dependency. The page uses relative asset paths and can be served by a static host.

## Preview locally

From this folder, use a static server, for example:

```powershell
npx.cmd http-server . -p 4173 -c-1
```

Or, if Python is installed:

```sh
python -m http.server 4173
```

Visit `http://localhost:4173`. On macOS/Linux, use `npx` instead of `npx.cmd`. Directly opening `index.html` also supports the page; a local server is preferable for browser testing. The command above may download the preview server on first use; it does not add a site dependency. In VS Code, an installed Live Server extension can also serve `index.html` through **Open with Live Server**. Stop a terminal preview with `Ctrl+C`.

## Content and images

- The services are clearly labelled discussion topics, not a verified service menu. No prices, testimonials, ratings, accreditations or results are invented.
- The before/after gallery intentionally contains designed, labelled empty placeholders. No stock photograph is used as a client result or comparison.
- The hero uses one real, licensed illustrative stock photograph by [Dieter K on Unsplash](https://unsplash.com/photos/a-close-up-of-a-cars-headlight-on-a-rainy-day-sMp1McMv_ZE), under the [Unsplash License](https://unsplash.com/license). Its visible label, caption and attribution explain that it is not Sector 9's vehicle or work. The license and source evidence are documented in `assets/images/README.md`.
- The four service cards each use a different licensed photograph: foam washing by Tima Miroshnichenko, upholstery extraction and machine polishing in two separate photographs by Khunkorn Laowisit, and water beading on car paintwork by It_was_a_pleasure. An additional Josh Berquist photograph appears in the “EVERY DETAIL MATTERS.” section. All are visibly labelled as illustrative, not client work. Source pages, photographers, commercial-use licence links, download dates and file dimensions are recorded in `assets/images/README.md`.
- Luton is the location provided for this concept. The service-area section asks visitors to confirm availability directly; it does not promise travel, mobile service, premises or coverage elsewhere.
- Before publishing an official site, obtain the business's approval and verify its services, copy and contact details. Replace gallery placeholders only with genuine, licensed and approved before/after photographs from the same job. See `assets/images/README.md`.

Public contact details supplied for the concept:

- Email: `enquiry@sector9detailing.uk`
- Phone: `07346 814544` (`tel:+447346814544`)

## Contact form

The form creates a **local email draft**. It does not submit to a server or send an email.

1. JavaScript enables the form. Name, email and message are required; vehicle and service topic are optional.
2. Browser validation and checks for whitespace-only required text run before a draft is generated.
3. The prepared plain-text message appears on the page for review.
4. The visitor chooses the email-draft link to open an encoded `mailto:` draft in their own email application, then sends it there. A configured email application is required for this handoff.
5. A copy option provides a fallback when an email application is unavailable. Clipboard access can require a secure context such as HTTPS or localhost.

Form values are not sent or persisted by this application. There is no backend, analytics or cookie mechanism. With JavaScript disabled, the content, navigation and direct email/phone links remain available; the disabled form includes an explanation.

## Accessibility and motion

The page includes semantic landmarks, a skip link, labelled fields, visible keyboard focus, accessible navigation controls and a live form-status message. Animations respect `prefers-reduced-motion`. The layout supports narrow screens, keyboard use and browser zoom. The mobile contact bar provides direct Call, Email and Enquire actions with safe-area spacing and reserved page space so the footer can scroll above it. Primary touch targets are at least 44px tall, including the comparison slider.

## Visual refinement and performance

- Preserves the existing hero photograph, typography, blue palette, navigation, gallery and interaction code in `js/main.js`. The JavaScript remains unchanged.
- Uses larger photographic service cards in a two-column desktop layout and a single column on narrow screens, with consistent 16:10 photo frames, dark gradients, visible credits, enquiry buttons and restrained hover effects that respect reduced motion.
- Adds the “EVERY DETAIL MATTERS.” editorial section with a separate automotive lifestyle photograph and enquiry CTA. The copy expresses the concept's perspective, not a verified business claim.
- Makes phone and email visible in the hero and gives the contact section larger direct-contact cards.
- Uses six distinct local photographs in thirteen responsive WebP variants. The existing hero stays at 640/960/1440px; services use 640/960px, and the lifestyle section uses 640/1280px. Only the selected variant loads for each image. New variants range from approximately 23 to 122 KB.
- Reserves the photo layout using dimensions and CSS aspect ratios. The above-the-fold hero loads eagerly with high fetch priority and asynchronous decoding; it is deliberately not lazy-loaded.
- Lazy-loads all five new below-the-fold photographs with asynchronous decoding. Photographs are not reused in the comparison gallery or elsewhere on the page.
- Adds no JavaScript, package dependencies, remote fonts, image hotlinks, tracking or runtime third-party requests. External photo-source/license links load only when a visitor follows them.

## Vercel readiness

This is a buildless static project. When deployment is approved separately, import this folder into Vercel using **Framework Preset: Other**, no install command and no build command. Serve the repository root (`.`) as the output directory; a default root output setting is also suitable. No environment variables, server functions or rewrite rules are required.

**Deployment has not been requested or performed.** No Vercel configuration is needed for local review.

## Verification

Completed for the original version and repeated after this visual refinement:

- `node --check js/main.js` passed.
- 20 automated DOM interaction checks passed against the actual HTML: required and whitespace-only fields, invalid email, safe Unicode/ampersand/HTML-like draft encoding, no automatic navigation or transmission, clipboard success and failures, stale-draft clearing, mobile menu, tab keyboard navigation, service selection, slider limits, and reduced-motion/observer fallbacks. Test tooling ran in the OS temporary directory; the project has no runtime dependencies.
- HTML nesting, unique IDs, internal links, ARIA references, form labels, heading structure and local asset checks passed.
- Local HTTP checks returned 200 with the correct content types for HTML, CSS, JavaScript and all thirteen WebP variants. All six photographs decoded correctly, image binaries and source IDs were distinct, and loading/dimension/srcset attributes passed checks.
- Isolated Microsoft Edge/Chromium browser checks at 320, 360, 375, 390, 480, 768, 800, 1024 and 1440px showed no horizontal overflow or broken images, with no console errors or failed local asset requests. Menu, keyboard tabs, slider, service preselection and email-draft generation passed. Desktop and mobile screenshots were visually reviewed. The original version was also checked at 400% browser zoom.
- Mobile contact-bar visibility and touch targets passed; focused form fields, the submit button and footer stayed clear of the sticky header/contact bar at small viewports. A real JavaScript-disabled browser context retained content, navigation and direct contacts without overflow. Responsive image decoding and variant selection passed.
- Text contrast was checked numerically: primary-button white text is 4.75:1; muted text exceeds 5.8:1; form-control borders exceed 3:1 against their adjacent backgrounds.

No email was sent and no deployment was performed. The email-app handoff depends on the visitor's configured mail handler; clipboard fallback behavior was tested. Temporary test browsers and servers were closed. Physical iOS keyboard/notch behavior was not tested; safe-area spacing is implemented in CSS. These checks are not a full assistive-technology or cross-browser certification.

Before a future release, repeat the following manual checks after any content or photography changes:

- Confirm all local links, stylesheet and script resolve.
- Check narrow mobile and desktop layouts for overflow, navigation and readable text.
- Use the page by keyboard and check reduced-motion preferences.
- Test invalid, whitespace-only and valid form values; confirm the draft stays local until the visitor follows the email link.
- Check the direct contact links, email draft encoding and copy fallback.
- Disable JavaScript and confirm content, navigation and direct contact methods still work.

This checklist complements the completed checks above.

