import { Link, useLocation } from 'react-router-dom';
import { formatKES } from '../data/products.js';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const order = state?.order;
  if (!order) return <main className="container page-shell empty-state"><h1>No recent order found.</h1><Link className="button button-dark" to="/products">Back to shop</Link></main>;
  return <main className="container page-shell confirmation-shell"><div className="confirmation-card"><div className="confirmation-check">✓</div><div className="eyebrow">ORDER RECEIVED</div><h1>That's a <em>good choice.</em></h1><p>Your demo order has been saved in this browser. This is a confirmation screen only; no payment or delivery has been triggered.</p><div className="confirmation-number"><span>ORDER REFERENCE</span><strong>{order.id}</strong><span>{new Date(order.createdAt).toLocaleString()}</span></div><div className="confirmation-total"><span>Order total</span><strong>{formatKES(order.total)}</strong></div><div className="confirmation-actions"><Link className="button button-dark" to="/orders">View your orders</Link><Link className="button button-outline" to="/products">Keep exploring</Link></div></div></main>;
}