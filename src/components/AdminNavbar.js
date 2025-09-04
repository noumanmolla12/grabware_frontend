'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { logoutAdmin } from '../features/admin/adminSlice';
import {
  FaSearch, FaBell, FaUser, FaCog, FaKey
} from 'react-icons/fa';

export default function AdminNavbar({ admin }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    router.push('/admin/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav style={{
      height: '60px',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      borderBottom: '1px solid #ddd',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FaSearch style={{ fontSize: '20px', marginRight: '10px' }} />
        <h4 style={{ margin: 0, fontSize: '18px' }}>
          MC KAPURTHALA <span style={{ color: '#e57373' }}>ADMIN</span>
        </h4>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }} ref={dropdownRef}>
        {showSearch ? (
          <div style={{
            display: 'flex', alignItems: 'center',
            border: '1px solid #ccc', borderRadius: '6px',
            padding: '5px 10px'
          }}>
            <FaSearch style={{ marginRight: '5px', opacity: 0.3 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              autoFocus
              style={{
                border: 'none',
                outline: 'none',
                fontSize: '14px',
                color: '#333',
                backgroundColor: 'transparent'
              }}
            />
          </div>
        ) : (
          <FaSearch
            style={{ fontSize: '16px', opacity: 0.3, cursor: 'pointer' }}
            onClick={() => setShowSearch(true)}
          />
        )}

        <style>{`
          .admin-button {
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 5px 10px;
            background-color: #fff;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 5px;
            transition: background-color 0.2s ease;
          }
          .admin-button:hover {
            background-color: #f0f0f0;
          }
          .admin-icon {
            font-size: 10px;
            opacity: 0.6;
            transition: opacity 0.2s ease;
          }
          .admin-button:hover .admin-icon {
            opacity: 1;
          }
          .no-underline {
            text-decoration: none;
          }
        `}</style>

        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="admin-button">
          {admin?.username}ADMIN<span className="admin-icon">▼</span>
        </button>

        {dropdownOpen && (
          <div style={{
            position: 'absolute',
            top: '60px',
            right: '20px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            width: '250px',
            zIndex: 1000
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              padding: '15px 0',
              backgroundColor: '#f7f9fc'
            }}>
              <DropdownItem icon={<FaUser size={18} />} label="Profile" />
              <Link href="/admin/password-change" className="no-underline">
                <DropdownItem icon={<FaCog size={18} />} label="Settings" />
              </Link>
              <DropdownItem icon={<FaBell size={18} />} label="Notification" />
            </div>
            <div onClick={handleLogout} style={{
              backgroundColor: '#a5d66e',
              padding: '12px',
              color: '#fff',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
              fontSize: '15px'
            }}>
              <FaKey /> LOG OUT
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

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



