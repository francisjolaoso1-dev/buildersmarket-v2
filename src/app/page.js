'use client';
import { useState } from 'react';

// Baseline inventory database
const INITIAL_PRODUCTS = [
  { id: 1, name: 'Premium Aluminum Roofing Sheets (0.55mm)', category: 'Roofing', price: 85000, location: 'Abuja Warehouse', origin: 'Local', image: '🏠' },
  { id: 2, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', price: 210000, location: 'Lagos Port Depot', origin: 'China Imported', image: '🚰' },
  { id: 3, name: 'High-Grade Structural Steel H-Beams', category: 'Structural', price: 340000, location: 'Abuja Warehouse', origin: 'Local', image: '🏗️' },
  { id: 4, name: 'Casement Aluminum Window Profiles (Bulk)', category: 'Aluminum', price: 45000, location: 'Guangdong Factory Direct', origin: 'China Imported', image: '🪟' }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  // Simple filtering engine
  const filteredProducts = INITIAL_PRODUCTS.filter(product => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           product.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
           product.origin.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', color: '#111827' }}>
      
      {/* HEADER */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '28px' }}>🏗️</span>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#16a34a' }}>
            builders<span style={{ color: '#111827' }}>market</span>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{ backgroundColor: '#111827', color: '#ffffff', padding: '50px 30px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px' }}>Global Supply Chain</h1>
        <p style={{ fontSize: '16px', color: '#9ca3af', maxWidth: '600px', margin: '0 auto 25px' }}>
          Source materials from local depots and verified manufacturers in China.
        </p>
        
        {/* INPUT FILTER */}
        <div style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '12px', maxWidth: '600px', margin: '0 auto', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <input 
            type="text" 
            placeholder="Search by material, origin (China, Local), or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', color: '#111827', boxSizing: 'border-box' }}
          />
        </div>
      </section>

      {/* DIRECTORY GRID */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
          Available Inventory ({filteredProducts.length})
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              
              <div style={{ backgroundColor: '#f3f4f6', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '45px', position: 'relative' }}>
                {product.image}
                <span style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '11px', fontWeight: '700', backgroundColor: product.origin.includes('China') ? '#fff5f5' : '#f0fdf4', color: product.origin.includes('China') ? '#e53e3e' : '#16a34a', padding: '4px 8px', borderRadius: '20px' }}>
                  {product.origin}
                </span>
              </div>

              <div style={{ padding: '20px', flexGrow: 1 }}>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#6b7280', fontWeight: '700', backgroundColor: '#e5e7eb', padding: '3px 6px', borderRadius: '4px' }}>{product.category}</span>
                <h3 style={{ fontSize: '15px', fontWeight: '700', marginTop: '10px', marginBottom: '6px' }}>{product.name}</h3>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>📍 Location: <strong>{product.location}</strong></div>
              </div>

              <div style={{ padding: '0 20px 20px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f3f4f6', paddingTop: '15px' }}>
                <div>
                  <span style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>₦{product.price.toLocaleString()}</span>
                </div>
                <button style={{ backgroundColor: '#16a34a', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
                  Select Item
                </button>
              </div>

            </div>
          ))}
        </div>
      </main>

    </div>
  );
}
