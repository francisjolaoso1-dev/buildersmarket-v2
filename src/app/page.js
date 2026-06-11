'use client';
import { useState, useEffect } from 'react';

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
  // ==========================================
  // SEGMENT 2: APP MEMORY (STATES WITH PERSISTENCE)
  // ==========================================
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  
  // Load saved data on initial render
  useEffect(() => {
    const saved = localStorage.getItem('buildersMarketData');
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  // Save to localStorage whenever products update
  useEffect(() => {
    localStorage.setItem('buildersMarketData', JSON.stringify(products));
  }, [products]);

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
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Prefab Structural');
  const [formBaseNgn, setFormBaseNgn] = useState('');
  const [formOrigin, setFormOrigin] = useState('');
  const [formType, setFormType] = useState('CHINA IMPORTED');

  // ==========================================
  // SEGMENT 3: ACTION ENGINE (Logic)
  // ==========================================
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authView === 'register') {
      setCurrentUser({ name: authName || authEmail.split('@')[0], email: authEmail, accountType: authTier, companyName: authCorpName, tinNumber: authCorpTin });
      setProcurementMode(authTier);
      if (authTier === 'corporate') setCorpDetails({ companyName: authCorpName, tinNumber: authCorpTin, poNumber: '' });
    } else {
      setCurrentUser({ name: authEmail.split('@')[0], email: authEmail, accountType: 'individual' });
    }
    setShowAuthModal(false);
  };

  const handleLogout = () => { setCurrentUser(null); setProcurementMode('individual'); };
  const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));

  const filteredProducts = products.filter(product => {
    const q = searchTerm.toLowerCase();
    return (product.name.toLowerCase().includes(q) || product.origin.toLowerCase().includes(q)) && (selectedCategory === 'All' || product.category === selectedCategory);
  });

  const sortedAndFilteredProducts = [...filteredProducts].sort((a, b) => {
    const vA = parseFloat(a.ngn.replace(/[₦,]/g, ''));
    const vB = parseFloat(b.ngn.replace(/[₦,]/g, ''));
    if (sortOrder === 'low') return vA - vB;
    if (sortOrder === 'high') return vB - vA;
    return 0;
  });

  const handleOnboardAsset = (e) => {
    e.preventDefault();
    const baseNgn = parseFloat(formBaseNgn) || 0;
    const isDesign = formCategory === 'Architectural Design';
    const dutyNgn = isDesign ? 0 : Math.round(baseNgn * 0.07);
    const totalNgn = baseNgn + dutyNgn;
    const baseUsd = Math.round((baseNgn / 1600) * 100) / 100;
    const dutyUsd = isDesign ? 0 : Math.round((dutyNgn / 1600) * 100) / 100;
    const totalUsd = baseUsd + dutyUsd;
    
    let icon = ' 📦 ';
    if (formCategory === 'Prefab Structural') icon = ' 🏠 ';
    if (formCategory === 'Architectural Design') icon = ' 📐 ';
    if (formCategory === 'Drilling') icon = ' ⚙ ️';
    if (formCategory === 'Plumbing') icon = ' 🚰 ';

    const newAsset = {
      id: Date.now(), name: formName, category: formCategory,
      ngn: `₦${baseNgn.toLocaleString()}`, usd: `$${baseUsd.toLocaleString()}`,
      dutyNgn: `₦${dutyNgn.toLocaleString()}`, dutyUsd: `$${dutyUsd.toLocaleString()}`,
      totalNgn: `₦${totalNgn.toLocaleString()}`, totalUsd: `$${totalUsd.toLocaleString()}`,
      origin: formOrigin, type: formType, color: '#2563eb', bg: '#eff6ff', icon: icon
    };
    setProducts([newAsset, ...products]);
    setFormName(''); setFormBaseNgn(''); setFormOrigin('');
    setActiveTab('market');
  };

  const isDesign = modalItem?.category === 'Architectural Design';
  const labels = isDesign ? ['1. Draft', '2. Render', '3. Review', '4. Sent'] : ['1. Factory', '2. Transit', '3. Clearing', '4. Arrived'];

  // ==========================================
  // SEGMENT 4: UI LAYOUT
  // ==========================================
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', color: '#111827' }}>
      {/* (Your Header, Marketplace Grid, Form, and Modals continue here as original) */}
      {/* Note: I've truncated the UI here to keep this message concise, 
          but you should keep your existing full JSX from the file here. */}
    </div>
  );
}
