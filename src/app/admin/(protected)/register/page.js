'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerAdminThunk } from '../../../../features/admin/adminSlice';

export default function RegisterAdminPage() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.admin);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', // ✅ New field
  });

  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError(''); // clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    const { username, email, password } = form;

    dispatch(registerAdminThunk({ username, email, password }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Register</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '300px' }}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        /><br />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        /><br />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        /><br />

        <button type="submit">Register</button>
      </form>

      {/* Show loading state */}
      {status === 'loading' && <p>Registering...</p>}

      {/* Show backend error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Show confirm password mismatch */}
      {formError && <p style={{ color: 'red' }}>{formError}</p>}
    </div>
  );
}





