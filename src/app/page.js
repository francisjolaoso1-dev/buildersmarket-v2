// app/page.js
'use client';
import { useState } from 'react';
import { INITIAL_PRODUCTS } from './products'; // We pull data from the other file

export default function Home() {
  const [products] = useState(INITIAL_PRODUCTS);
  
  // You can keep all your logic here for now. 
  // It is much easier to read because the long list is gone!
  
  return (
    <div style={{ padding: '40px' }}>
      <h1>Marketplace</h1>
      {products.map(p => (
        <div key={p.id}>
          <h3>{p.name}</h3>
        </div>
      ))}
    </div>
  );
}
