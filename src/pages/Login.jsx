import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';

export default function Login() {
  const { user, login } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  if (user) return <Navigate to={user.isAdmin ? '/admin' : '/'} replace />;

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) { setMessage('Enter a valid email address.'); return; }
    const nextUser = login({ name: name.trim(), email: email.trim() });
    navigate(location.state?.from || (nextUser.isAdmin ? '/admin' : '/orders'), { replace: true });
  };

  return <main className="container page-shell auth-shell"><div className="auth-card"><div className="auth-icon">N<span>.</span></div><div className="eyebrow">WELCOME TO NEXORA</div><h1>Good to have <em>you here.</em></h1><p>Sign in to see your orders and keep your favourites close.</p><form className="form-stack" onSubmit={submit}><label>Your name <span className="optional">(optional)</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="How should we call you?" autoComplete="name" /></label><label>Email address<input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" type="email" required autoComplete="email" /></label>{message && <p className="form-error">{message}</p>}<button className="button button-dark full-button" type="submit">Continue with email ↗</button></form><div className="demo-note"><strong>Demo admin access</strong><span>Enter <code>admin@nexora.demo</code> to open the admin dashboard.</span></div><p className="auth-terms">Demo sign-in only. No password is requested and no real account is created.</p><Link className="underlined-link auth-back" to="/products">Continue browsing instead</Link></div></main>;
}