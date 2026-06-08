'use client';
import { useState } from 'react';

export default function Home() {
  // 1. GLOBAL STATES
  const [activeTab, setActiveTab] = useState('market');
  const [viewMode, setViewMode] = useState('NGN');
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [invoiceConfirmed, setInvoiceConfirmed] = useState(false);
  const [trackingStep, setTrackingStep] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // 2. PRODUCT DATA
  const [products, setProducts] = useState([
    { id: 1, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', ngn: '₦210,000', usd: '$131.00', dutyNgn: '₦14,700', totalNgn: '₦224,700', origin: 'Guangdong Depot', type: 'CHINA IMPORTED', icon: '🚰', color: '#e53e3e', bg: '#fff5f5' },
    { id: 3, name: 'Luxury Smart Space Capsule House (V8-Series)', category: 'Prefab Structural', ngn: '₦44,800,000', usd: '$28,000.00', dutyNgn: '₦3,136,000', totalNgn: '₦47,936,000', origin: 'Foshan Industry Zone', type: 'CHINA IMPORTED', icon: '🚀', color: '#2563eb', bg: '#eff6ff' }
  ]);

  // 3. TRACKING LOGIC (The "Engine")
  const getTrackingContent = (step, isDesign) => {
    if (isDesign) {
      const steps = { 1: "Drafting phase in progress", 2: "Rendering 3D models", 3: "Reviewing schematics", 4: "Final files sent" };
      return steps[step];
    }
    const steps = { 1: "Factory production started", 2: "In ocean transit", 3: "Clearing customs", 4: "Arrived at hub" };
    return steps[step];
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      {/* HEADER */}
      <header style={{ padding: '20px 40px', backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800' }}>🏗️ builders<span style={{color: '#16a34a'}}>market</span></h1>
        <button onClick={() => setShowAuthModal(true)} style={{ padding: '8px 20px', backgroundColor: '#111827', color: '#fff', borderRadius: '6px', cursor: 'pointer' }}>
          {currentUser ? currentUser.name : 'Sign In'}
        </button>
      </header>

      {/* MARKETPLACE GRID */}
      <main style={{ padding: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {products.map(p => (
          <div key={p.id} style={{ padding: '20px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: '40px' }}>{p.icon}</div>
            <h3>{p.name}</h3>
            <p>Price: <strong>{viewMode === 'NGN' ? p.ngn : p.usd}</strong></p>
            <button onClick={() => { setModalItem(p); setShowModal(true); }} style={{ width: '100%', padding: '10px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Request Invoice
            </button>
          </div>
        ))}
      </main>

      {/* TRACKING MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', width: '400px' }}>
            <h2>{invoiceConfirmed ? "Track Order" : "Procurement"}</h2>
            {!invoiceConfirmed ? (
              <button onClick={() => setInvoiceConfirmed(true)} style={{ width: '100%', padding: '15px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px' }}>Confirm Order</button>
            ) : (
              <div>
                <p>Status: {getTrackingContent(trackingStep, modalItem.category === 'Architectural Design')}</p>
                <button onClick={() => setTrackingStep(prev => Math.min(prev + 1, 4))} style={{ width: '100%', padding: '10px', marginTop: '10px' }}>Next Stage</button>
              </div>
            )}
            <button onClick={() => setShowModal(false)} style={{ width: '100%', marginTop: '10px', padding: '10px' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
