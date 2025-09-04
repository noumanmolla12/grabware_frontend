'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '@/features/event/eventSlice';
import { useRouter } from 'next/navigation';

export default function AddEventPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    event_name: '',
    caption: '',
    details: '',
    image: null,
    status: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, image: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('event_name', formData.event_name);
    data.append('caption', formData.caption);
    data.append('details', formData.details);
    data.append('image', formData.image);
    data.append('status', formData.status);

    await dispatch(createEvent(data));
    router.push('/admin/pages/event/view-event');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Add Event</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block font-semibold mb-1">Choose Image to upload</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="block"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Caption</label>
            <input
              type="text"
              name="caption"
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Event Name</label>
            <input
              type="text"
              name="event_name"
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Details</label>
            <textarea
              name="details"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows={4}
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                className="mr-2"
              />
              Status
            </label>
          </div>

          <div className="flex justify-start gap-2">
            <button
              type="button"
              onClick={() => router.push('/admin/pages/event/view-event')}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



// 'use client';

// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { createEvent } from '@/features/event/eventSlice';
// import { useRouter } from 'next/navigation';

// export default function AddEventPage() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     event_name: '',
//     caption: '',
//     image: null,
//   });

//   const handleChange = (e) => {
//     if (e.target.name === 'image') {
//       setFormData({ ...formData, image: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append('event_name', formData.event_name);
//     data.append('caption', formData.caption);
//     data.append('image', formData.image);

//     await dispatch(createEvent(data));
//     router.push('/admin/pages/event/view-event');
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Add Event</h2>

//       <input type="text" name="event_name" placeholder="Event Name" onChange={handleChange} required className="mb-2 block w-full border p-2" />
//       <input type="text" name="caption" placeholder="Caption" onChange={handleChange} required className="mb-2 block w-full border p-2" />
//       <input type="file" name="image" accept="image/*" onChange={handleChange} required className="mb-2 block w-full" />
      
//       <button type="submit" className="bg-blue-600 text-white px-4 py-2">Add Event</button>
//     </form>
//   );
// }
