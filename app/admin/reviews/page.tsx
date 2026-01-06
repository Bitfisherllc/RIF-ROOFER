'use client';

export default function AdminReviewsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-rif-black mb-6">Manage Reviews</h1>
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <p className="text-gray-600">Reviews management coming soon.</p>
        <p className="text-gray-500 text-sm mt-4">
          Use the <a href="/admin/sync-reviews" className="text-rif-blue-500 hover:underline">Sync Reviews</a> page to sync reviews from Google Places.
        </p>
      </div>
    </div>
  );
}
