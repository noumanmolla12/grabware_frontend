'use client';

import React, { useState, useEffect } from 'react';
import { FaHome } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { changeAdminPasswordThunk } from '../../../../features/admin/adminSlice'; // ✅ adjust if path differs
import { toast } from 'react-toastify'; // optional for better UI
import 'react-toastify/dist/ReactToastify.css';

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // ✅ Load admin username from localStorage
  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      const { username } = JSON.parse(storedAdmin);
      setFormData((prev) => ({ ...prev, username }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, oldPassword, newPassword, confirmPassword } = formData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      await dispatch(changeAdminPasswordThunk({ username, oldPassword, newPassword })).unwrap();
      toast.success('Password changed successfully');
      setFormData({ ...formData, oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err || 'Something went wrong');
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Breadcrumb */}
      <div style={styles.breadcrumb}>
        <FaHome style={styles.icon} />
        <a href="/admin/dashboard" style={styles.link}>Dashboard</a>
        <span> / Change password</span>
      </div>

      {/* Card */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>Change password</div>

        {/* Form */}
        <form style={styles.form} onSubmit={handleSubmit}>
          {/* Username (disabled) */}
          <label style={styles.label}>Username</label>
          <input
            type="text"
            value={formData.username}
            disabled
            style={{ ...styles.input, backgroundColor: '#eee' }}
          />

          {/* Old Password */}
          <label style={styles.label}>Old password</label>
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            style={{ ...styles.input, backgroundColor: '#e6f0ff' }}
          />

          {/* New Password */}
          <label style={styles.label}>New password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter your new password"
            style={styles.input}
          />

          {/* Confirm Password */}
          <label style={styles.label}>Reenter new password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Reenter and confirm your new password"
            style={styles.input}
          />

          <button type="submit" style={styles.button}>Change password</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#f1f2f7',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  breadcrumb: {
    marginBottom: '20px',
    fontSize: '15px',
    color: '#555',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  icon: {
    color: '#555',
    fontSize: '16px',
  },
  link: {
    color: '#337ab7',
    textDecoration: 'none',
  },
  card: {
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#428bca',
    color: '#fff',
    padding: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  form: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    marginTop: '10px',
    backgroundColor: '#5cb85c',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer',
  },
};

export default ChangePasswordForm;
