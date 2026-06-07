'use client';
import { useState } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('NGN'); 
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState({ name: '', ngn: '', usd: '', dutyNgn: '', dutyUsd: '', totalNgn: '', totalUsd: '', origin: '', icon: '' });
  const [activeTab, setActiveTab] = useState('market');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Tracking States
  const [invoiceConfirmed, setInvoiceConfirmed] = useState(false);
  const [trackingStep, setTrackingStep] = useState(1); 

  // Database updated with Capsule Housing & Premium Interior/Exterior Design Assets
  const PRODUCTS = [
    { id: 1, name: 'Industrial Borehole Submersible Pump (2HP)', category: 'Plumbing', ngn: '₦210,000', usd: '$131.00', dutyNgn: '₦14,700', dutyUsd: '$9.17', totalNgn: '₦224,700', totalUsd: '$140.17', origin: 'Guangdong Shipping Depot', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: '🚰' },
    { id: 2, name: 'Premium Aluminum Roofing Sheets (0.55mm)', category: 'Aluminum', ngn: '₦85,000', usd: '$53.00', dutyNgn: '₦5,950', dutyUsd: '$3.71', totalNgn: '₦90,950', totalUsd: '$56.71', origin: 'Abuja Central Warehouse', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: '🏠' },
    { id: 3, name: 'Luxury Smart Space Capsule House (V8-Series)', category: 'Prefab Structural', ngn: '₦44,800,000', usd: '$28,000.00', dutyNgn: '₦3,136,000', dutyUsd: '$1,960.00', totalNgn: '₦47,936,000', totalUsd: '$29,960.00', origin: 'Foshan Prefab Industry Zone', type: 'CHINA IMPORTED', color: '#2563eb', bg: '#eff6ff', icon: '🚀' },
    { id: 4, name: 'Premium Capsule Interior Fit-Out & Concept Design', category: 'Architectural Design', ngn: '₦2,400,000', usd: '$1,500.00', dutyNgn: '₦0', dutyUsd: '$0', totalNgn: '₦2,400,000', totalUsd: '$1,500.00', origin: 'Digital Delivery Hub', type: 'DESIGN PACKAGE', color: '#7c3aed', bg: '#f5f3ff', icon: '🛋️' },
    { id: 5, name: 'Heavy Industrial Borehole Drilling Rig Bit (9 7/8")', category: 'Drilling', ngn: '₦720,000', usd: '$450.00', dutyNgn: '₦50,400', dutyUsd: '$31.50', totalNgn: '₦770,400', totalUsd: '$481.50', origin: 'Tianjin Manufacturing Zone', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: '⚙️' },
    { id: 6, name: 'High-Grade Structural Steel H-Beams (Bulk)', category: 'Structural Materials', ngn: '₦340,000', usd: '$212.00', dutyNgn: '₦23,800', dutyUsd: '$14.84', totalNgn: '₦363,800', totalUsd: '$226.84', origin: 'Lagos Port Depot', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: '🏗️' },
    { id: 7, name: 'Eco Modular A-Frame Cabin House (Double Loft)', category: 'Prefab Structural', ngn: '₦20,800,000', usd: '$13,000.00', dutyNgn: '₦1,456,000', dutyUsd: '$910.00', totalNgn: '₦22,256,000', totalUsd: '$13,910.00', origin: 'Zhejiang Manufacturing Hub', type: 'CHINA IMPORTED', color: '#2563eb', bg: '#eff6ff', icon: '🪵' },
    { id: 8, name: 'Modern Cabin Exterior Landscape & Elevation Masterplan', category: 'Architectural Design', ngn: '₦3,200,000', usd: '$2,000.00', dutyNgn: '₦0', dutyUsd: '$0', totalNgn: '₦3,200,000', totalUsd: '$2,000.00', origin: 'Digital Delivery Hub', type: 'DESIGN PACKAGE', color: '#7c3aed', bg: '#f5f3ff', icon: '🏞️' },
    { id: 9, name: 'Casement Aluminum Window Profiles (Standard)', category: 'Aluminum', ngn: '₦45,000', usd: '$28.12', dutyNgn: '₦3,150', dutyUsd: '$1.97', totalNgn: '₦48,150', totalUsd: '$30.09', origin: 'Guangdong Factory Direct', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: '🪟' },
    { id: 10, name: 'Deep-Well Hydraulic Drilling Control Panel', category: 'Drilling', ngn: '₦1,440,000', usd: '$900.00', dutyNgn: '₦100,800', dutyUsd: '$63.00', totalNgn: '₦1,540,800', totalUsd: '$963.00', origin: 'Shandong Port Zone', type: 'CHINA IMPORTED', color: '#e53e3e', bg: '#fff5f5', icon: '🎛️' },
    { id: 11, name: 'High-Pressure PPR Plumbing Pipes (Pack of 50)', category: 'Plumbing', ngn: '₦120,000', usd: '$75.00', dutyNgn: '₦8,400', dutyUsd: '$5.25', totalNgn: '₦128,400', totalUsd: '$80.25', origin: 'Abuja Central Warehouse', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: '🧪' },
    { id: 12, name: 'Portland Cement Grade 42.5R (Bulk Ton)', category: 'Structural Materials', ngn: '₦96,000', usd: '$60.00', dutyNgn: '₦6,720', dutyUsd: '#4.20', totalNgn: '₦102,720', totalUsd: '$64.20', origin: 'Lagos Port Depot', type: 'LOCAL DISTRIBUTOR', color: '#16a34a', bg: '#f0fdf4', icon: '🧱' }
  ];

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.origin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', color: '#111827' }}>
      
      {/* HEADER NAVBAR */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '26px' }}>🏗
