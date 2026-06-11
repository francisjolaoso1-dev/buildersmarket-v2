'use client';
import { useState } from 'react';

// ==========================================
// SEGMENT 1: STATIC DATA
// ==========================================
const INITIAL_PRODUCTS = [
  { id: 1, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', ngn: '₦210,000', usd: '$131.00', dutyNgn: '₦14,700', dutyUsd: '$9.17', totalNgn: '₦224,700', totalUsd: '$140.17', origin: 'Guangdong Shipping Depot', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: ' 🚰 ' },
  { id: 2, name: 'Premium Aluminum Roofing Sheets (0.55mm)', category: 'Aluminum', ngn: '₦85,000', usd: '$53.00', dutyNgn: '₦5,950', dutyUsd: '$3.71', totalNgn: '₦90,950', totalUsd: '$56.71', origin: 'Abuja Central Warehouse', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: ' 🏠 ' },
  { id: 3, name: 'Luxury Smart Space Capsule House (V8-Series)', category: 'Prefab Structural', ngn: '₦44,800,000', usd: '$28,000.00', dutyNgn: '₦3,136,000', dutyUsd: '$1,960.00', totalNgn: '₦47,936,000', totalUsd: '$29,960.00', origin: 'Foshan Prefab Industry Zone', type: 'CHINA IMPORTED', color: '#2563eb', bg: '#eff6ff', icon: ' 🚀 ' },
  { id: 4, name: 'Premium Capsule Interior Fit-Out & Concept Design', category: 'Architectural Design', ngn: '₦2,400,000', usd: '$1,500.00', dutyNgn: '₦0', dutyUsd: '$0', totalNgn: '₦2,400,000', totalUsd: '$1,500.00', origin: 'Digital Delivery Hub', type: 'DESIGN PACKAGE', color: '#7c3aed', bg: '#f5f3ff', icon: ' 🛋 ️' },
  { id: 5, name: 'Heavy Industrial Borehole Drilling Rig Bit (9 7/8")', category: 'Drilling', ngn: '₦720,000', usd: '$450.00', dutyNgn: '₦50,400', dutyUsd: '$31.50', totalNgn: '₦770,400', totalUsd: '$481.50', origin: 'Tianjin Manufacturing Zone', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: ' ⚙ ️' },
  { id: 6, name: 'High-Grade Structural Steel H-Beams (Bulk)', category: 'Structural Materials', ngn: '₦340,000', usd: '$212.00', dutyNgn: '₦23,800', dutyUsd: '$14.84', totalNgn: '₦363,800', totalUsd: '$226.84', origin: 'Lagos Port Depot', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: ' 🏗 ️' }
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
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Prefab Structural');
  const [formBaseNgn, setFormBaseNgn] = useState('');
  const [formOrigin, setFormOrigin] = useState('');
  const [formType, setFormType] = useState('CHINA IMPORTED');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authView === 'register') {
      const newUser = { name: authName || authEmail.split('@')[0] || 'User', email: authEmail, accountType: authTier, companyName: authCorpName, tinNumber: authCorpTin };
      setCurrentUser(newUser);
      setProcurementMode(authTier);
      if (authTier === 'corporate') setCorpDetails({ companyName: authCorpName, tinNumber: authCorpTin, poNumber: '' });
    } else {
      const mockUser = { name: authEmail ? authEmail.split('@')[0] : 'Builder', email: authEmail, accountType: 'individual' };
      setCurrentUser(mockUser);
    }
    setShowAuthModal(false);
  };

  const handleLogout = () => { setCurrentUser(null); setCorpDetails({ companyName: '', tinNumber: '', poNumber: '' }); setProcurementMode('individual'); };
  const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));

  const filteredProducts = products.filter(product => {
    const pName = product.name ? product.name.toLowerCase() : '';
    const pOrigin = product.origin ? product.origin.toLowerCase() : '';
    const q = searchTerm.toLowerCase();
    return (pName.includes(q) || pOrigin.includes(q)) && (selectedCategory === 'All' || product.category === selectedCategory);
  });

  const sortedAndFilteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'low') return parseFloat(a.ngn.replace(/[₦,]/g, '')) - parseFloat(b.ngn.replace(/[₦,]/g, ''));
    if (sortOrder === 'high') return parseFloat(b.ngn.replace(/[₦,]/g, '')) - parseFloat(a.ngn.replace(/[₦,]/g, ''));
    return 0;
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
    let themeColor = '#2563eb'; let themeBg = '#eff6ff'; let defaultIcon = ' 📦 ';
    if (formType === 'LOCAL DISTRIBUTOR') { themeColor = '#16a34a'; themeBg = '#f0fdf4'; }
    else if (formType === 'DESIGN PACKAGE') { themeColor = '#7c3aed'; themeBg = '#f5f3ff'; }
    if (formCategory === 'Prefab Structural') defaultIcon = ' 🏠 ';
    if (formCategory === 'Architectural Design') defaultIcon = ' 📐 ';
    if (formCategory === 'Drilling') defaultIcon = ' ⚙ ️';
    if (formCategory === 'Plumbing') defaultIcon = ' 🚰 ';
    const newAsset = { id: Date.now(), name: formName, category: formCategory, ngn: `₦${baseNgnNum.toLocaleString()}`, usd: `$${baseUsdNum.toLocaleString()}`, dutyNgn: `₦${calculatedDutyNgn.toLocaleString()}`, dutyUsd: `$${calculatedDutyUsd.toLocaleString()}`, totalNgn: `₦${totalNgnNum.toLocaleString()}`, totalUsd: `$${totalUsdNum.toLocaleString()}`, origin: formOrigin, type: formType, color: themeColor, bg: themeBg, icon: defaultIcon };
    setProducts([newAsset, ...products]);
    setFormName(''); setFormBaseNgn(''); setFormOrigin('');
    setActiveTab('market');
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', color: '#111827' }}>
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '26px' }}> 🏗 ️</span>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#16a34a' }}>builders<span style={{ color: '#111827' }}>market</span></div>
        </div>
        <button onClick={() => setActiveTab('market')} style={{ background: 'none', border: 'none', color: activeTab === 'market' ? '#16a34a' : '#4b5563', fontWeight: '600', cursor: 'pointer' }}>Marketplace</button>
      </header>

      {activeTab === 'market' ? (
        <>
          <section style={{ backgroundColor: '#111827', color: '#ffffff', padding: '50px 20px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '34px', fontWeight: '800', marginBottom: '10px' }}>Global Procurement Matrix</h1>
            <p style={{ fontSize: '15px', color: '#9ca3af', maxWidth: '650px', margin: '0 auto 25px' }}>Direct pipeline for heavy machinery, prefabricated houses, and premium interior/exterior designs.</p>
            <div style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '12px', maxWidth: '820px', margin: '0 auto', display: 'flex', gap: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 2, padding: '11px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px' }} />
            </div>
          </section>

          {/* ADDED PLATFORM EXPLANATION */}
          <section style={{ padding: '40px 20px', backgroundColor: '#ffffff', textAlign: 'center' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ fontSize: '28px', color: '#111827', marginBottom: '15px' }}>Why BuildersMarket?</h2>
              <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: '1.6' }}>
                BuildersMarket serves as your digital bridge to the global manufacturing hub. We bypass traditional, fragmented supply chains by connecting African developers, contractors, and individuals directly to high-grade industrial machinery, modular housing components, and premium design services. 
              </p>
            </div>
          </section>

          <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
              {sortedAndFilteredProducts.map((product) => (
                <div key={product.id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px' }}>
                  <h3>{product.icon} {product.name}</h3>
                  <button onClick={() => deleteProduct(product.id)} style={{ marginTop: '10px', cursor: 'pointer' }}>Delete</button>
                </div>
              ))}
            </div>
          </main>
        </>
      ) : (
        <div style={{ padding: '40px', textAlign: 'center' }}><h2>Factory Portal</h2></div>
      )}
    </div>
  );
}
