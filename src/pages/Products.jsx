import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { categories } from '../data/products.js';
import { useStore } from '../context/StoreContext.jsx';

export default function Products() {
  const { products } = useStore();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const [sort, setSort] = useState('featured');
  const category = params.get('category') || 'All';

  const filtered = useMemo(() => {
    let result = products.filter((p) => (category === 'All' || p.category === category) && `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(query.toLowerCase()));
    if (sort === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [products, category, query, sort]);

  const selectCategory = (next) => {
    const nextParams = new URLSearchParams(params);
    if (next === 'All') nextParams.delete('category'); else nextParams.set('category', next);
    setParams(nextParams);
  };

  return (
    <main className="container page-shell">
      <div className="page-intro"><div className="eyebrow">THE NEXORA COLLECTION</div><h1>Find something <em>good.</em></h1><p>Everyday essentials, little luxuries and useful things you'll be glad you found.</p></div>
      <div className="shop-toolbar"><label className="search-box"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, categories..." aria-label="Search products" /><button onClick={() => setQuery('')} aria-label="Clear search">×</button></label><label className="sort-control"><span>Sort by</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div>
      <div className="category-pills">{categories.map((item) => <button key={item} onClick={() => selectCategory(item)} className={`category-pill${category === item ? ' selected' : ''}`}>{item}</button>)}</div>
      <div className="results-line"><span>{filtered.length} {filtered.length === 1 ? 'item' : 'items'} to discover</span><span>Selected with care ✳</span></div>
      {filtered.length ? <div className="product-grid shop-product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><span>⌕</span><h2>No matches just yet.</h2><p>Try another search or choose a different category.</p><button className="button button-dark" onClick={() => { setQuery(''); selectCategory('All'); }}>Clear filters</button></div>}
    </main>
  );
}