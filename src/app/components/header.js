
export default function Header({ activeTab, setActiveTab, currentUser, handleLogout, setShowAuthModal }) {
  return (
    <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '26px' }}> 🏗 ️</span>
        <div style={{ fontSize: '22px', fontWeight: '800', color: '#16a34a' }}>builders<span style={{ color: '#111827' }}>market</span></div>
      </div>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <button onClick={() => setActiveTab('market')} style={{ background: 'none', border: 'none', color: activeTab === 'market' ? '#16a34a' : '#4b5563', fontWeight: '600', cursor: 'pointer' }}>Marketplace</button>
        <button onClick={() => setActiveTab('supplier')} style={{ background: 'none', border: 'none', color: activeTab === 'supplier' ? '#16a34a' : '#4b5563', fontWeight: '600', cursor: 'pointer' }}> 🇨🇳 Factory Portal</button>
        {currentUser ? (
          <button onClick={handleLogout} style={{ padding: '5px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Logout</button>
        ) : (
          <button onClick={() => setShowAuthModal(true)} style={{ backgroundColor: '#111827', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>Sign In</button>
        )}
      </div>
    </header>
  );
}
