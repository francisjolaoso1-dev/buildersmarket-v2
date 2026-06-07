'use client';
import { useState } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('NGN'); // NGN or USD
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('market'); // market or supplier

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', color: '#111827' }}>
      
      {/* TOP NAVIGATION BANNER */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '26px' }}>🏗️</span>
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#16a34a' }}>
            builders<span style={{ color: '#111827' }}>market</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button onClick={() => setActiveTab('market')} style={{ background: 'none', border: 'none', color: activeTab === 'market' ? '#16a34a' : '#4b5563', fontWeight: '600', cursor: 'pointer' }}>Marketplace</button>
          <button onClick={() => setActiveTab('supplier')} style={{ background: 'none', border: 'none', color: activeTab === 'supplier' ? '#16a34a' : '#4b5563', fontWeight: '600', cursor: 'pointer' }}>🇨🇳 Factory Portal</button>
          
          <button onClick={() => setViewMode(viewMode === 'NGN' ? 'USD' : 'NGN')} style={{ backgroundColor: '#111827', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '20px', fontWeight: '700', fontSize: '12px', cursor: 'pointer' }}>
            Currency: {viewMode}
          </button>
        </div>
      </header>

      {/* CORE DISPLAY LOGIC BLOCK */}
      {activeTab === 'market' ? (
        <>
          {/* HERO HEADER DISPLAY */}
          <section style={{ backgroundColor: '#111827', color: '#ffffff', padding: '45px 20px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '10px' }}>Global Construction Supply Portal</h1>
            <p style={{ fontSize: '15px', color: '#9ca3af', maxWidth: '600px', margin: '0 auto 20px' }}>
              Direct factory clearing logistics matrix between Mainland China and Nigerian development hubs.
            </p>
            <div style={{ backgroundColor: '#ffffff', padding: '8px', borderRadius: '10px', maxWidth: '550px', margin: '0 auto' }}>
              <input 
                type="text" 
                placeholder="Search inventory matrices..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px', color: '#111827', boxSizing: 'border-box' }}
              />
            </div>
          </section>

          {/* STANDALONE GRID MATRIX */}
          <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '30px 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              
              {/* CARD ITEM 1 */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#16a34a', backgroundColor: '#f0fdf4', padding: '4px 8px', borderRadius: '4px' }}>CHINA IMPORTED</span>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: '12px' }}>Industrial Borehole Submersible Pump (2HP)</h3>
                  <p style={{ fontSize: '13px', color: '#6b7280' }}>📍 Hub: Guangdong Shipping Depot</p>
                </div>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '800', fontSize: '18px' }}>{viewMode === 'NGN' ? '₦210,000' : '$131.00'}</span>
                  <button onClick={() => setShowModal(true)} style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>Request Invoice</button>
                </div>
              </div>

              {/* CARD ITEM 2 */}
              <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#4b5563', backgroundColor: '#f3f4f6', padding: '4px 8px', borderRadius: '4px' }}>LOCAL DISTRIBUTOR</span>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: '12px' }}>Premium Aluminum Roofing Sheets (0.55mm)</h3>
                  <p style={{ fontSize: '13px', color: '#6b7280' }}>📍 Hub: Abuja Central Warehouse</p>
                </div>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '800', fontSize: '18px' }}>{viewMode === 'NGN' ? '₦85,000' : '$53.00'}</span>
                  <button onClick={() => setShowModal(true)} style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>Request Invoice</button>
                </div>
              </div>

            </div>
          </main>
        </>
      ) : (
        /* SUPPLIER PORTAL APPLICATION SECTION */
        <main style={{ maxWidth: '500px', margin: '40px auto', padding: '25px', backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '6px' }}>Global Plant Onboarding</h2>
          <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '20px' }}>Register factory output profiles for direct cargo procurement tracking slots.</p>
          
          <form onSubmit={(e) => { e.preventDefault(); alert('Application catalog file indexed successfully.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input type="text" placeholder="Corporate Manufacturing Identity" required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
            <select style={{ padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', backgroundColor: '#fff' }}>
              <option>Mainland China Production Plant</option>
              <option>Nigerian Local Distribution Depot</option>
            </select>
            <button type="submit" style={{ backgroundColor: '#111827', color: '#fff', padding: '12px', borderRadius: '6px', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Submit Infrastructure Dossier</button>
          </form>
        </main>
      )}

      {/* OVERLAY POP-UP BOX SYSTEM */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(11,24,39,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '12px', maxWidth: '400px', width: '100%', margin: '20px', position: 'relative' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#9ca3af' }}>✕</button>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '5px' }}>Proforma Pricing Sheet</h3>
            <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '15px' }}>Verified trade clearance matrix and port tariffs values.</p>
            
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>FOB Port Base Liability:</span><strong>{viewMode === 'NGN' ? '₦210,000' : '$131.00'}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Customs Duty Premium (+7%):</span><strong>{viewMode === 'NGN' ? '₦14,700' : '$9.17'}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #d1d5db', paddingTop: '8px', marginTop: '4px', fontSize: '14px', fontWeight: '800' }}>
                <span>Total Project Settlement:</span>
                <span style={{ color: '#16a34a' }}>{viewMode === 'NGN' ? '₦224,700' : '$140.17'}</span>
              </div>
            </div>
            
            <button onClick={() => { alert('Proforma matrix locked under registration ledger node.'); setShowModal(false); }} style={{ width: '100%', backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: '700', marginTop: '20px', cursor: 'pointer' }}>
              Confirm Official Order Bill
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
