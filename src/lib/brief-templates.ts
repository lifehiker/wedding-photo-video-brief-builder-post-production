export type BriefType =
  | "WEDDING_FILM"
  | "HIGHLIGHT_FILM"
  | "CEREMONY_EDIT"
  | "SPEECHES_EDIT"
  | "SNEAK_PEEK"
  | "SOCIAL_REEL"
  | "TIKTOK"
  | "VENDOR_PROMO"
  | "PHOTO_CULLING"
  | "LIGHTROOM_EDITING";

export interface BriefField {
  key: string;
  label: string;
  type: "text" | "textarea" | "select" | "number" | "url" | "multitext";
  placeholder?: string;
  options?: string[];
  required?: boolean;
  hint?: string;
}

export interface BriefTemplate {
  type: BriefType;
  label: string;
  description: string;
  icon: string;
  fields: BriefField[];
  outputSections: string[];
}

export const BRIEF_TEMPLATES: Record<BriefType, BriefTemplate> = {
  WEDDING_FILM: {
    type: "WEDDING_FILM",
    label: "Full Wedding Film",
    description: "Complete editor brief for a full-length wedding film (20–60 min).",
    icon: "🎬",
    fields: [
      { key: "targetLength", label: "Target Length", type: "select", options: ["20–30 min", "30–45 min", "45–60 min", "60+ min", "Custom"], required: true },
      { key: "mustHaveMoments", label: "Must-Have Moments", type: "textarea", placeholder: "First look, ceremony entrance, vows, first kiss, first dance, speeches, cake cutting, reception dancing...", required: true },
      { key: "avoidMoments", label: "Moments to Avoid / Do Not Use", type: "textarea", placeholder: "Any moments, people, or clips to exclude...", hint: "Be specific about anything the couple doesn't want included." },
      { key: "ceremonyNotes", label: "Ceremony Notes", type: "textarea", placeholder: "Ceremony structure, special rituals, officiant notes, audio setup..." },
      { key: "receptionNotes", label: "Reception Notes", type: "textarea", placeholder: "Reception flow, speeches order, dancing notes, special moments..." },
      { key: "musicDirection", label: "Music Direction", type: "textarea", placeholder: "Song preferences, genre, mood, specific songs for specific moments...", required: true },
      { key: "pacing", label: "Pacing & Emotional Tone", type: "select", options: ["Slow & cinematic", "Moderate & emotional", "Dynamic & upbeat", "Documentary style", "Custom mix"], required: true },
      { key: "editingStyle", label: "Editing Style", type: "textarea", placeholder: "Color grading preferences, visual style, any reference films..." },
      { key: "audioNotes", label: "Audio Priorities", type: "textarea", placeholder: "Vows audio priority, speech microphones, ceremony music balance, ambient sound use..." },
      { key: "vendorTags", label: "Vendor Tag Requirements", type: "textarea", placeholder: "List vendors to credit in film or description..." },
      { key: "deadline", label: "Delivery Deadline", type: "text", placeholder: "e.g. 6 weeks from wedding date" },
      { key: "deliveryFormat", label: "Delivery Format", type: "select", options: ["H.264 MP4", "H.265/HEVC MP4", "ProRes", "Vimeo link", "WeTransfer", "Google Drive"] },
      { key: "referenceLinks", label: "Reference Links", type: "multitext", placeholder: "https://..." },
      { key: "additionalNotes", label: "Additional Notes", type: "textarea", placeholder: "Anything else the editor should know..." },
    ],
    outputSections: ["overview", "deliverable", "mustHave", "avoid", "ceremony", "reception", "music", "style", "audio", "vendors", "technical", "deadline"],
  },

  HIGHLIGHT_FILM: {
    type: "HIGHLIGHT_FILM",
    label: "Highlight Film",
    description: "Editor brief for a 3–8 minute cinematic wedding highlight film.",
    icon: "✨",
    fields: [
      { key: "targetLength", label: "Target Length", type: "select", options: ["2–3 min", "3–5 min", "5–8 min", "8–10 min"], required: true },
      { key: "mustHaveMoments", label: "Must-Have Moments", type: "textarea", placeholder: "First look, vows, first kiss, first dance, key emotional moments...", required: true },
      { key: "avoidMoments", label: "Moments to Avoid", type: "textarea", placeholder: "Any clips or people to exclude..." },
      { key: "openingShot", label: "Preferred Opening Shot/Moment", type: "textarea", placeholder: "How should the film open? Getting ready, venue wide shot, detail shot..." },
      { key: "musicDirection", label: "Music Direction", type: "textarea", placeholder: "Specific song(s), genre, mood, tempo...", required: true },
      { key: "pacing", label: "Pacing & Tone", type: "select", options: ["Slow & emotional", "Uplifting & romantic", "Cinematic & dramatic", "Fun & celebratory", "Documentary-style"], required: true },
      { key: "editingStyle", label: "Color & Style Notes", type: "textarea", placeholder: "Warm tones, film look, moody, bright & airy, consistent with full film..." },
      { key: "audioNotes", label: "Audio Use", type: "textarea", placeholder: "Use ceremony audio? Vow whispers? Ambient sound? Speech clips?" },
      { key: "vendorTags", label: "Vendor Tags", type: "textarea", placeholder: "Vendors to credit..." },
      { key: "deadline", label: "Deadline", type: "text", placeholder: "e.g. 3 weeks from wedding date" },
      { key: "deliveryFormat", label: "Delivery Format", type: "select", options: ["1080p H.264", "4K H.264", "4K ProRes", "Vimeo link"] },
      { key: "referenceLinks", label: "Reference Films", type: "multitext", placeholder: "https://..." },
      { key: "additionalNotes", label: "Additional Notes", type: "textarea" },
    ],
    outputSections: ["overview", "deliverable", "mustHave", "avoid", "opening", "music", "style", "audio", "vendors", "technical", "deadline"],
  },

  CEREMONY_EDIT: {
    type: "CEREMONY_EDIT",
    label: "Ceremony Edit",
    description: "Focused brief for a clean ceremony-only edit with full audio.",
    icon: "💍",
    fields: [
      { key: "ceremonyLength", label: "Ceremony Length", type: "select", options: ["Under 20 min", "20–30 min", "30–45 min", "45–60 min", "60+ min"] },
      { key: "includeElements", label: "Elements to Include", type: "textarea", placeholder: "Processional, vows, rings, kiss, recessional, readings, rituals...", required: true },
      { key: "avoidMoments", label: "Elements to Exclude", type: "textarea", placeholder: "Any portions to trim or exclude..." },
      { key: "vowsAudio", label: "Vows Audio Source", type: "textarea", placeholder: "Lapel mic on groom, officiant mic, camera audio, multiple sources..." },
      { key: "musicDirection", label: "Ceremony Music Notes", type: "textarea", placeholder: "Live music, processional tracks, recessional song, transitions..." },
      { key: "editingStyle", label: "Editing Style", type: "select", options: ["Uncut documentary", "Lightly edited", "Cinematic with cuts", "Multicam sync"] },
      { key: "multicamNotes", label: "Camera Angles / Multicam Notes", type: "textarea", placeholder: "Camera A wide, Camera B close-up, drone shots, when to cut..." },
      { key: "deadline", label: "Deadline", type: "text" },
      { key: "deliveryFormat", label: "Delivery Format", type: "select", options: ["1080p H.264", "4K H.264", "ProRes"] },
      { key: "additionalNotes", label: "Additional Notes", type: "textarea" },
    ],
    outputSections: ["overview", "deliverable", "includeElements", "avoid", "audio", "cameras", "style", "technical", "deadline"],
  },

  SPEECHES_EDIT: {
    type: "SPEECHES_EDIT",
    label: "Speeches Edit",
    description: "Brief for compiling and editing all speeches and toasts into a polished deliverable.",
    icon: "🎤",
    fields: [
      { key: "speechOrder", label: "Speech Order", type: "textarea", placeholder: "Best man, maid of honor, father of bride, mother of groom, couple...", required: true },
      { key: "trimInstructions", label: "Trim / Edit Instructions", type: "textarea", placeholder: "Keep it under 5 min total, trim any long pauses, cut filler words if possible...", required: true },
      { key: "audioNotes", label: "Audio Notes", type: "textarea", placeholder: "Microphone sources, ambient noise issues, background music level..." },
      { key: "musicDirection", label: "Background Music", type: "textarea", placeholder: "Subtle background music? None? Specific track?" },
      { key: "subtitles", label: "Subtitles / Captions", type: "select", options: ["No subtitles", "Burned-in captions", "SRT file only", "Both"] },
      { key: "targetLength", label: "Target Length", type: "select", options: ["Under 5 min", "5–10 min", "10–15 min", "Full unedited", "Best-of compilation"] },
      { key: "deadline", label: "Deadline", type: "text" },
      { key: "deliveryFormat", label: "Delivery Format", type: "select", options: ["1080p H.264", "4K H.264", "MP3 audio only"] },
      { key: "additionalNotes", label: "Additional Notes", type: "textarea" },
    ],
    outputSections: ["overview", "deliverable", "speechOrder", "trimming", "audio", "captions", "technical", "deadline"],
  },

  SNEAK_PEEK: {
    type: "SNEAK_PEEK",
    label: "Sneak Peek / Teaser",
    description: "Quick 60–90 second teaser to share within 24–72 hours of the wedding.",
    icon: "⚡",
    fields: [
      { key: "targetLength", label: "Target Length", type: "select", options: ["30–45 sec", "45–60 sec", "60–90 sec", "90 sec–2 min"], required: true },
      { key: "mustHaveMoments", label: "Must-Have Moments (max 5)", type: "textarea", placeholder: "The 3–5 best clips to include...", required: true },
      { key: "musicDirection", label: "Music Track", type: "textarea", placeholder: "Specific song or genre for the teaser...", required: true },
      { key: "pacing", label: "Energy Level", type: "select", options: ["High energy / fast cuts", "Emotional / slow", "Balanced"], required: true },
      { key: "endingShot", label: "Preferred Ending Shot", type: "textarea", placeholder: "Kiss, confetti, sunset, first dance..." },
      { key: "textOverlay", label: "Text Overlay / Title Card", type: "textarea", placeholder: "Names and date? Brand watermark? No text?" },
      { key: "aspectRatio", label: "Aspect Ratio", type: "select", options: ["16:9 (YouTube/Vimeo)", "9:16 (Stories/Reels)", "1:1 (Square)", "4:5 (Instagram feed)"] },
      { key: "deadline", label: "Delivery Deadline", type: "text", placeholder: "e.g. 48 hours after wedding", required: true },
      { key: "deliveryFormat", label: "Delivery Format", type: "select", options: ["1080p H.264", "4K H.264", "Compressed for social"] },
      { key: "additionalNotes", label: "Additional Notes", type: "textarea" },
    ],
    outputSections: ["overview", "deliverable", "mustHave", "music", "pacing", "text", "technical", "deadline"],
  },

  SOCIAL_REEL: {
    type: "SOCIAL_REEL",
    label: "Instagram Reel",
    description: "Brief for a 15–90 second Instagram Reel optimized for vertical sharing.",
    icon: "📱",
    fields: [
      { key: "targetLength", label: "Target Length", type: "select", options: ["15–30 sec", "30–60 sec", "60–90 sec"], required: true },
      { key: "mustHaveMoments", label: "Must-Have Moments", type: "textarea", placeholder: "The key clips that must appear...", required: true },
      { key: "hookMoment", label: "Opening Hook (first 1–3 sec)", type: "textarea", placeholder: "What grabs attention immediately? A look, a laugh, a moment..." },
      { key: "musicDirection", label: "Music / Audio Track", type: "textarea", placeholder: "Instagram trending audio, specific song, tempo preference...", required: true },
      { key: "pacing", label: "Cut Pacing", type: "select", options: ["Fast cuts / trending", "Slow & romantic", "Beat-sync", "Ambient"], required: true },
      { key: "captionNotes", label: "Caption / On-Screen Text Notes", type: "textarea", placeholder: "Names, date, venue, caption tone (romantic, fun, minimal)..." },
      { key: "vendorTags", label: "Vendor Tags for Caption", type: "textarea", placeholder: "@vendor1, @venue, @planner..." },
      { key: "coverFrame", label: "Preferred Cover Frame", type: "textarea", placeholder: "Which frame to use as Reel thumbnail..." },
      { key: "aspectRatio", label: "Aspect Ratio", type: "select", options: ["9:16 vertical (Reels)", "4:5 (feed + Reels)"], required: true },
      { key: "deadline", label: "Delivery Deadline", type: "text", required: true },
      { key: "additionalNotes", label: "Additional Notes", type: "textarea" },
    ],
    outputSections: ["overview", "deliverable", "mustHave", "hook", "music", "pacing", "caption", "vendors", "technical", "deadline"],
  },

  TIKTOK: {
    type: "TIKTOK",
    label: "TikTok",
    description: "Brief for a TikTok-native wedding clip optimized for the For You Page.",
    icon: "🎵",
    fields: [
      { key: "targetLength", label: "Target Length", type: "select", options: ["15–30 sec", "30–60 sec", "60–90 sec", "90 sec–3 min"], required: true },
      { key: "concept", label: "TikTok Concept / Angle", type: "textarea", placeholder: "Day-in-the-life, emotional moments, funny behind the scenes, trending format...", required: true },
      { key: "mustHaveMoments", label: "Key Clips to Include", type: "textarea", placeholder: "Specific moments to feature..." },
      { key: "hookMoment", label: "Hook (first 2–3 sec)", type: "textarea", placeholder: "What will stop the scroll? Surprising moment, text hook, strong visual..." },
      { key: "musicDirection", label: "Audio / Sound", type: "textarea", placeholder: "TikTok trending audio, voiceover, original ceremony audio, specific song...", required: true },
      { key: "textOverlay", label: "Text Overlays / Captions", type: "textarea", placeholder: "On-screen text, storytelling captions, POV text, names and date..." },
      { key: "pacing", label: "Pacing / Energy", type: "select", options: ["Fast & trendy", "Emotional & slow", "Mix of both"] },
      { key: "avoidMoments", label: "Moments to Avoid", type: "textarea" },
      { key: "deadline", label: "Delivery Deadline", type: "text", required: true },
      { key: "additionalNotes", label: "Additional Notes", type: "textarea" },
    ],
    outputSections: ["overview", "deliverable", "concept", "mustHave", "hook", "music", "text", "pacing", "avoid", "technical", "deadline"],
  },

  VENDOR_PROMO: {
    type: "VENDOR_PROMO",
    label: "Vendor Promo Clip",
    description: "Brief for a vendor-specific promo clip to deliver to vendors as a marketing asset.",
    icon: "🤝",
    fields: [
      { key: "vendorName", label: "Vendor Name", type: "text", required: true },
      { key: "vendorCategory", label: "Vendor Category", type: "select", options: ["Venue", "Florist", "Planner", "Caterer", "DJ/Band", "Hair & Makeup", "Dress/Attire", "Cake", "Photo Booth", "Transport", "Other"] },
      { key: "targetLength", label: "Clip Length", type: "select", options: ["15–30 sec", "30–60 sec", "60–90 sec"] },
      { key: "mustHaveMoments", label: "Vendor-Specific Moments to Feature", type: "textarea", placeholder: "Highlight their work — florals in detail shots, venue establishing, band performing...", required: true },
      { key: "aspectRatio", label: "Aspect Ratio", type: "select", options: ["9:16 (Instagram/TikTok)", "16:9 (YouTube/website)", "1:1 (Square)", "4:5 (feed)"], required: true },
      { key: "musicDirection", label: "Music Direction", type: "textarea", placeholder: "License-free, upbeat, neutral for vendor brand..." },
      { key: "textOverlay", label: "Text / Branding", type: "textarea", placeholder: "Vendor name overlay, website, Instagram handle, no text..." },
      { key: "instagramHandle", label: "Vendor Instagram Handle", type: "text", placeholder: "@vendorname" },
      { key: "deadline", label: "Delivery Deadline", type: "text" },
      { key: "deliveryFormat", label: "Delivery Format", type: "select", options: ["1080p H.264", "4K H.264", "Compressed for social"] },
      { key: "additionalNotes", label: "Additional Notes", type: "textarea" },
    ],
    outputSections: ["overview", "deliverable", "vendor", "mustHave", "music", "text", "technical", "deadline"],
  },

  PHOTO_CULLING: {
    type: "PHOTO_CULLING",
    label: "Photo Culling Brief",
    description: "Detailed culling instructions for a wedding photography gallery.",
    icon: "📸",
    fields: [
      { key: "totalImages", label: "Estimated Total Images to Cull", type: "text", placeholder: "e.g. 3,000 raw files" },
      { key: "targetDelivery", label: "Target Delivery Count", type: "text", placeholder: "e.g. 500–600 edited images", required: true },
      { key: "coverageOrder", label: "Coverage Order / Priority", type: "textarea", placeholder: "Getting ready, details, ceremony, portraits, reception — note priority order...", required: true },
      { key: "mustIncludeShots", label: "Must-Include Shot Types", type: "textarea", placeholder: "Altar shot every 5 min, all family formals, all bouquet/detail close-ups, every kiss variant..." },
      { key: "avoidImages", label: "Images to Exclude", type: "textarea", placeholder: "Eyes closed, backs to camera, misfires, unflattering moments the couple wouldn't want..." },
      { key: "duplicateHandling", label: "How to Handle Duplicates / Burst Series", type: "select", options: ["Keep best one only", "Keep 2–3 best from each burst", "Flag all, let photographer decide", "Keep the sharpest"] },
      { key: "faceCheckPriority", label: "Face Check Priority", type: "textarea", placeholder: "Prioritize sharp eyes on couple. Guest shots more lenient. Note any VIP guests..." },
      { key: "cameraAngles", label: "Camera / Lens Coverage Notes", type: "textarea", placeholder: "Second shooter files in separate folder, drone JPEGs to include, film scans to separate..." },
      { key: "deliveryMethod", label: "Delivery Method", type: "select", options: ["Lightroom catalog (picks flagged)", "Separate 'selects' folder", "Star ratings (5-star = best)", "Color labels in Lightroom"] },
      { key: "deadline", label: "Culling Deadline", type: "text", required: true },
      { key: "additionalNotes", label: "Additional Notes", type: "textarea" },
    ],
    outputSections: ["overview", "deliverable", "counts", "coverage", "mustInclude", "avoid", "duplicates", "delivery", "deadline"],
  },

  LIGHTROOM_EDITING: {
    type: "LIGHTROOM_EDITING",
    label: "Lightroom Editing Brief",
    description: "Complete editing instructions for Lightroom post-processing of a wedding gallery.",
    icon: "🎨",
    fields: [
      { key: "presetBase", label: "Preset / Base Style", type: "textarea", placeholder: "Specific preset name, your own preset to share, or style description...", required: true },
      { key: "colorProfile", label: "Color Science / Profile", type: "textarea", placeholder: "Adobe Color, Camera Neutral, custom profile, film simulation..." },
      { key: "exposureGuidance", label: "Exposure Guidance", type: "textarea", placeholder: "Slightly brighter, true to life, moody and underexposed, lift shadows on dark receptions..." },
      { key: "colorPreferences", label: "Color Preferences", type: "textarea", placeholder: "Warm skin tones, desaturated greens, cool/blue shadows, skin tone priority...", required: true },
      { key: "skinToneNotes", label: "Skin Tone Notes", type: "textarea", placeholder: "Couple's skin tone guide, HSL adjustments needed, avoid overly orange tones..." },
      { key: "blackAndWhite", label: "Black & White Conversions", type: "textarea", placeholder: "% of gallery in B&W? Which shots? How contrasty?" },
      { key: "lightingAdjustments", label: "Challenging Lighting Situations", type: "textarea", placeholder: "Mixed indoor/outdoor shots, dark reception with colored DJ lights, harsh midday sun..." },
      { key: "consistencyNotes", label: "Gallery Consistency Notes", type: "textarea", placeholder: "Keep ceremony set consistent, portraits can be slightly lighter, reception can be moodier..." },
      { key: "grainTexture", label: "Grain / Film Texture", type: "select", options: ["No grain", "Subtle grain", "Heavy film grain", "Match preset grain"] },
      { key: "outputSpecs", label: "Output Specs", type: "textarea", placeholder: "Export resolution, JPEG quality, sRGB vs AdobeRGB, file naming convention..." },
      { key: "deadline", label: "Editing Deadline", type: "text", required: true },
      { key: "referenceLinks", label: "Style Reference Links", type: "multitext", placeholder: "https://..." },
      { key: "additionalNotes", label: "Additional Notes", type: "textarea" },
    ],
    outputSections: ["overview", "deliverable", "preset", "colorProfile", "exposure", "colorGuide", "skinTones", "bw", "lighting", "consistency", "output", "deadline"],
  },
};

export const BRIEF_TYPE_LABELS: Record<BriefType, string> = Object.fromEntries(
  Object.entries(BRIEF_TEMPLATES).map(([k, v]) => [k, v.label])
) as Record<BriefType, string>;

export function getBriefTemplate(type: BriefType): BriefTemplate {
  return BRIEF_TEMPLATES[type];
}

export const FREE_BRIEF_TYPES: BriefType[] = ["WEDDING_FILM", "SOCIAL_REEL", "PHOTO_CULLING"];
