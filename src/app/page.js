'use client';
import { useState } from 'react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', ngn: '₦210,000', usd: '$131.00', dutyNgn: '₦14,700', dutyUsd: '$9.17', totalNgn: '₦224,700', totalUsd: '$140.17', origin: 'Guangdong Shipping Depot', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: ' 🚰 ' },
  { id: 2, name: 'Premium Aluminum Roofing Sheets (0.55mm)', category: 'Aluminum', ngn: '₦85,000', usd: '$53.00', dutyNgn: '₦5,950', dutyUsd: '$3.71', totalNgn: '₦90,950', totalUsd: '$56.71', origin: 'Abuja Central Warehouse', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: ' 🏠 ' },
  { id: 3, name: 'Luxury Smart Space Capsule House (V8-Series)', category: 'Prefab Structural', ngn: '₦44,800,000', usd: '$28,000.00', dutyNgn: '₦3,136,000', dutyUsd: '$1,960.00', totalNgn: '₦47,936,000', totalUsd: '$29,960.00', origin: 'Foshan Prefab Industry Zone', type: 'CHINA IMPORTED', color: '#2563eb', bg: '#eff6ff', icon: ' 🚀 ' },
  { id: 4, name: 'Premium Capsule Interior Fit-Out & Concept Design', category: 'Architectural Design', ngn: '₦2,400,000', usd: '$1,500.00', dutyNgn: '₦0', dutyUsd: '$0', totalNgn: '₦2,400,000', totalUsd: '$1,500.00', origin: 'Digital Delivery Hub', type: 'DESIGN PACKAGE', color: '#7c3aed', bg: '#f5f3ff', icon: ' 📐 ' },
  { id: 5, name: 'Heavy Industrial Borehole Drilling Rig Bit (9 7/8")', category: 'Drilling', ngn: '₦720,000', usd: '$450.00', dutyNgn: '₦50,400', dutyUsd: '$31.50', totalNgn: '₦770,400', totalUsd: '$481.50', origin: 'Tianjin Manufacturing Zone', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: ' ⚙ ️' },
  { id: 6, name: 'High-Grade Structural Steel H-Beams (Bulk)', category: 'Structural Materials', ngn: '₦340,000', usd: '$212.00', dutyNgn: '₦23,800', dutyUsd: '$14.84', totalNgn: '₦363,800', totalUsd: '$226.84', origin: 'Lagos Port Depot', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: ' 🏗 ️' }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('market');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');
  const [viewMode, setViewMode] = useState('NGN');
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  const THEME = { navy: '#0f172a', graphite: '#334155', green: '#059669', white: '#ffffff', bg: '#f1f5f9' };

  // Filter and Search Logic
  const filteredProducts = products.filter(p => 
    (p.name.toLowerCase().includes(searchTerm.toLowerCase())) && 
    (selectedCategory === 'All' || p.category === selectedCategory)
  );

  // Sorting Logic
  const displayProducts = [...filteredProducts].sort((a, b) => {
    const vA = parseFloat(a.ngn.replace(/[₦,]/g, ''));
    const vB = parseFloat(b.ngn.replace(/[₦,]/g, ''));
    return sortOrder === 'low' ? vA - vB : sortOrder === 'high' ? vB - vA : 0;
  });

  return (
    <div style={{ fontFamily: '"Inter", sans-serif', backgroundColor: THEME.bg, minHeight: '100vh', color: THEME.navy }}>
      <header style={{ backgroundColor: THEME.navy, color: THEME.white, padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '20px' }}>BUILDERS<span style={{ color: THEME.green }}>MARKET</span></h1>
        <button onClick={() => setViewMode(viewMode === 'NGN' ? 'USD' : 'NGN')} style={{ padding: '6px 12px', background: '#334155', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>{viewMode}</button>
      </header>

      <section style={{ backgroundColor: THEME.navy, padding: '0 40px 40px 40px' }}>
        <div style={{ display: 'flex', gap: '10px', maxWidth: '800px' }}>
          <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 2, padding: '12px', borderRadius: '4px', border: 'none' }} />
          <select onChange={(e) => setSelectedCategory(e.target.value)} style={{ padding: '12px', borderRadius: '4px' }}>
            <option value="All">All Sectors</option>
            <option value="Prefab Structural">Prefab</option>
            <option value="Drilling">Drilling</option>
            <option value="Plumbing">Plumbing</option>
          </select>
          <select onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '12px', borderRadius: '4px' }}>
            <option value="default">Sort by Price</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </section>

      <main style={{ maxWidth: '1200px', margin: '20px auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {displayProducts.map((p) => (
          <div key={p.id} style={{ backgroundColor: THEME.white, padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h3>{p.name}</h3>
            <div style={{ fontSize: '20px', fontWeight: '800', color: THEME.green }}>{viewMode === 'NGN' ? p.ngn : p.usd}</div>
            <button onClick={() => { setModalItem(p); setShowModal(true); }} style={{ marginTop: '15px', width: '100%', padding: '10px', backgroundColor: THEME.navy, color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>View Specs</button>
          </div>
        ))}
      </main>
    </div>
  );
}
