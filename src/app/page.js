'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('market');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('NGN'); 
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [invoiceConfirmed, setInvoiceConfirmed] = useState(false);
  const [trackingStep, setTrackingStep] = useState(1); 
  const [procurementMode, setProcurementMode] = useState('individual');
  const [corpDetails, setCorpDetails] = useState({ companyName: '', tinNumber: '', poNumber: '' });
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authView, setAuthView] = useState('login');
  
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authTier, setAuthTier] = useState('individual');
  const [authCorpName, setAuthCorpName] = useState('');
  const [authCorpTin, setAuthCorpTin] = useState('');

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

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authView === 'register') {
      setCurrentUser({ name: authName || 'User', email: authEmail, accountType: authTier });
      setProcurementMode(authTier);
    } else {
      setCurrentUser({ name: authEmail.split('@')[0], email: authEmail, accountType: 'individual' });
    }
    setShowAuthModal(false);
  };

  const handleLogout = () => { setCurrentUser(null); setProcurementMode('individual'); };

  const handlePrintMock = () => {
    if (!modalItem) return;
    alert(`Sending Proforma to ${currentUser ? currentUser.email : 'guest@builder.com'}...`);
    setTimeout(() => { alert(`✅ Email Dispatched Successfully for ${modalItem.name}!`); }, 1000);
  };

  const filteredProducts = products.filter(p => (p.name.toLowerCase().includes(searchTerm.toLowerCase())) && (selectedCategory === 'All' || p.category === selectedCategory));

  const handleOnboardAsset = (e) => {
    e.preventDefault();
    const baseNgn = parseFloat(formBaseNgn) || 0;
    const newAsset = { id: Date.now(), name: formName, category: formCategory, ngn: `₦${baseNgn.toLocaleString()}`, totalNgn: `₦${(baseNgn * 1.07).toLocaleString()}`, origin: formOrigin, type: formType, color: '#2563eb', bg: '#eff6ff', icon: '📦' };
    setProducts([newAsset, ...products]);
    setActiveTab('market');
  };

  const isDesign = modalItem?.category === 'Architectural Design';

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <header style={{ padding: '20px', backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontWeight: '800', fontSize: '20px' }}>🏗️ builders<span style={{color: '#16a34a'}}>market</span></div>
        <div>
          <button onClick={() => setActiveTab('market')} style={{ marginRight: '10px' }}>Market</button>
          <button onClick={() => setActiveTab('supplier')}>Portal</button>
          <button onClick={() => setShowAuthModal(true)} style={{ marginLeft: '10px', backgroundColor: '#111827', color: '#fff', padding: '5px 15px', borderRadius: '5px' }}>{currentUser ? currentUser.name : 'Sign In'}</button>
        </div>
      </header>

      {activeTab === 'market' ? (
        <main style={{ padding: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {filteredProducts.map(p => (
              <div key={p.id} style={{ padding: '20px', background: '#fff', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
                <h3>{p.name}</h3>
                <p>Price: {viewMode === 'NGN' ? p.ngn : p.usd}</p>
                <button onClick={() => { setModalItem(p); setShowModal(true); }} style={{ width: '100%', background: '#16a34a', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px' }}>Request Invoice</button>
              </div>
            ))}
          </div>
        </main>
      ) : (
        <main style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', background: '#fff' }}>
          <form onSubmit={handleOnboardAsset} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input placeholder="Asset Name" value={formName} onChange={e => setFormName(e.target.value)} required style={{ padding: '10px' }} />
            <input type="number" placeholder="Price (NGN)" value={formBaseNgn} onChange={e => setFormBaseNgn(e.target.value)} required style={{ padding: '10px' }} />
            <button type="submit" style={{ padding: '10px', background: '#111827', color: '#fff' }}>Publish</button>
          </form>
        </main>
      )}

      {showModal && modalItem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '10px', maxWidth: '400px' }}>
            <h2>Invoice for {modalItem.name}</h2>
            <button onClick={handlePrintMock} style={{ background: '#16a34a', color: '#fff', padding: '10px', width: '100%', border: 'none' }}>Email Proforma</button>
            <button onClick={() => setShowModal(false)} style={{ marginTop: '10px', width: '100%' }}>Close</button>
          </div>
        </div>
      )}
      
      {showAuthModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '10px', width: '300px' }}>
            <form onSubmit={handleAuthSubmit}>
              <input type="email" placeholder="Email" value={authEmail} onChange={e => setAuthEmail(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
              <input type="password" placeholder="Password" value={authPassword} onChange={e => setAuthPassword(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
              <button type="submit" style={{ width: '100%' }}>{authView === 'login' ? 'Login' : 'Register'}</button>
            </form>
            <button onClick={() => setAuthView(authView === 'login' ? 'register' : 'login')} style={{ marginTop: '10px', width: '100%', background: 'none' }}>
              {authView === 'login' ? 'Create Account' : 'Back to Login'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
