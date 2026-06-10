'use client';
import { useState } from 'react';

export default function Home() {
  // ==========================================
  // 1. ALL STATES (YOUR APP MEMORY)
  // ==========================================
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

  // Your list of items on display
  const [products, setProducts] = useState([
    { id: 1, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', ngn: '₦210,000', usd: '$131.00', dutyNgn: '₦14,700', dutyUsd: '$9.17', totalNgn: '₦224,700', totalUsd: '$140.17', origin: 'Guangdong Shipping Depot', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: '🚰' },
    { id: 2, name: 'Premium Aluminum Roofing Sheets (0.55mm)', category: 'Aluminum', ngn: '₦85,000', usd: '$53.00', dutyNgn: '₦5,950', dutyUsd: '$3.71', totalNgn: '₦90,950', totalUsd: '$56.71', origin: 'Abuja Central Warehouse', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: '🏠' },
    { id: 3, name: 'Luxury Smart Space Capsule House (V8-Series)', category: 'Prefab Structural', ngn: '₦44,800,000', usd: '$28,000.00', dutyNgn: '₦3,136,000', dutyUsd: '$1,960.00', totalNgn: '₦47,936,000', totalUsd: '$29,960.00', origin: 'Foshan Prefab Industry Zone', type: 'CHINA IMPORTED', color: '#2563eb', bg: '#eff6ff', icon: '🚀' },
    { id: 4, name: 'Premium Capsule Interior Fit-Out & Concept Design', category: 'Architectural Design', ngn: '₦2,400,000', usd: '$1,500.00', dutyNgn: '₦0', dutyUsd: '$0', totalNgn: '₦2,400,000', totalUsd: '$1,500.00', origin: 'Digital Delivery Hub', type: 'DESIGN PACKAGE', color: '#7c3aed', bg: '#f5f3ff', icon: '🛋️' },
    { id: 5, name: 'Heavy Industrial Borehole Drilling Rig Bit (9 7/8")', category: 'Drilling', ngn: '₦720,000', usd: '$450.00', dutyNgn: '₦50,400', dutyUsd: '$31.50', totalNgn: '₦770,400', totalUsd: '$481.50', origin: 'Tianjin Manufacturing Zone', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: '⚙️' },
    { id: 6, name: 'High-Grade Structural Steel H-Beams (Bulk)', category: 'Structural Materials', ngn: '₦340,000', usd: '$212.00', dutyNgn: '₦23,800', dutyUsd: '#14.84', totalNgn: '₦363,800', totalUsd: '$226.84', origin: 'Lagos Port Depot', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: '🏗️' }
  ]);

  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Prefab Structural');
  const [formBaseNgn, setFormBaseNgn] = useState('');
  const [formOrigin, setFormOrigin] = useState('');
  const [formType, setFormType] = useState('CHINA IMPORTED');

  // ==========================================
  // 2. FUNCTIONS (THE BRAINS)
  // ==========================================
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authView === 'register') {
      const newUser = {
        name: authName || authEmail.split('@')[0] || 'User',
        email: authEmail,
        accountType: authTier,
        companyName: authCorpName,
        tinNumber: authCorpTin
      };
      setCurrentUser(newUser);
      setProcurementMode(authTier);
      if (authTier === 'corporate') {
        setCorpDetails({ companyName: authCorpName, tinNumber: authCorpTin, poNumber: '' });
      }
    } else {
      const mockUser = {
        name: authEmail ? authEmail.split('@')[0] : 'Builder',
        email: authEmail,
        accountType: 'individual'
      };
      setCurrentUser(mockUser);
    }
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCorpDetails({ companyName: '', tinNumber: '', poNumber: '' });
    setProcurementMode('individual');
  };

  const filteredProducts = products.filter(product => {
    const pName = product.name ? product.name.toLowerCase() : '';
    const pOrigin = product.origin ? product.origin.toLowerCase() : '';
    const q = searchTerm.toLowerCase();
    return (pName.includes(q) || pOrigin.includes(q)) && (selectedCategory === 'All' || product.category === selectedCategory);
  });

  const handleOnboardAsset = (e) => {
    e.preventDefault();
    const baseNgnNum = parseFloat(formBaseNgn) || 0;
    const isDigital = formCategory === 'Architectural Design';
    const calculatedDutyNgn = isDigital ? 0 : Math.round(baseNgnNum * 0.07);
    const totalNgnNum = baseNgnNum + calculatedDutyNgn;
    const baseUsdNum = Math.round((baseNgnNum / 1600) * 100) / 100;
    const calculatedDutyUsd = isDigital ? 0 : Math.round((calculatedDutyNgn / 1600) * 100) / 100;
    const totalUsdNum = baseUsdNum + calculatedDutyUsd;

    let themeColor = '#2563eb'; let themeBg = '#eff6ff'; let defaultIcon = '📦';
    if (formType === 'LOCAL DISTRIBUTOR') { themeColor = '#16a34a'; themeBg = '#f0fdf4'; }
    else if (formType === 'DESIGN PACKAGE') { themeColor = '#7c3aed'; themeBg = '#f5f3ff'; }

    if (formCategory === 'Prefab Structural') defaultIcon = '🏠';
    if (formCategory === 'Architectural Design') defaultIcon = '📐';
    if (formCategory === 'Drilling') defaultIcon = '⚙️';
    if (formCategory === 'Plumbing') defaultIcon = '🚰';

    const newAsset = {
      id: products.length + 1, name: formName, category: formCategory,
      ngn: `₦${baseNgnNum.toLocaleString()}`, usd: `$${baseUsdNum.toLocaleString()}`,
      dutyNgn: `₦${calculatedDutyNgn.toLocaleString()}`, dutyUsd: `$${calculatedDutyUsd.toLocaleString()}`,
      totalNgn: `₦${totalNgnNum.toLocaleString()}`, totalUsd: `$${totalUsdNum.toLocaleString()}`,
      origin: formOrigin, type: formType, color: themeColor, bg: themeBg, icon: defaultIcon
    };

    setProducts([newAsset, ...products]);
    setFormName(''); setFormBaseNgn(''); setFormOrigin('');
    setActiveTab('market');
  };

  const isDesign = modalItem?.category === 'Architectural Design';
  const label1 = isDesign ? '1. Draft' : '1. Factory';
  const label2 = isDesign ? '2. Render' : '2. Transit';
  const label3 = isDesign ? '3. Review' : '3. Clearing';
  const label4 = isDesign ? '4. Sent' : '4. Arrived';

  // ==========================================
  // 3. VISUAL INTERFACE (THE LOOKS)
  // ==========================================
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', color: '#111827' }}>
      
      {/* HEADER NAVBAR */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '26px' }}>🏗️</span>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#16a34a' }}>
            builders<span style={{ color: '#111827' }}>market</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button onClick={() => setActiveTab('market')} style={{ background: 'none', border: 'none', color: activeTab === 'market' ? '#16a34a' : '#4b5563', fontWeight: '600', cursor: 'pointer' }}>Marketplace</button>
          <button onClick={() => setActiveTab('supplier')} style={{ background: 'none', border: 'none', color: activeTab === 'supplier' ? '#16a34a' : '#4b5563', fontWeight: '600', cursor: 'pointer' }}>🇨🇳 Factory Portal</button>
          
          <div style={{ border: '1px solid #d1d5db', borderRadius: '20px', padding: '3px', display: 'flex', backgroundColor: '#f3f4f6', marginRight: '5px' }}>
            <button onClick={() => setViewMode('NGN')} style={{ border: 'none', padding: '5px 12px', borderRadius: '16px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', backgroundColor: viewMode === 'NGN' ? '#111827' : 'transparent', color: viewMode === 'NGN' ? '#ffffff' : '#4b5563' }}>₦ NGN</button>
            <button onClick={() => setViewMode('USD')} style={{ border: 'none', padding: '5px 12px', borderRadius: '16px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', backgroundColor: viewMode === 'USD' ? '#111827' : 'transparent', color: viewMode === 'USD' ? '#ffffff' : '#4b5563' }}>$ USD</button>
          </div>

          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid #e5e7eb', paddingLeft: '15px' }}>
              <span style={{ fontSize: '13px', fontWeight: '600' }}>
                👋 {currentUser.name} <span style={{ fontSize: '10px', backgroundColor: currentUser.accountType === 'corporate' ? '#dbffe4' : '#e5e7eb', color: currentUser.accountType === 'corporate' ? '#15803d' : '#111827', padding: '2px 6px', borderRadius: '10px', marginLeft: '4px', fontWeight: '800' }}>{(currentUser.accountType || 'individual').toUpperCase()}</span>
              </span>
              <button onClick={handleLogout} style={{ background: 'none', border: '1px solid #d1d5db', padding: '5px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}>Logout</button>
            </div>
          ) : (
            <button onClick={() => { setAuthView('login'); setShowAuthModal(true); }} style={{ backgroundColor: '#111827', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
              Sign In
            </button>
          )}
        </div>
      </header>

      {activeTab === 'market' ? (
        <>
          {/* HERO BAR */}
          <section style={{ backgroundColor: '#111827', color: '#ffffff', padding: '50px 20px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '34px', fontWeight: '800', marginBottom: '10px' }}>Global Procurement Matrix</h1>
            <p style={{ fontSize: '15px', color: '#9ca3af', maxWidth: '650px', margin: '0 auto 25px' }}>
              Direct pipeline for heavy machinery, prefabricated houses, and premium interior/exterior designs.
            </p>
            
            <div style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '12px', maxWidth: '780px', margin: '0 auto', display: 'flex', gap: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <input type="text" placeholder="Search structures, specs, or design portfolios..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 2, padding: '11px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', color: '#111827', boxSizing: 'border-box' }} />
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ flex: 1, padding: '11px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', backgroundColor: '#f9fafb', color: '#111827', cursor: 'pointer' }}>
                <option value="All">All Sectors</option>
                <option value="Prefab Structural">Prefab & Capsule Units</option>
                <option value="Architectural Design">Interior/Exterior Design</option>
                <option value="Drilling">Borehole Drilling</option>
                <option value="Plumbing">Industrial Plumbing</option>
                <option value="Aluminum">Aluminum Products</option>
              </select>
            </div>
          </section>

          {/* MARKETPLACE INVENTORY GRID */}
          <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
              {filteredProducts.map((product) => (
                <div key={product.id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ backgroundColor: '#f3f4f6', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '52px', position: 'relative' }}>
                    {product.icon}
                    <span style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '10px', fontWeight: '700', color: product.color, backgroundColor: product.bg, padding: '4px 8px', borderRadius: '20px', border: '1px solid currentColor' }}>{product.type}</span>
                  </div>

                  <div style={{ padding: '20px', flexGrow: 1 }}>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#4b5563', fontWeight: '700', backgroundColor: '#e5e7eb', padding: '3px 6px', borderRadius: '4px' }}>{product.category}</span>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', marginTop: '10px', marginBottom: '6px', minHeight: '42px' }}>{product.name}</h3>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>📍 Fulfillment: <strong>{product.origin}</strong></div>
                  </div>

                  <div style={{ padding: '0 20px 20px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f3f4f6', paddingTop: '15px' }}>
                    <div>
                      <span style={{ fontSize: '16px', fontWeight: '800', color: '#111827' }}>{viewMode === 'NGN' ? product.ngn : product.usd}</span>
                      <span style={{ fontSize: '11px', color: '#6b7280', display: 'block' }}>FOB Base Price</span>
                    </div>
                    
                    {/* BUTTONS STACKED CLEANLY */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <button onClick={() => { 
                        setModalItem(product); 
                        setInvoiceConfirmed(false); 
                        setTrackingStep(1); 
                        setProcurementMode(currentUser ? currentUser.accountType : 'individual');
                        setShowModal(true); 
                      }} style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '9px 14px', borderRadius: '6px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
                        Request Invoice
                      </button>
                      
                      <button 
                        onClick={() => setProducts(products.filter(p => p.id !== product.id))}
                        style={{ backgroundColor: '#fee2e2', color: '#ef4444', border: '1px solid #fca5a5', padding: '5px 14px', borderRadius: '6px', fontWeight: '600', fontSize: '11px', cursor: 'pointer' }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </>
      ) : (
        /* FACTORY PORTAL TAB */
        <main style={{ maxWidth: '540px', margin: '40px auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '4px' }}>Global Asset Onboarding</h2>
          <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '20px' }}>Deploy blueprints or equipment directly to the front-facing matrix.</p>
          <form onSubmit={handleOnboardAsset} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input type="text" placeholder="Asset/Product Title" value={formName} onChange={(e) => setFormName(e.target.value)} required style={{ width: '100%', padding: '11px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', boxSizing: 'border-box' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)} style={{ padding: '11px', borderRadius: '6px', border: '1px solid #d1d5db', width: '100%' }}>
                <option value="Prefab Structural">Prefab & Capsule Units</option>
                <option value="Architectural Design">Interior/Exterior Design</option>
                <option value="Drilling">Borehole Drilling</option>
                <option value="Plumbing">Industrial Plumbing</option>
                <option value="Aluminum">Aluminum Products</option>
              </select>
              <select value={formType} onChange={(e) => setFormType(e.target.value)} style={{ padding: '11px', borderRadius: '6px', border: '1px solid #d1d5db', width: '100%' }}>
                <option value="CHINA IMPORTED">CHINA IMPORTED</option>
                <option value="LOCAL DISTRIBUTOR">LOCAL DISTRIBUTOR</option>
                <option value="DESIGN PACKAGE">DESIGN PACKAGE</option>
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <input type="number" placeholder="Base Cost Price (NGN ₦)" value={formBaseNgn} onChange={(e) => setFormBaseNgn(e.target.value)} required style={{ padding: '11px', borderRadius: '6px', border: '1px solid #d1d5db', width: '100%', boxSizing: 'border-box' }} />
              <input type="text" placeholder="Logistics Hub Location" value={formOrigin} onChange={(e) => setFormOrigin(e.target.value)} required style={{ padding: '11px', borderRadius: '6px', border: '1px solid #d1d5db', width: '100%', boxSizing: 'border-box' }} />
            </div>
            <button type="submit" style={{ backgroundColor: '#111827', color: '#fff', padding: '13px', borderRadius: '6px', border: 'none', fontWeight: '700', cursor: 'pointer', width: '100%' }}>Publish Node to Grid</button>
          </form>
        </main>
      )}

      {/* REGISTRATION MODAL */}
      {showAuthModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,24,39,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
          <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', maxWidth: '400px', width: '100%', margin: '20px', position: 'relative' }}>
            <button onClick={() => setShowAuthModal(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#9ca3af' }}>✕</button>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '5px', textAlign: 'center' }}>
              {authView === 'login' ? 'Access Portal Gateway' : 'Create Procurement Profile'}
            </h3>
            <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '20px', textAlign: 'center' }}>
              {authView === 'login' ? 'Enter credentials to manage active trade files.' : 'Select builder or firm account level.'}
            </p>

            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {authView === 'register' && (
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>Full Name / Representative</label>
                  <input type="text" required placeholder="Francis Jolaoso" value={authName} onChange={(e) => setAuthName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box' }} />
                </div>
              )}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>Email Address</label>
                <input type="email" required placeholder="name@domain.com" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>Password</label>
                <input type="password" required placeholder="••••••••" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box' }} />
              </div>

              {authView === 'register' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>Profile Procurement Tier</label>
                    <select value={authTier} onChange={(e) => setAuthTier(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box', backgroundColor: '#fff' }}>
                      <option value="individual">👤 Individual Builder Account</option>
                      <option value="corporate">🏢 Corporate Firm/Company Account</option>
                    </select>
                  </div>
                  {authTier === 'corporate' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px', backgroundColor: '#f0fdf4', borderRadius: '6px', border: '1px dashed #16a34a' }}>
                      <input type="text" placeholder="Registered Company Name" required={authTier === 'corporate'} value={authCorpName} onChange={(e) => setAuthCorpName(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box' }} />
                      <input type="text" placeholder="Tax Registration (TIN Number)" required={authTier === 'corporate'} value={authCorpTin} onChange={(e) => setAuthCorpTin(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box' }} />
                    </div>
                  )}
                </>
              )}
              <button type="submit" style={{ width: '100%', backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', marginTop: '5px' }}>
                {authView === 'login' ? 'Authenticate Entry' : 'Register Profile Matrix'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '12px', color: '#4b5563' }}>
              {authView === 'login' ? (
                <span>New builder? <button onClick={() => setAuthView('register')} style={{ background: 'none', border: 'none', color: '#16a34a', fontWeight: '700', cursor: 'pointer', padding: 0 }}>Create account</button></span>
              ) : (
                <span>Have an account? <button onClick={() => setAuthView('login')} style={{ background: 'none', border: 'none', color: '#16a34a', fontWeight: '700', cursor: 'pointer', padding: 0 }}>Sign in</button></span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PROCUREMENT TRACKING MODAL */}
      {showModal && modalItem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,24,39,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '12px', maxWidth: '460px', width: '100%', margin: '20px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#9ca3af' }}>✕</button>
            
            {!invoiceConfirmed ? (
              <>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '4px' }}>Proforma Pricing Sheet</h3>
                <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '15px' }}>Select profile context below to streamline settlement documentation.</p>
                
                <div style={{ display: 'flex', backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '4px', marginBottom: '15px' }}>
                  <button type="button" onClick={() => setProcurementMode('individual')} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', backgroundColor: procurementMode === 'individual' ? '#ffffff' : 'transparent', color: procurementMode === 'individual' ? '#111827' : '#6b7280' }}>👤 Individual Client</button>
                  <button type="button" onClick={() => setProcurementMode('corporate')} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', backgroundColor: procurementMode === 'corporate' ? '#ffffff' : 'transparent', color: procurementMode === 'corporate' ? '#111827' : '#6b7280' }}>🏢 Corporate / Firm</button>
                </div>

                {procurementMode === 'corporate' && (
                  <div style={{ padding: '12px', borderRadius: '8px', border: '1px dashed #16a34a', backgroundColor: '#f0fdf4', marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#16a34a', textTransform: 'uppercase' }}>Corporate Validation Fields</span>
                    <input type="text" placeholder="Registered Company Name" value={corpDetails.companyName} onChange={(e) => setCorpDetails({...corpDetails, companyName: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <input type="text" placeholder="Tax TIN Number" value={corpDetails.tinNumber} onChange={(e) => setCorpDetails({...corpDetails, tinNumber: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box' }} />
                      <input type="text" placeholder="Internal PO Reference" value={corpDetails.poNumber} onChange={(e) => setCorpDetails({...corpDetails, poNumber: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                )}

                <div style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '6px', marginBottom: '15px', fontSize: '13px' }}>
                  <strong>Asset Line:</strong> {modalItem.name} {modalItem.icon}
                  <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '3px' }}>Dispatch Hub: {modalItem.origin}</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', borderTop: '1px solid #e5e7eb', paddingTop: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>FOB Port Base Liability:</span><strong>{viewMode === 'NGN' ? modalItem.ngn : modalItem.usd}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Customs Duty Premium:</span><strong>{isDesign ? 'EXEMPT (Digital Asset)' : (viewMode === 'NGN' ? modalItem.dutyNgn : modalItem.dutyUsd)}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #d1d5db', paddingTop: '8px', marginTop: '4px', fontSize: '14px', fontWeight: '800' }}>
                    <span>Total Settlement Due:</span>
                    <span style={{ color: '#16a34a' }}>{viewMode === 'NGN' ? modalItem.totalNgn : modalItem.totalUsd}</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  {procurementMode === 'corporate' && (
                    <button onClick={() => alert('Invoice ready')} style={{ backgroundColor: '#111827', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>🖨️ Print Proforma</button>
                  )}
                  <button onClick={() => setInvoiceConfirmed(true)} style={{ flex: 1, backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                    Confirm & Track Order
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '4px' }}>Procurement Tracking Node</h3>
                <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '20px' }}>
                  Account Assignment: <strong style={{ color: '#111827' }}>{procurementMode === 'corporate' ? corpDetails.companyName || 'Corporate Account' : (currentUser ? currentUser.name : 'Individual Builder')}</strong>
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px', marginBottom: '25px' }}>
                  <div style={{ flex: 1, height: '6px', borderRadius: '4px', backgroundColor: trackingStep >= 1 ? '#16a34a' : '#e5e7eb' }} />
                  <div style={{ flex: 1, height: '6px', borderRadius: '4px', backgroundColor: trackingStep >= 2 ? '#16a34a' : '#e5e7eb' }} />
                  <div style={{ flex: 1, height: '6px', borderRadius: '4px', backgroundColor: trackingStep >= 3 ? '#16a34a' : '#e5e7eb' }} />
                  <div style={{ flex: 1, height: '6px', borderRadius: '4px', backgroundColor: trackingStep >= 4 ? '#16a34a' : '#e5e7eb' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', marginBottom: '20px', color: '#6b7280' }}>
                  <span style={{ color: trackingStep === 1 ? '#16a34a' : '#6b7280' }}>{label1}</span>
                  <span style={{ color: trackingStep === 2 ? '#16a34a' : '#6b7280' }}>{label2}</span>
                  <span style={{ color: trackingStep === 3 ? '#16a34a' : '#6b7280' }}>{label3}</span>
                  <span style={{ color: trackingStep === 4 ? '#16a34a' : '#6b7280' }}>{label4}</span>
                </div>

                <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', padding: '15px', borderRadius: '8px', marginBottom: '25px', fontSize: '13px' }}>
                  {!isDesign ? (
                    <div>
                      {trackingStep === 1 && <div>🏭 <strong>Stage 1: Factory Production</strong><p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '12px' }}>Your materials are currently being crated and serialized for container logistics.</p></div>}
                      {trackingStep === 2 && <div>🚢 <strong>Stage 2: Ocean Freight Transit</strong><p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '12px' }}>Cargo moving securely across main shipping corridors toward the entry port.</p></div>}
                      {trackingStep === 3 && <div>🛃 <strong>Stage 3: Customs Duty Clearing</strong><p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '12px' }}>Port tariff calculations and official manifest matching are undergoing approval.</p></div>}
                      {trackingStep === 4 && <div>✅ <strong>Stage 4: Ready for Delivery</strong><p style={{ margin: '4px 0 0', color: '#16a34a', fontSize: '12px' }}>Cargo arrived at local distribution node. Ready for site dispatch.</p></div>}
                    </div>
                  ) : (
                    <div>
                      {trackingStep === 1 && <div>✏️ <strong>Stage 1: Structural Drafting</strong><p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '12px' }}>Architects are drafting your custom space capsule interior spatial blueprints.</p></div>}
                      {trackingStep === 2 && <div>🖥️ <strong>Stage 2: 3D High-Fidelity Rendering</strong><p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '12px' }}>Generating full lighting and contextual layout renders for client validation.</p></div>}
                      {trackingStep === 3 && <div>📋 <strong>Stage 3: Engineering Review</strong><p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '12px' }}>Checking weight distributions, load bearings, and plumbing schematic match-ups.</p></div>}
                      {trackingStep === 4 && <div>✅ <strong>Stage 4: Digital Handover</strong><p style={{ margin: '4px 0 0', color: '#16a34a', fontSize: '12px', fontWeight: '600' }}>Design package finalized and exported for site implementation.</p></div>}
                    </div>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => setTrackingStep(prev => Math.min(prev + 1, 4))} 
                    disabled={trackingStep === 4}
                    style={{ flex: 1, backgroundColor: '#111827', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}
                  >
                    {trackingStep === 4 ? 'Order Complete' : 'Advance Stage'}
                  </button>
                  <button onClick={() => setShowModal(false)} style={{ padding: '10px 20px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'none', cursor: 'pointer' }}>Close</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
