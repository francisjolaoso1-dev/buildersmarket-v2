'use client';
import { useState } from 'react';

// 1. DATA (Restored with all price fields)
const INITIAL_PRODUCTS = [
  { id: 1, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', ngn: '₦210,000', usd: '$131.00', dutyNgn: '₦14,700', dutyUsd: '$9.17', totalNgn: '₦224,700', totalUsd: '$140.17', origin: 'Guangdong Shipping Depot', type: 'CHINA IMPORTED', icon: ' 🚰 ' },
  { id: 2, name: 'Premium Aluminum Roofing Sheets (0.55mm)', category: 'Aluminum', ngn: '₦85,000', usd: '$53.00', dutyNgn: '₦5,950', dutyUsd: '$3.71', totalNgn: '₦90,950', totalUsd: '$56.71', origin: 'Abuja Central Warehouse', type: 'LOCAL DISTRIBUTOR', icon: ' 🏠 ' },
  { id: 3, name: 'Luxury Smart Space Capsule House (V8-Series)', category: 'Prefab Structural', ngn: '₦44,800,000', usd: '$28,000.00', dutyNgn: '₦3,136,000', dutyUsd: '$1,960.00', totalNgn: '₦47,936,000', totalUsd: '$29,960.00', origin: 'Foshan Prefab Industry Zone', type: 'CHINA IMPORTED', icon: ' 🚀 ' }
];

export default function Home() {
  // 2. STATE MANAGEMENT
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('NGN');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // 3. LOGIC (Filtering & Currency-Aware Sorting)
  const filtered = INITIAL_PRODUCTS.filter(p => 
    (p.name.toLowerCase().includes(searchTerm.toLowerCase())) && 
    (selectedCategory === 'All' || p.category === selectedCategory)
  );

  const display = [...filtered].sort((a, b) => {
    const priceKey = viewMode === 'NGN' ? 'totalNgn' : 'totalUsd';
    const vA = parseFloat(a[priceKey].replace(/[₦,$]/g, '').replace(/,/g, ''));
    const vB = parseFloat(b[priceKey].replace(/[₦,$]/g, '').replace(/,/g, ''));
    return sortOrder === 'low' ? vA - vB : sortOrder === 'high' ? vB - vA : 0;
  });

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh', padding: '20px' }}>
      {/* HEADER */}
      <header style={{ background: '#0f172a', color: '#fff', padding: '20px', display: 'flex', justifyContent: 'space-between', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>BUILDERS<span style={{ color: '#059669' }}>MARKET</span></h2>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button onClick={() => setViewMode(viewMode === 'NGN' ? 'USD' : 'NGN')} style={{ padding: '8px', cursor: 'pointer' }}>
            Switch to {viewMode === 'NGN' ? 'USD ($)' : 'NGN (₦)'}
          </button>
          {!currentUser ? (
            <button onClick={() => setCurrentUser({name: 'Builder'})}>SIGN IN</button>
          ) : (
            <span>Welcome, {currentUser.name}</span>
          )}
        </div>
      </header>

      {/* FILTERS */}
      <section style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '10px' }} />
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">All Sectors</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Aluminum">Aluminum</option>
          <option value="Prefab Structural">Prefab</option>
        </select>
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="default">Sort by Price</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </section>

      {/* GRID */}
      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {display.map(p => (
          <div key={p.id} style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h3>{p.icon} {p.name}</h3>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#059669' }}>
              {viewMode === 'NGN' ? p.totalNgn : p.totalUsd}
            </p>
            <button onClick={() => { setModalItem(p); setShowModal(true); }} style={{ width: '100%', padding: '10px', background: '#0f172a', color: '#fff', border: 'none', cursor: 'pointer' }}>View Details</button>
          </div>
        ))}
      </main>

      {/* MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', top:0, left:0, right:0, bottom:0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', width: '300px' }}>
            <h2>{modalItem.name}</h2>
            <p>Total: {viewMode === 'NGN' ? modalItem.totalNgn : modalItem.totalUsd}</p>
            <button onClick={() => setShowModal(false)} style={{ width: '100%', padding: '10px' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
