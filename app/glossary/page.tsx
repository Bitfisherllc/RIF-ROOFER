'use client';

import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { glossaryTerms, glossaryCategories, getTermsByCategory, searchTerms, type GlossaryTerm } from './data/glossary';

export default function GlossaryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const displayedTerms = useMemo(() => {
    let terms: GlossaryTerm[] = [];
    
    if (searchQuery.trim()) {
      terms = searchTerms(searchQuery);
      // Also filter by category if one is selected
      if (selectedCategory !== 'All') {
        terms = terms.filter(term => term.category === selectedCategory);
      }
    } else {
      terms = getTermsByCategory(selectedCategory);
    }
    
    // Sort alphabetically by term
    return terms.sort((a, b) => a.term.localeCompare(b.term));
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-rif-blue-500 rounded-2xl">
              <FontAwesomeIcon icon={faBook} className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-rif-black mb-6 tracking-tight">
            Roofing Glossary
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-light">
            Comprehensive glossary of stone-coated metal roofing terms, definitions, and industry terminology.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-6 bg-white border-b border-gray-200 sticky top-14 z-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search terms..."
                className="w-full pl-12 pr-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-rif-blue-500 focus:outline-none focus:ring-2 focus:ring-rif-blue-200"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSearchQuery(''); // Clear search when changing category
                }}
                className="appearance-none bg-white border-2 border-gray-300 rounded-lg px-6 py-3 pr-10 text-lg focus:border-rif-blue-500 focus:outline-none focus:ring-2 focus:ring-rif-blue-200 cursor-pointer"
              >
                {glossaryCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {searchQuery && (
            <div className="mt-4 text-sm text-gray-600">
              {displayedTerms.length} {displayedTerms.length === 1 ? 'term' : 'terms'} found
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </div>
          )}
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {displayedTerms.length === 0 ? (
            <div className="text-center py-16">
              <FontAwesomeIcon icon={faBook} className="h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Terms Found</h2>
              <p className="text-gray-600 mb-4">
                {searchQuery
                  ? `No terms match your search "${searchQuery}".`
                  : `No terms available in ${selectedCategory} category.`
                }
              </p>
              {(searchQuery || selectedCategory !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="inline-block px-6 py-3 bg-rif-blue-500 text-white rounded-lg hover:bg-rif-blue-600 transition-colors"
                >
                  View All Terms
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {displayedTerms.map((term, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:border-rif-blue-300 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="text-2xl font-semibold text-rif-black">{term.term}</h2>
                    <span className="px-3 py-1 bg-rif-blue-50 text-rif-blue-700 text-sm font-medium rounded-full whitespace-nowrap">
                      {term.category}
                    </span>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">{term.definition}</p>
                  {term.relatedTerms && term.relatedTerms.length > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Related Terms:</p>
                      <div className="flex flex-wrap gap-2">
                        {term.relatedTerms.map((relatedTerm, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                            onClick={() => setSearchQuery(relatedTerm)}
                          >
                            {relatedTerm}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
