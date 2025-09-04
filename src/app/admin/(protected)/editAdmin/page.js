'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminById, editAdmin } from '@/features/admin/adminSlice';

export default function EditAdminPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  //const { admin, loading, error, success } = useSelector((state) => state.admin);
  const { currentAdmin: admin, loading, error, success } = useSelector((state) => state.admin);


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchAdminById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (admin) {
      setFormData({
        username: admin.username || '',
        email: admin.email || '',
        password: '',
      });
    }
  }, [admin]);

  useEffect(() => {
    if (success) {
      alert('Admin updated successfully');
      router.push('/admin/dashboard');
    }
  }, [success, router]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editAdmin({ id, formData }));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Edit Admin</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            className="w-full border p-2"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="w-full border p-2"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>New Password</label>
          <input
            type="password"
            name="password"
            className="w-full border p-2"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Admin
        </button>
      </form>
    </div>
  );
}
