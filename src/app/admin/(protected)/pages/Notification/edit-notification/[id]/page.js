"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, editNotification } from "@/features/notification/notificationSlice";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaFilePdf, FaTachometerAlt } from "react-icons/fa";


export default function EditNotification() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.notifications);

  const [form, setForm] = useState({
    category: "",
    title: "",
    details: "",
    validUpto: "",
    status: false,
  });
  const [pdf, setPdf] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchNotifications());
    } else {
      const notif = items.find((n) => n._id === id);
      if (notif) {
        setForm({
          category: notif.category || "",
          title: notif.title || "",
          details: notif.details || "",
          validUpto: notif.validUpto ? notif.validUpto.slice(0, 10) : "",
          status: notif.status || false,
        });
        setPdf(null);
        setPhoto(null);
      }
    }
  }, [items, id, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((k) => formData.append(k, form[k]));
    if (pdf) formData.append("pdf", pdf);
    if (photo) formData.append("photo", photo);

    dispatch(editNotification({ id, formData }));
    router.push("/admin/pages/Notification/view-notification");
  };

  const currentNotification = items.find((n) => n._id === id);

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
          <span className="text-[#6b7280]">Edit Notification</span>
        </div>
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-2xl mx-auto bg-white rounded-md shadow-md"
    >

     

      {/* Category */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Category</label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
          className="block w-full border border-gray-300 rounded p-2"
        >
          <option value="">Select Category</option>
          {[
            "RECRUITMENT",
            "NEWS",
            "EVENTS",
            "PRESS RELEASE",
            "Office Order",
            "Circular",
            "Tender",
          ].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="block w-full border border-gray-300 rounded p-2"
          placeholder="Enter title"
        />
      </div>

      {/* Details */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Details</label>
        <textarea
          value={form.details}
          onChange={(e) => setForm({ ...form, details: e.target.value })}
          rows="4"
          className="block w-full border border-gray-300 rounded p-2"
          placeholder="Enter details"
        />
      </div>

      {/* Valid Upto */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Valid Upto</label>
        <input
          type="date"
          value={form.validUpto}
          onChange={(e) => setForm({ ...form, validUpto: e.target.value })}
          className="block w-full border border-gray-300 rounded p-2"
        />
      </div>

      {/* Status */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.checked })}
          className="accent-blue-500"
        />
        <label className="font-semibold">Active</label>
      </div>

      {/* PDF Upload */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Upload PDF</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdf(e.target.files[0])}
          className="block w-full border border-gray-300 rounded p-2"
        />
        {currentNotification?.pdf && !pdf && (
          <a
            href={`http://localhost:5000/uploads/notifications/${currentNotification.pdf}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mt-2 inline-block"
          >
            <FaFilePdf style={{ color: "red", fontSize: "28px" }} />
          </a>
        )}
      </div>

      {/* Photo Upload */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Upload Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="block w-full border border-gray-300 rounded p-2"
        />
        {currentNotification?.photo && !photo && (
          <img
            src={`http://localhost:5000/uploads/notifications/${currentNotification.photo}`}
            alt="Current Photo"
            className="w-32 h-auto mt-2 border rounded shadow"
          />
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push("/admin/pages/Notification/view-notification")}
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
    </div>
    
  );
}












// "use client";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useRouter } from "next/navigation";
// import { fetchNotifications, updateNotification } from "@/features/notification/notificationSlice";

// export default function EditNotification() {
//   const { id } = useParams();
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { items } = useSelector((state) => state.notifications);

//   const notification = items.find((n) => n._id === id);

//   const [department, setDepartment] = useState("");
//   const [details, setDetails] = useState("");
//   const [pdf, setPdf] = useState(null);
//   const [validUpto, setValidUpto] = useState("");
//   const [status, setStatus] = useState(false);

//   useEffect(() => {
//     if (!items.length) dispatch(fetchNotifications());
//   }, [dispatch, items.length]);

//   useEffect(() => {
//     if (notification) {
//       setDepartment(notification.department);
//       setDetails(notification.details);
//       setValidUpto(notification.validUpto.split("T")[0]);
//       setStatus(notification.status);
//     }
//   }, [notification]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("department", department);
//     formData.append("details", details);
//     formData.append("validUpto", validUpto);
//     formData.append("status", status);
//     if (pdf) formData.append("pdf", pdf);

//     // Wait for dispatch to complete
//     const result = await dispatch(updateNotification({ id, formData }));

//     if (result.meta.requestStatus === "fulfilled") {
//       router.push("/admin/pages/Notification/view-notification");
//     }
//   };

//   if (!notification) return <p>Loading...</p>;

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Edit Notification</h2>
//       <input
//         type="text"
//         value={department}
//         onChange={(e) => setDepartment(e.target.value)}
//       />
//       <textarea
//         value={details}
//         onChange={(e) => setDetails(e.target.value)}
//       />
//       <input
//         type="file"
//         onChange={(e) => setPdf(e.target.files[0])}
//       />
//       <input
//         type="date"
//         value={validUpto}
//         onChange={(e) => setValidUpto(e.target.value)}
//       />
//       <label>
//         <input
//           type="checkbox"
//           checked={status}
//           onChange={(e) => setStatus(e.target.checked)}
//         />{" "}
//         Status
//       </label>
//       <button type="submit">Update</button>
//     </form>
//   );
// }
