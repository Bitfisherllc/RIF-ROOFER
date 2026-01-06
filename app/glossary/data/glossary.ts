export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  relatedTerms?: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  // Installation Terms
  {
    term: 'Standing Seam',
    definition: 'A type of metal roofing panel installation where adjacent panels are joined together with raised seams that run vertically along the roof. The seams are typically 1-2 inches high and are either mechanically seamed or snap-locked together. Standing seam systems provide excellent weather resistance and are commonly used in stone-coated metal roofing.',
    category: 'Installation',
    relatedTerms: ['Panel', 'Seam', 'Mechanical Seam', 'Snap Lock'],
  },
  {
    term: 'Panel',
    definition: 'Individual metal roofing sheets that are installed side-by-side to form the complete roof surface. Stone-coated metal panels typically range from 12 to 18 inches in width and come in various profiles including shingle, tile, shake, and slate styles.',
    category: 'Installation',
    relatedTerms: ['Standing Seam', 'Profile', 'Shingle', 'Tile'],
  },
  {
    term: 'Underlayment',
    definition: 'A protective layer installed directly on the roof deck beneath the metal panels. In stone-coated metal roofing, high-quality synthetic underlayment provides an additional barrier against water infiltration, protects the deck during installation, and can serve as a secondary waterproofing layer.',
    category: 'Installation',
    relatedTerms: ['Deck', 'Waterproofing', 'Synthetic Underlayment'],
  },
  {
    term: 'Deck',
    definition: 'The structural base of the roof, typically made of plywood, OSB (oriented strand board), or metal. The deck provides the foundation for the underlayment and metal panels. A properly prepared deck is essential for a successful stone-coated metal roof installation.',
    category: 'Installation',
    relatedTerms: ['Underlayment', 'OSB', 'Plywood'],
  },
  {
    term: 'Fastener',
    definition: 'Screws or clips used to secure metal roofing panels to the roof deck or structural members. Stone-coated metal roofing systems use specialized fasteners designed to penetrate the metal and deck while maintaining weather-tight seals. Fasteners are typically color-matched to the roof panels.',
    category: 'Installation',
    relatedTerms: ['Clip', 'Screw', 'Panel'],
  },
  {
    term: 'Clip',
    definition: 'A specialized fastener system used in concealed-fastener metal roofing installations. Clips attach to the roof deck and hold the panels in place without visible screws, creating a cleaner appearance and allowing for thermal expansion and contraction of the panels.',
    category: 'Installation',
    relatedTerms: ['Fastener', 'Standing Seam', 'Concealed Fastener'],
  },
  {
    term: 'Ridge Cap',
    definition: 'A metal component installed along the peak (ridge) of a roof where two roof slopes meet. Ridge caps provide weather protection, ventilation, and a finished appearance. Stone-coated metal ridge caps match the panel profile and color for a cohesive look.',
    category: 'Installation',
    relatedTerms: ['Hip', 'Valley', 'Peak'],
  },
  {
    term: 'Hip',
    definition: 'The external angle formed where two roof slopes meet at a corner, creating a downward-sloping ridge. Hip caps are installed along hips to provide weather protection and match the roof\'s aesthetic.',
    category: 'Installation',
    relatedTerms: ['Ridge Cap', 'Valley', 'Eave'],
  },
  {
    term: 'Valley',
    definition: 'The internal angle formed where two roof slopes meet, creating a channel that directs water runoff. Valley flashing is critical for preventing water infiltration and must be properly installed with stone-coated metal roofing systems.',
    category: 'Installation',
    relatedTerms: ['Hip', 'Flashing', 'Water Runoff'],
  },
  {
    term: 'Eave',
    definition: 'The lower edge of a roof that overhangs the building\'s walls. Eave trim (drip edge) is installed along eaves to direct water away from the fascia and prevent water damage to the structure.',
    category: 'Installation',
    relatedTerms: ['Fascia', 'Soffit', 'Drip Edge'],
  },
  {
    term: 'Fascia',
    definition: 'The vertical board that runs along the lower edge of the roof, typically covering the ends of the roof rafters. Fascia boards provide a finished appearance and support for the gutter system.',
    category: 'Installation',
    relatedTerms: ['Eave', 'Soffit', 'Gutter'],
  },
  {
    term: 'Flashing',
    definition: 'Metal components used to seal and protect areas where the roof meets walls, chimneys, vents, or other penetrations. Flashing prevents water infiltration at these critical junctions. Stone-coated metal flashing matches the roof panels for a cohesive appearance.',
    category: 'Installation',
    relatedTerms: ['Valley', 'Penetration', 'Chimney'],
  },

  // Material Terms
  {
    term: 'Stone-Coated Metal',
    definition: 'A premium roofing material consisting of a steel or aluminum base coated with stone granules embedded in an acrylic film. The stone granules provide UV protection, color, and texture while the metal base provides strength and durability. This combination creates a roofing system that looks like traditional materials but performs like metal.',
    category: 'Materials',
    relatedTerms: ['Granule', 'Acrylic Film', 'Steel Base', 'Aluminum'],
  },
  {
    term: 'Granule',
    definition: 'Small, colored stone particles embedded in the acrylic coating of stone-coated metal panels. Granules provide UV protection, color, texture, and help protect the underlying metal from weather damage. They are similar to those used in asphalt shingles but are bonded to metal rather than asphalt.',
    category: 'Materials',
    relatedTerms: ['Stone-Coated Metal', 'Acrylic Film', 'UV Protection'],
  },
  {
    term: 'Acrylic Film',
    definition: 'A protective polymer coating that bonds the stone granules to the metal base in stone-coated metal roofing. The acrylic film provides adhesion, weather resistance, and helps maintain the granules in place throughout the roof\'s lifespan.',
    category: 'Materials',
    relatedTerms: ['Granule', 'Stone-Coated Metal', 'Coating'],
  },
  {
    term: 'Galvalume',
    definition: 'A steel alloy coated with a combination of aluminum and zinc (typically 55% aluminum, 45% zinc). Galvalume provides excellent corrosion resistance and is commonly used as the base metal in stone-coated metal roofing systems, especially in coastal areas.',
    category: 'Materials',
    relatedTerms: ['Steel Base', 'Corrosion Resistance', 'Zinc'],
  },
  {
    term: 'G90 Galvanized',
    definition: 'Steel coated with zinc at a thickness of 0.90 ounces per square foot. G90 galvanized steel provides good corrosion resistance and is used in some stone-coated metal roofing systems, though Galvalume is often preferred for superior performance.',
    category: 'Materials',
    relatedTerms: ['Galvalume', 'Zinc', 'Corrosion Resistance'],
  },
  {
    term: 'Profile',
    definition: 'The shape and design of a metal roofing panel. Stone-coated metal roofing is available in various profiles that mimic traditional roofing materials, including shingle, tile, shake, and slate profiles. Each profile has distinct visual characteristics and installation requirements.',
    category: 'Materials',
    relatedTerms: ['Panel', 'Shingle', 'Tile', 'Shake', 'Slate'],
  },
  {
    term: 'Shingle Profile',
    definition: 'A stone-coated metal panel designed to replicate the appearance of traditional asphalt or wood shingles. Shingle profiles typically feature a rectangular shape with visible seams that create the shingle-like appearance.',
    category: 'Materials',
    relatedTerms: ['Profile', 'Tile Profile', 'Shake Profile'],
  },
  {
    term: 'Tile Profile',
    definition: 'A stone-coated metal panel designed to replicate the appearance of traditional clay or concrete tiles. Tile profiles often feature curved or S-shaped sections that mimic the look of barrel tiles or flat tiles.',
    category: 'Materials',
    relatedTerms: ['Profile', 'Shingle Profile', 'Mediterranean'],
  },
  {
    term: 'Shake Profile',
    definition: 'A stone-coated metal panel designed to replicate the appearance of traditional wood shakes. Shake profiles typically feature irregular edges and texture that mimics the natural appearance of split wood shakes.',
    category: 'Materials',
    relatedTerms: ['Profile', 'Shingle Profile', 'Wood'],
  },
  {
    term: 'Slate Profile',
    definition: 'A stone-coated metal panel designed to replicate the appearance of natural slate tiles. Slate profiles often feature a rectangular shape with texture and color variations that mimic the natural stone appearance.',
    category: 'Materials',
    relatedTerms: ['Profile', 'Natural Slate', 'Tile Profile'],
  },

  // Performance Terms
  {
    term: 'Wind Resistance',
    definition: 'The ability of a roofing system to withstand wind forces without damage or failure. Stone-coated metal roofing systems are tested and rated for wind resistance, with many systems capable of withstanding winds of 150+ mph, making them ideal for hurricane-prone areas like Florida.',
    category: 'Performance',
    relatedTerms: ['UL 2218', 'FM Approval', 'Hurricane Rating', 'Wind Uplift'],
  },
  {
    term: 'Wind Uplift',
    definition: 'The upward force exerted on a roof by wind passing over it. High wind speeds can create negative pressure that tries to lift roofing materials. Stone-coated metal roofing systems are designed with secure fastening methods to resist wind uplift forces.',
    category: 'Performance',
    relatedTerms: ['Wind Resistance', 'Fastener', 'Hurricane'],
  },
  {
    term: 'UL 2218',
    definition: 'A testing standard by Underwriters Laboratories that evaluates the impact resistance of roofing materials. Stone-coated metal roofing typically achieves Class 4 rating (the highest), indicating excellent resistance to hail and impact damage.',
    category: 'Performance',
    relatedTerms: ['Impact Resistance', 'Hail Resistance', 'Class 4'],
  },
  {
    term: 'FM Approval',
    definition: 'Certification from FM Global (Factory Mutual) indicating that a roofing system has been tested and approved for specific performance characteristics including wind resistance, fire resistance, and hail resistance. FM-approved stone-coated metal systems are often required for commercial buildings.',
    category: 'Performance',
    relatedTerms: ['Wind Resistance', 'Fire Resistance', 'Commercial'],
  },
  {
    term: 'Fire Resistance',
    definition: 'The ability of a roofing material to resist ignition and prevent fire spread. Stone-coated metal roofing typically achieves Class A fire rating (the highest), making it one of the most fire-resistant roofing options available.',
    category: 'Performance',
    relatedTerms: ['Class A', 'Fire Rating', 'Non-Combustible'],
  },
  {
    term: 'Energy Efficiency',
    definition: 'The ability of a roofing system to reduce energy consumption by reflecting solar heat and reducing cooling costs. Stone-coated metal roofing can be highly energy-efficient, especially when installed with proper ventilation and insulation. Some systems qualify for energy efficiency tax credits.',
    category: 'Performance',
    relatedTerms: ['Solar Reflectance', 'Cool Roof', 'Energy Star', 'Ventilation'],
  },
  {
    term: 'Solar Reflectance',
    definition: 'The ability of a roofing material to reflect sunlight and solar heat away from the building. Higher solar reflectance reduces heat absorption, lowering cooling costs. Light-colored stone-coated metal roofs typically have higher solar reflectance than dark colors.',
    category: 'Performance',
    relatedTerms: ['Energy Efficiency', 'Cool Roof', 'Heat Absorption'],
  },
  {
    term: 'Thermal Expansion',
    definition: 'The tendency of materials to expand and contract with temperature changes. Metal roofing expands and contracts more than traditional materials, so proper installation must account for this movement. Concealed clip systems allow for thermal expansion without panel damage.',
    category: 'Performance',
    relatedTerms: ['Clip', 'Concealed Fastener', 'Temperature'],
  },
  {
    term: 'Corrosion Resistance',
    definition: 'The ability of a material to resist deterioration from exposure to moisture, salt air, and other environmental factors. Stone-coated metal roofing systems use Galvalume or specially coated steel bases that provide excellent corrosion resistance, making them ideal for coastal areas.',
    category: 'Performance',
    relatedTerms: ['Galvalume', 'Salt Air', 'Coastal', 'Rust'],
  },

  // Warranty & Standards
  {
    term: 'Limited Lifetime Warranty',
    definition: 'A warranty that covers manufacturing defects and material failures for the lifetime of the original homeowner. Stone-coated metal roofing typically comes with limited lifetime warranties that cover the panels, granules, and finish, though installation is usually covered separately by the installer.',
    category: 'Warranty & Standards',
    relatedTerms: ['Warranty', 'Manufacturer Warranty', 'Material Defect'],
  },
  {
    term: 'Material Defect',
    definition: 'A flaw in the manufacturing or materials that causes premature failure or performance issues. Material defects are typically covered under manufacturer warranties, while installation issues are covered by installer warranties.',
    category: 'Warranty & Standards',
    relatedTerms: ['Warranty', 'Manufacturer', 'Installation'],
  },
  {
    term: 'Workmanship Warranty',
    definition: 'A warranty provided by the roofing installer covering defects in installation work. Workmanship warranties typically range from 1-10 years and cover issues like leaks, improper installation, or installation-related failures.',
    category: 'Warranty & Standards',
    relatedTerms: ['Installation', 'Installer', 'Leak'],
  },
  {
    term: 'Class 4 Impact Rating',
    definition: 'The highest impact resistance rating under UL 2218 testing, indicating the roofing material can withstand severe hail impact without damage. Most stone-coated metal roofing systems achieve Class 4 rating.',
    category: 'Warranty & Standards',
    relatedTerms: ['UL 2218', 'Hail Resistance', 'Impact Resistance'],
  },
  {
    term: 'Class A Fire Rating',
    definition: 'The highest fire resistance rating, indicating the roofing material provides the best protection against fire. Stone-coated metal roofing typically achieves Class A rating, making it suitable for areas with high fire risk.',
    category: 'Warranty & Standards',
    relatedTerms: ['Fire Resistance', 'Non-Combustible', 'Fire Safety'],
  },

  // Installation Process
  {
    term: 'Roof Deck Preparation',
    definition: 'The process of inspecting and preparing the existing roof deck before installing new roofing materials. This includes checking for rot, ensuring proper ventilation, and making necessary repairs. Proper deck preparation is essential for a successful stone-coated metal roof installation.',
    category: 'Installation Process',
    relatedTerms: ['Deck', 'Inspection', 'Ventilation'],
  },
  {
    term: 'Drip Edge',
    definition: 'Metal flashing installed along the edges of the roof (eaves and rakes) to direct water away from the fascia and prevent water damage. Drip edge is installed before the underlayment and provides a finished edge appearance.',
    category: 'Installation Process',
    relatedTerms: ['Eave', 'Fascia', 'Flashing'],
  },
  {
    term: 'Starter Strip',
    definition: 'The first row of panels or a special starter component installed at the eave before the main panels. Starter strips ensure proper alignment, provide a secure base for the first row, and help prevent water infiltration at the roof edge.',
    category: 'Installation Process',
    relatedTerms: ['Eave', 'Panel', 'First Row'],
  },
  {
    term: 'Field Installation',
    definition: 'The installation of the main roof panels across the roof surface (the "field" of the roof). Field installation follows specific patterns and procedures to ensure proper alignment, fastening, and weather-tightness.',
    category: 'Installation Process',
    relatedTerms: ['Panel', 'Installation', 'Field'],
  },
  {
    term: 'Penetration',
    definition: 'Any opening in the roof surface for vents, chimneys, skylights, or other features. Penetrations require special flashing and sealing to maintain weather-tightness. Proper penetration detailing is critical in stone-coated metal roofing.',
    category: 'Installation Process',
    relatedTerms: ['Flashing', 'Vent', 'Chimney', 'Skylight'],
  },
  {
    term: 'Ventilation',
    definition: 'The movement of air through the roof system to remove heat and moisture. Proper ventilation is essential for roof performance and longevity. Stone-coated metal roofing systems work with various ventilation methods including ridge vents, soffit vents, and powered vents.',
    category: 'Installation Process',
    relatedTerms: ['Ridge Vent', 'Soffit Vent', 'Attic Ventilation'],
  },
  {
    term: 'Ridge Vent',
    definition: 'A ventilation system installed along the roof ridge that allows hot air to escape from the attic. Ridge vents work with soffit vents to create natural airflow. Stone-coated metal ridge caps can incorporate ventilation features.',
    category: 'Installation Process',
    relatedTerms: ['Ventilation', 'Ridge Cap', 'Soffit Vent'],
  },
  {
    term: 'Soffit Vent',
    definition: 'Ventilation openings in the soffit (underside of the eave) that allow cool air to enter the attic. Soffit vents work with ridge vents to create natural convection airflow, removing heat and moisture from the attic space.',
    category: 'Installation Process',
    relatedTerms: ['Ventilation', 'Soffit', 'Ridge Vent'],
  },

  // Maintenance & Care
  {
    term: 'Maintenance',
    definition: 'Regular inspection and care to ensure optimal roof performance. Stone-coated metal roofing requires minimal maintenance compared to traditional materials, but periodic inspections for debris, damage, and proper fastener condition are recommended.',
    category: 'Maintenance & Care',
    relatedTerms: ['Inspection', 'Cleaning', 'Debris'],
  },
  {
    term: 'Cleaning',
    definition: 'The process of removing dirt, debris, algae, or other materials from the roof surface. Stone-coated metal roofs are relatively easy to clean with water and mild detergent. Regular cleaning helps maintain appearance and can prevent issues like algae growth.',
    category: 'Maintenance & Care',
    relatedTerms: ['Maintenance', 'Algae', 'Debris'],
  },
  {
    term: 'Algae',
    definition: 'Microscopic organisms that can grow on roof surfaces, especially in humid climates. Algae growth appears as dark streaks or discoloration. Stone-coated metal roofing is less prone to algae growth than organic materials, but cleaning may be needed in some conditions.',
    category: 'Maintenance & Care',
    relatedTerms: ['Cleaning', 'Humidity', 'Discoloration'],
  },
  {
    term: 'Debris',
    definition: 'Leaves, branches, dirt, and other materials that accumulate on the roof surface. Regular removal of debris helps prevent water pooling, maintains roof appearance, and reduces the risk of damage. Stone-coated metal roofs shed debris more easily than some traditional materials.',
    category: 'Maintenance & Care',
    relatedTerms: ['Cleaning', 'Maintenance', 'Water Pooling'],
  },

  // Cost & Value
  {
    term: 'Life Cycle Cost',
    definition: 'The total cost of a roofing system over its entire lifespan, including initial installation, maintenance, repairs, and replacement. Stone-coated metal roofing typically has a lower life cycle cost than traditional materials due to its durability and minimal maintenance requirements.',
    category: 'Cost & Value',
    relatedTerms: ['Durability', 'Longevity', 'ROI'],
  },
  {
    term: 'ROI (Return on Investment)',
    definition: 'The financial return on a roofing investment, considering factors like energy savings, increased property value, reduced maintenance costs, and extended lifespan. Stone-coated metal roofing often provides excellent ROI due to its durability and energy efficiency.',
    category: 'Cost & Value',
    relatedTerms: ['Life Cycle Cost', 'Property Value', 'Energy Savings'],
  },
  {
    term: 'Property Value',
    definition: 'The market value of a property, which can be increased by installing a premium roofing system like stone-coated metal. High-quality roofing is often seen as a valuable upgrade by potential buyers and can increase resale value.',
    category: 'Cost & Value',
    relatedTerms: ['ROI', 'Resale Value', 'Curb Appeal'],
  },
  {
    term: 'Curb Appeal',
    definition: 'The visual attractiveness of a property as viewed from the street. Stone-coated metal roofing can significantly enhance curb appeal with its premium appearance, variety of colors and profiles, and long-lasting beauty.',
    category: 'Cost & Value',
    relatedTerms: ['Property Value', 'Aesthetics', 'Appearance'],
  },
];

export const glossaryCategories = [
  'All',
  'Installation',
  'Materials',
  'Performance',
  'Warranty & Standards',
  'Installation Process',
  'Maintenance & Care',
  'Cost & Value',
];

export function getTermsByCategory(category: string): GlossaryTerm[] {
  if (category === 'All') {
    return glossaryTerms;
  }
  return glossaryTerms.filter(term => term.category === category);
}

export function searchTerms(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase();
  return glossaryTerms.filter(
    term =>
      term.term.toLowerCase().includes(lowerQuery) ||
      term.definition.toLowerCase().includes(lowerQuery) ||
      term.category.toLowerCase().includes(lowerQuery)
  );
}





