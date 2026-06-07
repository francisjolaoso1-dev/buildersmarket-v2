'use client';
import { useState } from 'react';

// Sample product database with native pricing currencies
const INITIAL_PRODUCTS = [
  { id: 1, name: 'Premium Aluminum Roofing Sheets (0.55mm)', category: 'Roofing', priceUSD: 53, location: 'Abuja Warehouse', origin: 'Local', stock: 45, image: '🏠' },
  { id: 2, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', priceUSD: 131, location: 'Lagos Port Depot', origin: 'China Imported', stock: 12, image: '🚰' },
  { id: 3, name: 'High-Grade Structural Steel H-Beams', category: 'Structural', priceUSD: 212, location: 'Abuja Warehouse', origin: 'Local', stock: 8, image: '🏗️' },
  { id: 4, name: 'Casement Aluminum Window Profiles (Bulk)', category: 'Aluminum', priceUSD: 28, location: 'Guangdong Factory Direct', origin: 'China Imported', stock: 100, image: '🪟' },
  { id: 5, name: 'Heavy Industrial Drilling Rig Bit (9 7/8")', category: 'Plumbing', priceUSD: 450, location: 'Tianjin Manufacturing Zone', origin: 'China Imported', stock: 5, image: '⚙️' },
  { id: 6, name: 'Portland Cement Grade 42.5R (Bulk Order)', category: 'Masonry', priceUSD: 5.10, location: 'Abuja Warehouse', origin: 'Local', stock: 500, image: '🧱' }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currency, setCurrency] = useState('NGN'); // Default currency view
  const [cartCount, setCartCount] = useState(0);

  // Approximate baseline exchange rate for calculation (e.g., 1 USD = 1,600 NGN)
  const EXCHANGE_RATE = 1600;

  // Format currency helper
  const formatPrice = (priceInUSD) => {
    if (currency === 'NGN') {
      const priceInNGN = Math.round(priceInUSD * EXCHANGE_RATE);
      return `₦${priceInNGN.toLocaleString()}`;
    }
    return `$${priceInUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Filter products based on inputs
  const filteredProducts = INITIAL_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.origin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', color: '#111827' }}>
      
      {/* GLOBAL NAVIGATION HEADER */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '28px' }}>🏗️</span>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#16a34a', letterSpacing: '-0.5px' }}>
            builders<span style={{ color: '#111827' }}>market</span>
          </div>
        </div>
        
        <nav style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <a href="#" style={{ textDecoration: 'none', color: '#16a34a', fontWeight: '600' }}>Procurement Portal</a>
          <a href="#" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: '500' }}>Global Suppliers</a>
          
          {/* CURRENCY TOGGLE SWITCHER */}
          <div style={{ border: '1px solid #d1d5db', borderRadius: '20px', padding: '4px', display: 'flex', backgroundColor: '#f3f4f6' }}>
            <button 
              onClick={() => setCurrency('NGN')}
              style={{ border: 'none', padding: '6px 14px', borderRadius: '16px', cursor: 'pointer', fontWeight: '700', fontSize: '13px', backgroundColor: currency === 'NGN' ? '#111827' : 'transparent', color: currency === 'NGN' ? '#ffffff' : '#4b5563' }}
            >
              ₦ NGN
            </button>
            <button 
              onClick={() => setCurrency('USD')}
              style={{ border: 'none', padding: '6px 14px', borderRadius: '16px', cursor: 'pointer', fontWeight: '700', fontSize: '13px', backgroundColor: currency === 'USD' ? '#111827' : 'transparent', color: currency === 'USD' ? '#ffffff' : '#4b5563' }}
            >
              $ USD
            </button>
          </div>

          <div style={{ backgroundColor: '#f3f4f6', padding: '8px 16px', borderRadius: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🛒 Orders <span style={{ backgroundColor: '#16a34a', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>{cartCount}</span>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section style={{ backgroundColor: '#111827', color: '#ffffff', padding: '60px 30px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '38px', fontWeight: '800', marginBottom: '15px' }}>Global Construction Supply Chain</h1>
        <p style={{ fontSize: '18px', color: '#9ca3af', maxWidth: '700px', margin: '0 auto 30px' }}>
          Connect natively with local distributors and verified China factories. Trade dynamically in Naira or US Dollars with transparent logistics handling.
        </p>
        
        {/* INTERACTIVE FILTERS BAR */}
        <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '12px', maxWidth: '750px', margin: '0 auto', display: 'flex', gap: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <input 
            type="text" 
            placeholder="Search by material, origin (China, Local), or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 2, padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px', color: '#111827' }}
          />
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px', backgroundColor: '#f9fafb', color: '#111827' }}
          >
            <option value="All">All Categories</option>
            <option value="Roofing">Roofing</option>
            <option value="Aluminum">Aluminum Products</option>
            <option value="Plumbing">Borehole & Plumbing</option>
            <option value="Structural">Structural Steel</option>
            <option value="Masonry">Masonry</option>
          </select>
        </div>
      </section>

      {/* PRODUCT DIRECTORY GRID */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', margin: 0 }}>
            Global Verified Listings ({filteredProducts.length})
          </h2>
          <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
            Base Exchange Rate Target: 1 USD = ₦{EXCHANGE_RATE.toLocaleString()}
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '16px' }}>
            No global supplies found matching your current query.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
            {filteredProducts.map((product) => (
              <div key={product.id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                
                {/* Visual Thumbnail */}
                <div style={{ backgroundColor: '#f3f4f6', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px', position: 'relative' }}>
                  {product.image}
                  <span style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '12px', fontWeight: '700', backgroundColor: product.origin.includes('China') ? '#fef2f2' : '#f0fdf4', color: product.origin.includes('China') ? '#dc2626' : '#16a34a', padding: '4px 8px', borderRadius: '20px', border: '1px solid currentColor' }}>
                    {product.origin}
                  </span>
                </div>

                {/* Detail Information */}
                <div style={{ padding: '20px', flexGrow: 1 }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#4b5563', fontWeight: '700', backgroundColor: '#e5e7eb', padding: '4px 8px', borderRadius: '4px' }}>
                    {product.category}
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: '12px', marginBottom: '8px', lineHeight: '1.4' }}>
                    {product.name}
                  </h3>
                  <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '15px' }}>
                    <div>📍 Hub: <strong>{product.location}</strong></div>
                  </div>
                </div>

                {/* Bottom Pricing & CTA */}
                <div style={{ padding: '0 20px 20px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f3f4f6', paddingTop: '15px' }}>
                  <div>
                    <span style={{ fontSize: '20px', fontWeight: '800', color: '#111827' }}>
                      {formatPrice(product.priceUSD)}
                    </span>
                    <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>
                      {currency === 'NGN' ? `Approx. ($${product.priceUSD})` : `Approx. (₦ ${(product.priceUSD * EXCHANGE_RATE).toLocaleString()})`}
                    </span>
                  </div>
                  <button 
                    onClick={() => setCartCount(cartCount + 1)}
                    style={{ backgroundColor: '#16a34a', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
                  >
                    Proforma Invoice
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </main>

    </div>
  );
}
