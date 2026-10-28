import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';

export default function Navbar() {
  const { cartCount, user, logout } = useStore();
  const navigate = useNavigate();
  const linkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="announcement">A little more joy in every delivery · Free delivery over KSh 5,000</div>
      <div className="nav-wrap container">
        <Link className="brand" to="/" aria-label="NEXORA home"><span className="brand-mark">N</span>NEXORA<span className="brand-dot">.</span></Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink end to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/products" className={linkClass}>Shop</NavLink>
          <a className="nav-link" href="/#story">Our story</a>
        </nav>
        <div className="nav-actions">
          <Link className="icon-link search-shortcut" to="/products" aria-label="Search products"><span>⌕</span></Link>
          {user ? (
            <div className="user-menu">
              <Link className="account-link" to={user.isAdmin ? '/admin' : '/orders'}><span className="user-avatar">{user.name?.[0]?.toUpperCase() || 'U'}</span><span className="account-name">{user.name}</span></Link>
              {user.isAdmin && <Link className="admin-shortcut" to="/admin">Admin</Link>}
              <button className="text-button" onClick={handleLogout}>Sign out</button>
            </div>
          ) : <Link className="icon-link account-shortcut" to="/login" aria-label="Sign in">♙</Link>}
          <Link className="cart-link" to="/cart" aria-label={`Cart with ${cartCount} items`}><span>Bag</span><span className="cart-count">{cartCount}</span></Link>
        </div>
      </div>
    </header>
  );
}