'use client';
import { useState, useEffect } from 'react';

// IMPORTING OUR COMPONENT BLOCKS
import Header from './components/Header';
import FilterHero from './components/FilterHero';
import ProductCard from './components/ProductCard';
import FactoryPortal from './components/FactoryPortal';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', ngn: '₦210,000', usd: '$131.00', dutyNgn: '₦14,700', dutyUsd: '$9.17', totalNgn: '₦224,700', totalUsd: '$140.17', origin: 'Guangdong Shipping Depot', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: '🚰' },
  { id: 2, name: 'Premium Aluminum Roofing Sheets (0.55mm)', category: 'Aluminum', ngn: '₦85,000', usd: '$53.00', dutyNgn: '₦5,950', dutyUsd: '$3.71', totalNgn: '₦90,950', totalUsd: '$56.71', origin: 'Abuja Central Warehouse', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: '🏠' },
  { id: 3, name: 'Luxury Smart Space Capsule House (V8-Series)', category: 'Prefab Structural', ngn: '₦44,800,000', usd: '$28,000.00', dutyNgn: '₦3,136,000', dutyUsd: '$1,960.00', totalNgn: '₦47,936,000', totalUsd: '$29,960.00', origin: 'Foshan Prefab Industry Zone', type: 'CHINA IMPORTED', color: '#2563eb', bg: '#eff6ff', icon: '🚀' },
  { id: 4, name: 'Premium Capsule Interior Fit-Out & Concept Design', category: 'Architectural Design', ngn: '₦2,400,000', usd: '$1,500.00', dutyNgn: '₦0', dutyUsd: '$0', totalNgn: '₦2,400,000', totalUsd: '$1,500.00', origin: 'Digital Delivery Hub', type: 'DESIGN PACKAGE', color: '#7c3aed', bg: '#f5f3ff', icon: '🛋️' },
  { id: 5, name: 'Heavy Industrial Borehole Drilling Rig Bit (9 7/8")', category: 'Drilling', ngn: '₦720,000', usd: '$450.00', dutyNgn: '₦50,400', dutyUsd: '$31.50', totalNgn: '₦770,400', totalUsd: '$481.50', origin: 'Tianjin Manufacturing Zone', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: '⚙️' },
  { id: 6, name: 'High-Grade Structural Steel H-Beams (Bulk)', category: 'Structural Materials', ngn: '₦340,000', usd: '$212.00', dutyNgn: '₦23,800', dutyUsd: '$14.84', totalNgn: '₦363,800', totalUsd: '$226.84', origin: 'Lagos Port Depot', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: '🏗️' }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('market');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('NGN'); 
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');
  
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

  // Start with initial products, then sync via useEffect to avoid Next.js hydration bugs
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Prefab Structural');
  const [formBaseNgn, setFormBaseNgn] = useState('');
  const [formOrigin, setFormOrigin] = useState('');
  const [formType, setFormType] = useState('CHINA IMPORTED');

  // EFFECT 1: Load products from browser memory on startup safely
  useEffect(() => {
    const savedProducts = localStorage.getItem('builders_market_products');
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        console.error("Error loading local inventory assets", e);
      }
    }
  }, []);

  // EFFECT 2: Automatically save to browser memory whenever the products array updates
  useEffect(() => {
    localStorage.setItem('builders_market_products', JSON.stringify(products));
  }, [products]);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authView === 'register') {
      setCurrentUser({ name: authName || 'User', email: authEmail, accountType: authTier });
      setProcurementMode(authTier);
      if (authTier === 'corporate') setCorpDetails({ companyName: authCorpName, tinNumber: authCorpTin, poNumber: '' });
    } else {
      setCurrentUser({ name: authEmail ? authEmail.split('@')[0] : 'Builder', email: authEmail, accountType: 'individual' });
    }
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCorpDetails({ companyName: '', tinNumber: '', poNumber: '' });
    setProcurementMode('individual');
  };

  const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));

  const filteredProducts = products.filter(product => {
    const pName = product.name?.toLowerCase() || '';
    const pOrigin = product.origin?.toLowerCase() || '';
    const q = searchTerm.toLowerCase();
    return (pName.includes(q) || pOrigin.includes(q)) && (selectedCategory === 'All' || product.category === selectedCategory);
  });

  const sortedAndFilteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'low') return parseFloat(a.ngn.replace(/[₦,]/g, '')) - parseFloat(b.ngn.replace(/[₦,]/g, ''));
    if (sortOrder === 'high') return parseFloat(b.ngn.replace(/[₦,]/g, '')) - parseFloat(b.ngn.replace(/[₦,]/g, ''));
    return 0;
  });

  const handleOnboardAsset = (e) => {
    e.preventDefault();
    const baseNgnNum = parseFloat(formBaseNgn) || 0;
    const isDigital = formCategory === 'Architectural Design';
    const calculatedDutyNgn = isDigital ? 0 : Math.round(baseNgnNum * 0.07);
    const baseUsdNum = Math.round((baseNgnNum / 1600) * 100) / 100;
    const calculatedDutyUsd = isDigital ? 0 : Math.round((calculatedDutyNgn / 1600) * 100) / 100;

    let themeColor = '#2563eb'; let themeBg = '#eff6ff'; let defaultIcon = '📦';
    if (formType === 'LOCAL DISTRIBUTOR') { themeColor = '#16a34a'; themeBg = '#f0fdf4'; }
    else if (formType === 'DESIGN PACKAGE') { themeColor = '#7c3aed'; themeBg = '#f5f3ff'; }
    if (formCategory === 'Prefab Structural') defaultIcon = '🏠';
    if (formCategory === 'Architectural Design') defaultIcon = '📐';
    if (formCategory === 'Drilling') defaultIcon = '⚙️';
    if (formCategory === 'Plumbing') defaultIcon = '🚰';
    if (formCategory === 'Aluminum') defaultIcon = '🏠';

    const newAsset = {
      id: Date.now(), name: formName, category: formCategory,
      ngn: `₦${baseNgnNum.toLocaleString()}`, usd: `$${baseUsdNum.toLocaleString()}`,
      dutyNgn: `₦${calculatedDutyNgn.toLocaleString()}`, dutyUsd: `$${calculatedDutyUsd.toLocaleString()}`,
      totalNgn: `₦${(baseNgnNum + calculatedDutyNgn).toLocaleString()}`, totalUsd: `$${(baseUsdNum + calculatedDutyUsd).toLocaleString()}`,
      origin: formOrigin, type: formType, color: themeColor, bg: themeBg, icon: defaultIcon
    };

    setProducts([newAsset, ...products]);
    setFormName(''); setFormBaseNgn(''); setFormOrigin('');
    setActiveTab('market');
  };

  const isDesign = modalItem?.category === 'Architectural Design';
  const label1 = isDesign ? '1. Draft' : '1. Factory'; const label2 = isDesign ? '2. Render' : '2. Transit';
  const label3 = isDesign ? '3. Review' : '3. Clearing'; const label4 = isDesign ? '4. Sent' : '4. Arrived';

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', color: '#111827' }}>
      
      <Header activeTab={activeTab} setActiveTab={setActiveTab} viewMode={viewMode} setViewMode={setViewMode} currentUser={currentUser} handleLogout={handleLogout} setShowAuthModal={setShowAuthModal} setAuthView={setAuthView} />

      {activeTab === 'market' ? (
        <>
          <FilterHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortOrder={sortOrder} setSortOrder={setSortOrder} />
          
          <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
              {sortedAndFilteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} currentUser={currentUser} setModalItem={setModalItem} setInvoiceConfirmed={setInvoiceConfirmed} setTrackingStep={setTrackingStep} setProcurementMode={setProcurementMode} setShowModal={setShowModal} deleteProduct={deleteProduct} />
              ))}
            </div>
          </main>
        </>
      ) : (
        <FactoryPortal handleOnboardAsset={handleOnboardAsset} formName={formName} setFormName={setFormName} formCategory={formCategory} setFormCategory={setFormCategory} formType={formType} setFormType={setFormType} formBaseNgn={formBaseNgn} setFormBaseNgn={setFormBaseNgn} formOrigin={formOrigin} setFormOrigin={setFormOrigin} />
      )}

      {/* MODALS RENDER OVERLAYS */}
      {showAuthModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,24,39,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
          <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', maxWidth: '400px', width: '100%', margin: '20px', position: 'relative' }}>
            <button onClick={() => setShowAuthModal(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#9ca3af' }}>✕</button>
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '5px', textAlign: 'center' }}>{authView === 'login' ? 'Access Portal Gateway' : 'Create Procurement Profile'}</h3>
            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {authView === 'register' && (
                <input type="text" required placeholder="Representative Name" value={authName} onChange={(e) => setAuthName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box' }} />
              )}
              <input type="email" required placeholder="name@domain.com" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box' }} />
              <input type="password" required placeholder="••••••••" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '13px', boxSizing: 'border-box' }} />
              {authView === 'register' && (
                <select value={authTier} onChange={(e) => setAuthTier(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', backgroundColor: '#fff' }}>
                  <option value="individual">👤 Individual Account</option>
                  <option value="corporate">🏢 Corporate Account</option>
                </select>
              )}
              <button type="submit" style={{ width: '100%', backgroundColor: '#16a34a', color: '#fff', padding: '12px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>{authView === 'login' ? 'Authenticate Entry' : 'Register Profile Matrix'}</button>
            </form>
          </div>
        </div>
      )}

      {showModal && modalItem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,24,39,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '12px', maxWidth: '460px', width: '100%', margin: '20px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#9ca3af' }}>✕</button>
            {!invoiceConfirmed ? (
              <>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '4px' }}>Proforma Pricing Sheet</h3>
                <div style={{ display: 'flex', backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '4px', marginBottom: '15px' }}>
                  <button onClick={() => setProcurementMode('individual')} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', backgroundColor: procurementMode === 'individual' ? '#ffffff' : 'transparent' }}>👤 Individual</button>
                  <button onClick={() => setProcurementMode('corporate')} style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', backgroundColor: procurementMode === 'corporate' ? '#ffffff' : 'transparent' }}>🏢 Corporate</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>FOB Base:</span><strong>{viewMode === 'NGN' ? modalItem.ngn : modalItem.usd}</strong></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', borderTop: '1px dashed #d1d5db', paddingTop: '8px', color: '#16a34a' }}><span>Total Due:</span><span>{viewMode === 'NGN' ? modalItem.totalNgn : modalItem.totalUsd}</span></div>
                </div>
                <button onClick={() => setInvoiceConfirmed(true)} style={{ width: '100%', backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: '700', marginTop: '20px', cursor: 'pointer' }}>Confirm & Track Order</button>
              </>
            ) : (
              <>
                <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Procurement Tracking Node</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', margin: '20px 0', color: '#6b7280' }}>
                  <span style={{ color: trackingStep === 1 ? '#16a34a' : '#6b7280' }}>{label1}</span>
                  <span style={{ color: trackingStep === 2 ? '#16a34a' : '#6b7280' }}>{label2}</span>
                  <span style={{ color: trackingStep === 3 ? '#16a34a' : '#6b7280' }}>{label3}</span>
                  <span style={{ color: trackingStep === 4 ? '#16a34a' : '#6b7280' }}>{label4}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => setTrackingStep(prev => Math.min(prev + 1, 4))} disabled={trackingStep === 4} style={{ flex: 1, backgroundColor: '#111827', color: '#fff', padding: '10px', borderRadius: '6px', cursor: 'pointer' }}>Advance Stage</button>
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
