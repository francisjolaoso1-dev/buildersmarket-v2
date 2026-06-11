'use client';
import { useState, useEffect } from 'react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', ngn: '₦210,000', usd: '$131.00', dutyNgn: '₦14,700', dutyUsd: '$9.17', totalNgn: '₦224,700', totalUsd: '$140.17', origin: 'Guangdong Shipping Depot', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: ' 🚰 ' },
  { id: 2, name: 'Premium Aluminum Roofing Sheets (0.55mm)', category: 'Aluminum', ngn: '₦85,000', usd: '$53.00', dutyNgn: '₦5,950', dutyUsd: '$3.71', totalNgn: '₦90,950', totalUsd: '$56.71', origin: 'Abuja Central Warehouse', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: ' 🏠 ' },
  { id: 3, name: 'Luxury Smart Space Capsule House (V8-Series)', category: 'Prefab Structural', ngn: '₦44,800,000', usd: '$28,000.00', dutyNgn: '₦3,136,000', dutyUsd: '$1,960.00', totalNgn: '₦47,936,000', totalUsd: '$29,960.00', origin: 'Foshan Prefab Industry Zone', type: 'CHINA IMPORTED', color: '#2563eb', bg: '#eff6ff', icon: ' 🚀 ' }
];

export default function Home() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [activeTab, setActiveTab] = useState('market');

  useEffect(() => {
    const saved = localStorage.getItem('buildersMarketData');
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('buildersMarketData', JSON.stringify(products));
  }, [products]);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '40px' }}>
      <h1>BuildersMarket</h1>
      <button onClick={() => setActiveTab(activeTab === 'market' ? 'supplier' : 'market')}>
        Switch Tab
      </button>
      <div style={{ marginTop: '20px' }}>
        {products.map(p => (
          <div key={p.id} style={{ padding: '10px', border: '1px solid #ccc', margin: '5px' }}>
            {p.name}
          </div>
        ))}
      </div>
    </div>
  );
}
