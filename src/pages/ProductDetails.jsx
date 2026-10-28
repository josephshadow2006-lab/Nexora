import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { formatKES } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';

export default function ProductDetails() {
  const { id } = useParams();
  const { products, addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const product = products.find((p) => p.id === id);
  if (!product) return <main className="container page-shell empty-state"><h1>We couldn't find that item.</h1><Link className="button button-dark" to="/products">Back to shop</Link></main>;
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const add = () => { addToCart(product.id, quantity); setAdded(true); };
  return (
    <main className="container page-shell">
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/products">Shop</Link><span>/</span><span>{product.name}</span></div>
      <section className="detail-layout"><div className="detail-image"><img src={product.image} alt={product.name} /></div><div className="detail-info"><div className="eyebrow">{product.category.toUpperCase()} · NEXORA EDIT</div><h1>{product.name}</h1><div className="detail-rating"><span>★★★★★</span> {product.rating} <span className="muted">({product.reviews} reviews)</span></div><div className="detail-price">{formatKES(product.price)} {product.oldPrice > product.price && <del>{formatKES(product.oldPrice)}</del>}</div><p className="detail-description">{product.description}</p><div className="detail-perks"><span>✓ Thoughtfully selected</span><span>✓ Easy returns on eligible items</span><span>✓ Delivery across Kenya</span></div><div className="detail-buy"><div className="quantity-control"><button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button><span>{quantity}</span><button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">+</button></div><button className="button button-dark add-detail" onClick={add}>Add to bag · {formatKES(product.price * quantity)}</button></div>{added && <div className="success-note">✓ Added to your bag. <Link to="/cart">View bag</Link></div>}<p className="detail-small">Product details and prices are demo content for this starter store.</p></div></section>
      {related.length > 0 && <section className="section"><div className="section-heading"><div><div className="eyebrow">MORE TO LOVE</div><h2>Goes well <em>with.</em></h2></div><Link className="underlined-link" to="/products">See all ↗</Link></div><div className="product-grid">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div></section>}
    </main>
  );
}