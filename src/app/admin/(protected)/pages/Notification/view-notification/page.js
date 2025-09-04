// "use client";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchNotifications } from "@/features/notification/notificationSlice";
// import { FaFilePdf } from "react-icons/fa";

// export default function ViewNotifications() {
//   const dispatch = useDispatch();
//   const { items, loading } = useSelector((state) => state.notifications);

//   const [filter, setFilter] = useState("All");

//   useEffect(() => {
//     dispatch(fetchNotifications());
//   }, [dispatch]);

//   if (loading) return <p>Loading...</p>;

//   // ✅ Category filtering
//   const filteredItems = items.filter((n) => {
//     if (filter === "All") return true;
//     if (filter === "Archive") {
//       return n.validUpto && new Date(n.validUpto) < new Date();
//     }
//     return n.category === filter;
//   });

//   const categories = [
//     "RECRUITMENT",
//     "NEWS",
//     "EVENTS",
//     "PRESS RELEASE",
//     "Office Order",
//     "Circular",
//     "Tender",
//   ];

//   return (
//     <div
//       className="col-6"
//       style={{
//         border: "1px solid #ccc",
//         padding: "15px",
//         borderRadius: "8px",
//         background: "#fafafa",
//       }}
//     >
//       {/* 🔹 Three Buttons (All, Archive, Dropdown) */}
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "nowrap",
//           gap: "10px",
//           marginBottom: "15px",
//         }}
//       >
//         <button
//           onClick={() => setFilter("All")}
//           style={{
//             backgroundColor: filter === "All" ? "#2563eb" : "#004b93",
//             color: "white",
//             padding: "8px 12px",
//             border: "none",
//             borderRadius: "4px",
//             fontSize: "13px",
//             fontWeight: "500",
//             cursor: "pointer",
//           }}
//         >
//           All
//         </button>

//         <button
//           onClick={() => setFilter("Archive")}
//           style={{
//             backgroundColor: filter === "Archive" ? "#2563eb" : "#004b93",
//             color: "white",
//             padding: "8px 12px",
//             border: "none",
//             borderRadius: "4px",
//             fontSize: "13px",
//             fontWeight: "500",
//             cursor: "pointer",
//           }}
//         >
//           Archive
//         </button>

//         <select
//           value={categories.includes(filter) ? filter : ""}
//           onChange={(e) => setFilter(e.target.value)}
//           style={{
//             padding: "8px 12px",
//             border: "1px solid #ccc",
//             borderRadius: "4px",
//             fontSize: "13px",
//             fontWeight: "500",
//             flex: "1",
//             cursor: "pointer",
//           }}
//         >
//           <option value="">Select Category</option>
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Info */}
//       <div
//         style={{
//           color: "#8a4a00",
//           fontWeight: "bold",
//           marginBottom: "12px",
//           fontSize: "14px",
//         }}
//       >
//         📌 PDF Document maximum size limit is{" "}
//         <span style={{ color: "red" }}>2 MB</span>.
//       </div>

//       {/* 🔹 List Style Notifications */}
//       <div>
//         <ul
//           style={{ paddingLeft: "18px", lineHeight: "1.8", fontSize: "14px" }}
//         >
//           {filteredItems.map((n) => (
//   <li key={n._id}>
//     <strong style={{ fontWeight: "600" }}>{n.title}</strong>{" "}
//     {n.details}{" "}
//     {n.pdf && (
//       <a
//         href={`http://localhost:5000/uploads/notifications/${n.pdf}`}
//         target="_blank"
//         rel="noopener noreferrer"
//         style={{
//           color: "#004b93",
//           fontWeight: "500",
//           marginLeft: "5px",
//         }}
//       >
//         <FaFilePdf
//           style={{
//             color: "red",
//             fontSize: "18px",
//             display: "inline",
//             marginRight: "4px",
//           }}
//         />
//         (pdf)
//       </a>
//     )}
//     {n.photo && (
//       <img
//         src={`http://localhost:5000/uploads/notifications/${n.photo}`}
//         alt=""
//         style={{
//           width: "100px",
//           height: "60px",
//           objectFit: "cover",
//           borderRadius: "4px",
//           display: "block",
//           marginTop: "5px",
//         }}
//       />
//     )}
//   </li>
// ))}

//           {filteredItems.length === 0 && (
//             <li style={{ color: "gray" }}>No notifications found.</li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }





"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, deleteNotification } from "@/features/notification/notificationSlice";
import { useRouter } from "next/navigation";
import { FaFilePdf, FaEdit, FaTrash, FaTachometerAlt } from "react-icons/fa";
import Link from "next/link";



export default function ViewNotifications() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items, loading } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this notification?")) {
      dispatch(deleteNotification(id));
    }
  };

  return (
    <div className="p-4">
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
          <span className="text-[#6b7280]">Notifications</span>
        </div>

      {/* Card */}
      <div className="bg-white shadow rounded-lg p-4">
        {/* Card Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Notification List</h2>
          <button
            onClick={() => router.push("/admin/pages/Notification/add-notification")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <span className="text-xl leading-none">＋</span> Add Notification
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 font-semibold">Category</th>
                <th className="p-3 font-semibold">Title</th>
                <th className="p-3 font-semibold">Details</th>
                <th className="p-3 font-semibold">Valid Upto</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">File</th>
                <th className="p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((n) => (
                <tr key={n._id} className="border-t">
                  <td className="p-3">{n.category}</td>
                  <td className="p-3">{n.title}</td>
                  <td className="p-3">{n.details}</td>
                  <td className="p-3">
                    {n.validUpto ? new Date(n.validUpto).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="p-3">{n.status ? "Active" : "Inactive"}</td>
                  <td className="p-3">
                    {n.pdf && (
                      <a
                        href={`https://grabware-api.onrender.com/uploads/notifications/${n.pdf}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 flex items-center gap-1"
                      >
                        <FaFilePdf style={{ color: "red", fontSize: "28px" }} />
                      </a>
                    )}
                    {n.photo && (
                      <img
                        src={`https://grabware-api.onrender.com/uploads/notifications/${n.photo}`}
                        alt=""
                        className="w-20 h-12 object-cover rounded mt-1"
                      />
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          router.push(`/admin/pages/Notification/edit-notification/${n._id}`)
                        }
                        className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(n._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-500">
                    No notifications found.
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









