'use client';
import { useState } from 'react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', ngn: '₦210,000', usd: '$131.00', totalNgn: '₦224,700', totalUsd: '$140.17', origin: 'Guangdong', icon: ' 🚰 ' },
  { id: 2, name: 'Premium Aluminum Roofing Sheets', category: 'Aluminum', ngn: '₦85,000', usd: '$53.00', totalNgn: '₦90,950', totalUsd: '$56.71', origin: 'Abuja', icon: ' 🏠 ' },
  { id: 3, name: 'Luxury Smart Space Capsule House', category: 'Prefab Structural', ngn: '₦44,800,000', usd: '$28,000.00', totalNgn: '₦47,936,000', totalUsd: '$29,960.00', origin: 'Foshan', icon: ' 🚀 ' }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('market');
  const [viewMode, setViewMode] = useState('NGN');
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmail, setAuthEmail] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    setCurrentUser({ name: authEmail.split('@')[0] });
    setShowAuthModal(false);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#f1f5f9', minHeight: '100vh' }}>
      {/* HEADER */}
      <header style={{ background: '#0f172a', color: '#fff', padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <h2>BUILDERS<span style={{ color: '#059669' }}>MARKET</span></h2>
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button onClick={() => setActiveTab('market')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>MARKETPLACE</button>
          <button onClick={() => setActiveTab('factory')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>FACTORY PORTAL</button>
          <button onClick={() => setViewMode(viewMode === 'NGN' ? 'USD' : 'NGN')}>{viewMode}</button>
          {!currentUser ? (
            <button onClick={() => setShowAuthModal(true)} style={{ background: '#059669', border: 'none', color: '#fff', padding: '5px 10px' }}>SIGN IN</button>
          ) : (
            <span>{currentUser.name}</span>
          )}
        </nav>
      </header>

      {/* CONTENT AREA */}
      <main style={{ padding: '20px' }}>
        {activeTab === 'market' ? (
          <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {INITIAL_PRODUCTS.map(p => (
              <div key={p.id} style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}>
                <h3>{p.icon} {p.name}</h3>
                <p style={{ fontWeight: 'bold', color: '#059669' }}>{viewMode === 'NGN' ? p.totalNgn : p.totalUsd}</p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: '#fff', padding: '40px', borderRadius: '8px', textAlign: 'center' }}>
            <h2>Factory Portal</h2>
            <p>Welcome to the manufacturing control center.</p>
          </div>
        )}
      </main>

      {/* AUTH MODAL */}
      {showAuthModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <form onSubmit={handleSignIn} style={{ background: '#fff', padding: '30px', borderRadius: '8px' }}>
            <h3>Sign In</h3>
            <input type="email" placeholder="Email" onChange={(e) => setAuthEmail(e.target.value)} required style={{ display: 'block', marginBottom: '10px' }} />
            <button type="submit">Authenticate</button>
            <button type="button" onClick={() => setShowAuthModal(false)} style={{ marginLeft: '10px' }}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}
