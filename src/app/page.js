'use client';
import { useState } from 'react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Premium Aluminum Roofing Sheets (0.55mm)', category: 'Roofing', priceUSD: 53, location: 'Abuja Warehouse', origin: 'Local', stock: 45, image: '🏠' },
  { id: 2, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', priceUSD: 131, location: 'Lagos Port Depot', origin: 'China Imported', stock: 12, image: '🚰' },
  { id: 3, name: 'High-Grade Structural Steel H-Beams', category: 'Structural', priceUSD: 212, location: 'Abuja Warehouse', origin: 'Local', stock: 8, image: '🏗️' },
  { id: 4, name: 'Casement Aluminum Window Profiles (Bulk)', category: 'Aluminum', priceUSD: 28, location: 'Guangdong Factory Direct', origin: 'China Imported', stock: 100, image: '🪟' },
  { id: 5, name: 'Heavy Industrial Drilling Rig Bit (9 7/8")', category: 'Plumbing', priceUSD: 450, location: 'Tianjin Manufacturing Zone', origin: 'China Imported', stock: 5, image: '⚙️' },
  { id: 6, name: 'Portland Cement Grade 42.5R (Bulk Order)', category: 'Masonry', priceUSD: 5.10, location: 'Abuja Warehouse', origin: 'Local', stock: 500, image: '🧱' }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('marketplace'); // marketplace | supplier
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currency, setCurrency] = useState('NGN');
  const [exchangeRate, setExchangeRate] = useState(1600); // Feature 1: Live exchange slider state
  
  // Cart & Modal States (Feature 2)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [shippingType, setShippingType] = useState('standard');

  // Supplier Form State (Feature 3)
  const [supplierData, setSupplierData] = useState({ name: '', company: '', origin: 'China', productType: '', msg: '' });

  // Format price engine
  const formatPrice = (priceInUSD) => {
    if (currency === 'NGN') {
      return `₦${Math.round(priceInUSD * exchangeRate).toLocaleString()}`;
    }
    return `$${priceInUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Filter logic
  const filteredProducts = INITIAL_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.origin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', color: '#111827' }}>
      
      {/* HEADER NAVIGATION */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setActiveTab('marketplace')}>
          <span style={{ fontSize: '28px' }}>🏗️</span>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#16a34a', letterSpacing: '-0.5px' }}>
            builders<span style={{ color: '#111827' }}>market</span>
          </div>
        </div>
        
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button onClick={() => setActiveTab('marketplace')} style={{ background: 'none', border: 'none', color: activeTab === 'marketplace' ? '#16a34a' : '#4b5563', fontWeight: activeTab === 'marketplace' ? '700' : '500', cursor: 'pointer', fontSize: '15px' }}>Procurement Portal</button>
          <button onClick={() => setActiveTab('supplier')} style={{ background: 'none', border: 'none', color: activeTab === 'supplier' ? '#16a34a' : '#4b5563', fontWeight: activeTab === 'supplier' ? '700' : '500', cursor: 'pointer', fontSize: '15px' }}>🇨🇳 Onboard Manufacturer / Supplier</button>
          
          <div style={{ border: '1px solid #d1d5db', borderRadius: '20px', padding: '3px', display: 'flex', backgroundColor: '#f3f4f6' }}>
            <button onClick={() => setCurrency('NGN')} style={{ border: 'none', padding: '5px 12px', borderRadius: '16px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', backgroundColor: currency === 'NGN' ? '#111827' : 'transparent', color: currency === 'NGN' ? '#ffffff' : '#4b5563' }}>₦ NGN</button>
            <button onClick={() => setCurrency('USD')} style={{ border: 'none', padding: '5px 12px', borderRadius: '16px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', backgroundColor: currency === 'USD' ? '#111827' : 'transparent', color: currency === 'USD' ? '#ffffff' : '#4b5563' }}>$ USD</button>
          </div>
        </nav>
      </header>

      {/* FEATURE 1: DYNAMIC EXCHANGE RATE ADMIN SLIDER BAR */}
      <div style={{ backgroundColor: '#f0fdf4', borderBottom: '1px solid #bbf7d0', padding: '10px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ fontSize: '14px', color: '#166534', fontWeight: '600' }}>
          💡 <strong>Live Exchange Rate Engine:</strong> Adjust the conversion index to simulate local macroeconomic procurement impact instantly.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#ffffff', padding: '6px 14px', borderRadius: '20px', border: '1px solid #bbf7d0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>1 USD = ₦{exchangeRate}</span>
          <input 
            type="range" 
            min="1400" 
            max="1800" 
            value={exchangeRate} 
            onChange={(e) => setExchangeRate(Number(e.target.value))}
            style={{ accentColor: '#16a34a', cursor: 'pointer', width: '130px' }}
          />
        </div>
      </div>

      {activeTab === 'marketplace' ? (
        <>
          {/* HERO */}
          <section style={{ backgroundColor: '#111827', color: '#ffffff', padding: '50px 30px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px' }}>Global Supply Chain Matrix</h1>
            <p style={{ fontSize: '17px', color: '#9ca3af', maxWidth: '700px', margin: '0 auto 25px' }}>
              Procure freight-ready materials and custom borehole machinery directly from Nigerian storage depots and manufacturing lines across mainland China.
            </p>
            
            <div style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '12px', maxWidth: '750px', margin: '0 auto', display: 'flex', gap: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
              <input 
                type="text" 
                placeholder="Filter by material spec, keyword, hub origin (China or Local)..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ flex: 2, padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', color: '#111827' }}
              />
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', backgroundColor: '#f9fafb', color: '#111827' }}
              >
                <option value="All">All Sectors</option>
                <option value="Roofing">Roofing</option>
                <option value="Aluminum">Aluminum Products</option>
                <option value="Plumbing">Borehole & Plumbing</option>
                <option value="Structural">Structural Steel</option>
                <option value="Masonry">Masonry</option>
              </select>
            </div>
          </section>

          {/* MARKET GRID */}
          <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
              Verified Port-Ready Assets Available ({filteredProducts.length})
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
              {filteredProducts.map((product) => (
                <div key={product.id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ backgroundColor: '#f3f4f6', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '45px', position: 'relative' }}>
                    {product.image}
                    <span style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '11px', fontWeight: '700', backgroundColor: product.origin.includes('China') ? '#fff5f5' : '#f0fdf4', color: product.origin.includes('China') ? '#e53e3e' : '#16a34a', padding: '4px 8px', borderRadius: '20px', border: '1px solid currentColor' }}>
                      {product.origin}
                    </span>
                  </div>

                  <div style={{ padding: '20px', flexGrow: 1 }}>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#6b7280', fontWeight: '700', backgroundColor: '#e5e7eb', padding: '3px 6px', borderRadius: '4px' }}>{product.category}</span>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: '10px', marginBottom: '6px' }}>{product.name}</h3>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>📍 Hub Location: <strong>{product.location}</strong></div>
                  </div>

                  <div style={{ padding: '0 20px 20px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f3f4f6', paddingTop: '15px' }}>
                    <div>
                      <span style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>{formatPrice(product.priceUSD)}</span>
                      <span style={{ fontSize: '11px', color: '#6b7280', display: 'block' }}>FOB Cleared Base</span>
                    </div>
                    <button 
                      onClick={() => { setSelectedProduct(product); setOrderSuccess(false); }}
                      style={{ backgroundColor: '#16a34a', color: 'white', border: 'none', padding: '10px 14px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}
                    >
                      Request Invoice
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </>
      ) : (
        /* FEATURE 3: SUPPLIER ONBOARDING FORM WORKSPACE */
        <main style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px', color: '#111827' }}>Global Supplier Registration</h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '25px' }}>
            List your manufacturing plant inventory or bulk supply terminal. Verified accounts are embedded straight into the matrix feed for Nigerian procurement.
          </p>

          {supplierData.msg ? (
            <div style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '15px', borderRadius: '8px', fontWeight: '600', marginBottom: '20px', textAlign: 'center' }}>
              {supplierData.msg}
            </div>
          ) : null}

          <form onSubmit={(e) => { e.preventDefault(); setSupplierData({...supplierData, msg: 'Registration application saved! Procurement officers will review your asset capabilities within 24 hours.'}); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '6px' }}>Corporate Officer Name</label>
              <input type="text" required value={supplierData.name} onChange={(e) => setSupplierData({...supplierData, name: e.target.value})} style={{ width: '100%', padding: '11px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}/>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '6px' }}>Registered Manufacturing/Trading Name</label>
              <input type="text" required value={supplierData.company} onChange={(e) => setSupplierData({...supplierData, company: e.target.value})} style={{ width: '100%', padding: '11px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }}/>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '6px' }}>Primary Fulfillment Origin</label>
              <select value={supplierData.origin} onChange={(e) => setSupplierData({...supplierData, origin: e.target.value})} style={{ width: '100%', padding: '11px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', backgroundColor: '#fff' }}>
                <option value="China">Mainland China (Guangdong / Tianjin / Shandong Ports)</option>
                <option value="Nigeria">Nigeria (Local Storage / Abuja / Lagos Hubs)</option>
                <option value="Other">International / Cross-Border Sea Hub</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '6px' }}>Material Output Description (e.g., Structural Aluminum, Submersible Drills)</label>
              <textarea rows="3" required value={supplierData.productType} onChange={(e) => setSupplierData({...supplierData, productType: e.target.value})} style={{ width: '100%', padding: '11px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', resize: 'vertical' }}></textarea>
            </div>
            <button type="submit" style={{ backgroundColor: '#111827', color: '#ffffff', padding: '13px', borderRadius: '6px', fontWeight: '700', border: 'none', cursor: 'pointer', marginTop: '10px' }}>Submit Infrastructure Dossier</button>
          </form>
        </main>
      )}

      {/* FEATURE 2: INTERACTIVE PROFORMA INVOICE MODAL SYSTEM */}
      {selectedProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(17, 24, 39, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', maxWidth: '480px', width: '100%', padding: '30px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', position: 'relative' }}>
            <button onClick={() => setSelectedProduct(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#9ca3af' }}>✕</button>
            
            {!
