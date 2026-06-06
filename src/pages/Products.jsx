import { useState } from 'react';
import { categories, wilayas } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const { products } = useAuth();
  const { t, translateCategory, translateWilaya } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState('All Wilayas');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredProducts = products
    .filter(p => {
      const matchWilaya = selectedWilaya === 'All Wilayas' || p.wilaya === selectedWilaya;
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchWilaya && matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
      return 0;
    });

  return (
    <div className="animate-fade-in" style={{background: 'var(--color-bg)', minHeight: 'calc(100vh - 64px)', padding: 'var(--space-xl) 0 var(--space-2xl)'}}>
      <div className="container">
        <div style={{marginBottom: 'var(--space-xl)'}}>
          <h1>{t('products.allProducts')}</h1>
          <p style={{color: 'var(--color-text-secondary)', fontSize: '0.95rem'}}>
            {filteredProducts.length} {filteredProducts.length > 1 ? t('products.availableListings') : t('products.availableListing')}
          </p>
        </div>

        {/* Filters Bar */}
        <div style={{display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap', marginBottom: 'var(--space-xl)', padding: 'var(--space-md)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)'}}>
          <input
            type="text"
            placeholder={t('products.searchPlaceholder')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{flex: '2 1 200px', minWidth: '150px'}}
          />
          <select value={selectedWilaya} onChange={e => setSelectedWilaya(e.target.value)} style={{flex: '1 1 140px'}}>
            {wilayas.map(w => <option key={w} value={w}>{translateWilaya(w)}</option>)}
          </select>
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} style={{flex: '1 1 140px'}}>
            {categories.map(c => <option key={c.id} value={c.id}>{translateCategory(c.id)}</option>)}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{flex: '1 1 120px'}}>
            <option value="newest">{t('products.sortNewest')}</option>
            <option value="oldest">{t('products.sortOldest')}</option>
          </select>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="empty-state text-center">
            <h3>{t('home.noProductsFound')}</h3>
            <p style={{color: 'var(--color-text-muted)'}}>{t('home.emptyFiltersDesc')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
