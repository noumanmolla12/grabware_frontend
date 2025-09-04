'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getImportantLinkById, updateImportantLink } from '@/features/implink/implinkSlice';
import { useParams, useRouter } from 'next/navigation';

export default function EditImportantLinkPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { selectedLink } = useSelector((state) => state.implink);

  const [form, setForm] = useState({ link_name: '', link_url: '', image: null });

  useEffect(() => {
    dispatch(getImportantLinkById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedLink) {
      setForm({
        link_name: selectedLink.link_name,
        link_url: selectedLink.link_url,
        image: null,
      });
    }
  }, [selectedLink]);

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
    if (form.image) {
      formData.append('image', form.image);
    }

    await dispatch(updateImportantLink({ id, formData }));
    router.push('/admin/pages/implink/view-implink');
  };

  if (!selectedLink) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Important Link</h2>
      <form onSubmit={handleSubmit}>
        <input name="link_name" value={form.link_name} onChange={handleChange} required />
        <input name="link_url" value={form.link_url} onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
