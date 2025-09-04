'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteImportantLink, getAllImportantLinks } from '@/features/implink/implinkSlice';
import { useRouter } from 'next/navigation';
import Link from "next/link";


export default function ViewImportantLinks() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { links } = useSelector((state) => state.implink);

  useEffect(() => {
    dispatch(getAllImportantLinks());
  }, [dispatch]);

  // Confirm before delete
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this link?');
    if (confirmDelete) {
      dispatch(deleteImportantLink(id));
    }
  };

  return (
    <div>

       <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Important Links</h2>
            <Link
              href="/admin/pages/implink/add-implink"
              className="no-underline"
            >
              <button className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded flex items-center focus:outline-none">
                <span className="mr-2 text-xl">+</span> Add Event
              </button>
            </Link>
          </div>

      
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link._id}>
              <td>
                <img
                  src={`http://localhost:5000/uploads/implinks/${link.image}`}
                  alt="link-img"
                  width={80}
                />
              </td>
              <td>{link.link_name}</td>
              <td>
                <a href={link.link_url} target="_blank" rel="noopener noreferrer">
                  {link.link_url}
                </a>
              </td>
              <td>
                <button onClick={() => router.push(`/admin/pages/implink/edit-implink/${link._id}`)}>Edit</button>
                <button onClick={() => handleDelete(link._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
