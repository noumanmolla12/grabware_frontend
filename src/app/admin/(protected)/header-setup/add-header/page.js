'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addHeader } from '../../../../../features/common/headerSlice';
import { useRouter } from 'next/navigation';
import AdminProtectedRoute from '../../../../../components/AdminProtectedRoute';
import { FaTachometerAlt } from 'react-icons/fa';
import Link from 'next/link';




function AddHeader() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    company_name: '',
    phone: '',
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    logo: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        submissionData.append(key, value);
      }
    });

    dispatch(addHeader(submissionData));
    router.push('/admin/header-setup/view-header');
  };

  return (
    <AdminProtectedRoute>
      <div className="p-3 bg-[#f3f4f6] min-h-screen">
                <div className="bg-white rounded px-4 py-2 mb-6 flex items-center text-sm shadow-sm">
          <FaTachometerAlt className="text-[#6b7280] mr-2" />
          <Link
            href="/admin/dashboard"
            className="font-medium no-underline"
            style={{ color: "#6b7280" }}
          >
            Dashboard
          </Link>

          <span className="mx-2 text-[#9ca3af]">/</span>
          <span className="text-[#6b7280]">Header Add</span>
        </div>
        <div className="bg-[#f3f4f6] min-h-screen pt-3 pr-15 pb-5 pl-15">
      <div className="bg-white rounded shadow-md max-w-2xl mx-auto p-6">
        <h2 className="text-lg font-semibold text-[#374151] mb-4 border-b pb-2">Add Header</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              name="company_name"
              placeholder="Company Name"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2cd4c0]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2cd4c0]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
            <input
              name="facebook"
              placeholder="Facebook"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
            <input
              name="instagram"
              placeholder="Instagram"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
            <input
              name="twitter"
              placeholder="Twitter"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube</label>
            <input
              name="youtube"
              placeholder="YouTube"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Logo Image</label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded px-3 py-1.5"
            />
          </div>

         <div className="pt-4 flex gap-4">
  <button
    type="button"
    onClick={() => router.back()}
    className="bg-[#f87171] hover:bg-[#ef4444] text-white px-4 py-2 text-sm rounded shadow"
  >
    Cancel
  </button>

  <button
    type="submit"
    className="bg-[#2cd4c0] hover:bg-[#26bdaa] text-white px-4 py-2 text-sm rounded shadow"
  >
    Add Header
  </button>
</div>

        </form>
      </div>
    </div>

      </div>

    </AdminProtectedRoute>
  );
}

export default AddHeader;



