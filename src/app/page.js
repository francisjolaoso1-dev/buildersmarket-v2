'use client';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleTestClick = (e) => {
    e.preventDefault();
    alert(`Welcome to BuildersMarket! \nEmail: ${email} \nMode: ${isSignUp ? 'Registering' : 'Signing In'}`);
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', color: '#111827' }}>
      {/* HEADER */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#16a34a' }}>buildersmarket</div>
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="#" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: '500' }}>Marketplace</a>
          <a href="#" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: '500' }}>Suppliers</a>
          <a href="#" style={{ textDecoration: 'none', color: '#4b5563', fontWeight: '500' }}>Procurement</a>
        </nav>
      </header>

      {/* MAIN INTERFACE */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        <div style={{ backgroundColor: '#ffffff', color: '#111827', padding: '40px', borderRadius: '16px', maxWidth: '420px', margin: '0 auto', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '20px', textAlign: 'center' }}>
            {isSignUp ? 'Create an Account' : 'Sign In'}
          </h2>

          <form onSubmit={handleTestClick} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ padding: '14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px', backgroundColor: '#ffffff', color: '#111827', width: '100%', boxSizing: 'border-box' }}
            />
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ padding: '14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px', backgroundColor: '#ffffff', color: '#111827', width: '100%', boxSizing: 'border-box' }}
            />
            <button type="submit" style={{ backgroundColor: '#16a34a', color: 'white', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', border: 'none', fontSize: '16px', transition: 'background 0.2s' }}>
              {isSignUp ? 'Register as Buyer/Supplier' : 'Sign In'}
            </button>
          </form>

          <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#4b5563' }}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span onClick={() => setIsSignUp(!isSignUp)} style={{ color: '#16a34a', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>
              {isSignUp ? 'Sign In Here' : 'Register Here'}
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}
