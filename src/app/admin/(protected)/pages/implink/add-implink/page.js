'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addImportantLink } from '@/features/implink/implinkSlice';
import { useRouter } from 'next/navigation';

export default function AddImportantLinkPage() {
  const [form, setForm] = useState({ link_name: '', link_url: '', image: null });
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('link_name', form.link_name);
    formData.append('link_url', form.link_url);
    formData.append('image', form.image);

    await dispatch(addImportantLink(formData));
    router.push('/admin/pages/implink/view-implink');
  };

  return (
    <div>
      <h2>Add Important Link</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="link_name" placeholder="Link Name" onChange={handleChange} required />
        <input name="link_url" placeholder="Link URL" onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
