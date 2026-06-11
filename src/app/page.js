'use client';
import { useState } from 'react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', ngn: '₦210,000', usd: '$131.00', origin: 'Guangdong Shipping Depot', type: 'CHINA IMPORTED', icon: ' 🚰 ' },
  { id: 2, name: 'Premium Aluminum Roofing Sheets (0.55mm)', category: 'Aluminum', ngn: '₦85,000', usd: '$53.00', origin: 'Abuja Central Warehouse', type: 'LOCAL DISTRIBUTOR', icon: ' 🏠 ' },
  { id: 3, name: 'Luxury Smart Space Capsule House (V8-Series)', category: 'Prefab Structural', ngn: '₦44,800,000', usd: '$28,000.00', origin: 'Foshan Prefab Industry Zone', type: 'CHINA IMPORTED', icon: ' 🚀 ' },
  { id: 4, name: 'Premium Capsule Interior Fit-Out & Concept Design', category: 'Architectural Design', ngn: '₦2,400,000', usd: '$1,500.00', origin: 'Digital Delivery Hub', type: 'DESIGN PACKAGE', icon: ' 📐 ' }
];

export default function Home() {
  // State Management
  const [activeTab, setActiveTab] = useState('market');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');
  const [viewMode, setViewMode] = useState('NGN');
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Logic: Filter and Sort
  const filtered = INITIAL_PRODUCTS.filter(p => 
    (p.name.toLowerCase().includes(searchTerm.toLowerCase())) && 
    (selectedCategory === 'All' || p.category === selectedCategory)
  );

  const display = [...filtered].sort((a, b) => {
    const vA = parseFloat(a.ngn.replace(/[₦,]/g, ''));
    const vB = parseFloat(b.ngn.replace(/[₦,]/g, ''));
    return sortOrder === 'low' ? vA - vB : sortOrder === 'high' ? vB - vA : 0;
  });

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#0f172a', color: '#fff', padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <h2>BUILDERS<span style={{ color: '#059669' }}>MARKET</span></h2>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => setViewMode(viewMode === 'NGN' ? 'USD' : 'NGN')}>{viewMode}</button>
          {!currentUser ? (
            <button onClick={() => setCurrentUser({name: 'Builder'})}>SIGN IN</button>
          ) : (
            <span>Welcome, {currentUser.name}</span>
          )}
        </div>
      </header>

      {/* Controls: Search, Category, Sorting */}
      <section style={{ padding: '20px', display: 'flex', gap: '10px' }}>
        <input placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '10px' }} />
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">All Sectors</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Aluminum">Aluminum</option>
          <option value="Prefab Structural">Prefab</option>
          <option value="Architectural Design">Design</option>
        </select>
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="default">Sort by Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </section>

      {/* Grid */}
      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
        {display.map(p => (
          <div key={p.id} style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}>
            <h3>{p.icon} {p.name}</h3>
            <p style={{ fontWeight: 'bold', color: '#059669' }}>{viewMode === 'NGN' ? p.ngn : p.usd}</p>
            <button onClick={() => { setModalItem(p); setShowModal(true); }}>View Specs</button>
          </div>
        ))}
      </main>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top:0, left:0, right:0, bottom:0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '8px' }}>
            <h2>{modalItem.name}</h2>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
