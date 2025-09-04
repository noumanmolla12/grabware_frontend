'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventById, updateEvent } from '@/features/event/eventSlice';
import { useParams, useRouter } from 'next/navigation';

export default function EditEventPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedEvent } = useSelector((state) => state.event);

  const [formData, setFormData] = useState({
    event_name: '',
    caption: '',
    image: null,
    details: '',
    status: true,
  });

  useEffect(() => {
    dispatch(getEventById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        event_name: selectedEvent.event_name,
        caption: selectedEvent.caption,
        image: null,
        details: selectedEvent.details || '',
        status: selectedEvent.status ?? true,
      });
    }
  }, [selectedEvent]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === 'image') {
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
    data.append('status', formData.status);
    if (formData.image) data.append('image', formData.image);

    await dispatch(updateEvent({ id, formData: data }));
    router.push('/admin/pages/event/view-event');
  };

  if (!selectedEvent) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-2xl mx-auto bg-white rounded-md shadow-md">
      {/* Preview Image */}
      <div className="mb-4">
        <img
          src={`https://grabware-api.onrender.com/uploads/events/${selectedEvent.image}`}
          alt="Event"
          className="w-60 h-auto mx-auto border rounded shadow"
        />
      </div>

      {/* Upload Image */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Choose Image to upload</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded p-2"
        />
      </div>

      {/* Caption */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Caption</label>
        <input
          type="text"
          name="caption"
          value={formData.caption}
          onChange={handleChange}
          required
          className="block w-full border border-gray-300 rounded p-2"
          placeholder="Dengue Fever"
        />
      </div>

      {/* Event Name */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Event Name</label>
        <input
          type="text"
          name="event_name"
          value={formData.event_name}
          onChange={handleChange}
          required
          className="block w-full border border-gray-300 rounded p-2"
          placeholder="Dengue Fever"
        />
      </div>

      {/* Details */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Details</label>
        <textarea
          name="details"
          rows="4"
          value={formData.details}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded p-2"
          placeholder="Dengue Fever"
        />
      </div>

      {/* Status */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          name="status"
          checked={formData.status}
          onChange={handleChange}
          className="accent-blue-500"
        />
        <label className="font-semibold">Status</label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
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
          Update
        </button>
      </div>
    </form>
  );
}





// 'use client';

// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getEventById, updateEvent } from '@/features/event/eventSlice';
// import { useParams, useRouter } from 'next/navigation';

// export default function EditEventPage() {
//   const { id } = useParams();
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { selectedEvent } = useSelector((state) => state.event);

//   const [formData, setFormData] = useState({
//     event_name: '',
//     caption: '',
//     image: null,
//   });

//   useEffect(() => {
//     dispatch(getEventById(id));
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (selectedEvent) {
//       setFormData({
//         event_name: selectedEvent.event_name,
//         caption: selectedEvent.caption,
//         image: null,
//       });
//     }
//   }, [selectedEvent]);

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
//     if (formData.image) data.append('image', formData.image);

//     await dispatch(updateEvent({ id, formData: data }));
//     router.push('/admin/pages/event/view-event');
//   };

//   if (!selectedEvent) return <p>Loading...</p>;

//   return (
//     <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Edit Event</h2>

//       <input type="text" name="event_name" value={formData.event_name} onChange={handleChange} required className="mb-2 block w-full border p-2" />
//       <input type="text" name="caption" value={formData.caption} onChange={handleChange} required className="mb-2 block w-full border p-2" />
//       <input type="file" name="image" accept="image/*" onChange={handleChange} className="mb-2 block w-full" />
      
//       <button type="submit" className="bg-blue-600 text-white px-4 py-2">Update Event</button>
//     </form>
//   );
// }
