'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSortAmountDown,
  faArrowUp,
  faArrowDown,
  faSpinner,
  faSave,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

const SLUG_TO_NAME: Record<string, string> = {
  'attic-breeze': 'Attic Breeze',
  decra: 'Decra',
  'kennedy-skylights': 'Kennedy Skylights',
  'knight-shield': 'KNIGHT SHIELD',
  'lifetime-tool': 'LifeTime Tool',
  'prp-lumber': 'PRP Lumber',
  mcelroy: 'McElroy',
  mfm: 'MFM',
  'premier-metal-roof': 'Premier Metal Roof MFG',
  'queen-tile': 'Queen Tile',
  'raptor-underlayment': 'Raptor Synthetic Underlayment',
  roser: 'Roser',
  'sol-r-skin': 'SOL-R-SKIN',
  tilcor: 'Tilcor',
  'unified-steel': 'Unified Steel',
};

export default function AdminProductOrderPage() {
  const [order, setOrder] = useState<string[]>([]);
  const [hidden, setHidden] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await fetch('/api/admin/product-order');
      if (res.ok) {
        const data = await res.json();
        setOrder(data.order ?? []);
        setHidden(Array.isArray(data.hidden) ? data.hidden : []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleVisible = (slug: string) => {
    setHidden((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
    setMessage(null);
  };

  const move = (index: number, direction: 'up' | 'down') => {
    const next = [...order];
    const i = direction === 'up' ? index - 1 : index + 1;
    if (i < 0 || i >= next.length) return;
    [next[index], next[i]] = [next[i], next[index]];
    setOrder(next);
    setMessage(null);
  };

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/product-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order, hidden }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({ type: 'success', text: 'Product order and visibility saved. /products will reflect the changes.' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save' });
      }
    } catch (e) {
      setMessage({ type: 'error', text: 'Failed to save' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 text-rif-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-rif-black mb-2 flex items-center gap-2">
            <FontAwesomeIcon icon={faSortAmountDown} className="h-8 w-8 text-rif-blue-500" />
            Product Order
          </h1>
          <p className="text-gray-600 mb-6">
            Set the order and visibility of products on the <strong>/products</strong> page. Top of the list = first on the page. Hidden products do not appear on the public page.
          </p>

          {message && (
            <div
              className={`mb-6 px-4 py-3 rounded-lg ${
                message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}

          <ul className="space-y-2 mb-8">
            {order.map((slug, index) => {
              const isHidden = hidden.includes(slug);
              return (
                <li
                  key={slug}
                  className={`flex items-center justify-between gap-4 py-3 px-4 rounded-lg border ${
                    isHidden ? 'bg-gray-100 border-gray-200 opacity-80' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <span className="font-medium text-rif-black">
                    {index + 1}. {SLUG_TO_NAME[slug] ?? slug}
                    {isHidden && (
                      <span className="ml-2 text-sm font-normal text-gray-500">(hidden from /products)</span>
                    )}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleVisible(slug)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        isHidden
                          ? 'text-amber-700 bg-amber-50 hover:bg-amber-100'
                          : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                      }`}
                      title={isHidden ? 'Show on /products' : 'Hide from /products'}
                    >
                      <FontAwesomeIcon icon={isHidden ? faEyeSlash : faEye} className="h-4 w-4" />
                      {isHidden ? 'Show' : 'Hide'}
                    </button>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => move(index, 'up')}
                        disabled={index === 0}
                        className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-rif-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        aria-label="Move up"
                      >
                        <FontAwesomeIcon icon={faArrowUp} className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(index, 'down')}
                        disabled={index === order.length - 1}
                        className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-rif-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        aria-label="Move down"
                      >
                        <FontAwesomeIcon icon={faArrowDown} className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} />
                Save order
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
