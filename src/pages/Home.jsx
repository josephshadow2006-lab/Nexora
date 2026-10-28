import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { useStore } from '../context/StoreContext.jsx';

const categoryTiles = [
  { name: 'Tech & gadgets', category: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=85' },
  { name: 'Style, your way', category: 'Fashion', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85' },
  { name: 'Home comforts', category: 'Home', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85' }
];

export default function Home() {
  const { products } = useStore();
  return (
    <main>
      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> THE EVERYDAY EDIT</div>
          <h1>Good things.<br /><em>Better living.</em></h1>
          <p>Meet the little upgrades that make everyday life feel a little more extraordinary. Thoughtfully picked, always useful.</p>
          <div className="hero-actions"><Link className="button button-dark" to="/products">Explore the collection <span>↗</span></Link><a className="quiet-link" href="#categories">Find your thing <span>↓</span></a></div>
          <div className="hero-trust"><div className="avatar-stack"><span>J</span><span>A</span><span>M</span></div><div><strong>Loved by everyday explorers</strong><small>4.8/5 average product rating</small></div></div>
        </div>
        <div className="hero-visual">
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=90" alt="A curated selection of timeless everyday style" />
          <div className="hero-image-label"><span>THE NEW EVERYDAY</span><strong>Little things. Big difference.</strong><Link to="/products">Shop the edit ↗</Link></div>
          <div className="hero-stamp"><span>CURATED</span><strong>FOR<br />YOU</strong><span>WITH CARE ✳</span></div>
        </div>
        <div className="hero-side-note">GOOD DESIGN, GOOD FEELING — NEXORA</div>
      </section>

      <section className="benefits-strip"><div className="container benefits-grid"><div><span>✳</span><p><strong>Thoughtfully selected</strong><small>Useful things, chosen well</small></p></div><div><span>↗</span><p><strong>Easy, secure shopping</strong><small>A smoother way to shop</small></p></div><div><span>♡</span><p><strong>Made for everyday</strong><small>Small upgrades, lasting joy</small></p></div><div><span>⌁</span><p><strong>Delivery across Kenya</strong><small>Simple delivery options</small></p></div></div></section>

      <section className="section container" id="categories">
        <div className="section-heading"><div><div className="eyebrow">A GOOD PLACE TO START</div><h2>Find your <em>everyday.</em></h2></div><Link className="underlined-link" to="/products">Browse all categories ↗</Link></div>
        <div className="category-grid">{categoryTiles.map((tile) => <Link key={tile.category} to={`/products?category=${tile.category}`} className="category-tile"><img src={tile.image} alt="" loading="lazy" /><span className="category-tile-content"><small>EXPLORE {tile.category.toUpperCase()}</small><strong>{tile.name}</strong></span><span className="category-arrow">↗</span></Link>)}</div>
      </section>

      <section className="section featured-section"><div className="container"><div className="section-heading"><div><div className="eyebrow">THE CURRENT FAVOURITES</div><h2>Good picks, <em>great finds.</em></h2><p className="section-subtitle">A few things we think you'll love having around.</p></div><Link className="underlined-link" to="/products">Shop everything ↗</Link></div><div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}</div></div></section>

      <section className="quote-banner container"><div className="quote-mark">“</div><p>It's not about having more things.<br /><em>It's about finding the right things.</em></p><span>THE NEXORA POINT OF VIEW</span><Link to="/products" className="button button-light">Find your next favourite ↗</Link></section>
    </main>
  );
}