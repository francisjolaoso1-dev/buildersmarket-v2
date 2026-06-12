export default function Hero({ searchTerm, setSearchTerm }) {
  return (
    <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h1 style={{ fontSize: '34px', fontWeight: '800', marginBottom: '10px' }}>Global Procurement Matrix</h1>
      <p style={{ fontSize: '15px', color: '#9ca3af', maxWidth: '650px', margin: '0 auto 25px' }}>Direct pipeline for heavy machinery and modular housing components.</p>
      <div style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '12px', maxWidth: '820px', margin: '0 auto', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <input 
          type="text" 
          placeholder="Search products or origins..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          style={{ width: '100%', padding: '11px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '14px' }} 
        />
      </div>
    </section>
  );
}
