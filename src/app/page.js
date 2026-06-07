'use client';
import { useState } from 'react';

// Sample product database for the cross-border procurement portal
const INITIAL_PRODUCTS = [
  { id: 1, name: 'Premium Aluminum Roofing Sheets (0.55mm)', category: 'Roofing', price: 85000, unit: 'per bundle', location: 'Abuja Warehouse', stock: 45, image: '🏠' },
  { id: 2, name: 'Heavy Duty Borehole Submersible Pump (2HP)', category: 'Plumbing', price: 210000, unit: 'per unit', location: 'Lagos Port Depot', stock: 12, image: '🚰' },
  { id: 3, name: 'High-Grade Structural Steel H-Beams', category: 'Structural', price: 340000, unit: 'per ton', location: 'Abuja Warehouse', stock: 8, image: '🏗️' },
  { id: 4, name: 'Casement Aluminum Window Frames (Bronze)', category: 'Aluminum', price: 45000, unit: 'per sqm', location: 'Abuja Workshop', stock: 25, image: '🪟' },
  { id: 5, name: 'Industrial PVC Borehole Casing Pipes', category: 'Plumbing', price: 18500, unit: 'per length', location: 'Lagos Port Depot', stock: 120, image: '🧪' },
  { id: 6, name: 'Portland Cement Grade 42.5R', category: 'Masonry', price: 8200, unit: 'per bag', location: 'Abuja Warehouse', stock: 500, image: '🧱' }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);

  // Filter products based on search inputs
  const filteredProducts = INITIAL_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.location.toLowerCase().includes(searchTerm.toLowerCase());
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
          <a href="#" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: '500' }}>Suppliers</a>
          <a href="#" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: '500' }}>Logistics Hub</a>
          <div style={{ backgroundColor: '#f3f4f6', padding: '8px 16px', borderRadius: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🛒 Cart <span style={{ backgroundColor: '#16a34a', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>{cartCount}</span>
          </div>
        </nav>
      </header>

      {/* HERO HERO SECTION */}
      <section style={{ backgroundColor: '#111827', color: '#ffffff', padding: '60px 30px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '38px', fontWeight: '800', marginBottom: '15px' }}>Cross-Border Materials Procurement</h1>
        <p style={{ fontSize: '18px', color: '#9ca3af', maxWidth: '600px', margin: '0 auto 30px' }}>
          Source heavy structural steel, premium aluminum profiles, and borehole equipment directly delivered to your African construction sites.
        </p>
        
        {/* INTERACTIVE FILTERS BAR */}
        <div style={{ backgroundColor: '#ffffff', padding: '12px', borderRadius: '12px', maxWidth: '750px', margin: '0 auto', display: 'flex', gap: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <input 
            type="text" 
            placeholder="Search by material name or location (e.g. Abuja)..." 
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
        <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '20px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
          Available Verified Inventory ({filteredProducts.length})
        </h2>

        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280', fontSize: '16px' }}>
            No materials found matching your search. Try looking for another category or location!
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
            {filteredProducts.map((product) => (
              <div key={product.id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'transform 0.2s' }}>
                
                {/* Visual Thumbnail */}
                <div style={{ backgroundColor: '#f3f4f6', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '50px' }}>
                  {product.image}
                </div>

                {/* Detail Information */}
                <div style={{ padding: '20px', flexGrow: 1 }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', tracking: 'wide', color: '#16a34a', fontWeight: '700', backgroundColor: '#f0fdf4', padding: '4px 8px', borderRadius: '4px' }}>
                    {product.category}
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: '12px', marginBottom: '8px', lineHeight: '1.4' }}>
                    {product.name}
                  </h3>
                  <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>📍 {product.location}</span>
                    <span style={{ color: product.stock > 15 ? '#16a34a' : '#b45309', fontWeight: '600' }}>
                      {product.stock} left
                    </span>
                  </div>
                </div>

                {/* Bottom Pricing & CTA */}
                <div style={{ padding: '0 20px 20px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f3f4f6', paddingTop: '15px' }}>
                  <div>
                    <span style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>
                      ₦{product.price.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '12px', color: '#6b7280', display: 'block' }}>
                      {product.unit}
                    </span>
                  </div>
                  <button 
                    onClick={() => setCartCount(cartCount + 1)}
                    style={{ backgroundColor: '#16a34a', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
                  >
                    Request Quote
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
