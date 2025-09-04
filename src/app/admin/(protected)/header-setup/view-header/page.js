// "use client";

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchHeaders,
//   deleteHeader,
//   editHeader,
// } from "../../../../../features/common/headerSlice";
// import Link from "next/link";
// import { FaTachometerAlt, FaEdit, FaTrash } from "react-icons/fa";
// import AdminProtectedRoute from "../../../../../components/AdminProtectedRoute";

// function ViewHeader() {
//   const dispatch = useDispatch();
//   const { headers, status, error } = useSelector((state) => state.headers);

//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [imagePreview, setImagePreview] = useState("");

//   useEffect(() => {
//     dispatch(fetchHeaders());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this header?")) {
//       dispatch(deleteHeader(id));
//     }
//   };

//   const startEditing = (header) => {
//     setEditingId(header._id);
//     setFormData({
//       company_name: header.company_name || "",
//       phone: header.phone || "",
//       facebook: header.facebook || "",
//       instagram: header.instagram || "",
//       twitter: header.twitter || "",
//       youtube: header.youtube || "",
//       logo: null,
//     });
//     setImagePreview(
//       header.logo
//         ? `http://localhost:5000/uploads/${header.logo}`
//         : "/sample-image.jpg"
//     );
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       const file = files[0];
//       setFormData((prev) => ({ ...prev, [name]: file }));
//       const reader = new FileReader();
//       reader.onloadend = () => setImagePreview(reader.result);
//       reader.readAsDataURL(file);
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = (e, id) => {
//     e.preventDefault();
//     const updatedData = new FormData();
//     for (const key in formData) {
//       if (formData[key]) updatedData.append(key, formData[key]);
//     }
//     dispatch(editHeader({ id, headerData: updatedData }));
//     setEditingId(null); // ✅ Close modal after save
//   };

//   if (status === "loading") return <p className="p-5">Loading headers...</p>;
//   if (status === "failed")
//     return <p className="p-5 text-red-500">Error: {error}</p>;

//   return (
//     <AdminProtectedRoute>
//       <div className="p-3 bg-[#f3f4f6] min-h-screen relative">
//         {/* Breadcrumb */}
//         <div className="bg-white rounded px-4 py-2 mb-6 flex items-center text-sm shadow-sm">
//           <FaTachometerAlt className="text-[#6b7280] mr-2" />
//           <Link
//             href="/admin/dashboard"
//             className="font-medium no-underline"
//             style={{ color: "#6b7280" }}
//           >
//             Dashboard
//           </Link>
//           <span className="mx-2 text-[#9ca3af]">/</span>
//           <span className="text-[#6b7280]">Header List</span>
//         </div>

//         <div className="bg-white rounded shadow p-6 max-w-6xl mx-auto">
//           <h2 className="text-lg font-semibold text-gray-700 mb-4">
//             Header List
//           </h2>

//           {headers.length === 0 ? (
//             <p className="text-gray-600 text-sm">No headers found.</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full table-auto border-collapse">
//                 <thead>
//                   <tr className="bg-[#f5f5f5] text-[#374151] text-sm">
//                     <th className="px-4 py-2">Company</th>
//                     <th className="px-4 py-2">Phone</th>
//                     <th className="px-4 py-2">Logo</th>
//                     <th className="px-4 py-2 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {headers.map((header) => (
//                     <tr key={header._id} className="border-t">
//                       <td className="px-4 py-3">{header.company_name}</td>
//                       <td className="px-4 py-3">{header.phone}</td>
//                       <td className="px-4 py-3">
//                         {header.logo && (
//                           <img
//                             src={`http://localhost:5000/uploads/${header.logo}`}
//                             alt="Logo"
//                             className="w-16 h-auto rounded"
//                           />
//                         )}
//                       </td>
//                       <td className="px-4 py-3 text-center space-x-2">
//                         <button
//                           onClick={() => startEditing(header)}
//                           className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded shadow text-sm"
//                         >
//                           <FaEdit />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(header._id)}
//                           className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded shadow text-sm"
//                         >
//                           <FaTrash />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* ✅ Modal Edit Panel */}
//         {editingId && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
//             <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
//               <h3 className="text-lg font-bold mb-4 text-gray-700">
//                 Edit Header
//               </h3>

//               <form
//                 onSubmit={(e) => handleSubmit(e, editingId)}
//                 encType="multipart/form-data"
//                 className="space-y-3"
//               >
//                 <div>
//                   <label className="block font-semibold">Company Name</label>
//                   <input
//                     name="company_name"
//                     value={formData.company_name}
//                     onChange={handleChange}
//                     className="border rounded w-full p-2"
//                   />
//                 </div>

//                 <div>
//                   <label className="block font-semibold">Phone</label>
//                   <input
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="border rounded w-full p-2"
//                   />
//                 </div>

//                 <div>
//                   <label className="block font-semibold">Logo</label>
//                   <input
//                     type="file"
//                     name="logo"
//                     accept="image/*"
//                     onChange={handleChange}
//                   />
//                   {imagePreview && (
//                     <img
//                       src={imagePreview}
//                       alt="Preview"
//                       className="w-24 mt-2 rounded"
//                     />
//                   )}
//                 </div>

//                 <div className="flex justify-end gap-2 mt-4">
//                   <button
//                     type="button"
//                     onClick={() => setEditingId(null)}
//                     className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
//                   >
//                     Save
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </AdminProtectedRoute>
//   );
// }

// export default ViewHeader;




"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  fetchHeaders,
  deleteHeader,
} from "../../../../../features/common/headerSlice";
import Link from "next/link";
import { FaTachometerAlt, FaEdit, FaTrash } from "react-icons/fa";
import AdminProtectedRoute from "../../../../../components/AdminProtectedRoute";

function ViewHeader() {
  const dispatch = useDispatch();
  const { headers, status, error } = useSelector((state) => state.headers);

  useEffect(() => {
    dispatch(fetchHeaders());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this header?")) {
      dispatch(deleteHeader(id));
    }
  };

  if (status === "loading") return <p className="p-5">Loading headers...</p>;
  if (status === "failed")
    return <p className="p-5 text-red-500">Error: {error}</p>;

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
          <span className="text-[#6b7280]">Header List</span>
        </div>

        <div className="p-8 bg-[#f3f4f6] min-h-screen">

        {/* Card */}
        <div className="bg-white rounded shadow p-6 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Header List</h2>
            <Link
              href="/admin/header-setup/add-header"
              className="no-underline"
            >
              <button className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded flex items-center focus:outline-none">
                <span className="mr-2 text-xl">+</span> Add Event
              </button>
            </Link>
          </div>

          {headers.length === 0 ? (
            <p className="text-gray-600 text-sm">No headers found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-[#f5f5f5] text-[#374151] text-sm">
                    <th className="text-left px-4 py-2 font-semibold">
                      Company
                    </th>
                    <th className="text-left px-4 py-2 font-semibold">Phone</th>
                    <th className="text-left px-4 py-2 font-semibold">
                      Socials
                    </th>
                    <th className="text-left px-4 py-2 font-semibold">Logo</th>
                    <th className="text-center px-4 py-2 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {headers.map((header) => (
                    <tr key={header._id} className="border-t">
                      <td className="px-4 py-3 text-sm text-[#374151]">
                        {header.company_name}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#374151]">
                        {header.phone}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#374151] space-x-2">
                        {header.facebook && (
                          <a
                            href={header.facebook}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            FB
                          </a>
                        )}
                        {header.instagram && (
                          <a
                            href={header.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="text-pink-500 hover:underline"
                          >
                            IG
                          </a>
                        )}
                        {header.twitter && (
                          <a
                            href={header.twitter}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sky-500 hover:underline"
                          >
                            TW
                          </a>
                        )}
                        {header.youtube && (
                          <a
                            href={header.youtube}
                            target="_blank"
                            rel="noreferrer"
                            className="text-red-600 hover:underline"
                          >
                            YT
                          </a>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {header.logo && (
                          <img
                            // src={`http://localhost:5000/uploads/${header.logo}`}
                            src={`https://grabware.onrender.com/uploads/${header.logo}`}
                            
                            alt="Logo"
                            className="w-16 h-auto rounded"
                          />
                        )}
                      </td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <Link
                          href={`/admin/header-setup/edit-header/${header._id}`}
                        >
                          <button className="bg-[#2dd4bf] hover:bg-[#14b8a6] text-white px-3 py-2 rounded shadow text-sm">
                            <FaEdit />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(header._id)}
                          className="bg-[#fd5c63] hover:bg-[#e14b52] text-white px-3 py-2 rounded shadow text-sm"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      </div>
    </AdminProtectedRoute>
  );
}

export default ViewHeader;
