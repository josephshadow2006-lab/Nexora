import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { formatKES } from '../data/products.js';

const blank = { name: '', category: 'Electronics', price: '', oldPrice: '', image: '', description: '' };

export default function Admin() {
  const { user, products, orders, addProduct, deleteProduct, setOrders } = useStore();
  const [form, setForm] = useState(blank);
  const [message, setMessage] = useState('');
  if (!user) return <Navigate to="/login" replace />;
  if (!user.isAdmin) return <main className="container page-shell empty-state"><h1>Admin access only.</h1><p>Sign out and sign in using the demo admin email to open the dashboard.</p><Link className="button button-dark" to="/login">Sign in</Link></main>;

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || Number(form.price) <= 0 || !form.image.trim()) { setMessage('Enter a product name, a positive price and an image URL.'); return; }
    addProduct({ ...form, price: Number(form.price), oldPrice: Number(form.oldPrice) || 0 });
    setForm(blank);
    setMessage('Product added to this browser.');
  };

  return <main className="container page-shell admin-shell"><div className="admin-heading"><div><div className="eyebrow">NEXORA STORE MANAGEMENT</div><h1>Store <em>dashboard.</em></h1><p>Welcome back, {user.name}. Changes are stored locally in this browser.</p></div><span className="admin-chip">DEMO ADMIN</span></div><div className="admin-stats"><div><span>PRODUCTS</span><strong>{products.length}</strong></div><div><span>ORDERS</span><strong>{orders.length}</strong></div><div><span>ORDER VALUE</span><strong>{formatKES(orders.reduce((sum, order) => sum + order.total, 0))}</strong></div></div><div className="admin-columns"><section className="admin-panel"><div className="panel-heading"><div><div className="eyebrow">CATALOGUE</div><h2>Add a product</h2></div></div><form className="form-stack" onSubmit={submit}><label>Product name<input name="name" value={form.name} onChange={update} required placeholder="e.g. Everyday Backpack" /></label><div className="form-grid"><label>Category<select name="category" value={form.category} onChange={update}><option>Electronics</option><option>Fashion</option><option>Home</option><option>Lifestyle</option><option>Beauty</option></select></label><label>Price (KES)<input name="price" value={form.price} onChange={update} type="number" min="1" required placeholder="2500" /></label><label>Old price (KES)<input name="oldPrice" value={form.oldPrice} onChange={update} type="number" min="0" placeholder="Optional" /></label><label>Image URL<input name="image" value={form.image} onChange={update} type="url" required placeholder="https://..." /></label><label className="wide-field">Description<textarea name="description" value={form.description} onChange={update} rows="3" placeholder="What makes this item useful?" /></label></div>{message && <p className={message.startsWith('Product') ? 'success-note' : 'form-error'}>{message}</p>}<button className="button button-dark full-button" type="submit">Add to catalogue +</button></form></section><section className="admin-panel"><div className="panel-heading"><div><div className="eyebrow">LIVE CATALOGUE</div><h2>Products ({products.length})</h2></div></div><div className="admin-product-list">{products.map((p) => <div className="admin-product-row" key={p.id}><img src={p.image} alt="" /><div><strong>{p.name}</strong><small>{p.category} · {formatKES(p.price)}</small></div><button className="remove-button" onClick={() => deleteProduct(p.id)} aria-label={`Delete ${p.name}`}>Remove</button></div>)}</div></section></div><section className="admin-panel admin-orders"><div className="panel-heading"><div><div className="eyebrow">RECENT ACTIVITY</div><h2>Demo orders ({orders.length})</h2></div><button className="text-button danger-text" onClick={() => { if (window.confirm('Clear all demo orders from this browser?')) setOrders([]); }}>Clear orders</button></div>{orders.length ? orders.slice(0, 8).map((order) => <div className="admin-order-row" key={order.id}><div><strong>{order.id}</strong><small>{order.customer?.name} · {order.customer?.email}</small></div><span>{new Date(order.createdAt).toLocaleDateString()}</span><strong>{formatKES(order.total)}</strong></div>) : <p className="muted">No demo orders yet.</p>}</section><p className="demo-disclaimer">Important: this dashboard is a front-end demonstration, not secure administration. It has no server, database or real authorization. Do not use it to manage real customer information.</p></main>;
}