'use client';
import { useState } from 'react';

// ==========================================
// STATIC DATA (REMAINS STABLE)
// ==========================================
const INITIAL_PRODUCTS = [
  { id: 1, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', ngn: '₦210,000', usd: '$131.00', dutyNgn: '₦14,700', dutyUsd: '$9.17', totalNgn: '₦224,700', totalUsd: '$140.17', origin: 'Guangdong Shipping Depot', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: ' 🚰 ' },
  { id: 2, name: 'Premium Aluminum Roofing Sheets (0.55mm)', category: 'Aluminum', ngn: '₦85,000', usd: '$53.00', dutyNgn: '₦5,950', dutyUsd: '$3.71', totalNgn: '₦90,950', totalUsd: '$56.71', origin: 'Abuja Central Warehouse', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: ' 🏠 ' },
  { id: 3, name: 'Luxury Smart Space Capsule House (V8-Series)', category: 'Prefab Structural', ngn: '₦44,800,000', usd: '$28,000.00', dutyNgn: '₦3,136,000', dutyUsd: '$1,960.00', totalNgn: '₦47,936,000', totalUsd: '$29,960.00', origin: 'Foshan Prefab Industry Zone', type: 'CHINA IMPORTED', color: '#2563eb', bg: '#eff6ff', icon: ' 🚀 ' },
  { id: 4, name: 'Premium Capsule Interior Fit-Out & Concept Design', category: 'Architectural Design', ngn: '₦2,400,000', usd: '$1,500.00', dutyNgn: '₦0', dutyUsd: '$0', totalNgn: '₦2,400,000', totalUsd: '$1,500.00', origin: 'Digital Delivery Hub', type: 'DESIGN PACKAGE', color: '#7c3aed', bg: '#f5f3ff', icon: ' 📐 ' },
  { id: 5, name: 'Heavy Industrial Borehole Drilling Rig Bit (9 7/8")', category: 'Drilling', ngn: '₦720,000', usd: '$450.00', dutyNgn: '₦50,400', dutyUsd: '$31.50', totalNgn: '₦770,400', totalUsd: '$481.50', origin: 'Tianjin Manufacturing Zone', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: ' ⚙ ️' }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('market');
  const [viewMode, setViewMode] = useState('NGN');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  return (
    <div style={{ fontFamily: '"Inter", -apple-system, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', color: '#1f2937' }}>
      {/* REFINED HEADER */}
      <header style={{ backgroundColor: '#111827', color: '#ffffff', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid #16a34a' }}>
        <h1 style={{ margin: 0, fontSize: '20px', letterSpacing: '0.5px' }}>BUILDERS<span style={{ color: '#16a34a' }}>MARKET</span> | <span style={{ fontWeight: '300', fontSize: '14px', color: '#9ca3af' }}>Industrial Procurement Portal</span></h1>
        <div style={{ display: 'flex', gap: '20px', fontSize: '13px', fontWeight: '600' }}>
          <button onClick={() => setActiveTab('market')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>ASSET MATRIX</button>
          <button onClick={() => setViewMode(viewMode === 'NGN' ? 'USD' : 'NGN')} style={{ padding: '6px 12px', border: '1px solid #374151', borderRadius: '4px', background: '#1f2937', color: '#fff', cursor: 'pointer' }}>{viewMode}</button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
          {products.map((p) => (
            <div key={p.id} style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '32px', marginBottom: '15px' }}>{p.icon}</div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#6b7280', textTransform: 'uppercase', marginBottom: '8px' }}>{p.category}</span>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px', flexGrow: 1 }}>{p.name}</h3>
              <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '15px', marginTop: 'auto' }}>
                <div style={{ fontSize: '18px', fontWeight: '800', marginBottom: '15px' }}>{viewMode === 'NGN' ? p.ngn : p.usd}</div>
                <button onClick={() => { setModalItem(p); setShowModal(true); }} style={{ width: '100%', padding: '12px', backgroundColor: '#111827', color: '#ffffff', border: 'none', borderRadius: '4px', fontWeight: '700', cursor: 'pointer' }}>View Technical Specs</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
