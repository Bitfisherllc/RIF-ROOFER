import { getAllGuides } from '@/app/guides/data/guides';

export default function AdminGuidesPage() {
  const guides = getAllGuides();
  const baseUrl = 'https://roofersinflorida.com';

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-rif-black mb-6">Guide URLs</h1>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="space-y-2">
            {guides.map((guide) => (
              <div key={guide.id} className="text-sm">
                <a
                  href={`${baseUrl}/guides/${guide.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rif-blue-500 hover:text-rif-blue-600 hover:underline"
                >
                  {baseUrl}/guides/{guide.slug}
                </a>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Total guides: {guides.length}
        </p>
      </div>
    </div>
  );
}

