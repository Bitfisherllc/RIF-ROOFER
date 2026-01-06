'use client';

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlayCircle,
  faFilm,
  faGraduationCap,
  faShieldAlt,
  faBuilding,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

interface Video {
  id: string;
  title: string;
  url: string;
  description: string;
  category: 'buyer-education' | 'performance-proof' | 'brand-explainer' | 'informational';
}

const videos: Video[] = [
  // Buyer Education / Informational
  {
    id: 'HnRlQ6E0Z8s',
    title: 'Stone Coated Steel Roofing (Benefits Overview)',
    url: 'https://www.youtube.com/watch?v=HnRlQ6E0Z8s',
    description:
      'A homeowner-friendly overview that explains stone coated steel as a premium metal roofing option and highlights commonly cited benefits like durability, impact resistance, longevity, and overall performance compared to traditional roofing materials.',
    category: 'buyer-education',
  },
  {
    id: 'hskE7mJ-cOg',
    title: 'DECRA Metal Roofing – Overview',
    url: 'https://www.youtube.com/watch?v=hskE7mJ-cOg',
    description:
      "A manufacturer-style explainer introducing DECRA's stone-coated metal roofing: what it is, what it's designed to do, and the main reasons homeowners consider it (appearance options paired with engineered protection).",
    category: 'brand-explainer',
  },
  {
    id: 'vGtWSLcGdcU',
    title: 'Unified Steel™ Stone Coated Roofing | Westlake Royal Roofing',
    url: 'https://www.youtube.com/watch?v=vGtWSLcGdcU',
    description:
      "A product/brand overview that explains Unified Steel's stone-coated roofing concept, emphasizing how stone-coated steel aims to deliver enhanced protection with multiple aesthetic profiles for residential design styles.",
    category: 'brand-explainer',
  },
  {
    id: 'Dlv_2gahezs',
    title: 'Why You Need a Stone-Coated Steel Roof | Pete Croft',
    url: 'https://www.youtube.com/watch?v=Dlv_2gahezs',
    description:
      'An educational "why it matters" talk that frames stone-coated steel in terms of performance categories (like fire rating and resilience), and explains why it\'s often positioned as a premium upgrade over common roof types.',
    category: 'buyer-education',
  },
  {
    id: 'YDR3oWU8xtw',
    title: 'Why Metal Roofing? | Pete Croft | Unified Steel',
    url: 'https://www.youtube.com/watch?v=YDR3oWU8xtw',
    description:
      'A broader metal-roofing explainer that includes stone-coated steel as a category, focusing on what makes the system appealing long-term and why it\'s used as an alternative to conventional shingle roofing.',
    category: 'buyer-education',
  },
  {
    id: 'QjAi4Eqkqd0',
    title: 'Stone-Coated Steel Vs. Tile Roof (Explained)',
    url: 'https://www.youtube.com/watch?v=QjAi4Eqkqd0',
    description:
      'A clear comparison video explaining how stone-coated steel "tile-look" panels differ from traditional tile roofs, including what the material actually is and why people choose it as a lightweight "tile aesthetic" alternative.',
    category: 'buyer-education',
  },
  {
    id: 'mcxpORO0nfs',
    title: 'Standing Seam Metal Roof Vs Stone Coated Steel Roof',
    url: 'https://www.youtube.com/watch?v=mcxpORO0nfs',
    description:
      'A straightforward comparison between two premium metal roof categories—standing seam vs. stone-coated steel—framed around how they differ in look, system type, and typical reasons a homeowner might prefer one over the other.',
    category: 'buyer-education',
  },
  {
    id: 'x6LC3HMhCAc',
    title: 'Standing Seam vs Exposed Fastener vs Stone Coated Steel',
    url: 'https://www.youtube.com/watch?v=x6LC3HMhCAc',
    description:
      'A high-level "types of metal roofs" breakdown that places stone-coated steel alongside standing seam and exposed-fastener systems, describing the pros/cons and the decision logic homeowners use.',
    category: 'buyer-education',
  },
  {
    id: 'fQyWPCVshyc',
    title: 'Stone Coated Steel Roofing 2023 Pros and Cons',
    url: 'https://www.youtube.com/watch?v=fQyWPCVshyc',
    description:
      'A pros/cons explainer that describes the value proposition of stone-coated steel in plain language—why it\'s popular in storm-prone markets, what it does well, and what tradeoffs a buyer should understand.',
    category: 'buyer-education',
  },
  {
    id: 'zFdo7l-L6l8',
    title: 'The Truth About Stone Coated Roofs for Residential Homes',
    url: 'https://www.youtube.com/watch?v=zFdo7l-L6l8',
    description:
      'A cautionary/critical take that discusses when stone-coated systems might not be the best fit for every home—useful for balancing your content so it\'s not all marketing and includes buyer considerations.',
    category: 'buyer-education',
  },
  {
    id: 'aovPeXjdPTI',
    title: 'Considering a Stone-Coated Metal Roof for your home…',
    url: 'https://www.youtube.com/watch?v=aovPeXjdPTI',
    description:
      'An informational discussion describing what stone-coated metal roofs are (steel panels with a granular/stone finish), how they compare to asphalt shingles visually, and what factors homeowners should weigh before choosing them.',
    category: 'informational',
  },
  {
    id: 'glarMLbLg5Y',
    title: 'Stone Coated Steel Roofing: The Ultimate Guide',
    url: 'https://www.youtube.com/watch?v=glarMLbLg5Y',
    description:
      'A "guide-format" video that aims to define stone-coated steel roofing, summarize how it\'s made/structured, and outline the common reasons it\'s chosen (durability + curb appeal + long service life).',
    category: 'informational',
  },
  {
    id: 'vxcThsyEXnQ',
    title: 'Why Homeowners Are Switching to Stone Coated Metal Roofs',
    url: 'https://www.youtube.com/watch?v=vxcThsyEXnQ',
    description:
      'A homeowner-oriented explainer that frames stone-coated metal as a way to get a tile-like look with steel\'s strength, focusing on "why switch" decision points rather than installation details.',
    category: 'informational',
  },
  {
    id: 'VD8x0y_Wk0k',
    title: 'Best Stone Coated Roof? (Westlake interview/discussion)',
    url: 'https://www.youtube.com/watch?v=VD8x0y_Wk0k',
    description:
      'A Q&A/interview style video that discusses whether stone-coated steel is "worth the cost," featuring a Westlake Royal representative and focusing on value, performance, and buyer questions.',
    category: 'buyer-education',
  },
  {
    id: 'NUYA51h-_DQ',
    title: 'Does the "Perfect" Florida Roof Exist? | Stone Coated Steel',
    url: 'https://www.youtube.com/watch?v=NUYA51h-_DQ',
    description:
      'A Florida-leaning informational piece that frames stone-coated steel around harsh-weather needs (wind/storm resilience themes), aimed at helping homeowners understand why this roof type is often recommended in the state.',
    category: 'informational',
  },
  {
    id: 'B_6KtQGoUv8',
    title: 'Pro Insight: Why Unified Steel is the Top Roofing Choice (Trademark Roofing)',
    url: 'https://www.youtube.com/watch?v=B_6KtQGoUv8',
    description:
      'A contractor-perspective explainer focused on why a pro might recommend Unified Steel stone-coated roofing, touching on performance positioning and homeowner-facing benefits.',
    category: 'brand-explainer',
  },
  {
    id: 'ZXkTBAjDWQ4',
    title: 'Why Pros and Homeowners Trust Unified Steel Roofing',
    url: 'https://www.youtube.com/watch?v=ZXkTBAjDWQ4',
    description:
      'A "what it is / why it works" breakdown that describes the material (stone-coated metal product) and emphasizes durability and weight advantages as part of the sales/education narrative.',
    category: 'brand-explainer',
  },
  {
    id: 'HdwuQPG16lc',
    title: 'Stone Coated Steel Roofing Systems (explainer)',
    url: 'https://www.youtube.com/watch?v=HdwuQPG16lc',
    description:
      'A general informational overview that positions stone-coated steel as a Class A fire-rated system and explains the "looks like other materials, performs like steel" idea that drives demand.',
    category: 'informational',
  },
  // Performance Proof
  {
    id: '4rM7HTQGJQU',
    title: 'Tilcor Roof Fire Demonstration (Class A positioning)',
    url: 'https://www.youtube.com/watch?v=4rM7HTQGJQU',
    description:
      'A fire-focused demonstration video that supports the "won\'t burn / fire rating" messaging often used to explain stone-coated steel\'s safety/performance benefits.',
    category: 'performance-proof',
  },
  {
    id: 'eIuPh6qOh8U',
    title: 'Stone Coated Steel Roof vs Hurricane Ida (homeowner story)',
    url: 'https://www.youtube.com/watch?v=eIuPh6qOh8U',
    description:
      'A storm-performance testimonial that uses Hurricane Ida as the real-world context to discuss why a stone-coated steel roof was chosen and how it held up compared to surrounding damage.',
    category: 'performance-proof',
  },
  {
    id: 'TVm5-JXs97U',
    title: 'Metal Roofing Tougher than Hurricane Ida (stone-coated angle)',
    url: 'https://www.youtube.com/watch?v=TVm5-JXs97U',
    description:
      'A "performance under extreme weather" video that ties hurricane survival stories to metal roofing (including stone-coated steel) without going deep into installation, useful for durability messaging.',
    category: 'performance-proof',
  },
  {
    id: 'wuXWbcC3Tfk',
    title: 'How Does a Metal Roof Hold Up Vs. Hail Storm (stone-coated context)',
    url: 'https://www.youtube.com/watch?v=wuXWbcC3Tfk',
    description:
      'A hail-performance explainer discussing how stone-coated steel roofs can fare in hail events, framing the material choice around impact resistance and storm-region practicality.',
    category: 'performance-proof',
  },
  {
    id: '-ZVezW6082E',
    title: 'Stone Coated Metal Roof Tile Hail Testing',
    url: 'https://www.youtube.com/watch?v=-ZVezW6082E',
    description:
      'A short testing-style clip focused on hail/impact behavior for stone-coated metal tile products—useful as supporting media when you\'re writing about Class 4 / impact resistance themes.',
    category: 'performance-proof',
  },
  {
    id: 'EWNTbdYI6oM',
    title: 'RAC™ Stone Coating Hail Test (research/testing)',
    url: 'https://www.youtube.com/watch?v=EWNTbdYI6oM',
    description:
      'A lab/testing-oriented hail video that\'s useful for "proof-style" content—less narrative, more demonstration—when you want to cite test visuals for stone-coated systems.',
    category: 'performance-proof',
  },
  // Brand Explainer
  {
    id: 'hsS_9TlGuHs',
    title: 'DECRA Metal Roofing – Manufacturing Plant',
    url: 'https://www.youtube.com/watch?v=hsS_9TlGuHs',
    description:
      'A factory/manufacturing look that helps explain stone-coated metal roofing by showing the product context (made in a plant, profile manufacturing, brand-level production) rather than jobsite installation.',
    category: 'brand-explainer',
  },
  // Batch 2 - Additional Videos
  {
    id: 'JZm8LJSFdzo',
    title: 'What is DECRA Stone Coated Steel Roofing? | Benefits Explained',
    url: 'https://www.youtube.com/watch?v=JZm8LJSFdzo',
    description:
      'A plain-language explainer focused on what DECRA\'s stone-coated steel roofing is and why it\'s positioned as a premium "lifetime" roof category, typically emphasizing durability, aesthetics, and performance advantages homeowners care about.',
    category: 'brand-explainer',
  },
  {
    id: 'CkTBF5P3-ps',
    title: 'What are the different types of stone-coated metal roofing?',
    url: 'https://www.youtube.com/watch?v=CkTBF5P3-ps',
    description:
      'A quick educational breakdown that treats stone-coated metal roofing as a category and explains the different style/profile options people commonly see (tile-look, shake-look, shingle-look), helping viewers understand that "stone-coated" isn\'t just one product shape.',
    category: 'informational',
  },
  {
    id: 'mV7Npk8wsMk',
    title: 'Stone Coated Steel Roof Review: Solarshield Metal Roofing',
    url: 'https://www.youtube.com/watch?v=mV7Npk8wsMk',
    description:
      'A review-style video discussing stone-coated steel roofing as a product choice, typically framed around why someone would choose it and what the results look/feel like in real life, rather than how to install it.',
    category: 'informational',
  },
  {
    id: '1pWOosbawx0',
    title: 'Gerard Stone Coated Steel Roof — 4 Years After Installation',
    url: 'https://www.youtube.com/watch?v=1pWOosbawx0',
    description:
      'A "longer-term ownership" style check-in that focuses on how a Gerard stone-coated steel roof has held up over time, touching on appearance retention and durability impressions years after the project.',
    category: 'performance-proof',
  },
  {
    id: 'AeqLgSchfQo',
    title: 'Is Stone Coated Steel roofing right for you?',
    url: 'https://www.youtube.com/watch?v=AeqLgSchfQo',
    description:
      'A buyer-facing decision video that frames stone-coated steel as an upgrade option and talks through who it\'s best for (people tired of re-roofing, storm markets, long-term ownership), with emphasis on pros/why-it-fits rather than installation steps.',
    category: 'buyer-education',
  },
  {
    id: '3ZM2zL3nNUs',
    title: 'Tilcor Metal Roofing vs Asphalt Shingles',
    url: 'https://www.youtube.com/watch?v=3ZM2zL3nNUs',
    description:
      'A material comparison video that explains why a stone-coated steel system (Tilcor) is often compared to asphalt shingles, typically covering durability, longevity, and appearance/value arguments at a high level.',
    category: 'buyer-education',
  },
  {
    id: 'tVEUuD3X6eU',
    title: 'Is a Stone Coated Steel Metal Roof the Ultimate Roof?',
    url: 'https://www.youtube.com/watch?v=tVEUuD3X6eU',
    description:
      'A "big-picture" video that frames stone-coated steel as a potential top-tier roofing option and explains the why (durability, longevity, storm performance), typically aimed at homeowners evaluating premium upgrades.',
    category: 'buyer-education',
  },
  {
    id: 'y3CaRwXydTU',
    title: 'Stone Coated Steel for the informed buyer/seller!',
    url: 'https://www.youtube.com/watch?v=y3CaRwXydTU',
    description:
      'A more industry/education-oriented talk that still explains what stone-coated steel is and how its value proposition is typically presented—useful for messaging, sales framing, and homeowner education language.',
    category: 'buyer-education',
  },
  {
    id: 'Oo0un0IMBao',
    title: 'The ULTIMATE Roof Upgrade — Stone Coated Steel!',
    url: 'https://www.youtube.com/watch?v=Oo0un0IMBao',
    description:
      'A buyer-focused "upgrade" explainer that usually hits the headline reasons people choose stone-coated steel—often including energy efficiency, durability, and long-term value—without centering on installation.',
    category: 'buyer-education',
  },
  {
    id: '8YURXRXx_sE',
    title: 'Epic Journey for the PERFECT Roof: Stone Coated Steel',
    url: 'https://www.youtube.com/watch?v=8YURXRXx_sE',
    description:
      'A story/decision narrative that frames stone-coated steel as a "best fit" solution and explains the reasoning (durability, energy efficiency, aesthetics), which makes it useful content for a homeowner research phase.',
    category: 'buyer-education',
  },
  {
    id: 'XQ9SK_aZJes',
    title: 'A DECRA Metal Roof is the Best Money can Buy — and here is Why',
    url: 'https://www.youtube.com/watch?v=XQ9SK_aZJes',
    description:
      'A strong-opinion style informational video that explains why DECRA (stone-coated metal) is considered top-tier by some contractors/owners, typically touching on performance categories like hail, longevity, and overall lifecycle value.',
    category: 'brand-explainer',
  },
  {
    id: 'P5Oi_F-SRFM',
    title: 'Asphalt Shingle vs Metal Roofing After a Huge Colorado Hail Storm',
    url: 'https://www.youtube.com/watch?v=P5Oi_F-SRFM',
    description:
      'A real-world performance comparison framed around hail damage, often discussing how stone-coated steel and other metal options compare to asphalt shingles after a major event—great for "why it matters" durability content.',
    category: 'performance-proof',
  },
  {
    id: 'TYRd7Zt4SOU',
    title: 'Metro stone-coated steel roof systems (overview)',
    url: 'https://www.youtube.com/watch?v=TYRd7Zt4SOU',
    description:
      'A product-category overview that explains Metro\'s stone-coated steel system concept and the idea of multiple profiles, usually aimed at helping viewers understand options and "what it is" at a high level.',
    category: 'brand-explainer',
  },
  {
    id: 'F9Vg0dAsvNY',
    title: 'Why a Metal Roof Could Save You $30,000 (and Beat Inflation)',
    url: 'https://www.youtube.com/watch?v=F9Vg0dAsvNY',
    description:
      'A cost/value framing video that discusses metal roofing—commonly including stone-coated steel—through a lifecycle lens (replacement avoidance, longer service life), which is useful for "why pay more up front?" education.',
    category: 'buyer-education',
  },
  // Batch 3 - Additional Videos
  {
    id: '7ZSfETxGmqo',
    title: 'Why Stone Coated Metal Roofing is Better Than… (CKSteel)',
    url: 'https://www.youtube.com/watch?v=7ZSfETxGmqo',
    description:
      'This video explains stone coated metal roofing as a "permanent" roofing category and walks through the big-picture reasons people choose it (durability, long service life, and peace-of-mind positioning) in a simple, homeowner-friendly pitch format.',
    category: 'buyer-education',
  },
  {
    id: 'gUd-sFqcSwQ',
    title: 'Stop Installing Asphalt Shingles, Go With Stone Coated Steel Roofing',
    url: 'https://www.youtube.com/watch?v=gUd-sFqcSwQ',
    description:
      'A persuasive, informational video aimed at homeowners (and contractors) that frames stone coated steel as the smarter long-term alternative to asphalt shingles, emphasizing typical selling points like resilience, fire performance messaging, and "upgrade once" value.',
    category: 'buyer-education',
  },
  {
    id: '6GLunhI5Txk',
    title: 'DECRA Stone Coated Steel (benefits discussion)',
    url: 'https://www.youtube.com/watch?v=6GLunhI5Txk',
    description:
      'A short discussion-style video that focuses on the benefits of upgrading to DECRA stone-coated steel, positioned as an overview of why the material category stands out compared to more common roofing choices.',
    category: 'brand-explainer',
  },
  {
    id: 'wKdCZ0-os_4',
    title: 'Is This the Ultimate Metal Roof? Stone Coated Metal Roofing (overview)',
    url: 'https://www.youtube.com/watch?v=wKdCZ0-os_4',
    description:
      'A contractor-style overview of stone-coated metal roofing that talks about what makes it "solid" as a material choice and discusses performance themes like impact resistance in plain language (more "what it is / why choose it" than how-to).',
    category: 'informational',
  },
  {
    id: 'W4faHWrYNU8',
    title: 'Stone Coated Metal Roofing Sheets/Tiles — Complete Guide',
    url: 'https://www.youtube.com/watch?v=W4faHWrYNU8',
    description:
      'A "complete guide" explainer that defines stone-coated metal roofing sheets/tiles and summarizes why they\'re popular (durability + appearance), giving you solid language and framing for educational content.',
    category: 'informational',
  },
  {
    id: 'djAzB1T2Sxg',
    title: 'What Is Sangobuild Stone Coated Metal Roof Tile?',
    url: 'https://www.youtube.com/watch?v=djAzB1T2Sxg',
    description:
      'An informational product-category explainer describing what a stone-coated metal roof tile is (as a modern roofing solution), focusing on the "what and why" rather than installation steps.',
    category: 'informational',
  },
  {
    id: 'BiRqxs5C6rU',
    title: 'Sangobuild Stone-Coated Metal Roof Tile Performance Tests',
    url: 'https://www.youtube.com/watch?v=BiRqxs5C6rU',
    description:
      'A testing/demo video that\'s useful for "proof content" — it presents performance testing concepts for stone-coated metal tiles and helps support durability claims with visuals rather than marketing-only statements.',
    category: 'performance-proof',
  },
  {
    id: 'obKUk0vH3Kk',
    title: 'Stone Coated Metal Roofing Tile Factory Show',
    url: 'https://www.youtube.com/watch?v=obKUk0vH3Kk',
    description:
      'A factory-focused video that helps explain stone coated metal roofing by showing manufacturing context. It\'s useful when you want content about "what this product is" and how it\'s produced/handled (not how it\'s installed).',
    category: 'informational',
  },
  {
    id: 'D1BXVoosppA',
    title: 'Disadvantages of Stone Coated Roofing Sheet',
    url: 'https://www.youtube.com/watch?v=D1BXVoosppA',
    description:
      'A "cons" video that discusses drawbacks/limitations of stone-coated roofing sheets from a manufacturer perspective. This is great for balancing your library with buyer caution points and objections people commonly ask about.',
    category: 'buyer-education',
  },
  {
    id: 'knSZpjln-Q0',
    title: 'Stone-Coated Roof Tiles: Wind & Fire-Resistant / Hail-Resistant (short)',
    url: 'https://www.youtube.com/watch?v=knSZpjln-Q0',
    description:
      'A quick informational clip emphasizing the core performance positioning of stone-coated roof tiles—wind, fire, hail resistance—and long-term durability messaging, useful as a "bite-size" explainer.',
    category: 'performance-proof',
  },
  {
    id: 'vZR0CUp7U6I',
    title: 'Rain Noise Proof Roof — Stone Coated Roofing Sheet (short)',
    url: 'https://www.youtube.com/shorts/vZR0CUp7U6I',
    description:
      'A short that focuses on a key homeowner concern—rain noise—presenting stone-coated roofing sheets as a quieter option than people assume when they hear "metal roof."',
    category: 'informational',
  },
  {
    id: 'sc4h5QXs9iY',
    title: 'Why Are Stone-Coated Roofing Tiles Becoming Popular? (short)',
    url: 'https://www.youtube.com/shorts/sc4h5QXs9iY',
    description:
      'A short-form explainer that summarizes why stone-coated roofing keeps gaining popularity, typically emphasizing service life, durability, and comfort factors like noise reduction.',
    category: 'informational',
  },
  {
    id: '1czQmbh3YS4',
    title: 'STOCO Stone Coated Roof Tiles — Stylish, Durable (short)',
    url: 'https://www.youtube.com/shorts/1czQmbh3YS4',
    description:
      'A quick "feature snapshot" explaining stone coated tiles as steel-based products marketed for durability and lifestyle comfort features (including noise resistance claims), useful for short-form content ideas.',
    category: 'informational',
  },
  {
    id: '-8L0xal8jwE',
    title: 'What Is Stone Coated Roofing Sheet? (short)',
    url: 'https://www.youtube.com/shorts/-8L0xal8jwE',
    description:
      'A compact "definition" style short that answers the basic question directly—what stone coated roofing sheets are—ideal for top-of-funnel viewers who are brand new to the category.',
    category: 'informational',
  },
  {
    id: 'd5OhYAmz94U',
    title: 'Stone Granules Bending Test of Stone Coated Roof Tile',
    url: 'https://www.youtube.com/watch?v=d5OhYAmz94U',
    description:
      'A testing-oriented clip focused on material behavior/quality (granules / coating performance). This is helpful when you want content supporting the "coating isn\'t just cosmetic" explanation.',
    category: 'performance-proof',
  },
  {
    id: 'tFsnPs7Dy6c',
    title: 'Boral Stone Coated Metal Roofing — How RoofingFoil Works (heat/radiant)',
    url: 'https://www.youtube.com/watch?v=tFsnPs7Dy6c',
    description:
      'An informational video that uses stone-coated metal roofing as the context to explain heat/radiant concepts (via roofing foil). It\'s useful for energy-efficiency conversations adjacent to stone-coated systems.',
    category: 'informational',
  },
  {
    id: 'y9az2iUtHN4',
    title: 'How to Choose the Best Roofing Material for Your Home (includes stone-coated steel segment)',
    url: 'https://www.youtube.com/watch?v=y9az2iUtHN4',
    description:
      'A broader "choose your roof material" video that explicitly includes stone-coated steel as a premium category in the comparison set. Useful for prospects still deciding between multiple roof types.',
    category: 'buyer-education',
  },
  {
    id: 'bKKjgv4B6lA',
    title: 'Day 2 — North American Workshop on Hail & Hailstorms (includes stone-coated metal tile roof systems segment)',
    url: 'https://www.youtube.com/watch?v=bKKjgv4B6lA',
    description:
      'A long-form, research/event recording that includes discussion of stone-coated metal tile roof systems in a broader hail-science context. Great when you want more "technical" credibility content to pull from.',
    category: 'performance-proof',
  },
  // Batch 4 - Additional Videos
  {
    id: '02zoBMR6fI4',
    title: 'The Look You Love – Without the Weight | Unified Steel Stone-Coated Roofing',
    url: 'https://www.youtube.com/watch?v=02zoBMR6fI4',
    description:
      'A category explainer built around a simple buyer question: "How do I get the look of shake/tile/shingles without the weight?" It presents stone-coated steel as the solution, emphasizing style options paired with steel performance.',
    category: 'buyer-education',
  },
  {
    id: 'esc3my1s8VA',
    title: 'Why Trademark Roofing Leads with Unified Steel Stone-Coated Roofing',
    url: 'https://www.youtube.com/watch?v=esc3my1s8VA',
    description:
      'A contractor testimonial/explainer that describes why stone-coated steel is favored in their offering, commonly framed around reduced callbacks and long-term performance confidence.',
    category: 'brand-explainer',
  },
  {
    id: 'Gs0DtA0OZT0',
    title: 'Standing Behind Every Roof | Unified Steel Stone Coated Roofing',
    url: 'https://www.youtube.com/watch?v=Gs0DtA0OZT0',
    description:
      'An informational brand video centered on warranty/assurance messaging—how stone-coated steel is backed and what the long-term protection narrative looks like for buyers evaluating "forever roof" options.',
    category: 'brand-explainer',
  },
  {
    id: 'WtTDBcAx3ZQ',
    title: 'Is A Stone Coated Steel Metal Roof Right For You?',
    url: 'https://www.youtube.com/watch?v=WtTDBcAx3ZQ',
    description:
      'A buyer-fit video that\'s structured around decision-making: who stone-coated steel is best for, what to consider before choosing it, and why it\'s positioned as a premium alternative (including energy-efficiency style framing).',
    category: 'buyer-education',
  },
  {
    id: 'TT2uEoWJ8wI',
    title: 'The Pros of Stone Coated Metal Roofing – GMR Metal Roofs Florida',
    url: 'https://www.youtube.com/watch?v=TT2uEoWJ8wI',
    description:
      'A straightforward "pros" overview from a Florida contractor that explains why stone-coated metal is recommended in their market, focusing on benefits and buyer concerns rather than installation technique.',
    category: 'buyer-education',
  },
  {
    id: 'yQPFi7hW4Q0',
    title: 'Debunking Metal Roof Myths: What Homeowners Need to Know',
    url: 'https://www.youtube.com/watch?v=yQPFi7hW4Q0',
    description:
      'A myth-busting educational video that addresses common homeowner misconceptions about metal roofs and explicitly references the benefits of stone-coated steel systems as part of the explanation.',
    category: 'buyer-education',
  },
  {
    id: 'bWIdOqALlNY',
    title: '11 Reasons You Should NOT Buy a Metal Roof',
    url: 'https://www.youtube.com/watch?v=bWIdOqALlNY',
    description:
      'A cautionary "buyer balance" video that lists scenarios where metal roofing may not be the right fit (budget, design constraints, expectations), useful for handling objections when people are considering premium systems like stone-coated steel.',
    category: 'buyer-education',
  },
  {
    id: 'LWui87XkBuU',
    title: 'Roofing Explained – Episode 16: New Metal Roof or Asphalt',
    url: 'https://www.youtube.com/watch?v=LWui87XkBuU',
    description:
      'A comparison/decision video that discusses metal versus asphalt and includes stone-coated steel as one of the metal roof categories, helping buyers understand tradeoffs and "which roof type fits my situation" thinking.',
    category: 'buyer-education',
  },
  // Batch 5 - Additional Videos
  {
    id: 'di3xjIy7fn8',
    title: 'The History of DECRA Roofing Systems',
    url: 'https://www.youtube.com/watch?v=di3xjIy7fn8',
    description:
      'A background video explaining DECRA\'s brand/history positioning in the stone-coated steel space, useful when you want non-install content that adds credibility and context for what the category is and how it developed.',
    category: 'brand-explainer',
  },
  {
    id: 'rv3fl7ibids',
    title: 'DECRA products and its numerous benefits',
    url: 'https://www.youtube.com/watch?v=rv3fl7ibids',
    description:
      'A compact informational overview of DECRA\'s product line and benefits messaging—helpful for pulling standard "what it is / why it\'s different" language without focusing on installation steps.',
    category: 'brand-explainer',
  },
  {
    id: 'ro3ZsV7QtJ0',
    title: 'DECRA Stone Coated Steel Shingle (overview clip)',
    url: 'https://www.youtube.com/watch?v=ro3ZsV7QtJ0',
    description:
      'A short product-oriented overview emphasizing the stone-coated steel shingle concept and warranty positioning, useful as supporting media for "what is it" pages and quick buyer explanations.',
    category: 'brand-explainer',
  },
  {
    id: 'b3PopphvU_o',
    title: 'MRA: Why Metal Roofing? (industry overview)',
    url: 'https://www.youtube.com/watch?v=b3PopphvU_o',
    description:
      'An industry-level educational video about why metal roofing is chosen (often including energy-savings and resilience drivers). This is useful as high-level context alongside stone-coated steel-specific videos.',
    category: 'informational',
  },
  {
    id: 'HazXqv1x7bo',
    title: 'Tilcor Roofing Tiles: With 50 Years Warranty',
    url: 'https://www.youtube.com/watch?v=HazXqv1x7bo',
    description:
      'A product-category explainer centered on warranty and lightweight positioning for Tilcor stone-coated steel tiles, useful for "why this category" messaging without being an install tutorial.',
    category: 'brand-explainer',
  },
  {
    id: '7-kAwK5aZa0',
    title: 'Gerard Roofing Systems – World\'s Best Stone Coated Roof Tiles',
    url: 'https://www.youtube.com/watch?v=7-kAwK5aZa0',
    description:
      'A brand overview that highlights GERARD\'s stone-coated roof tile positioning, typically focusing on durability claims and warranty narrative as the core "why it\'s premium" explanation.',
    category: 'brand-explainer',
  },
  {
    id: '7oompgc9CBY',
    title: 'WATCH THIS BEFORE YOU BUY NEW ZEALAND GERARD (buyer guidance)',
    url: 'https://www.youtube.com/watch?v=7oompgc9CBY',
    description:
      'A buyer-warning/education style video aimed at helping people avoid poor-quality outcomes when purchasing GERARD-style stone-coated products, framed as pre-purchase guidance rather than installation.',
    category: 'buyer-education',
  },
  {
    id: 'njRm4gNjaUU',
    title: 'Stone Coated Metal Roofing Tiles | Advantages & Factory Direct',
    url: 'https://www.youtube.com/watch?v=njRm4gNjaUU',
    description:
      'An informational "advantages" overview that explains stone-coated metal tiles as a blend of steel strength with a stone/granule finish, presented as an upgrade path with durability + aesthetics messaging.',
    category: 'informational',
  },
  {
    id: 'RVdRxD6nzN4',
    title: 'Stone Coated Metal Roofing Tiles (long-term investment pitch)',
    url: 'https://www.youtube.com/watch?v=RVdRxD6nzN4',
    description:
      'A product explainer framed around durability and style as a long-term investment, useful for general "what it is" content when you want broad-market (non-install) messaging.',
    category: 'buyer-education',
  },
  {
    id: '8UlovXnQA-M',
    title: 'Stone Coated Steel Roof in Windermere, FL | Unified Steel',
    url: 'https://www.youtube.com/watch?v=8UlovXnQA-M',
    description:
      'A case-study style overview focused on why stone-coated steel was chosen, highlighting performance positioning like Class 4 hail resistance and hurricane wind-rating themes, without being an install walkthrough.',
    category: 'performance-proof',
  },
  {
    id: 'iqYn3sSRCZA',
    title: 'Is a Metal Roof Noisy When It Rains?',
    url: 'https://www.youtube.com/watch?v=iqYn3sSRCZA',
    description:
      'A practical homeowner concern video about rain noise on metal roofing. Even though it\'s broader than stone-coated steel, it\'s useful because noise is a common objection—and stone-coated systems are frequently discussed in that context.',
    category: 'informational',
  },
  {
    id: 'QXGFtUwjYJM',
    title: 'SCG Metal Roof reduces noise (rain-noise angle)',
    url: 'https://www.youtube.com/watch?v=QXGFtUwjYJM',
    description:
      'A noise-focused informational clip that positions certain coated metal roof systems as quieter in rain, useful for objection-handling and "comfort" messaging around coated/stone-finish metal roofing.',
    category: 'informational',
  },
  {
    id: 'lo0lOQO6RHE',
    title: 'Noise reduction roof (stone-coated metal roof framing)',
    url: 'https://www.youtube.com/watch?v=lo0lOQO6RHE',
    description:
      'Another rain-noise oriented explainer that positions coated metal roofing as a comfort upgrade by reducing perceived noise compared to conventional metal sheets.',
    category: 'informational',
  },
  {
    id: 'p8mTo9F76hk',
    title: 'Price of Stone Coated Roofing Sheets (regional pricing explainer)',
    url: 'https://www.youtube.com/watch?v=p8mTo9F76hk',
    description:
      'A pricing-focused informational video discussing stone-coated roofing sheets cost (region-specific). Useful if you want "budget expectations" content, with the caveat that pricing varies by market and date.',
    category: 'buyer-education',
  },
  {
    id: 'ooKrPxtE10o',
    title: 'Are Metal Roofs Worth The Expense?',
    url: 'https://www.youtube.com/watch?v=ooKrPxtE10o',
    description:
      'A value/ROI style video that frames premium metal roofing (including stone-coated steel) as a long-term expense tradeoff, useful for buyer education when people ask whether the upgrade cost is justified.',
    category: 'buyer-education',
  },
  // Batch 6 - Additional Videos
  {
    id: 'kPE8y-qeM4E',
    title: 'Why Unified Steel Roofing Products?',
    url: 'https://www.youtube.com/watch?v=kPE8y-qeM4E',
    description:
      'A short informational video that frames Unified Steel stone-coated roofing in terms of why it exists as a product category—positioning, benefits, and what it\'s meant to solve for homeowners who want longevity and performance.',
    category: 'brand-explainer',
  },
  {
    id: 'MzSbIviL8F8',
    title: 'Built Strong in the USA | Unified Steel Roofing (Westlake)',
    url: 'https://www.youtube.com/watch?v=MzSbIviL8F8',
    description:
      'A manufacturing/brand-positioning video that explains the "made in the USA" angle for Unified Steel and ties that to reliability and long-term durability themes used in stone-coated steel roofing education.',
    category: 'brand-explainer',
  },
  {
    id: 'pUAPB8xHOKg',
    title: 'Strength & Resilience of Unified Steel Stone Coated Roofing',
    url: 'https://www.youtube.com/watch?v=pUAPB8xHOKg',
    description:
      'A performance-positioning explainer emphasizing resilience themes (often hurricane/wind durability messaging) to help homeowners understand why stone-coated steel is marketed as a protective upgrade.',
    category: 'brand-explainer',
  },
  // Batch 7 - Additional Videos
  {
    id: 'w9mX66zUN8Y',
    title: 'Tilcor Stone-Coated Steel Roofing Explainer',
    url: 'https://www.youtube.com/watch?v=w9mX66zUN8Y',
    description:
      'A homeowner-oriented Tilcor explainer that frames stone-coated steel roofing around the "why" (appearance + thermal/performance goals) and helps viewers understand what they\'re actually buying when they choose a stone-coated steel system.',
    category: 'brand-explainer',
  },
  {
    id: '8xg6QKcoImE',
    title: 'Gerard Roofing Systems History & Heritage',
    url: 'https://www.youtube.com/watch?v=8xg6QKcoImE',
    description:
      'A history/background video explaining Gerard Roofing Systems\' positioning and heritage in steel roof tile production—useful for "who makes this category and how it evolved" content.',
    category: 'brand-explainer',
  },
];

const categories = [
  {
    id: 'all' as const,
    name: 'All Videos',
    icon: faFilm,
    description: 'Browse all stone-coated metal roofing videos',
  },
  {
    id: 'buyer-education' as const,
    name: 'Buyer Education',
    icon: faGraduationCap,
    description: 'Learn about stone-coated metal roofing, pros/cons, comparisons, and value',
  },
  {
    id: 'performance-proof' as const,
    name: 'Performance Proof',
    icon: faShieldAlt,
    description: 'See real-world performance: hail tests, hurricane stories, fire demonstrations',
  },
  {
    id: 'brand-explainer' as const,
    name: 'Brand Explainers',
    icon: faBuilding,
    description: 'Learn about DECRA, Unified Steel, Tilcor, and other brands',
  },
  {
    id: 'informational' as const,
    name: 'Informational',
    icon: faInfoCircle,
    description: 'General information about stone-coated metal roofing',
  },
];

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'buyer-education' | 'performance-proof' | 'brand-explainer' | 'informational'>('all');
  const [animatedCount, setAnimatedCount] = useState(0);
  const hasAnimated = useRef(false);

  const filteredVideos =
    selectedCategory === 'all'
      ? videos
      : videos.filter((video) => video.category === selectedCategory);

  const categoryInfo = categories.find((cat) => cat.id === selectedCategory) || categories[0];

  // Animated counter for total videos
  useEffect(() => {
    if (hasAnimated.current) return;
    
    const totalVideos = videos.length;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = totalVideos / steps;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const nextValue = Math.min(Math.floor(increment * currentStep), totalVideos);
      setAnimatedCount(nextValue);
      
      if (currentStep >= steps || nextValue >= totalVideos) {
        setAnimatedCount(totalVideos);
        clearInterval(timer);
        hasAnimated.current = true;
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-rif-blue-500 rounded-2xl">
              <FontAwesomeIcon icon={faPlayCircle} className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black mb-6 tracking-tight text-center">
            Stone Coated Metal Roofing Videos
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto text-center font-light mb-8">
            Educational videos about stone-coated metal roofing, performance testing, brand information, and buyer guides
          </p>
          
          {/* Animated Video Counter */}
          <div className="flex justify-center mb-6">
            <div className="bg-white border-2 border-rif-blue-500 rounded-2xl px-8 py-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-bold text-rif-blue-500 tabular-nums">
                    {animatedCount}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 mt-1 font-medium">
                    Educational Videos
                  </div>
                </div>
                <div className="h-16 w-px bg-gray-300"></div>
                <div className="text-left">
                  <div className="text-lg md:text-xl font-semibold text-rif-black">
                    Comprehensive Library
                  </div>
                  <div className="text-sm md:text-base text-gray-600">
                    Browse by category below
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6 bg-white border-b border-gray-200 sticky top-14 z-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-rif-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FontAwesomeIcon icon={category.icon} className="h-4 w-4" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-rif-black mb-2">
              {categoryInfo.name}
            </h2>
            <p className="text-gray-600">{categoryInfo.description}</p>
          </div>

          {filteredVideos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No videos found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* YouTube Embed */}
                  <div className="relative w-full pt-[56.25%] bg-gray-900">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>

                  {/* Video Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-rif-black mb-3 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 mb-4">
                      {video.description}
                    </p>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-rif-blue-500 hover:text-rif-blue-600 font-medium"
                    >
                      Watch on YouTube
                      <FontAwesomeIcon icon={faPlayCircle} className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-rif-black mb-6 text-center">
            Learn About Stone-Coated Metal Roofing
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-lg leading-relaxed mb-4">
              Stone-coated metal roofing is a premium roofing system that combines the strength and durability of steel
              with the aesthetic appeal of traditional roofing materials like tile or slate. These videos provide
              comprehensive information to help homeowners understand this roofing option.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Whether you're researching the benefits, comparing options, learning about specific brands like DECRA or
              Unified Steel, or seeing real-world performance in storms and tests, these educational videos cover
              everything you need to know about stone-coated metal roofing.
            </p>
            <p className="text-lg leading-relaxed">
              Browse by category to find videos on buyer education, performance testing, brand information, or general
              informational content about stone-coated metal roofing systems.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

