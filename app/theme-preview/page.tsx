import Link from 'next/link';

export default function ThemePreviewPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-rif-black mb-4">
            Choose Your Theme
          </h1>
          <p className="text-lg text-gray-600">
            Select a look and feel for your RIF website
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-rif-blue-500 hover:text-rif-blue-600"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Theme Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Option 1: Clean & Professional */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-rif-blue-500">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-rif-blue-100 text-rif-blue-700 rounded-full text-sm font-semibold mb-2">
                CURRENT
              </span>
              <h2 className="text-2xl font-bold text-rif-black mb-2">
                Clean & Professional
              </h2>
              <p className="text-gray-600 mb-4">
                Modern, clean, professional, trustworthy
              </p>
            </div>
            <div className="space-y-3">
              <div className="h-12 bg-rif-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">
                Primary Button
              </div>
              <div className="h-12 bg-white border-2 border-rif-blue-500 rounded-lg flex items-center justify-center text-rif-blue-500 font-semibold">
                Secondary Button
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700">
                  Card with subtle shadow and clean borders
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                ✅ Clean white backgrounds<br />
                ✅ Generous white space<br />
                ✅ Subtle shadows<br />
                ✅ Professional typography
              </p>
            </div>
          </div>

          {/* Option 2: Bold & Confident */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200 hover:border-rif-blue-300 transition-colors">
            <h2 className="text-2xl font-bold text-rif-black mb-2">
              Bold & Confident
            </h2>
            <p className="text-gray-600 mb-4">
              Strong, confident, modern, attention-grabbing
            </p>
            <div className="space-y-3">
              <div className="h-12 bg-rif-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                Primary Button
              </div>
              <div className="h-12 bg-rif-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">
                Secondary Button
              </div>
              <div className="p-4 bg-rif-blue-50 rounded-lg border-2 border-rif-blue-200">
                <p className="text-sm text-rif-blue-900 font-medium">
                  Card with bold blue accent
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Bold blue sections<br />
                Strong contrast<br />
                Prominent CTAs<br />
                Dynamic layouts
              </p>
            </div>
          </div>

          {/* Option 3: Warm & Approachable */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200 hover:border-rif-blue-300 transition-colors">
            <h2 className="text-2xl font-bold text-rif-black mb-2">
              Warm & Approachable
            </h2>
            <p className="text-gray-600 mb-4">
              Friendly, approachable, welcoming, residential
            </p>
            <div className="space-y-3">
              <div className="h-12 bg-rif-blue-500 rounded-xl flex items-center justify-center text-white font-semibold shadow-sm">
                Primary Button
              </div>
              <div className="h-12 bg-amber-50 border-2 border-amber-200 rounded-xl flex items-center justify-center text-amber-700 font-semibold">
                Secondary Button
              </div>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-sm text-gray-700">
                  Card with warm tones and rounded corners
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Warm color tones<br />
                Softer shadows<br />
                Rounded corners<br />
                Friendly feel
              </p>
            </div>
          </div>

          {/* Option 4: Minimal & Modern */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200 hover:border-rif-blue-300 transition-colors">
            <h2 className="text-2xl font-bold text-rif-black mb-2">
              Minimal & Modern
            </h2>
            <p className="text-gray-600 mb-4">
              Minimalist, clean, contemporary, sophisticated
            </p>
            <div className="space-y-3">
              <div className="h-12 bg-rif-blue-500 rounded-none flex items-center justify-center text-white font-medium">
                Primary Button
              </div>
              <div className="h-12 bg-white border border-gray-300 rounded-none flex items-center justify-center text-rif-black font-medium">
                Secondary Button
              </div>
              <div className="p-4 bg-white border border-gray-200 rounded-none">
                <p className="text-sm text-gray-700">
                  Card with minimal design and clean lines
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Maximum white space<br />
                Minimal elements<br />
                Clean lines<br />
                Simple typography
              </p>
            </div>
          </div>

          {/* Option 5: Storm-Ready & Durable */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200 hover:border-rif-blue-300 transition-colors">
            <h2 className="text-2xl font-bold text-rif-black mb-2">
              Storm-Ready & Durable
            </h2>
            <p className="text-gray-600 mb-4">
              Strong, reliable, weather-focused, Florida-specific
            </p>
            <div className="space-y-3">
              <div className="h-12 bg-rif-blue-600 rounded-lg flex items-center justify-center text-white font-bold border-2 border-rif-blue-700">
                Primary Button
              </div>
              <div className="h-12 bg-gray-700 border-2 border-gray-800 rounded-lg flex items-center justify-center text-white font-semibold">
                Secondary Button
              </div>
              <div className="p-4 bg-gray-100 rounded-lg border-2 border-gray-300">
                <p className="text-sm text-gray-800 font-medium">
                  Card with strong borders and durable feel
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Strong, durable feel<br />
                Weather-themed<br />
                High contrast<br />
                Professional reliability
              </p>
            </div>
          </div>
        </div>

        {/* Color Palette Display */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-rif-black mb-6">
            RIF Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <div className="h-24 bg-rif-blue-500 rounded-lg mb-2 border border-gray-200"></div>
              <p className="text-sm font-semibold">RIF Blue</p>
              <p className="text-xs text-gray-500">#255eab</p>
            </div>
            <div>
              <div className="h-24 bg-rif-black rounded-lg mb-2 border border-gray-200"></div>
              <p className="text-sm font-semibold">RIF Black</p>
              <p className="text-xs text-gray-500">#231f20</p>
            </div>
            <div>
              <div className="h-24 bg-white border-2 border-gray-300 rounded-lg mb-2"></div>
              <p className="text-sm font-semibold">White</p>
              <p className="text-xs text-gray-500">#ffffff</p>
            </div>
            <div>
              <div className="h-24 bg-rif-blue-600 rounded-lg mb-2 border border-gray-200"></div>
              <p className="text-sm font-semibold">Blue Dark</p>
              <p className="text-xs text-gray-500">#1e4a87</p>
            </div>
            <div>
              <div className="h-24 bg-rif-blue-300 rounded-lg mb-2 border border-gray-200"></div>
              <p className="text-sm font-semibold">Blue Light</p>
              <p className="text-xs text-gray-500">#66a2d5</p>
            </div>
          </div>
        </div>

        {/* Design Elements */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-rif-black mb-6">
            Design Elements to Customize
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Typography */}
            <div>
              <h3 className="font-semibold mb-3">Typography</h3>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-rif-black">Bold Heading</p>
                <p className="text-lg font-semibold text-rif-black">Semibold</p>
                <p className="text-base text-gray-700">Body text</p>
                <p className="text-sm text-gray-600">Small text</p>
              </div>
            </div>

            {/* Buttons */}
            <div>
              <h3 className="font-semibold mb-3">Button Styles</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-rif-blue-500 text-white rounded-lg font-semibold">
                  Rounded
                </button>
                <button className="w-full px-4 py-2 bg-rif-blue-500 text-white rounded-none font-semibold">
                  Square
                </button>
                <button className="w-full px-4 py-2 bg-rif-blue-500 text-white rounded-full font-semibold">
                  Pill
                </button>
              </div>
            </div>

            {/* Cards */}
            <div>
              <h3 className="font-semibold mb-3">Card Styles</h3>
              <div className="space-y-2">
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                  Flat
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  Elevated
                </div>
                <div className="p-4 bg-white border-2 border-gray-300 rounded-lg">
                  Bordered
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


















