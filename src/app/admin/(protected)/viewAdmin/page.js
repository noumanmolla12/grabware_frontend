// 'use client';

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAdmins } from '@/features/admin/adminSlice';
// import { deleteAdmin } from '@/services/adminAPI';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { FaEdit, FaTrash, FaTachometerAlt, FaPlus } from 'react-icons/fa';

// const ViewAdmin = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { admins } = useSelector((state) => state.admin);

//   useEffect(() => {
//     dispatch(fetchAdmins());
//   }, [dispatch]);

//   const handleDelete = async (id) => {
//     if (confirm('Are you sure you want to delete this admin?')) {
//       await deleteAdmin(id);
//       dispatch(fetchAdmins());
//     }
//   };

//   return (
//     <div className="p-5 bg-[#f3f4f6] min-h-screen">
//       {/* Breadcrumb */}
//       <div className="bg-white rounded px-4 py-2 mb-6 flex items-center text-sm shadow-sm">
//         <FaTachometerAlt className="text-[#6b7280] mr-2" />
//         <Link href="/admin/dashboard" className="text-[#2563eb] font-medium hover:underline">
//           Dashboard
//         </Link>
//         <span className="mx-2 text-[#9ca3af]">/</span>
//         <span className="text-[#6b7280]">Admin List</span>
//       </div>

//       {/* Card */}
//       <div className="bg-white rounded shadow p-6 max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-gray-700">Admin List</h2>
//           <button
//             onClick={() => router.push('/admin/register')}
//             className="bg-[#fd5c63] hover:bg-[#e14b52] text-white text-sm font-medium px-4 py-2 rounded flex items-center shadow"
//           >
//             <FaPlus className="mr-1" /> Add Admin
//           </button>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full table-auto border-collapse">
//             <thead>
//               <tr className="bg-[#f5f5f5] text-[#374151] text-sm">
//                 <th className="text-left px-4 py-2 font-semibold">Username</th>
//                 <th className="text-left px-4 py-2 font-semibold">Email</th>
//                 <th className="text-left px-4 py-2 font-semibold">Created At</th>
//                 <th className="text-center px-4 py-2 font-semibold">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {admins.map((admin) => (
//                 <tr key={admin._id} className="border-t text-sm text-[#374151]">
//                   <td className="px-4 py-3">{admin.username}</td>
//                   <td className="px-4 py-3">{admin.email}</td>
//                   <td className="px-4 py-3">{new Date(admin.createdAt).toLocaleString()}</td>
//                   <td className="px-4 py-3 text-center space-x-2">
//                     <Link href={`/admin/editAdmin?id=${admin._id}`}>
//                       <button className="bg-[#2dd4bf] hover:bg-[#14b8a6] text-white px-3 py-2 rounded shadow text-sm">
//                         <FaEdit />
//                       </button>
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(admin._id)}
//                       className="bg-[#fd5c63] hover:bg-[#e14b52] text-white px-3 py-2 rounded shadow text-sm"
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {admins.length === 0 && (
//                 <tr>
//                   <td colSpan="4" className="text-center text-gray-500 py-4">
//                     No admins found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewAdmin;



'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdmins } from '@/features/admin/adminSlice';
import { deleteAdmin } from '@/services/adminAPI';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ViewAdmin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { admins } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this admin?')) {
      await deleteAdmin(id);
      dispatch(fetchAdmins()); // refresh list
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin List</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td>{admin.username}</td>
              <td>{admin.email}</td>
              <td>{new Date(admin.createdAt).toLocaleString()}</td>
              <td>
                <Link href={`/admin/editAdmin?id=${admin._id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(admin._id)} style={{ marginLeft: '10px' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAdmin;
