export const initialProducts = [
  { id: 'p1', name: 'Studio Wireless Headphones', category: 'Electronics', price: 6499, oldPrice: 7999, rating: 4.8, reviews: 124, badge: 'BESTSELLER', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85', description: 'Immersive sound, a comfortable fit and all-day battery life for work, travel and everything in between.' },
  { id: 'p2', name: 'Everyday Crossbody Bag', category: 'Fashion', price: 3299, oldPrice: 0, rating: 4.7, reviews: 86, badge: 'NEW', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85', description: 'A clean, versatile crossbody with thoughtful compartments and a timeless silhouette.' },
  { id: 'p3', name: 'Minimal Ceramic Desk Lamp', category: 'Home', price: 4599, oldPrice: 5299, rating: 4.6, reviews: 53, badge: 'SAVE 13%', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85', description: 'Warm, focused light and a sculptural shape that makes your desk or bedside feel considered.' },
  { id: 'p4', name: 'Daily Hydration Bottle', category: 'Lifestyle', price: 1499, oldPrice: 0, rating: 4.9, reviews: 211, badge: '', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85', description: 'A reusable everyday bottle designed to travel from your morning commute to your evening workout.' },
  { id: 'p5', name: 'Essential Knit Sneakers', category: 'Fashion', price: 5199, oldPrice: 5999, rating: 4.5, reviews: 74, badge: 'POPULAR', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85', description: 'Lightweight comfort with a versatile profile for everyday movement and casual outfits.' },
  { id: 'p6', name: 'Smart Fitness Watch', category: 'Electronics', price: 8999, oldPrice: 10499, rating: 4.6, reviews: 98, badge: '', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85', description: 'Keep an eye on your activity, daily goals and notifications with a sleek, easy-to-wear design.' },
  { id: 'p7', name: 'Soft Cotton Throw', category: 'Home', price: 2799, oldPrice: 0, rating: 4.8, reviews: 42, badge: '', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85', description: 'A soft, textured layer for your sofa, reading chair or slow weekend mornings.' },
  { id: 'p8', name: 'Everyday Skin Essentials Set', category: 'Beauty', price: 2399, oldPrice: 2999, rating: 4.7, reviews: 67, badge: 'SAVE 20%', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85', description: 'A simple, giftable self-care set for a refreshing start or end to your day.' }
];

export const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Lifestyle', 'Beauty'];

export const formatKES = (amount) =>
  new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0
  }).format(Number(amount) || 0);