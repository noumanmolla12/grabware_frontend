'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPhoneAlt } from 'react-icons/fa';
import { fetchHeaders } from '../features/common/headerSlice';
import useHasMounted from '../hooks/useHasMounted';

const Header = () => {
  console.log("Header component rendered");

  const [language, setLanguage] = useState('en');
  const dispatch = useDispatch();
  const hasMounted = useHasMounted();

  const { headers, status } = useSelector((state) => state.headers);

  const handleChange = (e) => {
    setLanguage(e.target.value);
  };

  // Fetch headers when language changes
  useEffect(() => {
    if (language) {
      dispatch(fetchHeaders(language));
    }
  }, [dispatch, language]);

  if (!hasMounted || status !== 'succeeded' || !headers || headers.length === 0) {
    return <div style={{ textAlign: 'center', padding: '10px' }}>Failed to load header.</div>;
  }

  const {
    company_name,
    phone,
    facebook,
    instagram,
    twitter,
    youtube,
    logo,
  } = headers[0];

  const formatUrl = (url) => {
    if (!url) return "#";
    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
  };

  return (
    <div>
      {/* Tricolor Bar */}
      <img
        src="https://www.mea.gov.in/images/web-flag-strip-bg.jpg"
        alt="Top Banner"
        style={{ width: "100%", height: "auto", display: "block" }}
      />

      {/* Top Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2px 20px',
        height:'50px',
        borderBottom: '1px solid #ccc',
        background: 'white',
        fontFamily: 'Arial, sans-serif',
      }}>
        {/* Left: Logo + Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
           <span
  style={{
    fontSize: '12px',
    fontWeight: 100,
    color: '#0066cc',
    fontFamily: `'Noto Sans Gurmukhi', 'GurbaniAkhar', 'Segoe UI', sans-serif`,
    letterSpacing: '1px',
  }}
>
  ਨਗਰ ਨਿਗਮ ਕਪੂਰਥਲਾ
</span>
          <div style={{ borderLeft: '1px dotted #696d70ff', height: '25px' }} />
          <span style={{ color: '#0066cc', fontWeight: 'bold' }}>{company_name}</span>
        </div>

        {/* Right: Phone + Socials + Language */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ borderLeft: '1px dotted #696d70ff', height: '25px' }} />
          <span style={{ color: '#0066cc', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            <FaPhoneAlt style={{ color: 'blue', fontSize: '18px' }} />
            {phone}
          </span>
          <div style={{ borderLeft: '1px dotted #696d70ff', height: '25px' }} />

          {/* Social Icons */}
          <a href={formatUrl(facebook)} target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width="24" height="24" />
          </a>
          <a href={formatUrl(twitter)} target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="24" height="24" />
          </a>
          <a href={formatUrl(youtube)} target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" width="24" height="24" />
          </a>
          <div style={{ borderLeft: '1px dotted #696d70ff', height: '25px' }} />

          {/* Language Dropdown */}
          <div style={{ padding: '10px' }}>
            <select
              value={language}
              onChange={handleChange}
              style={{
                padding: '6px',
                fontWeight: 'bold',
                fontSize: '16px',
                border: '2px solid black',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              <option value="en">Select Language</option>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="pa">Punjabi</option>
              <option value="ur">Urdu</option>
            </select>
          </div>
        </div>
      </div>

      {/* Middle Logos */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        background: 'white',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <img
            src="https://img.favpng.com/10/17/8/sarnath-lion-capital-of-ashoka-pillars-of-ashoka-state-emblem-of-india-national-symbols-of-india-png-favpng-hKC4k4exDfrvDwuq7QisEcTFJ.jpg"
            alt="Municipal Logo"
            style={{ height: '60px' }}
          />
          <img
            src={`https://grabware.onrender.com/uploads/${logo}`}
            alt="Company Logo"
            style={{
              width: '60px',
              height: '60px',
              objectFit: 'cover',
              borderRadius: '50%',
              border: '2px solid #2c2b2bff'
            }}
          />
        </div>
        <img src="https://mckapurthala.com/public/views/kapurthala/img/flag.gif" alt="Indian Flag" style={{ height: '40px' }} />
        <img src="https://mckapurthala.com/public/views/kapurthala/img/swachh-bharatlogo.png" alt="Swachh Bharat" style={{ height: '60px' }} />
      </div>

      {/* Navigation Bar */}
      {/* <div style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#004c99',
        padding: '10px 0',
      }}>
        {[
          'Home',
          'About Us',
          'Dedicated Team',
          'Departments',
          'Tenders',
          'AMRUT Reforms',
          'Photo Gallery',
          'News',
          'Accounts'
        ].map((item, index) => (
          <a
            key={index}
            href="#"
            style={{
              color: 'white',
              margin: '0 15px',
              fontWeight: 'bold',
              textDecoration: 'none',
              fontSize: '16px',
            }}
          >
            {item}
          </a>
        ))}
      </div> */}
    </div>
  );
};

export default Header;
