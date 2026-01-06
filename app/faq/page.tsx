'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // General Questions
  {
    category: 'General',
    question: 'What is stone-coated metal roofing?',
    answer: 'Stone-coated metal roofing is a premium roofing system that combines the strength and durability of metal with the aesthetic appeal of traditional roofing materials like tile, shake, or slate. It consists of a steel or aluminum base coated with stone granules embedded in an acrylic film. This creates a roofing system that looks like traditional materials but offers superior performance, including excellent wind resistance, fire resistance, and longevity.',
  },
  {
    category: 'General',
    question: 'How long does stone-coated metal roofing last?',
    answer: 'Stone-coated metal roofing typically lasts 40-70 years or more, significantly longer than traditional asphalt shingles (15-25 years) or even clay/concrete tiles (30-50 years). Many systems come with limited lifetime warranties covering manufacturing defects. The actual lifespan depends on factors like installation quality, maintenance, and environmental conditions.',
  },
  {
    category: 'General',
    question: 'Is stone-coated metal roofing suitable for Florida?',
    answer: 'Yes, stone-coated metal roofing is exceptionally well-suited for Florida\'s climate. It offers superior wind resistance (many systems rated for 150+ mph winds), excellent corrosion resistance for coastal areas, high fire resistance (Class A rating), and energy efficiency that helps reduce cooling costs. These features make it ideal for Florida\'s hurricane season, salt air, intense heat, and high humidity.',
  },

  // Installation Questions
  {
    category: 'Installation',
    question: 'How long does installation take?',
    answer: 'Installation time varies based on roof size, complexity, and weather conditions. A typical residential roof replacement takes 2-5 days. Factors that affect timing include roof size, pitch, number of penetrations (vents, skylights, etc.), weather delays, and whether structural repairs are needed. Your RIF-certified installer will provide a detailed timeline during the estimate process.',
  },
  {
    category: 'Installation',
    question: 'Can stone-coated metal be installed over existing roofing?',
    answer: 'In many cases, yes—but it depends on the condition of the existing roof and local building codes. If the existing roof is in good structural condition and codes allow, installation over one layer of existing roofing may be possible. However, removing the old roofing is often recommended to ensure proper installation, allow for inspection of the deck, and avoid potential issues. Your installer will assess your specific situation.',
  },
  {
    category: 'Installation',
    question: 'What kind of maintenance does stone-coated metal roofing require?',
    answer: 'Stone-coated metal roofing requires minimal maintenance compared to traditional materials. Annual inspections are recommended to check for debris, damage, or loose fasteners. Periodic cleaning with water and mild detergent can help maintain appearance and prevent algae growth. The low maintenance requirements are one of the key advantages of stone-coated metal roofing.',
  },

  // Cost & Value Questions
  {
    category: 'Cost & Value',
    question: 'How much does stone-coated metal roofing cost?',
    answer: 'Stone-coated metal roofing is a premium product, typically costing more initially than asphalt shingles but comparable to or less than premium tile systems. Costs vary based on roof size, complexity, profile choice, and location. While the initial investment is higher than basic materials, the long-term value is superior due to durability, minimal maintenance, energy savings, and longer lifespan. Many homeowners find the life cycle cost is lower than traditional materials.',
  },
  {
    category: 'Cost & Value',
    question: 'Does stone-coated metal roofing increase home value?',
    answer: 'Yes, stone-coated metal roofing can increase home value and curb appeal. It\'s viewed as a premium upgrade by potential buyers and can increase resale value. The energy efficiency, durability, and low maintenance requirements are attractive selling points. Many homeowners find that the investment pays for itself over time through energy savings, reduced maintenance, and increased property value.',
  },
  {
    category: 'Cost & Value',
    question: 'Are there any tax credits or incentives for metal roofing?',
    answer: 'Some stone-coated metal roofing systems may qualify for energy efficiency tax credits or incentives, particularly if they meet certain solar reflectance requirements. Eligibility depends on current federal, state, and local programs, which change periodically. Your installer or tax professional can provide information about available incentives for your specific situation.',
  },

  // Performance & Durability Questions
  {
    category: 'Performance & Durability',
    question: 'How well does stone-coated metal roofing perform in hurricanes?',
    answer: 'Stone-coated metal roofing is one of the best choices for hurricane-prone areas like Florida. Many systems are rated to withstand winds of 150+ mph and meet or exceed Florida Building Code requirements for wind resistance. The interlocking panel design and secure fastening systems provide superior wind uplift resistance compared to many traditional materials. However, proper installation by certified installers is critical for optimal performance.',
  },
  {
    category: 'Performance & Durability',
    question: 'Is stone-coated metal roofing fire-resistant?',
    answer: 'Yes, stone-coated metal roofing typically achieves a Class A fire rating, which is the highest fire resistance rating available. The metal base is non-combustible, and the stone coating provides additional fire protection. This makes it an excellent choice for areas with high fire risk or where building codes require Class A roofing materials.',
  },
  {
    category: 'Performance & Durability',
    question: 'How does stone-coated metal roofing perform in coastal areas with salt air?',
    answer: 'Stone-coated metal roofing performs excellently in coastal areas. The metal bases (typically Galvalume or specially coated steel) are designed to resist salt air corrosion. The stone coating provides an additional protective layer. Many systems are specifically engineered for coastal environments and have proven performance in salt air conditions. This makes them ideal for Florida\'s extensive coastline.',
  },
  {
    category: 'Performance & Durability',
    question: 'Will a metal roof make my house noisier during rain?',
    answer: 'No, stone-coated metal roofing is not noisier than other roofing materials when properly installed. The stone coating, underlayment, and proper decking create a sound-dampening effect. Many homeowners report that their stone-coated metal roofs are actually quieter than expected, and noise levels are similar to or quieter than traditional roofing materials.',
  },

  // RIF-Specific Questions
  {
    category: 'RIF Services',
    question: 'What makes RIF roofers different?',
    answer: 'RIF-certified roofers are manufacturer-trained and certified specifically for stone-coated metal roofing systems. They undergo training on proper installation techniques, building codes, and product specifications. RIF provides quality control oversight, priority materials access, and matches the right installer to the specific product being used. This ensures consistent, high-quality installations.',
  },
  {
    category: 'RIF Services',
    question: 'Do RIF roofers serve my area?',
    answer: 'RIF-certified roofers serve locations throughout Florida. You can use our service area search to find roofers in your specific city, county, or region. Our network continues to grow, and we work to ensure coverage across the state. If you don\'t see a roofer in your area, contact us—we may have new partners or can help connect you with resources.',
  },
  {
    category: 'RIF Services',
    question: 'What warranty does RIF provide?',
    answer: 'RIF-backed projects benefit from both manufacturer warranties (covering materials and manufacturing defects) and workmanship warranties from the certified installer. Manufacturer warranties are typically limited lifetime warranties, while workmanship warranties vary by installer (typically 1-10 years). Specific warranty terms depend on the product line and installer. Your RIF-certified installer will provide detailed warranty information for your project.',
  },
  {
    category: 'RIF Services',
    question: 'How do I get a free estimate?',
    answer: 'You can request a free estimate by clicking the "Free Estimate" button on our website, filling out our contact form, or calling a RIF-certified roofer in your area directly. We\'ll connect you with a certified installer who can provide a detailed estimate, answer your questions, and help you understand your options for stone-coated metal roofing.',
  },

  // Material & Design Questions
  {
    category: 'Material & Design',
    question: 'What colors and styles are available?',
    answer: 'Stone-coated metal roofing is available in a wide variety of colors and profiles. Color options include various shades of grays, browns, terracotta, greens, blues, and more. Profile options include shingle, tile, shake, and slate styles, allowing you to achieve the look you want while benefiting from metal performance. Your installer can show you color samples and profile options available in your area.',
  },
  {
    category: 'Material & Design',
    question: 'Can I install solar panels on stone-coated metal roofing?',
    answer: 'Yes, stone-coated metal roofing is compatible with solar panel installation. The interlocking panel system and structural strength make it a good base for solar mounting systems. However, proper installation is critical to maintain weather-tightness and avoid voiding warranties. Work with installers experienced in both metal roofing and solar installation to ensure proper integration.',
  },
  {
    category: 'Material & Design',
    question: 'Will stone-coated metal roofing work with my home\'s architectural style?',
    answer: 'Stone-coated metal roofing is versatile and works with many architectural styles. The variety of profiles (shingle, tile, shake, slate) allows it to complement traditional, modern, Mediterranean, and other architectural styles. The material can match the aesthetic of traditional materials while offering superior performance. Many homeowners find it enhances their home\'s appearance and curb appeal.',
  },

  // Energy Efficiency Questions
  {
    category: 'Energy Efficiency',
    question: 'Will stone-coated metal roofing help reduce my energy bills?',
    answer: 'Yes, stone-coated metal roofing can help reduce cooling costs, especially when light colors are chosen and proper ventilation is installed. Metal roofing reflects solar heat, reducing heat absorption into your home. Some systems qualify for energy efficiency programs. Combined with proper attic ventilation and insulation, stone-coated metal roofing can contribute to lower energy consumption and costs.',
  },
  {
    category: 'Energy Efficiency',
    question: 'Does the color affect energy efficiency?',
    answer: 'Yes, color affects energy efficiency. Lighter colors have higher solar reflectance, reflecting more sunlight and heat, which helps reduce cooling costs. Darker colors absorb more heat. However, even darker stone-coated metal roofs perform better than many traditional dark roofing materials due to the metal base\'s reflective properties. Your installer can help you balance aesthetic preferences with energy efficiency goals.',
  },
];

const categories = ['All', 'General', 'Installation', 'Cost & Value', 'Performance & Durability', 'RIF Services', 'Material & Design', 'Energy Efficiency'];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredFAQs = selectedCategory === 'All' 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-rif-blue-500 rounded-2xl">
              <FontAwesomeIcon icon={faQuestionCircle} className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black mb-6 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-light">
            Find answers to common questions about stone-coated metal roofing, RIF services, installation, and more.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6 bg-white border-b border-gray-200 sticky top-14 z-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setOpenIndex(null); // Close any open FAQ when changing category
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-rif-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => {
              const globalIndex = faqData.indexOf(faq);
              const isOpen = openIndex === globalIndex;
              
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-rif-blue-300 transition-colors"
                >
                  <button
                    onClick={() => toggleFAQ(globalIndex)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <h2 className="text-lg md:text-xl font-semibold text-rif-black flex-1">
                      {faq.question}
                    </h2>
                    <FontAwesomeIcon
                      icon={isOpen ? faChevronUp : faChevronDown}
                      className={`h-5 w-5 text-rif-blue-500 flex-shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-2 border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-16">
              <FontAwesomeIcon icon={faQuestionCircle} className="h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">No FAQs Found</h2>
              <p className="text-gray-600 mb-4">
                No FAQs available in this category.
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="inline-block px-6 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors"
              >
                View All FAQs
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-rif-black mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Contact a RIF-certified roofer in your area for personalized answers and a free estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/free-estimate"
              className="inline-block px-8 py-4 bg-rif-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-rif-blue-600 transition-colors"
            >
              Get Free Estimate
            </a>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-white border-2 border-rif-blue-500 text-rif-blue-500 text-lg font-semibold rounded-lg hover:bg-rif-blue-50 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

