import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';
import { formatKES } from '../data/products.js';

export default function Checkout() {
  const { cart, products, subtotal, user, placeOrder } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: '', county: 'Nairobi', address: '', payment: 'mpesa', notes: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const lines = cart.map((item) => ({ ...item, product: products.find((p) => p.id === item.productId) })).filter((item) => item.product);
  const shipping = subtotal >= 5000 ? 0 : 250;
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  if (!lines.length) return <Navigate to="/cart" replace />;

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.includes('@') || !form.phone.trim() || !form.address.trim()) { setError('Please complete your name, email, phone and delivery address.'); return; }
    setSubmitting(true);
    setError('');
    try {
      const order = await placeOrder(form);
      navigate('/order-confirmation', { state: { order } });
    } catch (err) {
      setError(err.message || 'Could not place your order. Check that the backend is running.');
    } finally { setSubmitting(false); }
  };

  return <main className="container page-shell"><div className="page-intro compact-intro"><div className="eyebrow">ALMOST YOURS</div><h1>Let's get it <em>to you.</em></h1><p>Enter your delivery details to place your demo order.</p></div><div className="checkout-layout"><form className="checkout-form" onSubmit={submit}><section className="checkout-section"><div className="checkout-section-title"><span>01</span><div><h2>Contact details</h2><p>Where can we reach you?</p></div></div><div className="form-grid"><label>Full name<input name="name" value={form.name} onChange={update} required placeholder="Your full name" /></label><label>Email address<input name="email" value={form.email} onChange={update} type="email" required placeholder="you@example.com" /></label><label>Phone number<input name="phone" value={form.phone} onChange={update} required placeholder="+254 7XX XXX XXX" /></label><label>County / city<input name="county" value={form.county} onChange={update} required placeholder="Nairobi" /></label><label className="wide-field">Delivery address<input name="address" value={form.address} onChange={update} required placeholder="Estate, building, street and any directions" /></label><label className="wide-field">Delivery notes <span className="optional">(optional)</span><textarea name="notes" value={form.notes} onChange={update} placeholder="Anything the delivery person should know?" rows="3" /></label></div></section><section className="checkout-section"><div className="checkout-section-title"><span>02</span><div><h2>Payment preference</h2><p>Choose how you intend to pay.</p></div></div><div className="payment-options"><label className={`payment-option${form.payment === 'mpesa' ? ' chosen' : ''}`}><input type="radio" name="payment" value="mpesa" checked={form.payment === 'mpesa'} onChange={update} /><span className="payment-icon">M</span><span><strong>M-Pesa</strong><small>Mobile money · not charged in this demo</small></span></label><label className={`payment-option${form.payment === 'delivery' ? ' chosen' : ''}`}><input type="radio" name="payment" value="delivery" checked={form.payment === 'delivery'} onChange={update} /><span className="payment-icon">↗</span><span><strong>Pay on delivery</strong><small>Confirm payment with the delivery team</small></span></label></div></section>{error && <p className="form-error">{error}</p>}<button type="submit" className="button button-dark full-button">{submitting ? 'Submitting order…' : `Place order · ${formatKES(subtotal + shipping)} ↗`}</button><p className="demo-disclaimer">Orders are submitted to the development backend. M-Pesa is not active yet; no payment is charged in this phase.</p></form><aside className="order-summary checkout-summary"><h2>Your order</h2>{lines.map(({ product, quantity }) => <div className="checkout-mini-item" key={product.id}><img src={product.image} alt="" /><div><strong>{product.name}</strong><small>Qty {quantity}</small></div><b>{formatKES(product.price * quantity)}</b></div>)}<div className="summary-row"><span>Subtotal</span><strong>{formatKES(subtotal)}</strong></div><div className="summary-row"><span>Delivery</span><strong>{shipping ? formatKES(shipping) : 'FREE'}</strong></div><div className="summary-total"><span>Total</span><strong>{formatKES(subtotal + shipping)}</strong></div><Link className="continue-link" to="/cart">← Edit bag</Link></aside></div></main>;
}