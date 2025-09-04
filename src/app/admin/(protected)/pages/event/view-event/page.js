'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent, getAllEvents } from '@/features/event/eventSlice';
import { useRouter } from 'next/navigation';

export default function ViewEventPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { events } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      dispatch(deleteEvent(id));
    }
  };

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <div className="text-gray-500 mb-4">
        <span className="text-blue-600 font-semibold">🏠 Dashboard</span> / Event List
      </div>

      {/* Card */}
      <div className="bg-white shadow rounded-lg p-4">
        {/* Card Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Event List</h2>
          <button
            onClick={() => router.push('/admin/pages/event/add-event')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <span className="text-xl leading-none">＋</span> Add Event
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 font-semibold">Image</th>
                <th className="p-3 font-semibold">Caption</th>
                <th className="p-3 font-semibold">Event Name</th>
                <th className="p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="border-t">
                  <td className="p-3">
                    <img
                      src={`http://localhost:5000/uploads/events/${event.image}`}
                      alt={event.event_name}
                      className="w-40 h-24 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{event.caption}</td>
                  <td className="p-3">{event.event_name}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/admin/pages/event/edit-event/${event._id}`)}
                        className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

