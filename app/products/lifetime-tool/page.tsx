import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faExternalLink, faShield, faCheckCircle, faWrench, faDroplet, faSun, faSnowflake, faWind } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';
import StickyProductNav from '@/components/StickyProductNav';

export const metadata: Metadata = {
  title: 'Lifetime Tool® Ultimate Pipe Flashing & Roofing Products',
  description: 'Lifetime Tool® manufactures the Ultimate Pipe Flashing® - the #1 solution for roof leaks. Made from pure silicone with proprietary compression collar, guaranteed watertight for the life of your roof. 50-year warranty.',
  keywords: [
    'Lifetime Tool',
    'Ultimate Pipe Flashing',
    'pipe flashing',
    'roof leak prevention',
    'silicone pipe boot',
    'Kynar coated pipe flashing',
    'stainless steel pipe flashing',
    'bath dryer vent',
    'EASYSleeve',
    'EASYFit',
    'Florida roofing',
    'roofing products',
  ],
};

const productLines = [
  { 
    name: 'Ultimate Pipe Flashing® - Kynar® Coated', 
    slug: 'ultimate-pipe-flashing-kynar',
    description: '24ga galv. Dark Bronze Kynar® coated plate with pure silicone boot. Proprietary compression collar makes a watertight seal for the life of the roof.',
    features: ['Kynar® coated plate', 'Pure silicone boot', 'Compression collar seal', '50-year warranty']
  },
  { 
    name: 'Ultimate Pipe Flashing® - Stainless Steel', 
    slug: 'ultimate-pipe-flashing-stainless',
    description: '316L marine grade Stainless Steel plate with pure silicone boot. The ultimate in durability and corrosion resistance.',
    features: ['316L marine grade stainless', 'Pure silicone boot', 'Maximum corrosion resistance', '50-year warranty']
  },
  { 
    name: 'Ultimate Pipe Flashing® for Metal Roofs', 
    slug: 'ultimate-pipe-flashing-metal',
    description: 'Designed specifically for metal roofing applications. Silicone boot with proprietary compression collar ensures watertight seal.',
    features: ['Metal roof specific', 'Pure silicone construction', 'Compression collar seal', '50-year warranty']
  },
  { 
    name: 'Ultimate Bath/Dryer Vent for Shingle Roofs', 
    slug: 'ultimate-bath-dryer-vent-shingle',
    description: 'Removable cap, rubber damper cushions for quieter operation, large plate for leak-proof installation. Even the black oxide screws are stainless steel.',
    features: ['Removable cap', 'Rubber damper cushions', 'Large leak-proof plate', 'Stainless steel screws']
  },
  { 
    name: 'Ultimate Bath/Dryer Vent for Metal Roofs', 
    slug: 'ultimate-bath-dryer-vent-metal',
    description: 'Proprietary design for water-tight roof installation. Cap is removable for easy cleaning with rubber damper stops for quiet operation.',
    features: ['Metal roof specific', 'Removable cap', 'Easy cleaning', 'Quiet operation']
  },
  { 
    name: 'EASYSleeve®', 
    slug: 'easysleeve',
    description: 'Must use for copper & cast iron pipes up to 3". Cut! Drop! Go! For use with the Ultimate Pipe Flashing®.',
    features: ['Copper & cast iron compatible', 'Easy installation', 'Up to 3" pipes', 'Works with Ultimate Pipe Flashing']
  },
  { 
    name: 'EASYFit™', 
    slug: 'easyfit',
    description: 'Adapter solution for copper and cast iron pipes. Ensures proper fit with Ultimate Pipe Flashing®.',
    features: ['Copper & cast iron compatible', 'Easy installation', 'Perfect fit guarantee', 'Works with Ultimate Pipe Flashing']
  },
  { 
    name: 'Schedule 30-40 Adapter', 
    slug: 'schedule-30-40-adapter',
    description: 'You must use this adapter to accommodate the Ultimate Pipe Flashing® for schedule 30 PVC pipe (Radon). To accommodate 3" Radon pipes.',
    features: ['Schedule 30 PVC compatible', 'Radon pipe solution', '3" pipe accommodation', 'Easy installation']
  },
  { 
    name: 'SquareLock™ Snow Guard', 
    slug: 'squarelock-snow-guard',
    description: 'For double-lock standing seam. Angled set screws help prevent panel damage. Certified Almag 35 for maximum strength and durability.',
    features: ['Double-lock standing seam', 'Angled set screws', 'Almag 35 certified', 'Maximum strength']
  },
  { 
    name: 'AP Snow Guard', 
    slug: 'ap-snow-guard',
    description: 'For architectural panels up to ½" seam. Set screws designed for maximum performance. Certified Almag 35 for maximum strength and durability.',
    features: ['Architectural panels', 'Up to ½" seam', 'Almag 35 certified', 'Maximum performance']
  },
];

const testimonials = [
  {
    quote: "We use Lifetime Tools' pipe flashings on all our installs, and they are simply the best on the market. The kynar plate and clearly marked nailing zones make installation a breeze for our crew, and the quality of the boot itself is top-notch. Unlike standard pipe flashings that fail within 10-15 years, these lifetime pipe boots give our customers true peace of mind, ensuring they never face leaks or costly repairs down the road.",
    author: "Paragon Roofing",
    location: "Nashville, TN"
  },
  {
    quote: "Prior to using The Ultimate Pipe Flashing, we used lead boots. The lead boots were difficult to transport because they got banged up easily and they were more difficult to install because they needed to be painted. Moving to The Ultimate Pipe Flashing was great for us because it has made our installation process easier and the customers like it more because it looks nice over a longer period of time.",
    author: "Jim Singleterry, CEO",
    company: "RoofSmart",
    location: "Auburn, WA"
  },
  {
    quote: "We've been using Lifetime boots since they first debuted, and we put on about 4,500 a year. We absolutely love your product. Helps us sell probably an extra $4 million a year just by using your products, showing customers. It is a product that sells itself for us.",
    author: "David Barnett, Owner",
    company: "Barnett Roofing",
    location: "Knoxville, TN"
  },
  {
    quote: "We've been using Ultimate Lifetime products for quite some time. We find tremendous value in separating ourselves from all other companies while offering this product. Sometimes it's an upsell. Sometimes it's a winning item to help win over the roof again against our competition.",
    author: "Darrel Greene, Director of Sales",
    company: "Premiere Roofing",
    location: "Columbia, SC"
  },
  {
    quote: "We run all too often into broken pipe boots, cracked pipe boots, cheap pipe boots. Ultimate is the only name in lifetime pipe boots in the industry, and it's the only product that we'll stand by. For pretty much every package that you get through Flow Roofing, we're gonna stand by Lifetime pipe boots.",
    author: "Verrill Beaudro, Owner",
    company: "Flow Roofing",
    location: "Portland, OR"
  },
  {
    quote: "Received a call from one of our previous customers about a water leak coming through the bathroom ceiling. And I pretty much knew what it was going to be before I even went down there to look at it, and sure enough, it's the roof gasket going around the plumbing vent. Cheap inferior product, you know, under $20 for that roof gasket. What you want to use is one of these Lifetime vents…silicone, not going to dry out, rot away like that one.",
    author: "Adam Clarke, CEO/Owner",
    company: "A Clarke Construction",
    location: "Massachusetts"
  },
  {
    quote: "If you've ever had a roof leak, you understand how frustrating that experience can be. In my right hand I have just a traditional or standard pipe boot. The life of these is typically five to 10 years we very frequently see leaks coming from these pipe boots. Now if you want a truly worry-free roof in my left hand what I have here is the Ultimate Pipe Flashing. These are warrantied for the life of the roof, and it's a great product if you don't ever want to experience another leak coming from one of your pipe boots.",
    author: "Finn Gleason",
    company: "Super Roofing Company",
    location: "Fort Mill, SC"
  },
];

export default function LifeTimeToolProductPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <StickyProductNav
        logoPath="/products/logos/lifetime-tool.png"
        logoAlt="Lifetime Tool Logo"
        backToProductsHref="/products"
        freeEstimateHref="/free-estimate"
        productSlug="lifetime-tool"
        productName="LifeTime Tool"
        productCategory="Tools & Equipment"
      />
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <span className="text-sm uppercase tracking-wider text-gray-400 mb-4 block">ROOFING PRODUCTS</span>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                THE ULTIMATE PIPE FLASHING®
              </h1>
              <h2 className="text-3xl md:text-4xl font-light text-gray-300 mb-8">
                Lifetime Tool® & Building Products
              </h2>
              <div className="bg-red-600/20 border-l-4 border-red-500 p-4 mb-6 rounded">
                <p className="text-2xl font-bold mb-2">FAILED PIPE FLASHINGS ARE THE #1 ROOF LEAK!</p>
                <p className="text-lg text-gray-300">Don't let inferior pipe flashings cause costly damage to your roof.</p>
              </div>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
                Made from pure silicone with proprietary compression collar technology. Guaranteed watertight for the life of your roof with a 50-year warranty.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <a
                  href="https://lifetimetool.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium"
                >
                  Visit website
                  <FontAwesomeIcon icon={faExternalLink} className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="https://lifetimetool.com/wp-content/uploads/2024/01/ultimate-pipe-kynar-coated.jpg"
                alt="Ultimate Pipe Flashing Kynar Coated"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-6 right-6 bg-gray-800 rounded-lg p-4 shadow-xl">
                <Image
                  src="/products/logos/lifetime-tool.png"
                  alt="Lifetime Tool Logo"
                  width={140}
                  height={65}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
              Why Ultimate Pipe Flashing®?
            </h2>
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-600">
              The Solution to the #1 Roof Leak Problem
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500">
              <div className="mb-6">
                <FontAwesomeIcon icon={faDroplet} className="h-16 w-16 text-rif-blue-500 mb-4" />
                <h3 className="text-2xl font-semibold text-rif-black mb-4">
                  Pure Silicone Construction
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Just like sand, silicone is made from silica and is <strong>100% stable in the sun</strong>. Unlike rubber or other materials that degrade over time, silicone maintains its integrity for decades.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500">
              <div className="mb-6">
                <FontAwesomeIcon icon={faShield} className="h-16 w-16 text-rif-blue-500 mb-4" />
                <h3 className="text-2xl font-semibold text-rif-black mb-4">
                  Proprietary Compression Collar
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                The <strong>proprietary compression collar makes a watertight seal for the life of the roof</strong>. This innovative design ensures no leaks, no matter what Mother Nature throws at your roof.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500">
              <div className="mb-6">
                <FontAwesomeIcon icon={faCheckCircle} className="h-16 w-16 text-rif-blue-500 mb-4" />
                <h3 className="text-2xl font-semibold text-rif-black mb-4">
                  50-Year Warranty
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                <strong>Guaranteed watertight for the life of your roof</strong>. The 50-year warranty matches most roof warranties, giving you complete peace of mind.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500">
              <div className="mb-6">
                <FontAwesomeIcon icon={faSun} className="h-16 w-16 text-rif-blue-500 mb-4" />
                <h3 className="text-2xl font-semibold text-rif-black mb-4">
                  Premium Plate Options
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Available in <strong>24ga galv. Dark Bronze Kynar® coated</strong> or <strong>316L marine grade Stainless Steel</strong>. Both options provide exceptional durability and corrosion resistance.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500">
              <div className="mb-6">
                <FontAwesomeIcon icon={faWrench} className="h-16 w-16 text-rif-blue-500 mb-4" />
                <h3 className="text-2xl font-semibold text-rif-black mb-4">
                  Generous Perimeter Flashing
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                <strong>4" of flashing on each side, 5½" at the top, 3" on the bottom</strong>. This generous perimeter allows for proper watertight installation on any roof.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-rif-blue-500">
              <div className="mb-6">
                <FontAwesomeIcon icon={faWind} className="h-16 w-16 text-rif-blue-500 mb-4" />
                <h3 className="text-2xl font-semibold text-rif-black mb-4">
                  Versatile Slope Compatibility
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Works on <strong>flat to very steep slopes (18/12+)</strong>. No matter your roof pitch, Ultimate Pipe Flashing® provides a perfect seal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
            Introducing <span className="text-rif-blue-500">Ultimate Pipe Flashing®</span>
          </h2>
          <p className="text-2xl text-gray-600 mb-12 font-light">
            The Industry's #1 Solution for Pipe Flashing Leaks
          </p>
          <div className="prose prose-lg max-w-none text-left">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong>Failed pipe flashings are the #1 cause of roof leaks</strong>. Traditional pipe boots made from rubber, lead, or other materials fail within 5-15 years, leading to costly water damage and repairs. The <strong>Ultimate Pipe Flashing®</strong> from Lifetime Tool® solves this problem once and for all.
            </p>
            <div className="bg-white rounded-xl p-8 border-l-4 border-rif-blue-500 mb-6">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Pure Silicone Technology</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The Ultimate Pipe Flashing® is made from <strong>pure silicone</strong>. Just like sand, it is made from silica, and it is <strong>100% stable in the sun</strong>. Unlike rubber boots that crack and degrade, silicone maintains its flexibility and seal integrity for decades.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Most importantly, it's about the <strong>proprietary design</strong>. The compression collar technology ensures a watertight seal that lasts for the life of your roof.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 border-l-4 border-rif-blue-500 mb-6">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">Size-Specific Design</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The UPF® is <strong>size-specific for Schedule 40 PVC pipes</strong>, ABS, and some iron pipes. For copper and cast iron pipes, you must use <strong>EASYSleeve® or EASYFit™</strong> to ensure proper fit and seal.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                This attention to detail ensures every installation is watertight, regardless of pipe material or size.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 border-l-4 border-rif-blue-500">
              <h3 className="text-2xl font-semibold text-rif-black mb-4">FORTIFIED™ Compliant</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Ultimate Pipe Flashing® products are <strong>qualified as FORTIFIED Roof™ components</strong>. This certification means they meet the highest standards for durability and performance in extreme weather conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Lines Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
              Lifetime Tool®
            </h2>
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-600">
              Complete Product Line
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productLines.map((product) => (
              <div
                key={product.slug}
                className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:border-rif-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <h4 className="text-xl font-semibold text-rif-black mb-3">
                  {product.name}
                </h4>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {product.description}
                </p>
                {product.features && (
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Contractors Say
            </h2>
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-300">
              Trusted by Professionals Nationwide
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-8 border border-gray-700"
              >
                <div className="mb-6">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-8 w-8 text-rif-blue-500 mb-4" />
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-gray-700 pt-4">
                  <p className="font-semibold text-white">
                    {testimonial.author}
                  </p>
                  {testimonial.company && (
                    <p className="text-gray-400 text-sm">
                      {testimonial.company}
                    </p>
                  )}
                  <p className="text-gray-400 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultimate Bath/Dryer Vent Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
                THE ULTIMATE BATH / DRYER VENT
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Complete Ventilation Solution for Your Roof
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg text-gray-700"><strong>Removable Cap</strong> - Easy cleaning and maintenance</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg text-gray-700"><strong>Rubber Damper Cushions</strong> - Quieter operation</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg text-gray-700"><strong>Large Plate</strong> - Leak-proof installation</span>
                </li>
                <li className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-rif-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg text-gray-700"><strong>Stainless Steel Screws</strong> - Even the black oxide screws are stainless steel for a lifetime of trouble-free operation!</span>
                </li>
              </ul>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://lifetimetool.com/wp-content/uploads/2024/01/ultimate-bath-dryer-vent.jpg"
                alt="Ultimate Bath/Dryer Vent"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics Section */}
      <section className="py-20 px-6 bg-rif-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="mb-8 flex justify-center">
              <Image
                src="/products/logos/lifetime-tool.png"
                alt="Lifetime Tool Logo"
                width={180}
                height={83}
                className="brightness-0 invert object-contain"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built for Lifetime Performance.
            </h2>
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-200">
              Guaranteed Watertight for 50 Years.
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center border border-white/20">
              <div className="mb-6">
                <FontAwesomeIcon icon={faShield} className="h-20 w-20 text-white mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold mb-4">
                  50-Year Warranty
                </h3>
              </div>
              <p className="text-gray-200 leading-relaxed">
                <strong>Guaranteed watertight for the life of your roof</strong>. The warranty matches most roof warranties, providing complete peace of mind.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center border border-white/20">
              <div className="mb-6">
                <FontAwesomeIcon icon={faSun} className="h-20 w-20 text-white mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold mb-4">
                  Sun-Stable Silicone
                </h3>
              </div>
              <p className="text-gray-200 leading-relaxed">
                Made from <strong>pure silicone that is 100% stable in the sun</strong>. Unlike rubber boots that crack and fail, silicone maintains integrity for decades.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center border border-white/20">
              <div className="mb-6">
                <FontAwesomeIcon icon={faDroplet} className="h-20 w-20 text-white mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold mb-4">
                  Watertight Seal
                </h3>
              </div>
              <p className="text-gray-200 leading-relaxed">
                The <strong>proprietary compression collar</strong> ensures a perfect watertight seal that lasts for the life of your roof, no matter the weather conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Distributor Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-rif-black mb-4">
            Lifetime Tool®
          </h2>
          <h3 className="text-3xl md:text-4xl font-semibold text-gray-600 mb-8">
            Authorized Distributor
          </h3>
          <div className="bg-white rounded-xl p-12 shadow-lg">
            <h4 className="text-2xl font-semibold text-rif-black mb-6">
              Your Trusted Source for Lifetime Tool® Products
            </h4>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              As an authorized distributor, we are proud to bring the quality and innovation of Lifetime Tool® products to our customers. Our team is here to help you explore the complete product line, answer your questions, and guide you toward the perfect solution for your roofing needs.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Don't let failed pipe flashings cause costly roof leaks. Contact us today to learn more about Lifetime Tool® products or to schedule a consultation with one of our roofing experts!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Link
                href="/roofers"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
              >
                Find a Certified Roofer
              </Link>
              <a
                href="https://lifetimetool.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
              >
                <FontAwesomeIcon icon={faExternalLink} className="h-4 w-4" />
                Visit Manufacturer Website
              </a>
              <a
                href="https://lifetimetool.com/find-us/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-rif-blue-500 text-rif-blue-500 rounded-lg hover:bg-rif-blue-50 transition-colors font-medium"
              >
                <FontAwesomeIcon icon={faExternalLink} className="h-4 w-4" />
                Find a Store Near You
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-rif-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Ready to Stop Roof Leaks Forever?
          </h2>
          <p className="text-lg mb-8 leading-relaxed text-gray-200">
            Get started with a free estimate today. Sometimes it's easier to just pick up the phone and talk to one of our roofing experts—we're here to answer your questions and help you find the perfect Lifetime Tool® solution for your property. Or fill out our quick form online, whichever you prefer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/free-estimate"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-rif-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Request Free Estimate
            </Link>
            <a
              href="tel:813-777-8272"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
            >
              Call: 813-777-8272
            </a>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium"
            >
              <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 rotate-180" />
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
