import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { initialProducts } from '../data/products.js';

const StoreContext = createContext(null);
const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => read('nexora_products', initialProducts));
  const [cart, setCart] = useState(() => read('nexora_cart', []));
  const [user, setUser] = useState(() => read('nexora_user', null));
  const [orders, setOrders] = useState(() => read('nexora_orders', []));

  useEffect(() => localStorage.setItem('nexora_products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('nexora_cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('nexora_user', JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem('nexora_orders', JSON.stringify(orders)), [orders]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const addToCart = (productId, quantity = 1) => {
    setCart((current) => {
      const found = current.find((item) => item.productId === productId);
      return found
        ? current.map((item) => item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item)
        : [...current, { productId, quantity }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      setCart((current) => current.filter((item) => item.productId !== productId));
      return;
    }
    setCart((current) => current.map((item) => item.productId === productId ? { ...item, quantity } : item));
  };

  const removeFromCart = (productId) => setCart((current) => current.filter((item) => item.productId !== productId));
  const clearCart = () => setCart([]);

  const login = ({ name, email }) => {
    const nextUser = { name: name || email.split('@')[0], email, isAdmin: email.toLowerCase() === 'admin@nexora.demo' };
    setUser(nextUser);
    return nextUser;
  };

  const logout = () => setUser(null);

  const placeOrder = (details) => {
    const order = {
      id: `NX-${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      status: 'Received',
      items: cart.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return product ? { productId: product.id, name: product.name, price: product.price, image: product.image, quantity: item.quantity } : null;
      }).filter(Boolean),
      subtotal,
      shipping: subtotal >= 5000 ? 0 : 250,
      total: subtotal + (subtotal >= 5000 ? 0 : 250),
      customer: user ? { name: user.name, email: user.email } : { name: details.name, email: details.email },
      delivery: details
    };
    setOrders((current) => [order, ...current]);
    clearCart();
    return order;
  };

  const addProduct = (product) => setProducts((current) => [{ ...product, id: `p-${Date.now()}`, rating: 5, reviews: 0, badge: 'NEW' }, ...current]);
  const deleteProduct = (productId) => setProducts((current) => current.filter((p) => p.id !== productId));

  const value = useMemo(() => ({
    products, cart, user, orders, cartCount, subtotal,
    addToCart, updateQuantity, removeFromCart, clearCart,
    login, logout, placeOrder, addProduct, deleteProduct, setOrders
  }), [products, cart, user, orders, cartCount, subtotal]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}