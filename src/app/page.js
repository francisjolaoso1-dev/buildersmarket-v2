'use client';
import { useState } from 'react';

// =================================================================
// STATIC DATA - RETAINED EXACTLY AS PER ORIGINAL
// =================================================================
const INITIAL_PRODUCTS = [
  { id: 1, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', ngn: '₦210,000', usd: '$131.00', dutyNgn: '₦14,700', dutyUsd: '$9.17', totalNgn: '₦224,700', totalUsd: '$140.17', origin: 'Guangdong Shipping Depot', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: ' 🚰 ' },
  { id: 2, name: 'Premium Aluminum Roofing Sheets (0.55mm)', category: 'Aluminum', ngn: '₦85,000', usd: '$53.00', dutyNgn: '₦5,950', dutyUsd: '$3.71', totalNgn: '₦90,950', totalUsd: '$56.71', origin: 'Abuja Central Warehouse', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: ' 🏠 ' },
  { id: 3, name: 'Luxury Smart Space Capsule House (V8-Series)', category: 'Prefab Structural', ngn: '₦44,800,000', usd: '$28,000.00', dutyNgn: '₦3,136,000', dutyUsd: '$1,960.00', totalNgn: '₦47,936,000', totalUsd: '$29,960.00', origin: 'Foshan Prefab Industry Zone', type: 'CHINA IMPORTED', color: '#2563eb', bg: '#eff6ff', icon: ' 🚀 ' },
  { id: 4, name: 'Premium Capsule Interior Fit-Out & Concept Design', category: 'Architectural Design', ngn: '₦2,400,000', usd: '$1,500.00', dutyNgn: '₦0', dutyUsd: '$0', totalNgn: '₦2,400,000', totalUsd: '$1,500.00', origin: 'Digital Delivery Hub', type: 'DESIGN PACKAGE', color: '#7c3aed', bg: '#f5f3ff', icon: ' 📐 ' },
  { id: 5, name: 'Heavy Industrial Borehole Drilling Rig Bit (9 7/8")', category: 'Drilling', ngn: '₦720,000', usd: '$450.00', dutyNgn: '₦50,400', dutyUsd: '$31.50', totalNgn: '₦770,400', totalUsd: '$481.50', origin: 'Tianjin Manufacturing Zone', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: ' ⚙ ️' },
  { id: 6, name: 'High-Grade Structural Steel H-Beams (Bulk)', category: 'Structural Materials', ngn: '₦340,000', usd: '$212.00', dutyNgn: '₦23,800', dutyUsd: '$14.84', totalNgn: '₦363,800', totalUsd: '$226.84', origin: 'Lagos Port Depot', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: ' 🏗 ️' }
];

export default function Home() {
  // =================================================================
  // APP STATE (All original state management preserved)
  // =================================================================
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

  // =================================================================
  // LOGIC FUNCTIONS (All original handlers intact)
  // =================================================================
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authView === 'register') {
      const newUser = { name: authName || authEmail.split('@')[0] || 'User', email: authEmail, accountType: authTier, companyName: authCorpName, tinNumber: authCorpTin };
      setCurrentUser(newUser);
      setProcurementMode(authTier);
      if (authTier === 'corporate') setCorpDetails({ companyName: authCorpName, tinNumber: authCorpTin, poNumber: '' });
    } else {
      setCurrentUser({ name: authEmail ? authEmail.split('@')[0] : 'Builder', email: authEmail, accountType: 'individual' });
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
    const newAsset = { id: Date.now(), name: formName, category: formCategory, ngn: `₦${baseNgnNum.toLocaleString()}`, usd: `$${baseUsdNum.toLocaleString()}`, dutyNgn: `₦${calculatedDutyNgn.toLocaleString()}`, dutyUsd: `$${calculatedDutyUsd.toLocaleString()}`, totalNgn: `₦${totalNgnNum.toLocaleString()}`, totalUsd: `$${totalUsdNum.toLocaleString()}`, origin: formOrigin, type: formType, color: '#2563eb', bg: '#eff6ff', icon: ' 📦 ' };
    setProducts([newAsset, ...products]);
    setFormName(''); setFormBaseNgn(''); setFormOrigin('');
    setActiveTab('market');
  };

  const isDesign = modalItem?.category === 'Architectural Design';
  const label1 = isDesign ? '1. Draft' : '1. Factory';
  const label2 = isDesign ? '2. Render' : '2. Transit';
  const label3 = isDesign ? '3. Review' : '3. Clearing';
  const label4 = isDesign ? '4. Sent' : '4. Arrived';

  // =================================================================
  // UI RENDER (Professional Industrial Palette Applied)
  // =================================================================
  const THEME = {
    navy: '#0f172a',
    graphite: '#334155',
    green: '#059669',
    white: '#ffffff',
    bg: '#f8fafc'
  };

  return (
    <div style={{ fontFamily: '"Inter", sans-serif', backgroundColor: THEME.bg, minHeight: '100vh', color: THEME.navy }}>
      {/* HEADER */}
      <header style={{ backgroundColor: THEME.navy, color: THEME.white, padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '20px', letterSpacing: '-0.5px' }}>BUILDERS<span style={{ color: THEME.green }}>MARKET</span></h1>
        <div style={{ display: 'flex', gap: '20px', fontSize: '13px', fontWeight: '600' }}>
          <button onClick={() => setActiveTab('market')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>MARKETPLACE</button>
          <button onClick={() => setActiveTab('supplier')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>FACTORY PORTAL</button>
          <button onClick={() => setViewMode(viewMode === 'NGN' ? 'USD' : 'NGN')} style={{ padding: '6px 12px', border: '1px solid #475569', borderRadius: '4px', background: 'transparent', color: '#fff', cursor: 'pointer' }}>{viewMode}</button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {sortedAndFilteredProducts.map((p) => (
            <div key={p.id} style={{ backgroundColor: THEME.white, padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '32px', marginBottom: '15px' }}>{p.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '5px' }}>{p.name}</h3>
              <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>{p.origin}</p>
              <div style={{ fontSize: '20px', fontWeight: '800', color: THEME.green, marginBottom: '20px' }}>{viewMode === 'NGN' ? p.ngn : p.usd}</div>
              <button onClick={() => { setModalItem(p); setShowModal(true); }} style={{ width: '100%', padding: '12px', backgroundColor: THEME.navy, color: THEME.white, border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>View Technical Specs</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
