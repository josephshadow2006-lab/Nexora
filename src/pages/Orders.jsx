import { Link, Navigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { formatKES } from '../data/products.js';

export default function Orders() {
  const { user, orders } = useStore();
  if (!user) return <Navigate to="/login" replace />;
  const mine = orders.filter((order) => order.customer?.email?.toLowerCase() === user.email.toLowerCase());
  return <main className="container page-shell"><div className="page-intro compact-intro"><div className="eyebrow">YOUR NEXORA ACCOUNT</div><h1>Your little <em>list.</em></h1><p>Hi {user.name}, here are the orders saved in this browser.</p></div>{mine.length ? <div className="orders-list">{mine.map((order) => <article className="order-card" key={order.id}><div className="order-card-top"><div><span className="eyebrow">ORDER REFERENCE</span><h2>{order.id}</h2></div><span className="status-pill">{order.status}</span></div><p className="order-date">{new Date(order.createdAt).toLocaleString()}</p><div className="order-items-preview">{order.items.map((item) => <div key={item.productId}><img src={item.image} alt="" /><span>{item.name} × {item.quantity}</span></div>)}</div><div className="order-card-bottom"><span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</span><strong>{formatKES(order.total)}</strong></div></article>)}</div> : <div className="empty-state"><span>↗</span><h2>Your next favourite is out there.</h2><p>You haven't placed a demo order yet.</p><Link className="button button-dark" to="/products">Explore the shop</Link></div>}</main>;
}