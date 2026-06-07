'use client';
import { useState } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('NGN'); 
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState({ name: '', ngn: '', usd: '', dutyNgn: '', dutyUsd: '', totalNgn: '', totalUsd: '', origin: '', icon: '' });
  const [activeTab, setActiveTab] = useState('market');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Tracking States
  const [invoiceConfirmed, setInvoiceConfirmed] = useState(false);
  const [trackingStep, setTrackingStep] = useState(1); 

  // Updated Database featuring Modular & Capsule Housing
  const PRODUCTS = [
    { id: 1, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', ngn: '₦210,000', usd: '$131.00', dutyNgn: '₦14,700', dutyUsd: '$9.17', totalNgn: '₦224,700', totalUsd: '$140.17', origin: 'Guangdong Shipping Depot', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: '🚰' },
    { id: 2, name: 'Premium Aluminum Roofing Sheets (0.55mm)', category: 'Aluminum', ngn: '₦85,000', usd: '$53.00', dutyNgn: '₦5,950', dutyUsd: '$3.71', totalNgn: '₦90,950', totalUsd: '$56.71', origin: 'Abuja Central Warehouse', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: '🏠' },
    { id: 3, name: 'Luxury Smart Space Capsule House (V8-Series)', category: 'Prefab Structural', ngn: '₦44,800,000', usd: '$28,000.00', dutyNgn: '₦3,136,000', dutyUsd: '$1,960.00', totalNgn: '₦47,936,000', totalUsd: '$29,960.00', origin: 'Foshan Prefab Industry Zone', type: 'CHINA IMPORTED', color: '#2563eb', bg: '#eff6ff', icon: '🚀' },
    { id: 4, name: 'Heavy Industrial Borehole Drilling Rig Bit (9 7/8")', category: 'Drilling', ngn: '₦720,000', usd: '$450.00', dutyNgn: '₦50,400', dutyUsd: '$31.50', totalNgn: '₦770,400', totalUsd: '$481.50', origin: 'Tianjin Manufacturing Zone', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: '⚙️' },
    { id: 5, name: 'High-Grade Structural Steel H-Beams (Bulk)', category: 'Structural Materials', ngn: '₦340,000', usd: '$212.00', dutyNgn: '₦23,800', dutyUsd: '$14.84', totalNgn: '₦363,800', totalUsd: '$226.84', origin: 'Lagos Port Depot', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: '🏗️' },
    { id: 6, name: 'Eco Modular A-Frame Cabin House (Double Loft)', category: 'Prefab Structural', ngn: '₦20,800,000', usd: '$13,000.00', dutyNgn: '₦1,456,000', dutyUsd: '$910.00', totalNgn: '₦22,256,000', totalUsd: '$13,910.00', origin: 'Zhejiang Manufacturing Hub', type: 'CHINA IMPORTED', color: '#2563eb', bg: '#eff6ff', icon: '🪵' },
    { id: 7, name: 'Casement Aluminum Window Profiles (Standard)', category: 'Aluminum', ngn: '₦45,000', usd: '$28.12', dutyNgn: '₦3,150', dutyUsd: '$1.97', totalNgn: '₦48,150', totalUsd: '$30.09', origin: 'Guangdong Factory Direct', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: '🪟' },
    { id: 8, name: 'Deep-Well Hydraulic Drilling Control Panel', category: 'Drilling', ngn: '₦1,440,000', usd: '$900.00', dutyNgn: '₦100,800', dutyUsd: '$63.00', totalNgn: '₦1,540,800', totalUsd: '$963.00', origin: 'Shandong Port Zone', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: '🎛️' },
    { id: 9, name: 'High-Pressure PPR Plumbing Pipes (Pack of 50)', category: 'Plumbing', ngn: '₦120,000', usd: '$75.00', dutyNgn: '₦8,400', dutyUsd: '$5.25', totalNgn: '₦128,400', totalUsd: '$80.25', origin: 'Abuja Central Warehouse', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: '🧪' },
    { id: 10, name: 'Portland Cement Grade 42.5R (Bulk Ton)', category: 'Structural Materials', ngn: '₦96,000', usd: '$60.00', dutyNgn: '₦6,720', dutyUsd: '#4.20', totalNgn: '₦102,720', totalUsd: '$64.20', origin: 'Lagos Port Depot', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: '🧱' }
  ];

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.origin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', color: '#111827' }}>
      
      {/* HEADER NAVBAR */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '26px' }}>🏗️</span>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#16a34a' }}>
            builders<span style={{ color: '#111827' }}>market</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button onClick={() => setActiveTab('market')} style={{ background: 'none', border: 'none', color: activeTab === 'market' ? '#16a34a' : '#4b5563', fontWeight: '600', cursor: 'pointer' }}>Marketplace</button>
          <button onClick={() => setActiveTab('supplier')} style={{ background: 'none', border: 'none', color: activeTab === 'supplier' ? '#16a34a' : '#4b5563', fontWeight: '600', cursor: 'pointer' }}>🇨🇳 Factory Portal</button>
          
          <div style={{ border: '1px solid #d1d5db', borderRadius: '20px', padding: '3px', display: 'flex', backgroundColor: '#f3f4f6' }}>
            <button onClick={() => setViewMode('NGN')} style={{ border: 'none', padding: '5px 12px', borderRadius: '16px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', backgroundColor: viewMode === 'NGN' ? '#111827' : 'transparent', color: viewMode === 'NGN' ? '#ffffff' : '#4b5563' }}>₦ NGN</button>
            <button onClick={() => setViewMode('USD')} style={{ border: 'none', padding: '5px 12px', borderRadius: '16px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', backgroundColor: viewMode === 'USD' ? '#111827' : 'transparent', color: viewMode === 'USD' ? '#ffffff' : '#4b5563' }}>$ USD</button>
          </div>
        </div>
      </header>

      {activeTab === 'market' ? (
        <>
          {/* HERO DASHBOARD CONTAINER */}
          <section style={{ backgroundColor: '#111827', color: '#ffffff', padding: '50px 20px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '34px', fontWeight: '800', marginBottom: '10px' }}>Global Procurement Matrix</h1>
            <p style={{ fontSize: '15px', color: '#9ca3af', maxWidth: '650px', margin: '0 auto 25px' }}>
              Direct factory clearance for heavy machinery, smart capsule housing, and professional building materials.
            </p>
            
            <div style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '12px', maxWidth: '750px', margin: '0 auto', display: 'flex', gap: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <input type="text" placeholder="Search structures, parts, or manufacturing hubs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 2, padding: '11px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', color: '#111827', boxSizing: 'border-box' }} />
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ flex: 1, padding: '11px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', backgroundColor: '#f9fafb', color: '#111827', cursor: 'pointer' }}>
                <option value="All">All Sectors</option>
                <option value="Prefab Structural">Prefab & Capsule Units</option>
                <option value="Drilling">Borehole Drilling</option>
                <option value="Plumbing">Industrial Plumbing</option>
                <option value="Aluminum">Aluminum Products</option>
                <option value="Structural Materials">Structural Materials</option>
              </select>
            </div>
          </section>

          {/* GRID INVENTORY */}
          <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
              {filteredProducts.map((product) => (
                <div key={product.id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ backgroundColor: '#f3f4f6', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '52px', position: 'relative' }}>
                    {product.icon}
                    <span style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '10px', fontWeight: '700', color: product.color, backgroundColor: product.bg, padding: '4px 8px', borderRadius: '20px', border: '1px solid currentColor' }}>{product.type}</span>
                  </div>

                  <div style={{ padding: '20px', flexGrow: 1 }}>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#4b5563', fontWeight: '700', backgroundColor: '#e5e7eb', padding: '3px 6px', borderRadius: '4px' }}>{product.category}</span>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', marginTop: '10px', marginBottom: '6px', minHeight: '42px' }}>{product.name}</h3>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>📍 Logistics Hub: <strong>{product.origin}</strong></div>
                  </div>

                  <div style={{ padding: '0 20px 20px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f3f4f6', paddingTop: '15px' }}>
                    <div>
                      <span style={{ fontSize: '16px', fontWeight: '800', color: '#111827' }}>{viewMode === 'NGN' ? product.ngn : product.usd}</span>
                      <span style={{ fontSize: '11px', color: '#6b7280', display: 'block' }}>FOB Base Price</span>
                    </div>
                    <button onClick={() => { setModalItem(product); setInvoiceConfirmed(false); setTrackingStep(1); setShowModal(true); }} style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '9px 14px', borderRadius: '6px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>Request Invoice</button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </>
      ) : (
        /* FACTORY ENTRY PANEL */
        <main style={{ maxWidth: '500px', margin: '40px auto', padding: '25px', backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '6px' }}>Global Plant Onboarding</h2>
          <form onSubmit={(e) => { e.preventDefault(); alert('Indexed.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input type="text" placeholder="Corporate Manufacturing Identity" required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
            <button type="submit" style={{ backgroundColor: '#111827', color: '#fff', padding: '12px', borderRadius: '6px', border: 'none', fontWeight: '700' }}>Submit Infrastructure Dossier</button>
          </form>
        </main>
      )}

      {/* SECURE LIGHTWEIGHT MODAL WINDOW */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,24,39,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '12px', maxWidth: '440px', width: '100%', margin: '20px', position: 'relative', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#9ca3af' }}>✕</button>
            
            {!invoiceConfirmed ? (
              <>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '5px' }}>Proforma Pricing Sheet</h3>
                <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '15px' }}>Verified trade clearance matrix and port tariffs values.</p>
                
                <div style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '6px', marginBottom: '15px', fontSize: '13px' }}>
                  <strong>Asset Line:</strong> {modalItem.name} {modalItem.icon}
                  <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '3px' }}>FOB Dispatch: {modalItem.origin}</div>
                </div>

                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>FOB Port Base Liability:</span><strong>{viewMode === 'NGN' ? modalItem.ngn : modalItem.usd}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Customs Duty Premium (+7%):</span><strong>{viewMode === 'NGN' ? modalItem.dutyNgn : modalItem.dutyUsd}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #d1d5db', paddingTop: '8px', marginTop: '4px', fontSize: '14px', fontWeight: '800' }}>
                    <span>Total Project Settlement:</span>
                    <span style={{ color: '#16a34a' }}>{viewMode === 'NGN' ? modalItem.totalNgn : modalItem.totalUsd}</span>
                  </div>
                </div>
                
                <button onClick={() => setInvoiceConfirmed(true)} style={{ width: '100%', backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: '700', marginTop: '20px', cursor: 'pointer' }}>
                  Confirm & Initialize Tracking
                </button>
              </>
            ) : (
              <>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '4px' }}>Procurement Tracking Node</h3>
                <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '25px' }}>Real-time freight cargo telemetry ledger for your order.</p>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px', marginBottom: '25px' }}>
                  <div style={{ flex: 1, height: '6px', borderRadius: '4px', backgroundColor: trackingStep >= 1 ? '#16a34a' : '#e5e7eb' }} />
                  <div style={{ flex: 1, height: '6px', borderRadius: '4px', backgroundColor: trackingStep >= 2 ? '#16a34a' : '#e5e7eb' }} />
                  <div style={{ flex: 1, height: '6px', borderRadius: '4px', backgroundColor: trackingStep >= 3 ? '#16a34a' : '#e5e7eb' }} />
                  <div style={{ flex: 1, height: '6px', borderRadius: '4px', backgroundColor: trackingStep >= 4 ? '#16a34a' : '#e5e7eb' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', marginBottom: '20px', color: '#6b7280' }}>
                  <span style={{ color: trackingStep === 1 ? '#16a34a' : '#6b7280' }}>1. Factory</span>
                  <span style={{ color: trackingStep === 2 ? '#16a34a' : '#6b7280' }}>2. Transit</span>
                  <span style={{ color: trackingStep === 3 ? '#16a34a' : '#6b7280' }}>3. Clearing</span>
                  <span style={{ color: trackingStep === 4 ? '#16a34a' : '#6b7280' }}>4. Arrived</span>
                </div>

                <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', padding: '15px', borderRadius: '8px', marginBottom: '25px', fontSize: '13px' }}>
                  {trackingStep === 1 && <div>🏭 <strong>Stage 1: Factory Production</strong><p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '12px' }}>Your materials are currently being crated, serialized, and balanced for container weight metrics at the manufacturing hub.</p></div>}
                  {trackingStep === 2 && <div>🚢 <strong>Stage 2: Ocean Freight Transit</strong><p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '12px' }}>Cargo assigned to global vessel lanes. Moving securely across main shipping corridors toward the Nigerian entry port.</p></div>}
                  {trackingStep === 3 && <div>🛃 <strong>Stage 3: Customs Duty Clearing</strong><p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '12px' }}>Manifest matching protocols initiated. Port tariff calculations and clearing documentation are undergoing official approval.</p></div>}
                  {trackingStep === 4 && <div>✅ <strong>Stage 4: Ready for Delivery/Pickup</strong><p style={{ margin: '4px 0 0', color: '#16a34a', fontSize: '12px', fontWeight: '600' }}>Asset clearance complete! Items are stored securely at destination yards and ready for logistics dispatch handlers.</p></div>}
                </div>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                  <button disabled={trackingStep === 1} onClick={() => setTrackingStep(prev => prev - 1)} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', cursor: 'pointer', fontSize: '12px', fontWeight: '600', backgroundColor: '#fff' }}>⏮️ Prev Stage</button>
                  <button disabled={trackingStep === 4} onClick={() => setTrackingStep(prev => prev + 1)} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', backgroundColor: '#111827', color: '#fff' }}>Next Stage ⏭️</button>
                </div>

                <button onClick={() => setShowModal(false)} style={{ width: '100%', backgroundColor: '#6b7280', color: 'white', padding: '10px', borderRadius: '6px', fontWeight: '600', border: 'none', cursor: 'pointer', fontSize: '13px' }}>Close Console</button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
