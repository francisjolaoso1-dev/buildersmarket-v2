'use client';
import { useState } from 'react';

// ==========================================
// STATIC DATA (REMAINS STABLE)
// ==========================================
const INITIAL_PRODUCTS = [
  { id: 1, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', ngn: '₦210,000', usd: '$131.00', dutyNgn: '₦14,700', dutyUsd: '$9.17', totalNgn: '₦224,700', totalUsd: '$140.17', origin: 'Guangdong Shipping Depot', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: ' 🚰 ' },
  { id: 2, name: 'Premium Aluminum Roofing Sheets (0.55mm)', category: 'Aluminum', ngn: '₦85,000', usd: '$53.00', dutyNgn: '₦5,950', dutyUsd: '$3.71', totalNgn: '₦90,950', totalUsd: '$56.71', origin: 'Abuja Central Warehouse', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: ' 🏠 ' },
  { id: 3, name: 'Luxury Smart Space Capsule House (V8-Series)', category: 'Prefab Structural', ngn: '₦44,800,000', usd: '$28,000.00', dutyNgn: '₦3,136,000', dutyUsd: '$1,960.00', totalNgn: '₦47,936,000', totalUsd: '$29,960.00', origin: 'Foshan Prefab Industry Zone', type: 'CHINA IMPORTED', color: '#2563eb', bg: '#eff6ff', icon: ' 🚀 ' },
  { id: 4, name: 'Premium Capsule Interior Fit-Out & Concept Design', category: 'Architectural Design', ngn: '₦2,400,000', usd: '$1,500.00', dutyNgn: '₦0', dutyUsd: '$0', totalNgn: '₦2,400,000', totalUsd: '$1,500.00', origin: 'Digital Delivery Hub', type: 'DESIGN PACKAGE', color: '#7c3aed', bg: '#f5f3ff', icon: ' 📐 ' }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('market');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('NGN');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [products] = useState(INITIAL_PRODUCTS);

  const THEME = { navy: '#0f172a', graphite: '#334155', green: '#059669', white: '#ffffff', bg: '#f1f5f9' };

  // Filter and Search Logic
  const filtered = products.filter(p => 
    (p.name.toLowerCase().includes(searchTerm.toLowerCase())) && 
    (selectedCategory === 'All' || p.category === selectedCategory)
  );

  return (
    <div style={{ fontFamily: '"Inter", sans-serif', backgroundColor: THEME.bg, minHeight: '100vh', color: THEME.navy }}>
      
      {/* HEADER WITH ALL NAVIGATION */}
      <header style={{ backgroundColor: THEME.navy, color: THEME.white, padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '20px' }}>BUILDERS<span style={{ color: THEME.green }}>MARKET</span></h1>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button onClick={() => setActiveTab('market')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>MARKETPLACE</button>
          <button onClick={() => setActiveTab('supplier')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>🇨🇳 FACTORY PORTAL</button>
          <button onClick={() => setViewMode(viewMode === 'NGN' ? 'USD' : 'NGN')} style={{ padding: '6px 12px', background: THEME.graphite, border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>{viewMode}</button>
          {!currentUser ? (
            <button onClick={() => setShowAuthModal(true)} style={{ background: THEME.green, border: 'none', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>SIGN IN</button>
          ) : (
            <span style={{ fontSize: '12px' }}>Welcome, {currentUser.name}</span>
          )}
        </div>
      </header>

      {/* SEARCH & FILTER SECTION */}
      <section style={{ backgroundColor: THEME.navy, padding: '0 40px 40px 40px' }}>
        <div style={{ display: 'flex', gap: '10px', maxWidth: '900px' }}>
          <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 2, padding: '12px', borderRadius: '4px', border: 'none' }} />
          <select onChange={(e) => setSelectedCategory(e.target.value)} style={{ padding: '12px', borderRadius: '4px' }}>
            <option value="All">All Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Aluminum">Aluminum</option>
            <option value="Prefab Structural">Prefab</option>
          </select>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <main style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filtered.map((p) => (
          <div key={p.id} style={{ backgroundColor: THEME.white, padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>{p.icon}</div>
            <h3 style={{ fontSize: '16px', fontWeight: '700' }}>{p.name}</h3>
            <div style={{ fontSize: '18px', fontWeight: '800', color: THEME.green, margin: '10px 0' }}>{viewMode === 'NGN' ? p.ngn : p.usd}</div>
            <button onClick={() => { setModalItem(p); setShowModal(true); }} style={{ width: '100%', padding: '10px', backgroundColor: THEME.navy, color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>View Details</button>
          </div>
        ))}
      </main>

      {/* AUTH MODAL MOCKUP */}
      {showAuthModal && (
        <div style={{ position: 'fixed', top:0, left:0, right:0, bottom:0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', width: '300px' }}>
            <h3>Sign In</h3>
            <button onClick={() => { setCurrentUser({ name: 'User' }); setShowAuthModal(false); }} style={{ width: '100%', padding: '10px', background: THEME.green, color: '#fff', border: 'none' }}>Authenticate</button>
            <button onClick={() => setShowAuthModal(false)} style={{ marginTop: '10px', width: '100%', padding: '10px', background: '#ddd', border: 'none' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
