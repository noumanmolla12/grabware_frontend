import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#005caa', color: 'white', padding: '40px 20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* ✅ Find Us - COMPRESSED */}
        <div style={{ flex: '1 1 250px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Find Us</h2>
          <div style={{ fontSize: '16px', lineHeight: '1.6' }}>
            <p style={{ margin: '4px 0' }}>Office of Municipal Corporation,</p>
            <p style={{ margin: '4px 0' }}>Kapurthala Shalimar Bagh</p>
            <p style={{ margin: '4px 0' }}>Kapurthala-144602.</p>
            <p style={{ margin: '4px 0' }}>Punjab.</p>
          </div>
        </div>

        {/* Explore */}
        <div style={{ flex: '1 1 200px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Explore</h2>
          <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.8' }}>
            <li>&rsaquo; Home</li>
            <li>&rsaquo; About Us</li>
            <li>&rsaquo; Departement</li>
            <li>&rsaquo; Dedicated Team</li>
            <li>&rsaquo; E-Newsletter</li>
            <li>&rsaquo; Accounts</li>
            <li>&rsaquo; Photo Gallery</li>
            <li>&rsaquo; Tenders</li>
          </ul>
        </div>

        {/* Services */}
        <div style={{ flex: '1 1 220px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Services</h2>
          <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.8' }}>
            <li>&rsaquo; Property Tax</li>
            <li>&rsaquo; Water Supply</li>
            <li>&rsaquo; Sewerage Bill</li>
            <li>&rsaquo; Street Vending</li>
            <li>&rsaquo; Pet Registration</li>
            <li>&rsaquo; Trade Licence</li>
            <li>&rsaquo; Fire NOC</li>
            <li>&rsaquo; Street Light Complaints</li>
          </ul>
        </div>

        {/* For Appointment */}
        <div style={{ flex: '1 1 220px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>For Appointment</h2>
          <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.8' }}>
            <li>Monday <span style={{ float: 'right' }}>09 am - 5 pm</span></li>
            <li>Tuesday <span style={{ float: 'right' }}>09 am - 5 pm</span></li>
            <li>Wednesday <span style={{ float: 'right' }}>09 am - 5 pm</span></li>
            <li>Thursday <span style={{ float: 'right' }}>09 am - 5 pm</span></li>
            <li>Friday <span style={{ float: 'right' }}>09 am - 5 pm</span></li>
            <li>Saturday - Sunday <span style={{ float: 'right' }}>Closed</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <hr style={{ borderColor: 'rgba(255,255,255,0.3)', marginTop: '30px' }} />
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Copyright © M. C Kapurthala
      </p>
    </footer>
  );
};

export default Footer;
