'use client';

import Logo from '@/components/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldHalved,
  faWarehouse,
  faCertificate,
  faHandshake,
  faDollarSign,
  faUsers,
  faCheckCircle,
  faRulerCombined,
  faClipboardCheck,
  faFileContract,
  faWind,
  faWater,
  faPalette,
  faSun,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-16 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <Logo
              variant="full"
              color="blue"
              width={240}
              height={107}
              className="h-16 md:h-20 w-auto"
            />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black mb-6 tracking-tight">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-light">
            RIF is a Florida-owned, USA-based roofing team built to help homeowners get a better roof—faster, cleaner, and with less stress. We specialize in stone-coated metal roofing systems designed for Florida's wind zones, storm seasons, and coastal conditions, while delivering the look many homeowners want—tile or shake styles with modern performance.
          </p>
        </div>
      </section>

      {/* Why Homeowners Choose RIF */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black text-center mb-12 tracking-tight">
            Why Homeowners Choose RIF
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            Homeowners choose RIF because we combine local expertise with a supply-chain advantage that keeps projects moving.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faShieldHalved} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Florida-Owned. USA-Based</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We understand Florida permitting, wind-zone requirements, and HOA processes because we work in them every day.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faWarehouse} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">In-Stock Advantage</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Our large Florida warehouse keeps stone-coated panels, underlayment, flashings, vents, and skylights ready—so timelines don't get derailed.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faCertificate} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Certified Partner Network</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Every RIF partner is manufacturer-certified for stone-coated metal systems, and we match the right crew to the exact product line being installed.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faHandshake} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Direct Manufacturer Relationships</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We work directly with QueenTile, DECRA, Tilcor, Unified Steel, and more for accurate specs, faster sourcing, and current approvals.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faDollarSign} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Installer-Direct Pricing</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                As the installation arm tied to PRP Roofing (Premium Roofing Products), we extend distributor-level pricing on residential and commercial installations.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faUsers} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">One Accountable Team</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                RIF manages your project end-to-end—product selection, financing, scheduling, delivery, permits/HOA coordination, daily updates, and final quality checks.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors md:col-span-2 lg:col-span-3">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faShieldHalved} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-rif-black">Built for Florida</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Our systems are designed for high wind-uplift and impact performance, with corrosion-resistant components for coastal zones and energy-efficient assemblies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Our Florida-Wide Install Network Works */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black text-center mb-6 tracking-tight">
            How Our Florida-Wide Install Network Works
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            We've built a process that's structured, predictable, and easy to follow:
          </p>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-start p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0">
                <div className="p-4 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faRulerCombined} className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-rif-black mb-3">Assessment & Options</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We verify wind zone/NOA requirements, measure your roof, and help you choose the right profile and color.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0">
                <div className="p-4 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faCertificate} className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-rif-black mb-3">Certified Crew Match</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We assign a RIF Certified Installer in your area with product-specific credentials.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0">
                <div className="p-4 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faWarehouse} className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-rif-black mb-3">Pre-Staged Materials</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Your full roofing system is reserved and staged from our Florida warehouse before tear-off.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0">
                <div className="p-4 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faClipboardCheck} className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-rif-black mb-3">Managed Install</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Tear-off, dry-in, panels, flashings, ventilation, skylights—project-managed by RIF with photo updates along the way.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0">
                <div className="p-4 bg-rif-blue-500 rounded-xl">
                  <FontAwesomeIcon icon={faFileContract} className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-rif-black mb-3">Final QA & Docs</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We handle inspections and close-out, plus provide warranty and insurance documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stone-Coated Metal Roofing: Built for Florida */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-rif-black text-center mb-6 tracking-tight">
            Stone-Coated Metal Roofing: Built for Florida
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            Stone-coated metal is one of the smartest roofing upgrades for Florida homeowners because it's:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border-2 border-gray-200 hover:border-rif-blue-500 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <FontAwesomeIcon icon={faWind} className="h-8 w-8 text-rif-blue-500" />
                <h3 className="text-2xl font-semibold text-rif-black">Hurricane-Tough</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Strong wind-uplift and impact performance for storm season.
              </p>
            </div>

            <div className="p-8 rounded-2xl border-2 border-gray-200 hover:border-rif-blue-500 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <FontAwesomeIcon icon={faWater} className="h-8 w-8 text-rif-blue-500" />
                <h3 className="text-2xl font-semibold text-rif-black">Salt-Air Smart</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Corrosion-resistant coatings, substrates, and fasteners for coastal areas.
              </p>
            </div>

            <div className="p-8 rounded-2xl border-2 border-gray-200 hover:border-rif-blue-500 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <FontAwesomeIcon icon={faPalette} className="h-8 w-8 text-rif-blue-500" />
                <h3 className="text-2xl font-semibold text-rif-black">Beautiful</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Profiles that look like tile or shake with stone-coated finishes.
              </p>
            </div>

            <div className="p-8 rounded-2xl border-2 border-gray-200 hover:border-rif-blue-500 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <FontAwesomeIcon icon={faSun} className="h-8 w-8 text-rif-blue-500" />
                <h3 className="text-2xl font-semibold text-rif-black">Energy-Conscious</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Reflective options and ventilated assemblies to help manage heat.
              </p>
            </div>

            <div className="p-8 rounded-2xl border-2 border-gray-200 hover:border-rif-blue-500 transition-colors md:col-span-2">
              <div className="flex items-center gap-4 mb-4">
                <FontAwesomeIcon icon={faClock} className="h-8 w-8 text-rif-blue-500" />
                <h3 className="text-2xl font-semibold text-rif-black">Long-Lasting</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Manufacturer limited warranties (product-dependent) for long-term confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-semibold text-rif-black mb-6 leading-relaxed">
            If you want a roof system that's engineered for Florida and managed by one accountable team from start to finish, RIF is ready to help.
          </p>
        </div>
      </section>
    </div>
  );
}

















