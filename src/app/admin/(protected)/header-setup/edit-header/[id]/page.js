'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editHeader, fetchHeaders } from '../../../../../../features/common/headerSlice';
import { useParams, useRouter } from 'next/navigation';
import AdminProtectedRoute from '../../../../../../components/AdminProtectedRoute';
import { FaTachometerAlt } from 'react-icons/fa';
import Link from 'next/link';

function EditHeader() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { headers } = useSelector((state) => state.headers);

  const [formData, setFormData] = useState({
    company_name: '',
    phone: '',
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: '',
    logo: null,
  });

  const [existingLogo, setExistingLogo] = useState(null); // ✅ store existing DB logo
  const [newLogoPreview, setNewLogoPreview] = useState(null); // ✅ store new uploaded logo

  useEffect(() => {
    dispatch(fetchHeaders());
  }, [dispatch]);

  useEffect(() => {
    const header = headers.find((h) => h._id === id);
    if (header) {
      setFormData({
        company_name: header.company_name || '',
        phone: header.phone || '',
        facebook: header.facebook || '',
        instagram: header.instagram || '',
        twitter: header.twitter || '',
        youtube: header.youtube || '',
        logo: null,
      });
      setExistingLogo(header.logo ? `https://grabware.onrender.com/uploads/${header.logo}` : null);
    }
  }, [id, headers]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => setNewLogoPreview(reader.result); // ✅ set new preview
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    for (const key in formData) {
      if (formData[key]) updatedData.append(key, formData[key]);
    }
    dispatch(editHeader({ id, headerData: updatedData }));
    router.push('/admin/header-setup/view-header');
  };

  return (
    <AdminProtectedRoute>
      <div className="p-3 bg-[#f3f4f6] min-h-screen">
        {/* Breadcrumb */}
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
          <span className="text-[#6b7280]">Header Edit</span>
        </div>

        <div style={styles.wrapper}>
          <div style={styles.card}>
            <h4 style={styles.heading}>Edit Header</h4>

            

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div style={styles.formGroup}>
                <label style={styles.label}>Company Name</label>
                <input
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="Company Name"
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Phone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Facebook</label>
                <input
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  placeholder="Facebook"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Instagram</label>
                <input
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="Instagram"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Twitter</label>
                <input
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="Twitter"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>YouTube</label>
                <input
                  name="youtube"
                  value={formData.youtube}
                  onChange={handleChange}
                  placeholder="YouTube"
                  style={styles.input}
                />
              </div>


              {/* ✅ Show existing and new logo side by side */}
           <div style={styles.imagePreview}>
  {existingLogo && (
    <div style={{ display: 'inline-block', marginRight: '20px' }}>
      <p style={{ fontSize: '14px', marginBottom: '5px' }}>Existing Logo</p>
      <img
        src={existingLogo}
        alt="Existing Logo"
        style={{
          width: '150px',
          height: '150px',     // ✅ fixed height
          objectFit: 'contain',
        }}
      />
    </div>
  )}
  {newLogoPreview && (
    <div style={{ display: 'inline-block' }}>
      <p style={{ fontSize: '14px', marginBottom: '5px' }}>New Logo Preview</p>
      <img
        src={newLogoPreview}
        alt="New Logo Preview"
        style={{
          width: '150px',
          height: '150px',     // ✅ same height/width for all devices
          objectFit: 'contain',
        }}
      />
    </div>
  )}
</div>


              <div style={styles.formGroup}>
                <label style={styles.label}>New Logo Image (optional)</label>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.buttonGroup}>
                <button type="button" style={styles.cancelBtn} onClick={() => router.back()}>
                  Cancel
                </button>
                <button type="submit" style={styles.updateBtn}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminProtectedRoute>
  );
}

export default EditHeader;

const styles = {
  wrapper: {
    backgroundColor: '#f1f2f7',
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '15px', // decreased from 20px
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px', // slightly narrower
    width: '100%',
  },
  heading: {
    fontSize: '22px', // slightly smaller
    fontWeight: 'bold',
    color: '#343a40',
    borderBottom: '2px solid #20c997',
    paddingBottom: '8px', // reduced
    marginBottom: '15px', // reduced
  },
  imagePreview: {
    border: '2px dashed #20c997',
    padding: '6px', // reduced
    marginBottom: '15px', // reduced
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
  },
  formGroup: {
    marginBottom: '10px', // reduced
  },
  label: {
    fontWeight: 'bold',
    color: '#4e4e4e',
    marginBottom: '3px', // reduced
    display: 'inline-block',
  },
  input: {
    width: '100%',
    padding: '8px', // reduced from 10px
    fontSize: '13px', // slightly smaller
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '8px', // reduced
  },
  cancelBtn: {
    backgroundColor: '#fd5e53',
    color: '#fff',
    padding: '8px 16px', // reduced
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: '0.3s ease',
  },
  updateBtn: {
    backgroundColor: '#20c997',
    color: '#fff',
    padding: '8px 16px', // reduced
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: '0.3s ease',
  },
};



