'use client';
import { useState } from 'react';

// 1. DATA (All your original products)
const INITIAL_PRODUCTS = [
  { id: 1, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', ngn: '₦210,000', usd: '$131.00', dutyNgn: '₦14,700', dutyUsd: '$9.17', totalNgn: '₦224,700', totalUsd: '$140.17', origin: 'Guangdong Shipping Depot', type: 'CHINA IMPORTED', color: '#e53e3e', icon: ' 🚰 ' },
  { id: 2, name: 'Premium Aluminum Roofing Sheets (0.55mm)', category: 'Aluminum', ngn: '₦85,000', usd: '$53.00', dutyNgn: '₦5,950', dutyUsd: '$3.71', totalNgn: '₦90,950', totalUsd: '$56.71', origin: 'Abuja Central Warehouse', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', icon: ' 🏠 ' },
  { id: 3, name: 'Luxury Smart Space Capsule House (V8-Series)', category: 'Prefab Structural', ngn: '₦44,800,000', usd: '$28,000.00', dutyNgn: '₦3,136,000', dutyUsd: '$1,960.00', totalNgn: '₦47,936,000', totalUsd: '$29,960.00', origin: 'Foshan Prefab Industry Zone', type: 'CHINA IMPORTED', color: '#2563eb', icon: ' 🚀 ' }
];

export default function Home() {
  // 2. ALL FUNCTIONAL STATES
  const [activeTab, setActiveTab] = useState('market');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('NGN');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // 3. SEARCH & SORT LOGIC
  const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
      {/* HEADER */}
      <header style={{ backgroundColor: '#0f172a', color: '#fff', padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <h2>BUILDERS<span style={{ color: '#059669' }}>MARKET</span></h2>
        <div>
          <button onClick={() => setViewMode(viewMode === 'NGN' ? 'USD' : 'NGN')}>{viewMode}</button>
          {!currentUser ? <button onClick={() => setCurrentUser({name: 'Builder'})}>SIGN IN</button> : <span>Hi {currentUser.name}</span>}
        </div>
      </header>

      {/* SEARCH BAR */}
      <section style={{ padding: '20px' }}>
        <input placeholder="Search products..." onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '10px', width: '300px' }} />
      </section>

      {/* PRODUCT GRID */}
      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '20px' }}>
        {filtered.map(p => (
          <div key={p.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
            <h3>{p.icon} {p.name}</h3>
            <p style={{ fontWeight: 'bold', color: '#059669' }}>{viewMode === 'NGN' ? p.ngn : p.usd}</p>
            <button onClick={() => { setModalItem(p); setShowModal(true); }}>View Specs</button>
          </div>
        ))}
      </main>

      {/* MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}>
            <h2>{modalItem.name}</h2>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
