import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer" id="story">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="brand brand-light" to="/"><span className="brand-mark">N</span>NEXORA<span className="brand-dot">.</span></Link>
          <p>Thoughtful finds for the way you live, work and unwind.</p>
        </div>
        <div><h4>Explore</h4><Link to="/products">Shop all</Link><Link to="/products?category=Home">Home & living</Link><Link to="/products?category=Electronics">Tech essentials</Link></div>
        <div><h4>Help</h4><a href="mailto:hello@nexora.example">Contact us</a><Link to="/orders">Your orders</Link><Link to="/cart">Shopping bag</Link></div>
        <div className="newsletter"><h4>Good things, occasionally.</h4><p>New arrivals and little updates from NEXORA.</p><a className="footer-email" href="mailto:hello@nexora.example">hello@nexora.example ↗</a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} NEXORA. Demo storefront.</span><span>Made for everyday living.</span></div>
    </footer>
  );
}