'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdminThunk } from '../../../features/admin/adminSlice';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentAdmin, status, error } = useSelector((state) => state.admin);

  const [form, setForm] = useState({
    username: '',
    password: '',
    remember: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdminThunk({ username: form.username, password: form.password }));
  };

  useEffect(() => {
    if (currentAdmin) {
      router.push('/admin/dashboard');
    }
  }, [currentAdmin, router]);

  return (
    <div style={styles.wrapper}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <div style={styles.header}>SIGN IN NOW</div>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <div style={styles.checkboxRow}>
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
            id="remember"
          />
          <label htmlFor="remember" style={styles.checkboxLabel}>Remember Me</label>
        </div>

        <button type="submit" style={styles.signInButton} disabled={status === 'loading'}>
          {status === 'loading' ? 'Signing In...' : 'SIGN IN'}
        </button>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.footer}>Copyrights MC Kapurthala. All Right Reserved</div>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    height: '100vh',
    backgroundColor: '#f1f2f7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  card: {
    width: '360px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    paddingBottom: '20px',
    textAlign: 'center'
  },
  header: {
    backgroundColor: '#3cc2af',
    padding: '20px',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '18px'
  },
  input: {
    width: '80%',
    margin: '10px auto',
    padding: '10px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    backgroundColor: '#f1f6ff',
    fontSize: '16px'
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: '10%',
    marginTop: '10px',
    gap: '8px'
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#666'
  },
  signInButton: {
    backgroundColor: '#f2726f',
    color: '#fff',
    border: 'none',
    width: '80%',
    padding: '12px',
    borderRadius: '5px',
    marginTop: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px'
  },
  error: {
    color: 'red',
    marginTop: '10px',
    fontSize: '14px'
  },
  footer: {
    fontSize: '12px',
    color: '#999',
    marginTop: '20px'
  }
};




