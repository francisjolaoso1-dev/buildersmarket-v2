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
  const [invoiceConfirmed, setInvoiceConfirmed] = useState(false);
  const [trackingStep, setTrackingStep] = useState(1); 
  const [procurementMode, setProcurementMode] = useState('individual');

  // Corporate Specific States
  const [corpDetails, setCorpDetails] = useState({ companyName: '', tinNumber: '', poNumber: '' });

  // AUTHENTICATION STATES
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authView, setAuthView] = useState('login');
  
  // Auth Form State
  const [authForm, setAuthForm] = useState({
    fullName: '',
    email: '',
    password: '',
    accountType: 'individual',
    companyName: '',
    tinNumber: ''
  });

  // Product Catalog State
  const [products, setProducts] = useState([
    { id: 1, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', ngn: '₦210,000', usd: '$131.00', dutyNgn: '₦14,700', dutyUsd: '$9.17', totalNgn: '₦224,700', totalUsd: '$140.17', origin: 'Guangdong Shipping Depot', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: '🚰' },
    { id: 2, name: 'Premium Aluminum Roofing Sheets (0.55mm)', category: 'Aluminum', ngn: '₦85,000', usd: '$53.00', dutyNgn: '₦5,950', dutyUsd: '$3.71', totalNgn: '₦90,950', totalUsd: '$56.71', origin: 'Abuja Central Warehouse', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: '🏠' },
    { id: 3, name: 'Luxury Smart Space Capsule House (V8-Series)', category: 'Prefab Structural', ngn: '₦44,800,000', usd: '$28,000.00', dutyNgn: '₦3,136,000', dutyUsd: '$1,960.00', totalNgn: '₦47,936,000', totalUsd: '$29,960.00', origin: 'Foshan Prefab Industry Zone', type: 'CHINA IMPORTED', color: '#2563eb', bg: '#eff6ff', icon: '🚀' },
    { id: 4, name: 'Premium Capsule Interior Fit-Out & Concept Design', category: 'Architectural Design', ngn: '₦2,400,000', usd: '$1,500.00', dutyNgn: '₦0', dutyUsd: '$0', totalNgn: '₦2,400,000', totalUsd: '$1,500.00', origin: 'Digital Delivery Hub', type: 'DESIGN PACKAGE', color: '#7c3aed', bg: '#f5f3ff', icon: '🛋️' },
    { id: 5, name: 'Heavy Industrial Borehole Drilling Rig Bit (9 7/8")', category: 'Drilling', ngn: '₦720,000', usd: '$450.00', dutyNgn: '₦50,400', dutyUsd: '$31.50', totalNgn: '₦770,400', totalUsd: '$481.50', origin: 'Tianjin Manufacturing Zone', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: '⚙️' },
    { id: 6, name: 'High-Grade Structural Steel H-Beams (Bulk)', category: 'Structural Materials', ngn: '₦340,000', usd: '$212.00', dutyNgn: '₦23,800', dutyUsd: '$14.84', totalNgn: '₦363,800', totalUsd: '$226.84', origin: 'Lagos Port Depot', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: '🏗️' }
  ]);

  const [formData, setFormData] = useState({ name: '', category: 'Prefab Structural', baseNgn: '', origin: '', type: 'CHINA IMPORTED' });

  // Handle User Registration / Login
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authView === 'register') {
      const newUser = {
        name: authForm.fullName || authForm.email.split('@')[0],
        email: authForm.email,
        accountType: authForm.accountType,
        companyName: authForm.companyName,
        tinNumber: authForm.tinNumber
      };
      setCurrentUser(newUser);
      setProcurementMode(authForm.accountType);
      if (authForm.accountType === 'corporate') {
        setCorpDetails({ companyName: authForm.companyName, tinNumber: authForm.tinNumber, poNumber: '' });
      }
      alert(`Account created successfully! Welcome, ${newUser.name}.`);
    } else {
      const mockUser = {
        name: authForm.email ? authForm.email.split('@')[0] : 'Builder',
        email: authForm.email,
        accountType: 'individual'
      };
      setCurrentUser(mockUser);
      alert(`Welcome back, ${mockUser.name}!`);
    }
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCorpDetails({ companyName: '', tinNumber: '', poNumber: '' });
    setProcurementMode('individual');
    alert('Logged out securely.');
  };

  const filteredProducts = products.filter(product => {
    const productName = product.name ? product.name.toLowerCase() : '';
    const productOrigin = product.origin ? product.origin.toLowerCase() : '';
    const query = searchTerm.toLowerCase();
    
    const matchesSearch = productName.includes(query) || productOrigin.includes(query);
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOnboardAsset = (e) => {
    e.preventDefault();
    const baseNgnNum = parseFloat(formData.baseNgn) || 0;
    const isDigital = formData.category === 'Architectural Design';
    const calculatedDutyNgn = isDigital ? 0 : Math.round(baseNgnNum * 0.07);
    const totalNgnNum = baseNgnNum + calculatedDutyNgn;
    const baseUsdNum = Math.round((baseNgnNum / 1600) * 100) / 100;
    const calculatedDutyUsd = isDigital ? 0 : Math.round((calculatedDutyNgn / 1600) * 100) / 100;
    const totalUsdNum = baseUsdNum + calculatedDutyUsd;

    let themeColor = '#2563eb'; let themeBg = '#eff6ff'; let defaultIcon = '📦';
    if (formData.type === 'LOCAL DISTRIBUTOR') { themeColor = '#16a34a'; themeBg = '#f0fdf4'; }
    else if (formData.type === 'DESIGN PACKAGE') { themeColor = '#7c3aed'; themeBg = '#f5f3ff'; }

    if (formData.category === 'Prefab Structural') defaultIcon = '🏠';
    if (formData.category === 'Architectural Design') defaultIcon = '📐';
    if (formData.category === 'Drilling') defaultIcon = '⚙️';
    if (formData.category === 'Plumbing') defaultIcon = '🚰';

    const newAsset = {
      id: products.length + 1, name: formData.name, category: formData.category,
      ngn: `₦${baseNgnNum.toLocaleString()}`, usd: `$${baseUsdNum.toLocaleString()}`,
      dutyNgn: `₦${calculatedDutyNgn.toLocaleString()}`, dutyUsd: `$${calculatedDutyUsd.toLocaleString()}`,
      totalNgn: `₦${totalNgnNum.toLocaleString()}`, totalUsd: `$${totalUsdNum.toLocaleString()}`,
      origin: formData.origin, type: formData.type, color: themeColor, bg: themeBg, icon: defaultIcon
    };

    setProducts([newAsset, ...products]);
    setFormData({ name: '', category: 'Prefab Structural', baseNgn: '', origin: '', type: 'CHINA IMPORTED' });
    setActiveTab('market');
    alert('Asset successfully cataloged into the Global Procurement Matrix!');
  };

  const handlePrintMock = () => {
    if (!modalItem) return;
    alert(`--- OFFICIAL PROFORMA INVOICE GENERATED ---\nCustomer: ${currentUser ? currentUser.name : 'Guest'}\nCustomer Type: ${procurementMode.toUpperCase()}\n${procurementMode === 'corporate' ? `Company: ${corpDetails.companyName}\nTIN: ${corpDetails.tinNumber}\nPO Ref: ${corpDetails.poNumber || 'N/A'}\n` : ''}Item: ${modalItem.name}\nTotal Due: ${viewMode === 'NGN' ? modalItem.totalNgn : modalItem.totalUsd}\n\nProforma generated successfully!`);
  };

  const isDesign = modalItem?.category === 'Architectural Design';
  const label1 = isDesign ? '1. Draft' : '1. Factory';
  const label2 = isDesign ? '2. Render' : '2. Transit';
  const label3 = isDesign ? '3. Review' : '3. Clearing';
  const label4 = isDesign ? '4. Sent' : '4. Arrived';

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

          {/* GRID DISPLAY */}
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
                    <button onClick={() => { 
                      setModalItem(product); 
                      setInvoiceConfirmed(false); 
                      setTrackingStep(1); 
                      setProcurementMode(currentUser ? currentUser.accountType : 'individual');
                      setShowModal(true); 
                    }} style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '9px 14px', borderRadius: '6px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>Request Invoice</button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </>
      ) : (
        /* FACTORY PORTAL */
        <main style={{ maxWidth: '540px', margin: '40px auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '4px' }}>Global Asset Onboarding</h2>
          <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '20px' }}>Deploy blueprints or equipment directly to the front-facing matrix.</p>
          <form onSubmit={handleOnboardAsset} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input type="text" placeholder="Asset/Product Title" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required style={{ width: '100%', padding: '11px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px
