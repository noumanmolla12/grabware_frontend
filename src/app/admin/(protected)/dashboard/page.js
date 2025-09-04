



'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import useHasMounted from '../../../../hooks/useHasMounted';
import Link from 'next/link';
import { logoutAdmin } from '../../../../features/admin/adminSlice';



import {
  FaSearch, FaBell, FaEye, FaFileAlt, FaMoneyBill, FaNewspaper,
  FaUsers, FaCalendarAlt, FaHome, FaBars, FaUser, FaCog, FaKey
} from 'react-icons/fa';

export default function AdminDashboard() {
  const hasMounted = useHasMounted();
  const router = useRouter();
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    if (hasMounted) {
      const stored = localStorage.getItem('admin');
      if (!stored) {
        router.push('/admin/login');
      } else {
        setAdmin(JSON.parse(stored));
      }
    }
  }, [hasMounted]);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    router.push('/admin/login');
  };

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!hasMounted || !admin) return null;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
   

      {/* Body */}
      <div style={{ display: 'flex', flex: 1 }}>
  

        {/* Main Content */}
        <main style={{
          flex: 1,
          backgroundColor: '#f1f2f6',
          padding: '30px'
        }}>
          <h2>Welcome, {admin.username}</h2>
          <p>Successfully logged in. This is the admin panel to change settings.</p>
        </main>
      </div>
    </div>
  );
}

// ✅ Fixed SidebarItem: returns <div>, not <li>
const SidebarItem = ({ icon, text }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    fontSize: '15px',
    cursor: 'pointer',
    color: '#ecf0f1'
  }}>
    <span style={{ marginRight: '10px', fontSize: '16px' }}>{icon}</span>
    {text}
  </div>
);

// Reusable Dropdown Item
const DropdownItem = ({ icon, label }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '14px',
    color: '#7f8c8d',
    cursor: 'pointer'
  }}>
    {icon}
    <span style={{ marginTop: '5px' }}>{label}</span>
  </div>
);
