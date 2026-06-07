'use client';
import { useState } from 'react';

export default function Home() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState('market');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('NGN'); 
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modal & Tracking States
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [procurementMode, setProcurementMode] = useState('individual');
  const [corpDetails, setCorpDetails] = useState({ companyName: '', tinNumber: '', poNumber: '' });

  // AUTHENTICATION STATES
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authView, setAuthView] = useState('login');
  
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authTier, setAuthTier] = useState('individual');
  const [authCorpName, setAuthCorpName] = useState('');
  const [authCorpTin, setAuthCorpTin] = useState('');

  // Product Catalog State
  const [products, setProducts] = useState([
    { id: 1, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', ngn: '₦210,000', usd: '$131.00', dutyNgn: '₦14,700', dutyUsd: '$9.17', totalNgn: '₦224,700', totalUsd: '$140.17', origin: 'Guangdong Shipping Depot', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: '🚰' },
    { id: 2, name: 'Premium Aluminum Roofing Sheets (0.55mm)', category: 'Aluminum', ngn: '₦85,000', usd: '$53.00', dutyNgn: '₦5,950', dutyUsd: '$3.71', totalNgn: '₦90,950', totalUsd: '$56.71', origin: 'Abuja Central Warehouse', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: '🏠' },
    { id: 3, name: 'Luxury Smart Space Capsule House (V8-Series)', category: 'Prefab Structural', ngn: '₦44,800,000', usd: '$28,000.00', dutyNgn: '₦3,136,000', dutyUsd: '$1,960.00', totalNgn: '₦47,936,000', totalUsd: '$29,960.00', origin: 'Foshan Prefab Industry Zone', type: 'CHINA IMPORTED', color: '#2563eb', bg: '#eff6ff', icon: '🚀' },
    { id: 4, name: 'Premium Capsule Interior Fit-Out & Concept Design', category: 'Architectural Design', ngn: '₦2,400,000', usd: '$1,500.00', dutyNgn: '₦0', dutyUsd: '$0', totalNgn: '₦2,400,000', totalUsd: '$1,500.00', origin: 'Digital Delivery Hub', type: 'DESIGN PACKAGE', color: '#7c3aed', bg: '#f5f3ff', icon: '🛋️' }
  ]);

  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Prefab Structural');
  const [formBaseNgn, setFormBaseNgn] = useState('');
  const [formOrigin, setFormOrigin] = useState('');
  const [formType, setFormType] = useState('CHINA IMPORTED');

  // FUNCTIONAL HANDLERS
  const handlePrintMock = () => {
    if (!modalItem) return;
    alert(`Sending Proforma Invoice to ${currentUser ? currentUser.email : 'guest@buildersmarket.com'}...`);
    setTimeout(() => {
      alert(`✅ SUCCESS: The Proforma Invoice for ${modalItem.name} has been dispatched. Reference: #${Math.floor(Math.random() * 1000000)}`);
    }, 1500);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authView === 'register') {
      setCurrentUser({ name: authName || 'Builder', email: authEmail, accountType: authTier });
      setProcurementMode(authTier);
      if (authTier === 'corporate') setCorpDetails({ companyName: authCorpName, tinNumber: authCorpTin, poNumber: 'PENDING' });
    } else {
      setCurrentUser({ name: authEmail.split('@')[0], email: authEmail, accountType: 'individual' });
    }
    setShowAuthModal(false);
  };

  const handleLogout = () => { setCurrentUser(null); setProcurementMode('individual'); };

  const handleOnboardAsset = (e) => {
    e.preventDefault();
    const baseNgn = parseFloat(formBaseNgn) || 0;
    const newAsset = { id: Date.now(), name: formName, category: formCategory, ngn: `₦${baseNgn.toLocaleString()}`, totalNgn: `₦${(baseNgn * 1.07).toLocaleString()}`, origin: formOrigin, type: formType, color: '#2563eb', bg: '#eff6ff', icon: '📦' };
    setProducts([newAsset, ...products]);
    setActiveTab('market');
  };

  const filteredProducts = products.filter(p => (p.name.toLowerCase().includes(searchTerm.toLowerCase())) && (selectedCategory === 'All' || p.category === selectedCategory));

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', color: '#111827' }}>
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: '800', fontSize: '24px' }}>🏗️ builders<span style={{color: '#16a34a'}}>market</span></div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button onClick={() => setActiveTab('market')} style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: '600' }}>Marketplace</button>
          <button onClick={() => setActiveTab('portal')} style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: '600' }}>Factory Portal</button>
          <button onClick={() => setShowAuthModal(true)} style={{ backgroundColor: '#111827', color: '#fff', padding: '8px 20px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>{currentUser ? currentUser.name : 'Sign In'}</button>
        </div>
      </header>

      <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        {activeTab === 'market' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
            {filteredProducts.map(p => (
              <div key={p.id} style={{ padding: '25px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{p.name}</h3>
                <p style={{ color: '#6b7280', marginBottom: '20px' }}>Price: {p.ngn}</p>
                <button onClick={() => { setModalItem(p); setShowModal(true); }} style={{ width: '100%', background: '#16a34a', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer' }}>Request Invoice</button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ marginBottom: '20px' }}>Onboard New Asset</h2>
            <form onSubmit={handleOnboardAsset} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input placeholder="Asset Name" value={formName} onChange={e => setFormName(e.target.value)} required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
              <input type="number" placeholder="Price (NGN)" value={formBaseNgn} onChange={e => setFormBaseNgn(e.target.value)} required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
              <button type="submit" style={{ padding: '14px', background: '#111827', color: '#fff', border: 'none', borderRadius: '6px' }}>Publish to Matrix</button>
            </form>
          </div>
        )}
      </main>

      {/* Invoice Modal */}
      {showModal && modalItem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', maxWidth: '400px', width: '90%' }}>
            <h2>Procurement Confirmation</h2>
            <p style={{ color: '#4b5563', marginBottom: '20px' }}>Item: <strong>{modalItem.name}</strong></p>
            <button onClick={handlePrintMock} style={{ background: '#16a34a', color: '#fff', padding: '14px', width: '100%', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Email Proforma</button>
            <button onClick={() => setShowModal(false)} style={{ marginTop: '12px', width: '100%', padding: '12px', background: '#f3f4f6', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', width: '350px' }}>
            <h2 style={{ marginBottom: '20px' }}>{authView === 'login' ? 'Login' : 'Register Account'}</h2>
            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="email" placeholder="Email Address" onChange={e => setAuthEmail(e.target.value)} required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
              <input type="password" placeholder="Password" onChange={e => setAuthPassword(e.target.value)} required style={{ padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
              {authView === 'register' && (
                <>
                  <input placeholder="Name" onChange={e => setAuthName(e.target.value)} style={{ padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
                  <select onChange={e => setAuthTier(e.target.value)} style={{ padding: '12px' }}>
                    <option value="individual">Individual</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </>
              )}
              <button type="submit" style={{ padding: '12px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px' }}>{authView === 'login' ? 'Login' : 'Complete Registration'}</button>
            </form>
            <button onClick={() => setAuthView(authView === 'login' ? 'register' : 'login')} style={{ background: 'none', border: 'none', marginTop: '15px', color: '#6b7280', cursor: 'pointer' }}>
              {authView === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
