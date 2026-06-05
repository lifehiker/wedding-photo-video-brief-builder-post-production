export interface SeoTemplate {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  targetKeyword: string;
  h1: string;
  intro: string;
  whenToUse: string[];
  whatToInclude: string[];
  exampleExcerpt: string;
  faqItems: Array<{ q: string; a: string }>;
  ctaBriefType: string;
  ctaText: string;
}

export const SEO_TEMPLATES: SeoTemplate[] = [
  {
    slug: "wedding-videography-reel-brief-template",
    targetKeyword: "wedding videography reel brief",
    title: "Wedding Videography Reel Brief Template",
    metaTitle: "Wedding Videography Reel Brief Template | Free Wedding Editor Brief Generator",
    metaDescription:
      "Create a structured Instagram Reel brief for wedding videographers. Add couple notes, must-have moments, music direction, vendor tags, and export a clean handoff.",
    h1: "Wedding Videography Reel Brief Template",
    intro:
      "Handing off a wedding Reel to an editor — or posting it yourself — without a clear brief leads to revisions, guesswork, and missed moments. This template walks you through every field your editor needs: which clips to use, how it should open, what audio to feature, how fast to cut, and which vendors to tag.",
    whenToUse: [
      "You outsource Instagram Reels to a video editor or VA",
      "You're delivering a Reel alongside a full wedding film",
      "You want to standardize how you brief every Reel so you don't start from scratch each time",
      "You're giving Reel instructions to a second shooter or assistant who will cut it",
    ],
    whatToInclude: [
      "Target length (15–30 sec, 30–60 sec, or 60–90 sec)",
      "Opening hook — the first 1–3 seconds that stop the scroll",
      "Must-have moments: max 5–8 specific clips to include",
      "Music track or genre direction",
      "Cut pacing: fast trending edits vs. slow romantic flow",
      "Caption and on-screen text notes",
      "Vendor tags for the caption (planner, venue, florist, hair & makeup)",
      "Preferred cover frame for the Reel thumbnail",
      "Aspect ratio (9:16 vertical for Reels)",
      "Delivery deadline",
    ],
    exampleExcerpt: `## Instagram Reel Brief — Olivia & James — The Grand Hotel

**Length:** 45–60 seconds
**Aspect Ratio:** 9:16 vertical
**Cut Pacing:** Beat-sync, uplifting

### Opening Hook
Open with the moment James sees Olivia at the first look — the reaction shot from Camera B. No music lead-in, just the ambient crowd gasp then music kicks in.

### Must-Have Moments
- First look reaction (Camera B close)
- Ceremony kiss with confetti
- First dance dip and laugh
- Reception group photo chaos
- Sunset portraits on the balcony

### Music Direction
"Can't Help Falling in Love" acoustic cover. Start music at 0:00, first chorus at 0:22, end on the final note fade.

### Caption Notes
Romantic + minimal. Name the venue and date. Tag all vendors listed below.`,
    faqItems: [
      {
        q: "How long should a wedding Instagram Reel be?",
        a: "Most high-performing wedding Reels run 30–60 seconds. Under 30 seconds risks feeling incomplete; over 90 seconds loses casual viewers. 45–60 seconds is the sweet spot for engagement and story.",
      },
      {
        q: "Do I need a brief if I'm editing the Reel myself?",
        a: "A brief still helps — it forces you to decide in advance which moments to include, which track to use, and how to open, rather than making decisions while editing. This saves time and produces more consistent work across multiple weddings.",
      },
      {
        q: "What's the best aspect ratio for wedding Instagram Reels?",
        a: "9:16 vertical is the native Reels format and gets the most organic reach. If you also want the clip to work in-feed, 4:5 is a common compromise.",
      },
    ],
    ctaBriefType: "SOCIAL_REEL",
    ctaText: "Generate Your Reel Brief",
  },
  {
    slug: "wedding-film-social-media-cut-checklist",
    targetKeyword: "wedding film social media cut checklist",
    title: "Wedding Film Social Media Cut Checklist",
    metaTitle: "Wedding Film Social Media Cut Checklist | Free Template",
    metaDescription:
      "Build a complete social media cut checklist for wedding films. Cover teasers, Reels, TikToks, and vendor promos in one structured handoff document.",
    h1: "Wedding Film Social Media Cut Checklist",
    intro:
      "After delivering a full wedding film, most videographers also owe the couple — and their vendors — a stack of social cuts: a Reel, a TikTok teaser, a sneak peek, and vendor promo clips. Without a checklist, deliverables get forgotten, editors work from scattered instructions, and revisions pile up. This template covers every social cut in one clean brief.",
    whenToUse: [
      "You deliver a social media package alongside a full wedding film",
      "You outsource your social cuts to an editor or VA",
      "You want to stop recreating the same instructions for every wedding",
      "You need a single document that covers all social deliverables for one client",
    ],
    whatToInclude: [
      "List of all social cuts included in the package (Reel, TikTok, Sneak Peek, Vendor Clips)",
      "Target length and aspect ratio for each cut",
      "Music direction for each cut (different tracks per platform)",
      "Must-have moments and clips across the full package",
      "Vendor tags and credit requirements per cut",
      "Caption style and text overlay notes per platform",
      "Delivery deadline per cut",
      "Output format and resolution per platform",
    ],
    exampleExcerpt: `## Social Media Cut Package — Sarah & Tom

### Deliverables
1. Instagram Reel (60 sec, 9:16) — due in 5 days
2. TikTok (30 sec, 9:16) — due in 5 days
3. Sneak Peek Teaser (90 sec, 16:9) — due in 48 hours
4. Venue Promo Clip (30 sec, 9:16) — due in 2 weeks
5. Florist Promo Clip (30 sec, 9:16) — due in 2 weeks

### Shared Must-Have Moments
- First look
- Ceremony kiss
- First dance
- Confetti exit

### Platform-Specific Notes
**Instagram Reel:** Beat-sync, trending audio, romantic tone
**TikTok:** POV text hook, "You're invited..." concept
**Sneak Peek:** No text overlays, cinematic music only`,
    faqItems: [
      {
        q: "How many social cuts should I deliver with a wedding film?",
        a: "A typical social media package includes a 60-sec Instagram Reel, a 30-sec TikTok teaser, and a 90-sec sneak peek for the couple. Vendor promos are often sold separately or included in higher packages.",
      },
      {
        q: "Should each social cut use a different music track?",
        a: "Often yes — each platform has different licensing rules and audience expectations. Instagram may use a trending audio remix, TikTok its own trending sound, and the sneak peek a royalty-free licensed track.",
      },
    ],
    ctaBriefType: "SOCIAL_REEL",
    ctaText: "Build Your Social Cut Brief",
  },
  {
    slug: "wedding-videographer-instagram-reel-template",
    targetKeyword: "wedding videographer instagram reel template",
    title: "Wedding Videographer Instagram Reel Template",
    metaTitle: "Wedding Videographer Instagram Reel Template | Free Wedding Editor Brief Generator",
    metaDescription:
      "Free Instagram Reel brief template for wedding videographers. Define hook, moments, music, captions, vendor tags, and aspect ratio in a clean editor handoff.",
    h1: "Wedding Videographer Instagram Reel Template",
    intro:
      "Instagram Reels are the primary discovery channel for most wedding videographers. But briefing an editor — or building a consistent Reel workflow yourself — requires a clear template. This page gives you a free Reel brief template with all the fields that matter: hook, pacing, music, moments, vendor tags, and captions.",
    whenToUse: [
      "You're handing Reel editing to a contractor or in-house editor",
      "You want a repeatable format for every wedding Reel you deliver",
      "You need to share instructions clearly with a second shooter who cuts Reels",
      "You want to save time by not reinventing your Reel brief from scratch each week",
    ],
    whatToInclude: [
      "Opening hook: the exact clip or type of shot that grabs attention in the first 2–3 seconds",
      "Reel length and format (9:16 vertical for Reels)",
      "Music track with timestamp direction if relevant",
      "3–7 specific moments to include",
      "Pacing instruction: fast cuts, beat-sync, or slow romantic",
      "Caption tone and style (romantic, minimal, fun)",
      "All vendor tags in order (venue, florist, planner, hair, dress, catering)",
      "Thumbnail / cover frame preference",
      "Deadline and file format",
    ],
    exampleExcerpt: `## Reel Brief — Emma & Luca

**Length:** 45 seconds | **Format:** 9:16 | **Pacing:** Beat-sync

### Hook (0:00–0:03)
Emma's reaction to the venue reveal — overhead shot looking down.

### Music
"Golden Hour" by JVKE — start at 0:18, cut on the drop at 0:42.

### Moments (in order)
1. Venue reveal reaction
2. Getting ready mirror shot
3. First kiss
4. Confetti tunnel exit
5. First dance dip

### Caption
Short and romantic. 3 lines max. Tag all vendors below.`,
    faqItems: [
      {
        q: "What's a hook in a wedding Reel?",
        a: "The hook is the first 1–3 seconds of the video that stops someone from scrolling past. For weddings, this is usually a strong emotional reaction (first look, laugh, tears), a visually stunning shot (confetti, venue wide), or a surprising cut.",
      },
      {
        q: "Should I use trending audio for wedding Reels?",
        a: "Trending audio significantly boosts organic reach on Instagram. However, for the couple's personal copy, you'll want a licensed track. A common approach is using trending audio for your own posting copy and a licensed track for the version you deliver to the couple.",
      },
    ],
    ctaBriefType: "SOCIAL_REEL",
    ctaText: "Create Your Reel Brief Now",
  },
  {
    slug: "wedding-video-teaser-workflow",
    targetKeyword: "wedding video teaser workflow",
    title: "Wedding Video Teaser Workflow Template",
    metaTitle: "Wedding Video Teaser Workflow | Free Wedding Editor Brief Generator",
    metaDescription:
      "Turn wedding notes into a structured teaser/sneak peek workflow. Cover moments, music, pacing, text overlays, and deliver a 24–72 hour teaser on time.",
    h1: "Wedding Video Teaser Workflow",
    intro:
      "A 60–90 second sneak peek is one of the most high-value deliverables in a wedding videography package. It's often due within 24–72 hours of the wedding — before the full film is edited — and it's what couples share immediately on social media. This workflow brief template ensures your editor has everything they need to turn it around fast.",
    whenToUse: [
      "You promise a 24–72 hour sneak peek to couples",
      "You outsource teaser editing to an editor who wasn't at the wedding",
      "You want to deliver a consistent teaser every weekend without recreating instructions",
    ],
    whatToInclude: [
      "Deadline (critical — often 24–48 hours)",
      "Top 3–5 must-have clips",
      "Opening shot preference",
      "Music track (link to specific licensed track)",
      "Text overlay or title card requirements",
      "Aspect ratio (16:9 for YouTube, 9:16 for Stories)",
      "Energy level (cinematic vs. fast-cut)",
      "Export format and resolution",
    ],
    exampleExcerpt: `## Sneak Peek Brief — Mia & Connor

**Deadline:** Monday 9am (wedding was Saturday)
**Length:** 90 seconds | **Format:** 16:9

### Top 5 Clips
1. Connor's first look reaction (timestamp 02:14 Cam B)
2. Ceremony kiss wide + close alternating
3. Confetti exit slow motion
4. First dance dip at 3:42
5. Sunset portraits on the hill — golden hour series

### Music
"Yellow" acoustic cover. Quiet open, build through first chorus.

### Text
"Mia & Connor — June 14, 2025 — The Orchard Estate"
White serif font, center bottom, fade in at 0:03.`,
    faqItems: [
      {
        q: "How long should a wedding sneak peek video be?",
        a: "60–90 seconds is the standard. Long enough to feel complete and emotional; short enough to share easily on social and hold attention start to finish.",
      },
      {
        q: "Can I outsource sneak peek editing with a tight 48-hour turnaround?",
        a: "Yes, but only if your editor has a clear brief before they start. With a concise clip list, exact timestamp references, music track, and deadline confirmed in the brief, a skilled editor can deliver a sneak peek in 2–4 hours.",
      },
    ],
    ctaBriefType: "SNEAK_PEEK",
    ctaText: "Build Your Teaser Brief",
  },
  {
    slug: "editing-brief-template-for-wedding-photographers",
    targetKeyword: "editing brief template for wedding photographers",
    title: "Editing Brief Template for Wedding Photographers",
    metaTitle: "Editing Brief Template for Wedding Photographers | Free Generator",
    metaDescription:
      "Create a Lightroom editing brief for wedding photographers. Cover culling counts, color preferences, skin tones, challenging lighting, and delivery specs.",
    h1: "Editing Brief Template for Wedding Photographers",
    intro:
      "When you outsource wedding photo editing, your editor needs more than a Lightroom preset. They need to know your color style, how you handle mixed lighting, what skin tone adjustments you prefer, how many images to deliver, and which moments are mandatory. This brief template covers every field a photo editor needs to edit your gallery the way you would.",
    whenToUse: [
      "You outsource wedding photo editing to a service like ShootDotEdit or a freelance editor",
      "You use an internal assistant or second shooter for post-processing",
      "You want a repeatable editing brief so every gallery matches your brand style",
    ],
    whatToInclude: [
      "Preset or base editing style with a shareable preset if possible",
      "Color profile and camera standard",
      "Exposure guidance (bright and airy, moody, true to life)",
      "Color preferences: warm/cool, skin tone priority, desaturate greens",
      "Specific skin tone adjustment notes per couple",
      "Black and white conversion percentage and criteria",
      "Challenging lighting situations (dark receptions, mixed indoor/outdoor, midday sun)",
      "Gallery consistency rules",
      "Output specs: resolution, JPEG quality, color space, file naming",
      "Delivery deadline",
    ],
    exampleExcerpt: `## Lightroom Editing Brief — Hannah & Marcus

**Preset:** Studio Signature Warm (shared via Dropbox)
**Camera Profile:** Adobe Color

### Color Style
Warm and romantic. Lift shadows slightly. Creamy highlights. Avoid cool/blue tones.

### Skin Tones
Hannah: medium-warm, lean toward peachy. Marcus: deeper tone, avoid oversaturation.
Use HSL Orange -5 Hue as baseline. Check hands and arms match faces.

### Challenging Lighting
Reception was DJ-lit with purple/blue wash. Shift away from magenta, lift exposure +0.5 from my base. Ceremony was shaded outdoor — should need minimal adjustment.

### Output
2048px long edge, 85 JPEG quality, sRGB, original filename + _BW suffix for black & white.`,
    faqItems: [
      {
        q: "What's the difference between a culling brief and an editing brief?",
        a: "A culling brief instructs an editor on which images to select from the full shoot (coverage priority, burst handling, must-include shots). An editing brief covers how to process the selected images in Lightroom (color, exposure, skin tones, output). Many workflows use both.",
      },
      {
        q: "Should I share my Lightroom preset with an outsourced editor?",
        a: "Yes. Sharing your preset via Dropbox or the Adobe cloud eliminates the back-and-forth about your exact style. Always include notes about any adjustments beyond the base preset, especially for challenging lighting conditions.",
      },
    ],
    ctaBriefType: "LIGHTROOM_EDITING",
    ctaText: "Generate Your Editing Brief",
  },
  {
    slug: "wedding-photography-outsourcing-workflow",
    targetKeyword: "wedding photography outsourcing workflow",
    title: "Wedding Photography Outsourcing Workflow",
    metaTitle: "Wedding Photography Outsourcing Workflow | Free Brief Template",
    metaDescription:
      "Build a complete outsourcing workflow for wedding photography. Cover culling notes, editing brief, delivery specs, and editor handoff in one document.",
    h1: "Wedding Photography Outsourcing Workflow",
    intro:
      "Outsourcing wedding photo editing is one of the fastest ways to scale without burning out — but only if your handoff is clear. This workflow brief covers everything from how to package your files, to culling instructions, to editing style, to delivery timelines. Give your outsourced editor everything they need in one document.",
    whenToUse: [
      "You're starting to outsource editing and want a repeatable process",
      "You're switching editing partners and need to document your style",
      "You want to reduce revision rounds with your current editor",
    ],
    whatToInclude: [
      "File organization and folder structure for delivery",
      "Culling instructions: coverage order, must-have shots, delivery count",
      "Editing style: preset, color profile, exposure guidelines",
      "Skin tone and color preferences",
      "Gallery consistency requirements",
      "Sneak peek selection (first 20–50 edited images)",
      "Output specifications",
      "Communication and revision process",
      "Delivery deadline and format",
    ],
    exampleExcerpt: `## Outsourcing Brief — Julia & Ben

### File Delivery
3 folders: CAM_A (bride cam), CAM_B (groom cam), DETAILS
Total: ~2,800 raw files. Cull to 550–650 selects.

### Culling Priority
Ceremony > First look > Portraits > Details > Getting ready > Reception
Second shooter files: include best 100 only.

### Editing Style
Warm & bright. Adobe Color profile. My preset in the shared Lightroom catalog.
Sneak peek: first 25 images from ceremony and first look.

### Deadline
Culled catalog back to me: 5 business days
Edited gallery: 3 weeks from receipt`,
    faqItems: [
      {
        q: "How much does outsourced wedding photo editing cost?",
        a: "Typical rates range from $0.10–0.50 per image for basic Lightroom editing, or $150–350 per wedding for a full gallery. Culling-only services often charge separately at $0.02–0.10 per image.",
      },
      {
        q: "How do I send RAW files to an outsourced editor?",
        a: "Google Drive, Dropbox, or WeTransfer are the most common methods. For large shoots (3,000+ files), consider a USB/SSD shipment or a dedicated file delivery service. Always send a Lightroom catalog with your preset included.",
      },
    ],
    ctaBriefType: "PHOTO_CULLING",
    ctaText: "Build Your Outsourcing Brief",
  },
  {
    slug: "wedding-photographer-culling-notes-template",
    targetKeyword: "wedding photographer culling notes",
    title: "Wedding Photographer Culling Notes Template",
    metaTitle: "Wedding Photographer Culling Notes Template | Free Generator",
    metaDescription:
      "Create detailed culling notes for wedding photography editors. Cover coverage priority, must-include shots, burst handling, face checks, and delivery count.",
    h1: "Wedding Photographer Culling Notes Template",
    intro:
      "Culling notes tell your editor which images to keep before editing even begins. Without clear instructions, editors make judgment calls that don't match your style — wrong coverage priority, missed must-have moments, or too many images from the wrong part of the day. This template gives you a complete culling brief format for every wedding.",
    whenToUse: [
      "You outsource the culling step to a dedicated culling editor or service",
      "You use a VA or second shooter to make the first pass of selects",
      "You want to document your culling process for consistency across your team",
    ],
    whatToInclude: [
      "Estimated raw image count and target delivery count",
      "Coverage order by priority (ceremony first, or portraits first?)",
      "Must-include shot types (all formal combinations, all ring close-ups, all altar wides)",
      "Images to exclude (unflattering moments, eyes closed, misfires, blurry)",
      "How to handle burst series and duplicate shots",
      "Face check priority: sharp eyes on couple vs. more lenient for guest candids",
      "Second shooter file handling",
      "Delivery method (Lightroom flags, star ratings, separate folder)",
    ],
    exampleExcerpt: `## Culling Notes — Sophie & Ethan

**Total Files:** ~3,200 RAW | **Target Select Count:** 580–640

### Coverage Priority
1. Ceremony (include every 5 min minimum)
2. Portraits / first look
3. Reception key moments
4. Details and getting ready
5. Guest candids (lighter cull)

### Must-Include
- All ring close-ups (keep sharpest from each series)
- Every formal family grouping (at least 2 per grouping)
- Altar wide every 5 minutes during ceremony
- All bouquet detail shots

### Burst Handling
Keep best 1 from each burst of similar shots.
Exception: first kiss, first dance dip — keep 3 best.`,
    faqItems: [
      {
        q: "How many images should a wedding photographer deliver?",
        a: "Industry standard is 50–80 images per hour of coverage. For an 8-hour wedding, that's typically 400–640 fully edited images. From a 3,000-image shoot, that means culling to roughly 15–20% of the original files.",
      },
      {
        q: "Should I cull before or after sending to an outsourced editor?",
        a: "Always cull first if possible — it reduces the file size you need to transfer and speeds up editing turnaround. If you outsource both culling and editing to the same person, you can send raw files with your culling brief attached.",
      },
    ],
    ctaBriefType: "PHOTO_CULLING",
    ctaText: "Create Your Culling Notes",
  },
  {
    slug: "lightroom-editing-brief-for-wedding-photographers",
    targetKeyword: "lightroom editing brief for wedding photographers",
    title: "Lightroom Editing Brief for Wedding Photographers",
    metaTitle: "Lightroom Editing Brief for Wedding Photographers | Free Template",
    metaDescription:
      "Generate a Lightroom editing brief for wedding photographers. Cover presets, color profiles, skin tones, tricky lighting, and gallery consistency for your editor.",
    h1: "Lightroom Editing Brief for Wedding Photographers",
    intro:
      "A Lightroom editing brief is the single document your editor needs to process an entire wedding gallery in your style — without asking you constant questions. It covers your preset, color profile, how you handle tricky lighting, skin tone adjustments, and gallery consistency rules. This free template generates a complete brief you can share with any editor.",
    whenToUse: [
      "You're onboarding a new outsourced photo editor",
      "You want a brief to share with a guest editor or second shooter doing edits",
      "You want to document your editing style so it's reproducible across your business",
    ],
    whatToInclude: [
      "Preset name and file (shareable via Dropbox or Lightroom cloud)",
      "Color profile: Adobe Color, Camera Neutral, Vivid, or custom",
      "Exposure baseline: bright and airy, dark and moody, true to life",
      "Color temperature guidance: warm, neutral, cool",
      "Skin tone adjustment strategy (HSL panel notes)",
      "How to handle: dark DJ-lit receptions, mixed indoor/outdoor transitions, harsh midday sun",
      "Black and white conversion criteria",
      "Gallery consistency: should portraits be lighter than reception? Is ceremony its own look?",
      "Output specs: pixel dimensions, JPEG quality, color space, naming convention",
      "Sneak peek selection instructions",
    ],
    exampleExcerpt: `## Lightroom Brief — Natasha & Will

**Preset:** VSCO Film 04 base + my HSL adjustments (catalog shared)

### Exposure
Church ceremony: lift exposure +0.3 from base, recover highlights on white dress.
Reception: base exposure is fine, keep warm even under DJ lights.

### Color
Warm, golden hour vibe throughout. Greens: desaturate -15, hue shift +5 toward yellow.
Skin: Natasha has fair skin, keep peachy not pink. Will: darker tone, avoid oversaturation.

### B&W
Convert getting-ready detail shots (15–20 images). No B&W for ceremony or reception.

### Output
Long edge 2048px | JPEG 90% | sRGB | Naming: YYYYMMDD_NatashaWill_0001.jpg`,
    faqItems: [
      {
        q: "Do I need a new Lightroom brief for every wedding?",
        a: "Not from scratch. Create a base brief template that reflects your signature style, then update only the couple-specific notes (skin tones, specific lighting challenges) for each wedding. BriefedWed lets you save a style guide for exactly this purpose.",
      },
      {
        q: "What camera profile should I recommend to my editor?",
        a: "Adobe Color is the most neutral and widely recommended starting point for most modern mirrorless cameras. If you shoot Canon, you might prefer Camera Standard. Always test across multiple wedding shots before committing to a profile for your briefs.",
      },
    ],
    ctaBriefType: "LIGHTROOM_EDITING",
    ctaText: "Generate Your Lightroom Brief",
  },
  {
    slug: "wedding-film-editor-brief-template",
    targetKeyword: "wedding film editor brief template",
    title: "Wedding Film Editor Brief Template",
    metaTitle: "Wedding Film Editor Brief Template | Free Wedding Editor Brief Generator",
    metaDescription:
      "Create a complete wedding film editor brief. Cover must-have moments, music direction, pacing, vendor credits, delivery specs, and share it with your editor.",
    h1: "Wedding Film Editor Brief Template",
    intro:
      "Every wedding film editor — whether a contractor, an in-house assistant, or an outsourced post-production partner — needs a clear brief to edit a wedding without constant back-and-forth. This template covers everything: which moments to include, music direction, pacing tone, ceremony notes, reception flow, vendor credits, and delivery specs.",
    whenToUse: [
      "You outsource full wedding film editing to a contractor or agency",
      "You're giving editing instructions to a second shooter or intern",
      "You want a repeatable format so you don't write a new brief from scratch for every wedding",
      "You need to document your creative intent before handing off footage",
    ],
    whatToInclude: [
      "Target film length",
      "Must-have moments: first look, vows, ceremony kiss, first dance, key speeches",
      "Moments to avoid or exclude",
      "Ceremony notes: structure, audio sources, officiant instructions",
      "Reception notes: speech order, first dance timing, party energy",
      "Music direction: specific tracks, genre, mood, transitions",
      "Pacing and emotional tone",
      "Editing style and color reference",
      "Audio priorities: vows, ambient sound, music balance",
      "Vendor credits for film description",
      "Delivery specs: format, resolution, platform",
    ],
    exampleExcerpt: `## Full Wedding Film Brief — Charlotte & Oliver — Hillside Manor

**Target Length:** 25–30 minutes
**Editor:** Jamie T.
**Deadline:** 6 weeks from wedding date

### Must-Have Moments
- Getting ready: Charlotte's mother helping with veil
- First look in the rose garden
- Full ceremony processional (all family)
- Vows — Charlotte's personal vows (mics were on)
- First kiss — stay on this 8 seconds, don't cut early
- First dance: full song
- Father-daughter dance: full
- Speeches: best man (keep full), MOH (edit to 4 min), parents (best of)
- Reception: dancing montage, exit sparkler tunnel

### Music
Act 1 (getting ready – ceremony): Instrumental classical
Act 2 (portraits – first dance): Artist's request list in shared doc
Act 3 (reception – exit): Upbeat, warm, celebratory`,
    faqItems: [
      {
        q: "How long should a full wedding film be?",
        a: "Most full wedding films run 20–45 minutes. Under 20 minutes risks feeling incomplete for longer ceremonies; over 60 minutes is rarely watched in full. 25–35 minutes is a widely accepted sweet spot for couples and their families.",
      },
      {
        q: "What's the difference between a wedding film and a highlight film?",
        a: "A full wedding film is a near-complete documentary of the day (20–60 min). A highlight film is a cinematic summary (3–8 min) that captures the emotional arc. Most packages include both.",
      },
    ],
    ctaBriefType: "WEDDING_FILM",
    ctaText: "Create Your Film Editor Brief",
  },
  {
    slug: "wedding-vendor-social-media-deliverables-checklist",
    targetKeyword: "wedding vendor social media deliverables",
    title: "Wedding Vendor Social Media Deliverables Checklist",
    metaTitle: "Wedding Vendor Social Media Deliverables Checklist | Free Template",
    metaDescription:
      "Build a vendor social media deliverables list for wedding photographers and videographers. Cover vendor promo clips, aspect ratios, tags, and delivery deadlines.",
    h1: "Wedding Vendor Social Media Deliverables Checklist",
    intro:
      "Many wedding photographers and videographers deliver short promo clips to vendors — the florist, the venue, the planner, the DJ — as part of their package or as a paid add-on. Without a clear brief, these clips get deprioritized, delivered inconsistently, or forgotten entirely. This checklist template helps you plan and brief every vendor deliverable before editing begins.",
    whenToUse: [
      "You include vendor clips in your standard wedding package",
      "You sell vendor promo clips as an add-on revenue stream",
      "You want to use vendor deliverables as a relationship-building and referral tool",
      "You outsource vendor clip editing and need a brief for each vendor",
    ],
    whatToInclude: [
      "List of vendors receiving clips with their Instagram handles",
      "Clip length per vendor (30 sec is standard)",
      "Aspect ratio per vendor (usually 9:16 for Instagram)",
      "Must-feature moments specific to each vendor's work",
      "Text overlay or branding for each vendor",
      "Music direction (neutral, license-free for vendor use)",
      "Delivery deadline per vendor",
      "Output format and how you'll deliver (Google Drive, WeTransfer, DM)",
    ],
    exampleExcerpt: `## Vendor Deliverables — Amy & David

### Vendor List
1. The Ivory Venue — @theivoryvenue — 30 sec, 9:16 — due 2 weeks
2. Bloom & Branch Florals — @bloomandbranch — 30 sec, 9:16 — due 2 weeks
3. Elite DJ Services — @elitedj — 30 sec, 9:16 — due 3 weeks

### Venue Clip Must-Features
- Entrance hall decorated
- Ceremony room wide shot
- Rooftop reception space
- Sunset over venue grounds

### Florals Clip Must-Features
- Bridal bouquet detail close-ups
- Ceremony arch full shot + detail
- Table centerpieces
- Boutonnieres on groom and groomsmen`,
    faqItems: [
      {
        q: "Should I charge extra for vendor promo clips?",
        a: "Most wedding videographers include 2–3 vendor clips in mid-tier or premium packages, and charge $50–150 per additional vendor clip as an add-on. Vendor clips are also an effective way to generate referrals and Instagram tags from vendors with large followings.",
      },
      {
        q: "How long should a vendor promo clip be?",
        a: "30 seconds is the standard for Instagram vendor promos. Long enough to show their work meaningfully; short enough to use as a Reel or Story. Some vendors prefer a 60-second version for their website.",
      },
    ],
    ctaBriefType: "VENDOR_PROMO",
    ctaText: "Create Your Vendor Brief",
  },
];

export function getSeoTemplate(slug: string): SeoTemplate | undefined {
  return SEO_TEMPLATES.find((t) => t.slug === slug);
}

export function getAllSeoTemplateSlugs(): string[] {
  return SEO_TEMPLATES.map((t) => t.slug);
}
