'use client';
import { useState } from 'react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Premium Aluminum Roofing Sheets (0.55mm)', category: 'Roofing', priceUSD: 53, location: 'Abuja Warehouse', origin: 'Local', image: '🏠' },
  { id: 2, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', priceUSD: 131, location: 'Lagos Port Depot', origin: 'China Imported', image: '🚰' },
  { id: 3, name: 'High-Grade Structural Steel H-Beams', category: 'Structural', priceUSD: 212, location: 'Abuja Warehouse', origin: 'Local', image: '🏗️' },
  { id: 4, name: 'Casement Aluminum Window Profiles (Bulk)', category: 'Aluminum', priceUSD: 28, location: 'Guangdong Factory Direct', origin: 'China Imported', image: '🪟' }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currency, setCurrency] = useState('NGN'); 
  const [exchangeRate, setExchangeRate] = useState(1600); 
  
  // Modal states for Feature 2
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [shippingType, setShippingType] = useState('standard');
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);

  // Price formatting helper helpers
  const formatPrice = (priceInUSD) => {
    if (currency === 'NGN') {
      const converted = Math.round(priceInUSD * exchangeRate);
      return '₦' + converted.toLocaleString();
    }
    return '$' + priceInUSD.toFixed(2);
  };

  const getSubTextPrice = (priceUSD) => {
    if (currency === 'NGN') {
      return 'Base: $' + priceUSD;
    }
    const convertedSub = Math.round(priceUSD * exchangeRate);
    return 'Approx: ₦' + convertedSub.toLocaleString();
  };

  const filteredProducts = INITIAL_PRODUCTS.filter(product => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           product.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
           product.origin.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', color: '#111827' }}>
      
      {/* HEADER NAVBAR */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '28px' }}>🏗️</span>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#16a34a' }}>
            builders<span style={{ color: '#111827' }}>market</span>
          </div>
        </div>

        <div style={{ border: '1px solid #d1d5db', borderRadius: '20px', padding: '3px', display: 'flex', backgroundColor: '#f3f4f6' }}>
          <button onClick={() => setCurrency('NGN')} style={{ border: 'none', padding: '6px 14px', borderRadius: '16px', cursor: 'pointer', fontWeight: '700', fontSize: '13px', backgroundColor: currency === 'NGN' ? '#111827' : 'transparent', color: currency === 'NGN' ? '#ffffff' : '#4b5563' }}>₦ NGN</button>
          <button onClick={() => setCurrency('USD')} style={{ border: 'none', padding: '6px 14px', borderRadius: '16px', cursor: 'pointer', fontWeight: '700', fontSize: '13px', backgroundColor: currency === 'USD' ? '#111827' : 'transparent', color: currency === 'USD' ? '#ffffff' : '#4b5563' }}>$ USD</button>
        </div>
      </header>

      {/* FX SLIDER */}
      <div style={{ backgroundColor: '#f0fdf4', borderBottom: '1px solid #bbf7d0', padding: '10px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ fontSize: '14px', color: '#166534', fontWeight: '500' }}>
          📈 <strong>Dynamic FX Engine:</strong> Adjust the exchange slider index to convert currency layout components natively.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#ffffff', padding: '6px 14px', borderRadius: '20px', border: '1px solid #bbf7d0' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>1 USD = ₦{exchangeRate}</span>
          <input type="range" min="1400" max="1800" value={exchangeRate} onChange={(e) => setExchangeRate(Number(e.target.value))} style={{ accentColor: '#16a34a', cursor: 'pointer', width: '130px' }} />
        </div>
      </div>

      {/* HERO SECTION */}
      <section style={{ backgroundColor: '#111827', color: '#ffffff', padding: '50px 30px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '12px' }}>Cross-Border Procurement Portal</h1>
        <p style={{ fontSize: '16px', color: '#9ca3af', maxWidth: '600px', margin: '0 auto 25px' }}>
          Source heavy freight assets directly from local storage hubs and factories across mainland China.
        </p>
        <div style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '12px', maxWidth: '600px', margin: '0 auto', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <input type="text" placeholder="Search by material, origin (China, Local), or location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', color: '#111827', boxSizing: 'border-box' }} />
        </div>
      </section>

      {/* DIRECTORY FEED */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
          Available Global Inventory ({filteredProducts.length})
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
                  <span style={{ fontSize: '18px', fontWeight: '800', color: '#111827' }}>{getDisplayPrice(product.priceUSD)}</span>
                  <span style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginTop: '2px' }}>{getSubTextPrice(product.priceUSD)}</span>
                </div>
                <button 
                  onClick={() => { setSelectedProduct(product); setInvoiceGenerated(false); }}
                  style={{ backgroundColor: '#16a34a', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}
                >
                  Request Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* POP-UP MODAL ENGINE */}
      {selectedProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11, 24, 39, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', maxWidth: '440px', width: '100%', padding: '25px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', position: 'relative' }}>
            <button onClick={() => setSelectedProduct(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#9ca3af' }}>✕</button>
            
            {!invoiceGenerated ? (
              <>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '4px' }}>Proforma Bill Matrix</h3>
                <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '15px' }}>Cross-border freight clearing simulation metrics.</p>
                
                <div style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '6px', marginBottom: '15px' }}>
                  <div style={{ fontWeight: '700', fontSize: '14px' }}>{selectedProduct.name} {selectedProduct.image}</div>
                  <div style={{ fontSize: '12px', color: '#4b5563', marginTop: '4px' }}>Base Cost: {formatPrice(selectedProduct.priceUSD)}</div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>Logistics Route Handling</label>
                  <select value={shippingType} onChange={(e) => setShippingType(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', backgroundColor: '#fff', fontSize: '13px' }}>
                    <option value="standard">Standard Sea Cargo Port Line (30-45 Days)</option>
                    <option value="expedited">Priority Air Cargo Carrier Line (7-14 Days)</option>
                  </select>
                </div>

                <div style={{ borderTop: '1px dashed #d1d5db', paddingTop: '12px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Asset Subtotal:</span>
                    <strong>{formatPrice(selectedProduct.priceUSD)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Port Tariffs / Duty (+7%):</span>
                    <strong>{formatPrice(selectedProduct.priceUSD * 0.07)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Freight Logistics Premium:</span>
                    <strong>{formatPrice(shippingType === 'standard' ? 40 : 120)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e5e7eb', paddingTop: '8px', marginTop: '4px', fontSize: '15px', fontWeight: '800' }}>
                    <span>Estimated Liability:</span>
                    <span style={{ color: '#16a34a' }}>{formatPrice(selectedProduct.priceUSD + (selectedProduct.priceUSD * 0.07) + (shippingType === 'standard' ? 40 : 120))}</span>
                  </div>
                </div>

                <button onClick={() => setInvoiceGenerated(true)} style={{ width: '100%', backgroundColor: '#16a34a', color: 'white', padding: '12px', borderRadius: '6px', fontWeight: '700', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
                  Compile Official Proforma Bill
                </button>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <span style={{ fontSize: '40px' }}>📝</span>
                <h3 style={{ fontSize: '20px', fontWeight: '800', marginTop: '10px', color: '#16a34a' }}>Invoice Built Successfully!</h3>
                <p style={{ color: '#4b5563', fontSize: '13px', marginTop: '6px', marginBottom: '20px', lineHeight: '1.4' }}>
                  Your procurement tracking schedule has been initialized under secure verification tokens.
                </p>
                <button onClick={() => setSelectedProduct(null)} style={{ backgroundColor: '#111827', color: 'white', padding: '10px 20px', borderRadius: '6px', fontWeight: '600', border: 'none', cursor: 'pointer', fontSize: '13px' }}>
                  Return to Matrix Feed
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
