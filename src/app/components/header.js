export default function Header({ activeTab, setActiveTab, currentUser, handleLogout, setShowAuthModal, viewMode, setViewMode }) {
  return (
    <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '26px' }}> 🏗 ️</span>
        <div style={{ fontSize: '22px', fontWeight: '800', color: '#16a34a' }}>builders<span style={{ color: '#111827' }}>market</span></div>
      </div>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <button onClick={() => setActiveTab('market')} style={{ background: 'none', border: 'none', color: activeTab === 'market' ? '#16a34a' : '#4b5563', fontWeight: '600', cursor: 'pointer' }}>Marketplace</button>
        <button onClick={() => setActiveTab('supplier')} style={{ background: 'none', border: 'none', color: activeTab === 'supplier' ? '#16a34a' : '#4b5563', fontWeight: '600', cursor: 'pointer' }}> 🇨🇳 Factory Portal</button>
        
        <div style={{ border: '1px solid #d1d5db', borderRadius: '20px', padding: '3px', display: 'flex', backgroundColor: '#f3f4f6', marginRight: '5px' }}>
          <button onClick={() => setViewMode('NGN')} style={{ border: 'none', padding: '5px 12px', borderRadius: '16px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', backgroundColor: viewMode === 'NGN' ? '#111827' : 'transparent', color: viewMode === 'NGN' ? '#ffffff' : '#4b5563' }}>₦ NGN</button>
          <button onClick={() => setViewMode('USD')} style={{ border: 'none', padding: '5px 12px', borderRadius: '16px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', backgroundColor: viewMode === 'USD' ? '#111827' : 'transparent', color: viewMode === 'USD' ? '#ffffff' : '#4b5563' }}>$ USD</button>
        </div>

        {currentUser ? (
          <button onClick={handleLogout} style={{ background: 'none', border: '1px solid #d1d5db', padding: '5px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}>Logout</button>
        ) : (
          <button onClick={() => setShowAuthModal(true)} style={{ backgroundColor: '#111827', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>Sign In</button>
        )}
      </div>
    </header>
  );
}
