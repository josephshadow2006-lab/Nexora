import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { formatKES } from '../data/products.js';

export default function ProductCard({ product }) {
  const { addToCart } = useStore();
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-wrap">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="image-view">View item ↗</span>
      </Link>
      <div className="product-card-info">
        <div className="product-meta"><span>{product.category}</span><span className="rating">★ {product.rating}</span></div>
        <Link className="product-title" to={`/products/${product.id}`}>{product.name}</Link>
        <div className="product-card-bottom"><div className="price-line"><strong>{formatKES(product.price)}</strong>{product.oldPrice > product.price && <del>{formatKES(product.oldPrice)}</del>}</div><button className="quick-add" onClick={() => addToCart(product.id)} aria-label={`Add ${product.name} to cart`}>+</button></div>
      </div>
    </article>
  );
}