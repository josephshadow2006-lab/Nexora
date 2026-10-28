
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Login from './pages/Login.jsx';
import Orders from './pages/Orders.jsx';
import Admin from './pages/Admin.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';

function NotFound() {
  return (
    <main className="container page-shell empty-state">
      <span>404</span>
      <h1>This page wandered off.</h1>
      <p>Let's get you back to the good stuff.</p>
      <a className="button button-dark" href="/">Back home</a>
    </main>
  );
}

function StoreApp() {
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    async function testBackend() {
      try {
        const response = await fetch(`${API_URL}/products`);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        console.log('NEXORA backend connected. Products:', data);
      } catch (error) {
        console.error('NEXORA backend connection failed:', error);
      }
    }

    testBackend();
  }, []);

  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StoreApp />
    </StoreProvider>
  );
}
